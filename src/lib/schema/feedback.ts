import { z } from 'zod';

/** Service areas mirror the Postgres CHECK on feedback_submissions.service_area.
 *  Keep in sync with supabase/migrations/20260809120000_feedback_submissions.sql. */
export const FEEDBACK_SERVICE_AREA_OPTIONS = [
  { value: 'strategic-marketing', label: 'Strategic Marketing' },
  { value: 'event-production', label: 'Event Production' },
  { value: 'bespoke-catering', label: 'Bespoke Catering' },
  { value: 'stage-and-booth-build', label: 'Stage & Booth Build' },
  { value: 'other', label: 'Other / not sure' },
] as const;
export type FeedbackServiceArea =
  (typeof FEEDBACK_SERVICE_AREA_OPTIONS)[number]['value'];

const SERVICE_AREA_VALUES = FEEDBACK_SERVICE_AREA_OPTIONS.map((o) => o.value) as unknown as [
  FeedbackServiceArea,
  ...FeedbackServiceArea[],
];

/** Optional string that treats an empty submission (`""`) as absent. Mirrors
 *  the `emptyToUndef` pattern used in the quote wizard for enum-backed <select>
 *  placeholders and unfilled optional inputs. */
const optionalString = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .transform((v) => (v && v.trim().length > 0 ? v.trim() : undefined));

const optionalEmail = z
  .string()
  .max(254)
  .optional()
  .transform((v) => (v && v.trim().length > 0 ? v.trim() : undefined))
  .refine(
    (v) => v === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    'Enter a valid email',
  );

export const feedbackSchema = z.object({
  /** 1..5 stars. Comes in as string from a native form and is coerced. */
  rating: z.coerce
    .number()
    .int()
    .min(1, 'Pick a rating from 1 to 5')
    .max(5, 'Pick a rating from 1 to 5'),

  message: z
    .string()
    .min(10, 'Please share at least a sentence (10+ characters)')
    .max(2000, 'Please keep feedback under 2000 characters'),

  name: optionalString(120),
  role: optionalString(120),
  company: optionalString(120),
  email: optionalEmail,

  serviceArea: z.enum(SERVICE_AREA_VALUES).optional(),

  /** Explicit permission to publish the feedback on marketing surfaces. */
  allowPublic: z.boolean().default(false),

  /** Required — "contact me about this feedback". Mirrors the quote form. */
  consent: z.literal(true, {
    message: 'Consent is required to submit',
  }),

  /** Anti-spam honeypot. Any non-empty value routes to the fake-success drop
   *  in the Server Action. Do NOT constrain with .max(0) — that would make
   *  the schema reject bots outright and reveal the trap. Same rule as
   *  the quote form. */
  website: z.string().optional(),

  /** Client-set epoch ms when the form mounted — must be ≥4s ago for the
   *  Server Action to accept it as human. */
  formStartedAt: z.number().int().nonnegative().optional(),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
