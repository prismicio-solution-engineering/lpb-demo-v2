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

interface AbmProductionFormProps {
  accountsTarget: number;
  decisionMakersPerAccount: number;
  writerHoursPerPage: number;
  writerHourlyRate: number;
  manualCostPerPage: number;
  currency: string;
  exchangeRate: number;
  onAccountsTargetChange: (value: number) => void;
  onDecisionMakersChange: (value: number) => void;
  onWriterHoursPerPageChange: (value: number) => void;
  onWriterHourlyRateChange: (value: number) => void;
}

const WRITER_HOURLY_RATE_MIN_USD = 30;
const WRITER_HOURLY_RATE_MAX_USD = 200;

export function AbmProductionForm({
  accountsTarget,
  decisionMakersPerAccount,
  writerHoursPerPage,
  writerHourlyRate,
  manualCostPerPage,
  currency,
  exchangeRate,
  onAccountsTargetChange,
  onDecisionMakersChange,
  onWriterHoursPerPageChange,
  onWriterHourlyRateChange
}: AbmProductionFormProps) {
  const [accountsInput, handleAccountsChange] = useNumberInput(
    accountsTarget,
    onAccountsTargetChange
  );
  const [dmInput, handleDmChange] = useNumberInput(
    decisionMakersPerAccount,
    onDecisionMakersChange
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
    <div className="flex flex-col gap-4 mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="abm-decision-makers"
            className="flex-1 !mb-0 flex items-center gap-2 font-semibold"
          >
            Number of decision makers
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                Most of the time you are dealing with more than one decision maker. Since each might have different metrics to look out for, we recommend one page version per decision maker.
              </TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="number"
            min={1}
            id="abm-decision-makers"
            value={dmInput}
            onChange={(e) => handleDmChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="abm-accounts-target"
            className="flex-1 !mb-0 flex items-center gap-2 font-semibold"
          >
            Number of accounts
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                Please insert the total number of accounts you are planning to reach. In case you do not have the same amount of decision makers per account, you can use 1 account only and sum up the total of decision makers.
              </TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="number"
            min={1}
            id="abm-accounts-target"
            value={accountsInput}
            onChange={(e) => handleAccountsChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-gray-F7 rounded-lg py-4">
        <div className="flex flex-col gap-3 px-4">
          <Label className="flex-1 !mb-0 flex items-center gap-2 font-semibold">
            Total hours spent per page
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                This should be the total number of hours spent by your writer or sales person to have the approved version ready for publication, including account based research and data compilation.
              </TooltipContent>
            </Tooltip>
          </Label>
          <Slider
            min={2.5}
            max={10}
            value={[writerHoursPerPage]}
            onValueChange={(values) => onWriterHoursPerPageChange(values[0])}
            theme="light"
            background={false}
            numberWidth="w-10"
            numberSuffix="h"
            trackBg="bg-gray-EE"
            rangeBg="bg-gradient-to-r from-tertiary-purple to-primary-purple"
            step={0.5}
          />
        </div>
        <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-gray-EE px-4">
          <Label className="flex-1 !mb-0 flex items-center gap-2 font-semibold">
            Hourly cost for the writer
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                If you have more than one person contributing use the sum of the hourly fees of all of them. Otherwise simply put the hourly fee of the copywriter.
              </TooltipContent>
            </Tooltip>
          </Label>
          <Slider
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
            trackBg="bg-gray-EE"
          />
        </div>
        <div className="flex justify-between items-center gap-2 mt-2 pt-4 border-t border-gray-EE px-4">
          <span className="font-semibold">Manual cost per page:</span>
          <span className="font-medium">
            {formatCurrency(manualCostPerPage, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
