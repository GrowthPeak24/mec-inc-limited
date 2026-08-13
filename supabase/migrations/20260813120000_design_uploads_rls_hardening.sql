-- ============================================================================
-- MEC Inc. design-uploads bucket — RLS hardening.
--
-- Live incident 2026-08-13: quote form users saw
--   "Upload failed. Please try again, or attach later via email."
-- Root cause investigation showed the earlier migration
-- (20260810120000_design_uploads_storage.sql) created the policies inside a
-- `do $$ ... if not exists ... $$;` block. If a policy of the same name was
-- ever created out-of-band (Studio UI, prior partial migration) with slightly
-- different roles or predicates, the block would silently skip re-creation
-- and leave a broken policy in place.
--
-- This migration is defensive: it DROPS any existing policies of the same
-- name and re-creates them with the intended shape, guaranteeing the anon
-- role has both INSERT and SELECT on storage.objects for the
-- `design-uploads` bucket.
--
-- We also re-assert the bucket config (public=true, mime allowlist, 10MiB)
-- so a manually-edited bucket is snapped back to policy.
-- ============================================================================

-- 1) Re-assert bucket config (idempotent).
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

-- 2) Drop-and-recreate the two policies. `if exists` keeps this safe on
--    a fresh database that never ran the prior migration.
drop policy if exists "anon can upload design references"  on storage.objects;
drop policy if exists "public can read design references"  on storage.objects;

-- anon INSERT — scoped to this bucket. Size + mime already enforced at
-- bucket level (see step 1), so no duplicate check here.
create policy "anon can upload design references"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'design-uploads');

-- anon SELECT — required so getPublicUrl links resolve and so the storage
-- SDK's post-upload metadata read succeeds. Bucket is already public=true,
-- but we make the intent explicit and scoped.
create policy "public can read design references"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'design-uploads');
