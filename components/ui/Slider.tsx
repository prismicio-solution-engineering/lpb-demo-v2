"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import clsx from "clsx";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  theme?: "light" | "dark";
  background?: boolean;
  numberWidth?: string;
  numberSuffix?: string;
  numberPrefix?: string;
  formatValue?: (value: number) => string;
  trackBg?: string;
  rangeBg?: string;
}

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      theme = "dark",
      background = true,
      numberWidth,
      numberSuffix,
      numberPrefix,
      formatValue,
      value,
      trackBg = "bg-quaternary-purple",
      rangeBg = "bg-primary-purple",
      min = 0,
      max = 100,
      ...props
    },
    ref
  ) => {
    // Calculate the percentage for masking
    const currentValue = value?.[0] ?? min;
    const percentage = ((currentValue - min) / (max - min)) * 100;
    const clipPath = `inset(0 ${100 - percentage}% 0 0)`;

    return (
      <div
        className={clsx("w-full flex items-center gap-4", className, {
          "bg-gray-1f": theme === "dark" && background,
          "bg-white": theme === "light" && background,
          "bg-transparent": !background,
          "rounded-lg p-4": background
        })}
      >
        <SliderPrimitive.Root
          ref={ref}
          className="relative flex w-full touch-none select-none items-center"
          value={value}
          min={min}
          max={max}
          {...props}
        >
          <SliderPrimitive.Track
            className={clsx(
              "relative h-2 w-full grow overflow-hidden rounded-full",
              trackBg
            )}
          >
            <SliderPrimitive.Range
              className={clsx("absolute h-full w-full", rangeBg)}
              style={{ clipPath }}
            />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full border-2 border-white bg-primary-purple shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-purple disabled:pointer-events-none disabled:opacity-50" />
        </SliderPrimitive.Root>
        <span
          className={clsx("font-medium leading-none text-right", numberWidth)}
        >
          {numberPrefix}
          {formatValue ? formatValue(value?.[0] ?? 0) : value?.[0]}
          {numberSuffix}
        </span>
      </div>
    );
  }
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };