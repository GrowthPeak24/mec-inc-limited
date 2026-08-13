-- ============================================================================
-- MEC Inc. lead design reference uploads
--
-- Creates a public Storage bucket `design-uploads` and adds a column on
-- quote_requests to persist the resulting public object URL.
--
-- Threat model:
--   * Bucket is public-READ so the MEC team can click the URL in the
--     notification email without an authenticated Supabase session. This
--     is fine for prospect-provided design references — anything uploaded
--     is voluntarily shared with us.
--   * Anon INSERT is allowed only under strict RLS: bucket must match,
--     size <= 10MB, mime must be in an allowlist (png/jpeg/webp/pdf).
--     Owner/update/delete are NOT granted to anon.
--   * File-size limit is also enforced at the bucket level so oversized
--     bodies are rejected before they hit the RLS policy.
--   * Client uploads with the publishable anon key; the Server Action
--     re-validates that the stored URL sits on THIS project's storage
--     subdomain and in THIS bucket, so a tampered payload cannot inject
--     an external URL into the notification email.
-- ============================================================================

-- 1) Add column to quote_requests to store the public URL (nullable).
alter table public.quote_requests
  add column if not exists design_upload_url text;

alter table public.quote_requests
  add constraint quote_requests_design_upload_url_len
    check (design_upload_url is null or char_length(design_upload_url) <= 2000);

-- 2) Create the public bucket if it doesn't already exist. 10 MiB cap.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'design-uploads',
  'design-uploads',
  true,
  10485760,
  array['image/png','image/jpeg','image/webp','application/pdf']::text[]
)
on conflict (id) do update
  set public              = excluded.public,
      file_size_limit     = excluded.file_size_limit,
      allowed_mime_types  = excluded.allowed_mime_types;

-- 3) RLS policies on storage.objects for this bucket.
--
-- We add two anon-facing policies:
--   * INSERT: allow uploads into the design-uploads bucket only.
--     File-size + mime allowlist are already enforced at the bucket level
--     (see above), so we don't need to duplicate them here.
--   * SELECT: allow the object to be fetched publicly (bucket.public=true
--     already covers this at the storage.objects level via a bundled
--     policy, but we make it explicit and scoped to our bucket).
--
-- We do NOT grant UPDATE or DELETE to anon — the file is write-once.
--
-- storage.objects already has RLS enabled by Supabase; we just add scoped
-- policies.

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename  = 'objects'
      and policyname = 'anon can upload design references'
  ) then
    create policy "anon can upload design references"
      on storage.objects
      for insert
      to anon
      with check (bucket_id = 'design-uploads');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename  = 'objects'
      and policyname = 'public can read design references'
  ) then
    create policy "public can read design references"
      on storage.objects
      for select
      to anon, authenticated
      using (bucket_id = 'design-uploads');
  end if;
end $$;
