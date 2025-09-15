import { useEffect, useState } from "react";
import { HomeSection } from "./components/HomeSection";
import { SkillsSection } from "./components/SkillsSection";
import { AboutMe } from "./components/AboutMe";

export const HomePage = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await fetch(
        `${import.meta.env.BASE_URL}/api/skills.json`
      );
      const data = await response.json();

      setSkills(data);
    };

    fetchSkills();
  }, []);

  return (
    <div className="relative">
      <HomeSection />
      <SkillsSection skills={skills} />
      <AboutMe />
    </div>
  );
};
