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
    <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-line-ink)] bg-[var(--color-sand-2)]/60 p-6 md:p-10">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute right-0 top-0 hidden h-full w-40 text-[var(--color-ink)] opacity-[0.10] [mask-image:linear-gradient(270deg,black,transparent)] md:block"
      />
      <p className="relative mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink)]/55">
        A single accountable team, across
      </p>
      <ul className="relative flex flex-wrap gap-2">
        {CAPABILITIES.map((c) => (
          <li
            key={c}
            className="rounded-full border border-[var(--color-line-ink)] bg-[var(--color-paper)] px-3 py-1.5 text-sm text-[var(--color-ink)]/80 transition-colors duration-300 hover:border-[var(--color-gold)]/40 hover:text-[var(--color-ink)]"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
