---
name: add-page
description: Add a new page/route to the portfolio with proper SEO, layout integration, and GSAP animations
user-invocable: true
argument-hint: [page-name]
---

# Add Page

Create a new page at the route `/$1` with proper routing, SEO, and animations.

## Steps

1. Create `src/app/$1/page.tsx` and `src/app/$1/page.module.css`
2. Add route to `src/main.tsx` in the `<Switch>` block
3. Add nav link to `src/components/Navbar/Navbar.tsx` in `navLinks` array
4. Set SEO metadata using `setPageMeta()` from `src/lib/seo.ts`

## Page Template

```tsx
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsap } from '../../hooks/useGsap';
import { setPageMeta } from '../../lib/seo';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function $ARGUMENTSPage() {
  useEffect(() => {
    setPageMeta({
      title: '$ARGUMENTS',
      description: 'Description here',
      path: '/$1',
    });
  }, []);

  const containerRef = useGsap((container) => {
    // Heading clip-path reveal
    const heading = container.querySelector(`.${styles.heading}`);
    if (heading) {
      gsap.fromTo(heading,
        { clipPath: 'inset(100% 0 0 0)', y: 60 },
        { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.0, ease: 'power4.out' }
      );
    }
  });

  return (
    <section
      className={styles.page}
      ref={containerRef as React.RefObject<HTMLElement>}
      aria-labelledby="page-heading"
    >
      <div className={styles.container}>
        <div className={styles.headingWrap}>
          <h1 className={styles.heading} id="page-heading">
            $ARGUMENTS
          </h1>
        </div>
      </div>
    </section>
  );
}
```

## Route Registration (src/main.tsx)
```tsx
<Route path="/$1" component={$ARGUMENTSPage} />
```

## Rules
- Each page must have exactly one `<h1>`
- Use `setPageMeta()` for title, description, OG tags
- Export as `default` function (Wouter `component` prop expects default export)
- Use `useGsap` hook for all animations
- CSS Module with design tokens from globals.css
- Add `aria-labelledby` linking to the h1's id
