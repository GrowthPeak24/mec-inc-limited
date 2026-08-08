/**
 * Phase 0 — optimize curated media into src/assets/media/**.avif and
 * src/assets/logos/**.png.
 *
 * Photography  -> AVIF, max 2000px wide, quality tuned per role.
 * Client logos -> PNG, trimmed to bounding ink, height-normalized to 220px,
 *                 transparent background (marquee flexes width).
 *
 * Aspect ratios are handled in CSS via `aspect-ratio` + `object-fit: cover`,
 * so this script preserves the source aspect and only downscales.
 */
import sharp from 'sharp';
import { readFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const RAW = path.join(ROOT, 'scripts', '.raw');
const MEDIA_OUT = path.join(ROOT, 'src', 'assets', 'media');
const LOGO_OUT = path.join(ROOT, 'src', 'assets', 'logos');

const manifest = JSON.parse(
  await readFile(path.join(ROOT, 'scripts', 'media-manifest.json'), 'utf8'),
);

/** AVIF encoding preset per role (bytes = target ceiling for QA). */
const ROLE_PRESET = {
  bento:   { maxWidth: 1600, quality: 60, chromaSubsampling: '4:2:0', bytes: 180_000 },
  card:    { maxWidth: 1400, quality: 58, chromaSubsampling: '4:2:0', bytes: 120_000 },
  gallery: { maxWidth: 1200, quality: 56, chromaSubsampling: '4:2:0', bytes:  90_000 },
};

async function optimizePhoto(entry) {
  const preset = ROLE_PRESET[entry.role];
  if (!preset) throw new Error(`unknown role for ${entry.raw}: ${entry.role}`);

  const src = path.join(RAW, entry.raw);
  const dest = path.join(MEDIA_OUT, `${entry.dest}.avif`);
  await mkdir(path.dirname(dest), { recursive: true });

  await sharp(src)
    .rotate()
    .resize({ width: preset.maxWidth, withoutEnlargement: true, fit: 'inside' })
    .avif({ quality: preset.quality, effort: 6, chromaSubsampling: preset.chromaSubsampling })
    .toFile(dest);

  const bytes = (await stat(dest)).size;
  const flag = bytes > preset.bytes ? ' OVER' : '';
  return { dest: `${entry.dest}.avif`, role: entry.role, bytes, flag };
}

async function optimizeLogo(entry) {
  const src = path.join(RAW, entry.raw);
  const dest = path.join(LOGO_OUT, `${entry.dest.replace(/^logos\//, '')}.png`);
  await mkdir(path.dirname(dest), { recursive: true });

  await sharp(src)
    .flatten({ background: '#ffffff' })
    .trim({ background: '#ffffff', threshold: 15 })
    .resize({ height: 220, withoutEnlargement: false, fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile(dest);

  const bytes = (await stat(dest)).size;
  return { dest: entry.dest + '.png', bytes };
}

const photoEntries = [
  ...manifest.hero,
  ...Object.values(manifest.case_studies).flat(),
  ...manifest.themes,
  ...manifest.about,
];

console.log(`Photos: ${photoEntries.length} · Logos: ${manifest.logos.length}\n`);

let totalBytes = 0;
let over = 0;

console.log('== PHOTOS ==');
for (const entry of photoEntries) {
  const r = await optimizePhoto(entry);
  totalBytes += r.bytes;
  if (r.flag) over++;
  console.log(`  ${(r.bytes / 1024).toFixed(0).padStart(4)}KB  ${r.role.padEnd(7)}  ${r.dest}${r.flag}`);
}

console.log('\n== LOGOS ==');
for (const entry of manifest.logos) {
  const r = await optimizeLogo(entry);
  totalBytes += r.bytes;
  console.log(`  ${(r.bytes / 1024).toFixed(0).padStart(4)}KB  ${r.dest}`);
}

console.log(`\nTotal: ${(totalBytes / 1024).toFixed(0)}KB across ${photoEntries.length + manifest.logos.length} files${over ? ` · ${over} over budget` : ''}`);
