import { ClientMarquee } from '@/components/ui/ClientMarquee';

export function ProofStrip() {
  return (
    <section className="bg-[var(--color-paper)] py-12 md:py-14">
      <div className="container-x">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-[var(--color-mute)]">
          A decade of delivery for Jamaica&rsquo;s enterprise brands
        </p>
        <ClientMarquee />
      </div>
    </section>
  );
}
