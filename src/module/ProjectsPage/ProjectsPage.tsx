import { useEffect, useState } from "react";
import { ProjectCards } from "./components/ProjectCards";

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`${import.meta.env.BASE_URL}/api/projects.json`);
      const data = await response.json();

      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <section className="pt-20 mb-30">
      <h3 className="text-4xl font-bold">My Projects</h3>
      
      <p className="text-2xl sm:text-3xl mt-8 w-60 sm:w-78">
        Let's Have a Look at{" "}
        <span className="text-[var(--color-primary)]">MY Projects</span>
      </p>

      <ProjectCards projects={projects} />
    </section>
  );
};
