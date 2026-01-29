"use client";

import { useSimpleRoiCalculator } from "../hooks/useSimpleRoiCalculator";
import { SimpleRoiForm } from "./SimpleRoiForm";
import { CurrencySelector } from "./CurrencySelector";
import { SimpleSavingsDisplay } from "./SimpleSavingsDisplay";
import clsx from "clsx";
import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

interface SimpleRoiCalculatorProps {
  className?: string;
  cardHeading?: RichTextField;
  cardSubheading?: RichTextField;
  initialData?: {
    costPerPage?: number;
  };
}

export function SimpleRoiCalculator({
  className,
  cardHeading,
  cardSubheading,
  initialData,
}: SimpleRoiCalculatorProps) {
  const { state, calculations, currency, exchangeRate, setters } =
    useSimpleRoiCalculator(initialData);

  return (
    <div className="container mt-12">
      <div
        className={clsx(
          "flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-12 bg-white rounded-xl pt-6 lg:pt-12 lg:pl-12 border-2 border-gray-15 overflow-hidden",
          className
        )}
      >
        <div className="relative px-6 lg:px-0 lg:pb-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-top justify-between">

              {isFilled.richText(cardHeading) ? (
                <div className="text-[#151515] text-2xl-tight lg:text-3xl-tight 2xl:text-4xl font-medium mt-1 wrap-balance">
                  <PrismicRichText field={cardHeading} />
                </div>
              ) : (
                <h3 className="text-[#151515] text-2xl-tight lg:text-3xl-tight 2xl:text-4xl font-medium mt-1 wrap-balance">
                  For website content
                </h3>
              )}
              
              <CurrencySelector
                currency={currency}
                onCurrencyChange={setters.setCurrency}
                hasBg={false}
              />
            </div>


            {isFilled.richText(cardSubheading) ? (
              <div className="mt-2 max-w-lg text-[#505050]">
                <PrismicRichText field={cardSubheading} />
              </div>
            ) : (
              <p className="mt-2 max-w-lg text-[#505050]">
                Based on your volume estimates.
              </p>
            )}
          </div>
          
          <SimpleRoiForm
            numberOfNewPages={state.numberOfNewPages}
            writerHoursPerPage={state.writerHoursPerPage}
            writerHourlyRate={state.writerHourlyRate}
            currency={currency}
            exchangeRate={exchangeRate}
            onNumberOfNewPagesChange={setters.setNumberOfNewPages}
            onWriterHoursPerPageChange={setters.setWriterHoursPerPage}
            onWriterHourlyRateChange={setters.setWriterHourlyRate}
          />
        </div>
        <SimpleSavingsDisplay
          savingsPerPage={calculations.savingsPerPage}
          totalSavings={calculations.totalSavings}
          currency={currency}
        />
      </div>
    </div>
  );
}