import { RunningLine } from "../../shared/components/RunningLine";

type SkillsProps = {
  skills: Array<{
    name: string;
    img: string;
  }>;
};

export const SkillsSection: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section className="relative flex flex-col items-center mt-10 md:mt-20">
      <h2 className="text-2xl font-bold text-center">Skills</h2>
      <ul className="flex flex-wrap justify-center xl:w-2/3 mt-8 sm:mt-10 md:mt-20 gap-x-8 md:gap-x-10 lg:md:gap-x-16 gap-y-8 list-inside text-lg mx-auto">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="group relative flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 w-24 sm:w-38 h-36 sm:h-50 
             backdrop-blur-md bg-[var(--color-primary)]/4 shadow-md rounded-2xl sm:rounded-4xl 
             border-b-8 border-[var(--color-primary)] font-bold text-xl 
             transition-all hover:scale-105 duration-300"
          >
            <img src={skill.img} alt={skill.name} className="h-12 sm:h-20" />
            <p className="text-center text-base">{skill.name}</p>

            <span
              className="absolute bottom-0 left-0 w-full h-4 
                   bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 
                   blur-md transition-opacity duration-300 rounded-b-5xl"
            ></span>
          </li>
        ))}
      </ul>
      <RunningLine />
    </section>
  );
};
