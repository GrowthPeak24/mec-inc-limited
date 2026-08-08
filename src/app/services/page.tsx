import type { Metadata } from 'next';
import { SERVICE_PILLARS } from '@/content/service-pillars';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PillarPanel } from '@/components/services/PillarPanel';
import { ProcessSteps } from '@/components/services/ProcessSteps';
import { QuoteCTA } from '@/components/home/QuoteCTA';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Services in Jamaica',
  description:
    'Full-service marketing agency, corporate event production and bespoke catering in Kingston, Jamaica. One accountable producer, one scope of work.',
  alternates: { canonical: '/services' },
  openGraph: {
    url: '/services',
    title: 'Services in Jamaica | MEC Inc. Limited',
    description:
      'Full-service marketing agency, corporate event production and bespoke catering in Kingston, Jamaica.',
  },
};

export default function ServicesPage() {
  return (
    <>
      <Section tone="ink">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Three disciplines. One producer per engagement."
            intro="Marketing, events and catering are usually briefed to three separate vendors. We deliver them as one integrated scope, with the coordination cost absorbed on our side, not yours."
            tone="paper"
          />
        </Reveal>
      </Section>

      <Section tone="sand">
        <div className="space-y-20 md:space-y-28">
          {SERVICE_PILLARS.map((p, i) => (
            <Reveal key={p.id}>
              <PillarPanel pillar={p} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="How we work"
            title="A four-step process, from brief to wrap."
            align="center"
          />
        </Reveal>
        <div className="mt-14">
          <Reveal>
            <ProcessSteps />
          </Reveal>
        </div>
      </Section>

      <QuoteCTA />
    </>
  );
}
