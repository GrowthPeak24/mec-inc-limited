import 'server-only';
import { SITE } from '@/lib/site';
import type { QuoteInput } from '@/lib/schema/quote';
import type { FeedbackInput } from '@/lib/schema/feedback';

/** Best-effort notification email. Never throws — the lead is already
 *  persisted in Supabase, so email failure must not surface as a form
 *  error to the prospect. */
export async function sendLeadNotification(args: {
  reference: string;
  data: QuoteInput;
  source: 'quote' | 'contact';
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM;
  const to = process.env.NOTIFY_TO;
  if (!apiKey || !from || !to) return;

  const { reference, data, source } = args;

  const subject =
    source === 'quote'
      ? `New quote request \u00b7 ${data.company} \u00b7 ${reference}`
      : `New contact enquiry \u00b7 ${data.company} \u00b7 ${reference}`;

  const lines: string[] = [
    `Reference: ${reference}`,
    `Source: ${source}`,
    '',
    `Company: ${data.company}`,
    `Contact: ${data.contactName}${data.role ? ` (${data.role})` : ''}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone ?? '-'}`,
    `Heard about us: ${data.hearAbout ?? '-'}`,
    '',
    `Services: ${data.services.join(', ')}`,
    `Primary: ${data.primaryService}`,
    `Event type: ${data.eventType ?? '-'}`,
    `Attendees: ${data.attendeeCount ?? '-'}`,
    `Date: ${data.eventDate || (data.dateFlexible ? 'Flexible' : '-')}`,
    `Location: ${data.location ?? '-'}`,
    `Budget: ${data.budgetBand ?? '-'}`,
    `Production needs: ${data.productionNeeds.length ? data.productionNeeds.join(', ') : '-'}`,
    `Theme: ${data.themePreference ?? '-'}`,
    `Catering: ${data.cateringRequired ? data.cateringStyle ?? 'yes' : 'no'}`,
    '',
    `Objectives: ${data.objectives ?? '-'}`,
    `Notes: ${data.notes ?? '-'}`,
    '',
    `Consent: ${data.consent ? 'yes' : 'no'}`,
    '',
    `Sent from ${SITE.name} website`,
  ];

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        reply_to: data.email,
        text: lines.join('\n'),
      }),
    });
    // Best-effort: never throw (lead is already persisted). But a non-2xx
    // here means the notification silently failed — e.g. Resend test mode
    // rejecting a real recipient because no domain is verified. Log it so
    // the failure is visible in server logs instead of vanishing.
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(
        `[email] Resend rejected notification for ${reference}: ${res.status} ${body}`,
      );
    }
  } catch (err) {
    // Network/transport failure — lead is already persisted; team can retry.
    console.error(`[email] Resend request failed for ${reference}:`, err);
  }
}

/** Best-effort notification email for customer feedback. Same
 *  fire-and-forget contract as `sendLeadNotification` — the row is already
 *  persisted, so a failure here must never surface to the customer. */
export async function sendFeedbackNotification(args: {
  reference: string;
  data: FeedbackInput;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM;
  const to = process.env.NOTIFY_TO;
  if (!apiKey || !from || !to) return;

  const { reference, data } = args;
  const stars = '\u2605'.repeat(data.rating) + '\u2606'.repeat(5 - data.rating);

  const subject = 'New Website Feedback';

  const lines: string[] = [
    `Reference: ${reference}`,
    `Rating: ${data.rating}/5  ${stars}`,
    `OK to publish: ${data.allowPublic ? 'yes' : 'no'}`,
    '',
    'Feedback:',
    data.message,
    '',
    `From: ${data.name ?? '(anonymous)'}${data.role ? `, ${data.role}` : ''}`,
    `Company: ${data.company ?? '-'}`,
    `Email: ${data.email ?? '-'}`,
    `Service area: ${data.serviceArea ?? '-'}`,
    '',
    `Consent: ${data.consent ? 'yes' : 'no'}`,
    '',
    `Sent from ${SITE.name} website`,
  ];

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        // Only set reply_to when the customer left an email. Otherwise
        // Resend rejects an empty string.
        ...(data.email ? { reply_to: data.email } : {}),
        text: lines.join('\n'),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(
        `[email] Resend rejected feedback notification for ${reference}: ${res.status} ${body}`,
      );
    }
  } catch (err) {
    console.error(`[email] Resend request failed for feedback ${reference}:`, err);
  }
}
