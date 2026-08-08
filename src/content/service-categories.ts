import type { ServiceCategory } from '@/types/content';

import marketingHero from '@/assets/media/hero/03-brand-activation.avif';
import eventsHero from '@/assets/media/hero/01-stage-booth-build.avif';
import cateringHero from '@/assets/media/hero/02-plated-catering.avif';

export const SERVICE_CATEGORIES = [
  {
    slug: 'strategic-marketing',
    name: 'Strategic Marketing',
    pillarId: 'marketing',
    hero: {
      src: marketingHero,
      alt: 'NCB Capital Markets brand activation produced by MEC Inc. in Kingston, Jamaica.',
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
      alt: 'Large-scale corporate stage build produced by MEC Inc. in Kingston.',
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
      alt: 'Plated fine-dining course produced by MEC\u2019s bespoke catering team.',
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
    seo: {
      title: 'Bespoke Catering in Kingston, Jamaica',
      description:
        'Bespoke corporate catering, plated fine dining and event hospitality in Kingston, Jamaica. Menu design and service teams for enterprise events.',
    },
  },
] as const satisfies readonly ServiceCategory[];
