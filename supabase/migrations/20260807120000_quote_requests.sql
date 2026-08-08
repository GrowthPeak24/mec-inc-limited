-- ============================================================================
-- MEC Inc. lead capture — quote_requests
--
-- Design notes:
--   • Enum values are duplicated as CHECK constraints so a tampered client
--     payload fails Postgres even if it bypasses the zod parse layer.
--   • RLS grants anon INSERT only when consent = true. NO select/update/
--     delete policy for anon — the row is write-once from the browser.
--   • Server-side admin reads happen via the service-role key from the
--     Server Action / dashboards, which bypass RLS by design.
--   • ip_hash stores a salted hash (never a raw IP) for rate-limiting.
-- ============================================================================

create extension if not exists pgcrypto;

create table public.quote_requests (
  id                 uuid        primary key default gen_random_uuid(),
  reference          text        unique not null,
  created_at         timestamptz not null default now(),

  source             text        not null default 'quote'
                       check (source in ('quote','contact')),
  status             text        not null default 'new'
                       check (status in ('new','contacted','won','lost')),

  -- Step 1: Service
  services           text[]      not null
                       check (array_length(services, 1) >= 1)
                       check (services <@ array[
                         'strategic-marketing',
                         'event-production',
                         'bespoke-catering',
                         'stage-and-booth-build'
                       ]::text[]),
  primary_service    text        not null
                       check (primary_service in (
                         'strategic-marketing',
                         'event-production',
                         'bespoke-catering',
                         'stage-and-booth-build'
                       )),

  -- Step 2: Scale
  event_type         text        check (event_type in (
                         'corporate-awards','conference-symposium','brand-activation',
                         'product-launch','gala-dinner','private-event',
                         'campaign-only','other'
                       )),
  attendee_band      text        check (attendee_band in (
                         'under-50','50-150','150-500','500-1500','1500-plus','na'
                       )),
  event_date         date,
  date_flexible      boolean     not null default false,
  location           text,
  budget_band        text        check (budget_band in (
                         'under-1m','1m-5m','5m-15m','15m-plus','unsure'
                       )),
  production_needs   text[]      not null default '{}'
                       check (production_needs <@ array[
                         'stage-build','booth-build','av-lighting','led-video',
                         'live-stream','photo-video','branding','staffing'
                       ]::text[]),

  -- Step 3: Concept
  theme_preference   text        check (theme_preference in (
                         'azure-corporate','gold-summer','santorini','amazon',
                         'hollywood','texas','winter-wonderland','tropical-outdoor','custom'
                       )),
  catering_required  boolean     not null default false,
  catering_style     text        check (catering_style in (
                         'plated','family-style','cocktail-canapes','stations',
                         'chefs-table','buffet'
                       )),
  objectives         text,
  notes              text,

  -- Step 4: Details
  company            text        not null,
  contact_name       text        not null,
  role               text,
  email              text        not null,
  phone              text,
  hear_about         text        check (hear_about in (
                         'referral','past-event','search','social','other'
                       )),

  consent            boolean     not null,
  ip_hash            text,

  -- Cross-field guarantees (mirrors zod refinements)
  constraint quote_requests_date_or_flexible
    check (event_date is not null or date_flexible = true),
  constraint quote_requests_catering_style_when_required
    check (catering_required = false or catering_style is not null)
);

create index quote_requests_created_at_idx  on public.quote_requests (created_at desc);
create index quote_requests_status_idx      on public.quote_requests (status);
create index quote_requests_reference_idx   on public.quote_requests (reference);
create index quote_requests_ip_hash_idx     on public.quote_requests (ip_hash, created_at);

-- ---------------------------------------------------------------------------
-- Rate limit helper — 5 submissions per rolling hour per ip_hash.
-- SECURITY DEFINER so anon can call it without SELECT rights on the table.
-- ---------------------------------------------------------------------------
create or replace function public.quote_rate_limit_ok(p_ip_hash text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select (
    select count(*) from public.quote_requests
    where ip_hash = p_ip_hash
      and created_at > now() - interval '1 hour'
  ) < 5;
$$;

revoke all on function public.quote_rate_limit_ok(text) from public;
revoke execute on function public.quote_rate_limit_ok(text) from anon, authenticated;
grant execute on function public.quote_rate_limit_ok(text) to service_role;

-- ---------------------------------------------------------------------------
-- RLS — anon can insert only, and only when consent = true. Reads happen
-- via service-role from the Server Action.
-- ---------------------------------------------------------------------------
alter table public.quote_requests enable row level security;

create policy "anon can insert with consent"
  on public.quote_requests
  for insert
  to anon
  with check (consent = true);

-- Deliberately: no select/update/delete policy for anon.
