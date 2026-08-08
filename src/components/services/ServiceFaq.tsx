import type { ServiceCategory } from '@/types/content';

/** Uses native <details>/<summary> so:
 *   - opens/closes with zero JS
 *   - keyboard-accessible by default
 *   - trivially crawlable
 *  The exact same faqs array is fed into FAQPage JSON-LD by the route
 *  to guarantee zero drift between rendered copy and rich results. */
export function ServiceFaq({
  faqs,
}: {
  faqs: ServiceCategory['faqs'];
}) {
  return (
    <div className="divide-y divide-[var(--color-line-ink)] rounded-[var(--radius-xl)] border border-[var(--color-line-ink)] bg-[var(--color-paper)]">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group px-5 py-5 md:px-7 md:py-6"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium tracking-tight text-[var(--color-ink)]">
            <span>{f.q}</span>
            <span
              aria-hidden
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--color-line-ink)] text-[var(--color-gold)] transition-transform group-open:rotate-45"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-[var(--color-ink)]/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
