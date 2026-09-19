import type { Metadata } from 'next';
import { CASE_STUDIES } from '@/content/case-studies';
import { PORTFOLIO_TAGS, type PortfolioTag } from '@/types/content';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PageHero, PhotoStack } from '@/components/ui/PageHero';
import { PortfolioFilter } from '@/components/portfolio/PortfolioFilter';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { EmptyState } from '@/components/portfolio/EmptyState';
import { QuoteCTA } from '@/components/home/QuoteCTA';

type SP = { tag?: string | string[] };

/** Hero photo stack: covers of the first three case studies. */
const COVERS = CASE_STUDIES.slice(0, 3).map((s) => s.hero);

function parseTag(sp: SP): PortfolioTag | null {
  const raw = Array.isArray(sp.tag) ? sp.tag[0] : sp.tag;
  if (!raw) return null;
  return (PORTFOLIO_TAGS as readonly string[]).includes(raw) ? (raw as PortfolioTag) : null;
}

/** All variants share one canonical /portfolio to avoid parameter-based
 *  duplicate indexing. Filtered variants are noindex,follow. */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SP>;
}): Promise<Metadata> {
  const tag = parseTag(await searchParams);
  const title = tag ? `${tag} Case Studies` : 'Selected Work in Jamaica';
  const description = tag
    ? `${tag} case studies from MEC Inc., Kingston, Jamaica. Enterprise projects for NCB, Wisynco, Scotiabank, Nestlé and more.`
    : 'Corporate event, marketing and catering case studies from MEC Inc., Kingston. A decade of enterprise delivery in Jamaica.';
  return {
    title,
    description,
    alternates: { canonical: '/portfolio' },
    robots: tag ? { index: false, follow: true } : undefined,
  };
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const active = parseTag(await searchParams);
  const studies = active
    ? CASE_STUDIES.filter((s) => (s.tags as readonly string[]).includes(active))
    : CASE_STUDIES;

  return (
    <>
      <PageHero
        aside={<PhotoStack images={COVERS} />}
      >
        <SectionHeading
          eyebrow="Selected work"
          title="A decade of delivery for Jamaica's enterprise brands."
          intro="Case studies filterable by discipline. Every project scoped, staffed and produced by one accountable MEC team."
          tone="paper"
        />
        <div className="mt-10">
          <PortfolioFilter active={active} />
        </div>
      </PageHero>

      <Section tone="sand">
        {studies.length > 0 ? (
          <PortfolioGrid studies={studies} />
        ) : (
          <EmptyState tag={active ?? 'this filter'} />
        )}
      </Section>

      <QuoteCTA />
    </>
  );
}
