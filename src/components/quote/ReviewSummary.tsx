'use client';
import { useFormContext } from 'react-hook-form';
import type { QuoteInput } from '@/lib/schema/quote';
import {
  SERVICE_OPTIONS,
  EVENT_TYPE_OPTIONS,
  ATTENDEE_BAND_OPTIONS,
  BUDGET_BAND_OPTIONS,
  PRODUCTION_NEEDS_OPTIONS,
  THEME_OPTIONS,
  CATERING_STYLE_OPTIONS,
} from '@/content/quote-options';

function labelOf<T extends readonly { value: string; label: string }[]>(
  opts: T,
  value: string | undefined,
): string {
  if (!value) return 'Not set';
  return opts.find((o) => o.value === value)?.label ?? value;
}

export function ReviewSummary() {
  const { watch } = useFormContext<QuoteInput>();
  const v = watch();

  const rows: [string, string][] = [
    [
      'Services',
      (v.services ?? []).map((s) => labelOf(SERVICE_OPTIONS, s)).join(', ') || 'Not set',
    ],
    ['Primary focus', labelOf(SERVICE_OPTIONS, v.primaryService)],
    ['Event type', labelOf(EVENT_TYPE_OPTIONS, v.eventType)],
    ['Attendees', labelOf(ATTENDEE_BAND_OPTIONS, v.attendeeCount)],
    [
      'Date',
      v.eventDate ? v.eventDate : v.dateFlexible ? 'Flexible' : 'Not set',
    ],
    ['Location', v.location || 'Not set'],
    ['Budget', labelOf(BUDGET_BAND_OPTIONS, v.budgetBand)],
    [
      'Production',
      (v.productionNeeds ?? [])
        .map((p) => labelOf(PRODUCTION_NEEDS_OPTIONS, p))
        .join(', ') || 'Not set',
    ],
    ['Theme', labelOf(THEME_OPTIONS, v.themePreference ?? undefined)],
    [
      'Catering',
      v.cateringRequired
        ? labelOf(CATERING_STYLE_OPTIONS, v.cateringStyle ?? undefined)
        : 'Not required',
    ],
    ['Design upload', v.designUploadUrl ? 'Attached' : 'None'],
  ];

  return (
    <section
      aria-label="Review your brief"
      className="rounded-[var(--radius-md)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-5"
    >
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-ink)]/70">
        Review your brief
      </h3>
      <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {rows.map(([k, val]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line-ink)]/40 py-1.5">
            <dt className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink)]/60">
              {k}
            </dt>
            <dd className="max-w-[65%] text-right text-sm text-[var(--color-ink)]">
              {val}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
