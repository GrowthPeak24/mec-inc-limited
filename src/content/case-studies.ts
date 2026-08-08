import type { CaseStudy } from '@/types/content';

// -- NCB Pinnacle Long Service Awards --------------------------------
import ncbPinnacleHero from '@/assets/media/case-studies/ncb-pinnacle-long-service-awards/01-hero.avif';
import ncbPinnacleNb from '@/assets/media/case-studies/ncb-pinnacle-long-service-awards/02-nb-installation.avif';
import ncbPinnacleArch from '@/assets/media/case-studies/ncb-pinnacle-long-service-awards/03-arrival-arch.avif';
import ncbPinnacleTable from '@/assets/media/case-studies/ncb-pinnacle-long-service-awards/04-guest-table.avif';

// -- NCB Capital Markets Winning -------------------------------------
import ncbCapHero from '@/assets/media/case-studies/ncb-capital-markets-winning/01-hero.avif';
import ncbCapPlenary from '@/assets/media/case-studies/ncb-capital-markets-winning/02-plenary.avif';
import ncbCapLunch from '@/assets/media/case-studies/ncb-capital-markets-winning/03-lunch.avif';

// -- NCB Champions ---------------------------------------------------
import ncbChampHero from '@/assets/media/case-studies/ncb-champions/01-hero.avif';
import ncbChampLounge from '@/assets/media/case-studies/ncb-champions/02-brand-lounge.avif';

// -- Wisynco Eco Club ------------------------------------------------
import wisyncoHero from '@/assets/media/case-studies/wisynco-eco-club/01-hero.avif';
import wisyncoCreative from '@/assets/media/case-studies/wisynco-eco-club/02-creative.avif';
import wisyncoSchool from '@/assets/media/case-studies/wisynco-eco-club/03-school.avif';
import wisyncoCollection from '@/assets/media/case-studies/wisynco-eco-club/04-collection.avif';

// -- Bigga Share With Care -------------------------------------------
import biggaHero from '@/assets/media/case-studies/bigga-share-with-care/01-hero.avif';
import biggaInfluencer from '@/assets/media/case-studies/bigga-share-with-care/02-influencer.avif';
import biggaPartners from '@/assets/media/case-studies/bigga-share-with-care/03-partners.avif';
import biggaOutreach from '@/assets/media/case-studies/bigga-share-with-care/04-outreach.avif';

// -- GRL Cool Fi Di Summer -------------------------------------------
import grlHero from '@/assets/media/case-studies/grl-cool-fi-di-summer/01-hero.avif';
import grlLifestyle from '@/assets/media/case-studies/grl-cool-fi-di-summer/02-lifestyle.avif';

// -- Single-hero studies ---------------------------------------------
import mcintoshHero from '@/assets/media/case-studies/mcintosh-bedding-showroom/01-hero.avif';
import hampdenHero from '@/assets/media/case-studies/hampden-estate-activation/01-hero.avif';
import geddesHero from '@/assets/media/case-studies/geddes-refrigeration-summer-sale/01-hero.avif';
import cargoHero from '@/assets/media/case-studies/cargo-caribbean-airlines/01-hero.avif';

export const CASE_STUDIES = [
  {
    slug: 'ncb-pinnacle-long-service-awards',
    client: 'NCB',
    title: 'NCB Pinnacle Long Service Awards',
    summary:
      'Full-house corporate awards experience honouring three decades of NCB service, engineered end-to-end from arrival arch to plated dinner.',
    year: 2024,
    tags: ['Event Production', 'Bespoke Catering', 'Stage & Booth Build'],
    metrics: [
      { label: 'Honourees', value: '500+' },
      { label: 'Show flow', value: 'Zero re-cues' },
      { label: 'Guest journey', value: 'Arrival \u2192 strike' },
    ],
    challenge:
      'Recognise decades of NCB employee service in a single evening at a scale that reflects Jamaica\u2019s largest financial institution, without letting logistics puncture the moment for any honouree.',
    approach: [
      'Bespoke arrival arch and wayfinding to signal the event tier from the driveway.',
      'Custom stage build with NCB brand system integrated into scenic and lighting.',
      'Plated three-course dinner with dietary-accommodating menu design.',
      'Rehearsed show-call flow synchronised with award reveals and video packages.',
    ],
    result:
      'A tightly-produced evening delivered without visible re-cues, hosting 500+ honourees and executive leadership with the presentational tier of the NCB flagship brand.',
    hero: {
      src: ncbPinnacleHero,
      alt: 'NCB Pinnacle Long Service Awards main stage produced by MEC Inc.',
    },
    gallery: [
      { src: ncbPinnacleNb, alt: 'Custom NB installation piece for NCB Pinnacle Awards.' },
      { src: ncbPinnacleArch, alt: 'Illuminated arrival arch welcoming Pinnacle honourees.' },
      { src: ncbPinnacleTable, alt: 'Plated guest table styled for the Pinnacle dinner.' },
    ],
    featured: true,
  },
  {
    slug: 'ncb-capital-markets-winning',
    client: 'NCB Capital Markets',
    title: 'NCB Capital Markets: The Business of Winning',
    summary:
      'Two-day investor and client symposium combining plenary staging, breakout hospitality and executive dining under one production umbrella.',
    year: 2024,
    tags: ['Event Production', 'Bespoke Catering'],
    metrics: [
      { label: 'Duration', value: '2 days' },
      { label: 'Formats', value: 'Plenary + breakouts' },
      { label: 'Service tiers', value: '3 hospitality bands' },
    ],
    challenge:
      'Deliver an investor-grade symposium that oscillates between formal keynote, interactive breakouts and executive hospitality without visible transitions.',
    approach: [
      'Modular plenary staging with quick-change scenic for panel transitions.',
      'Tiered hospitality: barista lounge, working lunch and executive dining.',
      'Dedicated show-caller across all rooms to protect programme timing.',
    ],
    result:
      'A two-day programme delivered on schedule across every format (keynote, breakout and hospitality) with unified brand presence throughout.',
    hero: {
      src: ncbCapHero,
      alt: 'NCB Capital Markets \u201cThe Business of Winning\u201d symposium plenary produced by MEC.',
    },
    gallery: [
      { src: ncbCapPlenary, alt: 'Plenary stage for the NCB Capital Markets symposium.' },
      { src: ncbCapLunch, alt: 'Working lunch hospitality served between symposium sessions.' },
    ],
    featured: true,
  },
  {
    slug: 'ncb-champions',
    client: 'NCB',
    title: 'NCB Champions',
    summary:
      'High-energy internal recognition experience for top-performing NCB staff, including a purpose-built brand lounge and immersive stage set.',
    year: 2023,
    tags: ['Event Production', 'Stage & Booth Build'],
    metrics: [
      { label: 'Audience', value: 'Top performers' },
      { label: 'Build', value: 'Custom brand lounge' },
      { label: 'Stage', value: 'Immersive scenic' },
    ],
    challenge:
      'Give NCB\u2019s highest-performing staff a night that felt earned, with production tier that read premium the moment they walked in.',
    approach: [
      'Custom-built branded lounge for pre-show hospitality and photography.',
      'Immersive main stage with integrated lighting and video content.',
      'Show-flow tuned for energetic recognition of individual honourees.',
    ],
    result:
      'A recognition event that met NCB\u2019s internal brand bar and left the winning cohort with a clear sense of the investment being made in them.',
    hero: { src: ncbChampHero, alt: 'NCB Champions main stage production by MEC Inc.' },
    gallery: [
      { src: ncbChampLounge, alt: 'Custom-built NCB Champions brand lounge for pre-show hospitality.' },
    ],
    featured: false,
  },
  {
    slug: 'wisynco-eco-club',
    client: 'Wisynco',
    title: 'Wisynco Eco Club: nationwide schools programme',
    summary:
      'Multi-year strategic marketing programme mobilising Jamaican schools around recycling, built from positioning to on-the-ground collection days.',
    year: 2024,
    tags: ['Strategic Marketing', 'Event Production'],
    metrics: [
      { label: 'Reach', value: 'Nationwide' },
      { label: 'Format', value: 'Always-on programme' },
      { label: 'Partners', value: 'Ministry-backed' },
    ],
    challenge:
      'Turn Wisynco\u2019s environmental commitment into a programme the next generation would actually participate in, not a one-off campaign that vanishes with the media buy.',
    approach: [
      'Programme positioning and identity built for repeated seasonal activation.',
      'School enrolment kit, teacher-facing collateral and student-facing content.',
      'On-the-ground collection days delivered as branded live events.',
    ],
    result:
      'An always-on schools programme with sustained enrolment year-over-year and a defensible impact narrative for Wisynco\u2019s sustainability reporting.',
    partners: ['Ministry of Education, Youth and Information'],
    hero: {
      src: wisyncoHero,
      alt: 'Wisynco Eco Club branded on-the-ground activation with student participants.',
    },
    gallery: [
      { src: wisyncoCreative, alt: 'MEC creative team producing Eco Club campaign content.' },
      { src: wisyncoSchool, alt: 'Wisynco Eco Club activation on a school campus.' },
      { src: wisyncoCollection, alt: 'Recycling collection day for the Wisynco Eco Club programme.' },
    ],
    featured: true,
  },
  {
    slug: 'bigga-share-with-care',
    client: 'Bigga',
    title: 'Bigga \u201cShare With Care\u201d',
    summary:
      'Purpose-led campaign for the Bigga soft drink brand, combining influencer storytelling, community partners and street-level outreach.',
    year: 2024,
    tags: ['Strategic Marketing'],
    metrics: [
      { label: 'Channels', value: 'Influencer + BTL' },
      { label: 'Partners', value: 'Community NGOs' },
      { label: 'Focus', value: 'Purpose narrative' },
    ],
    challenge:
      'Give a mainstream FMCG brand credible standing in a purpose conversation without letting it read as opportunistic.',
    approach: [
      'Cast influencer voices already known for the cause, not paid endorsements.',
      'Partnered with grassroots NGOs so the campaign had a real distribution mechanism.',
      'Produced outreach days where the brand showed up alongside partners, not in front of them.',
    ],
    result:
      'A campaign that landed the purpose message without brand tension, and gave partner NGOs measurable amplification of their own outreach.',
    hero: { src: biggaHero, alt: 'Bigga \u201cShare With Care\u201d campaign hero visual.' },
    gallery: [
      { src: biggaInfluencer, alt: 'Influencer storytelling produced for Bigga Share With Care.' },
      { src: biggaPartners, alt: 'Community NGO partners featured in the Share With Care programme.' },
      { src: biggaOutreach, alt: 'On-the-ground outreach day delivered under the Bigga banner.' },
    ],
    featured: true,
  },
  {
    slug: 'grl-cool-fi-di-summer',
    client: 'GRL',
    title: 'GRL: Cool Fi Di Summer',
    summary:
      'Youth-facing summer campaign for GRL blending lifestyle photography and always-on social content into a coherent seasonal identity.',
    year: 2023,
    tags: ['Strategic Marketing'],
    metrics: [
      { label: 'Season', value: 'Summer 2023' },
      { label: 'Focus', value: 'Lifestyle content' },
      { label: 'Audience', value: 'Youth market' },
    ],
    challenge:
      'Own the summer conversation for a youth brand in a category crowded with tactical seasonal creative, without collapsing into templated posting.',
    approach: [
      'Built a coherent seasonal identity that could carry across still, motion and social.',
      'Cast talent that reflected the brand\u2019s actual audience rather than aspirational stereotypes.',
      'Sequenced always-on content to sustain reach through the peak weeks.',
    ],
    result:
      'A summer identity that read as one campaign across every touch-point, and that the brand could pick up again the following year.',
    hero: { src: grlHero, alt: 'GRL Cool Fi Di Summer campaign hero visual.' },
    gallery: [
      { src: grlLifestyle, alt: 'Lifestyle photography produced for the GRL summer campaign.' },
    ],
    featured: false,
  },
  {
    slug: 'mcintosh-bedding-showroom',
    client: 'McIntosh Bedding',
    title: 'McIntosh Bedding: showroom experience',
    summary:
      'Retail experience design for the McIntosh Bedding showroom, elevating the in-store journey to match the premium product tier.',
    year: 2023,
    tags: ['Strategic Marketing', 'Stage & Booth Build'],
    metrics: [
      { label: 'Format', value: 'Retail experience' },
      { label: 'Scope', value: 'Journey + fit-out' },
    ],
    challenge:
      'Reset the in-store experience so it reflected McIntosh Bedding\u2019s premium positioning end-to-end.',
    approach: [
      'Redesigned guest journey through the showroom with intentional pacing and lighting.',
      'Custom fixtures and merchandising fit-out to feature hero product tiers.',
    ],
    result:
      'A showroom experience aligned to the brand\u2019s premium positioning, ready to host trade partners and consumers with the same confidence.',
    hero: {
      src: mcintoshHero,
      alt: 'McIntosh Bedding showroom experience produced by MEC.',
    },
    gallery: [],
    featured: false,
  },
  {
    slug: 'hampden-estate-activation',
    client: 'Hampden Estate',
    title: 'Hampden Estate activation',
    summary:
      'On-estate brand activation for Hampden, designed to translate heritage rum craftsmanship into a live, hospitality-forward experience.',
    year: 2023,
    tags: ['Event Production', 'Bespoke Catering'],
    metrics: [
      { label: 'Setting', value: 'Estate venue' },
      { label: 'Style', value: 'Heritage hospitality' },
    ],
    challenge:
      'Bring Hampden\u2019s heritage brand story to life on-site without letting production overshadow the estate itself.',
    approach: [
      'Production designed to sit within the estate\u2019s existing character, not on top of it.',
      'Curated hospitality format anchored on the product story.',
    ],
    result:
      'A live experience that felt native to the estate and gave guests a considered introduction to the Hampden brand.',
    hero: {
      src: hampdenHero,
      alt: 'Hampden Estate on-site brand activation produced by MEC.',
    },
    gallery: [],
    featured: false,
  },
  {
    slug: 'geddes-refrigeration-summer-sale',
    client: 'Geddes Refrigeration',
    title: 'Geddes Refrigeration: summer sale campaign',
    summary:
      'Retail-driving seasonal campaign for Geddes Refrigeration, engineered to convert seasonal demand into showroom traffic.',
    year: 2024,
    tags: ['Strategic Marketing'],
    metrics: [
      { label: 'Objective', value: 'Retail traffic' },
      { label: 'Window', value: 'Seasonal peak' },
    ],
    challenge:
      'Convert peak-season demand into measurable retail traffic without over-discounting the brand.',
    approach: [
      'Built the campaign around a limited seasonal window to create genuine urgency.',
      'Retail-first creative direction with clear call-to-action in every asset.',
    ],
    result:
      'A campaign that hit the seasonal traffic target while keeping the Geddes brand tier intact.',
    hero: {
      src: geddesHero,
      alt: 'Geddes Refrigeration summer sale campaign visual.',
    },
    gallery: [],
    featured: false,
  },
  {
    slug: 'cargo-caribbean-airlines',
    client: 'Caribbean Airlines',
    title: 'Caribbean Airlines Cargo',
    summary:
      'Brand communications programme for Caribbean Airlines Cargo, developing B2B positioning for the airline\u2019s freight service.',
    year: 2024,
    tags: ['Strategic Marketing'],
    metrics: [
      { label: 'Audience', value: 'B2B freight buyers' },
      { label: 'Scope', value: 'Positioning + comms' },
    ],
    challenge:
      'Give Caribbean Airlines Cargo a distinct B2B voice, separate from the passenger brand, that would land with freight buyers.',
    approach: [
      'B2B-specific positioning built from freight-buyer language, not passenger marketing.',
      'Communications templates the internal team could pick up and continue running.',
    ],
    result:
      'A defensible B2B identity for the cargo service, handed over with the tools for the client to operate it independently.',
    hero: {
      src: cargoHero,
      alt: 'Caribbean Airlines Cargo brand communications produced by MEC.',
    },
    gallery: [],
    featured: false,
  },
] as const satisfies readonly CaseStudy[];

export const FEATURED_CASE_STUDIES = CASE_STUDIES.filter((c) => c.featured);
