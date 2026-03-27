"use client";

import clsx from "clsx";
import { AnimatedNumber } from "./AnimatedNumber";

interface AbmRoiReturnsDisplayProps {
  roiMultiplierForDisplay: number;
  incrementalRevenue: number;
  toolInvestment: number;
  currency: string;
  className?: string;
}

export function AbmRoiReturnsDisplay({
  roiMultiplierForDisplay,
  incrementalRevenue,
  toolInvestment,
  currency,
  className
}: AbmRoiReturnsDisplayProps) {
  return (
    <div className={clsx(className)}>
      <div className="flex flex-col p-2 bg-primary-blue rounded-xl">
        <div className="flex justify-center pt-8">
          <div className="text-8xl font-black text-white text-center">
            <AnimatedNumber
              value={roiMultiplierForDisplay}
              format="multiplier"
              decimals={2}
            />
          </div>
        </div>
        <span className="font-bold text-center tracking-wider text-tertiary-blue">
          Return on investment
        </span>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 mt-8">
          <div className="bg-tertiary-blue rounded-lg w-full py-1">
            <p className="py-2 px-4 text-lg font-semibold">
              Revenue
            </p>
            <div className="border-t border-secondary-blue border-dashed py-3 px-4 text-sm flex items-center justify-between">
              Incremental revenue:
              <AnimatedNumber
                value={incrementalRevenue}
                format="currency"
                currency={currency}
              />
            </div>
          </div>
          <div className="bg-tertiary-blue rounded-lg w-full py-1">
            <p className="py-2 px-4 text-lg font-semibold">
              Investments
            </p>
            <div className="border-t border-secondary-blue border-dashed py-3 px-4 text-sm flex items-center justify-between">
              Tool investment:
              <AnimatedNumber
                value={toolInvestment}
                format="currency"
                currency={currency}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
