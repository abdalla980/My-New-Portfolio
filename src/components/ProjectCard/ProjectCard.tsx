import type { Project } from '../../data/projects';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  headingLevel?: 'h2' | 'h3';
}

export function ProjectCard({ project, headingLevel = 'h3' }: ProjectCardProps) {
  const { title, description, thumbnail, tags, liveUrl, githubUrl } = project;
  const Heading = headingLevel;

  return (
    <article className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        <img
          src={thumbnail}
          alt={`Screenshot of ${title}`}
          className={styles.thumbnail}
          loading="lazy"
          onError={(e) => {
            // Hide broken image, show placeholder
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            const next = e.currentTarget.nextElementSibling as HTMLElement;
            if (next) next.style.display = 'flex';
          }}
        />
        <div className={styles.placeholder} style={{ display: 'none' }} aria-hidden="true">
          {title.charAt(0)}
        </div>
      </div>

      <div className={styles.body}>
        <Heading className={styles.title}>{title}</Heading>
        <p className={styles.description}>{description}</p>

        <ul className={styles.tags} role="list" aria-label={`Technologies used in ${title}`}>
          {tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>

        {(liveUrl || githubUrl) && (
          <div className={styles.links}>
            {liveUrl && (
              <a
                href={liveUrl}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
