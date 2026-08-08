import { Button } from '@/components/ui/Button';
import { BentoTile } from './BentoTile';

import stageBooth from '@/assets/media/hero/01-stage-booth-build.avif';
import platedCatering from '@/assets/media/hero/02-plated-catering.avif';
import brandActivation from '@/assets/media/hero/03-brand-activation.avif';

/** Home LCP element. NEVER wrap in <Reveal>; it must paint pre-hydration.
 *  Three tiles carry priority; grid is a fixed-height 12-col split on
 *  large viewports and stacks below md. */
export function HeroBento() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_20%_0%,rgba(15,82,186,0.18),transparent_60%)]"
      />
      <div className="container-x relative grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-14">
        {/* Copy column */}
        <div className="lg:col-span-6 lg:pt-6">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Impacting brands through <em className="not-italic font-semibold text-[var(--color-gold-2)]">innovative solutions</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--color-paper)]/75">
            Marketing, Events and Catering (MEC) Inc. is Jamaica&rsquo;s integrated agency for
            strategic marketing, full-service event production and bespoke catering. Ten years
            delivered for NCB, Wisynco, Scotiabank, Nestl&eacute; and more.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/quote" variant="primary" size="lg">
              Request Proposal
            </Button>
            <Button href="/portfolio" variant="ghost" size="lg">
              Explore Case Studies
            </Button>
          </div>
        </div>

        {/* Bento column — 3 tiles, asymmetric */}
        <div className="lg:col-span-6">
          <div className="grid h-[520px] grid-cols-2 grid-rows-2 gap-4 md:h-[560px] md:gap-5">
            <BentoTile
              media={{
                src: stageBooth,
                alt: 'Custom stage and booth build produced by MEC for an enterprise activation.',
              }}
              label="Event Production"
              caption="Stage & booth build engineered for enterprise activations."
              href="/services/event-production"
              priority
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="row-span-2 aspect-auto"
            />
            <BentoTile
              media={{
                src: platedCatering,
                alt: 'Plated catering course served at an MEC-produced enterprise dinner.',
              }}
              label="Bespoke Catering"
              caption="Curated menus for the seniority of the room."
              href="/services/bespoke-catering"
              priority
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
            <BentoTile
              media={{
                src: brandActivation,
                alt: 'Branded activation experience delivered by MEC Inc.',
              }}
              label="Strategic Marketing"
              caption="Campaigns built against commercial numbers."
              href="/services/strategic-marketing"
              priority
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
