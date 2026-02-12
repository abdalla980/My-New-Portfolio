---
name: add-component
description: Scaffold a new React component with CSS Module and GSAP scroll animation following this project's conventions
user-invocable: true
argument-hint: [ComponentName]
---

# Add Component

Create a new component named `$ARGUMENTS` following this project's exact conventions.

## Steps

1. Create `src/components/$ARGUMENTS/$ARGUMENTS.tsx`
2. Create `src/components/$ARGUMENTS/$ARGUMENTS.module.css`

## Component Template (.tsx)

```tsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsap } from '../../hooks/useGsap';
import styles from './$ARGUMENTS.module.css';

gsap.registerPlugin(ScrollTrigger);

export function $ARGUMENTS() {
  const containerRef = useGsap((container) => {
    // Heading clip-path reveal
    const heading = container.querySelector(`.${styles.heading}`);
    if (heading) {
      gsap.fromTo(
        heading,
        { clipPath: 'inset(100% 0 0 0)', y: 60 },
        {
          clipPath: 'inset(0% 0 0 0)',
          y: 0,
          duration: 1.0,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    }
  });

  return (
    <section
      className={styles.section}
      ref={containerRef as React.RefObject<HTMLElement>}
    >
      <div className={styles.container}>
        {/* Component content */}
      </div>
    </section>
  );
}
```

## CSS Module Template (.module.css)

```css
.section {
  padding: var(--space-3xl) var(--space-md);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.headingWrap {
  overflow: hidden;
}

.heading {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text);
  will-change: transform, clip-path;
}
```

## Rules
- Use CSS Modules only — no global classes
- Use design tokens from `src/styles/globals.css` (--color-*, --space-*, --text-*)
- Use `useGsap` hook for animations with `gsap.context()` cleanup
- All animations must respect `prefers-reduced-motion` (handled by useGsap)
- Headings use clip-path reveal pattern with `.headingWrap` overflow:hidden wrapper
- Use semantic HTML elements
