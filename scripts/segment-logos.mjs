/**
 * Dev utility: segment the "Clients Served" logo wall (page 21) into individual
 * transparent logo files.
 *
 * The individually-embedded logo images on that page use PDF soft masks that
 * mupdf's toPixmap() does not composite (they extract as solid black), so we
 * rasterise the page at 3x instead and segment it with projection profiles:
 * find horizontal bands of non-white pixels, then column runs within each band.
 */
import sharp from 'sharp';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

const RAW = path.join(import.meta.dirname, '.raw');
const OUT = path.join(RAW, 'logos');
const SRC = path.join(RAW, 'RASTER-p21.png');

// Region of the 4320x2430 page render containing the logo grid (excludes the
// "CLIENTS SERVED" heading and the sub-line above it).
const REGION = { left: 60, top: 700, width: 4200, height: 1660 };

const WHITE_CUTOFF = 236; // a pixel darker than this counts as "ink"
const MIN_BAND = 40;      // ignore stray specks
const MIN_COL = 40;
const ROW_GAP = 18;       // whitespace runs shorter than this don't split
const COL_GAP = 26;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const region = sharp(SRC).extract(REGION).flatten({ background: '#ffffff' });
const { data, info } = await region
  .clone()
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: W, height: H } = info;
const ink = (x, y) => data[y * W + x] < WHITE_CUTOFF;

/** Collapse a boolean occupancy array into [start,end] runs, merging small gaps. */
function runs(occupied, minGap, minLen) {
  const out = [];
  let start = null;
  let gap = 0;
  for (let i = 0; i < occupied.length; i++) {
    if (occupied[i]) {
      if (start === null) start = i;
      gap = 0;
    } else if (start !== null) {
      gap++;
      if (gap >= minGap) {
        const end = i - gap;
        if (end - start >= minLen) out.push([start, end]);
        start = null;
        gap = 0;
      }
    }
  }
  if (start !== null && occupied.length - start >= minLen) out.push([start, occupied.length - 1]);
  return out;
}

const rowOccupied = new Array(H).fill(false);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (ink(x, y)) { rowOccupied[y] = true; break; }
  }
}

const boxes = [];
for (const [y0, y1] of runs(rowOccupied, ROW_GAP, MIN_BAND)) {
  const colOccupied = new Array(W).fill(false);
  for (let x = 0; x < W; x++) {
    for (let y = y0; y <= y1; y++) {
      if (ink(x, y)) { colOccupied[x] = true; break; }
    }
  }
  for (const [x0, x1] of runs(colOccupied, COL_GAP, MIN_COL)) {
    boxes.push({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 });
  }
}

const composed = await region.png().toBuffer();
const index = [];

for (const [i, b] of boxes.entries()) {
  const pad = 6;
  const box = {
    left: Math.max(0, b.left - pad),
    top: Math.max(0, b.top - pad),
    width: Math.min(W - Math.max(0, b.left - pad), b.width + pad * 2),
    height: Math.min(H - Math.max(0, b.top - pad), b.height + pad * 2),
  };
  const name = `logo-${String(i).padStart(2, '0')}-${box.width}x${box.height}.png`;
  await sharp(composed).extract(box).png().toFile(path.join(OUT, name));
  index.push({ i, file: name, ...box });
}

await writeFile(path.join(OUT, 'index.json'), JSON.stringify(index, null, 2));
console.log(`Segmented ${boxes.length} logo candidates -> ${OUT}`);
