/**
 * Upscale low-res client photos with Replicate's nightmareai/real-esrgan,
 * then encode the service-page gallery images.
 *
 *   node --use-system-ca scripts/upscale-replicate.mjs upscale
 *   node scripts/upscale-replicate.mjs validate [sheetDir]
 *   node scripts/upscale-replicate.mjs encode
 *
 * Add --batch=<n> to any command to act on one batch only.
 *
 * upscale  -> <source>.x<scale>.png next to each source (sources are never
 *             modified). Only items with scale > 1. Needs REPLICATE_API_TOKEN.
 * validate -> downscales each upscale back to source size, reports PSNR and
 *             writes before/after centre crops for visual review.
 * encode   -> src/assets/media/<dest>.(webp|avif) for items with a `dest`.
 *             Add --from-source to encode the originals instead.
 *
 * Case-study and theme AVIFs are NOT encoded here: scripts/media-manifest.json
 * points at the upscaled PNGs and `npm run media:optimize` encodes them with
 * the per-role presets.
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
const BASES = {
  images: path.join(ROOT, 'src', 'assets', 'images'),
  // Deck extracts from `npm run media:extract`; sweep/ holds frame-trimmed copies.
  raw: path.join(ROOT, 'scripts', '.raw'),
};
const MEDIA = path.join(ROOT, 'src', 'assets', 'media');
const STATE_FILE = path.join(ROOT, 'scripts', '.upscale-state.json');

const MODEL = 'nightmareai/real-esrgan';
const USD_PER_SECOND = 0.000225; // Nvidia T4 public rate
const SOFT_CAP_USD = 0.8; // approved ceiling is $1.00
const WORST_CASE_RUN_USD = 0.02; // headroom reserved before starting a run
const MAX_ATTEMPTS = 3; // first try + 2 retries

/**
 * Approved items. `base` defaults to 'images', `scale` to 2.
 * scale 1 = high-res source, encode only (no Replicate run).
 */
const ITEMS = [
  // -- Batch 1: field photos -----------------------------------------------
  // The 20240117 garden series is NCB Capital Markets' "Breakfast at the
  // Pavilion" (Hope Gardens), not Hampden; it ships unattributed.
  { src: 'IMG-20240117-WA0025.jpg', dest: 'services/event-production/06-swing-arch' },
  { src: 'IMG-20240117-WA0010.jpg', dest: 'services/event-production/07-tropical-bar' },
  { src: 'IMG-20240117-WA0014.jpg', dest: 'services/event-production/08-teal-fan-lounge' },
  { src: 'IMG-20240117-WA0027.jpg', dest: 'services/event-production/09-coral-fan-lounge' },
  { src: 'IMG-20240117-WA0029.jpg', dest: 'services/event-production/10-blue-fan-backdrop' },
  // 20240108 lounges: upscale rejected; replaced by batch-3 poolside/cinema shots.
  { src: 'IMG-20240108-WA0011.jpg' },
  { src: 'IMG-20240108-WA0009.jpg' },
  { src: 'IMG-20170702-WA0014.jpg', dest: 'services/event-production/03-cabana-lounge' },
  { src: 'IMG-20170702-WA0036.jpg', dest: 'services/event-production/04-fabric-arch' },
  { src: 'NCBCM/IMG-20180114-WA0004.jpg', dest: 'services/event-production/05-winter-tunnel' },
  { src: 'IMG-20170524-WA0030.jpg', dest: 'services/bespoke-catering/01-vegetable-skillet' },
  { src: 'IMG-20170703-WA0005.jpg', dest: 'services/bespoke-catering/02-lantern-table' },

  // -- Batch 2: tiny deck extracts for case studies (encoded via manifest) --
  { base: 'raw', src: 'sweep/p10-i00.png', scale: 4 }, // Wisynco recycling kiosk
  { base: 'raw', src: 'sweep/p10-i01.png', scale: 4 }, // Wisynco students + collection bags
  { base: 'raw', src: 'sweep/p10-i02.png', scale: 4 }, // Wisynco beach clean-up
  { base: 'raw', src: 'sweep/p10-i03.png', scale: 4 }, // Wisynco school collection
  { base: 'raw', src: 'sweep/p11-i01.png', scale: 4 }, // Bigga schools-tour stage
  { base: 'raw', src: 'sweep/p11-i02.png', scale: 4 }, // Bigga schools-tour interview
  { base: 'raw', src: 'sweep/p15-i04.png', scale: 4 }, // NCB Champions arch
  { base: 'raw', src: 'sweep/p15-i05.png', scale: 4 }, // NCB Champions lockers
  { base: 'raw', src: 'sweep/p15-i06.png', scale: 4 }, // NCB Champions hallway
  { base: 'raw', src: 'sweep/p13-i02.png', scale: 2 }, // Hampden Estate booth

  // -- Batch 2: high-res client photos for service galleries ----------------
  { src: 'NCBCM/20171111_004515.jpg', scale: 1, dest: 'services/event-production/11-world-championship-track' },
  { src: 'Copy of document-006 (1).jpg', scale: 1, dest: 'services/event-production/12-terra-nova-night-tent' },
  { src: '20180422_085427.jpg', scale: 1, dest: 'services/strategic-marketing/01-honey-bun-expo-booth' },
  { src: 'Scotia/20180608_093552.jpg', scale: 1, dest: 'services/strategic-marketing/02-scotia-insurance-booth' },
  { src: 'Scotia/Copy of IMG_1808.JPG', scale: 1, dest: 'services/strategic-marketing/03-scotiabank-activation-tent' },
  { src: 'FSC/imgupscaler-enhanced (1).png', scale: 1, dest: 'services/strategic-marketing/04-fsc-booth' },
  { src: 'SSL/20170505_083116.jpg', scale: 1, dest: 'services/strategic-marketing/05-ssl-investment-booth' },

  // -- Batch 3: site-wide replacement of deck photography --------------------
  // Hero bento, pillars, decor themes and about now come from the client's own
  // photo folders. Sources under ~1600px run through Real-ESRGAN x2; 12 MP
  // camera originals are encoded directly (see media-manifest.json).
  { batch: 3, src: 'IMG-20170703-WA0012.jpg' }, // hero/02-plated-catering
  { batch: 3, src: 'IMG-20170703-WA0011.jpg' }, // pillars/bespoke-catering
  { batch: 3, src: 'IMG-20240108-WA0013.jpg' }, // pillars/event-production
  { batch: 3, src: 'NCBCM/IMG-20180114-WA0016.jpg' }, // themes/azure-corporate
  { batch: 3, src: 'IMG-20240117-WA0013.jpg' }, // themes/floral-arrival
  { batch: 3, src: 'IMG-20240108-WA0010.jpg' }, // themes/tropical-outdoor
  { batch: 3, src: 'IMG-20240108-WA0012.jpg', dest: 'services/event-production/01-poolside-lantern' },
  { batch: 3, src: '20180602_145224.jpg', scale: 1, dest: 'services/event-production/02-cinema-lounge' },
  { batch: 3, src: 'IMG-20170703-WA0013.jpg', dest: 'services/bespoke-catering/03-floral-head-table' },
  { batch: 3, src: 'IMG-20170703-WA0014.jpg', dest: 'services/bespoke-catering/04-poolside-round-table' },

  // Case-study deck images below their slot width. The four `rerun` items were
  // rejected at x4; x2 invents less, and if it still fails review the image is
  // dropped from the gallery rather than shipped low-res.
  { batch: 3, base: 'raw', src: 'sweep/p10-i00.png', rerun: true }, // Wisynco recycling kiosk
  { batch: 3, base: 'raw', src: 'sweep/p10-i01.png', rerun: true }, // Wisynco students
  { batch: 3, base: 'raw', src: 'sweep/p10-i02.png', rerun: true }, // Wisynco beach clean-up
  { batch: 3, base: 'raw', src: 'sweep/p11-i02.png', rerun: true }, // Bigga interview
  { batch: 3, base: 'raw', src: 'p12-i01-512x481.png' }, // GRL hero
  { batch: 3, base: 'raw', src: 'p12-i02-768x461.png' }, // GRL friends campaign
  { batch: 3, base: 'raw', src: 'p19-i04-640x640.png' }, // GRL couple campaign
  { batch: 3, base: 'raw', src: 'p12-i03-360x640.png' }, // GRL poster
  { batch: 3, base: 'raw', src: 'p12-i00-768x461.png' }, // Geddes hero
  { batch: 3, base: 'raw', src: 'p19-i03-1007x921.png' }, // Geddes glacier ad
  { batch: 3, base: 'raw', src: 'p13-i01-1200x900.png' }, // McIntosh showroom
  { batch: 3, base: 'raw', src: 'p13-i03-1200x900.png' }, // Caribbean Airlines cargo
];

const batchArg = process.argv.find((a) => a.startsWith('--batch='));
const inBatch = (item) => !batchArg || String(item.batch ?? 1) === batchArg.slice('--batch='.length);

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
 * Upscales that failed visual review; the originals ship instead.
 *  - 20240108 lounges: the sequin wall was smoothed into flat plaster.
 *  - p10-i00: kiosk lettering rewritten ("INSERT" became "DISCUT").
 *  - p10-i01, p10-i02, p11-i02: 4x from ~10-25px faces invented new facial
 *    features (several subjects are school students). Never ship those.
 *  - Batch 3: the same four at x2 failed again (faces, "INSERT" rewritten),
 *    and GRL p12-i01/p12-i02/p12-i03 rewrote small lettering
 *    ("REFRIGERATION") and altered faces. These are no longer shipped at all:
 *    their galleries were dropped rather than falling back to low-res originals.
 */
const REJECTED = new Set([
  'IMG-20240108-WA0011.jpg',
  'IMG-20240108-WA0009.jpg',
  'raw:sweep/p10-i00.png',
  'raw:sweep/p10-i01.png',
  'raw:sweep/p10-i02.png',
  'raw:sweep/p11-i02.png',
  'raw:sweep/p10-i00.png@x2',
  'raw:sweep/p10-i01.png@x2',
  'raw:sweep/p10-i02.png@x2',
  'raw:sweep/p11-i02.png@x2',
  'raw:p12-i01-512x481.png',
  'raw:p12-i02-768x461.png',
  'raw:p12-i03-360x640.png',
]);

const scaleOf = (item) => item.scale ?? 2;
const inputPath = (item) => path.join(BASES[item.base ?? 'images'], item.src);
const outputPath = (item) => inputPath(item).replace(/\.(jpe?g|png)$/i, `.x${scaleOf(item)}.png`);
/** Batch-1 keys stay bare filenames so the existing state file still matches.
 *  A rerun at a new scale gets its own key so it isn't mistaken for the old run. */
const stateKey = (item) => {
  const key = item.base && item.base !== 'images' ? `${item.base}:${item.src}` : item.src;
  return item.rerun ? `${key}@x${scaleOf(item)}` : key;
};
const mimeOf = (file) => (/\.png$/i.test(file) ? 'image/png' : 'image/jpeg');

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function api(token) {
  return async (url, init = {}) => {
    // Accounts under $5 credit are throttled to 6 creates/min (burst 1). A 429
    // creates no prediction and is not billed, so waiting and retrying is safe.
    for (let attempt = 0; ; attempt++) {
      const res = await fetch(url.startsWith('http') ? url : `https://api.replicate.com/v1${url}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...init.headers,
        },
      });
      const body = await res.json().catch(() => ({}));
      if (res.status === 429 && attempt < 6) {
        await sleep(11_000);
        continue;
      }
      if (!res.ok) throw new Error(`Replicate ${res.status}: ${body.detail ?? body.title ?? 'request failed'}`);
      return body;
    }
  };
}

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

  for (const item of ITEMS.filter((i) => scaleOf(i) > 1 && inBatch(i))) {
    const key = stateKey(item);
    const out = outputPath(item);
    const entry = (state[key] ??= { runs: [] });

    if (entry.done && existsSync(out)) {
      console.log(`skip  ${key} (already upscaled)`);
      continue;
    }

    while (!entry.done) {
      let run = entry.runs.at(-1);

      // Resume an in-flight prediction instead of paying for a new one.
      if (!run || ['failed', 'canceled'].includes(run.status)) {
        if (entry.runs.length >= MAX_ATTEMPTS) {
          console.log(`FAIL  ${key} after ${entry.runs.length} attempts`);
          break;
        }
        const spent = spentUsd(state);
        if (spent + WORST_CASE_RUN_USD > SOFT_CAP_USD) {
          await saveState(state);
          throw new Error(`Soft cap reached (~$${spent.toFixed(4)} spent). Stopping before new run.`);
        }
        const file = inputPath(item);
        const bytes = await readFile(file);
        const created = await call('/predictions', {
          method: 'POST',
          body: JSON.stringify({
            version,
            input: {
              image: `data:${mimeOf(file)};base64,${bytes.toString('base64')}`,
              scale: scaleOf(item),
              face_enhance: false,
            },
          }),
        });
        run = { id: created.id, status: created.status, getUrl: created.urls.get };
        entry.runs.push(run);
        await saveState(state); // persist id before polling
        console.log(`start ${key} x${scaleOf(item)} (${created.id})`);
      }

      const final = await waitFor(call, run.getUrl);
      run.status = final.status;
      run.predictTime = final.metrics?.predict_time ?? 0;
      if (final.status !== 'succeeded') {
        run.error = String(final.error ?? final.status);
        await saveState(state);
        console.log(`retry ${key}: ${run.error}`);
        continue;
      }

      const outputUrl = Array.isArray(final.output) ? final.output[0] : final.output;
      const img = await fetch(outputUrl);
      if (!img.ok) throw new Error(`Download failed for ${key}: ${img.status}`);
      await writeFile(out, Buffer.from(await img.arrayBuffer()));
      entry.done = true;
      await saveState(state);
      console.log(`done  ${key} ${run.predictTime.toFixed(2)}s`);
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
  const sheetDir = process.argv[3] ?? path.join(ROOT, 'scripts', '.raw');
  await mkdir(sheetDir, { recursive: true });
  let n = 0;
  for (const item of ITEMS.filter((i) => scaleOf(i) > 1 && inBatch(i))) {
    const k = scaleOf(item);
    const srcFile = inputPath(item);
    const out = outputPath(item);
    if (!existsSync(out)) {
      console.log(`MISSING ${stateKey(item)}`);
      continue;
    }
    const s = await sharp(srcFile).metadata();
    const o = await sharp(out).metadata();
    const scaleOk = o.width === s.width * k && o.height === s.height * k;
    const orig = await sharp(srcFile).removeAlpha().raw().toBuffer();
    const down = await sharp(out).removeAlpha().resize(s.width, s.height, { kernel: 'lanczos3' }).raw().toBuffer();
    const db = await psnr(orig, down);
    console.log(
      `${scaleOk ? 'ok ' : 'BAD'} ${stateKey(item)}  ${s.width}x${s.height} -> ${o.width}x${o.height}  PSNR ${db.toFixed(1)} dB`,
    );

    // Side-by-side centre crop at output scale so artifacts are visible.
    const cw = Math.min(Math.floor(720 / k), s.width), ch = Math.min(Math.floor(720 / k), s.height);
    const left = Math.floor((s.width - cw) / 2), top = Math.floor((s.height - ch) / 2);
    const before = await sharp(srcFile).removeAlpha().extract({ left, top, width: cw, height: ch }).resize(cw * k, ch * k, { kernel: 'nearest' }).png().toBuffer();
    const after = await sharp(out).removeAlpha().extract({ left: left * k, top: top * k, width: cw * k, height: ch * k }).png().toBuffer();
    await sharp({ create: { width: 1440, height: 720, channels: 3, background: '#202020' } })
      .composite([{ input: before, left: 0, top: 0 }, { input: after, left: 720, top: 0 }])
      .jpeg({ quality: 85 })
      .toFile(path.join(sheetDir, `compare-${String(++n).padStart(2, '0')}.jpg`));
  }
  console.log(`\ncompare sheets (left: source nearest-neighbour, right: upscale) -> ${sheetDir}`);
}

async function encode() {
  // --from-source encodes the untouched originals (e.g. while Replicate credit
  // is unavailable). Dest paths are identical either way.
  const fromSource = process.argv.includes('--from-source');
  for (const item of ITEMS.filter((i) => i.dest && inBatch(i))) {
    const useSource = fromSource || scaleOf(item) === 1 || REJECTED.has(stateKey(item));
    const input = useSource ? inputPath(item) : outputPath(item);
    if (!existsSync(input)) throw new Error(`Missing input for ${stateKey(item)}; run upscale first`);
    const format = destFormat(item.dest);
    const dest = path.join(MEDIA, `${item.dest}.${format}`);
    await mkdir(path.dirname(dest), { recursive: true });
    const resized = sharp(input)
      .rotate() // honour EXIF orientation on phone originals
      .resize({ width: GALLERY_PRESET.maxWidth, height: GALLERY_PRESET.maxWidth * 2, withoutEnlargement: true, fit: 'inside' });
    await (format === 'webp'
      ? resized.webp(WEBP_PRESET)
      : resized.avif({ quality: GALLERY_PRESET.quality, effort: 6, chromaSubsampling: GALLERY_PRESET.chromaSubsampling })
    ).toFile(dest);
    const m = await sharp(dest).metadata();
    const kb = ((await stat(dest)).size / 1024).toFixed(0);
    const inKb = ((await stat(input)).size / 1024).toFixed(0);
    console.log(
      `${item.dest}.${format}  ${m.width}x${m.height}  ${kb} KB  (input ${useSource ? 'original' : `x${scaleOf(item)} png`} ${inKb} KB)`,
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
