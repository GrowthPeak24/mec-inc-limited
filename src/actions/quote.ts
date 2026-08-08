'use server';

import { headers } from 'next/headers';
import { quoteSchema, type QuoteInput } from '@/lib/schema/quote';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { newReference, hashIp } from '@/lib/reference';
import { sendLeadNotification } from '@/lib/email';

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/** Minimum time the form must have been on-screen before submission.
 *  Any faster is treated as a bot and silently dropped (return "ok" so
 *  the bot thinks it worked; no row inserted). */
const MIN_DWELL_MS = 4_000;

function extractClientIp(h: Headers): string {
  // Vercel edge — single value, not client-spoofable.
  const vercel = h.get('x-vercel-forwarded-for');
  if (vercel) return vercel.split(',')[0]?.trim() ?? '';
  // Generic reverse-proxy header — take rightmost (closest to our
  // server) so a client-supplied X-Forwarded-For can't rotate the hash.
  const fwd = h.get('x-forwarded-for');
  if (fwd) {
    const parts = fwd.split(',').map((s) => s.trim()).filter(Boolean);
    return parts[parts.length - 1] ?? '';
  }
  return h.get('x-real-ip')?.trim() ?? '';
}

/** Submit either the /quote wizard or the /contact form. Both flow
 *  through the same schema; only `source` differs. */
export async function submitQuote(
  raw: unknown,
  source: 'quote' | 'contact' = 'quote',
): Promise<SubmitResult> {
  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Please correct the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }
  const data: QuoteInput = parsed.data;

  // Honeypot — if the hidden `website` field has any content, the caller
  // is almost certainly a bot. Pretend success, don't insert.
  if (data.website && data.website.length > 0) {
    return { ok: true, reference: newReference() };
  }

  // Dwell-time guard.
  if (
    typeof data.formStartedAt === 'number' &&
    Date.now() - data.formStartedAt < MIN_DWELL_MS
  ) {
    return { ok: true, reference: newReference() };
  }

  // Extract caller IP. `x-vercel-forwarded-for` is set by Vercel's edge
  // and cannot be spoofed by the client. Fall back to the RIGHTMOST hop
  // of `x-forwarded-for` (closest to our server, i.e. the last trusted
  // proxy) — the leftmost value is client-controlled and would let an
  // attacker rotate hashes to bypass the rate limit.
  const h = await headers();
  const ip = extractClientIp(h);
  const ip_hash = await hashIp(ip);

  const supabase = supabaseAdmin();

  // Rate limit — 5/hour per ip_hash. If the RPC errors we do NOT block
  // the submission (fail open), because losing a real lead > allowing a
  // borderline extra one.
  if (ip_hash) {
    const { data: ok, error } = await supabase.rpc('quote_rate_limit_ok', {
      p_ip_hash: ip_hash,
    });
    if (!error && ok === false) {
      return {
        ok: false,
        error: 'You\u2019ve submitted a few requests in a short window. Please try again later or call us directly.',
      };
    }
  }

  const reference = newReference();
  const { error: insertError } = await supabase.from('quote_requests').insert({
    reference,
    source,
    services: data.services,
    primary_service: data.primaryService,
    // NOTE: use `|| null` (not `?? null`) for the enum-typed columns.
    // `<select>` placeholders emit `""`, which is not nullish but is also
    // NOT a valid CHECK enum member — Postgres rejects the insert. `||`
    // collapses both `""` and `undefined` to `null` before insert.
    event_type: data.eventType || null,
    attendee_band: data.attendeeCount || null,
    event_date: data.eventDate || null,
    date_flexible: data.dateFlexible,
    location: data.location ?? null,
    budget_band: data.budgetBand || null,
    production_needs: data.productionNeeds,
    theme_preference: data.themePreference ?? null,
    catering_required: data.cateringRequired,
    catering_style: data.cateringStyle ?? null,
    objectives: data.objectives ?? null,
    notes: data.notes ?? null,
    company: data.company,
    contact_name: data.contactName,
    role: data.role ?? null,
    email: data.email,
    phone: data.phone ?? null,
    hear_about: data.hearAbout || null,
    consent: data.consent,
    ip_hash,
  });

  if (insertError) {
    return {
      ok: false,
      error: 'Something went wrong saving your brief. Please try again or email us directly.',
    };
  }

  // Fire-and-forget notification — never block the response on email.
  void sendLeadNotification({ reference, data, source });

  return { ok: true, reference };
}
