import type { ServicePillar } from '@/types/content';

import marketingImg from '@/assets/media/case-studies/wisynco-eco-club/02-creative.avif';
import eventsImg from '@/assets/media/case-studies/ncb-pinnacle-long-service-awards/01-hero.avif';
import cateringImg from '@/assets/media/hero/02-plated-catering.avif';

export const SERVICE_PILLARS = [
  {
    id: 'marketing',
    slug: 'strategic-marketing',
    name: 'Strategic Marketing',
    tagline: 'Insight-led campaigns that move commercial numbers.',
    blurb:
      'Positioning, brand systems, integrated campaign design and always-on content, built for enterprise accountability.',
    icon: 'chart',
    media: {
      src: marketingImg,
      alt: 'MEC creative team producing campaign content for Wisynco Eco Club.',
    },
  },
  {
    id: 'events',
    slug: 'event-production',
    name: 'Event Production',
    tagline: 'Full-service delivery, from concept to strike.',
    blurb:
      'Stage & booth build, technical production, guest experience and logistics, engineered for zero-defect execution at scale.',
    icon: 'stage',
    media: {
      src: eventsImg,
      alt: 'NCB Pinnacle Long Service Awards main stage with MEC-produced set design.',
    },
  },
  {
    id: 'catering',
    slug: 'bespoke-catering',
    name: 'Bespoke Catering',
    tagline: 'Cuisine that carries the brief.',
    blurb:
      'Menu curation, plated service and premium hospitality, designed around each event\u2019s narrative and guest tier.',
    icon: 'plate',
    media: {
      src: cateringImg,
      alt: 'Plated catering course served at an MEC-produced enterprise dinner.',
    },
  },
] as const satisfies readonly ServicePillar[];
