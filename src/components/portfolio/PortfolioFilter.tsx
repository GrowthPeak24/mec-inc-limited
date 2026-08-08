import Link from 'next/link';
import { PORTFOLIO_TAGS, type PortfolioTag } from '@/types/content';
import { clsx } from '@/lib/clsx';

/** URL-driven filter — chips are <Link> not click handlers. Works with
 *  JS disabled; filtered views are shareable and back-button-correct. */
export function PortfolioFilter({ active }: { active: PortfolioTag | null }) {
  const chips: readonly ({ label: string; href: string; value: PortfolioTag | null })[] = [
    { label: 'All work', href: '/portfolio', value: null },
    ...PORTFOLIO_TAGS.map((t) => ({
      label: t,
      href: `/portfolio?tag=${encodeURIComponent(t)}`,
      value: t as PortfolioTag,
    })),
  ];
  return (
    <nav aria-label="Filter case studies by discipline">
      <ul className="flex flex-wrap items-center gap-2">
        {chips.map((c) => {
          const isActive = c.value === active;
          return (
            <li key={c.label}>
              <Link
                href={c.href}
                aria-current={isActive ? 'page' : undefined}
                scroll={false}
                className={clsx(
                  'inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]'
                    : 'border-[var(--color-line-ink)] bg-[var(--color-paper)] text-[var(--color-ink)] hover:border-[var(--color-ink)]',
                )}
              >
                {c.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
