import type { TrustStat } from '@/types/content';

/** Small proof pill next to the hero CTA. Keep to three tight facts. */
export const TRUST_STATS = [
  { value: '10+', label: 'Years serving Jamaican enterprise' },
  { value: '25+', label: 'Blue-chip clients delivered' },
  { value: '3', label: 'Pillars, one accountable team' },
] as const satisfies readonly TrustStat[];
