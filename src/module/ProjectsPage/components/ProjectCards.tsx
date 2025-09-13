import classNames from "classnames";
import type { Project } from "../../../types/Projects";
import { ProjectCard } from "./ProjectCard";

type ProjectProps = {
  projects: Project[]
};

export const ProjectCards: React.FC<ProjectProps> = ({ projects }) => {
  return (
    <div className="flex flex-col gap-8 xl:gap-20 lg:px-8">
      {projects.map((project: Project, idx: number) => (
        <div
          key={project.id}
          className={classNames("flex flex-col gap-30 w-full xl:w-2/3 mt-14", {
            "mr-auto": idx % 2 === 0,
            "ml-auto": idx % 2 !== 0,
          })}
        >
          <ProjectCard project={project} oddNumber={idx % 2 !== 0} />
        </div>
      ))}
    </div>
  );
};
