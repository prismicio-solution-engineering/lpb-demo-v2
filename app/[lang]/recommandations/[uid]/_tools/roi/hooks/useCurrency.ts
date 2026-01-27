"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface ExchangeRateCache {
  rate: number;
  timestamp: number;
}

interface CurrencyResponse {
  base: string;
  date: string;
  rate: number;
  currency: string;
}

export function useCurrency() {
  const [currency, setCurrency] = useState<string>("USD");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const previousCurrencyRef = useRef<string>("USD");
  const previousExchangeRateRef = useRef<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<Map<string, ExchangeRateCache>>(new Map());

  const fetchExchangeRate = useCallback(
    async (targetCurrency: string) => {
      // If USD, no conversion needed
      if (targetCurrency === "USD") {
        setExchangeRate(1);
        setError(null);
        return;
      }

      // Check cache first
      const cached = cache.get(targetCurrency);
      const now = Date.now();

      if (cached && now - cached.timestamp < CACHE_DURATION) {
        setExchangeRate(cached.rate);
        setError(null);
        return;
      }

      // Fetch from API
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/currency?base=USD&to=${targetCurrency}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch exchange rate: ${response.statusText}`
          );
        }

        const data: CurrencyResponse = await response.json();

        // Update cache
        const newCache = new Map(cache);
        newCache.set(targetCurrency, {
          rate: data.rate,
          timestamp: now
        });
        setCache(newCache);

        setExchangeRate(data.rate);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch exchange rate";
        setError(errorMessage);
        console.error("Error fetching exchange rate:", err);
        // Fallback to cached value if available, otherwise keep rate at 1
        if (cached) {
          setExchangeRate(cached.rate);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cache]
  );

  // Fetch exchange rate when currency changes
  useEffect(() => {
    // Only fetch if currency actually changed
    if (previousCurrencyRef.current !== currency) {
      // Store the OLD values before fetching new rate
      // previousCurrencyRef.current still has the old currency
      // exchangeRate is still the old rate (hasn't updated yet)
      previousExchangeRateRef.current = exchangeRate;
      
      // Now fetch the new exchange rate
      fetchExchangeRate(currency);
      
      // Update previous currency ref for next time (after state updates)
      // Use a ref callback or next tick to ensure this happens after conversion
      requestAnimationFrame(() => {
        previousCurrencyRef.current = currency;
      });
    }
  }, [currency, exchangeRate, fetchExchangeRate]);

  const convertFromUSD = useCallback(
    (amount: number): number => {
      if (currency === "USD") {
        return amount;
      }
      return amount * exchangeRate;
    },
    [currency, exchangeRate]
  );

  const convertBetweenCurrencies = useCallback(
    (amount: number): number => {
      const prevCurrency = previousCurrencyRef.current;
      const prevRate = previousExchangeRateRef.current;
      
      // If currency hasn't changed, no conversion needed
      if (prevCurrency === currency) {
        return amount;
      }

      // Convert from previous currency to USD, then to new currency
      // If previous currency was USD, rate is 1
      const fromUSDRate = prevCurrency === "USD" ? 1 : prevRate;
      // Convert to USD first
      const amountInUSD = amount / fromUSDRate;
      // Then convert to new currency
      const toUSDRate = currency === "USD" ? 1 : exchangeRate;
      return amountInUSD * toUSDRate;
    },
    [currency, exchangeRate]
  );

  return {
    currency,
    setCurrency,
    exchangeRate,
    convertFromUSD,
    convertBetweenCurrencies,
    isLoading,
    error
  };
}
