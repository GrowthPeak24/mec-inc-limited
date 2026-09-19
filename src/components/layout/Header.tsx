import Link from 'next/link';
import { MobileNav } from './MobileNav';
import { NavLinks } from './NavLinks';
import { Wordmark } from '@/components/brand/Wordmark';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-line-ink)] bg-[var(--color-paper)]">
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

        <NavLinks />

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <Button href="/quote">Request Proposal</Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
