import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

export function QuoteCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] py-20 text-[var(--color-paper)] md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_0%,rgba(15,82,186,0.22),transparent_60%)]"
      />
      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-2)]">
            Bring us the brief
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            One producer. Three disciplines. Zero handoff.
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--color-paper)]/75">
            Tell us the shape of the event or campaign. A senior producer replies within one
            business day with next steps and a scoping call.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
          <Button href="/quote" variant="primary" size="lg">
            Start the brief
          </Button>
          <p className="text-sm text-[var(--color-paper)]/60">
            or call{' '}
            <a href={SITE.tel.href} className="text-[var(--color-gold-2)] hover:underline">
              {SITE.tel.display}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
