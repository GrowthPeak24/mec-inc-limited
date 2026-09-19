import type { ReactNode } from 'react';
import { clsx } from '@/lib/clsx';

export function Eyebrow({
  children,
  tone = 'ink',
  className,
}: {
  children: ReactNode;
  tone?: 'ink' | 'paper';
  className?: string;
}) {
  return (
    <span
      className={clsx(
        'inline-block text-xs font-semibold uppercase tracking-[0.18em]',
        tone === 'paper' ? 'text-[var(--color-accent-on-dark)]' : 'text-[var(--color-gold)]',
        className,
      )}
    >
      {children}
    </span>
  );
}
