import { ClientMarquee } from '@/components/ui/ClientMarquee';

export function ProofStrip() {
  return (
    <section className="bg-[var(--color-paper)] py-10 md:py-12">
      <div className="container-x">
        <div className="mb-8 flex items-center gap-4">
          <span aria-hidden className="h-px flex-1 bg-[var(--color-line-ink)]" />
          <p className="meta-label text-center text-[var(--color-ink)]/70">
            A decade of delivery for Jamaica&rsquo;s enterprise brands
          </p>
          <span aria-hidden className="h-px flex-1 bg-[var(--color-line-ink)]" />
        </div>
        <ClientMarquee />
      </div>
    </section>
  );
}
