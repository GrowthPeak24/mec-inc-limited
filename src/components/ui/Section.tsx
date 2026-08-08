import type { ReactNode } from 'react';
import { clsx } from '@/lib/clsx';

/**
 * Standard vertical rhythm section. Tones:
 *   ink   – deep navy field (default hero/heavy blocks)
 *   sand  – warm paper (default body sections)
 *   paper – pure white (cards, insets)
 */
export function Section({
  children,
  tone = 'sand',
  size = 'md',
  className,
  id,
  ariaLabelledBy,
}: {
  children: ReactNode;
  tone?: 'ink' | 'sand' | 'paper';
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
  ariaLabelledBy?: string;
}) {
  const tones = {
    ink: 'bg-[var(--color-ink)] text-[var(--color-paper)]',
    sand: 'bg-[var(--color-sand)] text-[var(--color-ink)]',
    paper: 'bg-[var(--color-paper)] text-[var(--color-ink)]',
  };
  const sizes = {
    sm: 'py-10 md:py-14',
    md: 'py-16 md:py-24 lg:py-28',
  };
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={clsx(sizes[size], tones[tone], className)}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}
