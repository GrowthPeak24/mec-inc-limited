import type { ReactNode } from 'react';
import { clsx } from '@/lib/clsx';
import { Eyebrow } from './Eyebrow';

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'ink',
  align = 'left',
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: 'ink' | 'paper';
  align?: 'left' | 'center';
  id?: string;
  className?: string;
}) {
  return (
    <header
      className={clsx(
        'flex max-w-3xl flex-col gap-4',
        align === 'center' && 'mx-auto text-center items-center',
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={clsx(
          'text-3xl leading-[1.1] md:text-4xl lg:text-5xl font-semibold',
          tone === 'paper' ? 'text-[var(--color-paper)]' : 'text-[var(--color-ink)]',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={clsx(
            'text-base md:text-lg leading-relaxed max-w-2xl',
            tone === 'paper' ? 'text-[var(--color-paper)]/75' : 'text-[var(--color-ink)]/70',
          )}
        >
          {intro}
        </p>
      )}
    </header>
  );
}
