import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook that creates a GSAP context scoped to a container ref.
 * Automatically cleans up all animations and ScrollTriggers on unmount.
 *
 * @param callback - Receives the container element; create animations here.
 * @param deps - Dependency array (like useEffect).
 */
export function useGsap(
  callback: (container: HTMLElement) => void,
  deps: React.DependencyList = [],
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      callback(el);
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}
