"use client";

import type { ComponentProps } from "react";
import clsx from "clsx";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useNumberInput } from "../hooks/useNumberInput";
import { getCurrencySymbol } from "../utils/format";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/Tooltip";
import { InfoIcon } from "lucide-react";

function PercentNumberInput({
  className,
  ...props
}: Omit<ComponentProps<typeof Input>, "type">) {
  return (
    <div className="relative">
      <Input type="number" className={clsx("!pr-10", className)} {...props} />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-15/65 select-none"
      >
        %
      </span>
    </div>
  );
}

interface AbmFunnelFormProps {
  engagedTargetPercent: number;
  engagedToOppPercent: number;
  averageDealSize: number;
  winRatePercent: number;
  currency: string;
  onEngagedTargetPercentChange: (value: number) => void;
  onEngagedToOppPercentChange: (value: number) => void;
  onAverageDealSizeChange: (value: number) => void;
  onWinRatePercentChange: (value: number) => void;
}

export function AbmFunnelForm({
  engagedTargetPercent,
  engagedToOppPercent,
  averageDealSize,
  winRatePercent,
  currency,
  onEngagedTargetPercentChange,
  onEngagedToOppPercentChange,
  onAverageDealSizeChange,
  onWinRatePercentChange
}: AbmFunnelFormProps) {
  const dealCurrencySymbol = getCurrencySymbol(currency);

  const [engagedInput, handleEngagedChange] = useNumberInput(
    engagedTargetPercent,
    onEngagedTargetPercentChange
  );
  const [oppInput, handleOppChange] = useNumberInput(
    engagedToOppPercent,
    onEngagedToOppPercentChange
  );
  const [dealInput, handleDealChange] = useNumberInput(
    averageDealSize,
    onAverageDealSizeChange
  );
  const [winInput, handleWinChange] = useNumberInput(
    winRatePercent,
    onWinRatePercentChange
  );

  return (
    <div>
      <h3 className="text-[#151515] text-2xl-tight lg:text-3xl-tight font-medium mt-1 wrap-balance">
        Engaged target accounts (%)
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="abm-engaged-pct"
            className="flex-1 !mb-0 flex items-center gap-2 font-semibold"
          >
            Engaged target accounts
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                This is the number of high-priority accounts within the ICP that are actively interacting with the brand or product.
              </TooltipContent>
            </Tooltip>
          </Label>
          <PercentNumberInput
            min={0}
            max={100}
            id="abm-engaged-pct"
            value={engagedInput}
            onChange={(e) => handleEngagedChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="abm-engaged-opp"
            className="flex-1 !mb-0 flex items-center gap-2 font-semibold"
          >
            Engaged accounts → opportunity
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                This is the percentage of engaged accounts that successfully transition into a qualified sales opportunity for the customer.
              </TooltipContent>
            </Tooltip>
          </Label>
          <PercentNumberInput
            min={0}
            max={100}
            id="abm-engaged-opp"
            value={oppInput}
            onChange={(e) => handleOppChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="abm-deal-size"
            className="flex-1 !mb-0 flex items-center gap-2 font-semibold"
          >
            Average deal size
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                Please insert the average revenue value of your closed deels.
              </TooltipContent>
            </Tooltip>
          </Label>
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-15/65 select-none"
            >
              {dealCurrencySymbol}
            </span>
            <Input
              type="number"
              min={0}
              id="abm-deal-size"
              className="!pl-9"
              value={dealInput}
              onChange={(e) => handleDealChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="abm-win-rate"
            className="flex-1 !mb-0 flex items-center gap-2 font-semibold"
          >
            Win rate
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                Please insert the percentage of opportunities in the customers pipeline that are successfully closed.
              </TooltipContent>
            </Tooltip>
          </Label>
          <PercentNumberInput
            min={0}
            max={100}
            id="abm-win-rate"
            value={winInput}
            onChange={(e) => handleWinChange(e.target.value)}
          />
        </div>
      </div>
    </div>

  );
}
