"use client";

import clsx from "clsx";
import { AnimatedNumber } from "./AnimatedNumber";

interface B2CReturnsDisplayProps {
  isB2C: boolean;
  roi: number;
  expectedRevenue: number;
  netGain: number;
  expectedCustomers: number;
  trafficIncrease: number;
  currency: string;
}

export function B2CReturnsDisplay({
  isB2C,
  roi,
  expectedRevenue,
  netGain,
  expectedCustomers,
  trafficIncrease,
  currency
}: B2CReturnsDisplayProps) {
  return (
    <div
      className={clsx("flex-1", {
        hidden: !isB2C
      })}
    >
      <div className="flex flex-col p-2 bg-primary-blue rounded-xl">
        <div className="flex justify-center pt-8">
          <div className="text-8xl font-black text-white text-center">
            <AnimatedNumber value={roi} format="multiplier" decimals={2} />
          </div>
        </div>
        <span className="font-bold text-center tracking-wider text-tertiary-blue">
          Total projected ROI
        </span>
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col xl:grid xl:grid-cols-2 gap-2 mt-8">
          <div className="bg-tertiary-blue rounded-lg w-full py-1">
            <h3 className="py-2 px-4 text-lg font-semibold">
              Overall gains
            </h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-t border-secondary-blue border-dashed">
                  <td className="py-2 px-4">Projected revenue:</td>
                  <td className="text-right py-2 px-4">
                    <AnimatedNumber
                      value={expectedRevenue}
                      format="currency"
                      currency={currency}
                    />
                  </td>
                </tr>
                <tr className="border-t border-secondary-blue border-dashed">
                  <td className="py-2 px-4">Net gain:</td>
                  <td className="text-right py-2 px-4">
                    <AnimatedNumber
                      value={netGain}
                      format="currency"
                      currency={currency}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-tertiary-blue rounded-lg w-full py-1">
            <h3 className="py-2 px-4 text-lg font-semibold">
              Overall growth
            </h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-t border-secondary-blue border-dashed">
                  <td className="py-2 px-4">Projected customers:</td>
                  <td className="text-right py-2 px-4">
                    <AnimatedNumber value={expectedCustomers} format="number" />
                  </td>
                </tr>
                <tr className="border-t border-secondary-blue border-dashed">
                  <td className="py-2 px-4">Projected traffic growth:</td>
                  <td className="text-right py-2 px-4">
                    <AnimatedNumber value={trafficIncrease} format="number" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
