import Link from 'next/link';
import type { CaseStudy } from '@/types/content';
import { MediaImage } from '@/components/ui/MediaImage';
import { FrostTag } from '@/components/ui/Tag';

type Props = {
  study: CaseStudy;
  /** Feature card = bigger aspect + larger heading. */
  feature?: boolean;
  sizes?: string;
};

export function CaseStudyCard({ study, feature, sizes }: Props) {
  return (
    <Link
      href={`/portfolio/${study.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink-2)] text-[var(--color-paper)]"
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
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {study.tags.slice(0, 2).map((t) => (
            <FrostTag key={t}>{t}</FrostTag>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[var(--color-paper)]/60">
          <span>{study.client}</span>
          <span>{study.year}</span>
        </div>
        <h3
          className={
            feature
              ? 'mt-2 line-clamp-2 text-2xl font-semibold leading-tight tracking-tight md:text-3xl'
              : 'mt-2 line-clamp-2 min-h-[3.25rem] text-xl font-semibold leading-tight tracking-tight'
          }
        >
          {study.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm text-[var(--color-paper)]/70">{study.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-[var(--color-gold-2)]">
          Read case study
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
