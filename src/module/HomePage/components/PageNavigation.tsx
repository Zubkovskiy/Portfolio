export const PageNavigation = () => {
  return (
    <ul className="fixed left-46 top-1/2 flex flex-col gap-8 z-80">
      <li className="text-lg cursor-pointer leading-none hover:text-[var(--color-primary)] transition-colors duration-300 ease-in">About</li>
      <li className="text-lg cursor-pointer opacity-50 leading-none hover:opacity-100 hover:text-[var(--color-primary)] transition-colors duration-300 ease-in">Skills</li>
    </ul>
  );
};
