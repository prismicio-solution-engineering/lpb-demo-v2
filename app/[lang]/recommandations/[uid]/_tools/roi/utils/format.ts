/**
 * Formatting utility functions for the ROI calculator
 */

/**
 * Formats a number as currency
 * @param value - The number to format
 * @param currency - The currency code (default: "USD")
 * @param options - Optional Intl.NumberFormat options
 * @returns Formatted currency string (e.g., "$1,000" or "€1,000")
 */
export function formatCurrency(
  value: number,
  currency: string = "USD",
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  // Determine locale based on currency for better formatting
  const localeMap: Record<string, string> = {
    USD: "en-US",
    EUR: "de-DE"
  };

  const locale = localeMap[currency] || "en-US";

  return value.toLocaleString(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? 0
  });
}

/**
 * Formats a number with thousand separators
 * @param value - The number to format
 * @param options - Optional formatting options
 * @returns Formatted number string (e.g., "1,000")
 */
export function formatNumber(
  value: number,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits
  });
}

/**
 * Formats a number as a percentage
 * @param value - The number to format (e.g., 25.5 for 25.5%)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string (e.g., "25.50%")
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Formats a percentage value as a multiplier (e.g., 500% becomes "5x")
 * @param value - The percentage value to format (e.g., 500 for 500%)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted multiplier string (e.g., "5.00x")
 */
export function formatMultiplier(value: number, decimals: number = 2): string {
  const multiplier = value / 100;
  return `${multiplier.toFixed(decimals)}x`;
}

/**
 * Converts a USD value to another currency and rounds it to a nice number
 * @param usdValue - The value in USD
 * @param exchangeRate - The exchange rate from USD to target currency
 * @returns Rounded value in target currency
 */
export function convertAndRoundCurrency(
  usdValue: number,
  exchangeRate: number
): number {
  if (exchangeRate === 1) {
    return usdValue;
  }

  const convertedValue = usdValue * exchangeRate;

  // Round to nice numbers based on magnitude
  const magnitude = Math.floor(Math.log10(Math.max(convertedValue, 1)));

  // Determine rounding step based on magnitude and value
  let step: number;
  if (magnitude >= 3) {
    // For values >= 1000, round to nearest 100, 250, 500, or 1000
    if (convertedValue < 2500) {
      step = 100;
    } else if (convertedValue < 5000) {
      step = 250;
    } else if (convertedValue < 10000) {
      step = 500;
    } else {
      step = 1000;
    }
  } else if (magnitude >= 2) {
    // For values >= 100, round to nearest 10, 25, 50, or 100
    if (convertedValue < 250) {
      step = 10;
    } else if (convertedValue < 500) {
      step = 25;
    } else if (convertedValue < 1000) {
      step = 50;
    } else {
      step = 100;
    }
  } else if (magnitude >= 1) {
    // For values >= 10, round to nearest 5 or 10
    step = convertedValue < 50 ? 5 : 10;
  } else if (magnitude >= 0) {
    // For values >= 1, round to nearest 1 or 5
    step = convertedValue < 5 ? 1 : 5;
  } else {
    // For values < 1, round to nearest 0.1 or 0.5
    step = convertedValue < 0.5 ? 0.1 : 0.5;
  }

  return Math.round(convertedValue / step) * step;
}
