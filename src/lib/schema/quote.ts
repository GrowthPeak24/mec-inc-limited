import { z } from 'zod';
import {
  SERVICE_OPTIONS,
  EVENT_TYPE_OPTIONS,
  ATTENDEE_BAND_OPTIONS,
  BUDGET_BAND_OPTIONS,
  PRODUCTION_NEEDS_OPTIONS,
  THEME_OPTIONS,
  CATERING_STYLE_OPTIONS,
  HEAR_ABOUT_OPTIONS,
} from '@/content/quote-options';

/** Convert a readonly `{value,label}` list into a zod-compatible tuple
 *  of literal values. Zod's z.enum needs [string, ...string[]]. */
function values<T extends readonly { value: string }[]>(opts: T) {
  return opts.map((o) => o.value) as unknown as [T[number]['value'], ...T[number]['value'][]];
}

// Sub-schemas per wizard step -----------------------------------------------

export const step1Schema = z.object({
  services: z
    .array(z.enum(values(SERVICE_OPTIONS)))
    .min(1, 'Pick at least one service'),
  primaryService: z.enum(values(SERVICE_OPTIONS)),
});

export const step2Schema = z.object({
  eventType: z.enum(values(EVENT_TYPE_OPTIONS)).optional(),
  attendeeCount: z.enum(values(ATTENDEE_BAND_OPTIONS)).optional(),
  eventDate: z
    .string()
    .refine((v) => v === '' || /^\d{4}-\d{2}-\d{2}$/.test(v), 'Use a valid date')
    .optional(),
  dateFlexible: z.boolean().default(false),
  location: z.string().max(120).optional(),
  budgetBand: z.enum(values(BUDGET_BAND_OPTIONS)).optional(),
  productionNeeds: z.array(z.enum(values(PRODUCTION_NEEDS_OPTIONS))).default([]),
});

export const step3Schema = z.object({
  // NOTE: `.nullish()` not `.optional()`. These register onto radio GROUPS
  // (SelectableCard variant="radio"). React Hook Form yields `null` — not
  // `undefined` — for a radio group with nothing checked, and
  // `z.enum(...).optional()` rejects `null`, which silently blocks the
  // Step 3 → 4 advance and fails final submit. `.nullish()` accepts both.
  themePreference: z.enum(values(THEME_OPTIONS)).nullish(),
  cateringRequired: z.boolean().default(false),
  cateringStyle: z.enum(values(CATERING_STYLE_OPTIONS)).nullish(),
  objectives: z.string().max(600).optional(),
  notes: z.string().max(1200).optional(),
});

export const step4Schema = z.object({
  company: z.string().min(2, 'Company is required').max(120),
  contactName: z.string().min(2, 'Your name is required').max(120),
  role: z.string().max(120).optional(),
  email: z.string().email('Enter a valid work email'),
  phone: z.string().max(40).optional(),
  hearAbout: z.enum(values(HEAR_ABOUT_OPTIONS)).optional(),
  consent: z.literal(true, {
    message: 'Consent is required to submit',
  }),
  /** Anti-spam honeypot. Any non-empty value routes to the fake-success drop
   *  in the Server Action. Do NOT constrain with .max(0) — that would make
   *  the schema reject bots outright and reveal the trap. */
  website: z.string().optional(),
  /** Client-set epoch ms when the form mounted — must be ≥4s ago. */
  formStartedAt: z.number().int().nonnegative().optional(),
});

// Composed schema — shared by the wizard client-side and the Server Action.

export const quoteSchema = step1Schema
  .and(step2Schema)
  .and(step3Schema)
  .and(step4Schema)
  .superRefine((data, ctx) => {
    // Primary must be one of the chosen services.
    if (!data.services.includes(data.primaryService)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['primaryService'],
        message: 'Primary service must be one of your selected services',
      });
    }
    // Catering-only selection auto-implies catering + style.
    const onlyCatering =
      data.services.length === 1 && data.services[0] === 'bespoke-catering';
    if (onlyCatering && !data.cateringStyle) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cateringStyle'],
        message: 'Pick a catering style so we can scope the menu',
      });
    }
    if (data.cateringRequired && !data.cateringStyle) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cateringStyle'],
        message: 'Pick a catering style',
      });
    }
    // Blank event date needs a "flexible" flag.
    if ((!data.eventDate || data.eventDate === '') && !data.dateFlexible) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['eventDate'],
        message: 'Pick a date or tick "date is flexible"',
      });
    }
  });

export type QuoteInput = z.infer<typeof quoteSchema>;

/** Fields that each step is responsible for — used by RHF's `trigger()`
 *  to gate progression per step. */
export const STEP_FIELDS = {
  1: ['services', 'primaryService'] as const,
  2: [
    'eventType',
    'attendeeCount',
    'eventDate',
    'dateFlexible',
    'location',
    'budgetBand',
    'productionNeeds',
  ] as const,
  3: [
    'themePreference',
    'cateringRequired',
    'cateringStyle',
    'objectives',
    'notes',
  ] as const,
  4: [
    'company',
    'contactName',
    'role',
    'email',
    'phone',
    'hearAbout',
    'consent',
  ] as const,
} as const;
