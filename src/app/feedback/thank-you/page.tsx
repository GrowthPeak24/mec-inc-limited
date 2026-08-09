import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Feedback received',
  description: 'Thank you for sharing your feedback with MEC Inc.',
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ ref?: string }>;

export default async function FeedbackThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { ref } = await searchParams;
  const reference =
    typeof ref === 'string' && /^MEC-\d{4}-[A-Z0-9]{4,}$/.test(ref) ? ref : null;

  return (
    <Section size="md">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-gold)] text-[var(--color-paper)]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12l4 4 10-10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <h1 className="mt-6 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] md:text-4xl">
          Thank you.
        </h1>
        <p className="mt-4 text-base text-[var(--color-ink)]/70">
          Your feedback has been received. Every note lands with the producer
          who ran your project.
        </p>

        {reference && (
          <div className="mx-auto mt-8 inline-flex flex-col items-center rounded-[var(--radius-md)] border border-[var(--color-line-ink)] bg-[var(--color-sand)] px-6 py-4">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink)]/60">
              Reference
            </span>
            <span className="mt-1 font-mono text-lg font-semibold text-[var(--color-ink)]">
              {reference}
            </span>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/portfolio"
            className="rounded-full border border-[var(--color-line-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-ink)]"
          >
            Explore case studies
          </Link>
          <Link
            href="/"
            className="rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm font-semibold text-[var(--color-paper)] hover:bg-[var(--color-ink-2)]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </Section>
  );
}
