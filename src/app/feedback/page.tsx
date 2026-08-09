import type { Metadata } from 'next';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Share your feedback',
  description:
    'Tell us how MEC Inc. did. Your feedback shapes the next event, the next campaign, the next team.',
  // Feedback is a private write-only surface — indexing it would surface an
  // empty form with no content value.
  robots: { index: false, follow: false },
};

export default function FeedbackPage() {
  return (
    <Section size="md">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
          Customer feedback
        </p>
        <h1 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] md:text-4xl">
          Tell us how we did.
        </h1>
        <p className="mt-4 text-base text-[var(--color-ink)]/70">
          One rating. One paragraph. It takes under a minute and it directly
          shapes how we run the next brief. If you&rsquo;d prefer we keep it
          internal, leave the &ldquo;quote me publicly&rdquo; box unchecked.
        </p>
      </header>

      <div className="mx-auto mt-10 max-w-2xl rounded-[var(--radius-lg)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-6 md:p-10">
        <FeedbackForm />
      </div>
    </Section>
  );
}
