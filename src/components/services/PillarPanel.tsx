import Link from 'next/link';
import type { ServicePillar } from '@/types/content';
import { MediaImage } from '@/components/ui/MediaImage';

/** /services overview panel — alternating left/right rhythm by index. */
export function PillarPanel({
  pillar,
  index,
}: {
  pillar: ServicePillar;
  index: number;
}) {
  const flipped = index % 2 === 1;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div
        className={
          flipped
            ? 'relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink-2)] lg:order-2'
            : 'relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink-2)]'
        }
      >
        <MediaImage
          media={pillar.media}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className={flipped ? 'lg:order-1' : ''}>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
          Pillar 0{pillar.id === 'marketing' ? 1 : pillar.id === 'events' ? 2 : 3}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          {pillar.name}
        </h2>
        <p className="mt-3 text-lg text-[var(--color-ink)]/70">{pillar.tagline}</p>
        <p className="mt-5 max-w-xl text-[var(--color-ink)]/70">{pillar.blurb}</p>
        <Link
          href={`/services/${pillar.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-gold)]"
        >
          See {pillar.name.toLowerCase()} capabilities
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
