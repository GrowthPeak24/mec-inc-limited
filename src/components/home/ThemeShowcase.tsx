import { DECOR_THEMES } from '@/content/decor-themes';
import { MediaImage } from '@/components/ui/MediaImage';

export function ThemeShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {DECOR_THEMES.map((t) => (
        <figure
          key={t.name}
          className="group relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-ink-2)] text-[var(--color-paper)]"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <MediaImage
              media={t.media}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-lg font-semibold tracking-tight">{t.name}</p>
            <p className="mt-1 text-sm text-[var(--color-paper)]/75">{t.blurb}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
