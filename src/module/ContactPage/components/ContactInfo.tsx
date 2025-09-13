export const ContactInfo = () => {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <h3 className="uppercase text-2xl">contact info</h3>

      <div className="flex flex-col gap-4 mt-8">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center h-10 w-10">
            <div className="absolute h-full w-full bg-[url(/img/icons/contact/gmail.svg)] bg-no-repeat bg-contain" />
          </div>
          
          <div>
            <p className="text-lg font-bold text-[var(--color-primary)] uppercase">
              mail us
            </p>
            <a
              href="mailto:zubkovvsbogdan@gmail.com"
              className="hover:text-[var(--color-primary)] duration-300"
            >
              zubkovvsbogdan@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center h-10 w-10">
            <div className="absolute h-full w-full bg-[url(/img/icons/contact/contact.svg)] bg-no-repeat bg-contain" />
          </div>
          <div>
            <p className="text-lg font-bold text-[var(--color-primary)] uppercase">
              contact us
            </p>
            <a
              href="tel:+380637781144"
              className="hover:text-[var(--color-primary)] duration-300"
            >
              +38 (063) 7781144
            </a>
          </div>
        </div>
      </div>

      <h3 className="uppercase text-2xl mt-8">social info</h3>

      <ul className="flex gap-8 mt-8">
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
