import { useEffect, useRef } from 'react';
import gsap from 'gsap';
// @ts-ignore — GSAP types casing mismatch on Windows
import { Observer } from 'gsap/Observer';
import { Hero } from '../components/Hero/Hero';
import { About } from '../components/About/About';
import { FeaturedProjects } from '../components/FeaturedProjects/FeaturedProjects';
import { Contact } from '../components/Contact/Contact';
import { setPageMeta } from '../lib/seo';
import { getLenis } from '../hooks/useLenis';

gsap.registerPlugin(Observer);

export default function HomePage() {
  const observerRef = useRef<Observer | null>(null);

  useEffect(() => {
    setPageMeta({
      title: 'Web Developer & Designer',
      description:
        'Personal portfolio showcasing web development projects, design work, and software engineering expertise.',
      path: '/',
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    let currentIndex = 0;
    let animating = false;

    const timer = setTimeout(() => {
      const sections = gsap.utils.toArray<HTMLElement>(
        '#main-content section',
      );
      if (sections.length === 0) return;

      // Stop Lenis — Observer takes full control of scroll
      const lenis = getLenis();
      if (lenis) lenis.stop();

      const headerHeight =
        parseFloat(getComputedStyle(document.documentElement).fontSize) * 4;

      // Determine which section is currently visible
      for (let i = sections.length - 1; i >= 0; i--) {
        let top = 0;
        let el: HTMLElement | null = sections[i];
        while (el) {
          top += el.offsetTop;
          el = el.offsetParent as HTMLElement;
        }
        if (window.scrollY >= top - headerHeight - 50) {
          currentIndex = i;
          break;
        }
      }

      const goToSection = (index: number) => {
        if (animating || index < 0 || index >= sections.length) return;
        animating = true;
        currentIndex = index;

        // Kill Observer so no wheel events are captured during animation
        observerRef.current?.disable();

        // Calculate absolute document position of target section
        let targetY = 0;
        let el: HTMLElement | null = sections[index];
        while (el) {
          targetY += el.offsetTop;
          el = el.offsetParent as HTMLElement;
        }
        targetY = Math.max(0, targetY - headerHeight);

        const proxy = { y: window.scrollY };
        gsap.to(proxy, {
          y: targetY,
          duration: 0.8,
          ease: 'power2.inOut',
          onUpdate: () => window.scrollTo(0, proxy.y),
          onComplete: () => {
            setTimeout(() => {
              animating = false;
              observerRef.current?.enable();
            }, 400);
          },
        });
      };

      observerRef.current = Observer.create({
        type: 'wheel,touch,pointer',
        wheelSpeed: -1,
        onDown: () => goToSection(currentIndex - 1),
        onUp: () => goToSection(currentIndex + 1),
        tolerance: 10,
        preventDefault: true,
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      observerRef.current?.kill();
      observerRef.current = null;
      // Restart Lenis when leaving the page
      const lenis = getLenis();
      if (lenis) lenis.start();
    };
  }, []);

  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      <Contact />
    </>
  );
}
