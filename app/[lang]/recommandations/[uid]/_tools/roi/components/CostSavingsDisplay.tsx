"use client";

import { useEffect, useRef, useState } from "react";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/Chart";
import { useAnimatedNumber, AnimatedNumber } from "./AnimatedNumber";

interface CostSavingsDisplayProps {
  savings: number;
  savingsPerPage: number;
  manualCost: number;
  totalCost: number;
  currency: string;
}

export function CostSavingsDisplay({
  savings,
  savingsPerPage,
  manualCost,
  totalCost,
  currency
}: CostSavingsDisplayProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartContainerWidth, setChartContainerWidth] = useState(0);
  const animatedSavings = useAnimatedNumber(savings, "currency", currency);
  const animatedSavingsPerPage = useAnimatedNumber(savingsPerPage, "currency", currency);

  useEffect(() => {
    function handleResize() {
      if (chartContainerRef.current) {
        setChartContainerWidth(chartContainerRef.current.clientWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const chartData = [
    {
      savings: savings,
      manualCost: manualCost,
      background: 0
    }

  ];

  const chartConfig = {
    savings: {
      label: "Savings"
    },
    manualCost: {
      label: "Manual Cost"
    },
    background: {
      label: "Background"
    }
  } satisfies ChartConfig;

  return (
    <div className="bg-quaternary-green rounded-xl p-2 border border-tertiary-green">
      <div className="relative">
        <div
          className="relative overflow-hidden w-full"
          style={{
            height: chartContainerWidth / 2
          }}
        >
          <ChartContainer
            ref={chartContainerRef}
            config={chartConfig}
            style={{
              height: chartContainerWidth,
              marginBottom: -chartContainerWidth / 2
            }}
            className="mx-auto w-full max-w-[380px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={180}
              endAngle={0}
              innerRadius={chartContainerWidth / 2.2 - 20}
              outerRadius={chartContainerWidth / 2.2}
              barSize={10}
            >
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                {/* <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 80}
                            className="fill-muted-foreground font-bold text-base"
                          >
                            Total savings
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 40}
                            className="fill-primary-green text-4xl lg:text-5xl font-black"
                          >
                            {animatedSavings}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 10}
                            className="fill-muted-foreground font-bold text-lg"
                          >
                            <tspan className="fill-primary-green">{animatedSavingsPerPage}</tspan>/page
                          </tspan>
                        </text>
                      );
                    }
                  }}
                /> */}
              </PolarRadiusAxis>
              <RadialBar
                dataKey="background"
                fill="#D4F2E9"
                stackId="c"
                cornerRadius={2}
                barSize={2}
                background={{ fill: "#D4F2E9" }}
              />
              <RadialBar
                dataKey="savings"
                stackId="a"
                fill="url(#colorGradient)"
                cornerRadius={4}
                background={{ fill: "#D4F2E9" }}
              />
              <RadialBar
                dataKey="manualCost"
                fill="#D4F2E9"
                stackId="a"
                cornerRadius={4}
              />
              <RadialBar
                dataKey="background"
                fill="#D4F2E9"
                stackId="b"
                cornerRadius={2}
                barSize={2}
                background={{ fill: "#D4F2E9" }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#75DCC0" />
                  <stop offset="100%" stopColor="#3BBB96" />
                </linearGradient>
              </defs>
            </RadialBarChart>
          </ChartContainer>
        </div>
        <div className="flex flex-col gap-0 justify-center items-center -mt-[100px] md:-mt-[80px] lg:-mt-[100px]">
          <div className="font-bold text-base md:text-sm lg:text-base">
            Total savings
          </div>
          <div className="text-4xl sm:text-5xl md:text-3xl lg:text-6xl tracking-tighter font-black text-primary-green">
            {animatedSavings}
          </div>
          <div className="font-bold text-base md:text-sm lg:text-base pt-2 mt-2 border-t border-primary-green border-dashed">
            Per page
          </div>
          <div className="text-primary-green font-black text-2xl">{animatedSavingsPerPage}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-8">
        <div className="bg-tertiary-green rounded-lg w-full py-1">
          <h3 className="py-2 px-4 text-lg font-semibold">
            Cost overview
          </h3>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-t border-secondary-green border-dashed">
                <td className="py-2 px-4">Cost manual page production:</td>
                <td className="text-right py-2 px-4">
                  <AnimatedNumber
                    value={manualCost}
                    format="currency"
                    currency={currency}
                  />
                </td>
              </tr>
              <tr className="border-t border-secondary-green border-dashed">
                <td className="py-2 px-4">Cost AI supported page production:</td>
                <td className="text-right py-2 px-4">
                  <AnimatedNumber
                    value={totalCost}
                    format="currency"
                    currency={currency}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="bg-tertiary-green rounded-lg w-full py-1">
          <Heading size="sm" as="h3" className="py-2 px-4">
            Savings overview for AI supporte production
          </Heading>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-t border-secondary-green border-dashed">
                <td className="font-bold py-2 px-4">Savings per page:</td>
                <td className="text-right py-2 px-4">
                  <AnimatedNumber
                    value={savingsPerPage}
                    format="currency"
                    currency={currency}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}
