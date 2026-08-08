import type { CaseStudy } from '@/types/content';
import { CaseStudyCard } from './CaseStudyCard';

/** Uniform grid with intentional feature spans on lg — not masonry
 *  (which needs JS and breaks natural reading order). */
export function PortfolioGrid({ studies }: { studies: readonly CaseStudy[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
      {studies.map((s, i) => {
        // Rhythm: first card spans 4 cols on lg, then alternating pairs of 3+3, next 4+2 etc.
        // Simpler: every 5th index features (spans 4), others span 3 or 2.
        const feature = i % 5 === 0;
        return (
          <li
            key={s.slug}
            className={feature ? 'lg:col-span-4' : 'lg:col-span-2'}
          >
            <CaseStudyCard
              study={s}
              feature={feature}
              sizes={
                feature
                  ? '(max-width: 1024px) 100vw, 66vw'
                  : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
