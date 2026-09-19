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
        'eyebrow inline-block',
        tone === 'paper' ? 'text-[var(--color-accent-on-dark)]' : 'text-[var(--color-gold)]',
        className,
      )}
    >
      {children}
    </span>
  );
}
