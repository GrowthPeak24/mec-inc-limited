import type { CaseStudy } from '@/types/content';
import { CaseStudyCard } from './CaseStudyCard';

/** Uniform grid — every card is the same size (equal image aspect, equal
 *  gaps). Feature/col-span rhythm was removed: mixing a tall feature card
 *  with short neighbours in the same grid row made `items-stretch` inflate
 *  the short cards, leaving ragged whitespace. A plain uniform grid keeps
 *  every card aligned and reads correctly at any filtered result count. */
export function PortfolioGrid({ studies }: { studies: readonly CaseStudy[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {studies.map((s) => (
        <li key={s.slug}>
          <CaseStudyCard
            study={s}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </li>
      ))}
    </ul>
  );
}
