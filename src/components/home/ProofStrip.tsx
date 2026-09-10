import { ClientMarquee } from '@/components/ui/ClientMarquee';

export function ProofStrip() {
  return (
    <section className="bg-[var(--color-paper)] py-12 md:py-14">
      <div className="container-x">
        <div className="mb-8 flex items-center gap-4">
          <span aria-hidden className="h-px flex-1 bg-[var(--color-line-ink)]" />
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-mute)]">
            A decade of delivery for Jamaica&rsquo;s enterprise brands
          </p>
          <span aria-hidden className="h-px flex-1 bg-[var(--color-line-ink)]" />
        </div>
        <ClientMarquee />
      </div>
    </section>
  );
}
