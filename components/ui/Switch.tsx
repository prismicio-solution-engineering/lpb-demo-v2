"use client";

import clsx from "clsx";

import { Switch as SwitchComponent } from "@headlessui/react";

type SwitchProps = {
  value: boolean | undefined;
  setValue: ((value: boolean) => void) | undefined;
  options?: string[];
  screenReaderLabel?: string;
  trueExplainer?: string;
  theme: "light" | "dark";
  size?: "sm" | "lg";
  color?: "purple" | "blue" | "green" | "pink" | "orange";
};

export const Switch = ({
  value,
  setValue,
  options = ["Monthly", "Annually"],
  trueExplainer = "(Save up to 25%)",
  screenReaderLabel = "Toggle billing",
  theme,
  size = "lg",
  color = "purple"
}: SwitchProps) => {
  return (
    <div
      className={clsx("flex items-center justify-center gap-2 flex-wrap", {
        "text-gray-50": theme === "light",
        "text-gray-a4": theme === "dark"
      })}
    >
      {options.length > 0 && (
        <span
          className={clsx({
            "text-sm font-bold": size === "sm"
          })}
        >
          {options[0]}
        </span>
      )}
      <SwitchComponent
        checked={value}
        onChange={setValue}
        className={clsx(
          "relative inline-flex items-center rounded-full border-2",
          {
            "h-8 w-[54px]": size === "lg",
            "h-6 w-[40px]": size === "sm",
            "bg-white": theme === "light",
            "bg-gray-1f": theme === "dark"
          }
        )}
      >
        <span className="sr-only">{screenReaderLabel}</span>
        <span
          className={clsx("inline-block transform rounded-full transition", {
            "h-6 w-6": size === "lg",
            "h-4 w-4": size === "sm",
            "bg-primary-purple": color === "purple",
            "bg-primary-blue": color === "blue",
            "bg-primary-green": color === "green",
            "bg-primary-pink": color === "pink",
            "bg-primary-orange": color === "orange",
            "translate-x-6": value && size === "lg",
            "translate-x-0.5": !value,
            "translate-x-[18px]": value && size === "sm"
          })}
        />
      </SwitchComponent>
      {options.length > 0 && (
        <span
          className={clsx("relative", {
            "text-sm font-bold": size === "sm"
          })}
        >
          {options[1]}
          {/* <span className="text-xs absolute -left-8 -right-8 text-center translate-y-full bottom-0 text-primary-purple font-semibold">
          {trueExplainer}
        </span> */}
        </span>
      )}
    </div>
  );
};
