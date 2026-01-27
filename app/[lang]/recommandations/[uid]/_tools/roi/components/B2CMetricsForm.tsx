"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import clsx from "clsx";
import { useNumberInput } from "../hooks/useNumberInput";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/Tooltip";

interface B2CMetricsFormProps {
  isB2C: boolean;
  numberOfNewPages: number;
  b2cBaselineOrganicTraffic: number;
  b2cProjectedAdditionalTrafficPerPage: number;
  b2cWebsiteConversionRate: number;
  averageBasket: number;
  onNumberOfNewPagesChange: (value: number) => void;
  onB2CBaselineOrganicTrafficChange: (value: number) => void;
  onB2CProjectedAdditionalTrafficPerPageChange: (value: number) => void;
  onB2CWebsiteConversionRateChange: (value: number) => void;
  onAverageBasketChange: (value: number) => void;
}

export function B2CMetricsForm({
  isB2C,
  numberOfNewPages,
  b2cBaselineOrganicTraffic,
  b2cProjectedAdditionalTrafficPerPage,
  b2cWebsiteConversionRate,
  averageBasket,
  onNumberOfNewPagesChange,
  onB2CBaselineOrganicTrafficChange,
  onB2CProjectedAdditionalTrafficPerPageChange,
  onB2CWebsiteConversionRateChange,
  onAverageBasketChange
}: B2CMetricsFormProps) {
  const [
    b2cBaselineOrganicTrafficInput,
    handleB2CBaselineOrganicTrafficChange
  ] = useNumberInput(
    b2cBaselineOrganicTraffic,
    onB2CBaselineOrganicTrafficChange
  );
  const [numberOfNewPagesInput, handleNumberOfNewPagesChange] = useNumberInput(
    numberOfNewPages,
    onNumberOfNewPagesChange
  );
  const [
    b2cProjectedAdditionalTrafficPerPageInput,
    handleB2CProjectedAdditionalTrafficPerPageChange
  ] = useNumberInput(
    b2cProjectedAdditionalTrafficPerPage,
    onB2CProjectedAdditionalTrafficPerPageChange
  );
  const [b2cWebsiteConversionRateInput, handleB2CWebsiteConversionRateChange] =
    useNumberInput(b2cWebsiteConversionRate, onB2CWebsiteConversionRateChange);
  const [averageBasketInput, handleAverageBasketChange] = useNumberInput(
    averageBasket,
    onAverageBasketChange
  );

  return (
    <div
      className={clsx({
        hidden: !isB2C
      })}
    >
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="b2c-baseline-organic-traffic"
            className="flex-1 !mb-0 flex items-center gap-2"
          >
            Organic traffic: average views per page
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>You can use overall or monthly average views for high-performing pages or all of your pages. You choose the focus. Just make sure to use the same focus for all metrics to achieve more accurate predictions.</TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="number"
            placeholder="Enter baseline organic traffic"
            id="b2c-baseline-organic-traffic"
            value={b2cBaselineOrganicTrafficInput}
            onChange={(e) =>
              handleB2CBaselineOrganicTrafficChange(e.target.value)
            }
          />
        </div>
        {/* <div className="flex flex-col gap-3">
          <Label htmlFor="b2c-number-of-new-pages" className="flex-1 !mb-0">
            Number of new pages
          </Label>
          <Input
            type="number"
            placeholder="Enter number of new pages"
            id="b2c-number-of-new-pages"
            value={numberOfNewPagesInput}
            onChange={(e) => handleNumberOfNewPagesChange(e.target.value)}
          />
        </div> */}
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="b2c-projected-additional-traffic-per-page"
            className="flex-1 !mb-0 flex items-center gap-2"
          >
            Projected traffic: above average views
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>Here you can experiment. This metric adds to your overall gains in relation to your savings. Feel free to play around for prospecting.</TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="number"
            placeholder="Enter projected additional traffic per page"
            id="b2c-projected-additional-traffic-per-page"
            value={b2cProjectedAdditionalTrafficPerPageInput}
            onChange={(e) =>
              handleB2CProjectedAdditionalTrafficPerPageChange(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="b2c-website-conversion-rate"
            className="flex-1 !mb-0 flex items-center gap-2"
          >
            Average web-conversion rate
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>Here you can add either your average conversion rate across your website or for specific landing pages. This metric also allows you to play around. Feel free to insert your expected minimum first to establish your baseline.</TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="number"
            placeholder="Enter website conversion rate"
            id="b2c-website-conversion-rate"
            value={b2cWebsiteConversionRateInput}
            onChange={(e) =>
              handleB2CWebsiteConversionRateChange(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="average-basket"
            className="flex-1 !mb-0 flex items-center gap-2"
          >
            Average client purchase value
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>This should be an overall average per sale of your products or services. To establish a healthy baseline, insert the lowest average first, especially if you have a lot of parallel campaigns running.</TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="number"
            placeholder="Enter average basket"
            id="average-basket"
            value={averageBasketInput}
            onChange={(e) => handleAverageBasketChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
