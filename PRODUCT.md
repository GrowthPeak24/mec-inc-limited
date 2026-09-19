# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: brand and marketing managers at large Jamaican companies (financial institutions, FMCG, utilities, public bodies) who own an event or campaign budget and are deciding which agency to brief. They arrive comparing agencies, need to judge credibility quickly, and their next step is a proposal request through the Quote Builder or a call.

Not confirmed as primary: event coordinators or executive assistants organising on someone else's behalf. They likely use the site too, but the user did not pick them as a co-primary audience.

## Product Purpose

Marketing site and lead-capture surface for Marketing, Events and Catering (MEC) Inc. Limited, a Kingston, Jamaica B2B agency. It replaces a 30MB PDF deck. Success is a qualified enterprise brief: a visitor understands what MEC does, believes it can deliver at their scale, and submits a proposal request or contacts the team.

## Positioning

One owner-operated team across marketing, events and catering. A single senior producer and one scope of work, with production and catering in-house, so nothing is handed between vendors. Confirmed by the user as the claim a neighbouring agency could not truthfully copy.

## Operating Context

- Based in Kingston 6, Jamaica; serves enterprise clients across Jamaica and the wider Caribbean.
- The critical conversion path is the Quote Builder (`/quote`), a four-step brief that feeds a Supabase table and a notification email. A shorter contact form and a feedback form are separate write surfaces.
- Budget bands in the Quote Builder are shown in JMD with approximate USD equivalents.
- Content is hardcoded, typed TypeScript in `src/content/`; there is no CMS.
- Deployed on Vercel; production deploys from `main` only.

## Capabilities and Constraints

- Three pillars: Strategic Marketing, Event Production, Bespoke Catering. The Quote Builder adds a fourth selectable service, Stage & Booth Build.
- Forms are a fixed critical path and are out of scope for visual work unless the user says otherwise: ContactForm, FeedbackForm, QuoteBuilder and its steps.
- Ten case studies, filterable by discipline through URL query parameters so filtering works without JavaScript.
- Client photography and logos come from the client's own folders and the source deck. AI upscaling must never alter faces or lettering; rejected upscales are dropped rather than shipped low-resolution.
- Client logos must not be recoloured; NCB and Scotiabank have strict brand guidelines.
- Only one third-party runtime origin is allowed (the OpenStreetMap embed on `/contact`).
- Open decisions and unverified facts, all pending client confirmation: the founding year (2014), the geo coordinates used for the map and local SEO, the JMD budget bands, the production domain, and logo usage rights.

## Brand Commitments

- Names: "MEC Inc. Limited" for display; "Marketing, Events and Catering (MEC) Inc. Limited" as the legal name.
- Tagline in use: "Impacting Brands through Innovative Solutions".
- Copy in the codebase is plain and specific: "one accountable producer", "scoping in the open", "measured against the brief". This voice is inferred from existing copy, not stated by the user.

## Evidence on Hand

- Ten case studies with client names, dates, challenge, approach and result text in `src/content/case-studies.ts`. Metrics are mostly qualitative (for example "500+ honourees"); there are no measured business outcomes.
- About 25 client logos in `src/assets/logos/`.
- Client-supplied event photography under `src/assets/media/`, mapped by hand to the correct clients. Some case-study galleries (Wisynco, Bigga, GRL) are intentionally empty.
- Not on hand, and must not be invented: client testimonials, named references, quantified campaign results, awards, press coverage, pricing.
- None of the headline claims ("10+ years", "25+ blue-chip clients", "owner-operated") has been confirmed as fact. The user marked them all as pending client verification, so treat them as provisional wherever they appear.

## Product Principles

1. **Say what is true.** Every proof point is either verifiable or clearly provisional. Do not add stats, testimonials or client names that are not in the evidence.
2. **One accountable producer.** Whatever the page, the offer reads as a single team and a single scope, not three departments.
3. **Make the brief easy to start.** The path to a proposal request stays short, and the Quote Builder is never made harder to reach or finish.
4. **Show the work.** Real photography from real projects carries credibility; do not stand in generic imagery for it.
5. **Work without JavaScript where it matters.** Filtering, the FAQ and the content itself must still function with scripting off.

## Accessibility & Inclusion

No formal standard was specified. The site already commits to visible keyboard focus, `prefers-reduced-motion` support (with one documented exception for the client logo marquee), a skip link, native form controls, and text contrast of at least 4.5:1. Treat WCAG 2.2 AA as the working bar.
