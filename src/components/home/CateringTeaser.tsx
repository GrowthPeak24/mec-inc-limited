import { MediaImage } from '@/components/ui/MediaImage';
import { Button } from '@/components/ui/Button';
import platedCatering from '@/assets/media/hero/02-plated-catering.avif';

export function CateringTeaser() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink-2)]">
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
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
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
        <div className="mt-8 flex flex-wrap gap-3">
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
