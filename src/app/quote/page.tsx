import type { Metadata } from 'next';
import { QuoteBuilder } from '@/components/quote/QuoteBuilder';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Request a proposal',
  description:
    'Tell us about your event, campaign or brand moment. We\u2019ll come back within one business day.',
  robots: { index: false, follow: false },
};

export default function QuotePage() {
  return (
    <Section size="md">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
          Quote Builder
        </p>
        <h1 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] md:text-4xl">
          A four-step brief. We&rsquo;ll take it from there.
        </h1>
        <p className="mt-4 text-base text-[var(--color-ink)]/70">
          The more context you can share up front, the sharper our first response.
          Nothing here is binding. It&rsquo;s just enough for us to scope.
        </p>
      </header>

      <div className="mt-10">
        <QuoteBuilder />
      </div>
    </Section>
  );
}
