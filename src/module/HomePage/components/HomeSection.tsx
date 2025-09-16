import { Link } from "react-router";
import { RunningLine } from "../../shared/components/RunningLine";

export const HomeSection = () => {
  return (
    <section className="relative h-[calc(100vh-3rem)] sm:h-[calc(100vh-3.75rem)] w-full flex flex-col justify-center items-center pb-12 sm:pb-14">
      <div className="relative">
        <img
          className="w-40 h-40 sm:w-60 sm:h-60 object-cover mx-auto rounded-full"
          src={`${import.meta.env.BASE_URL}/img/my-image.jpg`}
          alt="my image"
        />
        <span className="absolute -top-5 sm:top-0 -left-18 sm:-left-30 border p-1 sm:p-3 rounded-l-2xl rounded-tr-2xl border-[var(--color-text)] animate-emergence">
          Hello There!
        </span>
      </div>
      <h1 className="text-center mt-2 sm:mt-6 text-3xl sm:text-4xl font-bold">
        I'm Zubkovskiy Bohdan,
      </h1>
      <h2 className="mt-1 sm:mt-2.5 text-center text-2xl sm:text-4xl text-primary font-bold">
        Front-end Developer
      </h2>
      <p className="mt-2 sm:mt-8 mx-auto text-center text-md sm:text-2xl max-w-200 opacity-70">
        I am a ambitious Frontend developer with a great desire to create
        creative web applications and interactive user interfaces.
      </p>
      <Link
        to="contact"
        className="flex items-center justify-center mt-4 sm:mt-8 border-2 w-30 sm:w-40 h-10 sm:h-12 border-[var(--color-primary)] rounded-lg text-xl font-semibold hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-colors duration-300 cursor-pointer"
      >
        Let's Talk
      </Link>
      <RunningLine main />
    </section>
  );
};
