"use client";

/**
 * ABM ROI math — see app/tools/roi/ABM-ROI-calculator.xlsx (automated cost per page = 20 USD-base, converted).
 */

import { useState, useMemo, useEffect, useRef } from "react";
import { useCurrency } from "./useCurrency";

const AUTOMATED_COST_PER_PAGE_ABM_USD = 20;
const DEFAULT_WRITER_HOURLY_RATE_USD = 100;
const DEFAULT_AVERAGE_DEAL_SIZE_USD = 75000;
/** Fixed AI time savings (not exposed in UI). */
const ESTIMATED_TIME_SAVINGS_PERCENT = 80;

export interface AbmRoiCalculatorState {
  accountsTarget: number;
  decisionMakersPerAccount: number;
  writerHoursPerPage: number;
  writerHourlyRate: number;
  engagedTargetPercent: number;
  engagedToOppPercent: number;
  averageDealSize: number;
  winRatePercent: number;
}

export interface AbmRoiCalculatorCalculations {
  pages: number;
  manualCostPerPage: number;
  totalManualHours: number;
  totalManualContentCost: number;
  automatedCostPerPage: number;
  totalAutomatedContentCost: number;
  manualHoursLeft: number;
  manualCostLeft: number;
  manualCostPerPageLeft: number;
  totalCostPerPage: number;
  savingsPerPage: number;
  totalToolAndManualCost: number;
  annualCostSavings: number;
  manualCostTotal: number;
  incrementalRevenue: number;
  totalImpact: number;
  toolInvestment: number;
  roiMultiplier: number;
  roiMultiplierForDisplay: number;
}

export interface UseAbmRoiCalculatorReturn {
  state: AbmRoiCalculatorState;
  calculations: AbmRoiCalculatorCalculations;
  currency: string;
  exchangeRate: number;
  setters: {
    setAccountsTarget: (value: number) => void;
    setDecisionMakersPerAccount: (value: number) => void;
    setWriterHoursPerPage: (value: number) => void;
    setWriterHourlyRate: (value: number) => void;
    setEngagedTargetPercent: (value: number) => void;
    setEngagedToOppPercent: (value: number) => void;
    setAverageDealSize: (value: number) => void;
    setWinRatePercent: (value: number) => void;
    setCurrency: (value: string) => void;
  };
}

export function useAbmRoiCalculator(): UseAbmRoiCalculatorReturn {
  const {
    currency,
    setCurrency,
    convertFromUSD,
    convertBetweenCurrencies,
    exchangeRate
  } = useCurrency();

  const writerHourlyRateManuallySet = useRef(false);
  const averageDealSizeManuallySet = useRef(false);
  const previousCurrency = useRef(currency);
  const isInitialMount = useRef(true);

  const [accountsTarget, setAccountsTarget] = useState(100);
  const [decisionMakersPerAccount, setDecisionMakersPerAccount] = useState(5);
  const [writerHoursPerPage, setWriterHoursPerPage] = useState(4);
  const [writerHourlyRate, setWriterHourlyRate] = useState(100);
  const [engagedTargetPercent, setEngagedTargetPercent] = useState(30);
  const [engagedToOppPercent, setEngagedToOppPercent] = useState(20);
  const [averageDealSize, setAverageDealSize] = useState(75000);
  const [winRatePercent, setWinRatePercent] = useState(30);

  useEffect(() => {
    if (isInitialMount.current && currency !== "USD" && exchangeRate !== 1) {
      const convertedRate = convertFromUSD(DEFAULT_WRITER_HOURLY_RATE_USD);
      setWriterHourlyRate(Math.round(convertedRate * 100) / 100);
      const convertedDeal = convertFromUSD(DEFAULT_AVERAGE_DEAL_SIZE_USD);
      setAverageDealSize(Math.round(convertedDeal * 100) / 100);
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
        setWriterHourlyRate((current) => {
          const converted = convertBetweenCurrencies(current);
          return Math.round(converted * 100) / 100;
        });
      }

      if (!averageDealSizeManuallySet.current) {
        if (currency === "USD" || exchangeRate !== 1) {
          const convertedDeal = convertFromUSD(DEFAULT_AVERAGE_DEAL_SIZE_USD);
          setAverageDealSize(Math.round(convertedDeal * 100) / 100);
        }
      } else {
        setAverageDealSize((current) => {
          const converted = convertBetweenCurrencies(current);
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

  const handleAverageDealSizeChange = (value: number) => {
    averageDealSizeManuallySet.current = true;
    setAverageDealSize(value);
  };

  const automatedCostPerPage = useMemo(
    () => convertFromUSD(AUTOMATED_COST_PER_PAGE_ABM_USD),
    [convertFromUSD]
  );

  const pages = useMemo(
    () => Math.max(0, accountsTarget * decisionMakersPerAccount),
    [accountsTarget, decisionMakersPerAccount]
  );

  const timeSavingsFraction = ESTIMATED_TIME_SAVINGS_PERCENT / 100;

  const manualCostPerPage = useMemo(
    () => writerHourlyRate * writerHoursPerPage,
    [writerHourlyRate, writerHoursPerPage]
  );

  const totalManualHours = useMemo(
    () => writerHoursPerPage * pages,
    [writerHoursPerPage, pages]
  );

  const totalManualContentCost = useMemo(
    () => pages * writerHourlyRate * writerHoursPerPage,
    [pages, writerHourlyRate, writerHoursPerPage]
  );

  const totalAutomatedContentCost = useMemo(
    () => automatedCostPerPage * pages,
    [automatedCostPerPage, pages]
  );

  const manualHoursLeft = useMemo(
    () =>
      Number(
        (totalManualHours * (1 - timeSavingsFraction)).toFixed(2)
      ),
    [totalManualHours]
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
    () => automatedCostPerPage + manualCostPerPageLeft,
    [automatedCostPerPage, manualCostPerPageLeft]
  );

  const savingsPerPage = useMemo(
    () => manualCostPerPage - totalCostPerPage,
    [manualCostPerPage, totalCostPerPage]
  );

  const totalToolAndManualCost = useMemo(
    () => manualCostLeft + totalAutomatedContentCost,
    [manualCostLeft, totalAutomatedContentCost]
  );

  const annualCostSavings = useMemo(
    () => totalManualContentCost - totalToolAndManualCost,
    [totalManualContentCost, totalToolAndManualCost]
  );

  const manualCostTotal = useMemo(
    () => totalManualContentCost,
    [totalManualContentCost]
  );

  const incrementalRevenue = useMemo(() => {
    const engagedFrac = engagedTargetPercent / 100;
    const oppFrac = engagedToOppPercent / 100;
    const winFrac = winRatePercent / 100;
    const engagedAccounts = accountsTarget * engagedFrac;
    const oppRateWithLift = oppFrac * 1.2;
    const opportunitiesWithout = engagedAccounts * oppFrac;
    const opportunitiesWith = engagedAccounts * oppRateWithLift;
    const pipelineWithout = averageDealSize * opportunitiesWithout;
    const pipelineWith = averageDealSize * opportunitiesWith;
    const expectedRevenueWithout = pipelineWithout * winFrac;
    const expectedRevenueWith = pipelineWith * winFrac;
    return expectedRevenueWith - expectedRevenueWithout;
  }, [
    accountsTarget,
    engagedTargetPercent,
    engagedToOppPercent,
    averageDealSize,
    winRatePercent
  ]);

  const totalImpact = useMemo(
    () => incrementalRevenue + annualCostSavings,
    [incrementalRevenue, annualCostSavings]
  );

  const toolInvestment = useMemo(
    () => totalAutomatedContentCost,
    [totalAutomatedContentCost]
  );

  const roiMultiplier = useMemo(() => {
    if (toolInvestment === 0) {
      return 0;
    }
    return (totalImpact - toolInvestment) / toolInvestment;
  }, [totalImpact, toolInvestment]);

  const roiMultiplierForDisplay = useMemo(
    () => roiMultiplier * 100,
    [roiMultiplier]
  );

  return {
    state: {
      accountsTarget,
      decisionMakersPerAccount,
      writerHoursPerPage,
      writerHourlyRate,
      engagedTargetPercent,
      engagedToOppPercent,
      averageDealSize,
      winRatePercent
    },
    calculations: {
      pages,
      manualCostPerPage,
      totalManualHours,
      totalManualContentCost,
      automatedCostPerPage,
      totalAutomatedContentCost,
      manualHoursLeft,
      manualCostLeft,
      manualCostPerPageLeft,
      totalCostPerPage,
      savingsPerPage,
      totalToolAndManualCost,
      annualCostSavings,
      manualCostTotal,
      incrementalRevenue,
      totalImpact,
      toolInvestment,
      roiMultiplier,
      roiMultiplierForDisplay
    },
    currency,
    exchangeRate,
    setters: {
      setAccountsTarget,
      setDecisionMakersPerAccount,
      setWriterHoursPerPage,
      setWriterHourlyRate: handleWriterHourlyRateChange,
      setEngagedTargetPercent,
      setEngagedToOppPercent,
      setAverageDealSize: handleAverageDealSizeChange,
      setWinRatePercent,
      setCurrency
    }
  };
}
