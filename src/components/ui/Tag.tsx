import type { ReactNode } from 'react';
import { clsx } from '@/lib/clsx';

export function Tag({
  children,
  active,
  as: Tag = 'span',
  className,
  href,
}: {
  children: ReactNode;
  active?: boolean;
  as?: 'span' | 'a';
  className?: string;
  href?: string;
}) {
  const cls = clsx(
    'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-tight transition-colors',
    active
      ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-paper)]'
      : 'border-[var(--color-line-ink)] bg-transparent text-[var(--color-ink)]/80 hover:border-[var(--color-ink)]/40 hover:text-[var(--color-ink)]',
    className,
  );
  if (Tag === 'a' && href) return <a href={href} className={cls}>{children}</a>;
  return <Tag className={cls}>{children}</Tag>;
}

export function FrostTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'frost inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight text-[var(--color-paper)]',
        className,
      )}
    >
      {children}
    </span>
  );
}
