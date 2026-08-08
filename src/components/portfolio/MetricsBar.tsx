import type { CaseStudyMetric } from '@/types/content';

export function MetricsBar({ metrics }: { metrics: readonly CaseStudyMetric[] }) {
  if (metrics.length === 0) return null;
  return (
    <dl className="grid grid-cols-1 divide-y divide-[var(--color-line-ink)] rounded-[var(--radius-xl)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] md:grid-cols-3 md:divide-x md:divide-y-0">
      {metrics.map((m) => (
        <div key={m.label} className="p-6 md:p-8">
          <dt className="text-xs uppercase tracking-widest text-[var(--color-ink)]/60">
            {m.label}
          </dt>
          <dd className="mt-2 text-3xl font-semibold text-[var(--color-ink)] md:text-4xl">
            {m.value}
          </dd>
          {m.note && (
            <p className="mt-2 text-xs text-[var(--color-ink)]/60">{m.note}</p>
          )}
        </div>
      ))}
    </dl>
  );
}
