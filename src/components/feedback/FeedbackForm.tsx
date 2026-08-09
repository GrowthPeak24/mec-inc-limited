'use client';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { submitFeedback } from '@/actions/feedback';
import { FEEDBACK_SERVICE_AREA_OPTIONS } from '@/lib/schema/feedback';

const inputCls =
  'w-full rounded-[var(--radius-md)] border border-[var(--color-line-ink)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-ink)] focus:outline-none';

type Status =
  | { kind: 'idle' }
  | { kind: 'error'; message: string; fields?: Record<string, string[]> }
  | { kind: 'ok'; reference: string };

/** Progressive-enhancement wrapper around the `submitFeedback` Server
 *  Action. Star rating is a real `<input type="radio">` group so the form
 *  degrades gracefully without JS. The client wrapper adds instant
 *  feedback, dwell-time capture, and honeypot enforcement.
 *
 *  This is the 5th `'use client'` shipped sitewide — a documented, deliberate
 *  addition on top of the CLAUDE.md ceiling of 4. Reason: the star picker
 *  needs interactivity for accessible hover/keyboard preview, and reusing
 *  the ContactForm progressive-enhancement pattern keeps the mental model
 *  consistent across every write-surface. */
export function FeedbackForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const mountedAtRef = useRef<number>(Date.now());
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      rating: Number(fd.get('rating') ?? 0),
      message: String(fd.get('message') ?? ''),
      name: String(fd.get('name') ?? ''),
      role: String(fd.get('role') ?? ''),
      company: String(fd.get('company') ?? ''),
      email: String(fd.get('email') ?? ''),
      serviceArea: (fd.get('serviceArea') || undefined) as string | undefined,
      allowPublic:
        fd.get('allowPublic') === 'on' || fd.get('allowPublic') === 'true',
      consent: fd.get('consent') === 'on' || fd.get('consent') === 'true',
      website: String(fd.get('website') ?? ''),
      formStartedAt: mountedAtRef.current,
    };
    startTransition(async () => {
      const result = await submitFeedback(payload);
      if (!result.ok) {
        setStatus({
          kind: 'error',
          message: result.error,
          fields: result.fieldErrors,
        });
        return;
      }
      setStatus({ kind: 'ok', reference: result.reference });
      setRating(0);
      form.reset();
      // Route to the dedicated thank-you page so the reference lives at a
      // real URL (shareable, back-button correct, same UX as /quote).
      router.push(`/feedback/thank-you?ref=${encodeURIComponent(result.reference)}`);
    });
  }

  if (status.kind === 'ok') {
    // Brief in-place confirmation while the router transition completes.
    return (
      <div
        role="status"
        className="rounded-[var(--radius-lg)] border border-[var(--color-line-ink)] bg-[var(--color-sand)] p-8 text-center"
      >
        <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
          Thank you.
        </h3>
        <p className="mt-2 text-sm text-[var(--color-ink)]/70">
          Sending you to the confirmation page&hellip; Reference:{' '}
          <span className="font-mono font-semibold">{status.reference}</span>
        </p>
      </div>
    );
  }

  const shown = hoverRating || rating;
  const fieldErr = (name: string) =>
    status.kind === 'error' ? status.fields?.[name]?.[0] : undefined;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-5"
    >
      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
          Overall rating <span className="text-red-600">*</span>
        </legend>
        {/* Real radio inputs so the form is submittable without JS. Labels
            are the interactive surface — visual stars sit inside them. */}
        <div
          className="flex items-center gap-1"
          onMouseLeave={() => setHoverRating(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => {
            const filled = n <= shown;
            return (
              <label
                key={n}
                className="cursor-pointer p-1"
                onMouseEnter={() => setHoverRating(n)}
              >
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  className="sr-only"
                  checked={rating === n}
                  onChange={() => setRating(n)}
                  required={n === 1}
                  aria-label={`${n} of 5`}
                />
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill={filled ? 'var(--color-gold)' : 'none'}
                  stroke={filled ? 'var(--color-gold)' : 'var(--color-line-ink)'}
                  strokeWidth="1.6"
                  aria-hidden
                >
                  <path
                    strokeLinejoin="round"
                    d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.7l-5.9 3 1.2-6.6L2.5 9.5l6.6-.9L12 2.5z"
                  />
                </svg>
              </label>
            );
          })}
          <span className="ml-3 text-sm text-[var(--color-ink)]/70" aria-live="polite">
            {shown ? `${shown} of 5` : 'Tap a star'}
          </span>
        </div>
        {fieldErr('rating') && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {fieldErr('rating')}
          </p>
        )}
      </fieldset>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
          Your feedback <span className="text-red-600">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={6}
          minLength={10}
          maxLength={2000}
          placeholder="What worked, what didn\u2019t, what should we do next time?"
          className={inputCls}
        />
        {fieldErr('message') && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {fieldErr('message')}
          </p>
        )}
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Name
          </span>
          <input name="name" className={inputCls} autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Role / title
          </span>
          <input name="role" className={inputCls} autoComplete="organization-title" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Company
          </span>
          <input name="company" className={inputCls} autoComplete="organization" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
            Email
          </span>
          <input
            name="email"
            type="email"
            className={inputCls}
            autoComplete="email"
          />
          {fieldErr('email') && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {fieldErr('email')}
            </p>
          )}
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
          Which service did we deliver for you?
        </span>
        <select
          name="serviceArea"
          defaultValue=""
          className={inputCls}
        >
          <option value="">Select&hellip;</option>
          {FEEDBACK_SERVICE_AREA_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      {/* Honeypot — hidden from users and assistive tech. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="allowPublic"
          className="mt-0.5 h-4 w-4 rounded border-[var(--color-line-ink)]"
        />
        <span className="text-sm text-[var(--color-ink)]/80">
          You may quote me on your website or marketing materials.
        </span>
      </label>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-[var(--color-line-ink)]"
        />
        <span className="text-sm text-[var(--color-ink)]">
          I consent to MEC Inc. contacting me about this feedback.{' '}
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
          {isPending ? 'Sending\u2026' : 'Send feedback'}
        </button>
      </div>
    </form>
  );
}
