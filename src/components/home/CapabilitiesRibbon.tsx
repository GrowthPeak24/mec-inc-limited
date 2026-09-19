import Link from 'next/link';
import { SERVICE_PILLARS } from '@/content/service-pillars';
import type { ServicePillar } from '@/types/content';

/** Capabilities grouped under the pillar they belong to. The column headings
 *  are real links to the pillar pages; the items are plain text, so nothing
 *  that looks like a control is inert. Server-rendered, no images. */
const CAPABILITIES: Record<ServicePillar['id'], readonly string[]> = {
  marketing: [
    'Positioning',
    'Brand systems',
    'Integrated campaigns',
    'Content production',
    'Sponsorship activation',
  ],
  events: [
    'Stage & set build',
    'Custom booth build',
    'AV / lighting',
    'LED walls',
    'Live-streaming',
    'Guest experience',
    'Signage & fabrication',
  ],
  catering: [
    'Bespoke menu design',
    'Plated fine dining',
    'Cocktail receptions',
    'Chef\u2019s table',
    'Interactive stations',
    'Hospitality staffing',
  ],
};

export function CapabilitiesRibbon() {
  return (
    <div>
      <p className="meta-label text-[var(--color-ink)]/70">A single accountable team, across</p>
      <div className="mt-6 grid gap-x-10 gap-y-10 border-t border-[var(--color-line-ink)] pt-8 md:grid-cols-3">
        {SERVICE_PILLARS.map((p) => (
          <div key={p.id}>
            <Link
              href={`/services/${p.slug}`}
              className="group inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-gold)]"
            >
              {p.name}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="nudge"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <ul className="mt-4 divide-y divide-[var(--color-line-ink)] border-t border-[var(--color-line-ink)]">
              {CAPABILITIES[p.id].map((c) => (
                <li key={c} className="py-2.5 text-sm text-[var(--color-ink)]/75">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
