import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsap } from '../../hooks/useGsap';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { href: 'https://github.com', label: 'GitHub' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  { href: 'https://twitter.com', label: 'X / Twitter' },
] as const;

export function Contact() {
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

    // Content clip-path + fade
    const content = container.querySelectorAll(
      `.${styles.text}, .${styles.emailWrap}, .${styles.socialList}`,
    );
    if (content.length) {
      gsap.fromTo(
        content,
        { clipPath: 'inset(30% 0 0 0)', opacity: 0, y: 40 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    }
  });

  return (
    <section
      className={styles.section}
      id="contact"
      ref={containerRef as React.RefObject<HTMLElement>}
      aria-labelledby="contact-heading"
    >
      <div className={styles.container}>
        <div className={styles.headingWrap}>
          <h2 className={styles.heading} id="contact-heading">
            Let&rsquo;s Work Together
          </h2>
        </div>
        <p className={styles.text}>
          Have a project in mind or just want to say hello? I&rsquo;m always
          open to new opportunities and conversations.
        </p>

        <div className={styles.emailWrap}>
          <MagneticButton strength={0.2}>
            <a href="mailto:hello@example.com" className={styles.emailLink}>
              hello@example.com
            </a>
          </MagneticButton>
        </div>

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
    </section>
  );
}
