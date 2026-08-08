'use client';
import { useFormContext } from 'react-hook-form';
import type { QuoteInput } from '@/lib/schema/quote';
import { HEAR_ABOUT_OPTIONS } from '@/content/quote-options';
import { ReviewSummary } from './ReviewSummary';

const inputCls =
  'w-full rounded-[var(--radius-md)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-ink)] focus:outline-none';

/** Coerce `<option value="">` placeholder to `undefined` so
 *  `z.enum(...).optional()` accepts an unset field. */
const emptyToUndef = { setValueAs: (v: unknown) => (v === '' ? undefined : v) };

export function Step4Details() {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuoteInput>();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)]/60">
          Step 4 of 4
        </p>
        <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
          Your details
        </h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--color-ink)]/70">
          We&rsquo;ll reply within one business day with next steps and availability.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Company / organisation <span className="text-red-600">*</span>
          </span>
          <input type="text" autoComplete="organization" className={inputCls} {...register('company')} />
          {errors.company && (
            <span className="mt-1 block text-sm text-red-600" role="alert">
              {errors.company.message as string}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Your name <span className="text-red-600">*</span>
          </span>
          <input type="text" autoComplete="name" className={inputCls} {...register('contactName')} />
          {errors.contactName && (
            <span className="mt-1 block text-sm text-red-600" role="alert">
              {errors.contactName.message as string}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Role / title
          </span>
          <input type="text" autoComplete="organization-title" className={inputCls} {...register('role')} />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Work email <span className="text-red-600">*</span>
          </span>
          <input type="email" autoComplete="email" className={inputCls} {...register('email')} />
          {errors.email && (
            <span className="mt-1 block text-sm text-red-600" role="alert">
              {errors.email.message as string}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Phone (optional)
          </span>
          <input type="tel" autoComplete="tel" className={inputCls} {...register('phone')} />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            How did you hear about us?
          </span>
          <select className={inputCls} {...register('hearAbout', emptyToUndef)}>
            <option value="">Select&hellip;</option>
            {HEAR_ABOUT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Honeypot — CSS-hidden but not display:none so bots that skip hidden fields still fill it. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('website')}
          />
        </label>
      </div>

      <ReviewSummary />

      <label className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-line-ink)] bg-[var(--color-sand)] p-4">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-[var(--color-line-ink)] text-[var(--color-ink)]"
          {...register('consent')}
        />
        <span className="text-sm text-[var(--color-ink)]">
          I consent to MEC Inc. contacting me about this enquiry and handling my
          details per the{' '}
          <a href="/privacy" className="underline underline-offset-2">
            privacy notice
          </a>
          . <span className="text-red-600">*</span>
        </span>
      </label>
      {errors.consent && (
        <p className="-mt-4 text-sm text-red-600" role="alert">
          {errors.consent.message as string}
        </p>
      )}
    </div>
  );
}
