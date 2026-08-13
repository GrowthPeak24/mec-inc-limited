'use client';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { QuoteInput } from '@/lib/schema/quote';
import { THEME_OPTIONS, CATERING_STYLE_OPTIONS } from '@/content/quote-options';
import { SelectableCard } from './SelectableCard';
import { DesignUploadField } from './DesignUploadField';

const textareaCls =
  'w-full rounded-[var(--radius-md)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-ink)] focus:outline-none';

export function Step3Concept() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<QuoteInput>();

  const services = watch('services') ?? [];
  const cateringRequired = watch('cateringRequired');

  // Auto-imply catering when catering is the only service selected.
  const onlyCatering =
    services.length === 1 && services[0] === 'bespoke-catering';
  useEffect(() => {
    if (onlyCatering && !cateringRequired) {
      setValue('cateringRequired', true, { shouldValidate: false });
    }
  }, [onlyCatering, cateringRequired, setValue]);

  const showCateringStyle = cateringRequired || onlyCatering;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)]/60">
          Step 3 of 4
        </p>
        <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
          Concept &amp; direction
        </h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--color-ink)]/70">
          Tell us how you&rsquo;re thinking about the look, feel, and outcomes.
        </p>
      </header>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-[var(--color-ink)]">
          Theme direction (optional)
        </legend>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {THEME_OPTIONS.map((opt) => (
            <SelectableCard
              key={opt.value}
              variant="radio"
              value={opt.value}
              label={opt.label}
              {...register('themePreference')}
            />
          ))}
        </div>
      </fieldset>

      <div className="space-y-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-[var(--color-line-ink)] text-[var(--color-ink)]"
            {...register('cateringRequired')}
            disabled={onlyCatering}
          />
          <span>
            <span className="block text-sm font-medium text-[var(--color-ink)]">
              We need catering for this
            </span>
            {onlyCatering && (
              <span className="mt-0.5 block text-xs text-[var(--color-ink)]/60">
                Auto-selected because you chose Bespoke Catering.
              </span>
            )}
          </span>
        </label>

        {showCateringStyle && (
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-[var(--color-ink)]">
              Catering style
            </legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CATERING_STYLE_OPTIONS.map((opt) => (
                <SelectableCard
                  key={opt.value}
                  variant="radio"
                  value={opt.value}
                  label={opt.label}
                  {...register('cateringStyle')}
                />
              ))}
            </div>
            {errors.cateringStyle && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {errors.cateringStyle.message as string}
              </p>
            )}
          </fieldset>
        )}
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
          What does success look like? <span className="text-[var(--color-ink)]/50">(optional)</span>
        </span>
        <textarea
          rows={3}
          maxLength={600}
          placeholder="e.g. reposition brand for younger audience; 800 qualified attendees; press coverage in 3 outlets"
          className={textareaCls}
          {...register('objectives')}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
          Anything else we should know? <span className="text-[var(--color-ink)]/50">(optional)</span>
        </span>
        <textarea
          rows={4}
          maxLength={1200}
          placeholder="Constraints, VIP considerations, prior partners, references&hellip;"
          className={textareaCls}
          {...register('notes')}
        />
      </label>

      <DesignUploadField />
    </div>
  );
}
