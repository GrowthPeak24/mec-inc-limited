/** A dense capability ribbon — signals depth of offer without repeating
 *  the pillar cards. Server-rendered, plain text, no images. */
const CAPABILITIES = [
  'Positioning',
  'Brand systems',
  'Integrated campaigns',
  'Content production',
  'Sponsorship activation',
  'Stage & set build',
  'Custom booth build',
  'AV / lighting',
  'LED walls',
  'Live-streaming',
  'Guest experience',
  'Bespoke menu design',
  'Plated fine dining',
  'Cocktail receptions',
  'Chef\u2019s table',
  'Interactive stations',
  'Signage & fabrication',
  'Hospitality staffing',
] as const;

export function CapabilitiesRibbon() {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-line-ink)] bg-[var(--color-sand-2)]/60 p-6 md:p-10">
      <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-ink)]/60">
        A single accountable team, across
      </p>
      <ul className="flex flex-wrap gap-2">
        {CAPABILITIES.map((c) => (
          <li
            key={c}
            className="rounded-full border border-[var(--color-line-ink)] bg-[var(--color-paper)] px-3 py-1.5 text-sm text-[var(--color-ink)]/80"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
