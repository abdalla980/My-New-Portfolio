---
name: debug-animation
description: Debug GSAP animation issues — ScrollTrigger not firing, animations not playing, flickering, or cleanup problems
user-invocable: true
argument-hint: [component-name]
---

# Debug Animation

Diagnose and fix GSAP animation issues in the specified component.

## Common Issues & Fixes

### 1. ScrollTrigger Not Firing
- Check `start` value — `'top 85%'` means top of element hits 85% of viewport
- Lenis smooth scroll must be initialized before ScrollTrigger animations
- Verify the trigger element exists in the DOM at animation time
- Check if `prefers-reduced-motion` is blocking (useGsap hook skips all animations)

### 2. Flash of Unstyled Content (FOUC)
- Use `gsap.fromTo()` instead of `gsap.from()` for clip-path/opacity animations
- `gsap.from()` can flash the final state before animating — `fromTo()` prevents this

### 3. Animations Not Cleaning Up
- Must use `useGsap` hook or `gsap.context()` for React cleanup
- ScrollTrigger instances must be killed on unmount
- Check for stale refs in useEffect dependencies

### 4. Lenis + ScrollTrigger Desync
- Lenis must sync with GSAP ticker: `lenis.on('scroll', ScrollTrigger.update)`
- `gsap.ticker.lagSmoothing(0)` must be set
- Hash anchor navigation must use `lenis.scrollTo()` not native scroll

### 5. Preloader Timing Issues
- Hero delays based on `sessionStorage.getItem('preloaderShown')`
- First visit: baseDelay = 2.4s (after preloader ~2.2s + buffer)
- Return visit: baseDelay = 0.3s
- Navbar listens for `'preloader-complete'` CustomEvent

### 6. Clip-Path Not Animating
- Ensure element has `will-change: transform, clip-path` in CSS
- Heading wrappers need `overflow: hidden`
- clip-path values must match format: `inset(X% 0 0 0)` → `inset(0% 0 0 0)`

## Debugging Steps
1. Read the component's .tsx file
2. Check if `useGsap` hook is used properly
3. Verify CSS module has required overflow/perspective/will-change
4. Check browser console for GSAP warnings
5. Test with `prefers-reduced-motion` toggled off
6. Verify Lenis is initialized (check Layout component)
