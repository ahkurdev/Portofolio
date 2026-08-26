# AGENTS.md

## 📁 Struktur Proyek
### Root Project
- `.agents/`: Menyimpan skill AI dan konfigurasi
  - `.agents/skills/`: 13 skill khusus (lihat daftar di bawah)
- `src/`: Struktur Next.js
  - `app/`: Halaman utama (`page.tsx`, `layout.tsx`, `globals.css`)
  - `components/`: Komponen terstruktur (hero, hero-scene [Three.js], client-shell, loading-screen, navbar, marquee, stats-bar, projects, experience, skills, github-analytics, contact, footer, scroll-progress)
  - `lib/`: Utilities & hooks (`github.ts` [data layer hybrid], `constants.ts` [data kurasi])
- `public/`: Asset statis (`allan.png`, `favicon.svg`)

## 📋 Identitas Project
- **Nama**: Ahmad Kurniawan - Developer Portfolio
- **Pemilik**: Ahmad Kurniawan
- **Tujuan**: Showcase portfolio premium untuk recruiter & klien
- **Lokasi**: Lampung, Indonesia — Mahasiswa IIB Darmajaya

## 🛠️ Tech Stack
- **Framework**: Next.js 16.2.9
- **UI Library**: 
  - Tailwind CSS v4
  - GSAP v3.15.0 (ScrollTrigger, timeline, marquee)
  - three.js v0.185.0 (hero orb: shader simplex noise + partikel; pakai `THREE.Timer`, bukan `THREE.Clock`)
- **Font**: 
  - Plus Jakarta Sans (display + body) — variable `--font-jakarta`
  - JetBrains Mono (label & metadata teknis) — variable `--font-mono`
- **Library Tambahan**:
  - Lenis (smooth scroll)
  - motion (magnetic buttons via `useMotionValue`)
  - @phosphor-icons/react (satu keluarga ikon untuk seluruh situs)
- **Data**: Hybrid — proyek kurasi manual (`CURATED_PROJECTS`) + statistik live GitHub API `ahkurdev`; fallback statis tetap akurat, tanpa data palsu

## 🎨 Warna & Tema
- **Konsep**: "Violet Orbit" — dark violet glass + tipografi rasaksa (detail lengkap di `DESIGN.md`)
- **Mode**: Dark mode
- **Primary**: `#8b76ff` (violet terkalibrasi, satu-satunya aksen saturated)
- **Primary Light**: `#ab9bff` (hover, outline text stroke, label mono)
- **Primary Deep**: `#6350e6`
- **Background**: `#08070e` (void violet-black), Elevated `#0f0d1a`
- **Glass**: `rgba(255,255,255,0.05)` + border `rgba(255,255,255,0.09)` + `blur(18px)` + inner highlight
- **Text**: `#f2f0fa`, `#a6a1b8` (secondary), `#716b85` (metadata saja)

## 🛠️ Konvensi Kode
1. **Penamaan Komponen**: PascalCase (`Hero`, `HeroScene`, `GitHubAnalytics`)
2. **Font Variables**: `--font-jakarta`, `--font-mono`
3. **Kelas Tailwind**: lower-case (`font-mono`, `text-text-secondary`); utilitas `.glass` dan `.text-outline` di `globals.css`
4. **Motion**: GSAP ScrollTrigger / IntersectionObserver / motion springs — **dilarang** `window.addEventListener("scroll")`; semua animasi hormati `prefers-reduced-motion`
5. **Responsif**: Gunakan `clamp()` untuk typography, `min-h-[100dvh]` untuk full-height sections
6. **Hero stack**: maksimal 4 elemen teks (eyebrow, headline ≤2 baris, subteks ≤20 kata, 1 CTA utama); eyebrow budget seluruh halaman = 2
7. **SEO**: konten dirender SSR penuh (`ClientShell` hanya overlay loader, bukan gate); metadata di `layout.tsx`

## 🎨 Skill Desain Tersedia (13 Skills)
### Premium Branding
- `brandkit`: Brand guideline visual (logo system, identity deck)
- `high-end-visual-design`: Standar premium UI (font, shadow, card structures)
- `stitch-design-taste`: Sistem desain semantis

### UI Taste Detection
- `design-taste-frontend`: Anti-template frontend (v2)
- `design-taste-frontend-v1`: Anti-template frontend (v1 - backward compatibility)
- `industrial-brutalist-ui`: UI mekanik (Swiss typography + military terminal)
- `minimalist-ui`: Desain clean editorial (monokrom, bento grid)
- `gpt-taste`: GSAP motion & tipografi editorial lebar

### Konversi & Peningkatan
- `imagegen-frontend-web`: Desain landing page (1 gambar per section)
- `imagegen-frontend-mobile`: Desain mobile app premium
- `redesign-existing-projects`: Upgrade kualitas existing code
- `image-to-code`: Konversi gambar jadi kode
- `full-output-enforcement`: Output lengkap tanpa placeholder

## 🧠 Rekomendasi Penggunaan Skill
1. **Projek Baru Premium**:
   - Kombinasi `high-end-visual-design` + `stitch-design-taste`
2. **Upgrades Existing**:
   - `redesign-existing-projects` + `stitch-design-taste`
3. **Brand Identity**:
   - `brandkit` + `imagegen-frontend-web`

## 📌 Perintah Development
```bash
npm run dev    # Development server
npm run build  # Build production
npm run start  # Start production server
npm run lint   # ESLint check
```

## ✅ Status Redesign (Agustus 2026)
- **Status**: *post-redesign* — konsep "Violet Orbit" terpasang penuh (detail sistem di `DESIGN.md`).
- Yang sudah selesai:
  - Font Plus Jakarta Sans + JetBrains Mono; tipografi rasaksa di hero (`AHMAD` solid / `KURNIAWAN` outline stroke).
  - Palet violet `#8b76ff` dengan disiplin satu aksen (user meminta mood saweria.com + glass effect).
  - Three.js hero orb interaktif (`hero-scene.tsx`) — shader noise, partikel orbit, mouse parallax, scroll-driven via ScrollTrigger, `THREE.Timer`.
  - Data layer hybrid: `CURATED_PROJECTS` (Hikalist, web-hikalist, DOT-LAYER — deskripsi dari README asli) + statistik live `ahkurdev`, tanpa data mock palsu.
  - Motion graphics: loading screen orb, staggered hero reveal, magnetic buttons, marquee, count-up stats, timeline scrub, scroll-reveal.
  - SEO: metadata lengkap di `layout.tsx`, konten dirender SSR penuh, favicon orb.
- Ide lanjutan (belum dikerjakan): halaman proyek detail per repo, OG image dinamis, blog/catatan build.

## 📌 Catatan
- AGENTS.md ini merangkum seluruh skill dan konvensi proyek
- Untuk detail sistem desain aktif, baca `DESIGN.md`
- Untuk detail skill, baca file SKILL.md di masing-masing folder `.agents/skills/`