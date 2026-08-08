'use client';
import { clsx } from '@/lib/clsx';

const STEP_LABELS = ['Service', 'Scale', 'Concept', 'Details'] as const;

export function StepProgress({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <ol
      className="flex items-center gap-3 md:gap-4"
      aria-label="Quote Builder progress"
    >
      {STEP_LABELS.map((label, i) => {
        const step = (i + 1) as 1 | 2 | 3 | 4;
        const active = step === current;
        const done = step < current;
        return (
          <li
            key={label}
            className="flex flex-1 items-center gap-3"
            aria-current={active ? 'step' : undefined}
          >
            <span
              className={clsx(
                'grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors',
                done
                  ? 'bg-[var(--color-gold)] text-[var(--color-paper)]'
                  : active
                    ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
                    : 'bg-[var(--color-sand-2)] text-[var(--color-ink)]/50',
              )}
            >
              {done ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12l4 4 10-10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                step
              )}
            </span>
            <span
              className={clsx(
                'hidden text-sm font-medium md:inline',
                active
                  ? 'text-[var(--color-ink)]'
                  : 'text-[var(--color-ink)]/60',
              )}
            >
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <span
                aria-hidden
                className={clsx(
                  'h-px flex-1 transition-colors',
                  done ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-line-ink)]',
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
