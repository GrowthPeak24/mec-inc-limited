import { TRUST_STATS } from '@/content/trust-stats';

/** Trust proof strip. Placed as its own section directly below the hero
 *  so the hero copy column stays visually disciplined.
 *
 *  Rendered as a hairline-ruled slab rather than a loose grid: vertical
 *  rules between figures and dotted gutters on the flanks give the row the
 *  weight of an editorial masthead instead of three floating numbers. */
export function TrustStats() {
  return (
    <section className="border-b border-[var(--color-line-ink)] bg-[var(--color-paper)]">
      <div className="container-x py-8 md:py-10">
        <div className="flex items-stretch">
          <div
            aria-hidden
            className="dot-grid hidden w-16 shrink-0 text-[var(--color-ink)] opacity-[0.12] xl:block"
          />
          <dl className="grid flex-1 grid-cols-3 xl:px-10">
            {TRUST_STATS.map((s, i) => (
              <div
                key={s.label}
                className={
                  i === 0
                    ? 'flex flex-col px-0 pr-4 md:pr-8'
                    : 'flex flex-col border-l border-[var(--color-line-ink)] pl-4 pr-4 md:pl-8 md:pr-8'
                }
              >
                <dd className="font-display text-3xl font-semibold leading-none tracking-tight text-[var(--color-ink)] md:text-4xl">
                  {s.value}
                </dd>
                <dt className="meta-label mt-3 text-[var(--color-ink)]/70">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
          <div
            aria-hidden
            className="dot-grid hidden w-16 shrink-0 text-[var(--color-ink)] opacity-[0.12] xl:block"
          />
        </div>
      </div>
    </section>
  );
}
