import { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Navbar.module.css';

gsap.registerPlugin(ScrollTrigger);

interface NavLink {
  href: string;
  label: string;
  isAnchor?: boolean;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact', isAnchor: true },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const navRef = useRef<HTMLElement>(null);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const preloaderAlreadyDone =
      sessionStorage.getItem('preloaderShown') === 'true';

    let removePreloaderListener: (() => void) | undefined;

    if (!preloaderAlreadyDone) {
      gsap.set(nav, { y: '-100%' });

      const onPreloaderDone = () => {
        gsap.to(nav, {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
        });
      };
      window.addEventListener('preloader-complete', onPreloaderDone);
      removePreloaderListener = () =>
        window.removeEventListener('preloader-complete', onPreloaderDone);
    }

    // Scroll direction: hide on down, show on up
    const showAnim = gsap
      .from(nav, {
        y: '-100%',
        paused: true,
        duration: 0.3,
        ease: 'power2.out',
      })
      .progress(1);

    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();
        } else if (self.progress > 0.02) {
          showAnim.reverse();
        }
      },
    });

    return () => {
      removePreloaderListener?.();
      showAnim.kill();
      st.kill();
    };
  }, []);

  return (
    <nav className={styles.nav} ref={navRef} aria-label="Main navigation">
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          Portfolio
        </Link>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="nav-list"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          type="button"
        >
          <span className={menuOpen ? styles.menuIconOpen : styles.menuIcon} />
        </button>

        <ul
          id="nav-list"
          className={menuOpen ? styles.listOpen : styles.list}
          role="list"
        >
          {navLinks.map(({ href, label, isAnchor }) => (
            <li key={href}>
              {isAnchor ? (
                <a
                  href={href}
                  className={styles.link}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ) : (
                <Link
                  href={href}
                  className={location === href ? styles.linkActive : styles.link}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
