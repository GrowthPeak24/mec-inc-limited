import type { CSSProperties } from 'react';
import type { MediaRef } from '@/types/content';
import { MediaImage } from '@/components/ui/MediaImage';

/** Service-page field photography as a flush-bottomed mosaic.
 *
 *  CSS `columns` masonry keeps every photo uncropped but leaves ragged column
 *  bottoms and a hole at the lower right. Here every tile sits on a shared row
 *  unit and is packed into explicit grid cells per breakpoint. Landscape shots
 *  take 2 units (≈4:3), portrait shots 3 to 5 units (≈0.75 to 0.53), and the
 *  portrait spans flex just enough that every column ends on the same line.
 *  Orientation is read from the static import's intrinsic size, so gallery
 *  sources must be WebP or PNG/JPEG (AVIF imports report a fake 100x100).
 *  Zero client JS. */

const LANDSCAPE = 2;
const PORTRAIT = { min: 3, base: 4, max: 5 };

/** Span whose tile shape matches a portrait source (tile height ≈ 0.405s - 0.06
 *  column widths), so the least-cropped span for a 0.75 photo is ~3.4 and for
 *  a 0.56 photo ~4.5. */
const idealSpan = (ratio: number) => (1 / ratio + 0.06) / 0.405;

interface Cell {
  col: number;
  row: number;
  span: number;
}

/** Greedy shortest-column placement, then flex portrait spans so all columns
 *  end together. If a column can't reach the shared height (say, it holds only
 *  landscapes), the base spans are kept and that column simply ends short. */
function pack(ratios: readonly number[], cols: number): Cell[] {
  const landscape = ratios.map((r) => r >= 1.2);
  const spans = landscape.map((l) => (l ? LANDSCAPE : PORTRAIT.base));
  const heights = new Array<number>(cols).fill(0);
  const members: number[][] = Array.from({ length: cols }, () => []);
  landscape.forEach((_, i) => {
    const c = heights.indexOf(Math.min(...heights));
    members[c]?.push(i);
    heights[c] = (heights[c] ?? 0) + (spans[i] ?? 0);
  });

  if (cols > 1) {
    const range = (c: number) => {
      let lo = 0;
      let hi = 0;
      for (const i of members[c] ?? []) {
        lo += landscape[i] ? LANDSCAPE : PORTRAIT.min;
        hi += landscape[i] ? LANDSCAPE : PORTRAIT.max;
      }
      return [lo, hi] as const;
    };
    const ranges = members.map((_, c) => range(c));
    const start = Math.max(...heights);
    for (let target = start; target >= start - PORTRAIT.max; target--) {
      if (ranges.every(([lo, hi]) => lo <= target && target <= hi)) {
        members.forEach((col) => {
          let diff = target - col.reduce((s, i) => s + (spans[i] ?? 0), 0);
          const flex = col.filter((i) => !landscape[i]);
          // Move one unit at a time to whichever portrait it distorts least:
          // narrow sources want tall tiles, wide ones want shorter tiles.
          while (diff !== 0) {
            const dir = Math.sign(diff);
            let best = -1;
            let bestScore = -Infinity;
            for (const i of flex) {
              const s = spans[i] ?? PORTRAIT.base;
              if (s + dir < PORTRAIT.min || s + dir > PORTRAIT.max) continue;
              const score = dir * (idealSpan(ratios[i] ?? 0.75) - s);
              if (score > bestScore) {
                bestScore = score;
                best = i;
              }
            }
            if (best < 0) break;
            spans[best] = (spans[best] ?? PORTRAIT.base) + dir;
            diff -= dir;
          }
        });
        break;
      }
    }
  }

  const cells: Cell[] = new Array(landscape.length);
  members.forEach((col, c) => {
    let row = 1;
    for (const i of col) {
      const span = spans[i] ?? PORTRAIT.base;
      cells[i] = { col: c + 1, row, span };
      row += span;
    }
  });
  return cells;
}

export function SetupGallery({ gallery }: { gallery: readonly MediaRef[] }) {
  if (gallery.length === 0) return null;

  const ratios = gallery.map((m) => m.src.width / m.src.height);
  const one = pack(ratios, 1);
  const two = pack(ratios, 2);
  const three = pack(ratios, 3);

  return (
    <div className="[container-type:inline-size]">
      <div
        className="grid gap-[var(--gap)] [--cols:1] [--gap:1rem] md:[--cols:2] md:[--gap:1.5rem] lg:[--cols:3]"
        style={{
          gridTemplateColumns: 'repeat(var(--cols), minmax(0, 1fr))',
          // One row unit = half a 4:3 tile, minus half a gap, so a 2-unit
          // landscape tile is exactly 4:3 at any column width.
          gridAutoRows:
            'calc((0.75 * ((100cqw - (var(--cols) - 1) * var(--gap)) / var(--cols)) - var(--gap)) / 2)',
        }}
      >
        {gallery.map((m, i) => {
          const a = one[i];
          const b = two[i];
          const c = three[i];
          if (!a || !b || !c) return null;
          const vars = {
            '--s1': a.span,
            '--c2': b.col,
            '--r2': b.row,
            '--s2': b.span,
            '--c3': c.col,
            '--r3': c.row,
            '--s3': c.span,
          } as CSSProperties;
          return (
            <figure
              key={m.alt}
              style={vars}
              className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-ink-2)] [grid-row:span_var(--s1)] md:[grid-area:var(--r2)/var(--c2)/span_var(--s2)/span_1] lg:[grid-area:var(--r3)/var(--c3)/span_var(--s3)/span_1]"
            >
              <MediaImage
                media={m}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}
