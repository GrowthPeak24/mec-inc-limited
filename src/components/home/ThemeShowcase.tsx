import { DECOR_THEMES } from '@/content/decor-themes';
import { MediaImage } from '@/components/ui/MediaImage';

/** Static gallery of décor themes. These figures link nowhere, so they carry
 *  no hover lift, ring or zoom: motion on a non-control reads as a broken link.
 *  Two columns on phones keeps four 3:4 tiles from stacking into ~2,000px. */
export function ThemeShowcase() {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
      {DECOR_THEMES.map((t) => (
        <figure
          key={t.name}
          className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-ink-2)] text-[var(--color-paper)] ring-1 ring-inset ring-[var(--color-line)]"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <MediaImage
              media={t.media}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-5">
            <span aria-hidden className="mb-2 block h-px w-8 bg-[var(--color-accent-on-dark)] md:mb-3" />
            <p className="text-base font-semibold tracking-tight md:text-lg">{t.name}</p>
            <p className="mt-1 line-clamp-3 text-xs text-[var(--color-paper)]/80 md:line-clamp-none md:text-sm">
              {t.blurb}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
