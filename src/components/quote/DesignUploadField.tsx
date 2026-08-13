'use client';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { QuoteInput } from '@/lib/schema/quote';
import { supabaseAnon } from '@/lib/supabase/anon';

const BUCKET = 'design-uploads';
const MAX_BYTES = 10 * 1024 * 1024; // 10 MiB
const ALLOWED_MIME = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/pdf',
] as const;
const ALLOWED_EXT_HINT = '.png,.jpg,.jpeg,.webp,.pdf';

/** Direct-to-Supabase upload for a single design reference file. The
 *  resulting public URL is stored in the RHF field `designUploadUrl`, then
 *  submitted through the shared Server Action alongside the rest of the
 *  brief. Bucket policies (mime allowlist + 10MB cap) are duplicated in
 *  supabase/migrations/20260810120000_design_uploads_storage.sql so a
 *  tampered client can't slip past. */
export function DesignUploadField() {
  const { register, setValue, watch } = useFormContext<QuoteInput>();
  const [status, setStatus] = useState<
    | { kind: 'idle' }
    | { kind: 'uploading'; name: string }
    | { kind: 'error'; message: string }
  >({ kind: 'idle' });
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Register the URL field so RHF tracks it (hidden — we set it after upload).
  register('designUploadUrl');
  const currentUrl = watch('designUploadUrl') ?? undefined;

  async function handleFile(file: File) {
    if (!ALLOWED_MIME.includes(file.type as (typeof ALLOWED_MIME)[number])) {
      setStatus({
        kind: 'error',
        message: 'Use PNG, JPG, WEBP, or PDF.',
      });
      return;
    }
    if (file.size > MAX_BYTES) {
      setStatus({
        kind: 'error',
        message: 'File exceeds the 10MB limit.',
      });
      return;
    }
    setStatus({ kind: 'uploading', name: file.name });

    try {
      const supabase = supabaseAnon();
      const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
      const year = new Date().getUTCFullYear();
      // Random UUID keeps names unguessable and collision-free.
      const uuid =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      const path = `${year}/${uuid}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, {
          cacheControl: '31536000',
          contentType: file.type,
          upsert: false,
        });
      if (uploadErr) {
        setStatus({
          kind: 'error',
          message:
            'Upload failed. Please try again, or attach later via email.',
        });
        return;
      }
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
      const url = pub?.publicUrl;
      if (!url) {
        setStatus({
          kind: 'error',
          message: 'Could not resolve public link. Try again.',
        });
        return;
      }
      setValue('designUploadUrl', url, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setStatus({ kind: 'idle' });
    } catch {
      setStatus({
        kind: 'error',
        message: 'Upload failed. Please try again shortly.',
      });
    }
  }

  function clear() {
    setValue('designUploadUrl', undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setStatus({ kind: 'idle' });
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="block">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink)]/70">
        Design upload <span className="text-[var(--color-ink)]/50">(optional)</span>
      </p>
      <p className="mb-3 text-sm text-[var(--color-ink)]/70">
        Upload photos or reference images of your design idea.
      </p>

      <div className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-dashed border-[var(--color-line-ink)] bg-[var(--color-paper)] p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_EXT_HINT}
            onChange={(e) => {
              const f = e.currentTarget.files?.[0];
              if (f) void handleFile(f);
            }}
            disabled={status.kind === 'uploading'}
            className="block w-full text-sm text-[var(--color-ink)] file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-[var(--color-ink)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-paper)] hover:file:bg-[var(--color-ink-2)] disabled:opacity-60"
          />
        </div>

        <p className="text-xs text-[var(--color-ink)]/60">
          PNG, JPG, WEBP or PDF &middot; up to 10&nbsp;MB.
        </p>

        {status.kind === 'uploading' && (
          <p className="text-sm text-[var(--color-ink)]/70" role="status">
            Uploading {status.name}&hellip;
          </p>
        )}
        {status.kind === 'error' && (
          <p className="text-sm text-red-600" role="alert">
            {status.message}
          </p>
        )}
        {currentUrl && status.kind === 'idle' && (
          <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-sand)] px-3 py-2">
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--color-ink)] underline underline-offset-2"
            >
              View uploaded file
            </a>
            <button
              type="button"
              onClick={clear}
              className="ml-auto text-xs font-medium text-[var(--color-ink)]/70 underline underline-offset-2 hover:text-[var(--color-ink)]"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
