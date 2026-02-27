"use client";

import { useRoiCalculator } from "../hooks/useRoiCalculator";
import { ContentProductionForm } from "./ContentProductionForm";
import { CurrencySelector } from "./CurrencySelector";
import { B2BMetricsForm } from "./B2BMetricsForm";
import { B2CMetricsForm } from "./B2CMetricsForm";
import { CostSavingsDisplay } from "./CostSavingsDisplay";
import { B2BReturnsDisplay } from "./B2BReturnsDisplay";
import { B2CReturnsDisplay } from "./B2CReturnsDisplay";
import { Switch } from "@/components/ui/Switch";
import clsx from "clsx";
import { isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { i } from "motion/react-client";

interface RoiCalculatorProps {
  className?: string;
  cardHeading?: RichTextField;
  cardSubheading?: RichTextField;
  initialData?: {
    costPerPage?: number;
  };
}

export function DefaultRoiCalculator({ className, cardHeading, cardSubheading, initialData }: RoiCalculatorProps) {
  const { state, calculations, currency, exchangeRate, setters } =
    useRoiCalculator(initialData);

  const handleMetricsChange = (isB2C: boolean) => {
    setters.setIsB2C(isB2C);
  };

  return (
    <div className={clsx("container flex flex-col md:flex-row gap-2 mt-8", className)}>
      <div className="flex-1 md:p-6 flex flex-col relative min-w-0">
        <div className="flex flex-row justify-between items-start">
          <div className="max-w-xs flex flex-col gap-2">
            {isFilled.richText(cardHeading) ? (
              <div className="text-[#151515] text-2xl-tight lg:text-3xl-tight 2xl:text-4xl font-medium mt-1 wrap-balance">
                <PrismicRichText field={cardHeading} />
              </div>
            ) : (
              <h3 className="text-[#151515] text-2xl-tight lg:text-3xl-tight 2xl:text-4xl font-medium mt-1 wrap-balance">
                For website content
              </h3>
            )}
            {isFilled.richText(cardSubheading) ? (
              <div className="mt-2 max-w-lg text-[#505050]">
                <PrismicRichText field={cardSubheading} />
              </div>
            ) : (
              <p className="mt-2 max-w-lg text-[#505050]">
                Insert your estimation for new pages for your growth period.
              </p>
            )}
          </div>
          <CurrencySelector
            currency={currency}
            onCurrencyChange={setters.setCurrency}
          />
        </div>
        <ContentProductionForm
          numberOfNewPages={state.numberOfNewPages}
          writerHoursPerPage={state.writerHoursPerPage}
          writerHourlyRate={state.writerHourlyRate}
          estimatedTimeSavings={state.estimatedTimeSavings}
          currency={currency}
          exchangeRate={exchangeRate}
          onNumberOfNewPagesChange={setters.setNumberOfNewPages}
          onWriterHoursPerPageChange={setters.setWriterHoursPerPage}
          onWriterHourlyRateChange={setters.setWriterHourlyRate}
          onEstimatedTimeSavingsChange={setters.setEstimatedTimeSavings}
        />
        <div className="flex items-center justify-between mt-12">
          <h3 className="mt-1 text-xl font-semibold text-gray-900">
            {state.isB2C ? "B2C " : "B2B "}
            Metrics
          </h3>
          <div className="py-1 px-2 bg-quaternary-blue rounded-lg border-2 border-gray-15 w-[145px]">
            <Switch
              theme="light"
              value={!state.isB2C}
              setValue={(value) => handleMetricsChange(!value)}
              options={["B2C", "B2B"]}
              screenReaderLabel="Toggle metrics type"
              trueExplainer=""
              size="sm"
              color="blue"
            />
          </div>
        </div>
        <B2BMetricsForm
          isB2B={!state.isB2C}
          numberOfNewPages={state.numberOfNewPages}
          b2bBaselineOrganicTraffic={state.b2bBaselineOrganicTraffic}
          b2bProjectedAdditionalTrafficPerPage={
            state.b2bProjectedAdditionalTrafficPerPage
          }
          b2bWebsiteConversionRate={state.b2bWebsiteConversionRate}
          leadToSQLRate={state.leadToSQLRate}
          sqlToCustomerRate={state.sqlToCustomerRate}
          acv={state.acv}
          onNumberOfNewPagesChange={setters.setNumberOfNewPages}
          onB2BBaselineOrganicTrafficChange={
            setters.setB2BBaselineOrganicTraffic
          }
          onB2BProjectedAdditionalTrafficPerPageChange={
            setters.setB2BProjectedAdditionalTrafficPerPage
          }
          onB2BWebsiteConversionRateChange={setters.setB2BWebsiteConversionRate}
          onLeadToSQLRateChange={setters.setLeadToSQLRate}
          onSqlToCustomerRateChange={setters.setSqlToCustomerRate}
          onAcvChange={setters.setAcv}
        />
        <B2CMetricsForm
          isB2C={state.isB2C}
          numberOfNewPages={state.numberOfNewPages}
          b2cBaselineOrganicTraffic={state.b2cBaselineOrganicTraffic}
          b2cProjectedAdditionalTrafficPerPage={
            state.b2cProjectedAdditionalTrafficPerPage
          }
          b2cWebsiteConversionRate={state.b2cWebsiteConversionRate}
          averageBasket={state.averageBasket}
          onNumberOfNewPagesChange={setters.setNumberOfNewPages}
          onB2CBaselineOrganicTrafficChange={
            setters.setB2CBaselineOrganicTraffic
          }
          onB2CProjectedAdditionalTrafficPerPageChange={
            setters.setB2CProjectedAdditionalTrafficPerPage
          }
          onB2CWebsiteConversionRateChange={setters.setB2CWebsiteConversionRate}
          onAverageBasketChange={setters.setAverageBasket}
        />
      </div>
      <div className="flex-1 flex flex-col gap-2 md:p-6 mt-6 md:mt-0 min-w-0">
        <CostSavingsDisplay
          savings={calculations.savings}
          savingsPerPage={calculations.savingsPerPage}
          manualCost={calculations.manualCost}
          totalCost={calculations.totalCost}
          currency={currency}
        />
        <B2BReturnsDisplay
          isB2B={!state.isB2C}
          roi={calculations.b2bRoi}
          expectedRevenue={calculations.b2bExpectedCustomersValue}
          netGain={calculations.b2bMinutToolCost}
          expectedCustomers={calculations.b2bExpectedCustomers}
          trafficIncrease={
            calculations.b2bTotalTrafficAfterCreatingPages -
            state.b2bBaselineOrganicTraffic
          }
          currency={currency}
        />
        <B2CReturnsDisplay
          isB2C={state.isB2C}
          roi={calculations.b2cRoi}
          expectedRevenue={calculations.b2cExpectedCustomersValue}
          netGain={calculations.b2cMinutToolCost}
          expectedCustomers={calculations.b2cExpectedCustomers}
          trafficIncrease={
            calculations.b2cTotalTrafficAfterCreatingPages -
            state.b2cBaselineOrganicTraffic
          }
          currency={currency}
        />
      </div>
    </div>
  );
}
