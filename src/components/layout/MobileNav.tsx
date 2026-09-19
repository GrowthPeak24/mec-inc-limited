'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NAV_LINKS } from '@/content/nav';
import { isActiveHref } from '@/lib/nav';

/** Full-screen menu below `lg`.
 *
 *  The panel is portalled to <body>: the sticky header used to carry a
 *  backdrop-filter, which makes it the containing block for `position: fixed`
 *  descendants, so an in-header overlay collapsed to header height. It sits at
 *  z-20 under the header (z-30) so the toggle stays visible and doubles as the
 *  close button. Focus is moved into the panel on open, wrapped while open, and
 *  returned to the toggle on close. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;

    const items = () =>
      [
        toggle,
        ...(panelRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? []),
      ].filter((el): el is HTMLElement => el != null);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const list = items();
      if (list.length === 0) return;
      const i = list.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey
        ? (i <= 0 ? list.length - 1 : i - 1)
        : (i === list.length - 1 ? 0 : i + 1);
      e.preventDefault();
      list[next]?.focus();
    };

    window.addEventListener('keydown', onKey);
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line-ink)] text-[var(--color-ink)] lg:hidden"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
          {open ? (
            <path d="M2 2l14 10M16 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <path d="M1 2h16M1 7h16M1 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-surface="ink"
            className="fixed inset-0 z-20 overflow-y-auto bg-[var(--color-ink)] pt-24 pb-10 lg:hidden"
          >
            <nav aria-label="Primary" className="container-x flex flex-col gap-1">
              {NAV_LINKS.map((l) => {
                const active = isActiveHref(pathname, l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={
                      active
                        ? 'rounded-lg px-3 py-4 text-2xl font-medium text-[var(--color-accent-on-dark)]'
                        : 'rounded-lg px-3 py-4 text-2xl font-medium text-[var(--color-paper)] hover:text-[var(--color-accent-on-dark)]'
                    }
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--color-sapphire)] px-6 py-4 text-base font-medium text-[var(--color-paper)]"
              >
                Request Proposal
              </Link>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
