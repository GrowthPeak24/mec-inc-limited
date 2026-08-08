import { FEATURED_CASE_STUDIES } from '@/content/case-studies';
import { CaseStudyCard } from '@/components/portfolio/CaseStudyCard';
import { Button } from '@/components/ui/Button';

/** Home: featured work grid. Uniform 2-up grid — every card is the same
 *  size (equal image aspect, equal gaps), and `items-stretch` (grid default)
 *  equalises card height per row so no ragged whitespace appears between
 *  cards as you scroll. */
export function FeaturedCaseStudies() {
  if (FEATURED_CASE_STUDIES.length === 0) return null;

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
        {FEATURED_CASE_STUDIES.map((s) => (
          <CaseStudyCard
            key={s.slug}
            study={s}
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button href="/portfolio" variant="outline" size="lg">
          View all work
        </Button>
      </div>
    </div>
  );
}
