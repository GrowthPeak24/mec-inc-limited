# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Marketing, Events and Catering (MEC) Inc. Limited** — a Jamaican B2B agency. Greenfield Next.js build replacing a 30MB PDF deck. Full build plan lives at `.claude/plans/scalable-cooking-wigderson.md` — read it before starting large changes; the *"Decisions locked in"* table, performance budget, and Roadmap are load-bearing.

## Commands

```bash
npm run dev            # Turbopack dev server
npm run build          # Production build (uses Turbopack)
npm run typecheck      # tsc --noEmit — strict, noUncheckedIndexedAccess
npm run lint           # eslint

# Media pipeline (Phase 0 — run only when the source PDF changes)
npm run media:extract  # extract embedded images → scripts/.raw/
npm run media:optimize # sharp → src/assets/media/**.avif + logos/**.png
```

There is no test runner set up. Verify changes with `npm run typecheck && npm run build` — the plan's *Verification* section documents the manual QA passes (RLS smoke test, JS-disabled portfolio filtering, quote-form end-to-end, screen-reader pass).

## Architecture

### Locked constraints — do not breach without explicit approval

- **No Framer Motion / no UI kit / no icon library.** Motion is CSS-first (`@keyframes`, `IntersectionObserver` in `Reveal`, `prefers-reduced-motion` short-circuit). All icons are inline SVG. **Exception:** the logo `.marquee-track` is deliberately exempt from the reduced-motion short-circuit (product decision — horizontal decorative scroll, low vestibular risk, hover-pause is the accommodation). Do not re-add a `@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }` block.
- **Only four client components ship sitewide:** `MobileNav`, `Reveal`, `QuoteBuilder` (+ its 4 steps), `ContactForm`. Everything else must remain a Server Component. Adding a 5th `'use client'` is a design decision, not a routine change.
- **Hero (`HeroBento`) is never wrapped in `Reveal`** — it must paint before hydration for LCP.
- **No `tailwind.config.ts`.** Tailwind v4 config is `@theme { ... }` in `src/app/globals.css`. That file *is* the design system.
- **Brand accent token names are legacy.** `--color-gold` now holds sapphire `#0F52BA`, `--color-gold-2` holds blue `#0000FF`. The names predate the rebrand; the values are the brand. Because sapphire is dark, any surface using either gold token as its background must pair it with `text-[var(--color-paper)]` (not `--color-ink`) for WCAG contrast. Do NOT write Tailwind-shaped placeholders like `bg-[var(--color-gold-star)]` in this file — Tailwind v4 auto-scans markdown as source and will emit invalid CSS.
- Photography is imported as `StaticImageData` (never string paths) so `next/image` gets intrinsic dimensions and auto-`blurDataURL`. Turbopack prints "AVIF image not supported" warnings on these imports — expected, files are pre-optimized by the sharp pipeline.
- **Media filenames in `src/assets/media/case-studies/**` DO NOT reliably match their contents.** Phase 0's PDF extractor labeled by slide position, not subject — e.g. `wisynco-eco-club/03-school.avif` actually contains a McIntosh Bedding showroom, `mcintosh-bedding-showroom/01-hero.avif` is a Terra Nova tent. `src/assets/media/hero/**` IS trusted (manually curated). Before assigning any case-study image to a hero/OG slot, decode it (sharp → JPEG preview) and eyeball it — do not trust the path. A full re-extract or rename pass is outstanding.

### Data flow

Content is hardcoded, strongly-typed TS in `src/content/*.ts` using `as const satisfies readonly T[]`. This makes tags, slugs, and enums compile-time-checked across the app. The contract lives in `src/types/content.ts` — change types there, not in the content files.

Routes:
- Static (`○`): `/`, `/about`, `/services`, `/contact`, `/privacy`, `/quote`
- SSG with `generateStaticParams` + `dynamicParams=false` (`●`): `/services/[category]` (3 categories), `/portfolio/[slug]` (10 case studies)
- Dynamic (`ƒ`): `/portfolio` (reads `?tag=`), `/quote/thank-you` (reads `?ref=`)

Portfolio filtering is **URL-driven `<Link href="?tag=...">`**, not click handlers — so filters work with JS disabled, are shareable, and the filter component ships zero client JS. Canonical is always `/portfolio`; filtered variants set `robots.index=false`.

### Quote Builder — the critical path

One zod schema (`src/lib/schema/quote.ts`) is shared by the wizard and the Server Action (`src/actions/quote.ts`). Per-step gating uses `trigger(STEP_FIELDS[n])` — the `STEP_FIELDS` map is part of the schema module.

`QuoteBuilder.tsx` uses split RHF generics: `useForm<QuoteFormInput, unknown, QuoteInput>` where `QuoteFormInput = z.input<typeof quoteSchema>`. This is required because zod `.default()` produces different input vs output types — collapsing them back to a single generic breaks `defaultValues` typing.

Server Action pipeline: zod parse → honeypot (`website` field non-empty → fake success, no insert) → dwell-time check (<4s → fake success) → salted IP hash → rate-limit RPC (fail-open) → Supabase insert → best-effort Resend email (`reply_to` set to lead's email). Reference format: `MEC-YYYY-XXXXXXXX` (8 base32 chars, no `0/O/1/I/L`).

**Honeypot schema gotcha:** the `website` field must stay `z.string().optional()` — NEVER add `.max(0)`. A `.max(0)` rule makes zod reject bot submissions outright and returns a `fieldErrors.website` message, revealing the trap. The security guarantee comes from the Server Action's silent-drop branch, not from schema rejection.

**Empty-string enum gotcha (two-layer trap):** `<select><option value="">Select…</option></select>` emits `""` on default, but `z.enum(...).optional()` accepts `undefined` only — `""` fails validation. AND Postgres CHECK constraints reject `""` even after zod. Both layers must coerce:
- Client: register with `setValueAs: (v) => (v === '' ? undefined : v)` — see the `emptyToUndef` helper in `Step2Scale.tsx` / `Step4Details.tsx`.
- Server Action: use `data.field || null` (NOT `?? null`) for every enum-backed column when writing to Supabase. `??` passes `""` through and Postgres rejects the insert with a generic "Something went wrong saving your brief" toast.
**Radio-group enum gotcha (`.nullish()` not `.optional()`):** `SelectableCard variant="radio"` fields (`themePreference`, `cateringStyle`) register onto a radio GROUP. React Hook Form yields `null` — NOT `undefined` — for a group with nothing checked, and `z.enum(...).optional()` rejects `null`. This silently fails `trigger()` (blocking the Step 3→4 advance with no visible error) and fails final submit. These fields MUST be `z.enum(...).nullish()`. Consumers of the value (e.g. `ReviewSummary`) then need `?? undefined` before passing to `string | undefined` helpers. Do NOT "simplify" these back to `.optional()`.

`ContactForm` posts through the **same** Server Action with `source='contact'` — the schema tolerates the reduced contact-form payload by defaulting `services=['strategic-marketing']` and `dateFlexible=true`.

### Supabase

Project: `mec-inc-website` (us-east-1, region chosen for Caribbean latency). Table + policies in `supabase/migrations/20260807120000_quote_requests.sql`.

Security model:
- **`anon` role has INSERT only**, and only when `consent = true` — no select/update/delete policy exists.
- **Postgres `CHECK` constraints mirror every zod enum.** When adding/renaming an option in `src/content/quote-options.ts`, you MUST also update the matching CHECK in the migration. A tampered payload should fail twice (zod, then Postgres). Array columns (`services`, `production_needs`) use an element-allowlist CHECK via `<@ array[...]::text[]` — keep that in sync when the enum changes, not just the scalar CHECKs.
- Rate-limiting is a `SECURITY DEFINER` function `quote_rate_limit_ok(ip_hash)`, granted only to `service_role` (revoked from `anon`/`authenticated`).
- `SUPABASE_SERVICE_ROLE_KEY` is server-only, never `NEXT_PUBLIC_*`. It must be pasted manually from the Supabase dashboard — the MCP does not return it.

Two lazy singleton clients:
- `src/lib/supabase/admin.ts` — `supabaseAdmin()`, service-role, Server Actions only.
- `src/lib/supabase/anon.ts` — `supabaseAnon()`, publishable key.

Any lib file that reads a server-only env (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `IP_HASH_SALT`) starts with `import 'server-only';` — currently `src/lib/supabase/admin.ts`, `src/lib/email.ts`, `src/lib/reference.ts`. This turns an accidental client import into a build error.

Security headers (`Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`) are set in `next.config.ts` via an `async headers()` block, not middleware. CSP includes `'unsafe-inline'` on `script-src` and `style-src` — required for Next.js hydration inline scripts and Tailwind runtime styles. Removing `'unsafe-inline'` breaks hydration; nonce-based CSP would require middleware and adds request-time cost.

### SEO

`src/lib/seo/` holds JSON-LD builders. Organization + LocalBusiness live in the root layout (`src/app/layout.tsx`). `FAQPage` is generated from the **same** `faqs` array that renders the `<details>` UI — one source, no drift. Case studies emit `CreativeWork` + `BreadcrumbList`; category pages emit `Service` + `OfferCatalog`.

### Path alias

`@/*` → `./src/*` (no `baseUrl` in `tsconfig.json` — modern TS 5+ style).

## Local dev TLS (Windows / Avast)

`npm run dev` and `npm run start` launch Next via `node --use-system-ca ./node_modules/next/dist/bin/next ...` (not the bare `next` bin). Reason: this dev machine runs **Avast**, which MITM-intercepts HTTPS and presents its own root CA. Node's bundled CA store doesn't trust it, so Server Action `fetch` calls to Supabase fail with `UNABLE_TO_VERIFY_LEAF_SIGNATURE` → the user sees "Something went wrong saving your brief" even though the schema/insert are correct. `--use-system-ca` makes Node trust the Windows cert store (which holds Avast's root), fixing it independent of whether the launching shell inherited `NODE_EXTRA_CA_CERTS`. This is **dev-only** — Vercel prod has no MITM proxy. If you see `fetch failed` from a Server Action locally, this is the cause; do NOT disable TLS verification (`NODE_TLS_REJECT_UNAUTHORIZED=0`).

## Environment variables

See `.env.example`. `NEXT_PUBLIC_SITE_URL` drives `metadataBase`, canonicals, sitemap, and OG — set it before Phase 8 or all of it regenerates. `IP_HASH_SALT` must be ≥32 chars and stable across deploys, or historical rate-limit hashes become useless.

## Known risks (from plan §Risks)

1. Client photography quality (Phase 0 gate) — do not ship on ≤900px upscales.
2. Domain not yet decided.
3. Kingston 6 geo coordinates and "2014" founding date are approximations pending client confirmation — wrong geo hurts local pack ranking.
4. Client logo rights (NCB, Scotiabank strict guidelines).
5. JMD budget bands in `src/content/quote-options.ts` are guesses — validate before launch.
