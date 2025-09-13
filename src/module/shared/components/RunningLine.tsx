const plateText = [
  "Fast",
  "Frontend",
  "Web Apps",
  "Landing",
  "E-Commerce",
  "Creative",
  "Responsive",
  "Portfolio",
  "Modern",
  "Dynamic",
  "Minimal",
  "Interactive",
];

import React from "react";

type Props = {
  main?: boolean;
};

export const RunningLine: React.FC<Props> = ({ main }) => {
  return (
    <div className={`absolute w-full ${main ? "bottom-0" : "-bottom-24 md:-bottom-40"}`}>
      <div className="relative flex gap-20 overflow-hidden items-center h-12 sm:h-14 text-[var(--color-background)] z-4">
        <div className="flex justify-center gap-20 animate-marquee">
          {plateText.map((text, index) => (
            <span key={index} className="text-xl whitespace-nowrap">
              {text}
            </span>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex justify-center gap-20 animate-marquee"
        >
          {plateText.map((text, index) => (
            <span key={`dup-${index}`} className="text-xl whitespace-nowrap">
              {text}
            </span>
          ))}
        </div>

        <div className="absolute left-0 top-0 w-2/4 h-full bg-gradient-to-l from-[var(--color-primary)] to-transparent pointer-events-none rounded-l-lg -z-1"></div>
        <div className="absolute right-0 top-0 w-2/4 h-full bg-gradient-to-r from-[var(--color-primary)] to-transparent pointer-events-none rounded-r-lg -z-1"></div>
      </div>
    </div>
  );
};
