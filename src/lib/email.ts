import 'server-only';
import { SITE } from '@/lib/site';
import type { QuoteInput } from '@/lib/schema/quote';

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
