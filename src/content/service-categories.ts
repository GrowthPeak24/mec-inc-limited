import type { ServiceCategory } from '@/types/content';

import marketingHero from '@/assets/media/hero/03-brand-activation.avif';
import eventsHero from '@/assets/media/hero/01-stage-booth-build.avif';
import cateringHero from '@/assets/media/hero/02-plated-catering.avif';

// -- Field galleries -------------------------------------------------
import poolsideLantern from '@/assets/media/services/event-production/01-poolside-lantern.webp';
import cinemaLounge from '@/assets/media/services/event-production/02-cinema-lounge.webp';
import cabanaLounge from '@/assets/media/services/event-production/03-cabana-lounge.webp';
import fabricArch from '@/assets/media/services/event-production/04-fabric-arch.webp';
import winterTunnel from '@/assets/media/services/event-production/05-winter-tunnel.webp';
import swingArch from '@/assets/media/services/event-production/06-swing-arch.webp';
import tropicalBar from '@/assets/media/services/event-production/07-tropical-bar.webp';
import tealFanLounge from '@/assets/media/services/event-production/08-teal-fan-lounge.webp';
import coralFanLounge from '@/assets/media/services/event-production/09-coral-fan-lounge.webp';
import blueFanBackdrop from '@/assets/media/services/event-production/10-blue-fan-backdrop.webp';
import worldChampionshipTrack from '@/assets/media/services/event-production/11-world-championship-track.webp';
import terraNovaTent from '@/assets/media/services/event-production/12-terra-nova-night-tent.webp';
import honeyBunBooth from '@/assets/media/services/strategic-marketing/01-honey-bun-expo-booth.webp';
import scotiaInsuranceBooth from '@/assets/media/services/strategic-marketing/02-scotia-insurance-booth.webp';
import scotiabankTent from '@/assets/media/services/strategic-marketing/03-scotiabank-activation-tent.webp';
import fscBooth from '@/assets/media/services/strategic-marketing/04-fsc-booth.webp';
import sslBooth from '@/assets/media/services/strategic-marketing/05-ssl-investment-booth.webp';
import vegetableSkillet from '@/assets/media/services/bespoke-catering/01-vegetable-skillet.webp';
import lanternTable from '@/assets/media/services/bespoke-catering/02-lantern-table.webp';
import floralHeadTable from '@/assets/media/services/bespoke-catering/03-floral-head-table.webp';
import poolsideRoundTable from '@/assets/media/services/bespoke-catering/04-poolside-round-table.webp';

export const SERVICE_CATEGORIES = [
  {
    slug: 'strategic-marketing',
    name: 'Strategic Marketing',
    pillarId: 'marketing',
    hero: {
      src: marketingHero,
      alt: 'Scotiabank activation tent produced by MEC Inc. in Jamaica.',
    },
    intro:
      'Positioning, brand systems and integrated campaigns designed against commercial KPIs, not vanity reach. Every project is briefed against a business outcome and instrumented so the client can defend the spend.',
    capabilityGroups: [
      {
        title: 'Strategy & positioning',
        items: [
          'Category and audience research',
          'Brand positioning and narrative',
          'Go-to-market planning',
          'Naming and identity systems',
        ],
      },
      {
        title: 'Campaign design',
        items: [
          'Integrated ATL / BTL / digital campaigns',
          'Creative direction and art direction',
          'Copywriting and scripting',
          'Content production (photo, video, motion)',
        ],
      },
      {
        title: 'Activation & always-on',
        items: [
          'Sponsorship activation',
          'School and community programmes',
          'Social and community management',
          'Influencer and ambassador partnerships',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you handle media buying?',
        a: 'Yes. Planning and buying across traditional, digital and out-of-home, with post-campaign reporting against the KPIs agreed at brief.',
      },
      {
        q: 'Can you work alongside our in-house marketing team?',
        a: 'Almost every engagement is an embedded model. We plug into your review cadence and reporting, and hand off editable source files on request.',
      },
      {
        q: 'What is the minimum engagement?',
        a: 'For strategic marketing we prefer engagements of 12 weeks or more so the work has time to be measured. Single-campaign sprints are possible for existing clients.',
      },
    ],
    gallery: [
      { src: honeyBunBooth, alt: 'Honey Bun and Buccaneer branded expo booth built by MEC.' },
      { src: scotiaInsuranceBooth, alt: 'Scotia Insurance lounge-style booth with a ScotiaBridge display.' },
      { src: scotiabankTent, alt: 'Scotiabank branded activation tent at an outdoor event.' },
      { src: fscBooth, alt: 'Financial Services Commission exhibition booth with seating and screen.' },
      { src: sslBooth, alt: 'SSL Investment Centre booth with a “Money” banner and branded counter.' },
    ],
    seo: {
      title: 'Marketing Agency in Kingston, Jamaica',
      description:
        'Full-service marketing agency in Kingston, Jamaica. Brand positioning, campaign planning and activation for NCB, Wisynco, Scotiabank and Nestl\u00e9.',
    },
  },
  {
    slug: 'event-production',
    name: 'Event Production',
    pillarId: 'events',
    hero: {
      src: eventsHero,
      alt: 'Honey Bun and Buccaneer expo booth built by MEC Inc.',
    },
    intro:
      'From 40-guest boardroom dinners to 3,000-guest brand activations, we manage the whole production stack (concept, engineering, technical, hospitality and strike) with a single accountable producer per project.',
    capabilityGroups: [
      {
        title: 'Design & build',
        items: [
          'Stage design and set construction',
          'Custom booth and activation builds',
          'Scenic, signage and wayfinding',
          'Themed d\u00e9cor (Santorini, Amazon, Hollywood, Winter Wonderland, custom)',
        ],
      },
      {
        title: 'Technical production',
        items: [
          'Audio, lighting and video',
          'Show-calling and live direction',
          'LED walls and content playback',
          'Live streaming and hybrid production',
        ],
      },
      {
        title: 'Experience & logistics',
        items: [
          'Guest journey design',
          'Registration, ushering and hospitality',
          'Permits, security and safety planning',
          'Vendor management and load-in / strike',
        ],
      },
    ],
    faqs: [
      {
        q: 'How far in advance should we book?',
        a: 'For flagship enterprise events, 12\u201316 weeks gives us the runway to source, build and rehearse without paying rush premiums. We regularly turn around smaller activations in 4\u20136 weeks.',
      },
      {
        q: 'Do you supply your own equipment?',
        a: 'We hold a core inventory and partner with vetted specialist rental houses for scale, chosen per event to hit the technical spec without over-engineering the budget.',
      },
      {
        q: 'Can you produce events outside Kingston?',
        a: 'Yes. We routinely produce across Jamaica and the wider Caribbean. Travel, freight and permitting are scoped into the estimate.',
      },
    ],
    gallery: [
      { src: poolsideLantern, alt: 'Poolside evening set-up with draped cabanas and a lantern centrepiece.' },
      { src: cinemaLounge, alt: 'Cinema-themed lounge with white armchairs and framed art, styled by MEC.' },
      { src: cabanaLounge, alt: 'Blue-draped cabana lounge with a faux fireplace, produced by MEC.' },
      { src: fabricArch, alt: 'White fabric arch dressed with greenery for an outdoor event.' },
      {
        src: winterTunnel,
        alt: 'Blue-lit winter-themed entrance tunnel for an NCB Capital Markets holiday event.',
      },
      {
        src: worldChampionshipTrack,
        alt: 'Running-track entrance for the NCB Capital Markets “World Championship” event.',
      },
      { src: terraNovaTent, alt: 'Lit marquee tent with a Terra Nova bar set-up at night.' },
      // Garden series: NCB Capital Markets "Breakfast at the Pavilion", Hope Gardens.
      { src: swingArch, alt: '“Breakfast at the Pavilion” floral swing arch in a garden setting.' },
      { src: tropicalBar, alt: 'Outdoor bar dressed with painted tropical leaves at a garden brunch.' },
      { src: tealFanLounge, alt: 'Teal paper-fan backdrop with a white lounge set outdoors.' },
      { src: coralFanLounge, alt: 'Coral paper-fan photo backdrop with lounge seating outdoors.' },
      { src: blueFanBackdrop, alt: 'Blue paper-fan and palm-leaf backdrop in a garden setting.' },
    ],
    seo: {
      title: 'Event Production in Kingston, Jamaica',
      description:
        'Corporate event production, stage and booth build, technical production and event coordination in Kingston, Jamaica. Enterprise clients across the Caribbean.',
    },
  },
  {
    slug: 'bespoke-catering',
    name: 'Bespoke Catering',
    pillarId: 'catering',
    hero: {
      src: cateringHero,
      alt: 'Banquet table dressed by MEC\u2019s bespoke catering team.',
    },
    intro:
      'Cuisine curated around the brief, not a fixed banquet menu. We design each menu, service style and floor plan to match the event\u2019s narrative and the seniority of the room.',
    capabilityGroups: [
      {
        title: 'Menu design',
        items: [
          'Bespoke menu curation',
          'Chef\u2019s-table and tasting experiences',
          'Dietary and allergen accommodation',
          'Beverage and cocktail pairing',
        ],
      },
      {
        title: 'Service styles',
        items: [
          'Plated fine dining',
          'Family-style and long-table',
          'Cocktail and canap\u00e9 receptions',
          'Interactive food stations and live cooking',
        ],
      },
      {
        title: 'Front-of-house',
        items: [
          'Trained service teams',
          'Sommelier and mixology support',
          'Table styling and floor planning',
          'End-to-end kitchen build for off-site venues',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the minimum guest count?',
        a: 'Bespoke catering starts at 20 covers. For larger events we routinely cater 300\u2013800 seated and 1,500+ standing.',
      },
      {
        q: 'Can you cater at unusual venues?',
        a: 'Yes. We scope kitchen build, power and cold storage per venue, whether it\u2019s a warehouse activation, a beachfront estate or a rooftop.',
      },
      {
        q: 'Do you handle service staff?',
        a: 'Every catering engagement includes a trained MEC service team sized to the format and guest count.',
      },
    ],
    gallery: [
      { src: vegetableSkillet, alt: 'Cast-iron skillet of seasoned vegetables served at an MEC event.' },
      { src: lanternTable, alt: 'Poolside table styled with a lantern and mason-jar candles.' },
      { src: floralHeadTable, alt: 'Head table dressed with white roses, trailing ivy and votive candles.' },
      { src: poolsideRoundTable, alt: 'Poolside round table laid with green napkins and chiavari chairs.' },
    ],
    seo: {
      title: 'Bespoke Catering in Kingston, Jamaica',
      description:
        'Bespoke corporate catering, plated fine dining and event hospitality in Kingston, Jamaica. Menu design and service teams for enterprise events.',
    },
  },
] as const satisfies readonly ServiceCategory[];
