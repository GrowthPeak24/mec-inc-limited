import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { CopyReference } from '@/components/quote/CopyReference';

export const metadata: Metadata = {
  title: 'Brief received',
  description: 'Your brief is with our team.',
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ ref?: string }>;

const REPLY_ADDRESS = 'mecincja@gmail.com';

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { ref } = await searchParams;
  const reference =
    typeof ref === 'string' && /^MEC-\d{4}-[A-Z0-9]{4,}$/.test(ref) ? ref : null;

  return (
    <Section size="md">
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-6 shadow-[0_1px_2px_rgba(10,14,26,0.04),0_18px_40px_-24px_rgba(10,14,26,0.16)] sm:p-10 lg:p-12">
          <div className="text-center">
            <span className="confirm-badge inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-gold)]/10 ring-1 ring-inset ring-[var(--color-gold)]/20">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  className="confirm-check"
                  d="M5 12.5l4.2 4.2L19 7"
                  stroke="var(--color-gold)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <h1
              className="confirm-rise mt-7 text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)] sm:text-[2.5rem] lg:text-[2.75rem]"
              style={{ '--confirm-delay': '90ms' } as React.CSSProperties}
            >
              Your brief is in.
            </h1>

            <p
              className="confirm-rise mx-auto mt-5 max-w-[36ch] text-base leading-relaxed text-[var(--color-ink)]/80 sm:text-lg"
              style={{ '--confirm-delay': '160ms' } as React.CSSProperties}
            >
              Thank you. A producer will be in touch within one business day.
            </p>

            <p
              className="confirm-rise mx-auto mt-3 max-w-[42ch] text-sm leading-relaxed text-[var(--color-ink)]/55"
              style={{ '--confirm-delay': '220ms' } as React.CSSProperties}
            >
              We reply from{' '}
              <a
                href={`mailto:${REPLY_ADDRESS}`}
                className="inline-block break-all rounded-md bg-[var(--color-gold)]/10 px-1.5 py-0.5 font-medium text-[var(--color-gold)] transition-colors duration-200 hover:bg-[var(--color-gold)]/[0.18]"
              >
                {REPLY_ADDRESS}
              </a>
              . Keep an eye on your inbox, and just in case, your spam folder.
            </p>
          </div>

          {reference && (
            <div
              className="confirm-rise mt-9 flex flex-col gap-4 rounded-[var(--radius-md)] bg-[var(--color-sand)] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5"
              style={{ '--confirm-delay': '290ms' } as React.CSSProperties}
            >
              <div className="min-w-0">
                <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink)]/55">
                  Reference
                </span>
                <span className="mt-1.5 block break-all font-mono text-[0.9375rem] font-semibold tracking-[0.04em] text-[var(--color-ink)] sm:text-base">
                  {reference}
                </span>
              </div>
              <CopyReference reference={reference} />
            </div>
          )}

          <div
            className="confirm-rise mt-9 grid gap-3 sm:grid-cols-2"
            style={{ '--confirm-delay': '350ms' } as React.CSSProperties}
          >
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-ink)] px-6 text-sm font-semibold tracking-tight text-[var(--color-paper)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--color-ink-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]"
            >
              Back to home
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--color-line-ink)] px-6 text-sm font-medium tracking-tight text-[var(--color-ink)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--color-ink)]/35 hover:bg-[var(--color-sand)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]"
            >
              Explore case studies
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
