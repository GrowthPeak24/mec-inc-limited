'use client';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from '@/lib/clsx';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  hint?: string;
  variant: 'radio' | 'checkbox';
};

/** Big touch-friendly card that wraps a native input. Selection is
 *  driven by the input's `:checked` state via a sibling selector. */
export const SelectableCard = forwardRef<HTMLInputElement, Props>(function SelectableCard(
  { label, hint, variant, className, disabled, ...rest },
  ref,
) {
  return (
    <label
      aria-disabled={disabled || undefined}
      className={clsx(
        'group relative flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-4 text-left transition-colors',
        'has-[input:checked]:border-[var(--color-ink)] has-[input:checked]:bg-[var(--color-ink)] has-[input:checked]:text-[var(--color-paper)]',
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:border-[var(--color-ink)]',
        className,
      )}
    >
      <input
        ref={ref}
        type={variant}
        disabled={disabled}
        className="peer sr-only"
        {...rest}
      />
      <span className="flex items-start gap-3">
        <span
          aria-hidden
          className={clsx(
            'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-[var(--color-line-ink)] text-transparent',
            'group-has-[input:checked]:border-[var(--color-gold)] group-has-[input:checked]:bg-[var(--color-gold)] group-has-[input:checked]:text-[var(--color-paper)]',
            variant === 'checkbox' ? 'rounded-[6px]' : 'rounded-full',
          )}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l4 4 10-10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold leading-snug">{label}</span>
          {hint && (
            <span className="mt-1 text-xs text-current opacity-70">{hint}</span>
          )}
        </span>
      </span>
    </label>
  );
});
