# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — TypeScript check + Vite production build (`tsc -b && vite build`)
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build

## Architecture

This is a **React 19 portfolio website** built with Vite 7 and TypeScript. See `portfolio.spec.md` for the full project specification.

**Routing**: Uses [Wouter](https://github.com/molefrog/wouter) (lightweight router). Routes defined in `src/main.tsx`:
- `/` → `HomePage` (`src/app/page.tsx`)
- `/projects` → `ProjectsPage` (`src/app/projects/page.tsx`)

Navigation uses Wouter's `<Link>` for routes and `<a>` with hash anchors for in-page scrolling (e.g., `/#contact`).

**Layout**: `src/app/layout.tsx` wraps all pages with `<Navbar />`, `<main>`, and `<Footer />`. Semantic HTML structure is enforced.

**Styling**: CSS Modules (`.module.css` per component). Global styles only in `src/styles/globals.css` (CSS reset + design token variables). No global class names in components. Design tokens use CSS custom properties (`--color-*`, `--font-*`, `--space-*`, `--text-*`). Use `clamp()` for fluid typography. Mobile-first responsive design.

**Project layout**:
```
src/
├── app/            # Pages (layout.tsx, page.tsx, projects/page.tsx)
├── components/     # Reusable components (Navbar/, Footer/, Hero/, etc.)
├── data/           # Project data (projects.ts)
├── hooks/          # Custom hooks (useGsap.ts, useLenis.ts)
├── styles/         # Global CSS (globals.css)
└── lib/            # Utilities (seo.ts)
```

**Animations**: GSAP 3 + ScrollTrigger + Lenis smooth scroll. Always use `gsap.context()` for cleanup in React, `useRef` for DOM refs, and respect `prefers-reduced-motion`.

### Animation System (Basilico-style)

- **Preloader**: Zoom-in page opener (`src/components/Preloader/Preloader.tsx`). Text scales from 2.5→1, holds, then clip-path circle reveals the page. Uses `sessionStorage` to play once per session. Dispatches `preloader-complete` CustomEvent.
- **Smooth Scroll**: Lenis (`src/hooks/useLenis.ts`) synced to GSAP ticker for ScrollTrigger compatibility. Handles hash anchor navigation.
- **Navbar**: Slides down after preloader via `preloader-complete` event. Hides on scroll down, shows on scroll up via ScrollTrigger direction detection.
- **Heading Reveals**: All section headings use `clipPath: inset(100% 0 0 0)` → `inset(0%)` with y:60→0 (1.0s, power4.out). Each heading wrapped in `.headingWrap` with `overflow: hidden`.
- **Content Reveals**: Paragraphs/links use `clipPath: inset(30% 0 0 0)` + opacity + y:40 (0.9s, power3.out, staggered).
- **Hero**: Character-by-character reveal with rotateX:40 + y:80, subtitle clip-path, buttons fade-up. Delays coordinated with preloader via `sessionStorage` check.
- **Card Reveals**: scale:0.92 + rotateX:8 + y:80 staggered reveal (0.8s, power3.out). Thumbnail parallax on scroll (y:-30, scrub).
- **Magnetic Buttons**: `src/components/MagneticButton/MagneticButton.tsx` — wraps elements to follow cursor on hover (elastic snap-back on leave). Used on Hero CTAs and Contact email.
- **Footer Reveal**: Sticky at bottom with z-index:-1, main content has z-index:1 + bg color so footer is revealed underneath as user scrolls past.

## TypeScript

Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`. Target is ES2022 with modern JSX transform (`react-jsx`).
