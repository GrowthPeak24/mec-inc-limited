import type { ReactNode } from 'react';
import { MediaImage } from '@/components/ui/MediaImage';
import type { MediaRef } from '@/types/content';

/** Ink hero for the interior index pages (About, Services, Portfolio).
 *  Same visual vocabulary as the QuoteCTA band (sapphire glow, dot texture) so
 *  the page top no longer reads as a flat band with an empty right half.
 *  `aside` only shows from `lg`, where the two-column layout has room for it. */
export function PageHero({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <section
      data-surface="ink"
      className="relative isolate overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_90%_0%,color-mix(in_srgb,var(--color-gold)_30%,transparent),transparent_65%)]"
      />
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute bottom-0 left-0 -z-10 hidden h-44 w-64 text-[var(--color-paper)] opacity-[0.08] [mask-image:linear-gradient(45deg,black,transparent_70%)] lg:block"
      />
      <div className="container-x grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className={aside ? 'lg:col-span-7' : 'lg:col-span-9'}>{children}</div>
        {aside && <div className="hidden lg:col-span-5 lg:block">{aside}</div>}
      </div>
    </section>
  );
}

/** Three real photographs as a staggered tile: one tall, two stacked. */
export function PhotoStack({ images }: { images: readonly MediaRef[] }) {
  const [tall, top, bottom] = images;
  if (!tall || !top || !bottom) return null;
  const tile =
    'relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-ink-2)] ring-1 ring-inset ring-[var(--color-line)]';
  const sizes = '(min-width: 1024px) 22vw, 0px';
  return (
    <div className="grid h-[26rem] grid-cols-2 grid-rows-2 gap-4">
      <div className={`${tile} row-span-2`}>
        <MediaImage media={tall} fill sizes={sizes} className="object-cover" />
      </div>
      <div className={tile}>
        <MediaImage media={top} fill sizes={sizes} className="object-cover" />
      </div>
      <div className={tile}>
        <MediaImage media={bottom} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
