/** ------------------------------------------------------------------
 *  Single source of truth for every enum the Quote Builder exposes.
 *  Consumed by:
 *   - the wizard UI (SelectableCard, checkboxes, radios)
 *   - the zod schema (src/lib/schema/quote.ts) via z.enum(...)
 *   - the Postgres CHECK constraints (kept in sync manually — see
 *     supabase/migrations/*_quote_requests.sql)
 *  Adding a new value here without mirroring the Postgres CHECK will
 *  cause inserts to fail — that is the deliberate second line of defence.
 *  ------------------------------------------------------------------ */

export const SERVICE_OPTIONS = [
  { value: 'strategic-marketing', label: 'Strategic Marketing' },
  { value: 'event-production', label: 'Event Production' },
  { value: 'bespoke-catering', label: 'Bespoke Catering' },
  { value: 'stage-and-booth-build', label: 'Stage & Booth Build' },
] as const;
export type ServiceValue = (typeof SERVICE_OPTIONS)[number]['value'];

export const EVENT_TYPE_OPTIONS = [
  { value: 'corporate-awards', label: 'Corporate awards / recognition' },
  { value: 'conference-symposium', label: 'Conference / symposium' },
  { value: 'brand-activation', label: 'Brand activation' },
  { value: 'product-launch', label: 'Product launch' },
  { value: 'gala-dinner', label: 'Gala dinner' },
  { value: 'private-event', label: 'Private / VIP event' },
  { value: 'campaign-only', label: 'Marketing campaign (no event)' },
  { value: 'other', label: 'Other' },
] as const;
export type EventTypeValue = (typeof EVENT_TYPE_OPTIONS)[number]['value'];

export const ATTENDEE_BAND_OPTIONS = [
  { value: 'under-50', label: 'Under 50' },
  { value: '50-150', label: '50 \u2013 150' },
  { value: '150-500', label: '150 \u2013 500' },
  { value: '500-1500', label: '500 \u2013 1,500' },
  { value: '1500-plus', label: '1,500+' },
  { value: 'na', label: 'Not applicable' },
] as const;
export type AttendeeBandValue = (typeof ATTENDEE_BAND_OPTIONS)[number]['value'];

export const BUDGET_BAND_OPTIONS = [
  { value: 'under-1m', label: 'Under J$1M' },
  { value: '1m-5m', label: 'J$1M \u2013 J$5M' },
  { value: '5m-15m', label: 'J$5M \u2013 J$15M' },
  { value: '15m-plus', label: 'J$15M+' },
  { value: 'unsure', label: 'Not sure yet' },
] as const;
export type BudgetBandValue = (typeof BUDGET_BAND_OPTIONS)[number]['value'];

export const PRODUCTION_NEEDS_OPTIONS = [
  { value: 'stage-build', label: 'Stage / set build' },
  { value: 'booth-build', label: 'Booth / activation build' },
  { value: 'av-lighting', label: 'AV / lighting' },
  { value: 'led-video', label: 'LED walls / video content' },
  { value: 'live-stream', label: 'Live-stream / hybrid production' },
  { value: 'photo-video', label: 'Photo / video capture' },
  { value: 'branding', label: 'Signage / brand fabrication' },
  { value: 'staffing', label: 'Hospitality / ushering staff' },
] as const;
export type ProductionNeedValue = (typeof PRODUCTION_NEEDS_OPTIONS)[number]['value'];

export const THEME_OPTIONS = [
  { value: 'azure-corporate', label: 'Azure Corporate' },
  { value: 'gold-summer', label: 'Gold Summer' },
  { value: 'santorini', label: 'Santorini' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'hollywood', label: 'Hollywood' },
  { value: 'texas', label: 'Texas' },
  { value: 'winter-wonderland', label: 'Winter Wonderland' },
  { value: 'tropical-outdoor', label: 'Tropical Outdoor' },
  { value: 'custom', label: 'Custom / undecided' },
] as const;
export type ThemeValue = (typeof THEME_OPTIONS)[number]['value'];

export const CATERING_STYLE_OPTIONS = [
  { value: 'plated', label: 'Plated fine dining' },
  { value: 'family-style', label: 'Family-style / long-table' },
  { value: 'cocktail-canapes', label: 'Cocktail & canap\u00e9s' },
  { value: 'stations', label: 'Interactive food stations' },
  { value: 'chefs-table', label: 'Chef\u2019s table / tasting' },
  { value: 'buffet', label: 'Buffet' },
] as const;
export type CateringStyleValue = (typeof CATERING_STYLE_OPTIONS)[number]['value'];

export const HEAR_ABOUT_OPTIONS = [
  { value: 'referral', label: 'Referred by a colleague' },
  { value: 'past-event', label: 'Attended an MEC-produced event' },
  { value: 'search', label: 'Search engine' },
  { value: 'social', label: 'Social media' },
  { value: 'other', label: 'Other' },
] as const;
export type HearAboutValue = (typeof HEAR_ABOUT_OPTIONS)[number]['value'];
