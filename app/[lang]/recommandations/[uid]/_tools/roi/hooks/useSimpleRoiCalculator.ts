"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useCurrency } from "./useCurrency";

const DEFAULT_WRITER_HOURLY_RATE_USD = 100;
const AUTOMATED_COST_PER_PAGE_USD = 48;
const ESTIMATED_TIME_SAVINGS = 80; // Fixed at 80%

export interface SimpleRoiCalculatorState {
  numberOfNewPages: number;
  writerHoursPerPage: number;
  writerHourlyRate: number;
}

export interface SimpleRoiCalculatorCalculations {
  manualCostPerPage: number;
  totalManualCost: number;
  automatedCostPerPage: number;
  totalAutomatedCost: number;
  manualHoursLeft: number;
  manualCostLeft: number;
  manualCostPerPageLeft: number;
  totalCostPerPage: number;
  totalCost: number;
  savingsPerPage: number;
  totalSavings: number;
}

export interface UseSimpleRoiCalculatorReturn {
  state: SimpleRoiCalculatorState;
  calculations: SimpleRoiCalculatorCalculations;
  currency: string;
  exchangeRate: number;
  setters: {
    setNumberOfNewPages: (value: number) => void;
    setWriterHoursPerPage: (value: number) => void;
    setWriterHourlyRate: (value: number) => void;
    setCurrency: (value: string) => void;
  };
}

interface SimpleRoiInitialData {
  costPerPage?: number;
}

export function useSimpleRoiCalculator(initialData?: SimpleRoiInitialData): UseSimpleRoiCalculatorReturn {
  // Currency management
  const {
    currency,
    setCurrency,
    convertFromUSD,
    convertBetweenCurrencies,
    exchangeRate
  } = useCurrency();

  const defaults = {
    costPerPage: initialData?.costPerPage ?? 48
  };

  const writerHourlyRateManuallySet = useRef(false);
  const previousCurrency = useRef(currency);
  const isInitialMount = useRef(true);

  // State
  const [numberOfNewPages, setNumberOfNewPages] = useState(500);
  const [writerHoursPerPage, setWriterHoursPerPage] = useState(4);
  const [writerHourlyRate, setWriterHourlyRate] = useState(100);

  // Initialize default values on first mount if currency is not USD
  useEffect(() => {
    if (isInitialMount.current && currency !== "USD" && exchangeRate !== 1) {
      const convertedRate = convertFromUSD(DEFAULT_WRITER_HOURLY_RATE_USD);
      setWriterHourlyRate(Math.round(convertedRate * 100) / 100);
      isInitialMount.current = false;
    } else if (isInitialMount.current && currency === "USD") {
      isInitialMount.current = false;
    }
  }, [currency, exchangeRate, convertFromUSD]);

  // Convert writerHourlyRate when currency or exchange rate changes
  useEffect(() => {
    const currencyChanged = currency !== previousCurrency.current;

    if (currencyChanged && !isInitialMount.current) {
      if (!writerHourlyRateManuallySet.current) {
        if (currency === "USD" || exchangeRate !== 1) {
          const convertedRate = convertFromUSD(DEFAULT_WRITER_HOURLY_RATE_USD);
          setWriterHourlyRate(Math.round(convertedRate * 100) / 100);
        }
      } else {
        setWriterHourlyRate((currentRate) => {
          const converted = convertBetweenCurrencies(currentRate);
          return Math.round(converted * 100) / 100;
        });
      }

      if (currency === "USD" || exchangeRate !== 1) {
        previousCurrency.current = currency;
      }
    }
  }, [currency, exchangeRate, convertFromUSD, convertBetweenCurrencies]);

  // Track when writerHourlyRate is manually changed
  const handleWriterHourlyRateChange = (value: number) => {
    writerHourlyRateManuallySet.current = true;
    setWriterHourlyRate(value);
  };

  // Get converted automated cost per page
  const automatedCostPerPage = useMemo(
    () => convertFromUSD(defaults.costPerPage),
    [convertFromUSD, defaults.costPerPage]
  );

  // Calculations
  // E2: Manual cost per page = writerHourlyRate * writerHoursPerPage
  const manualCostPerPage = useMemo(
    () => writerHoursPerPage * writerHourlyRate,
    [writerHoursPerPage, writerHourlyRate]
  );

  // E3: Total manual cost = numberOfNewPages * manualCostPerPage
  const totalManualCost = useMemo(
    () => numberOfNewPages * manualCostPerPage,
    [numberOfNewPages, manualCostPerPage]
  );

  // H3: Total automated cost = numberOfNewPages * automatedCostPerPage
  const totalAutomatedCost = useMemo(
    () => numberOfNewPages * automatedCostPerPage,
    [numberOfNewPages, automatedCostPerPage]
  );

  // Calculate remaining manual hours after time savings
  const manualHoursLeft = useMemo(
    () =>
      Number(
        (
          numberOfNewPages *
          writerHoursPerPage *
          (1 - ESTIMATED_TIME_SAVINGS / 100)
        ).toFixed(2)
      ),
    [numberOfNewPages, writerHoursPerPage]
  );

  // Calculate remaining manual cost
  const manualCostLeft = useMemo(
    () => manualHoursLeft * writerHourlyRate,
    [manualHoursLeft, writerHourlyRate]
  );

  // Calculate remaining manual cost per page
  const manualCostPerPageLeft = useMemo(
    () => (numberOfNewPages === 0 ? 0 : manualCostLeft / numberOfNewPages),
    [manualCostLeft, numberOfNewPages]
  );

  // Total cost per page = remaining manual cost + automated cost
  const totalCostPerPage = useMemo(
    () => manualCostPerPageLeft + automatedCostPerPage,
    [manualCostPerPageLeft, automatedCostPerPage]
  );

  // Total cost = total cost per page * number of pages
  const totalCost = useMemo(
    () => totalCostPerPage * numberOfNewPages,
    [totalCostPerPage, numberOfNewPages]
  );

  // E7: Savings per page = manualCostPerPage - totalCostPerPage
  const savingsPerPage = useMemo(
    () => manualCostPerPage - totalCostPerPage,
    [manualCostPerPage, totalCostPerPage]
  );

  // E8: Total savings = totalManualCost - totalCost
  const totalSavings = useMemo(
    () => totalManualCost - totalCost,
    [totalManualCost, totalCost]
  );

  return {
    state: {
      numberOfNewPages,
      writerHoursPerPage,
      writerHourlyRate
    },
    calculations: {
      manualCostPerPage,
      totalManualCost,
      automatedCostPerPage,
      totalAutomatedCost,
      manualHoursLeft,
      manualCostLeft,
      manualCostPerPageLeft,
      totalCostPerPage,
      totalCost,
      savingsPerPage,
      totalSavings
    },
    currency,
    exchangeRate,
    setters: {
      setNumberOfNewPages,
      setWriterHoursPerPage,
      setWriterHourlyRate: handleWriterHourlyRateChange,
      setCurrency
    }
  };
}
