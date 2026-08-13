'use client';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { quoteSchema, STEP_FIELDS, type QuoteInput } from '@/lib/schema/quote';

/** RHF wants the *input* shape for `defaultValues` (where zod defaults
 *  may still be undefined), but our field-registration types use the
 *  *output* shape. Split them explicitly. */
type QuoteFormInput = z.input<typeof quoteSchema>;
import { submitQuote } from '@/actions/quote';
import { StepProgress } from './StepProgress';
import { StepNav } from './StepNav';
import { Step1Service } from './Step1Service';
import { Step2Scale } from './Step2Scale';
import { Step3Concept } from './Step3Concept';
import { Step4Details } from './Step4Details';

type Step = 1 | 2 | 3 | 4;
const STEP_TITLES: Record<Step, string> = {
  1: 'Step 1 of 4: Services',
  2: 'Step 2 of 4: Event & campaign scale',
  3: 'Step 3 of 4: Concept & direction',
  4: 'Step 4 of 4: Your details',
};

export function QuoteBuilder() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const headingRef = useRef<HTMLDivElement | null>(null);
  const mountedAtRef = useRef<number>(Date.now());

  const methods = useForm<QuoteFormInput, unknown, QuoteInput>({
    resolver: zodResolver(quoteSchema),
    mode: 'onBlur',
    shouldFocusError: true,
    defaultValues: {
      services: [],
      productionNeeds: [],
      dateFlexible: false,
      cateringRequired: false,
      consent: undefined as unknown as true,
      website: '',
    },
  });

  // Persist mount time into the form payload so the Server Action can
  // enforce the dwell-time check.
  useEffect(() => {
    methods.setValue('formStartedAt', mountedAtRef.current, {
      shouldValidate: false,
    });
  }, [methods]);

  // Clear the aggregated error banner the moment the user edits anything —
  // otherwise a stale "Please fix: …" from a prior submit/next attempt keeps
  // showing after the offending fields have already been corrected.
  useEffect(() => {
    const sub = methods.watch(() => setSubmitError(null));
    return () => sub.unsubscribe();
  }, [methods]);

  // On step change, bring the top of the new step into view (above the
  // sticky header) so the user starts reading from the top — then move
  // focus to the heading for screen-reader / keyboard users.
  useEffect(() => {
    requestAnimationFrame(() => {
      const el = headingRef.current;
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      el.focus({ preventScroll: true });
    });
  }, [step]);

  async function handleNext() {
    setSubmitError(null);
    const fields = STEP_FIELDS[step] as unknown as (keyof QuoteFormInput)[];
    const ok = await methods.trigger(fields);
    if (!ok) {
      // Never fail silently — surface which fields are blocking the advance.
      const bad = fields.filter((f) => methods.getFieldState(f).invalid);
      setSubmitError(
        bad.length
          ? `Please fix: ${bad
              .map((k) => {
                const msg = methods.getFieldState(k).error?.message;
                return msg ? `${String(k)}: ${msg}` : String(k);
              })
              .join('; ')}`
          : 'Please complete the highlighted fields before continuing.',
      );
      return;
    }
    setStep((s) => Math.min(4, s + 1) as Step);
  }

  function handleBack() {
    setSubmitError(null);
    setStep((s) => Math.max(1, s - 1) as Step);
  }

  const onSubmit = methods.handleSubmit(
    (data) => {
      setSubmitError(null);
      startTransition(async () => {
        try {
          const result = await submitQuote(data, 'quote');
          if (!result.ok) {
            setSubmitError(result.error);
            if (result.fieldErrors) {
              for (const [field, msgs] of Object.entries(result.fieldErrors)) {
                const first = msgs?.[0];
                if (first) {
                  methods.setError(field as keyof QuoteFormInput, {
                    type: 'server',
                    message: first,
                  });
                }
              }
            }
            return;
          }
          // First name only — the confirmation page greets the lead by name.
          const firstName = data.contactName.trim().split(/\s+/)[0] ?? '';
          router.push(
            `/quote/thank-you?ref=${encodeURIComponent(result.reference)}&name=${encodeURIComponent(firstName)}`,
          );
        } catch {
          setSubmitError(
            'Something went wrong submitting your brief. Please try again, or email us at mecincja@gmail.com.',
          );
        }
      });
    },
    (errors) => {
      // Validation blocked submission. Find the earliest step that owns a
      // failing field and jump to it so the user actually sees the error.
      const bad = Object.keys(errors);
      const stepWithError = ([1, 2, 3, 4] as const).find((s) =>
        (STEP_FIELDS[s] as readonly string[]).some((f) => bad.includes(f)),
      );
      if (stepWithError && stepWithError !== step) setStep(stepWithError);
      const badList = bad
        .map((k) => {
          const e = (errors as Record<string, { message?: string }>)[k];
          return e?.message ? `${k}: ${e.message}` : k;
        })
        .join('; ');
      setSubmitError(
        `Please fix: ${badList}`,
      );
      // Scroll first invalid field into view after RHF paints the errors.
      requestAnimationFrame(() => {
        const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
        first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    },
  );

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-3xl">
        <StepProgress current={step} />
        {/* Screen-reader live announcement of the current step. */}
        <div className="sr-only" role="status" aria-live="polite">
          {STEP_TITLES[step]}
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-line-ink)] bg-[var(--color-sand)] p-6 shadow-sm md:p-10"
        >
          <div ref={headingRef} tabIndex={-1} className="outline-none">
            {step === 1 && <Step1Service />}
            {step === 2 && <Step2Scale />}
            {step === 3 && <Step3Concept />}
            {step === 4 && <Step4Details />}
          </div>

          {submitError && (
            <p
              className="mt-6 rounded-[var(--radius-md)] border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
              role="alert"
            >
              {submitError}
            </p>
          )}

          <StepNav
            step={step}
            submitting={isPending}
            onBack={handleBack}
            onNext={handleNext}
          />
        </form>

        <p className="mt-6 text-center text-xs text-[var(--color-ink)]/60">
          Prefer to talk? Call{' '}
          <a href="tel:+18765658200" className="underline">
            +1 (876) 565-8200
          </a>{' '}
          or email{' '}
          <a href="mailto:mecincja@gmail.com" className="underline">
            mecincja@gmail.com
          </a>
          .
        </p>
      </div>
    </FormProvider>
  );
}
