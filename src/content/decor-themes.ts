import type { DecorTheme } from '@/types/content';

import azure from '@/assets/media/themes/azure-corporate.avif';
import gold from '@/assets/media/themes/gold-summer.avif';
import floral from '@/assets/media/themes/floral-arrival.avif';
import tropical from '@/assets/media/themes/tropical-outdoor.avif';

export const DECOR_THEMES = [
  {
    name: 'Azure Corporate',
    blurb:
      'Ice-blue lighting, white drape and mirrored bars. Built for enterprise nights where the brand has to hold the room.',
    media: {
      src: azure,
      alt: 'Blue-lit lounge with white drape and a bar, produced by MEC.',
    },
  },
  {
    name: 'Gold Summer',
    blurb:
      'Warm-metallic walkways and draped string lighting. Fits keynote dinners and long-service recognition.',
    media: {
      src: gold,
      alt: 'Gold-lit walkway framed with draped string lights and framed artwork.',
    },
  },
  {
    name: 'Floral Arrival',
    blurb:
      'Bespoke floral arches engineered to survive load-in. For guest arrivals and photo moments that read premium.',
    media: {
      src: floral,
      alt: 'Floral swing arch installed on a lawn for a garden brunch.',
    },
  },
  {
    name: 'Tropical Outdoor',
    blurb:
      'Poolside lounges framed by palms. Designed for daytime brand activations and estate weddings.',
    media: {
      src: tropical,
      alt: 'Daytime poolside lounge set among palm trees.',
    },
  },
] as const satisfies readonly DecorTheme[];
