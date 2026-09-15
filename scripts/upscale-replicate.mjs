/**
 * One-off: 2x-upscale a curated set of low-res client photos with
 * Replicate's nightmareai/real-esrgan, then encode web AVIFs.
 *
 *   node --use-system-ca scripts/upscale-replicate.mjs upscale
 *   node scripts/upscale-replicate.mjs validate
 *   node scripts/upscale-replicate.mjs encode
 *
 * upscale  -> src/assets/images/<name>.x2.png next to each original
 *             (originals are never modified). Needs REPLICATE_API_TOKEN.
 * validate -> downscales each .x2.png back to source size and reports
 *             PSNR against the original; writes a before/after sheet.
 * encode   -> src/assets/media/<dest>.avif (services/* as .webp) at gallery size.
 *             Add --from-source to encode the originals instead.
 *
 * Billing safety:
 *  - Every prediction id is persisted to scripts/.upscale-state.json
 *    BEFORE polling, so a rerun resumes the existing prediction instead
 *    of paying for a new one.
 *  - Max 2 retries per image (failed runs are not billed by Replicate).
 *  - Soft spend stop: sum(metrics.predict_time) x T4 rate. Replicate has
 *    no per-token hard cap, so the dashboard remains the source of truth.
 *  - The token is read from the environment and never logged.
 */
import sharp from 'sharp';
import { readFile, writeFile, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const IMAGES = path.join(ROOT, 'src', 'assets', 'images');
const MEDIA = path.join(ROOT, 'src', 'assets', 'media');
const STATE_FILE = path.join(ROOT, 'scripts', '.upscale-state.json');

const MODEL = 'nightmareai/real-esrgan';
const USD_PER_SECOND = 0.000225; // Nvidia T4 public rate
const SOFT_CAP_USD = 0.8; // hard-approved ceiling is $1.00
const WORST_CASE_RUN_USD = 0.02; // headroom reserved before starting a run
const MAX_ATTEMPTS = 3; // first try + 2 retries

/** Approved batch: source (relative to src/assets/images) -> AVIF dest. */
const BATCH = [
  { src: 'IMG-20240117-WA0025.jpg', dest: 'case-studies/hampden-estate-activation/02-swing-arch' },
  { src: 'IMG-20240117-WA0014.jpg', dest: 'case-studies/hampden-estate-activation/03-teal-fan-lounge' },
  { src: 'IMG-20240117-WA0027.jpg', dest: 'case-studies/hampden-estate-activation/04-coral-fan-lounge' },
  { src: 'IMG-20240117-WA0029.jpg', dest: 'case-studies/hampden-estate-activation/05-blue-fan-backdrop' },
  { src: 'IMG-20240117-WA0010.jpg', dest: 'case-studies/hampden-estate-activation/06-tropical-bar' },
  { src: 'IMG-20240108-WA0011.jpg', dest: 'services/event-production/01-poolside-lounge' },
  { src: 'IMG-20240108-WA0009.jpg', dest: 'services/event-production/02-garden-lounge' },
  { src: 'IMG-20170702-WA0014.jpg', dest: 'services/event-production/03-cabana-lounge' },
  { src: 'IMG-20170702-WA0036.jpg', dest: 'services/event-production/04-fabric-arch' },
  { src: 'NCBCM/IMG-20180114-WA0004.jpg', dest: 'services/event-production/05-winter-tunnel' },
  { src: 'IMG-20170524-WA0030.jpg', dest: 'services/bespoke-catering/01-vegetable-skillet' },
  { src: 'IMG-20170703-WA0005.jpg', dest: 'services/bespoke-catering/02-lantern-table' },
];

/** Matches the `gallery` role in scripts/optimize-media.mjs. */
const GALLERY_PRESET = { maxWidth: 1200, quality: 56, chromaSubsampling: '4:2:0' };

/**
 * services/* render un-cropped at intrinsic size (SetupGallery, no `fill`),
 * which needs real width/height on the static import. Turbopack emits AVIF
 * imports with a 100x100 placeholder, so those ship as WebP instead; the
 * next/image optimizer still negotiates AVIF for browsers at request time.
 */
const WEBP_PRESET = { quality: 78, effort: 6 };
const destFormat = (dest) => (dest.startsWith('services/') ? 'webp' : 'avif');

/**
 * Upscales that failed visual review. Real-ESRGAN smoothed the sequin wall
 * in both 20240108 lounge shots into flat plaster, which changes what the
 * set actually looked like. encode falls back to the original for these.
 */
const REJECTED = new Set(['IMG-20240108-WA0011.jpg', 'IMG-20240108-WA0009.jpg']);

const x2Path = (src) => path.join(IMAGES, src.replace(/\.jpe?g$/i, '.x2.png'));

async function loadState() {
  if (!existsSync(STATE_FILE)) return {};
  return JSON.parse(await readFile(STATE_FILE, 'utf8'));
}
async function saveState(state) {
  await writeFile(STATE_FILE, JSON.stringify(state, null, 2));
}
const spentUsd = (state) =>
  Object.values(state).reduce(
    (sum, e) => sum + (e.runs ?? []).reduce((s, r) => s + (r.predictTime ?? 0) * USD_PER_SECOND, 0),
    0,
  );

function api(token) {
  return async (url, init = {}) => {
    const res = await fetch(url.startsWith('http') ? url : `https://api.replicate.com/v1${url}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`Replicate ${res.status}: ${body.detail ?? body.title ?? 'request failed'}`);
    return body;
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Always re-reads the prediction, so a resumed run gets fresh output/metrics. */
async function waitFor(call, getUrl) {
  let p = await call(getUrl);
  while (!['succeeded', 'failed', 'canceled'].includes(p.status)) {
    await sleep(3000);
    p = await call(getUrl);
  }
  return p;
}

async function upscale() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error('REPLICATE_API_TOKEN is not set');
  const call = api(token);
  const state = await loadState();

  const model = await call(`/models/${MODEL}`);
  const version = model.latest_version?.id;
  if (!version) throw new Error('Could not resolve model version');

  for (const item of BATCH) {
    const out = x2Path(item.src);
    const entry = (state[item.src] ??= { runs: [] });

    if (entry.done && existsSync(out)) {
      console.log(`skip  ${item.src} (already upscaled)`);
      continue;
    }

    while (!entry.done) {
      let run = entry.runs.at(-1);

      // Resume an in-flight prediction instead of paying for a new one.
      if (!run || ['failed', 'canceled'].includes(run.status)) {
        if (entry.runs.length >= MAX_ATTEMPTS) {
          console.log(`FAIL  ${item.src} after ${entry.runs.length} attempts`);
          break;
        }
        const spent = spentUsd(state);
        if (spent + WORST_CASE_RUN_USD > SOFT_CAP_USD) {
          await saveState(state);
          throw new Error(`Soft cap reached (~$${spent.toFixed(4)} spent). Stopping before new run.`);
        }
        const bytes = await readFile(path.join(IMAGES, item.src));
        const created = await call('/predictions', {
          method: 'POST',
          body: JSON.stringify({
            version,
            input: {
              image: `data:image/jpeg;base64,${bytes.toString('base64')}`,
              scale: 2,
              face_enhance: false,
            },
          }),
        });
        run = { id: created.id, status: created.status, getUrl: created.urls.get };
        entry.runs.push(run);
        await saveState(state); // persist id before polling
        console.log(`start ${item.src} (${created.id})`);
      }

      const final = await waitFor(call, run.getUrl);
      run.status = final.status;
      run.predictTime = final.metrics?.predict_time ?? 0;
      if (final.status !== 'succeeded') {
        run.error = String(final.error ?? final.status);
        await saveState(state);
        console.log(`retry ${item.src}: ${run.error}`);
        continue;
      }

      const outputUrl = Array.isArray(final.output) ? final.output[0] : final.output;
      const img = await fetch(outputUrl);
      if (!img.ok) throw new Error(`Download failed for ${item.src}: ${img.status}`);
      await writeFile(out, Buffer.from(await img.arrayBuffer()));
      entry.done = true;
      await saveState(state);
      console.log(`done  ${item.src} ${run.predictTime.toFixed(2)}s`);
    }
  }

  const spent = spentUsd(state);
  const runs = Object.values(state).reduce((n, e) => n + e.runs.length, 0);
  console.log(`\nruns: ${runs}  estimated spend: $${spent.toFixed(4)} (T4 rate; confirm on dashboard)`);
}

async function psnr(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2;
  const mse = sum / a.length;
  return mse === 0 ? Infinity : 10 * Math.log10((255 * 255) / mse);
}

async function validate() {
  const cells = [];
  for (const item of BATCH) {
    const srcFile = path.join(IMAGES, item.src);
    const out = x2Path(item.src);
    if (!existsSync(out)) {
      console.log(`MISSING ${item.src}`);
      continue;
    }
    const s = await sharp(srcFile).metadata();
    const o = await sharp(out).metadata();
    const scaleOk = o.width === s.width * 2 && o.height === s.height * 2;
    const orig = await sharp(srcFile).removeAlpha().raw().toBuffer();
    const down = await sharp(out).removeAlpha().resize(s.width, s.height, { kernel: 'lanczos3' }).raw().toBuffer();
    const db = await psnr(orig, down);
    console.log(
      `${scaleOk ? 'ok ' : 'BAD'} ${item.src}  ${s.width}x${s.height} -> ${o.width}x${o.height}  PSNR ${db.toFixed(1)} dB`,
    );

    // Side-by-side 1:1 crop of the centre so artifacts are visible.
    const cw = Math.min(360, s.width), ch = Math.min(360, s.height);
    const left = Math.floor((s.width - cw) / 2), top = Math.floor((s.height - ch) / 2);
    const before = await sharp(srcFile).extract({ left, top, width: cw, height: ch }).resize(cw * 2, ch * 2, { kernel: 'nearest' }).png().toBuffer();
    const after = await sharp(out).extract({ left: left * 2, top: top * 2, width: cw * 2, height: ch * 2 }).png().toBuffer();
    cells.push({ before, after, w: cw * 2, h: ch * 2 });
  }
  if (cells.length) {
    const W = 1440, H = 720;
    const sheetDir = process.argv[3] ?? path.join(ROOT, 'scripts', '.raw');
    await mkdir(sheetDir, { recursive: true });
    for (const [i, c] of cells.entries()) {
      await sharp({ create: { width: W, height: H, channels: 3, background: '#202020' } })
        .composite([{ input: c.before, left: 0, top: 0 }, { input: c.after, left: 720, top: 0 }])
        .jpeg({ quality: 85 })
        .toFile(path.join(sheetDir, `compare-${String(i + 1).padStart(2, '0')}.jpg`));
    }
    console.log(`\ncompare sheets (left: source nearest-neighbour, right: x2) -> ${sheetDir}`);
  }
}

async function encode() {
  // --from-source encodes the untouched originals (interim, e.g. while Replicate
  // credit is unavailable). Dest paths are identical, so a later x2 encode
  // simply overwrites them with no code changes.
  const fromSource = process.argv.includes('--from-source');
  for (const item of BATCH) {
    const useSource = fromSource || REJECTED.has(item.src);
    const out = useSource ? path.join(IMAGES, item.src) : x2Path(item.src);
    if (!existsSync(out)) throw new Error(`Missing upscale for ${item.src}; run upscale first`);
    const format = destFormat(item.dest);
    const dest = path.join(MEDIA, `${item.dest}.${format}`);
    await mkdir(path.dirname(dest), { recursive: true });
    const resized = sharp(out).resize({ width: GALLERY_PRESET.maxWidth, withoutEnlargement: true, fit: 'inside' });
    await (format === 'webp'
      ? resized.webp(WEBP_PRESET)
      : resized.avif({ quality: GALLERY_PRESET.quality, effort: 6, chromaSubsampling: GALLERY_PRESET.chromaSubsampling })
    ).toFile(dest);
    const m = await sharp(dest).metadata();
    const kb = ((await stat(dest)).size / 1024).toFixed(0);
    const srcKb = ((await stat(path.join(IMAGES, item.src))).size / 1024).toFixed(0);
    const inKb = ((await stat(out)).size / 1024).toFixed(0);
    console.log(
      `${item.dest}.${format}  ${m.width}x${m.height}  ${kb} KB  (source ${srcKb} KB, input ${useSource ? 'original' : 'x2 png'} ${inKb} KB)`,
    );
  }
}

const cmd = process.argv[2];
const run = { upscale, validate, encode }[cmd];
if (!run) {
  console.error('usage: upscale-replicate.mjs <upscale|validate|encode> [sheetDir]');
  process.exit(1);
}
await run();
