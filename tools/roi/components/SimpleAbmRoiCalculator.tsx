"use client";

import { useAbmSimpleRoiCalculator } from "../hooks/useAbmSimpleRoiCalculator";
import { SimpleAbmRoiForm } from "./SimpleAbmRoiForm";
import { CurrencySelector } from "./CurrencySelector";
import { SimpleAbmSavingsDisplay } from "./SimpleAbmSavingsDisplay";
import clsx from "clsx";
import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

interface SimpleAbmRoiCalculatorProps {
  className?: string;
  cardHeading?: RichTextField;
  cardSubheading?: RichTextField;
}

export function SimpleAbmRoiCalculator({
  className,
  cardHeading,
  cardSubheading
}: SimpleAbmRoiCalculatorProps) {
  const { state, calculations, currency, exchangeRate, setters } =
    useAbmSimpleRoiCalculator();

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
                <PrismicRichText 
                  field={cardHeading}
                  components={{
                        heading3: ({ children }) => (
                          <h3 className="text-[#151515] text-2xl-tight lg:text-3xl-tight font-medium mt-1 wrap-balance">
                            {children}
                          </h3>
                        ),
                      }}
                />
              ) : (
                <h3 className="text-[#151515] text-2xl-tight lg:text-3xl-tight font-medium mt-1 wrap-balance">
                  Account based page variations
                </h3>
              )}
              <CurrencySelector
                currency={currency}
                onCurrencyChange={setters.setCurrency}
                hasBg={false}
              />
            </div>
            {isFilled.richText(cardSubheading) ? (
              <PrismicRichText 
                field={cardSubheading}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mt-2 max-w-lg text-[#505050]">
                      {children}
                    </p>
                  ),
                }}
              />
            ) : (
              <p className="mt-2 max-w-lg text-[#505050]">
                Simply add the number for your accounts and how many decision
                makers you are planning to reach. We do the rest.
              </p>
            )}
          </div>
          <SimpleAbmRoiForm
            accountsTarget={state.accountsTarget}
            decisionMakersPerAccount={state.decisionMakersPerAccount}
            writerHoursPerPage={state.writerHoursPerPage}
            writerHourlyRate={state.writerHourlyRate}
            currency={currency}
            exchangeRate={exchangeRate}
            onAccountsTargetChange={setters.setAccountsTarget}
            onDecisionMakersChange={setters.setDecisionMakersPerAccount}
            onWriterHoursPerPageChange={setters.setWriterHoursPerPage}
            onWriterHourlyRateChange={setters.setWriterHourlyRate}
          />
        </div>
        <SimpleAbmSavingsDisplay
          savingsPerPage={calculations.savingsPerPage}
          totalSavings={calculations.totalSavings}
          totalPages={calculations.pages}
          currency={currency}
        />
      </div>
    </div>
  );
}
