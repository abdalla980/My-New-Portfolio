import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsap } from '../../hooks/useGsap';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export function About() {
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

    // Content clip-path + fade reveal
    const content = container.querySelectorAll(
      `.${styles.text}, .${styles.link}`,
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
      id="about"
      ref={containerRef as React.RefObject<HTMLElement>}
      aria-labelledby="about-heading"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headingWrap}>
            <h2 className={styles.heading} id="about-heading">
              About Me
            </h2>
          </div>
          <p className={styles.text}>
            I&rsquo;m a developer who loves turning ideas into clean, performant
            web experiences. I work with modern tools like React, TypeScript, and
            GSAP to build interfaces that feel as good as they look.
          </p>
          <p className={styles.text}>
            When I&rsquo;m not coding, you&rsquo;ll find me exploring new
            technologies, contributing to open-source, or refining my craft
            through side projects.
          </p>
          <a href="#contact" className={styles.link}>
            Get in touch <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
