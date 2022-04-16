import React from "react";
import { useClassNames } from "hooks/useClassNames";

// export type ButtonTheme = Theme | "white";
type Theme = "primary" | "secondary" | "ghost";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Exotic {
  children: React.ReactNode;
  size?: Size;
  theme?: Theme;
  round?: boolean;
  outline?: boolean;
  borderless?: boolean;
}

const DEFAULT_BUTTON_TAG = "button" as const;

const Button = React.forwardRef(
  (
    {
      size = "md",
      theme = "primary",
      round = false,
      outline = false,
      borderless = false,
      className,
      as = DEFAULT_BUTTON_TAG,
      ...props
    }: ButtonProps,
    ref: React.Ref<HTMLElement>
  ) => {
    const classNames = useClassNames(() => {
      const base =
        "inline-flex items-center justify-center font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:filter disabled:contrast-75";

      const themes = {
        primary:
          "dark:text-black bg-emerald-300 dark:bg-emerald-400 hover:bg-emerald-200 focus:bg-emerald-200 dark:hover:bg-emerald-500 dark:focus:bg-emerald-500  focus:ring-emerald-500",
        secondary:
          "dark:text-black bg-yellow-300 dark:bg-yellow-400 hover:bg-yellow-200 focus:bg-yellow-200 dark:hover:bg-yellow-500 dark:focus:bg-yellow-500  focus:ring-yellow-500",
        ghost:
          "bg-transparent hover:bg-slate-100 hover:bg-opacity-30 focus:bg-slate-100 shadow-none focus:bg-opacity-30 focus:ring-slate-500",
      };
      const themeClass = themes[theme];

      const sizes = {
        xs: "py-1 px-2 text-xs rounded",
        sm: "py-1.5 px-3 text-sm rounded-md",
        md: "py-2 px-4 text-sm rounded-md",
        lg: "py-2 px-4 text-base rounded-md",
        xl: "py-2 px-4 md:py-3 md:px-6 text-lg rounded-md",
      };

      const roundClass = round ? `rounded-full` : "";
      const sizeClass = sizes[size];
      const outlineClass = outline ? "bg-transparent hover:bg-transparent border-2" : "";

      const borderlessClass = borderless
        ? "border-transparent hover:border-transparent shadow-none"
        : "";

      return [base, themeClass, sizeClass, roundClass, outlineClass, borderlessClass, className];
    }, [size, round, outline, className, borderless]);

    return React.createElement(as, {
      ref,
      className: classNames,
      ...props,
    });
  }
);

Button.displayName = "Button";

export { Button };
