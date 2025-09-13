import classNames from "classnames";
import { useEffect, useState } from "react";

type Field = "username" | "email" | "phone" | "message";

type FormData = {
  username: string;
  email: string;
  phone: string;
  message: string;
};

type Focused = {
  username: boolean;
  email: boolean;
  phone: boolean;
  message: boolean;
};

export const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    message: "",
  });

  const [focused, setFocused] = useState<Focused>({
    username: false,
    email: false,
    phone: false,
    message: false,
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleInputChange = (field: Field, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFocus = (field: Field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field: Field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const isLabelUp = (field: Field) => {
    return focused[field] || formData[field];
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/mvgbdeap", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ username: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full md:w-xl shadow-wrapper rounded-4xl p-4 sm:p-6 backdrop-blur-md shadow-md"
    >
      <p className="text-2xl">
        Let's work{" "}
        <span className="font-bold text-[var(--color-primary)]">together.</span>
      </p>

      <div className="relative">
        <input
          required
          type="text"
          name="username"
          autoComplete="off"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          onFocus={() => handleFocus("username")}
          onBlur={() => handleBlur("username")}
          className={classNames(
            "w-full border-[1.5px] rounded-2xl bg-transparent p-4 text-base transition-[border] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
            "focus:outline-none",
            focused.username || formData.username
              ? "border-[var(--color-primary)]"
              : "border-[#9e9e9e]"
          )}
        />
        <label
          className={classNames(
            "absolute left-[15px] pointer-events-none transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isLabelUp("username")
              ? "-translate-y-1/2 scale-75 bg-[var(--color-background)] px-1 text-[var(--color-primary)] top-0"
              : "translate-y-4 top-0"
          )}
        >
          Name
        </label>
      </div>

      <div className="flex flex-col sm:flex-row w-full justify-between gap-4">
        <div className="relative w-full">
          <input
            required
            type="email"
            name="email"
            autoComplete="off"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            className={classNames(
              "w-full border-[1.5px] rounded-2xl bg-transparent p-4 text-base transition-[border] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
              "focus:outline-none",
              focused.email || formData.email
                ? "border-[var(--color-primary)]"
                : "border-[#9e9e9e]"
            )}
          />
          <label
            className={classNames(
              "absolute left-[15px] pointer-events-none transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
              isLabelUp("email")
                ? "-translate-y-1/2 scale-75 bg-[var(--color-background)] px-1 text-[var(--color-primary)] top-0"
                : "translate-y-4 top-0"
            )}
          >
            Email
          </label>
        </div>

        <div className="relative w-full">
          <input
            type="tel"
            name="phone"
            autoComplete="off"
            pattern="^\+?[0-9\s\-()]{7,}$"
            placeholder=""
            value={formData.phone ?? ""}
            onChange={(e) =>
              handleInputChange("phone" as Field, e.target.value)
            }
            onFocus={() => handleFocus("phone" as Field)}
            onBlur={() => handleBlur("phone" as Field)}
            className={classNames(
              "w-full border-[1.5px] rounded-2xl bg-transparent p-4 text-base transition-[border] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
              "focus:outline-none",
              focused.phone || formData.phone
                ? "border-[var(--color-primary)]"
                : "border-[#9e9e9e]"
            )}
          />
          <label
            className={classNames(
              "absolute left-[15px] pointer-events-none transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
              focused.phone || formData.phone
                ? "-translate-y-1/2 scale-75 bg-[var(--color-background)] px-1 text-[var(--color-primary)] top-0"
                : "translate-y-4 top-0"
            )}
          >
            Phone
          </label>
        </div>
      </div>

      <div className="relative">
        <textarea
          required
          name="message"
          autoComplete="off"
          rows={4}
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          onFocus={() => handleFocus("message")}
          onBlur={() => handleBlur("message")}
          className={classNames(
            "w-full border-[1.5px] rounded-2xl bg-transparent p-4 text-base resize-none transition-[border] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
            "focus:outline-none",
            focused.message || formData.message
              ? "border-[var(--color-primary)]"
              : "border-[#9e9e9e]"
          )}
        />
        <label
          className={classNames(
            "absolute left-[15px] pointer-events-none transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isLabelUp("message")
              ? "-translate-y-1/2 scale-75 bg-[var(--color-background)] px-1 text-[var(--color-primary)] top-0"
              : "translate-y-4 top-0"
          )}
        >
          Message
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative w-full bg-[var(--color-primary)] text-[var(--color-background)] 
                 font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 
                 disabled:opacity-50 overflow-visible cursor-pointer hover:scale-103"
      >
        {status === "loading" ? "Sending..." : "Send"}

        <span
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-3 
                   bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 
                   blur-xl transition-all duration-500 rounded-full"
        ></span>
      </button>

      {status === "success" && (
        <div
          role="alert"
          className="animate-fadeIn bg-green-900 border-l-4 border-green-700 text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-800 transform hover:scale-105"
        >
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 flex-shrink-0 mr-2 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
          <p className="text-xs font-semibold">
            Success - Everything went smoothly!
          </p>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="animate-fadeIn bg-red-900 border-l-4 border-red-700 text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-800 transform hover:scale-105"
        >
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 flex-shrink-0 mr-2 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
          <p className="text-xs font-semibold">Error - Something went wrong.</p>
        </div>
      )}
    </form>
  );
};
