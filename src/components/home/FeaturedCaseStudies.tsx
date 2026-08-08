import { FEATURED_CASE_STUDIES } from '@/content/case-studies';
import { CaseStudyCard } from '@/components/portfolio/CaseStudyCard';
import { Button } from '@/components/ui/Button';

/** Home: featured work grid. Layout — feature card spans 8 cols at lg,
 *  remainder spans 4. Keeps hierarchy without needing masonry. */
export function FeaturedCaseStudies() {
  const [feature, ...rest] = FEATURED_CASE_STUDIES;
  if (!feature) return null;

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <CaseStudyCard
            study={feature}
            feature
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:gap-6">
          {rest.slice(0, 2).map((s) => (
            <CaseStudyCard
              key={s.slug}
              study={s}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ))}
        </div>
      </div>
      {rest.length > 2 && (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {rest.slice(2).map((s) => (
            <CaseStudyCard
              key={s.slug}
              study={s}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ))}
        </div>
      )}
      <div className="mt-12 flex justify-center">
        <Button href="/portfolio" variant="outline" size="lg">
          View all work
        </Button>
      </div>
    </div>
  );
}
