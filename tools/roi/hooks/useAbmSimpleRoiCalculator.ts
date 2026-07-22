"use client";

/**
 * Simple ABM slice — same savings model as useSimpleRoiCalculator but pages = accounts × decision makers
 * and automated cost = 20 USD-base (converted). Time savings fixed at 80%.
 */

import { useState, useMemo, useEffect, useRef } from "react";
import { useCurrency } from "./useCurrency";

const DEFAULT_WRITER_HOURLY_RATE_USD = 100;
const AUTOMATED_COST_PER_PAGE_ABM_USD = 20;
const ESTIMATED_TIME_SAVINGS_PERCENT = 80;

export interface AbmSimpleRoiCalculatorState {
  accountsTarget: number;
  decisionMakersPerAccount: number;
  writerHoursPerPage: number;
  writerHourlyRate: number;
}

export interface AbmSimpleRoiCalculatorCalculations {
  pages: number;
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

export interface UseAbmSimpleRoiCalculatorReturn {
  state: AbmSimpleRoiCalculatorState;
  calculations: AbmSimpleRoiCalculatorCalculations;
  currency: string;
  exchangeRate: number;
  setters: {
    setAccountsTarget: (value: number) => void;
    setDecisionMakersPerAccount: (value: number) => void;
    setWriterHoursPerPage: (value: number) => void;
    setWriterHourlyRate: (value: number) => void;
    setCurrency: (value: string) => void;
  };
}

export function useAbmSimpleRoiCalculator(): UseAbmSimpleRoiCalculatorReturn {
  const {
    currency,
    setCurrency,
    convertFromUSD,
    convertBetweenCurrencies,
    exchangeRate
  } = useCurrency();

  const writerHourlyRateManuallySet = useRef(false);
  const previousCurrency = useRef(currency);
  const isInitialMount = useRef(true);

  const [accountsTarget, setAccountsTarget] = useState(100);
  const [decisionMakersPerAccount, setDecisionMakersPerAccount] = useState(5);
  const [writerHoursPerPage, setWriterHoursPerPage] = useState(4);
  const [writerHourlyRate, setWriterHourlyRate] = useState(100);

  useEffect(() => {
    if (isInitialMount.current && currency !== "USD" && exchangeRate !== 1) {
      const convertedRate = convertFromUSD(DEFAULT_WRITER_HOURLY_RATE_USD);
      setWriterHourlyRate(Math.round(convertedRate * 100) / 100);
      isInitialMount.current = false;
    } else if (isInitialMount.current && currency === "USD") {
      isInitialMount.current = false;
    }
  }, [currency, exchangeRate, convertFromUSD]);

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

  const handleWriterHourlyRateChange = (value: number) => {
    writerHourlyRateManuallySet.current = true;
    setWriterHourlyRate(value);
  };

  const automatedCostPerPage = useMemo(
    () => convertFromUSD(AUTOMATED_COST_PER_PAGE_ABM_USD),
    [convertFromUSD]
  );

  const pages = useMemo(
    () => Math.max(0, accountsTarget * decisionMakersPerAccount),
    [accountsTarget, decisionMakersPerAccount]
  );

  const manualCostPerPage = useMemo(
    () => writerHoursPerPage * writerHourlyRate,
    [writerHoursPerPage, writerHourlyRate]
  );

  const totalManualCost = useMemo(
    () => pages * manualCostPerPage,
    [pages, manualCostPerPage]
  );

  const totalAutomatedCost = useMemo(
    () => pages * automatedCostPerPage,
    [pages, automatedCostPerPage]
  );

  const manualHoursLeft = useMemo(
    () =>
      Number(
        (
          pages *
          writerHoursPerPage *
          (1 - ESTIMATED_TIME_SAVINGS_PERCENT / 100)
        ).toFixed(2)
      ),
    [pages, writerHoursPerPage]
  );

  const manualCostLeft = useMemo(
    () => manualHoursLeft * writerHourlyRate,
    [manualHoursLeft, writerHourlyRate]
  );

  const manualCostPerPageLeft = useMemo(
    () => (pages === 0 ? 0 : manualCostLeft / pages),
    [manualCostLeft, pages]
  );

  const totalCostPerPage = useMemo(
    () => manualCostPerPageLeft + automatedCostPerPage,
    [manualCostPerPageLeft, automatedCostPerPage]
  );

  const totalCost = useMemo(
    () => totalCostPerPage * pages,
    [totalCostPerPage, pages]
  );

  const savingsPerPage = useMemo(
    () => manualCostPerPage - totalCostPerPage,
    [manualCostPerPage, totalCostPerPage]
  );

  const totalSavings = useMemo(
    () => totalManualCost - totalCost,
    [totalManualCost, totalCost]
  );

  return {
    state: {
      accountsTarget,
      decisionMakersPerAccount,
      writerHoursPerPage,
      writerHourlyRate
    },
    calculations: {
      pages,
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
      setAccountsTarget,
      setDecisionMakersPerAccount,
      setWriterHoursPerPage,
      setWriterHourlyRate: handleWriterHourlyRateChange,
      setCurrency
    }
  };
}
