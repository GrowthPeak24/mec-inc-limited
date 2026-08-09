'use client';
import { useFormContext } from 'react-hook-form';
import type { QuoteInput } from '@/lib/schema/quote';
import {
  EVENT_TYPE_OPTIONS,
  ATTENDEE_BAND_OPTIONS,
  BUDGET_BAND_OPTIONS,
  PRODUCTION_NEEDS_OPTIONS,
} from '@/content/quote-options';
import { SelectableCard } from './SelectableCard';

const inputCls =
  'w-full rounded-[var(--radius-md)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-ink)] focus:outline-none';

const selectCls = inputCls;

/** Coerce the `<option value="">Select…</option>` placeholder to `undefined`
 *  so `z.enum(...).optional()` accepts an unset field (it rejects `""`). */
const emptyToUndef = { setValueAs: (v: unknown) => (v === '' ? undefined : v) };

export function Step2Scale() {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuoteInput>();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)]/60">
          Step 2 of 4
        </p>
        <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
          Event &amp; campaign scale
        </h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--color-ink)]/70">
          Rough numbers are fine. This helps us route the brief to the right lead.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Event type
          </span>
          <select className={selectCls} {...register('eventType', emptyToUndef)}>
            <option value="">Select&hellip;</option>
            {EVENT_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Expected attendees
          </span>
          <select className={selectCls} {...register('attendeeCount', emptyToUndef)}>
            <option value="">Select&hellip;</option>
            {ATTENDEE_BAND_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Preferred date
          </span>
          <input type="date" className={inputCls} {...register('eventDate')} />
          {errors.eventDate && (
            <span className="mt-1 block text-sm text-red-600" role="alert">
              {errors.eventDate.message as string}
            </span>
          )}
        </label>

        <label className="flex items-center gap-2 pt-7">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-[var(--color-line-ink)] text-[var(--color-ink)]"
            {...register('dateFlexible')}
          />
          <span className="text-sm text-[var(--color-ink)]">Date is flexible</span>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Location / venue
          </span>
          <input
            type="text"
            placeholder="e.g. Kingston, JAM (venue TBC)"
            className={inputCls}
            {...register('location')}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Budget band (JMD / USD)
          </span>
          <select className={selectCls} {...register('budgetBand', emptyToUndef)}>
            <option value="">Select&hellip;</option>
            {BUDGET_BAND_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-[var(--color-ink)]">
          Production needs (optional)
        </legend>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTION_NEEDS_OPTIONS.map((opt) => (
            <SelectableCard
              key={opt.value}
              variant="checkbox"
              value={opt.value}
              label={opt.label}
              {...register('productionNeeds')}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
