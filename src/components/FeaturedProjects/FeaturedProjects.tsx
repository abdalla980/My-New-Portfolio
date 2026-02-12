import { Link } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsap } from '../../hooks/useGsap';
import { projects } from '../../data/projects';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import styles from './FeaturedProjects.module.css';

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = projects.filter((p) => p.featured);

export function FeaturedProjects() {
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
            start: 'top 80%',
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
      className={styles.section}
      id="featured-projects"
      ref={containerRef as React.RefObject<HTMLElement>}
      aria-labelledby="featured-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingWrap}>
            <h2 className={styles.heading} id="featured-heading">
              Featured Projects
            </h2>
          </div>
          <Link href="/projects" className={styles.viewAll}>
            View All Projects &rarr;
          </Link>
        </div>

        <div className={styles.grid}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
