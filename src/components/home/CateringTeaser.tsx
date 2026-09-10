import { MediaImage } from '@/components/ui/MediaImage';
import { Button } from '@/components/ui/Button';
import platedCatering from '@/assets/media/hero/02-plated-catering.avif';

export function CateringTeaser() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Matted frame — the hairline inset reads as deliberate placement
          rather than a photo bled to the card edge. */}
      <div className="relative">
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute -left-6 -top-6 hidden h-32 w-32 text-[var(--color-ink)] opacity-[0.14] lg:block"
        />
        <div className="matte relative rounded-[var(--radius-xl)] shadow-[0_30px_60px_-40px_rgba(10,14,26,0.45)]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-xl)-0.35rem)] bg-[var(--color-ink-2)]">
            <MediaImage
              media={{
                src: platedCatering,
                alt: 'Plated fine-dining course produced by MEC\u2019s bespoke catering team.',
              }}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Bespoke Catering
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Menus curated around the brief, not a fixed banquet template.
        </h2>
        <p className="mt-4 max-w-xl text-[var(--color-ink)]/70">
          Whether it&rsquo;s a 40-cover boardroom dinner or a 800-guest gala, our catering team
          designs the menu, service style and floor plan around the event&rsquo;s narrative and the
          seniority of the room.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--color-line-ink)] pt-8">
          <Button href="/services/bespoke-catering" variant="primary">
            See catering services
          </Button>
          <Button href="/quote" variant="outline">
            Request a menu proposal
          </Button>
        </div>
      </div>
    </div>
  );
}
