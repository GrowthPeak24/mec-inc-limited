const STEPS = [
  {
    n: '01',
    title: 'Discovery brief',
    body: 'One producer takes the brief across all three pillars. No re-explaining to three vendors.',
  },
  {
    n: '02',
    title: 'Scope & estimate',
    body: 'Line-item scope with clear inclusions, exclusions and options. Never a lump-sum number.',
  },
  {
    n: '03',
    title: 'Design & pre-production',
    body: 'Creative, technical and hospitality tracks run in parallel with a single show-caller.',
  },
  {
    n: '04',
    title: 'Delivery & wrap',
    body: 'On-site execution, then a post-delivery report tied back to the KPIs agreed at brief.',
  },
] as const;

export function ProcessSteps() {
  return (
    <ol className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((s) => (
        <li
          key={s.n}
          className="relative border-t border-[var(--color-ink)]/25 pt-6"
        >
          <span className="eyebrow text-[var(--color-gold)]">
            {s.n}
          </span>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--color-ink)]">
            {s.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-ink)]/70">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
