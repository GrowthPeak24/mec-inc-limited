import Link from 'next/link';
import type { CaseStudy } from '@/types/content';
import { MediaImage } from '@/components/ui/MediaImage';
import { FrostTag } from '@/components/ui/Tag';

type Props = {
  study: CaseStudy;
  /** Feature card = bigger aspect + larger heading. Retained for API
   *  compatibility; both grids are deliberately uniform (see CLAUDE.md). */
  feature?: boolean;
  sizes?: string;
};

export function CaseStudyCard({ study, feature, sizes }: Props) {
  return (
    <Link
      href={`/portfolio/${study.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink-2)] text-[var(--color-paper)] ring-1 ring-inset ring-[var(--color-line)] transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:ring-[var(--color-gold)]/40 hover:shadow-[0_30px_60px_-30px_rgba(15,82,186,0.5)]"
    >
      <div
        className={
          feature
            ? 'relative aspect-[16/10] overflow-hidden'
            : 'relative aspect-[4/3] overflow-hidden'
        }
      >
        <MediaImage
          media={study.hero}
          fill
          sizes={sizes ?? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink-2)] via-black/20 to-transparent"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {study.tags.slice(0, 2).map((t) => (
            <FrostTag key={t}>{t}</FrostTag>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-paper)]/50">
          <span>{study.client}</span>
          <span className="tabular-nums">{study.year}</span>
        </div>
        <h3
          className={
            feature
              ? 'mt-3 line-clamp-2 text-2xl font-semibold leading-tight tracking-tight md:text-3xl'
              : 'mt-3 line-clamp-2 min-h-[3.25rem] text-xl font-semibold leading-tight tracking-tight'
          }
        >
          {study.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm text-[var(--color-paper)]/70">{study.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 border-t border-[var(--color-line)] pt-5 text-sm font-medium text-[var(--color-gold-2)] transition-colors duration-500 group-hover:text-[var(--color-paper)]">
          Read case study
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="nudge">
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
