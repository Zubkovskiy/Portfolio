import classNames from "classnames";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { RunningLine } from "../../shared/components/RunningLine";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(
      "hover:text-[var(--color-primary)] hover:opacity-100 text-2xl transition-colors duration-300 ease-in",
      { "opacity-100": isActive, "opacity-50": !isActive }
    );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <div
        className={classNames(
          "sticky flex justify-between items-center w-full h-10 sm:h-15 py-6 sm:py-4 px-4 sm:px-8 rounded-2xl z-[100] transition-all duration-600",
          scrolled
            ? "top-2 sm:top-4 backdrop-blur-md bg-[var(--color-primary)]/4 shadow-md"
            : "top-2 sm:top-3 bg-transparent"
        )}
        id="header"
      >
        <NavLink
          to="/"
          className="text-3xl font-bold text-primary leading-[0] cursor-pointer"
        >
          ZBS
        </NavLink>

        <ul className="space-x-6 hidden md:flex">
          <li>
            <NavLink className={getNavLinkClass} to="/">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className={getNavLinkClass} to="/projects">
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink className={getNavLinkClass} to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col gap-2 w-8 ml-auto cursor-pointer z-[110]"
        >
          <div
            className={classNames(
              "rounded-2xl h-[3px] w-1/2 bg-[var(--color-primary)] duration-500",
              menuOpen &&
                "rotate-[225deg] origin-right -translate-x-[12px] -translate-y-[1px]"
            )}
          ></div>
          <div
            className={classNames(
              "rounded-2xl h-[3px] w-full bg-[var(--color-primary)] duration-500",
              menuOpen && "-rotate-45"
            )}
          ></div>
          <div
            className={classNames(
              "rounded-2xl h-[3px] w-1/2 bg-[var(--color-primary)] duration-500 place-self-end",
              menuOpen &&
                "rotate-[225deg] origin-left translate-x-[12px] translate-y-[1px]"
            )}
          ></div>
        </button>
      </div>

      <div className="fixed inset-0 z-[90] pointer-events-none">
        <div
          className={classNames(
            "absolute inset-0 bg-[var(--color-primary)] transform transition-transform duration-500",
            menuOpen ? "translate-x-0 delay-0" : "translate-x-full delay-200"
          )}
        ></div>

        <div
          className={classNames(
            "absolute inset-0 bg-[var(--color-background)] transform transition-transform duration-500",
            menuOpen ? "translate-x-0 delay-200" : "translate-x-full delay-0"
          )}
        ></div>
      </div>

      <aside
        className={classNames(
          "fixed top-0 right-0 w-full h-full z-[95] flex justify-center items-center transform transition-transform duration-500",
          menuOpen ? "translate-x-0 delay-260" : "translate-x-full delay-0"
        )}
      >
        <nav className="flex flex-col justify-center items-center gap-6 text-3xl">
          <NavLink
            className={getNavLinkClass}
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            className={getNavLinkClass}
            to="/projects"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            className={getNavLinkClass}
            to="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
        </nav>

        <RunningLine main />
      </aside>
    </>
  );
  // return (
  //   <>
  //     <div
  //       className={classNames(
  //         "sticky flex justify-between items-center w-full h-15 py-4 px-8 rounded-2xl z-[100] transition-all duration-600",
  //         scrolled
  //           ? "top-4 backdrop-blur-md bg-[var(--color-primary)]/4 shadow-md"
  //           : "top-3 bg-transparent"
  //       )}
  //       id="header"
  //     >
  //       <NavLink
  //         to="/"
  //         className="text-3xl font-bold text-primary leading-[0] cursor-pointer"
  //       >
  //         ZBS
  //       </NavLink>

  //       <ul className="space-x-6 hidden md:flex">
  //         <li>
  //           <NavLink className={getNavLinkClass} to="/">
  //             About
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink className={getNavLinkClass} to="/projects">
  //             Projects
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink className={getNavLinkClass} to="/contact">
  //             Contact
  //           </NavLink>
  //         </li>
  //       </ul>

  //       <button
  //         onClick={() => setMenuOpen((prev) => !prev)}
  //         className="md:hidden flex flex-col gap-2 w-8 ml-auto cursor-pointer z-[110]"
  //       >
  //         <div
  //           className={classNames(
  //             "rounded-2xl h-[3px] w-1/2 bg-[var(--color-primary)] duration-500",
  //             menuOpen &&
  //               "rotate-[225deg] origin-right -translate-x-[12px] -translate-y-[1px]"
  //           )}
  //         ></div>
  //         <div
  //           className={classNames(
  //             "rounded-2xl h-[3px] w-full bg-[var(--color-primary)] duration-500",
  //             menuOpen && "-rotate-45"
  //           )}
  //         ></div>
  //         <div
  //           className={classNames(
  //             "rounded-2xl h-[3px] w-1/2 bg-[var(--color-primary)] duration-500 place-self-end",
  //             menuOpen &&
  //               "rotate-[225deg] origin-left translate-x-[12px] translate-y-[1px]"
  //           )}
  //         ></div>
  //       </button>
  //     </div>

  //     <div className="fixed inset-0 z-[90] pointer-events-none">
  //       <div
  //         className={classNames(
  //           "absolute inset-0 bg-[var(--color-primary)] transform transition-transform duration-500",
  //           menuOpen ? "translate-x-0 delay-0" : "translate-x-full delay-200"
  //         )}
  //       ></div>

  //       <div
  //         className={classNames(
  //           "absolute inset-0 bg-[var(--color-background)] transform transition-transform duration-500",
  //           menuOpen ? "translate-x-0 delay-200" : "translate-x-full delay-0"
  //         )}
  //       ></div>
  //     </div>

  //     <aside
  //       className={classNames(
  //         "fixed top-0 right-0 w-full h-full z-[95] flex justify-center items-center transform transition-transform duration-500",
  //         menuOpen ? "translate-x-0 delay-260" : "translate-x-full delay-0"
  //       )}
  //     >
  //       <nav className="flex flex-col justify-center items-center gap-6 text-3xl">
  //         <NavLink
  //           className={getNavLinkClass}
  //           to="/"
  //           onClick={() => setMenuOpen(false)}
  //         >
  //           About
  //         </NavLink>
  //         <NavLink
  //           className={getNavLinkClass}
  //           to="/projects"
  //           onClick={() => setMenuOpen(false)}
  //         >
  //           Projects
  //         </NavLink>
  //         <NavLink
  //           className={getNavLinkClass}
  //           to="/contact"
  //           onClick={() => setMenuOpen(false)}
  //         >
  //           Contact
  //         </NavLink>
  //       </nav>

  //       <RunningLine main />
  //     </aside>
  //   </>
  // );
};
