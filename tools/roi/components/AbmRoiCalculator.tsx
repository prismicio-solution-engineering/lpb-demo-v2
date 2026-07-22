"use client";

import { useAbmRoiCalculator } from "../hooks/useAbmRoiCalculator";
import { CurrencySelector } from "./CurrencySelector";
import { AbmProductionForm } from "./AbmProductionForm";
import { AbmFunnelForm } from "./AbmFunnelForm";
import { AbmCostSavingsDisplay } from "./AbmCostSavingsDisplay";
import { AbmRoiReturnsDisplay } from "./AbmRoiReturnsDisplay";
import { AbmRoiCta } from "./AbmRoiCta";
import clsx from "clsx";
import { isFilled, LinkField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

interface AbmRoiCalculatorProps {
  className?: string;
  cardHeading?: RichTextField;
  cardSubheading?: RichTextField;
  ctaTitle?: RichTextField;
  ctaText?: RichTextField;
  ctaLink?: LinkField;
}

export function AbmRoiCalculator({ className, cardHeading, cardSubheading, ctaTitle, ctaText, ctaLink }: AbmRoiCalculatorProps) {
  const { state, calculations, currency, exchangeRate, setters } =
    useAbmRoiCalculator();

  return (
    <div
      className={clsx(
        "container flex flex-col md:flex-row gap-2 mt-8",
        className
      )}
    >
      <div className="flex-1 md:p-6 flex flex-col relative">
        <div className="flex flex-row justify-between items-start">
          <div className="max-w-xs flex flex-col gap-2">
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
                For ABM pages
              </h3>
            )}

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
          <CurrencySelector
            currency={currency}
            onCurrencyChange={setters.setCurrency}
          />
        </div>
        <AbmProductionForm
          accountsTarget={state.accountsTarget}
          decisionMakersPerAccount={state.decisionMakersPerAccount}
          writerHoursPerPage={state.writerHoursPerPage}
          writerHourlyRate={state.writerHourlyRate}
          manualCostPerPage={calculations.manualCostPerPage}
          currency={currency}
          exchangeRate={exchangeRate}
          onAccountsTargetChange={setters.setAccountsTarget}
          onDecisionMakersChange={setters.setDecisionMakersPerAccount}
          onWriterHoursPerPageChange={setters.setWriterHoursPerPage}
          onWriterHourlyRateChange={setters.setWriterHourlyRate}
        />
        <AbmFunnelForm
          engagedTargetPercent={state.engagedTargetPercent}
          engagedToOppPercent={state.engagedToOppPercent}
          averageDealSize={state.averageDealSize}
          winRatePercent={state.winRatePercent}
          currency={currency}
          onEngagedTargetPercentChange={setters.setEngagedTargetPercent}
          onEngagedToOppPercentChange={setters.setEngagedToOppPercent}
          onAverageDealSizeChange={setters.setAverageDealSize}
          onWinRatePercentChange={setters.setWinRatePercent}
        />
      </div>
      <div className="flex-1 flex flex-col gap-2 md:p-6 mt-6 md:mt-0">
        <AbmCostSavingsDisplay
          savings={calculations.annualCostSavings}
          savingsPerPage={calculations.savingsPerPage}
          manualCost={calculations.manualCostTotal}
          currency={currency}
        />
        <AbmRoiReturnsDisplay
          roiMultiplierForDisplay={calculations.roiMultiplierForDisplay}
          incrementalRevenue={calculations.incrementalRevenue}
          toolInvestment={calculations.toolInvestment}
          currency={currency}
        />
        <AbmRoiCta
          ctaTitle={ ctaTitle }
          ctaText={ ctaText }
          ctaLink={ ctaLink }
        />
      </div>
    </div>
  );
}
