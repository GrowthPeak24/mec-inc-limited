import Link from 'next/link';
import type { CaseStudy } from '@/types/content';
import { MediaImage } from '@/components/ui/MediaImage';

export function NextCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/portfolio/${study.slug}`}
      className="group relative block overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink-2)] text-[var(--color-paper)]"
    >
      <div className="relative aspect-[16/7] overflow-hidden md:aspect-[21/8]">
        <MediaImage
          media={study.hero}
          fill
          sizes="100vw"
          className="object-cover opacity-60 transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105 group-hover:opacity-70"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/60 to-transparent"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-2)]">
          Next case study
        </p>
        <h3 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight md:text-4xl">
          {study.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-paper)]/75 md:text-base">
          {study.summary}
        </p>
      </div>
    </Link>
  );
}
