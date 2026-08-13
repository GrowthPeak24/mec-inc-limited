import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Brief received',
  description: 'Your brief is with our team.',
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ ref?: string; name?: string }>;

const REPLY_ADDRESS = 'mecincja@gmail.com';

/** The name arrives from an untrusted query string, so it is narrowed to a
 *  single plain-text given name before it is rendered. */
function sanitiseFirstName(raw: string | undefined): string | null {
  if (typeof raw !== 'string') return null;
  const first = raw.trim().split(/\s+/)[0];
  if (!first) return null;
  if (!/^[\p{L}][\p{L}'’-]{0,29}$/u.test(first)) return null;
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { name } = await searchParams;
  const firstName = sanitiseFirstName(name);

  return (
    <Section size="md">
      <div className="mx-auto w-full max-w-xl">
        <div className="relative rounded-[var(--radius-lg)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] px-6 py-12 text-center shadow-[0_1px_2px_rgba(10,14,26,0.04),0_18px_40px_-24px_rgba(10,14,26,0.16)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <Link
            href="/"
            aria-label="Close and return home"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-ink)]/40 transition-colors duration-200 hover:bg-[var(--color-sand)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)] sm:right-6 sm:top-6"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Link>

          <span className="confirm-badge mx-auto inline-flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="11" stroke="var(--color-gold)" strokeWidth="0.6" />
              <path
                className="confirm-check"
                d="M6.6 12.4l3.6 3.6L17.4 8.8"
                stroke="var(--color-gold)"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <h1
            className="confirm-rise mt-8 text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--color-ink)] sm:text-[2.5rem]"
            style={{ '--confirm-delay': '90ms' } as React.CSSProperties}
          >
            {firstName ? `Thank you, ${firstName}!` : 'Thank you!'}
          </h1>

          <p
            className="confirm-rise mx-auto mt-4 max-w-[34ch] text-base font-medium leading-relaxed text-[var(--color-ink)]/75 sm:text-lg"
            style={{ '--confirm-delay': '160ms' } as React.CSSProperties}
          >
            Your proposal brief has been received.
          </p>

          <p
            className="confirm-rise mx-auto mt-6 max-w-[44ch] text-sm leading-relaxed text-[var(--color-ink)]/55 sm:text-[0.9375rem]"
            style={{ '--confirm-delay': '220ms' } as React.CSSProperties}
          >
            An MEC Inc Ltd producer will review your requirements and be in touch within one
            business day.
          </p>

          <p
            className="confirm-rise mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-[var(--color-ink)]/55 sm:text-[0.9375rem]"
            style={{ '--confirm-delay': '280ms' } as React.CSSProperties}
          >
            We&rsquo;ll send your tailored proposal from{' '}
            <a
              href={`mailto:${REPLY_ADDRESS}`}
              className="inline-block break-all rounded-md bg-[var(--color-gold)]/10 px-1.5 py-0.5 font-semibold text-[var(--color-gold)] transition-colors duration-200 hover:bg-[var(--color-gold)]/[0.18]"
            >
              {REPLY_ADDRESS}
            </a>
            . Please check your inbox, and your spam folder just in case.
          </p>

          <div
            className="confirm-rise mt-10"
            style={{ '--confirm-delay': '350ms' } as React.CSSProperties}
          >
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-ink)] px-8 text-sm font-semibold tracking-tight text-[var(--color-paper)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--color-ink-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
