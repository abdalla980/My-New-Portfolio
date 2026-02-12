import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsap } from '../../hooks/useGsap';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const headingText = 'I Build Polished Digital Experiences';

function splitIntoWords(text: string) {
  return text.split(' ');
}

export function Hero() {
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);

  const containerRef = useGsap((container) => {
    // Determine delay based on whether preloader has played
    const preloaderAlreadyDone =
      sessionStorage.getItem('preloaderShown') === 'true';
    const baseDelay = preloaderAlreadyDone ? 0.3 : 2.4;

    // SplitText-style character reveal with rotateX
    const chars = container.querySelectorAll(`.${styles.char}`);
    if (chars.length) {
      gsap.set(chars, { opacity: 0, y: 80, rotateX: 40 });
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.025,
        ease: 'power4.out',
        delay: baseDelay,
      });
    }

    // Subtitle clip-path reveal
    const subtitle = container.querySelector(`.${styles.subtitle}`);
    if (subtitle) {
      gsap.fromTo(
        subtitle,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: baseDelay + 0.6,
        },
      );
    }

    // Buttons staggered fade-up
    const buttons = container.querySelectorAll(
      `.${styles.primaryBtn}, .${styles.secondaryBtn}`,
    );
    if (buttons.length) {
      gsap.from(buttons, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: baseDelay + 0.9,
      });
    }

    // Parallax on background shapes
    if (shape1Ref.current) {
      gsap.to(shape1Ref.current, {
        y: -120,
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
    if (shape2Ref.current) {
      gsap.to(shape2Ref.current, {
        y: -80,
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  });

  const words = splitIntoWords(headingText);

  return (
    <section
      className={styles.hero}
      ref={containerRef as React.RefObject<HTMLElement>}
      aria-label="Introduction"
    >
      {/* Parallax background shapes */}
      <div className={styles.bgShape1} ref={shape1Ref} aria-hidden="true" />
      <div className={styles.bgShape2} ref={shape2Ref} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.heading}>
          {words.map((word, wi) => (
            <span className={styles.word} key={wi}>
              {word.split('').map((char, ci) => (
                <span className={styles.char} key={`${wi}-${ci}`}>
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className={styles.subtitle}>
          A developer focused on crafting clean, performant websites with
          modern technologies and thoughtful animations.
        </p>

        <div className={styles.actions}>
          <MagneticButton strength={0.25}>
            <a href="#featured-projects" className={styles.primaryBtn}>
              View My Work
            </a>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <a href="#contact" className={styles.secondaryBtn}>
              Get in Touch
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
