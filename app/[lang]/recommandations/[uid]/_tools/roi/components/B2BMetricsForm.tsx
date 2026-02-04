"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import clsx from "clsx";
import { useNumberInput } from "../hooks/useNumberInput";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/Tooltip";
import { InfoIcon } from "lucide-react";

interface B2BMetricsFormProps {
  isB2B: boolean;
  numberOfNewPages: number;
  b2bBaselineOrganicTraffic: number;
  b2bProjectedAdditionalTrafficPerPage: number;
  b2bWebsiteConversionRate: number;
  leadToSQLRate: number;
  sqlToCustomerRate: number;
  acv: number;
  onNumberOfNewPagesChange: (value: number) => void;
  onB2BBaselineOrganicTrafficChange: (value: number) => void;
  onB2BProjectedAdditionalTrafficPerPageChange: (value: number) => void;
  onB2BWebsiteConversionRateChange: (value: number) => void;
  onLeadToSQLRateChange: (value: number) => void;
  onSqlToCustomerRateChange: (value: number) => void;
  onAcvChange: (value: number) => void;
}

export function B2BMetricsForm({
  isB2B,
  numberOfNewPages,
  b2bBaselineOrganicTraffic,
  b2bProjectedAdditionalTrafficPerPage,
  b2bWebsiteConversionRate,
  leadToSQLRate,
  sqlToCustomerRate,
  acv,
  onNumberOfNewPagesChange,
  onB2BBaselineOrganicTrafficChange,
  onB2BProjectedAdditionalTrafficPerPageChange,
  onB2BWebsiteConversionRateChange,
  onLeadToSQLRateChange,
  onSqlToCustomerRateChange,
  onAcvChange
}: B2BMetricsFormProps) {
  const [
    b2bBaselineOrganicTrafficInput,
    handleB2BBaselineOrganicTrafficChange
  ] = useNumberInput(
    b2bBaselineOrganicTraffic,
    onB2BBaselineOrganicTrafficChange
  );
  const [numberOfNewPagesInput, handleNumberOfNewPagesChange] = useNumberInput(
    numberOfNewPages,
    onNumberOfNewPagesChange
  );
  const [
    b2bProjectedAdditionalTrafficPerPageInput,
    handleB2BProjectedAdditionalTrafficPerPageChange
  ] = useNumberInput(
    b2bProjectedAdditionalTrafficPerPage,
    onB2BProjectedAdditionalTrafficPerPageChange
  );
  const [b2bWebsiteConversionRateInput, handleB2BWebsiteConversionRateChange] =
    useNumberInput(b2bWebsiteConversionRate, onB2BWebsiteConversionRateChange);
  const [leadToSQLRateInput, handleLeadToSQLRateChange] = useNumberInput(
    leadToSQLRate,
    onLeadToSQLRateChange
  );
  const [sqlToCustomerRateInput, handleSqlToCustomerRateChange] =
    useNumberInput(sqlToCustomerRate, onSqlToCustomerRateChange);
  const [acvInput, handleAcvChange] = useNumberInput(acv, onAcvChange);

  return (
    <div
      className={clsx({
        hidden: !isB2B
      })}
    >
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="b2b-baseline-organic-traffic"
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
            id="b2b-baseline-organic-traffic"
            value={b2bBaselineOrganicTrafficInput}
            onChange={(e) =>
              handleB2BBaselineOrganicTrafficChange(e.target.value)
            }
          />
        </div>
        {/* <div className="flex flex-col gap-3">
          <Label htmlFor="b2b-number-of-new-pages" className="flex-1 !mb-0">
            Number of new pages
          </Label>
          <Input
            type="number"
            placeholder="Enter number of new pages"
            id="b2b-number-of-new-pages"
            value={numberOfNewPagesInput}
            onChange={(e) => handleNumberOfNewPagesChange(e.target.value)}
          />
        </div> */}
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="b2b-projected-additional-traffic-per-page"
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
            id="b2b-projected-additional-traffic-per-page"
            value={b2bProjectedAdditionalTrafficPerPageInput}
            onChange={(e) =>
              handleB2BProjectedAdditionalTrafficPerPageChange(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="b2b-website-conversion-rate"
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
            id="b2b-website-conversion-rate"
            value={b2bWebsiteConversionRateInput}
            onChange={(e) =>
              handleB2BWebsiteConversionRateChange(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="lead-to-sql-rate"
            className="flex-1 !mb-0 flex items-center gap-2"
          >
            Lead-to-SQL rate
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>Please insert your average Lead-to-SQL rate. It is a reliable indicator helping to refine your overall content strategy, including production decisions.</TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="number"
            placeholder="Enter lead-to-SQL rate"
            id="lead-to-sql-rate"
            value={leadToSQLRateInput}
            onChange={(e) => handleLeadToSQLRateChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="b2b-estimated-sql-per-month"
            className="flex-1 !mb-0 flex items-center gap-2"
          >
            SQL-to-Conversion rate
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>Please insert your average rate of sales qualified leads that convert to actual customers. It will allow to refine projections, especially if you aim to compare rates with website conversion.</TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="number"
            placeholder="Enter SQL-to-Customer rate"
            id="b2b-estimated-sql-per-month"
            value={sqlToCustomerRateInput}
            onChange={(e) => handleSqlToCustomerRateChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="acv" className="flex-1 !mb-0 flex items-center gap-2">
            ACV
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>Please insert an average or total, by product or service or for all of your sales. You can easily obtain projections with different focus points, depending on the chosen metric.</TooltipContent>
            </Tooltip>
          </Label>
          <Input
            type="number"
            placeholder="Enter ACV"
            id="acv"
            value={acvInput}
            onChange={(e) => handleAcvChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
