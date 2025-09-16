import type { Project } from "../../../types/Projects";
import classNames from "classnames";

type ProjectProps = {
  project: Project;
  oddNumber?: boolean;
};

export const ProjectCard: React.FC<ProjectProps> = ({ project, oddNumber }) => {
  return (
    <div
      key={project.id}
      className={classNames(
        "flex items-center flex-col sm:flex-row gap-6 h-full sm:h-110 md:h-140 shadow-wrapper rounded-4xl p-4 sm:p-6 backdrop-blur-md bg-[var(--color-primary)]/4 shadow-md",
        {
          "sm:flex-row-reverse": oddNumber,
        }
      )}
    >
      <a
        href={
          project.link.startsWith("http")
            ? project.link
            : `${import.meta.env.BASE_URL}${project.link}`
        }
        rel="noopener noreferrer"
        className="w-full sm:w-2/3 h-full sm:h-full"
      >
        <img
          src={`${import.meta.env.BASE_URL}${project.image}`}
          alt={project.title}
          className="h-full w-full mx-auto rounded-3xl object-cover object-center"
        />
      </a>

      <div className="flex items-center flex-col gap-2 sm:gap-4 w-full sm:w-1/3">
        <ul className="flex justify-center flex-wrap gap-4">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="flex justify-center items-center flex-wrap p-2 w-20 lg:w-30 font-bold bg-[var(--color-primary)] rounded-2xl text-[var(--color-background)]"
            >
              {tech}
            </li>
          ))}
        </ul>

        <p className="text-2xl md:text-3xl font-bold">{project.title}</p>
        <p className="text-lg opacity-70 text-center">{project.description}</p>

        <a
          href={
            project.link.startsWith("http")
              ? project.link
              : `${import.meta.env.BASE_URL}${project.link}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300"
        >
          <img
            src={`${import.meta.env.BASE_URL}/img/icons/open.svg`}
            alt="open"
            className="h-10 text-left"
          />
        </a>
      </div>
    </div>
  );
};
