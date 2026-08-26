---
name: Ahmad Kurniawan Portfolio
description: Dark violet glass portfolio with massive editorial typography, an interactive Three.js orb, and honest live data.
colors:
  primary: "#8b76ff"
  primary-light: "#ab9bff"
  primary-deep: "#6350e6"
  background: "#08070e"
  background-elevated: "#0f0d1a"
  text: "#f2f0fa"
  text-secondary: "#a6a1b8"
  muted-foreground: "#716b85"
  glass-bg: "rgba(255,255,255,0.05)"
  glass-border: "rgba(255,255,255,0.09)"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 10vw, 8rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    maxWidth: "65ch"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "24px"
  pill: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 28px"
    shadow: "0 8px 32px rgba(139,118,255,0.3)"
  button-primary-hover:
    backgroundColor: "{colors.primary-light}"
  button-secondary:
    background: "glass recipe"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
  glass-card:
    background: "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))"
    border: "1px solid rgba(255,255,255,0.09)"
    backdropFilter: "blur(18px) saturate(140%)"
    innerShadow: "inset 0 1px 0 rgba(255,255,255,0.08)"
    shadow: "0 12px 40px rgba(3,2,10,0.45)"
    rounded: "24px"
---

# Design System: Ahmad Kurniawan Portfolio

## 1. Overview

**Creative North Star: "Violet Orbit"**

The site feels like a signal in a dark room: a near-black violet-tinted field, one calibrated violet accent, frosted glass surfaces, and typography large enough to feel architectural. An animated Three.js orb anchors the hero as proof of technical craft. Everything else stays quiet so the person and the work read first.

**Key Characteristics:**
- Void black base (`#08070e`) with a single violet focus color used with scarcity.
- Plus Jakarta Sans carries identity at massive scale; JetBrains Mono carries technical metadata.
- Glass is the card language — always with an inner highlight edge and a solid fallback.
- Motion is choreographed (GSAP + Three.js), never decorative noise; reduced-motion collapses everything to static.
- Data is honest: live GitHub API for `ahkurdev`, curated project copy written from real repository facts.

## 2. Colors

### Primary
- **Orbit Violet `#8b76ff`**: The only saturated accent. CTAs, active states, timeline nodes, language bars fallback, the 3D orb.
- **Violet Light `#ab9bff`**: Hover lift, outlined display text stroke, small mono labels.
- **Violet Deep `#6350e6`**: Gradient partner inside progress lines and the orb shading.

### Neutral
- **Void Black `#08070e`**: Page background. Never pure `#000`.
- **Elevated Violet-Black `#0f0d1a`**: Solid fallback surface when transparency is reduced.
- **Ink scale**: `#f2f0fa` headings, `#a6a1b8` body, `#716b85` metadata only.

### Named Rules

**The One Violet Rule.** No second saturated hue. The only other colors allowed are real data colors (programming-language hexes) or devicon brand logos.

**The Readable Dark Rule.** Paragraphs use `text-secondary`; `muted-foreground` is reserved for metadata and labels.

## 3. Typography

**Display/Body:** Plus Jakarta Sans (400–800) · **Mono:** JetBrains Mono (400–600)

### Hierarchy
- **Display**: name-scale moments only ("AHMAD / KURNIAWAN", contact headline). Max ~2 words per line; second line may render as `.text-outline` stroke in violet light.
- **Headline**: section titles, max 8 words, `text-balance`.
- **Body**: max-w-[65ch], leading 1.65.
- **Label**: JetBrains Mono, uppercase, tracking 0.14em. Eyebrow budget: maximum 2 on the whole page (hero status + "Selected work").

### Named Rules

**Rasaksa Discipline.** Massive type is for identity moments, not every section. If everything is giant, nothing is.

**The No Gradient Text Rule.** Solid fills and stroke outlines only; no `background-clip: text`.

## 4. Elevation & Glass

**Glass With Intent.** Every glass surface uses the full recipe: gradient tint fill, 1px border, `blur(18px) saturate(140%)`, inner top highlight, soft dark drop shadow. Under `prefers-reduced-transparency`, glass resolves to solid `#12101c`.

**Flat-Until-Touched.** Cards rest flat; hover adds border lift toward violet, `-translate-y-0.5`, or arrow motion. Shadows are tinted dark-violet, never pure black.

## 5. Components

- **Buttons**: 12px radius. Primary = Orbit Violet with violet-tinted shadow; Secondary = glass recipe. Active scales to 0.98. One contact intent label sitewide.
- **Chips**: JetBrains Mono 11px pills on glass or hairline borders; license chips stay neutral.
- **Project rows**: editorial full-width rows — index number, giant title, description, tag chips, right-aligned meta. First row opens the list; hover tints row and slides the arrow.
- **Navigation**: floating pill, transparent at top, glass after scroll (IntersectionObserver sentinel, never scroll listeners).
- **Signature: Hero Orb** (`hero-scene.tsx`): simplex-noise displaced icosahedron with faceted fresnel shading, orbiting additive particles, wireframe shell. Mouse-parallax rotation, ScrollTrigger-driven drift/fade past the hero, paused offscreen, static frame under reduced-motion, delta clamped to 50ms.

## 6. Do's and Don'ts

### Do:
- Do keep violet scarce: CTA, focus, progress, one label per section at most.
- Do write project copy strictly from verifiable repository facts.
- Do gate any new animation behind `prefers-reduced-motion`.
- Do animate only `transform`/`opacity`; drive scroll work through GSAP ScrollTrigger or IntersectionObserver.

### Don't:
- Don't reintroduce fake stats, mock repositories, or invented star counts.
- Don't add neon glows beyond the orb and primary-button shadow.
- Don't use gradient text, side-stripe accents, or glass on nested layers.
- Don't add eyebrows above every section; the page-wide budget is two.
- Don't register raw `window` scroll listeners; use ScrollTrigger/Observer patterns.
