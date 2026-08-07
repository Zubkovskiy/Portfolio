import { TiltCard } from '@/components/fx/TiltCard';
import { Section, sectionStyles } from '@/components/layout/Section';
import { ProjectCard, SectionHeading } from '@/components/ui';
import type { Dictionary } from '@/lib/i18n';
import styles from './Projects.module.css';

export function Projects({ projects }: { projects: Dictionary['projects'] }) {
  return (
    <Section id="projects" labelledBy="projects-title">
      <div className={`reveal ${sectionStyles.headingTight}`}>
        <SectionHeading
          id="projects-title"
          eyebrow={projects.eyebrow}
          ghostText={projects.ghost}
          title={projects.title}
          highlight={projects.highlight}
          align="center"
        />
      </div>

      <p className={`reveal ${sectionStyles.note}`}>{projects.note}</p>

      <div className={`reveal reveal-delay-1 ${styles.grid}`}>
        {projects.items.map((project) => (
          <TiltCard key={project.title} className={styles.tiltHost}>
            <ProjectCard
              title={project.title}
              tags={project.tags}
              description={project.description}
              linkLabel={project.linkLabel}
              href={project.href}
              imageSrc={project.image}
              imageCaption={projects.imagePlaceholder}
              meta={project.meta}
            />
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
