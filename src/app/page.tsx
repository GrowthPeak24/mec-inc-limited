import type { Metadata } from 'next';
import { HeroBento } from '@/components/hero/HeroBento';
import { TrustStats } from '@/components/hero/TrustStats';
import { ProofStrip } from '@/components/home/ProofStrip';
import { PillarsGrid } from '@/components/services/PillarsGrid';
import { FeaturedCaseStudies } from '@/components/home/FeaturedCaseStudies';
import { CapabilitiesRibbon } from '@/components/home/CapabilitiesRibbon';
import { ThemeShowcase } from '@/components/home/ThemeShowcase';
import { CateringTeaser } from '@/components/home/CateringTeaser';
import { QuoteCTA } from '@/components/home/QuoteCTA';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: { absolute: 'Marketing, Events & Catering in Jamaica | MEC Inc.' },
  description:
    'Full-service marketing agency and corporate event production company in Kingston, Jamaica. Bespoke catering and brand activation for enterprise clients.',
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
};

export default function HomePage() {
  return (
    <>
      {/* Hero; never wrap in <Reveal> so it paints pre-hydration. */}
      <HeroBento />

      <TrustStats />

      <ProofStrip />

      <Section tone="sand">
        <Reveal>
          <SectionHeading
            eyebrow="Three pillars, one team"
            title="One accountable producer across marketing, events and catering."
            intro="You brief once. We deliver against a single scope of work, not three coordinated vendors."
            align="center"
          />
        </Reveal>
        <div className="mt-14">
          <Reveal stagger>
            <PillarsGrid />
          </Reveal>
        </div>
      </Section>

      <Section tone="paper">
        <Reveal>
          <SectionHeading
            title="Recent projects, produced end to end."
            intro="Every project is scoped, staffed and produced by one accountable MEC team. Browse the full portfolio by discipline."
          />
        </Reveal>
        <div className="mt-12">
          <Reveal stagger>
            <FeaturedCaseStudies />
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <Reveal>
          <CapabilitiesRibbon />
        </Reveal>
      </Section>

      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="Themed experiences"
            title="Bespoke décor, built for the room."
            intro="A selection of the themes MEC has designed and produced. Custom concepts on request."
            align="center"
          />
        </Reveal>
        <div className="mt-14">
          <Reveal stagger>
            <ThemeShowcase />
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <Reveal>
          <CateringTeaser />
        </Reveal>
      </Section>

      <QuoteCTA />
    </>
  );
}
