import { TRUST_STATS } from '@/content/trust-stats';

/** Trust proof strip. Placed as its own section directly below the hero
 *  so the hero copy column stays visually disciplined. */
export function TrustStats() {
  return (
    <section className="border-b border-[var(--color-line)] bg-[var(--color-paper)]">
      <div className="container-x py-10 md:py-12">
        <dl className="grid grid-cols-3 gap-6 md:gap-10">
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dd className="font-display text-3xl font-semibold text-[var(--color-ink)] md:text-3xl">
                {s.value}
              </dd>
              <dt className="mt-2 text-xs uppercase tracking-widest text-[var(--color-ink)]/55">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
