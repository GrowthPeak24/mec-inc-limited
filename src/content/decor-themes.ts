import type { DecorTheme } from '@/types/content';

import azure from '@/assets/media/themes/azure-corporate.avif';
import gold from '@/assets/media/themes/gold-summer.avif';
import floral from '@/assets/media/themes/floral-arrival.avif';
import tropical from '@/assets/media/themes/tropical-outdoor.avif';

export const DECOR_THEMES = [
  {
    name: 'Azure Corporate',
    blurb:
      'Deep navy staging with metallic wayfinding. Built for enterprise award nights where the brand has to hold the room.',
    media: {
      src: azure,
      alt: 'Azure-themed corporate stage with metallic finishings, produced by MEC.',
    },
  },
  {
    name: 'Gold Summer',
    blurb:
      'Warm-metallic seated experience with directional lighting. Fits keynote dinners and long-service recognition.',
    media: {
      src: gold,
      alt: 'Gold and warm-lit banquet table styled for a summer corporate dinner.',
    },
  },
  {
    name: 'Floral Arrival',
    blurb:
      'Bespoke floral install engineered to survive load-in. For guest arrivals that read premium from the driveway.',
    media: {
      src: floral,
      alt: 'Floral arrival arch installation at an MEC-produced event.',
    },
  },
  {
    name: 'Tropical Outdoor',
    blurb:
      'Island-native styling and shaded lounge scapes. Designed for daytime brand activations and estate weddings.',
    media: {
      src: tropical,
      alt: 'Tropical outdoor activation setup with shaded seating and native florals.',
    },
  },
] as const satisfies readonly DecorTheme[];
