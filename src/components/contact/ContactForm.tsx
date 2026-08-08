'use client';
import { useEffect, useRef, useState, useTransition } from 'react';
import { submitQuote } from '@/actions/quote';

const inputCls =
  'w-full rounded-[var(--radius-md)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-ink)] focus:outline-none';

type Status =
  | { kind: 'idle' }
  | { kind: 'error'; message: string; fields?: Record<string, string[]> }
  | { kind: 'ok'; reference: string };

/** Progressive-enhancement wrapper around the same Server Action the
 *  Quote Builder uses. Falls back to a native form submit if JS never
 *  hydrates (see /contact/thank-you handling on the server side). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [isPending, startTransition] = useTransition();
  const mountedAtRef = useRef<number>(Date.now());
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    // Build a payload matching the shared schema. Contact form is a
    // reduced surface, so defaults fill the rest.
    const payload = {
      services: ['strategic-marketing' as const],
      primaryService: 'strategic-marketing' as const,
      dateFlexible: true,
      productionNeeds: [],
      cateringRequired: false,
      company: String(fd.get('company') ?? ''),
      contactName: String(fd.get('contactName') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      notes: String(fd.get('notes') ?? ''),
      consent: fd.get('consent') === 'on' || fd.get('consent') === 'true',
      website: String(fd.get('website') ?? ''),
      formStartedAt: mountedAtRef.current,
    };
    startTransition(async () => {
      const result = await submitQuote(payload, 'contact');
      if (!result.ok) {
        setStatus({ kind: 'error', message: result.error, fields: result.fieldErrors });
        return;
      }
      setStatus({ kind: 'ok', reference: result.reference });
      form.reset();
    });
  }

  if (status.kind === 'ok') {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-lg)] border border-[var(--color-line-ink)] bg-[var(--color-sand)] p-8 text-center"
      >
        <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
          Message received.
        </h3>
        <p className="mt-2 text-sm text-[var(--color-ink)]/70">
          We&rsquo;ll reply within one business day. Reference:{' '}
          <span className="font-mono font-semibold">{status.reference}</span>
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-5"
      // JS-off fallback: post directly to a mailto link. Not perfect but
      // beats a broken form.
      action={`mailto:mecincja@gmail.com`}
      method="post"
      encType="text/plain"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Company <span className="text-red-600">*</span>
          </span>
          <input name="company" required className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Your name <span className="text-red-600">*</span>
          </span>
          <input name="contactName" required className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Work email <span className="text-red-600">*</span>
          </span>
          <input name="email" type="email" required className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Phone
          </span>
          <input name="phone" type="tel" className={inputCls} />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
          How can we help? <span className="text-red-600">*</span>
        </span>
        <textarea
          name="notes"
          required
          rows={5}
          maxLength={1200}
          className={inputCls}
        />
      </label>

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-[var(--color-line-ink)]"
        />
        <span className="text-sm text-[var(--color-ink)]">
          I consent to MEC Inc. contacting me about this enquiry.{' '}
          <span className="text-red-600">*</span>
        </span>
      </label>

      {status.kind === 'error' && (
        <p
          role="alert"
          className="rounded-[var(--radius-md)] border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {status.message}
        </p>
      )}

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-2.5 text-sm font-semibold text-[var(--color-paper)] transition-colors hover:bg-[var(--color-ink-2)] disabled:opacity-60"
        >
          {isPending ? 'Sending\u2026' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
