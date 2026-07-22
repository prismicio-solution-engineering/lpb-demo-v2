"use client";

import {
  motion,
  useSpring,
  useTransform,
  useMotionValueEvent
} from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatMultiplier
} from "../utils/format";
import clsx from "clsx";

interface AnimatedNumberProps {
  value: number;
  format?: "currency" | "percentage" | "number" | "multiplier";
  currency?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  format = "number",
  currency = "USD",
  decimals = 2,
  className
}: AnimatedNumberProps) {
  // Calculate formatted string length to determine animation speed
  const formattedLength = useMemo(() => {
    const rounded = format === "percentage" || format === "multiplier" ? value : Math.round(value);
    let formatted: string;
    switch (format) {
      case "currency":
        formatted = formatCurrency(rounded, currency);
        break;
      case "percentage":
        formatted = formatPercentage(value, decimals);
        break;
      case "multiplier":
        formatted = formatMultiplier(value, decimals);
        break;
      case "number":
        formatted = formatNumber(rounded);
        break;
      default:
        formatted = rounded.toLocaleString();
    }
    return formatted.length;
  }, [value, format, currency, decimals]);

  // Adaptive spring config: faster for longer formatted strings
  // All numbers get a fast base speed, with extra speed for very long strings
  const stiffness =
    formattedLength > 12 ? 250 : formattedLength > 9 ? 200 : 150;
  const mass = formattedLength > 12 ? 0.3 : formattedLength > 9 ? 0.4 : 0.5;
  const spring = useSpring(value, { mass, stiffness, damping: 20 });
  const display = useTransform(spring, (current) => {
    const rounded = format === "percentage" || format === "multiplier" ? current : Math.round(current);

    switch (format) {
      case "currency":
        return formatCurrency(rounded, currency);
      case "percentage":
        return formatPercentage(current, decimals);
      case "multiplier":
        return formatMultiplier(current, decimals);
      case "number":
        return formatNumber(rounded);
      default:
        return rounded.toLocaleString();
    }
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span
      className={clsx("tracking-tight", className)}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {display}
    </motion.span>
  );
}

/**
 * Hook for getting animated number value as a string (useful for SVG text elements)
 */
export function useAnimatedNumber(
  value: number,
  format: "currency" | "percentage" | "number" | "multiplier" = "number",
  currency: string = "USD",
  decimals: number = 2
): string {
  // Calculate formatted string length to determine animation speed
  const formattedLength = useMemo(() => {
    const rounded = format === "percentage" || format === "multiplier" ? value : Math.round(value);
    let formatted: string;
    switch (format) {
      case "currency":
        formatted = formatCurrency(rounded, currency);
        break;
      case "percentage":
        formatted = formatPercentage(value, decimals);
        break;
      case "multiplier":
        formatted = formatMultiplier(value, decimals);
        break;
      case "number":
        formatted = formatNumber(rounded);
        break;
      default:
        formatted = rounded.toLocaleString();
    }
    return formatted.length;
  }, [value, format, currency, decimals]);

  // Adaptive spring config: faster for longer formatted strings
  // All numbers get a fast base speed, with extra speed for very long strings
  const stiffness =
    formattedLength > 12 ? 250 : formattedLength > 9 ? 200 : 150;
  const mass = formattedLength > 12 ? 0.3 : formattedLength > 9 ? 0.4 : 0.5;
  const spring = useSpring(value, { mass, stiffness, damping: 20 });
  const [display, setDisplay] = useState<string>(() => {
    const rounded = format === "percentage" || format === "multiplier" ? value : Math.round(value);
    switch (format) {
      case "currency":
        return formatCurrency(rounded, currency);
      case "percentage":
        return formatPercentage(value, decimals);
      case "multiplier":
        return formatMultiplier(value, decimals);
      case "number":
        return formatNumber(rounded);
      default:
        return rounded.toLocaleString();
    }
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useMotionValueEvent(spring, "change", (current) => {
    const rounded = format === "percentage" || format === "multiplier" ? current : Math.round(current);

    switch (format) {
      case "currency":
        setDisplay(formatCurrency(rounded, currency));
        break;
      case "percentage":
        setDisplay(formatPercentage(current, decimals));
        break;
      case "multiplier":
        setDisplay(formatMultiplier(current, decimals));
        break;
      case "number":
        setDisplay(formatNumber(rounded));
        break;
      default:
        setDisplay(rounded.toLocaleString());
    }
  });

  return display;
}
