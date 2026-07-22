"use client";

import { useEffect, useRef, useState } from "react";

import { PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/Chart";
import { useAnimatedNumber } from "./AnimatedNumber";

interface AbmCostSavingsDisplayProps {
  savings: number;
  savingsPerPage: number;
  manualCost: number;
  currency: string;
}

export function AbmCostSavingsDisplay({
  savings,
  savingsPerPage,
  manualCost,
  currency
}: AbmCostSavingsDisplayProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartContainerWidth, setChartContainerWidth] = useState(0);
  const animatedSavings = useAnimatedNumber(savings, "currency", currency);
  const animatedSavingsPerPage = useAnimatedNumber(
    savingsPerPage,
    "currency",
    currency
  );

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
      savings,
      manualCost,
      background: 0
    }
  ];

  const chartConfig = {
    savings: { label: "Savings" },
    manualCost: { label: "Manual Cost" },
    background: { label: "Background" }
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
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
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
                fill="url(#abmColorGradient)"
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
                <linearGradient
                  id="abmColorGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#75DCC0" />
                  <stop offset="100%" stopColor="#3BBB96" />
                </linearGradient>
              </defs>
            </RadialBarChart>
          </ChartContainer>
        </div>
        <div 
          className="flex flex-col gap-0 justify-center items-center relative z-10"
          style={{
            marginTop: -(chartContainerWidth * 0.25) 
          }}
        >
          <div className="font-semibold text-base md:text-sm lg:text-base">
            Annual cost savings
          </div>
          <div className="text-4xl sm:text-5xl md:text-3xl lg:text-6xl tracking-tighter font-black text-primary-green">
            {animatedSavings}
          </div>
          <div className="font-semibold text-base md:text-sm lg:text-base pt-2 mt-2 border-t border-primary-green border-dashed">
            Per page
          </div>
          <div className="text-primary-green font-black text-2xl">
            {animatedSavingsPerPage}
          </div>
        </div>
      </div>
    </div>
  );
}
