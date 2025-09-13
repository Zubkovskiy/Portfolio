export const LeftPanel = () => {
  return (
    <div className="fixed left-0 top-0 flex flex-col justify-between items-center w-20 2xl:w-30 h-screen border-r text-[rgba(246,248,226,0.5)] py-7 z-90 bg-[var(--color-background)]">
      <label className="flex  flex-col gap-2 w-8 mx-auto cursor-pointer">
        <input className="peer hidden" type="checkbox" />
        <div className="rounded-2xl h-[3px] w-1/2 bg-[var(--color-primary)] duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]"></div>
        <div className="rounded-2xl h-[3px] w-full bg-[var(--color-primary)] duration-500 peer-checked:-rotate-45"></div>
        <div className="rounded-2xl h-[3px] w-1/2 bg-[var(--color-primary)] duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]"></div>
      </label>
      <ul className="flex flex-col gap-8">
        <li>
          <a href="https://t.me/z_b_s" target="_blank">
            <div className="bg-[url('/img/icons/telegram.svg')] w-6 h-6 bg-no-repeat bg-contain cursor-pointer hover:scale-150 transition-transform duration-300" />
          </a>
        </li>
        <li>
          <a href="https://github.com/Zubkovskiy" target="_blank">
            <div className="bg-[url('/img/icons/git.svg')] w-6 h-6 bg-no-repeat bg-contain cursor-pointer hover:scale-150 transition-transform duration-300" />
          </a>
        </li>
      </ul>
    </div>
  );
};
