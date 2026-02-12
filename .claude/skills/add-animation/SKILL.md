---
name: add-animation
description: Add a GSAP animation to an existing component following the Basilico-style animation patterns used in this project
user-invocable: true
argument-hint: [component-name] [animation-type]
---

# Add Animation

Add a GSAP animation to the specified component. Use the project's established animation patterns.

## Available Animation Patterns

### 1. Clip-Path Heading Reveal
```tsx
gsap.fromTo(heading,
  { clipPath: 'inset(100% 0 0 0)', y: 60 },
  { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.0, ease: 'power4.out',
    scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: 'play none none none' }
  }
);
```
CSS: Wrap heading in `.headingWrap { overflow: hidden; }`

### 2. Content Clip-Path + Fade
```tsx
gsap.fromTo(elements,
  { clipPath: 'inset(30% 0 0 0)', opacity: 0, y: 40 },
  { clipPath: 'inset(0% 0 0 0)', opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: container, start: 'top 80%', toggleActions: 'play none none none' }
  }
);
```

### 3. Card Stagger Reveal (scale + rotateX)
```tsx
gsap.fromTo(cards,
  { opacity: 0, y: 80, scale: 0.92, rotateX: 8 },
  { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.8,
    stagger: { amount: 0.6, from: 'start' }, ease: 'power3.out',
    scrollTrigger: { trigger: grid, start: 'top 80%', toggleActions: 'play none none none' }
  }
);
```
CSS: Grid needs `perspective: 800px`, cards need `transform-style: preserve-3d`

### 4. Parallax on Scroll
```tsx
gsap.to(element, {
  y: -30,
  scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true }
});
```

### 5. Character Split Reveal
```tsx
gsap.set(chars, { opacity: 0, y: 80, rotateX: 40 });
gsap.to(chars, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.025, ease: 'power4.out' });
```

### 6. Magnetic Button
Wrap with `<MagneticButton strength={0.25}>` from `src/components/MagneticButton/MagneticButton.tsx`

## Rules
- Always use the `useGsap` hook — it handles `gsap.context()` cleanup and `prefers-reduced-motion`
- Use `gsap.fromTo()` for clip-path animations (not `gsap.from()`) to avoid FOUC
- ScrollTrigger `toggleActions: 'play none none none'` — animations play once
- Standard easings: `power4.out` for headings, `power3.out` for content, `power2.out` for subtle
- Standard durations: 0.8-1.0s for headings, 0.7-0.9s for content, 0.3s for nav transitions
