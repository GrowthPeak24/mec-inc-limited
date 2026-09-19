import Link from 'next/link';
import { SITE } from '@/lib/site';
import { NAV_LINKS } from '@/content/nav';
import { Wordmark } from '@/components/brand/Wordmark';

export function Footer() {
  return (
    <footer
      data-surface="ink"
      className="border-t border-[var(--color-line)] bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            {/* Sapphire logo needs a light backdrop to stay legible on the ink footer. */}
            <span className="inline-flex items-center rounded-[var(--radius-md)] bg-[var(--color-paper)] px-3 py-2">
              <Wordmark height={32} />
            </span>
            <p className="mt-4 max-w-xs text-sm text-[var(--color-paper)]/60">
              {SITE.legalName}. {SITE.tagline}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-0 md:col-span-1">
            <p className="eyebrow col-span-2 mb-2 text-[var(--color-accent-on-dark)]">
              Explore
            </p>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-1.5 text-sm text-[var(--color-paper)]/80 hover:text-[var(--color-accent-on-dark)]"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/quote" className="py-1.5 text-sm text-[var(--color-paper)]/80 hover:text-[var(--color-accent-on-dark)]">
              Request Proposal
            </Link>
            <Link href="/feedback" className="py-1.5 text-sm text-[var(--color-paper)]/80 hover:text-[var(--color-accent-on-dark)]">
              Share Feedback
            </Link>
            <Link href="/privacy" className="py-1.5 text-sm text-[var(--color-paper)]/80 hover:text-[var(--color-accent-on-dark)]">
              Privacy
            </Link>
          </div>

          <address className="not-italic md:col-span-1">
            <p className="eyebrow mb-2 text-[var(--color-accent-on-dark)]">
              Visit &amp; Contact
            </p>
            <p className="text-sm text-[var(--color-paper)]/80">
              {SITE.address.street}<br />
              {SITE.address.locality}, {SITE.address.countryName}
            </p>
            <p className="mt-2 text-sm">
              <a href={SITE.tel.href} className="inline-block py-1.5 hover:text-[var(--color-accent-on-dark)]">{SITE.tel.display}</a>
              <br />
              <a href={`mailto:${SITE.email}`} className="inline-block py-1.5 hover:text-[var(--color-accent-on-dark)]">{SITE.email}</a>
            </p>
          </address>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-paper)]/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
          <p>Kingston, Jamaica</p>
        </div>
      </div>
    </footer>
  );
}
