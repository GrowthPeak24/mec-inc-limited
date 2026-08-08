import Link from 'next/link';
import { MediaImage } from '@/components/ui/MediaImage';
import type { ServicePillar } from '@/types/content';

function PillarIcon({ kind }: { kind: ServicePillar['icon'] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (kind === 'chart')
    return (
      <svg {...common} aria-hidden>
        <path d="M4 20V6M4 20h16" />
        <path d="M8 16l4-4 3 3 5-6" />
      </svg>
    );
  if (kind === 'stage')
    return (
      <svg {...common} aria-hidden>
        <path d="M3 10h18M4 10v10M20 10v10M8 20v-4h8v4" />
        <path d="M8 6l4-3 4 3" />
      </svg>
    );
  return (
    <svg {...common} aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v4M8 6l1.5 3M16 6l-1.5 3" />
    </svg>
  );
}

export function PillarCard({ pillar }: { pillar: ServicePillar }) {
  return (
    <Link
      href={`/services/${pillar.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-paper)] shadow-[0_1px_0_rgba(10,14,26,0.06),0_20px_50px_-30px_rgba(10,14,26,0.35)] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(10,14,26,0.06),0_30px_60px_-30px_rgba(10,14,26,0.5)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <MediaImage
          media={pillar.media}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center gap-2 text-[var(--color-gold)]">
          <PillarIcon kind={pillar.icon} />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Pillar 0{pillar.id === 'marketing' ? 1 : pillar.id === 'events' ? 2 : 3}
          </span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
          {pillar.name}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-ink)]/70">{pillar.tagline}</p>
        <p className="mt-4 text-sm text-[var(--color-ink)]/60">{pillar.blurb}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-gold)]">
          Explore capabilities
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
