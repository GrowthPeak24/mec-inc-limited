'use server';

import { headers } from 'next/headers';
import { feedbackSchema, type FeedbackInput } from '@/lib/schema/feedback';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { newReference, hashIp } from '@/lib/reference';
import { sendFeedbackNotification } from '@/lib/email';

export type FeedbackResult =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/** Same anti-bot floor as the quote form. */
const MIN_DWELL_MS = 4_000;

function extractClientIp(h: Headers): string {
  const vercel = h.get('x-vercel-forwarded-for');
  if (vercel) return vercel.split(',')[0]?.trim() ?? '';
  const fwd = h.get('x-forwarded-for');
  if (fwd) {
    const parts = fwd.split(',').map((s) => s.trim()).filter(Boolean);
    return parts[parts.length - 1] ?? '';
  }
  return h.get('x-real-ip')?.trim() ?? '';
}

/** Submit customer feedback. Same defence stack as `submitQuote`:
 *  zod parse → honeypot → dwell-time → rate limit → insert → best-effort
 *  notification email. Never surfaces email failure to the caller. */
export async function submitFeedback(raw: unknown): Promise<FeedbackResult> {
  const parsed = feedbackSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Please correct the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }
  const data: FeedbackInput = parsed.data;

  // Honeypot — pretend success, do not insert.
  if (data.website && data.website.length > 0) {
    return { ok: true, reference: newReference() };
  }

  // Dwell-time guard — bots blast the form in <100ms.
  if (
    typeof data.formStartedAt === 'number' &&
    Date.now() - data.formStartedAt < MIN_DWELL_MS
  ) {
    return { ok: true, reference: newReference() };
  }

  const h = await headers();
  const ip = extractClientIp(h);
  const ip_hash = await hashIp(ip);

  const supabase = supabaseAdmin();

  // Rate limit — fail-open. Losing a real testimonial > allowing a
  // borderline extra one.
  if (ip_hash) {
    const { data: ok, error } = await supabase.rpc('feedback_rate_limit_ok', {
      p_ip_hash: ip_hash,
    });
    if (!error && ok === false) {
      return {
        ok: false,
        error:
          'You\u2019ve submitted feedback a few times in a short window. Please try again later.',
      };
    }
  }

  const reference = newReference();
  const { error: insertError } = await supabase.from('feedback_submissions').insert({
    reference,
    rating: data.rating,
    message: data.message,
    // `emptyToUndef`-style: `undefined` is already normalised by the schema.
    // Fall back to `null` for the DB.
    name: data.name ?? null,
    role: data.role ?? null,
    company: data.company ?? null,
    email: data.email ?? null,
    // Enum column — same "|| null" rule as the quote action. `data.serviceArea`
    // is already either a valid enum member or `undefined` because the schema
    // uses `z.enum(...).optional()`, but `|| null` also catches `""` if the
    // shape ever loosens.
    service_area: data.serviceArea || null,
    allow_public: data.allowPublic,
    consent: data.consent,
    ip_hash,
  });

  if (insertError) {
    return {
      ok: false,
      error:
        'Something went wrong saving your feedback. Please try again in a moment.',
    };
  }

  void sendFeedbackNotification({ reference, data });

  return { ok: true, reference };
}
