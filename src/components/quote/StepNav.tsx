'use client';

type Props = {
  step: 1 | 2 | 3 | 4;
  submitting: boolean;
  onBack: () => void;
  onNext: () => void;
};

export function StepNav({ step, submitting, onBack, onNext }: Props) {
  const isLast = step === 4;
  return (
    <div className="mt-10 flex items-center justify-between gap-3 border-t border-[var(--color-line-ink)] pt-6">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 1 || submitting}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M19 12H5M11 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>
      <button
        type={isLast ? 'submit' : 'button'}
        onClick={isLast ? undefined : onNext}
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-2.5 text-sm font-semibold text-[var(--color-paper)] shadow-[0_10px_30px_-10px_rgba(15,82,186,0.5)] transition-colors hover:bg-[var(--color-ink-2)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLast ? (submitting ? 'Submitting…' : 'Submit') : 'Continue'}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
