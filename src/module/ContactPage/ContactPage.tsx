import { ContactInfo } from "./components/ContactInfo";
import { Form } from "./components/Form";

export const ContactPage = () => {
  return (
    <div className="lg:h-[calc(100vh-4rem)] pt-10 md:pt-20 lg:pt-0 mb-30 lg:mb-0 flex flex-col gap-10 md:gap-20 items-center justify-center">
      <h1 className="text-4xl font-bold text-center">
        Contact <span className="text-[var(--color-primary)]">Me</span>
      </h1>

      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-14 md:gap-20 w-full">
        <ContactInfo />
        <Form />
      </div>
    </div>
  );
};
