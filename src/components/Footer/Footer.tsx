import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsap } from '../../hooks/useGsap';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { href: 'https://github.com', label: 'GitHub' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  { href: 'mailto:hello@example.com', label: 'Email' },
] as const;

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function Footer() {
  const year = new Date().getFullYear();

  const containerRef = useGsap((container) => {
    const elements = container.querySelectorAll(
      `.${styles.brand}, .${styles.socialLink}, .${styles.copyright}, .${styles.backToTop}`,
    );
    if (elements.length) {
      gsap.from(elements, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }
  });

  return (
    <footer
      className={styles.footer}
      ref={containerRef as React.RefObject<HTMLElement>}
    >
      <div className={styles.container}>
        <div className={styles.top}>
          <p className={styles.brand}>Portfolio</p>
          <ul className={styles.socialList} role="list" aria-label="Social links">
            {socialLinks.map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.divider} role="separator" />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} Portfolio. All rights reserved.
          </p>
          <button
            className={styles.backToTop}
            onClick={scrollToTop}
            type="button"
            aria-label="Scroll back to top"
          >
            Back to top <span className={styles.arrow} aria-hidden="true">&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
