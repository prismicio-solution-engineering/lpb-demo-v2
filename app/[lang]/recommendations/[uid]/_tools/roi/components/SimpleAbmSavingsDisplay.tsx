"use client";

import { AnimatedNumber } from "./AnimatedNumber";

interface SimpleAbmSavingsDisplayProps {
  savingsPerPage: number;
  totalSavings: number;
  totalPages: number;
  currency: string;
}

export function SimpleAbmSavingsDisplay({
  savingsPerPage,
  totalSavings,
  totalPages,
  currency
}: SimpleAbmSavingsDisplayProps) {
  return (
    <div className="flex flex-col gap-10 justify-top lg:rounded-tl-xl border-t-2 lg:border-l-2 border-gray-15 bg-gradient-to-r from-gray-F7 to-gray-EE p-6 xl:p-12 text-white mt-6 lg:mt-0">
      <div className="flex flex-col gap-2">
        <span className="text-primary-purple font-medium text-base">
          Total savings with AI supported production:
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
          Total number of pages you want to create:
        </span>
        <AnimatedNumber
          value={totalPages}
          format="number"
          className="text-6xl sm:text-8xl lg:text-6xl xl:text-8xl leading-none font-black text-gray-15"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-primary-purple font-medium text-base">
          Savings per page:
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
