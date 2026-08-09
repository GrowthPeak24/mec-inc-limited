-- ============================================================================
-- MEC Inc. customer feedback — feedback_submissions
--
-- Design notes (mirror the quote_requests pattern intentionally):
--   * Enum values duplicated as CHECK constraints so a tampered client
--     payload fails Postgres even if it bypasses the zod parse layer.
--   * RLS grants anon INSERT only when consent = true. NO select/update/
--     delete policy for anon — the row is write-once from the browser.
--   * Server-side reads happen via the service-role key from Server Actions
--     / dashboards, which bypass RLS by design.
--   * ip_hash stores a salted hash (never a raw IP) for rate-limiting.
--   * Rate-limit RPC is SECURITY DEFINER, revoked from anon, granted only
--     to service_role — the same shape as quote_rate_limit_ok.
-- ============================================================================

create extension if not exists pgcrypto;

create table public.feedback_submissions (
  id           uuid        primary key default gen_random_uuid(),
  reference    text        unique not null,
  created_at   timestamptz not null default now(),

  status       text        not null default 'new'
                 check (status in ('new','reviewed','archived')),

  -- Star rating 1..5. Required.
  rating       smallint    not null check (rating between 1 and 5),

  -- Free-form testimonial. Required, capped to protect the row.
  message      text        not null check (char_length(message) between 10 and 2000),

  -- Optional attribution. Name/company let us feature the quote publicly
  -- (with consent). Email is only for follow-up, never displayed.
  name         text        check (name is null or char_length(name) <= 120),
  role         text        check (role is null or char_length(role) <= 120),
  company      text        check (company is null or char_length(company) <= 120),
  email        text        check (email is null or char_length(email) <= 254),

  -- Where the customer worked with MEC (optional context).
  service_area text        check (service_area in (
                   'strategic-marketing','event-production',
                   'bespoke-catering','stage-and-booth-build','other'
                 )),

  -- Explicit permission to quote them on marketing surfaces. Independent
  -- of the required `consent` flag (which is "contact me about this
  -- feedback"). Only feedback with `allow_public = true` is safe to
  -- surface on the site.
  allow_public boolean     not null default false,

  consent      boolean     not null,
  ip_hash      text
);

create index feedback_submissions_created_at_idx on public.feedback_submissions (created_at desc);
create index feedback_submissions_status_idx     on public.feedback_submissions (status);
create index feedback_submissions_rating_idx     on public.feedback_submissions (rating);
create index feedback_submissions_reference_idx  on public.feedback_submissions (reference);
create index feedback_submissions_ip_hash_idx    on public.feedback_submissions (ip_hash, created_at);

-- ---------------------------------------------------------------------------
-- Rate limit helper — 5 submissions per rolling hour per ip_hash.
-- SECURITY DEFINER so anon can call it without SELECT rights on the table.
-- ---------------------------------------------------------------------------
create or replace function public.feedback_rate_limit_ok(p_ip_hash text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select (
    select count(*) from public.feedback_submissions
    where ip_hash = p_ip_hash
      and created_at > now() - interval '1 hour'
  ) < 5;
$$;

revoke all     on function public.feedback_rate_limit_ok(text) from public;
revoke execute on function public.feedback_rate_limit_ok(text) from anon, authenticated;
grant  execute on function public.feedback_rate_limit_ok(text) to service_role;

-- ---------------------------------------------------------------------------
-- RLS — anon can insert only, and only when consent = true. Reads happen
-- via service-role from the Server Action.
-- ---------------------------------------------------------------------------
alter table public.feedback_submissions enable row level security;

create policy "anon can insert feedback with consent"
  on public.feedback_submissions
  for insert
  to anon
  with check (consent = true);

-- Deliberately: no select/update/delete policy for anon.
