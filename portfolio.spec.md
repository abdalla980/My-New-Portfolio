# Portfolio Website — Project Specification

## Overview

Build a personal portfolio website to showcase my work. The site should feel polished, modern, and performance-oriented, using **GSAP animations**, **CSS Modules**, **semantic HTML for SEO**, and a **React.js** stack.

---

## Tech Stack

| Layer | Technology                                  |
|---|---------------------------------------------|
| Framework | **React JS+ Vite** )                        |
| Language | TypeScript                                  |
| Styling | **CSS Modules** (`.module.css` per component) |
| Animation | **GSAP 3** + ScrollTrigger plugin           |
| Deployment | Netlify                          |
| Font loading | `next/font` (self-hosted, no CLS)           |

---

## SEO Requirements

Every page must follow these semantic HTML and SEO rules:

- Use **one `<h1>` per page** — never duplicate.
- Use heading hierarchy correctly: `<h1>` → `<h2>` → `<h3>` (never skip levels).
- Use `<main>`, `<header>`, `<nav>`, `<footer>`, `<section>`, `<article>` landmark elements.
- Every `<img>` must have a descriptive `alt` attribute.
- Use Next.js `<Head>` / `metadata` export for per-page `<title>` and `<meta name="description">`.
- Use `<a>` tags with meaningful anchor text (not "click here").
- Add structured data (JSON-LD) for `Person` schema on the homepage.
- Generate a `sitemap.xml` and `robots.txt`.
- Use `rel="canonical"` on every page.
- All text must be in proper semantic tags (`<p>`, `<ul>`, `<time>`, `<address>`, etc.) — never raw text in `<div>`.
- Ensure proper `lang` attribute on `<html>`.
- Use `<meta property="og:…">` Open Graph tags for social sharing previews.

---

## GSAP Animations to Implement

Use the following well-known GSAP animation patterns throughout the site. Import GSAP and ScrollTrigger, register the plugin, and clean up animations in `useEffect` return functions.

### 1. Follow this  websites same Gsap animations in  the exact same places and time that they use
- https://www.basili.co/

---

## CSS Modules Rules

- Every component gets its own `ComponentName.module.css` file.
- Use `composes` for shared styles instead of global classes.
- No global CSS except for CSS reset/normalize and CSS custom properties (variables).
- Define a global `variables.css` with design tokens:
    - `--color-bg`, `--color-text`, `--color-accent`, `--color-muted`
    - `--font-heading`, `--font-body`
    - `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`
    - `--radius-sm`, `--radius-md`
    - `--transition-default`
- Use responsive design with mobile-first media queries inside each module.
- Use `clamp()` for fluid typography.

---

## Site Structure & Pages

### Page 1: Homepage (`/`)

**Sections (in order):**

1. **Hero Section**
    - Large heading with name + tagline (animated with SplitText-style reveal).
    - Brief one-liner description.
    - CTA button: "View My Work" (scrolls to projects) + "Get in Touch" (scrolls to contact).
    - Subtle parallax background shapes.

2. **About Snippet**
    - Short 2–3 sentence intro about who I am.
    - Optional: small profile photo.
    - "Learn more" link (can scroll to a lower section or be a separate page later).

3. **Featured Projects** (MVP CORE)
    - Grid of **3–4 featured project cards**.
    - Each card shows: project thumbnail/placeholder, project title, short description, tech tags.
    - Cards animate in with staggered grid reveal.
    - **"View All Projects" button** — links to `/projects`.

4. **Stats / Experience Bar** (Optional)
    - Counter roll-up numbers (years of experience, projects completed, etc.).

5. **Contact Section**
    - Heading + short prompt ("Let's work together").
    - Email link and/or social links (GitHub, LinkedIn, Twitter/X).
    - Optional: simple contact form (name, email, message).

6. **Footer**
    - Copyright, social links, back-to-top button.

### Page 2: Projects Page (`/projects`)

- **Page heading** (`<h1>`): "All Projects"
- **Filter/tag bar** (optional MVP): filter by tech (React, Node, Python, etc.)
- **Full project grid**: all projects displayed as cards (same card component as homepage, reusable).
- Each card links to a **project detail** (can be a modal or a dynamic route `/projects/[slug]` — detail page is post-MVP).
- Staggered scroll reveal on the grid.

---

## Project Data Structure

Store project data in a local JSON or TypeScript file (`data/projects.ts`):

```typescript
export interface Project {
  slug: string;
  title: string;
  description: string;       // Short (1–2 sentences)
  longDescription?: string;  // For detail page (post-MVP)
  thumbnail: string;         // Path to image in /public
  tags: string[];            // e.g., ["React", "Node.js", "GSAP"]
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;         // true = show on homepage
  date: string;              // "2025-01" for sorting
}
```

---

## Component Breakdown

```
src/
├── app/
│   ├── layout.tsx            # Root layout with <html>, <body>, nav, footer
│   ├── page.tsx              # Homepage
│   └── projects/
│       └── page.tsx          # All projects page
├── components/
│   ├── Navbar/
│   │   ├── Navbar.tsx
│   │   └── Navbar.module.css
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   └── Hero.module.css
│   ├── About/
│   │   ├── About.tsx
│   │   └── About.module.css
│   ├── ProjectCard/
│   │   ├── ProjectCard.tsx
│   │   └── ProjectCard.module.css
│   ├── FeaturedProjects/
│   │   ├── FeaturedProjects.tsx
│   │   └── FeaturedProjects.module.css
│   ├── Stats/
│   │   ├── Stats.tsx
│   │   └── Stats.module.css
│   ├── Contact/
│   │   ├── Contact.tsx
│   │   └── Contact.module.css
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   └── MagneticButton/
│       ├── MagneticButton.tsx
│       └── MagneticButton.module.css
├── data/
│   └── projects.ts
├── hooks/
│   └── useGsap.ts            # Custom hook for GSAP + cleanup
├── styles/
│   ├── globals.css            # Reset + CSS variables only
│   └── variables.css
└── lib/
    └── seo.ts                 # Helper to generate metadata
```

---

## MVP Milestone Checklist

These are the **must-have** deliverables for the first working version:

- [ ] React.js project scaffolded with TypeScript and CSS Modules
- [ ] Global styles: CSS reset, design tokens in CSS variables
- [ ] Responsive Navbar with logo/name and links (Home, Projects, Contact anchor)
- [ ] Hero section with GSAP text reveal animation
- [ ] Featured Projects section on homepage showing 3–4 cards from data file
- [ ] "View All Projects" button linking to `/projects`
- [ ] `/projects` page rendering all projects from the data file in a grid
- [ ] Reusable `ProjectCard` component with hover effects
- [ ] GSAP scroll-triggered fade-up on all sections
- [ ] GSAP staggered reveal on project card grids
- [ ] Contact section with email/social links
- [ ] Footer with copyright
- [ ] Semantic HTML on every page (proper heading hierarchy, landmarks, alt text)
- [ ] SEO metadata (title, description, OG tags) on both pages
- [ ] `prefers-reduced-motion` respected
- [ ] Mobile responsive (works on 375px–1440px+)

---

## Post-MVP Enhancements

- Individual project detail pages (`/projects/[slug]`)
- Horizontal scroll section
- Magnetic hover buttons
- Parallax background shapes
- Counter/number roll-up stats section
- Blog page
- Dark/light theme toggle
- Contact form with backend (Formspree, Resend, etc.)
- Page transition animations between routes
- Lighthouse score ≥ 90 on all categories

---

## Design Direction

- **Style**: Clean, minimal, lots of whitespace. Modern developer portfolio aesthetic.
- **Colors**: Dark background (`#0a0a0a` or `#111`) with light text (`#f5f5f5`). One accent color (e.g., electric blue `#3b82f6` or emerald `#10b981`).
- **Typography**: Sans-serif. Use `Inter` or `Space Grotesk` for headings, `Inter` for body.
- **Spacing**: Generous. Sections should breathe.
- **Cards**: Subtle border or glassmorphism effect. Slight scale-up on hover.

---

## Placeholder Content

Use the following placeholder data until I replace it with my real projects:

```typescript
export const projects: Project[] = [
  {
    slug: "project-one",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce app with cart, checkout, and payment integration.",
    thumbnail: "/images/project1.jpg",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/project",
    featured: true,
    date: "2025-06"
  },
  {
    slug: "project-two",
    title: "AI Dashboard",
    description: "Real-time analytics dashboard for monitoring ML model performance.",
    thumbnail: "/images/project2.jpg",
    tags: ["React", "D3.js", "Python"],
    featured: true,
    date: "2025-03"
  },
  {
    slug: "project-three",
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates and team features.",
    thumbnail: "/images/project3.jpg",
    tags: ["React", "Node.js", "Socket.io"],
    featured: true,
    date: "2024-11"
  },
  {
    slug: "project-four",
    title: "Weather App",
    description: "Beautiful weather app with location-based forecasts and animated visuals.",
    thumbnail: "/images/project4.jpg",
    tags: ["React", "OpenWeather API", "GSAP"],
    featured: false,
    date: "2024-08"
  },
  {
    slug: "project-five",
    title: "Portfolio V1",
    description: "My first portfolio website built with vanilla HTML, CSS, and JavaScript.",
    thumbnail: "/images/project5.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    featured: false,
    date: "2024-05"
  }
];
```


## Build Phases (for sequential prompting)

| Phase | Scope |
|---|---|
| **Phase 1** | Project setup, folder structure, globals, layout, Navbar, Footer |
| **Phase 2** | Hero section with GSAP SplitText-style animation, `useGsap` hook |
| **Phase 3** | Project data file, `ProjectCard` component, `FeaturedProjects` section on homepage with staggered GSAP reveal, "View All" button |
| **Phase 4** | `/projects` page with full grid, scroll-triggered animations |
| **Phase 5** | About snippet, Contact section, SEO (JSON-LD, sitemap, robots.txt, OG tags) |
| **Phase 6** | Polish — responsive testing, `prefers-reduced-motion`, performance audit, final cleanup |