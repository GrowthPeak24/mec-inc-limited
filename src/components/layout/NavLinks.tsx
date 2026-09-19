'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/content/nav';
import { isActiveHref } from '@/lib/nav';

/** Desktop primary nav. Client-side only for `usePathname`, so the current page
 *  can be marked with `aria-current` and a visible underline. The underline
 *  carries the state: a sand pill alone is too close to the paper header to
 *  pass the 3:1 non-text contrast bar. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NAV_LINKS.map((l) => {
          const active = isActiveHref(pathname, l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={
                  active
                    ? "relative rounded-full px-4 py-2 text-sm font-medium text-[var(--color-ink)] after:absolute after:inset-x-4 after:-bottom-px after:h-0.5 after:rounded-full after:bg-[var(--color-gold)] after:content-['']"
                    : 'rounded-full px-4 py-2 text-sm font-medium text-[var(--color-ink)]/75 transition-colors duration-200 hover:bg-[var(--color-sand)] hover:text-[var(--color-ink)]'
                }
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
