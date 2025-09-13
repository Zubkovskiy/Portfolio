import { useNavigate } from "react-router";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4 text-center px-4">
      <h1 className="text-9xl font-bold text-[var(--color-primary)]">404</h1>
      <h2 className="text-4xl">
        Oops! <span className="text-[var(--color-primary)]">Page Not Found</span>
      </h2>
      <p className="w-1/5 opacity-60">
        The page you are looking for cannot be found. Take a break and try again
        later.
      </p>
      <button
        className="mt-4 px-4 py-2 border border-[var(--color-primary)] rounded-xl hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] duration-300 transition-colors cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};
