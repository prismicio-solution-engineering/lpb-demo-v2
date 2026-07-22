"use client";

import { AnimatedNumber } from "./AnimatedNumber";

interface SimpleSavingsDisplayProps {
  savingsPerPage: number;
  totalSavings: number;
  currency: string;
}

export function SimpleSavingsDisplay({
  savingsPerPage,
  totalSavings,
  currency
}: SimpleSavingsDisplayProps) {
  return (
    <div className="flex flex-col gap-10 justify-top lg:rounded-tl-xl border-t-2 lg:border-l-2 border-gray-15 bg-gradient-to-r from-gray-f7 to-gray-ee p-6 xl:p-12 text-white mt-6 lg:mt-0">
      <div className="flex flex-col gap-2">
        <span className="text-primary-purple font-medium text-base">
          Total Savings with AI supported production:
        </span>
        <AnimatedNumber
          value={totalSavings}
          format="currency"
          currency={currency}
          className="text-6xl sm:text-8xl lg:text-6xl xl:text-8xl leading-none font-black text-gray-15"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-primary-purple font-medium text-base">
          That means per page you save:
        </span>
        <AnimatedNumber
          value={savingsPerPage}
          format="currency"
          currency={currency}
          className="text-6xl sm:text-8xl lg:text-6xl xl:text-8xl leading-none font-black text-gray-15"
        />
      </div>
    </div>
  );
}
