import Link from 'next/link';
import { NAV_LINKS } from '@/content/nav';
import { MobileNav } from './MobileNav';
import { Wordmark } from '@/components/brand/Wordmark';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-line-ink)] bg-[var(--color-paper)]/90 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label="MEC Inc. Limited home"
          className="flex items-center py-2 md:py-2.5"
        >
          {/* Mobile: 28px, desktop: 36px — keeps container padding roomy. */}
          <Wordmark height={28} priority className="md:hidden" />
          <Wordmark height={36} priority className="hidden md:block" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-[var(--color-ink)]/75 hover:bg-[var(--color-sand)] hover:text-[var(--color-ink)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/quote"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-paper)] hover:bg-[var(--color-gold)]"
          >
            Request Proposal
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
