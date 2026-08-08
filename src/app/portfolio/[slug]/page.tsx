import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES } from '@/content/case-studies';
import type { CaseStudy } from '@/types/content';
import { SITE } from '@/lib/site';
import { Section } from '@/components/ui/Section';
import { MediaImage } from '@/components/ui/MediaImage';
import { FrostTag } from '@/components/ui/Tag';
import { MetricsBar } from '@/components/portfolio/MetricsBar';
import { ProjectGallery } from '@/components/portfolio/ProjectGallery';
import { NextCaseStudy } from '@/components/portfolio/NextCaseStudy';
import { QuoteCTA } from '@/components/home/QuoteCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { caseStudySchema } from '@/lib/seo/case-study-jsonld';
import { breadcrumbSchema } from '@/lib/seo/service-jsonld';

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((s) => ({ slug: s.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const s = CASE_STUDIES.find((c) => c.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.summary,
    alternates: { canonical: `/portfolio/${s.slug}` },
    openGraph: {
      type: 'article',
      title: s.title,
      description: s.summary,
      url: `/portfolio/${s.slug}`,
      images: [{ url: s.hero.src.src }],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const idx = CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (idx === -1) notFound();
  // Widen the literal-narrowed element back to CaseStudy so optional
  // fields (partners, etc.) type-check when read below.
  const study: CaseStudy | undefined = CASE_STUDIES[idx];
  if (!study) notFound();

  const next: CaseStudy | undefined = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];

  const crumbs = [
    { name: 'Home', url: SITE.url },
    { name: 'Work', url: `${SITE.url}/portfolio` },
    { name: study.title, url: `${SITE.url}/portfolio/${study.slug}` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--color-ink)] text-[var(--color-paper)]">
        <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden">
          <MediaImage
            media={study.hero}
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-75"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent"
          />
        </div>
        <div className="container-x -mt-40 pb-16 md:-mt-52 md:pb-24">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-paper)]/60">
              <span>{study.client}</span>
              <span aria-hidden>·</span>
              <span>{study.year}</span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              {study.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-[var(--color-paper)]/80">
              {study.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.tags.map((t) => (
                <FrostTag key={t}>{t}</FrostTag>
              ))}
            </div>
          </div>
        </div>
      </section>

      {study.metrics.length > 0 && (
        <Section tone="paper" size="sm">
          <MetricsBar metrics={study.metrics} />
        </Section>
      )}

      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
              Challenge
            </h2>
            <p className="mt-3 text-[var(--color-ink)]/80">{study.challenge}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
              Approach
            </h2>
            <ul className="mt-3 space-y-2">
              {study.approach.map((a) => (
                <li key={a} className="flex gap-3 text-[var(--color-ink)]/80">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]"
                  />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
              Result
            </h2>
            <p className="mt-3 text-[var(--color-ink)]/80">{study.result}</p>
            {study.partners && study.partners.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink)]/60">
                  Partners
                </p>
                <p className="mt-2 text-[var(--color-ink)]/80">
                  {study.partners.join(' · ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {study.gallery.length > 0 && (
        <Section tone="paper">
          <ProjectGallery gallery={study.gallery} />
        </Section>
      )}

      {next && next.slug !== study.slug && (
        <Section tone="sand" size="sm">
          <NextCaseStudy study={next} />
        </Section>
      )}

      <QuoteCTA />

      <JsonLd data={caseStudySchema(study)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
