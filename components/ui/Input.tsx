import * as React from "react";

import clsx from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: "light" | "dark"; 
  small?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, theme, small = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          "rounded-lg border-2 focus:outline-none focus:ring-4 group-data-[invalid=true]:focus:ring-primary-pink/50 focus:ring-tertiary-purple w-full disabled:cursor-not-allowed",
          className,
          {
            "bg-white border-gray-15 text-gray-15 placeholder:text-gray-ac":
              theme === "light" || !theme,
            "bg-gray-15 border-gray-50 text-white placeholder:text-gray-a4":
              theme === "dark",
            "px-2 py-1 leading-6 text-sm": small,
            "px-4 py-2 leading-7": !small
          }
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
