import { Button } from '@/components/ui/Button';
import { BentoTile } from './BentoTile';

import stageBooth from '@/assets/media/hero/01-stage-booth-build.avif';
import platedCatering from '@/assets/media/hero/02-plated-catering.avif';
import brandActivation from '@/assets/media/hero/03-brand-activation.avif';

/** Home LCP element. NEVER wrap in <Reveal>; it must paint pre-hydration.
 *  Three tiles carry priority; grid is a fixed-height 12-col split on
 *  large viewports and stacks below md. All decoration is CSS-only so
 *  nothing here blocks or defers the LCP paint. */
export function HeroBento() {
  return (
    <section
      data-surface="ink"
      className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_20%_0%,color-mix(in_srgb,var(--color-sapphire)_18%,transparent),transparent_60%)]"
      />
      {/* Dotted texture field — anchors the copy column without competing
          with the photography. */}
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute left-0 top-0 hidden h-[340px] w-[220px] text-[var(--color-paper)] opacity-[0.07] [mask-image:linear-gradient(135deg,black,transparent_70%)] lg:block"
      />
      <div className="container-x relative grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-14">
        {/* Copy column */}
        <div className="lg:col-span-6 lg:pt-6">
          <p className="eyebrow text-[var(--color-accent-on-dark)]">
            Marketing &middot; Events &middot; Catering
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Impacting brands through <em className="not-italic font-semibold text-[var(--color-accent-on-dark)]">innovative solutions</em>.
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
          <div className="mt-10 hidden border-t border-[var(--color-line)] pt-6 lg:block">
            <p className="text-sm text-[var(--color-paper)]/55">
              One accountable producer across all three disciplines &mdash; you brief once.
            </p>
          </div>
        </div>

        {/* Bento column — 3 tiles, asymmetric */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 gap-4 md:h-[560px] md:grid-rows-2 md:gap-5">
            <BentoTile
              media={{
                src: stageBooth,
                alt: 'Honey Bun and Buccaneer expo booth designed and built by MEC.',
              }}
              label="Event Production"
              caption="Stage & booth build engineered for enterprise activations."
              href="/services/event-production"
              priority
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="col-span-2 aspect-[16/10] md:col-span-1 md:row-span-2 md:aspect-auto"
            />
            <BentoTile
              media={{
                src: platedCatering,
                alt: 'Banquet table laid with green napkins and a candle centrepiece by MEC catering.',
              }}
              label="Bespoke Catering"
              caption="Curated menus for the seniority of the room."
              href="/services/bespoke-catering"
              priority
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="aspect-square md:aspect-auto"
            />
            <BentoTile
              media={{
                src: brandActivation,
                alt: 'Scotiabank activation tent drawing visitors, delivered by MEC Inc.',
              }}
              label="Strategic Marketing"
              caption="Campaigns built against commercial numbers."
              href="/services/strategic-marketing"
              priority
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="aspect-square md:aspect-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
