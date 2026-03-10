"use client";

import { useCallback, useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";
import { useNumberInput } from "../hooks/useNumberInput";
import { formatCurrency, convertAndRoundCurrency } from "../utils/format";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/Tooltip";
import { InfoIcon } from "lucide-react";

interface ContentProductionFormProps {
  numberOfNewPages: number;
  writerHoursPerPage: number;
  writerHourlyRate: number;
  estimatedTimeSavings: number;
  currency: string;
  exchangeRate: number;
  onNumberOfNewPagesChange: (value: number) => void;
  onWriterHoursPerPageChange: (value: number) => void;
  onWriterHourlyRateChange: (value: number) => void;
  onEstimatedTimeSavingsChange: (value: number) => void;
}

const WRITER_HOURLY_RATE_MIN_USD = 30;
const WRITER_HOURLY_RATE_MAX_USD = 200;

export function ContentProductionForm({
  numberOfNewPages,
  writerHoursPerPage,
  writerHourlyRate,
  estimatedTimeSavings,
  currency,
  exchangeRate,
  onNumberOfNewPagesChange,
  onWriterHoursPerPageChange,
  onWriterHourlyRateChange,
  onEstimatedTimeSavingsChange
}: ContentProductionFormProps) {
  const [numberOfNewPagesInput, handleNumberOfNewPagesChange] = useNumberInput(
    numberOfNewPages,
    onNumberOfNewPagesChange
  );

  const formatCurrencyValue = useCallback(
    (value: number) => formatCurrency(value, currency),
    [currency]
  );

  const writerHourlyRateMin = useMemo(
    () => convertAndRoundCurrency(WRITER_HOURLY_RATE_MIN_USD, exchangeRate),
    [exchangeRate]
  );

  const writerHourlyRateMax = useMemo(
    () => convertAndRoundCurrency(WRITER_HOURLY_RATE_MAX_USD, exchangeRate),
    [exchangeRate]
  );

  return (
    <div>
      <div className="flex flex-col gap-4 mt-12">
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="number-of-new-pages"
            className="flex-1 !mb-0 flex items-center gap-2"
          >
            Estimated volume in pages
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>We assume that you have an overall cost associated per page produced. The main cost we focus on is the actual production of the content. You simply add how many new pages you think you will launch.</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="number"
            min={1}
            placeholder="Enter number of new pages"
            id="number-of-new-pages"
            value={numberOfNewPagesInput}
            onChange={(e) => handleNumberOfNewPagesChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 bg-gray-f7 rounded-lg py-4">
          <div className="flex flex-col gap-3 px-4">
            <Label
              htmlFor="number-of-new-pages"
              className="flex-1 !mb-0 flex items-center gap-2"
            >
              Total hours spent per page
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  This can include SEO research, competitor research and the actual writing of the content. It should be the total number of hours spent by your writer to have the approved version ready for publication.
                </TooltipContent>
              </Tooltip>
            </Label>
            <Slider
              id="writer-hours-per-page"
              min={2.5}
              max={10}
              value={[writerHoursPerPage]}
              onValueChange={(values) => onWriterHoursPerPageChange(values[0])}
              theme="light"
              background={false}
              numberWidth="w-10"
              numberSuffix="h"
              trackBg="bg-gray-ee"
              rangeBg="bg-gradient-to-r from-tertiary-purple to-primary-purple"
              step={0.5}
            />
          </div>
          <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-gray-ee px-4">
            <Label
              htmlFor="writer-hourly-rate"
              className="flex-1 !mb-0 flex items-center gap-2"
            >
              Hourly cost for the researcher or writer
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>This can include SEO research, competitor research and the actual writing of the content. It should be the total number of hours spent by your writer to have the approved version ready for publication.</TooltipContent>
              </Tooltip>
            </Label>
            <Slider
              id="writer-hourly-rate"
              min={writerHourlyRateMin}
              max={writerHourlyRateMax}
              value={[writerHourlyRate]}
              onValueChange={(values) => onWriterHourlyRateChange(values[0])}
              theme="light"
              background={false}
              numberWidth="w-10"
              formatValue={formatCurrencyValue}
              step={5}
              rangeBg="bg-gradient-to-r from-tertiary-purple to-primary-purple"
              trackBg="bg-gray-ee"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mt-2 pt-4 border-t border-gray-ee px-4">
            <span className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Total per page:
            </span>
            <span className="block leading-none font-bold h-4">
              {formatCurrency(writerHourlyRate * writerHoursPerPage, currency)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
