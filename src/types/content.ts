import type { StaticImageData } from 'next/image';

/** ------------------------------------------------------------------
 *  Portfolio taxonomy — one canonical list, used by:
 *   - case-studies data (each study picks ≥1)
 *   - portfolio filter chips
 *   - `?tag=` URL parsing (case-sensitive)
 *  Adding a tag anywhere else without updating this union is a compile
 *  error — that is the whole point.
 *  ------------------------------------------------------------------ */
export const PORTFOLIO_TAGS = [
  'Event Production',
  'Strategic Marketing',
  'Bespoke Catering',
  'Stage & Booth Build',
] as const;

export type PortfolioTag = (typeof PORTFOLIO_TAGS)[number];

/** Reference to a static-imported image. Using the imported object
 *  (never a string path) gives us intrinsic width/height for zero CLS
 *  and lets next/image emit an automatic blurDataURL. */
export interface MediaRef {
  src: StaticImageData;
  alt: string;
  /** Optional focal point for object-position, "50% 50%" default. */
  focal?: `${number}% ${number}%`;
}

/** One row on a case study's MetricsBar. */
export interface CaseStudyMetric {
  label: string;
  value: string;
  note?: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  /** One-sentence pitch shown on card + og:description. */
  summary: string;
  year: number;
  tags: readonly PortfolioTag[];
  metrics: readonly CaseStudyMetric[];
  challenge: string;
  approach: readonly string[];
  result: string;
  /** Co-executing partners (JCF, MOEY, ministries, sponsors). */
  partners?: readonly string[];
  hero: MediaRef;
  gallery: readonly MediaRef[];
  /** True → surfaces on the home page's FeaturedCaseStudies grid. */
  featured: boolean;
}

/** The three top-level offerings. */
export interface ServicePillar {
  id: 'marketing' | 'events' | 'catering';
  slug: 'strategic-marketing' | 'event-production' | 'bespoke-catering';
  name: string;
  tagline: string;
  blurb: string;
  /** Inline SVG string keyed by pillar id — rendered via IconMark. */
  icon: 'chart' | 'stage' | 'plate';
  media: MediaRef;
}

/** Deep category page — one per pillar. */
export interface ServiceCategory {
  slug: ServicePillar['slug'];
  name: string;
  pillarId: ServicePillar['id'];
  hero: MediaRef;
  intro: string;
  capabilityGroups: readonly {
    title: string;
    items: readonly string[];
  }[];
  faqs: readonly { q: string; a: string }[];
  seo: {
    title: string;
    description: string;
  };
}

/** Trust marquee entry. */
export interface ClientLogo {
  name: string;
  src: StaticImageData;
  /** Aspect-ratio-preserving render width (px) in the marquee track. */
  width: number;
}

/** Decor showcase — themes MEC has produced (Santorini, Amazon, etc.) */
export interface DecorTheme {
  name: string;
  blurb: string;
  media: MediaRef;
}

/** Hero "trust stats" pill — small proof numbers next to the CTAs. */
export interface TrustStat {
  value: string;
  label: string;
}
