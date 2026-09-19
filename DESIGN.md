---
name: MEC Inc. Limited
description: Marketing, Events and Catering (MEC) Inc. Limited. A Kingston agency site that reads like a producer's run sheet.
colors:
  sapphire: "#0F52BA"
  signal-blue: "#0000FF"
  lifted-sapphire: "#5B93FF"
  midnight-ink: "#0A0E1A"
  raised-ink: "#131a2e"
  paper-white: "#FFFFFF"
  warm-sand: "#F5F1EA"
  deep-sand: "#EBE4D6"
  hairline-on-light: "rgba(10,14,26,0.10)"
  hairline-on-dark: "rgba(255,255,255,0.10)"
typography:
  display:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.333
    letterSpacing: "0.18em"
rounded:
  md: "12px"
  lg: "20px"
  xl: "28px"
  pill: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter-tablet: "32px"
  gutter-desktop: "48px"
  section-sm: "56px"
  section-md: "112px"
  card-gap: "32px"
components:
  button-primary:
    backgroundColor: "{colors.sapphire}"
    textColor: "{colors.paper-white}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.paper-white}"
  button-primary-lg:
    backgroundColor: "{colors.sapphire}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-outline:
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  filter-chip:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.midnight-ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  filter-chip-active:
    backgroundColor: "{colors.midnight-ink}"
    textColor: "{colors.paper-white}"
  case-study-card:
    backgroundColor: "{colors.raised-ink}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.xl}"
  form-field:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.midnight-ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

# Design System: MEC Inc. Limited

## Overview

**Creative North Star: "The Producer's Run Sheet"**

The site behaves like the document a good producer hands the client before an event: ordered, exact, and calm. Sections follow one another in a clear sequence. Hairline rules do the dividing work instead of boxes. One confident blue marks the action, and real photographs of real events are the proof. It should feel accountable rather than showy, which is the same promise the company makes in words: one owner-operated team, one scope of work, nothing dropped between vendors.

The palette is three surfaces and one accent. Midnight ink carries authority and holds the hero, the case-study covers and the footer. Warm sand is the reading surface and paper white is the clean inset. Sapphire is the only saturated colour, and it works as a fill. Because sapphire is dark, text on ink switches to a lifted tint of the same hue. Type is a geometric display face over a neutral text face, tightly tracked at large sizes and quiet everywhere else. Motion is small: a short lift, an arrow that nudges, a fade-up as a section enters.

**Key Characteristics:**
- Ink, sand and paper surfaces with a single blue accent.
- Hairline borders and rings for structure; shadow only in response to interaction.
- Pills for small controls, generous 20 to 28px radii for cards and photography.
- Photography carries the imagery; the interface never decorates in its place.
- Small-caps eyebrows and meta labels as the recurring typographic signature.

## Colors

A restrained palette: one saturated blue, a deep navy-black, and two warm neutrals. The blue is a fill colour on light surfaces and a tinted text colour on dark ones.

### Primary
- **Sapphire** (#0F52BA): the brand fill. Primary buttons, active tags, eyebrows and links on light surfaces, the default focus ring. Because it is dark, any surface filled with it takes paper-white text, never ink. (The code token is `--color-gold`, a legacy name.)
- **Signal Blue** (#0000FF): hover and gradient stop for sapphire fills only. It is 2.2:1 on ink, so it is never used as text on a dark surface. (Code token `--color-gold-2`.)
- **Lifted Sapphire** (#5B93FF): the on-dark accent for text, links, eyebrows and the focus ring on ink surfaces. 6.48:1 on midnight ink and 5.81:1 on raised ink. (Code token `--color-accent-on-dark`.)

### Neutral
- **Midnight Ink** (#0A0E1A): dark surfaces (hero, case-study cards, footer, QuoteCTA) and primary text on light.
- **Raised Ink** (#131a2e): a step above ink for cards and image wells on dark sections.
- **Paper White** (#FFFFFF): the header, cards on sand, inputs, and text on dark.
- **Warm Sand** (#F5F1EA): the default page and section background.
- **Deep Sand** (#EBE4D6): a track or recess colour, currently only the Quote Builder progress track.
- **Hairline on Light** (rgba(10,14,26,0.10)): every divider and card border on light surfaces.
- **Hairline on Dark** (rgba(255,255,255,0.10)): dividers and inset rings on ink surfaces.

### Named Rules
**The Lifted Blue Rule.** On an ink surface, accent text, links, eyebrows and focus rings use Lifted Sapphire. Sapphire and Signal Blue never appear as text on ink. Every dark section is marked `data-surface="ink"` so the focus ring follows.

**The One Accent Rule.** Blue is the only saturated colour. Photography supplies all other colour; the interface does not add a second accent.

**The Paper-on-Blue Rule.** A blue-filled control carries paper-white text. Ink on sapphire fails contrast.

## Typography

**Display Font:** Sora (500, 600, 700, 800), with the system sans stack as fallback
**Body Font:** Inter (400, 500, 600), with the system sans stack as fallback

**Character:** Sora's geometric shapes give headings a confident, slightly technical presence that suits a production company. Inter keeps the running text neutral and legible. Headings use the display face and -0.02em tracking; everything else uses Inter.

### Hierarchy
- **Display** (600, 2.25rem to 3.75rem, 1.1): page titles on case-study and service heroes and the home hero. Steps up at `md`.
- **Headline** (600, 1.875rem to 3rem, 1.1): section headings. 30px on phones, 36px at `md`, 48px at `lg`. Left-aligned by default.
- **Title** (600, 1.25rem, 1.25): card and item titles, timeline and approach headings.
- **Body** (400, 1rem to 1.125rem, 1.625): section intros and running copy, at 65 to 75 characters (`max-w-2xl`). Text on light uses ink at 70 to 80% opacity.
- **Body Small** (400 to 500, 0.875rem, 1.5): card summaries, buttons, chips, form fields.
- **Label** (600, 0.75rem, uppercase): two roles, both defined once in `globals.css`. The eyebrow utility (0.18em tracking) is the kicker above a heading. The meta-label utility (0.14em) labels stats, captions, dates and data.

### Named Rules
**The Two Labels Rule.** Small caps come in exactly two forms, `eyebrow` and `meta-label`. Do not hand-roll 11px or 0.2em variants. Labels stay at ink/70 or stronger on light and paper/65 or stronger on ink.


## Layout

A single centred container (max 80rem) with responsive gutters of 20, 32 and 48px. Sections are full-bleed bands in one of three tones (ink, sand, paper) with vertical padding of 64px on phones, 96px at `md` and 112px at `lg`; compact bands drop to 40 to 56px. Adjacent light bands alternate sand and paper so the sequence reads without dividers.

Structure comes from grids, not boxes. Interior page heroes use a 12-column split, text over seven and a photo stack over five from `lg`. Case-study and portfolio grids are uniform, with equal-size cards and no feature tile; the home grid is 2-up and the portfolio is 3-up. Sequences such as the timeline, approach and process steps hang from a hairline rule with the content beneath, in columns. The home hero is a bento of one tall and two short photo tiles at a fixed 560px height from `md`, reflowing on phones to a full-width lead tile over two squares. The desktop nav appears at `lg`; below that a full-screen menu takes over.

Section headings sit in a `max-w-3xl` block, left-aligned by default and centred only on the home page. Body copy is held to a readable measure. Touch targets are 44px for the menu toggle and at least 32px for footer links.

## Elevation & Depth

Flat at rest, lifting on interaction. Surfaces separate with hairline borders or 1px inset rings (`ring-1 ring-inset` at 10% white on ink, 10% ink on light). Shadow is a response: interactive cards rise 4px on hover and gain a soft sapphire-tinted shadow, and the primary button gains a slightly stronger glow. Non-interactive elements (the theme gallery, the photo stack) do not lift or zoom.

One frosted-glass element exists: the `FrostTag` over photography, where a blurred, darkened backing keeps a label legible on any image. The header itself is solid paper, not blurred.

### Shadow Vocabulary
- **Primary button** (`box-shadow: 0 8px 20px -12px rgba(15,82,186,0.55)`, hover `0 10px 24px -12px rgba(15,82,186,0.6)`): a low glow under the blue fill.
- **Card hover** (`box-shadow: 0 30px 60px -30px rgba(15,82,186,0.5)`): case-study cards on hover, with a 4px lift and a 40% sapphire ring.
- **Pillar card** (`box-shadow: 0 1px 0 rgba(10,14,26,0.06), 0 20px 50px -30px rgba(10,14,26,0.35)`): the one card with a faint resting shadow; hover deepens it. This is the exception, not the pattern.
- **Matte frame** (`box-shadow: 0 30px 60px -40px rgba(10,14,26,0.45)`): the catering teaser photograph inside its hairline mat.
- **Frosted tag** (`backdrop-filter: blur(10px) saturate(140%)` over `rgba(10,14,26,0.55)`, with a 12% white border): labels on photography only.

### Named Rules
**The Response-Only Shadow Rule.** A shadow, lift or zoom is a reply to hover or focus on something that is actually a link or button. If it links nowhere, it does not move.

## Shapes

A two-register form language. Small controls are full pills: buttons, chips, tags and nav links. Containers are generously rounded: 28px for cards and panels, 20px for photographs and gallery tiles, 12px for inputs and small plates. Borders are always 1px hairlines. Photographs sometimes sit in a matte, a hairline frame with 8px of padding and an inner radius of the outer minus 0.35rem, so the image reads as placed rather than bled. A dotted texture (10px pitch, 8 to 14% opacity, masked to fade) marks a few dark and light bands as a quiet field of ornament.

## Components

Buttons, cards and chips are confident and restrained: full pills, quiet hairlines, one blue fill for the primary action, nothing decorative.

### Buttons
- **Shape:** full pill (9999px), with a trailing arrow that nudges 3px on hover.
- **Primary:** Sapphire fill, paper-white text, `10px 20px` at medium and `14px 24px` at large, 14px and 16px text, weight 500. Hover moves to Signal Blue with a slightly stronger glow.
- **Outline and Ghost:** inherit their colour from the section (paper on ink, ink on sand and paper). Outline adds a 1px current-colour border at 30% and turns sapphire on hover; ghost hovers to Signal Blue on light and Lifted Sapphire on ink.
- **Focus:** a 2px ring in sapphire on light, Lifted Sapphire on ink, offset 2px from the surface.
- **Transitions:** colour, border and shadow over 200ms.

### Chips and Tags
- **Filter chip:** pill, 1px hairline border, paper-white fill, ink text at 14px. The active chip inverts to a solid ink fill with paper text. They are real links, so filtering works without JavaScript.
- **Tag:** small pill at 12px; the active state is a Sapphire fill with paper text.
- **Frost tag:** the frosted pill over photography, paper text.

### Cards / Containers
- **Case-study card:** raised-ink surface, 28px corners, 4:3 image with a gradient into the body, frosted discipline tags top-left, a meta-label row (client and year), a two-line title, a three-line summary and a "Read case study" link in Lifted Sapphire with an arrow. Hover lifts 4px and zooms the image to 105% over 900ms.
- **Pillar card:** paper surface on sand, 28px corners, a 4:3 photo, a small icon plate, an eyebrow, a title, blurb and a hairline-topped "Explore capabilities" link.
- **Sequences** (timeline, approach, process): no card. A hairline rule at 25% ink on top, a title and body beneath.
- **Matte frame:** hairline mat around a single photograph.

### Inputs / Fields
- **Style:** 12px corners, 1px hairline border, paper-white fill, `10px 14px` padding, 14px ink text, ink placeholder at 40%.
- **Focus:** the border shifts to solid ink and the outline is suppressed in favour of that border. Form pages keep the base sapphire ring elsewhere.

### Navigation
- **Header:** solid paper, sticky, hairline bottom border, 64px tall on phones and 80px at `md`. Nav links are pills with ink at 75% that hover to a sand fill.
- **Active page:** the current link turns full ink and gains a 2px sapphire underline, with `aria-current="page"`. The mobile menu marks it in Lifted Sapphire.
- **Mobile:** a 44px circular toggle opens a full-screen ink dialog below the header, with large 24px links, focus trapping and Escape to close.

### Hero bento
The home hero is a bento of three photo tiles with an eyebrow, a headline emphasised in Lifted Sapphire, and frosted badges. Tile captions reveal a "View" hint on hover, on keyboard focus and on touch.

## Do's and Don'ts

### Do:
- **Do** put text and links on ink in Lifted Sapphire (#5B93FF) and mark every dark surface `data-surface="ink"`.
- **Do** pair any sapphire or blue fill with paper-white text.
- **Do** separate with hairlines and inset rings at 10% opacity, and let shadow appear only on hover or focus of real controls.
- **Do** use `eyebrow` for the kicker over a heading and `meta-label` for stats, captions and dates.
- **Do** keep card grids uniform: equal size, equal gaps, no feature tile.
- **Do** let ghost and outline buttons inherit their colour from the section.
- **Do** keep client logos in their brand colours, sized to a similar painted area.
- **Do** use real event photography as the imagery, with descriptive alt text.

### Don't:
- **Don't** use Sapphire (#0F52BA) or Signal Blue (#0000FF) as text on an ink surface; they measure 2.7:1 and 2.2:1.
- **Don't** add a second accent colour; the blue is the only saturated colour.
- **Don't** make non-links lift, ring or zoom on hover.
- **Don't** hard-code a colour into `ghost` or `outline` buttons.
- **Don't** blur the header or use glass anywhere except the frosted tag over photography.
- **Don't** recolour client logos or apply a grayscale filter (NCB and Scotiabank guidelines).
- **Don't** put gradient text, hard offset shadows, or colour side-borders on cards.
- **Don't** hand-roll 11px or 0.2em small-caps; use the two label utilities.
- **Don't** restyle the Quote Builder, contact form or feedback form as part of general visual work.
