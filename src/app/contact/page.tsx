import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { ContactForm } from '@/components/contact/ContactForm';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact MEC Inc. for corporate event production, brand activation and bespoke catering in Kingston, Jamaica. Call 876-565-8200 or start a scoped brief.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact' },
};

const OPEN_MAPS = `https://www.google.com/maps/search/?api=1&query=${SITE.geo.latitude},${SITE.geo.longitude}`;
const STATIC_MAP_ALT = `Static map showing ${SITE.address.street}, ${SITE.address.locality}`;

export default function ContactPage() {
  return (
    <Section size="md">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
            Contact
          </p>
          <h1 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] md:text-4xl">
            Let&rsquo;s build something worth remembering.
          </h1>
          <p className="mt-4 text-base text-[var(--color-ink)]/70">
            For scoped briefs, the four-step{' '}
            <a href="/quote" className="underline underline-offset-2">
              Quote Builder
            </a>{' '}
            gets you a response fastest. For everything else, use the form or call
            us directly.
          </p>

          <dl className="mt-8 space-y-5 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink)]/60">
                Phone
              </dt>
              <dd className="mt-1">
                <a
                  href={SITE.tel.href}
                  className="text-base font-medium text-[var(--color-ink)] hover:text-[var(--color-gold)]"
                >
                  {SITE.tel.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink)]/60">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-base font-medium text-[var(--color-ink)] hover:text-[var(--color-gold)]"
                >
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink)]/60">
                Office
              </dt>
              <dd className="mt-1 text-base text-[var(--color-ink)]">
                {SITE.address.street}
                <br />
                {SITE.address.locality}, {SITE.address.countryName}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink)]/60">
                Hours
              </dt>
              <dd className="mt-1 text-base text-[var(--color-ink)]">
                Monday &ndash; Friday, 9:00 &ndash; 17:00 (AST)
              </dd>
            </div>
          </dl>

          <div className="mt-8 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line-ink)]">
            {/* Static map placeholder — swap `src` for a signed static-maps URL
                once the Google Maps or Mapbox key is decided in Phase 9. */}
            <div
              role="img"
              aria-label={STATIC_MAP_ALT}
              className="aspect-[16/9] w-full bg-[linear-gradient(135deg,#F5F1EA,#E8DFCF)]"
            />
            <a
              href={OPEN_MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border-t border-[var(--color-line-ink)] bg-[var(--color-paper)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-sand)]"
            >
              Open in Maps
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M14 5h5v5M19 5l-9 9M5 5v14h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
