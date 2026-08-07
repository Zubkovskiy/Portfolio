import { TiltCard } from '@/components/fx/TiltCard';
import { Section, sectionStyles } from '@/components/layout/Section';
import { Card, SectionHeading } from '@/components/ui';
import type { Dictionary } from '@/lib/i18n';
import { AiWorkflowDiagram } from './diagrams/AiWorkflowDiagram';
import { ComponentTreeDiagram } from './diagrams/ComponentTreeDiagram';
import styles from './Services.module.css';

export function Services({ services }: { services: Dictionary['services'] }) {
  const { diagramLabels } = services;

  const cards = [
    {
      label: diagramLabels.componentTree,
      meta: diagramLabels.componentTreeMeta,
      diagram: <ComponentTreeDiagram />,
    },
    {
      label: diagramLabels.workflow,
      meta: diagramLabels.workflowMeta,
      diagram: <AiWorkflowDiagram />,
    },
  ];

  return (
    <Section id="services" labelledBy="services-title">
      <div className={`reveal ${sectionStyles.heading}`}>
        <SectionHeading
          id="services-title"
          eyebrow={services.eyebrow}
          ghostText={services.ghost}
          title={services.title}
          highlight={services.highlight}
          align="center"
        />
      </div>

      <div className={`reveal reveal-delay-1 ${styles.grid}`}>
        {services.items.map((item, index) => {
          const visual = cards[index];

          return (
            <TiltCard key={item.title} className={styles.tiltHost}>
              <Card hoverable accent fill>
                <div className={styles.body}>
                  {visual ? (
                    <div className={styles.figure} aria-hidden="true">
                      <div className={styles.figureLabel}>
                        <span>{visual.label}</span>
                        <span className={styles.figureMeta}>{visual.meta}</span>
                      </div>
                      {visual.diagram}
                    </div>
                  ) : null}

                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>

                  <a href="#contact" className={styles.link}>
                    {item.linkLabel}
                    <span className={styles.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </div>
              </Card>
            </TiltCard>
          );
        })}
      </div>
    </Section>
  );
}
