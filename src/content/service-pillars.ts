import type { ServicePillar } from '@/types/content';

import marketingImg from '@/assets/media/pillars/strategic-marketing.avif';
import eventsImg from '@/assets/media/pillars/event-production.avif';
import cateringImg from '@/assets/media/pillars/bespoke-catering.avif';

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
      alt: 'Scotiabank branded tent and banners at an outdoor activation run by MEC.',
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
      alt: 'Poolside evening event with draped cabanas and string lights, produced by MEC.',
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
      alt: 'Banquet table set with chiavari chairs, green napkins and a candle centrepiece.',
    },
  },
] as const satisfies readonly ServicePillar[];
