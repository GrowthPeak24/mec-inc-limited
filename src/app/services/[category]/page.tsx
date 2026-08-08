import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICE_CATEGORIES } from '@/content/service-categories';
import { CASE_STUDIES } from '@/content/case-studies';
import { SITE } from '@/lib/site';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CapabilityList } from '@/components/services/CapabilityList';
import { ServiceFaq } from '@/components/services/ServiceFaq';
import { CaseStudyCard } from '@/components/portfolio/CaseStudyCard';
import { MediaImage } from '@/components/ui/MediaImage';
import { QuoteCTA } from '@/components/home/QuoteCTA';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from '@/lib/seo/service-jsonld';

/** Static build for exactly the 3 known categories.
 *  dynamicParams=false → any other slug returns a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((c) => ({ category: c.slug }));
}

/** Map pillar id → PortfolioTag used on case studies. */
const PILLAR_TO_TAG = {
  marketing: 'Strategic Marketing',
  events: 'Event Production',
  catering: 'Bespoke Catering',
} as const;

type PageProps = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = SERVICE_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: cat.seo.title,
    description: cat.seo.description,
    alternates: { canonical: `/services/${cat.slug}` },
    openGraph: {
      url: `/services/${cat.slug}`,
      title: cat.seo.title,
      description: cat.seo.description,
    },
  };
}

export default async function ServiceCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = SERVICE_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const relatedTag = PILLAR_TO_TAG[cat.pillarId];
  const related = CASE_STUDIES.filter((s) =>
    (s.tags as readonly string[]).includes(relatedTag),
  ).slice(0, 3);

  const crumbs = [
    { name: 'Home', url: SITE.url },
    { name: 'Services', url: `${SITE.url}/services` },
    { name: cat.name, url: `${SITE.url}/services/${cat.slug}` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]">
        <div className="absolute inset-0 -z-10">
          <MediaImage
            media={cat.hero}
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-45"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/85 to-[var(--color-ink)]/60"
          />
        </div>
        <div className="container-x flex min-h-[420px] flex-col justify-end pt-24 pb-16 md:min-h-[520px] md:pt-32 md:pb-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-2)]">
              Service
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              {cat.name}
            </h1>
            <p className="mt-5 text-lg text-[var(--color-paper)]/85">{cat.intro}</p>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title={`What we deliver under ${cat.name}.`}
          />
        </Reveal>
        <div className="mt-12">
          <Reveal>
            <CapabilityList groups={cat.capabilityGroups} />
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="sand">
          <Reveal>
            <SectionHeading
              eyebrow="Related work"
              title={`Selected ${cat.name.toLowerCase()} projects.`}
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((s) => (
              <CaseStudyCard
                key={s.slug}
                study={s}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ))}
          </div>
        </Section>
      )}

      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions we hear before every engagement."
          />
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <ServiceFaq faqs={cat.faqs} />
          </Reveal>
        </div>
      </Section>

      <QuoteCTA />

      <JsonLd data={serviceSchema(cat)} />
      <JsonLd data={faqSchema(cat.faqs)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
