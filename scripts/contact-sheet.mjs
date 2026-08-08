/**
 * Dev utility: tile the raw extracted images into contact sheets so the whole
 * deck can be reviewed at a glance during curation. Not part of the build.
 */
import sharp from 'sharp';
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const RAW = path.join(import.meta.dirname, '.raw');
const CELL = 260;
const COLS = 6;
const ROWS = 5;
const PER_SHEET = COLS * ROWS;

const files = (await readdir(RAW))
  .filter((f) => f.endsWith('.png') && !f.startsWith('RASTER'))
  .sort();

for (let s = 0; s * PER_SHEET < files.length; s++) {
  const batch = files.slice(s * PER_SHEET, (s + 1) * PER_SHEET);

  const composites = await Promise.all(
    batch.map(async (f, i) => ({
      input: await sharp(path.join(RAW, f))
        .resize(CELL, CELL, { fit: 'contain', background: '#202020' })
        .flatten({ background: '#202020' })
        .png()
        .toBuffer(),
      left: (i % COLS) * CELL,
      top: Math.floor(i / COLS) * CELL,
    })),
  );

  const out = `sheet-${s + 1}.png`;
  await sharp({
    create: {
      width: COLS * CELL,
      height: ROWS * CELL,
      channels: 3,
      background: '#202020',
    },
  })
    .composite(composites)
    .png()
    .toFile(path.join(RAW, out));

  console.log(out, '->', batch.map((f) => f.split('-').slice(0, 2).join('-')).join(' '));
}
