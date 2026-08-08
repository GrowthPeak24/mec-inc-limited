/**
 * Phase 0 — extract embedded images from the client presentation deck.
 *
 * Extracts the ORIGINAL embedded images rather than rasterising pages, so we get
 * native-resolution photography without the slide template chrome baked in.
 *
 * Output: scripts/.raw/pNN-iMM-{W}x{H}.png  (+ index.json)
 * Review the output, then map keepers in scripts/media-manifest.json.
 */
import * as mupdf from 'mupdf';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const SRC =
  process.env.DECK_PATH ??
  'C:/Users/Admin/Desktop/Business and Development/Michelle Business/Copy of Blue Line Accent Boundaries Investor Business Presentation.pdf';

const OUT = path.join(import.meta.dirname, '.raw');

// Small enough to catch client logos on the logo-wall slide, large enough to
// skip bullet glyphs and template decoration.
const MIN_W = 240;
const MIN_H = 80;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const doc = mupdf.Document.openDocument(await readFile(SRC), 'application/pdf');
const seen = new Map(); // sha1 -> filename, for cross-page dedupe
const index = [];

for (let p = 0; p < doc.countPages(); p++) {
  const structured = doc.loadPage(p).toStructuredText('preserve-images');
  let i = 0;

  const blocks = [];
  structured.walk({
    onImageBlock(_bbox, _ctm, image) {
      blocks.push(image);
    },
  });

  for (const image of blocks) {
    const w = image.getWidth();
    const h = image.getHeight();
    const slot = i++;
    if (w < MIN_W || h < MIN_H) continue;

    const png = Buffer.from(image.toPixmap().asPNG());
    const hash = createHash('sha1').update(png).digest('hex');

    if (seen.has(hash)) {
      index.push({ page: p + 1, slot, width: w, height: h, duplicateOf: seen.get(hash) });
      continue;
    }

    const name = `p${String(p + 1).padStart(2, '0')}-i${String(slot).padStart(2, '0')}-${w}x${h}.png`;
    await writeFile(path.join(OUT, name), png);
    seen.set(hash, name);
    index.push({ page: p + 1, slot, width: w, height: h, file: name, bytes: png.length });
  }
}

await writeFile(path.join(OUT, 'index.json'), JSON.stringify(index, null, 2));

const written = index.filter((r) => r.file);
console.log(`Pages scanned      : ${doc.countPages()}`);
console.log(`Images written     : ${written.length}`);
console.log(`Duplicates skipped : ${index.length - written.length}`);
console.log(`>= 1600px wide     : ${written.filter((r) => r.width >= 1600).length}`);
console.log(`>= 1200x800        : ${written.filter((r) => r.width >= 1200 && r.height >= 800).length}`);
console.log(`Output             : ${OUT}`);
