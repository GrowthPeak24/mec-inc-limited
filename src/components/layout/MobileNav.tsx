'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/content/nav';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line-ink)] text-[var(--color-ink)] lg:hidden"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
          {open ? (
            <path d="M2 2l14 10M16 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <path d="M1 2h16M1 7h16M1 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 bg-[var(--color-ink)] pt-24 lg:hidden"
        >
          <nav className="container-x flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-4 text-2xl font-medium text-[var(--color-paper)] hover:text-[var(--color-gold-2)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-4 text-base font-medium text-[var(--color-paper)]"
            >
              Request Proposal
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
