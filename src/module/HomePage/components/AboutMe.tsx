import { useState } from "react";

export const AboutMe = () => {
  const [readMore, setReadMore] = useState(false);

  return (
    <section
      className="relative flex flex-col items-center justify-center mt-40 md:mt-70 mb-20 sm:mb-30 px-3 sm:px-14 py-5 sm:py-10 rounded-3xl max-w-4xl mx-auto "
      style={{ boxShadow: "0 4px 24px 0 var(--color-primary)" }}
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 sm:mb-6 text-center tracking-tight">
        About Me
      </h2>
      <p className="mb-2 sm:mb-6 text-center text-lg sm:text-2xl max-w-2xl border-b-2 border-[var(--color-primary)]/40 pb-2 sm:border-none">
        I am a passionate Frontend developer with a great desire to create
        creative web applications and interactive user interfaces.
      </p>
      <div className="text-base sm:text-lg text-center duration-300 mx-auto opacity-80">
        <p className="mb-4 sm:mb-6">
          My path in web development began with studying HTML and CSS, where I
          immersed myself in creating aesthetically pleasing and intuitive web
          pages. I quickly realized that web development is not only technology,
          but also an art that allows me to express my creativity and interact
          with users. Then I expanded my skills by learning JavaScript and the
          React.js framework to build more complex and dynamic web applications.
          I am passionate about developing interactive features that enhance
          user experience, making it both immersive and convenient.
        </p>

        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            readMore ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="mb-4 sm:mb-6">
            I appreciate the opportunity to work in a team where we can share
            knowledge and ideas, as well as solve technical problems together. I
            believe that collaboration and feedback are key to success in
            development. I always strive for self-development and deepening my
            skills. I am ready to take on new challenges and learn new
            technologies to stay up to date with the latest trends in web
            development. My goal is not only to produce quality code, but also
            to strike a balance between functionality and visual impact. I aim
            to create web applications that solve user problems while providing
            a positive user experience.
          </p>
        </div>
      </div>

      <button
        className="flex items-center justify-center mx-auto border-2 w-30 sm:w-40 h-10 sm:h-12 border-[var(--color-primary)] rounded-lg text-xl font-semibold hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-colors duration-300 cursor-pointer"
        onClick={() => setReadMore(!readMore)}
      >
        {readMore ? "Hide" : "Read More"}
      </button>
    </section>
  );
};