'use client';
import { useEffect, useRef, useState } from 'react';

type State = 'idle' | 'copied' | 'error';

const LABEL: Record<State, string> = {
  idle: 'Copy reference',
  copied: 'Copied',
  error: 'Copy failed',
};

/** Clipboard control for the quote reference on /quote/thank-you.
 *  Deliberately a client leaf — the whole rest of the confirmation page stays
 *  a Server Component. Failure is surfaced in-place (no toast library) and the
 *  reference is always readable as plain text beside it, so a blocked
 *  clipboard never traps the user. */
export function CopyReference({ reference }: { reference: string }) {
  const [state, setState] = useState<State>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      if (!navigator.clipboard) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(reference);
      setState('copied');
    } catch {
      setState('error');
    }
    timer.current = setTimeout(() => setState('idle'), 2200);
  }

  return (
    <div className="flex w-full items-center gap-3 sm:w-auto">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy reference ${reference} to clipboard`}
        className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-full border border-[var(--color-line-ink)] bg-[var(--color-paper)] px-4 text-sm font-medium text-[var(--color-ink)] transition-colors duration-200 hover:border-[var(--color-ink)]/35 hover:bg-[var(--color-sand-2)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-sand)] sm:w-auto"
      >
        {state === 'copied' ? <CheckIcon /> : <CopyIcon />}
        <span>{LABEL[state]}</span>
      </button>
      {/* Announce the outcome without moving focus or shifting layout. */}
      <span aria-live="polite" className="sr-only">
        {state === 'copied'
          ? `Reference ${reference} copied to clipboard`
          : state === 'error'
            ? 'Could not copy automatically. Select the reference to copy it manually.'
            : ''}
      </span>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 15A2.5 2.5 0 0 1 4 12.7V6.5A2.5 2.5 0 0 1 6.5 4h6.2A2.5 2.5 0 0 1 15 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-[var(--color-gold)]"
    >
      <path
        d="M5 12.5l4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
