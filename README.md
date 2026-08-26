# Ahmad Kurniawan — Portfolio

Personal portfolio of **Ahmad Kurniawan** (`@ahkurdev`), a full-stack developer from Lampung, Indonesia. Built to introduce the person behind the work, then back it up with verifiable proof: curated projects, live GitHub activity, and direct contact paths.

## Design Concept — "Violet Orbit"

A dark, violet-tinted field with one calibrated accent, frosted glass surfaces, and massive editorial typography anchored by an interactive Three.js orb. Full design system documentation lives in [`DESIGN.md`](./DESIGN.md).

- **Typography**: Plus Jakarta Sans (display + body), JetBrains Mono (technical labels)
- **Palette**: void black `#08070e` + Orbit Violet `#8b76ff` as the single saturated accent
- **Surfaces**: disciplined glassmorphism (gradient tint, 1px border, inner highlight, solid fallback)

## Features

- **Interactive hero orb** — custom GLSL shader (simplex noise displacement, faceted fresnel shading) with an orbiting particle ring, mouse parallax, and scroll-driven drift
- **Motion graphics** — loading screen choreography, staggered type reveal, magnetic buttons, marquee, count-up stats, scroll-scrubbed timeline, section reveals
- **Honest hybrid data** — curated project copy written from real repository READMEs + live stats from the GitHub API; no mock numbers anywhere
- **SSR-first SEO** — full metadata in the root layout, all content server-rendered (the loader is an overlay, not a gate)
- **Accessibility** — honors `prefers-reduced-motion` and `prefers-reduced-transparency`, keyboard-friendly navigation, WCAG AA contrast targets

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| 3D | three.js (`THREE.Timer`, custom ShaderMaterial) |
| Motion | GSAP ScrollTrigger, Lenis smooth scroll, motion springs |
| Icons | @phosphor-icons/react |

## Getting Started

```bash
npm install
npm run dev      # development server on http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint check
```

## Project Structure

```
src/
├── app/            # layout (fonts, metadata), page composition, global styles
├── components/     # hero, hero-scene (Three.js), sections, chrome
└── lib/            # github.ts data layer · constants.ts curated content
```

## Featured Work

Real repositories, described from their own documentation:

- [Hikalist](https://github.com/ahkurdev/Hikalist) — Windows desktop music player built with Kotlin & Compose Desktop: streaming search, synced lyrics, collaborative playlists, offline mode, Spotify import, Discord Rich Presence
- [web-hikalist](https://github.com/ahkurdev/web-hikalist) — companion TypeScript web client for the Hikalist ecosystem ([live demo](https://web-hikalist-allans-projects-f2f44acb.vercel.app))
- [DOT-LAYER](https://github.com/ahkurdev/DOT-LAYER) — lightweight always-on-top crosshair overlay for Windows with global hotkeys, click-through input, and anti-capture rendering

## Contact

- Email: ah.kurniawan27@gmail.com
- GitHub: [@ahkurdev](https://github.com/ahkurdev)
- LinkedIn: [Ahmad Kurniawan](https://www.linkedin.com/in/ahmad-kurniawan-0a6b42347)

---

© Ahmad Kurniawan. All rights reserved.
