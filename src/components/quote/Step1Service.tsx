'use client';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { QuoteInput } from '@/lib/schema/quote';
import { SERVICE_OPTIONS } from '@/content/quote-options';
import { SelectableCard } from './SelectableCard';

export function Step1Service() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<QuoteInput>();
  const selected = watch('services') ?? [];
  const primary = watch('primaryService');
  const canPickPrimary = selected.length > 0;

  // Auto-set primary when exactly one service is picked, and clear it if
  // the currently-primary service is deselected. Removes the confusing
  // "why can't I click these?" step for single-service enquiries.
  // Key on a stable string so the effect only runs when `services` changes.
  const selectedKey = selected.join('|');
  useEffect(() => {
    const list = selectedKey ? selectedKey.split('|') : [];
    if (list.length === 1 && primary !== list[0]) {
      setValue('primaryService', list[0] as QuoteInput['primaryService'], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else if (primary && !list.includes(primary)) {
      setValue('primaryService', '' as unknown as QuoteInput['primaryService'], {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  }, [selectedKey, primary, setValue]);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)]/60">
          Step 1 of 4
        </p>
        <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
          Which services do you need?
        </h2>
        <p className="mt-2 max-w-xl text-sm text-[var(--color-ink)]/70">
          Pick everything that applies. We&rsquo;ll narrow the primary focus below.
        </p>
      </header>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-[var(--color-ink)]">
          Services required
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((opt) => (
            <SelectableCard
              key={opt.value}
              variant="checkbox"
              value={opt.value}
              label={opt.label}
              {...register('services')}
            />
          ))}
        </div>
        {errors.services && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {errors.services.message as string}
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-[var(--color-ink)]">
          Which is the primary need?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((opt) => {
            const disabled = !selected.includes(opt.value);
            return (
              <SelectableCard
                key={opt.value}
                variant="radio"
                value={opt.value}
                label={opt.label}
                hint={disabled ? 'Select above first' : undefined}
                disabled={disabled}
                {...register('primaryService')}
              />
            );
          })}
        </div>
        {!canPickPrimary && (
          <p className="mt-2 text-xs text-[var(--color-ink)]/60">
            Choose one or more services above to enable primary selection.
          </p>
        )}
        {errors.primaryService && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {errors.primaryService.message as string}
          </p>
        )}
      </fieldset>
    </div>
  );
}
