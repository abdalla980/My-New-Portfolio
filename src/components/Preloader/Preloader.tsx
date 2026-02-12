import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.css';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  const animate = useCallback(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay || !text) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      setVisible(false);
      onComplete();
      return;
    }

    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setVisible(false);
        onComplete();
      },
    });

    // Step 1: Text zooms in from scaled up
    tl.fromTo(
      text,
      { scale: 2.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' },
    );

    // Step 2: Brief hold
    tl.to(text, { duration: 0.3 });

    // Step 3: Text shrinks and fades
    tl.to(text, {
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
    });

    // Step 4: Circle clip-path reveal (overlaps step 3)
    tl.to(
      overlay,
      {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 0.8,
        ease: 'power3.inOut',
      },
      '-=0.3',
    );
  }, [onComplete]);

  useEffect(() => {
    animate();
  }, [animate]);

  if (!visible) return null;

  return (
    <div className={styles.overlay} ref={overlayRef}>
      <span className={styles.text} ref={textRef}>
        Portfolio
      </span>
    </div>
  );
}
