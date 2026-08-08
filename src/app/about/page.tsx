import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProofStrip } from '@/components/home/ProofStrip';
import { QuoteCTA } from '@/components/home/QuoteCTA';
import { Reveal } from '@/components/ui/Reveal';
import { MediaImage } from '@/components/ui/MediaImage';
import teamImg from '@/assets/media/about/01-team-in-action.avif';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Owner-operated full-service marketing agency and event production company in Kingston, Jamaica. Ten years of integrated delivery for enterprise brands.',
  alternates: { canonical: '/about' },
  openGraph: { url: '/about' },
};

const TIMELINE = [
  { year: '2014', title: 'Founded in Kingston', body: 'MEC opens with a client roster built around live experiences and integrated marketing.' },
  { year: '2016', title: 'First enterprise mandates', body: 'Wins recurring engagements with anchor Jamaican brands and financial institutions.' },
  { year: '2019', title: 'Catering pillar formalised', body: 'Bespoke catering becomes an in-house discipline. No more sub-contracting the menu.' },
  { year: '2022', title: 'Full-service production', body: 'Stage, booth build and technical production consolidated in-house for zero-handoff delivery.' },
  { year: '2026', title: 'Ten years, one team', body: 'A decade of delivery for NCB, Wisynco, Scotiabank, Nestlé, LASCO and more. Still owner-operated.' },
] as const;

const APPROACH = [
  { title: 'One accountable producer', body: 'Every engagement gets a single senior producer across all three pillars, not a hand-off between departments.' },
  { title: 'Scoping in the open', body: 'Line-item estimates with inclusions, exclusions and options. Never a lump-sum number that has to be trusted on faith.' },
  { title: 'Measured against the brief', body: 'Every project is instrumented against the KPIs agreed at brief, so the spend is defensible after the event.' },
] as const;

export default function AboutPage() {
  return (
    <>
      <Section tone="ink">
        <Reveal>
          <SectionHeading
            eyebrow="About MEC Inc."
            title="Marketing, Events and Catering, delivered as one integrated craft."
            intro={`${SITE.legalName} has spent a decade delivering for the brands that set the bar in Jamaican enterprise. We stay small and owner-operated on purpose, so every engagement gets the seniority it was sold on.`}
            tone="paper"
          />
        </Reveal>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink-2)]">
              <MediaImage
                media={{ src: teamImg, alt: 'MEC Inc. team on-site during an enterprise event build.' }}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Ten years of delivery, one accountable team.
              </h2>
              <p className="mt-5 text-[var(--color-ink)]/70">
                MEC was built on the premise that marketing, events and catering are one craft in
                practice. Separating them across three vendors is where enterprise programmes
                go wrong. We coordinate the whole delivery under a single producer, so the client
                brief travels intact from concept to strike.
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-[var(--color-line-ink)] pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-[var(--color-ink)]/60">Founded</dt>
                  <dd className="mt-1 text-2xl font-semibold text-[var(--color-gold)]">{SITE.founded}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-[var(--color-ink)]/60">Base</dt>
                  <dd className="mt-1 text-2xl font-semibold text-[var(--color-gold)]">Kingston</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-[var(--color-ink)]/60">Served</dt>
                  <dd className="mt-1 text-2xl font-semibold text-[var(--color-gold)]">Caribbean</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper">
        <Reveal>
          <SectionHeading
            title="A decade in five moments."
            align="center"
          />
        </Reveal>
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {TIMELINE.map((t) => (
            <li
              key={t.year}
              className="rounded-[var(--radius-lg)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-5"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                {t.year}
              </span>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-[var(--color-ink)]">
                {t.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink)]/70">{t.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="sand">
        <Reveal>
          <SectionHeading
            eyebrow="Approach"
            title="How we operate."
            align="center"
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
          {APPROACH.map((a) => (
            <div
              key={a.title}
              className="rounded-[var(--radius-xl)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                {a.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--color-ink)]/70">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <ProofStrip />
      <QuoteCTA />
    </>
  );
}
