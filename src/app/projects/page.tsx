import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsap } from '../../hooks/useGsap';
import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { setPageMeta } from '../../lib/seo';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

// Sort projects by date descending
const sortedProjects = [...projects].sort(
  (a, b) => b.date.localeCompare(a.date),
);

export default function ProjectsPage() {
  useEffect(() => {
    setPageMeta({
      title: 'All Projects',
      description:
        'Browse all web development projects — from full-stack apps to interactive experiments.',
      path: '/projects',
    });
  }, []);

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
        },
      );
    }

    // Staggered card reveal with scale + rotateX
    const cards = container.querySelectorAll('article');
    const grid = container.querySelector(`.${styles.grid}`);
    if (cards.length && grid) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 80, scale: 0.92, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: { amount: 0.6, from: 'start' },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );

      // Parallax on card thumbnails
      cards.forEach((card) => {
        const img = card.querySelector('img');
        if (img) {
          gsap.to(img, {
            y: -30,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }
  });

  return (
    <section
      className={styles.page}
      ref={containerRef as React.RefObject<HTMLElement>}
      aria-labelledby="projects-heading"
    >
      <div className={styles.container}>
        <div className={styles.headingWrap}>
          <h1 className={styles.heading} id="projects-heading">
            All Projects
          </h1>
        </div>

        <div className={styles.grid}>
          {sortedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel="h2" />
          ))}
        </div>
      </div>
    </section>
  );
}
