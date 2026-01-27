"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useCurrency } from "./useCurrency";

const AUTOMATED_COST_PER_PAGE_USD = 48;
const DEFAULT_WRITER_HOURLY_RATE_USD = 100;
const DEFAULT_ACV_USD = 15000;
const DEFAULT_AVERAGE_BASKET_USD = 200;

export interface RoiCalculatorState {
  // Content Production
  numberOfNewPages: number;
  writerHoursPerPage: number;
  writerHourlyRate: number;
  estimatedTimeSavings: number;

  // B2B Metrics (isB2B = !isB2C)
  b2bBaselineOrganicTraffic: number;
  b2bProjectedAdditionalTrafficPerPage: number;
  b2bWebsiteConversionRate: number;
  leadToSQLRate: number;
  sqlToCustomerRate: number;
  acv: number;

  // B2C Metrics
  isB2C: boolean;
  b2cBaselineOrganicTraffic: number;
  b2cProjectedAdditionalTrafficPerPage: number;
  b2cWebsiteConversionRate: number;
  averageBasket: number;
}

export interface RoiCalculatorCalculations {
  // Cost calculations
  totalAutomatedCost: number;
  manualHoursLeft: number;
  manualCostLeft: number;
  manualCostPerPageLeft: number;
  totalCostPerPage: number;
  totalCost: number;
  manualCostPerPage: number;
  manualHours: number;
  manualCost: number;
  savingsPerPage: number;
  savings: number;

  // B2B calculations
  b2bTotalTrafficAfterCreatingPages: number;
  b2bCurrentCustomers: number;
  b2bCurrentCustomersValue: number;
  b2bExpectedCustomers: number;
  b2bExpectedCustomersValue: number;
  b2bGains: number;
  b2bGainsValue: number;
  b2bMinutToolCost: number;
  b2bRoi: number;

  // B2C calculations
  b2cTotalTrafficAfterCreatingPages: number;
  b2cCurrentCustomers: number;
  b2cCurrentCustomersValue: number;
  b2cExpectedCustomers: number;
  b2cExpectedCustomersValue: number;
  b2cGains: number;
  b2cGainsValue: number;
  b2cMinutToolCost: number;
  b2cRoi: number;
}

export interface UseRoiCalculatorReturn {
  state: RoiCalculatorState;
  calculations: RoiCalculatorCalculations;
  currency: string;
  exchangeRate: number;
  setters: {
    setNumberOfNewPages: (value: number) => void;
    setWriterHoursPerPage: (value: number) => void;
    setWriterHourlyRate: (value: number) => void;
    setEstimatedTimeSavings: (value: number) => void;
    setB2BBaselineOrganicTraffic: (value: number) => void;
    setB2BProjectedAdditionalTrafficPerPage: (value: number) => void;
    setB2BWebsiteConversionRate: (value: number) => void;
    setLeadToSQLRate: (value: number) => void;
    setSqlToCustomerRate: (value: number) => void;
    setAcv: (value: number) => void;
    setIsB2C: (value: boolean) => void;
    setB2CBaselineOrganicTraffic: (value: number) => void;
    setB2CProjectedAdditionalTrafficPerPage: (value: number) => void;
    setB2CWebsiteConversionRate: (value: number) => void;
    setAverageBasket: (value: number) => void;
    setCurrency: (value: string) => void;
  };
}

export function useRoiCalculator(): UseRoiCalculatorReturn {
  // Currency management
  const {
    currency,
    setCurrency,
    convertFromUSD,
    convertBetweenCurrencies,
    exchangeRate
  } = useCurrency();
  const writerHourlyRateManuallySet = useRef(false);
  const acvManuallySet = useRef(false);
  const averageBasketManuallySet = useRef(false);
  const previousCurrency = useRef(currency);
  const isInitialMount = useRef(true);

  // Content Production State
  const [numberOfNewPages, setNumberOfNewPages] = useState(500);
  const [writerHoursPerPage, setWriterHoursPerPage] = useState(4);
  const [writerHourlyRate, setWriterHourlyRate] = useState(100);
  const [estimatedTimeSavings, setEstimatedTimeSavings] = useState(80);

  // Initialize default values on first mount if currency is not USD
  useEffect(() => {
    if (isInitialMount.current && currency !== "USD" && exchangeRate !== 1) {
      const convertedRate = convertFromUSD(DEFAULT_WRITER_HOURLY_RATE_USD);
      setWriterHourlyRate(Math.round(convertedRate * 100) / 100);
      const convertedAcv = convertFromUSD(DEFAULT_ACV_USD);
      setAcv(Math.round(convertedAcv * 100) / 100);
      const convertedBasket = convertFromUSD(DEFAULT_AVERAGE_BASKET_USD);
      setAverageBasket(Math.round(convertedBasket * 100) / 100);
      isInitialMount.current = false;
    } else if (isInitialMount.current && currency === "USD") {
      isInitialMount.current = false;
    }
  }, [currency, exchangeRate, convertFromUSD]);

  // Convert all monetary values when currency or exchange rate changes
  useEffect(() => {
    // Only convert if currency actually changed (not just exchange rate update)
    const currencyChanged = currency !== previousCurrency.current;

    if (currencyChanged && !isInitialMount.current) {
      // Convert writerHourlyRate
      if (!writerHourlyRateManuallySet.current) {
        // Convert default from USD - wait for exchange rate if not USD
        if (currency === "USD" || exchangeRate !== 1) {
          const convertedRate = convertFromUSD(DEFAULT_WRITER_HOURLY_RATE_USD);
          setWriterHourlyRate(Math.round(convertedRate * 100) / 100);
        }
      } else {
        // Convert user-entered value from previous currency
        setWriterHourlyRate((currentRate) => {
          const converted = convertBetweenCurrencies(currentRate);
          return Math.round(converted * 100) / 100;
        });
      }

      // Convert ACV
      if (!acvManuallySet.current) {
        // Convert default from USD - wait for exchange rate if not USD
        if (currency === "USD" || exchangeRate !== 1) {
          const convertedAcv = convertFromUSD(DEFAULT_ACV_USD);
          setAcv(Math.round(convertedAcv * 100) / 100);
        }
      } else {
        // Convert user-entered value from previous currency
        setAcv((currentAcv) => {
          const converted = convertBetweenCurrencies(currentAcv);
          return Math.round(converted * 100) / 100;
        });
      }

      // Convert averageBasket
      if (!averageBasketManuallySet.current) {
        // Convert default from USD - wait for exchange rate if not USD
        if (currency === "USD" || exchangeRate !== 1) {
          const convertedBasket = convertFromUSD(DEFAULT_AVERAGE_BASKET_USD);
          setAverageBasket(Math.round(convertedBasket * 100) / 100);
        }
      } else {
        // Convert user-entered value from previous currency
        setAverageBasket((currentBasket) => {
          const converted = convertBetweenCurrencies(currentBasket);
          return Math.round(converted * 100) / 100;
        });
      }

      // Only update previous currency if we actually converted (exchange rate is ready)
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

  // Track when acv is manually changed
  const handleAcvChange = (value: number) => {
    acvManuallySet.current = true;
    setAcv(value);
  };

  // Track when averageBasket is manually changed
  const handleAverageBasketChange = (value: number) => {
    averageBasketManuallySet.current = true;
    setAverageBasket(value);
  };

  // Get converted automated cost per page
  const automatedCostPerPage = useMemo(
    () => convertFromUSD(AUTOMATED_COST_PER_PAGE_USD),
    [convertFromUSD]
  );

  // B2B State (isB2B = !isB2C)
  const [b2bBaselineOrganicTraffic, setB2BBaselineOrganicTraffic] =
    useState(10000);
  const [
    b2bProjectedAdditionalTrafficPerPage,
    setB2BProjectedAdditionalTrafficPerPage
  ] = useState(50);
  const [b2bWebsiteConversionRate, setB2BWebsiteConversionRate] = useState(1);
  const [leadToSQLRate, setLeadToSQLRate] = useState(50);
  const [sqlToCustomerRate, setSqlToCustomerRate] = useState(25);
  const [acv, setAcv] = useState(15000);

  // B2C State (isB2B = !isB2C)
  const [isB2C, setIsB2C] = useState(true);
  const [b2cBaselineOrganicTraffic, setB2CBaselineOrganicTraffic] =
    useState(10000);
  const [
    b2cProjectedAdditionalTrafficPerPage,
    setB2CProjectedAdditionalTrafficPerPage
  ] = useState(100);
  const [b2cWebsiteConversionRate, setB2CWebsiteConversionRate] = useState(5);
  const [averageBasket, setAverageBasket] = useState(200);

  // Cost calculations
  const totalAutomatedCost = useMemo(
    () => numberOfNewPages * automatedCostPerPage,
    [numberOfNewPages, automatedCostPerPage]
  );

  const manualHoursLeft = useMemo(
    () =>
      Number(
        (
          numberOfNewPages *
          writerHoursPerPage *
          (1 - estimatedTimeSavings / 100)
        ).toFixed(2)
      ),
    [numberOfNewPages, writerHoursPerPage, estimatedTimeSavings]
  );

  const manualCostLeft = useMemo(
    () => manualHoursLeft * writerHourlyRate,
    [manualHoursLeft, writerHourlyRate]
  );

  const manualCostPerPageLeft = useMemo(
    () => (numberOfNewPages === 0 ? 0 : manualCostLeft / numberOfNewPages),
    [manualCostLeft, numberOfNewPages]
  );

  const totalCostPerPage = useMemo(
    () => manualCostPerPageLeft + automatedCostPerPage,
    [manualCostPerPageLeft, automatedCostPerPage]
  );

  const totalCost = useMemo(
    () => totalCostPerPage * numberOfNewPages,
    [totalCostPerPage, numberOfNewPages]
  );

  const manualCostPerPage = useMemo(
    () => writerHoursPerPage * writerHourlyRate,
    [writerHoursPerPage, writerHourlyRate]
  );

  const manualHours = useMemo(
    () => numberOfNewPages * writerHoursPerPage,
    [numberOfNewPages, writerHoursPerPage]
  );

  const manualCost = useMemo(
    () => manualHours * writerHourlyRate,
    [manualHours, writerHourlyRate]
  );

  const savingsPerPage = useMemo(
    () => manualCostPerPage - totalCostPerPage,
    [manualCostPerPage, totalCostPerPage]
  );

  const savings = useMemo(
    () => savingsPerPage * numberOfNewPages,
    [savingsPerPage, numberOfNewPages]
  );

  // B2B calculations
  const b2bTotalTrafficAfterCreatingPages = useMemo(
    () =>
      numberOfNewPages * b2bProjectedAdditionalTrafficPerPage +
      b2bBaselineOrganicTraffic,
    [
      numberOfNewPages,
      b2bProjectedAdditionalTrafficPerPage,
      b2bBaselineOrganicTraffic
    ]
  );

  const b2bCurrentCustomers = useMemo(
    () =>
      b2bBaselineOrganicTraffic *
      (b2bWebsiteConversionRate / 100) *
      (leadToSQLRate / 100) *
      (sqlToCustomerRate / 100),
    [
      b2bBaselineOrganicTraffic,
      b2bWebsiteConversionRate,
      leadToSQLRate,
      sqlToCustomerRate
    ]
  );

  const b2bCurrentCustomersValue = useMemo(
    () => b2bCurrentCustomers * acv,
    [b2bCurrentCustomers, acv]
  );

  const b2bExpectedCustomers = useMemo(
    () =>
      b2bTotalTrafficAfterCreatingPages *
      (b2bWebsiteConversionRate / 100) *
      (leadToSQLRate / 100) *
      (sqlToCustomerRate / 100),
    [
      b2bTotalTrafficAfterCreatingPages,
      b2bWebsiteConversionRate,
      leadToSQLRate,
      sqlToCustomerRate
    ]
  );

  const b2bExpectedCustomersValue = useMemo(
    () => b2bExpectedCustomers * acv,
    [b2bExpectedCustomers, acv]
  );

  const b2bGains = useMemo(
    () => b2bExpectedCustomers - b2bCurrentCustomers,
    [b2bExpectedCustomers, b2bCurrentCustomers]
  );

  const b2bGainsValue = useMemo(() => b2bGains * acv, [b2bGains, acv]);

  const b2bMinutToolCost = useMemo(
    () => b2bGainsValue - totalCost,
    [b2bGainsValue, totalCost]
  );

  const b2bRoi = useMemo(
    () => (totalCost === 0 ? 0 : (b2bGainsValue / totalCost) * 100),
    [b2bGainsValue, totalCost]
  );

  // B2C calculations
  const b2cTotalTrafficAfterCreatingPages = useMemo(
    () =>
      numberOfNewPages * b2cProjectedAdditionalTrafficPerPage +
      b2cBaselineOrganicTraffic,
    [
      numberOfNewPages,
      b2cProjectedAdditionalTrafficPerPage,
      b2cBaselineOrganicTraffic
    ]
  );

  const b2cCurrentCustomers = useMemo(
    () => b2cBaselineOrganicTraffic * (b2cWebsiteConversionRate / 100),
    [b2cBaselineOrganicTraffic, b2cWebsiteConversionRate]
  );

  const b2cCurrentCustomersValue = useMemo(
    () => b2cCurrentCustomers * averageBasket,
    [b2cCurrentCustomers, averageBasket]
  );

  const b2cExpectedCustomers = useMemo(
    () => b2cTotalTrafficAfterCreatingPages * (b2cWebsiteConversionRate / 100),
    [b2cTotalTrafficAfterCreatingPages, b2cWebsiteConversionRate]
  );

  const b2cExpectedCustomersValue = useMemo(
    () => b2cExpectedCustomers * averageBasket,
    [b2cExpectedCustomers, averageBasket]
  );

  const b2cGains = useMemo(
    () => b2cExpectedCustomers - b2cCurrentCustomers,
    [b2cExpectedCustomers, b2cCurrentCustomers]
  );

  const b2cGainsValue = useMemo(
    () => b2cGains * averageBasket,
    [b2cGains, averageBasket]
  );

  const b2cMinutToolCost = useMemo(
    () => b2cGainsValue - totalCost,
    [b2cGainsValue, totalCost]
  );

  const b2cRoi = useMemo(
    () => (totalCost === 0 ? 0 : (b2cGainsValue / totalCost) * 100),
    [b2cGainsValue, totalCost]
  );

  return {
    state: {
      numberOfNewPages,
      writerHoursPerPage,
      writerHourlyRate,
      estimatedTimeSavings,
      b2bBaselineOrganicTraffic,
      b2bProjectedAdditionalTrafficPerPage,
      b2bWebsiteConversionRate,
      leadToSQLRate,
      sqlToCustomerRate,
      acv,
      isB2C,
      b2cBaselineOrganicTraffic,
      b2cProjectedAdditionalTrafficPerPage,
      b2cWebsiteConversionRate,
      averageBasket
    },
    calculations: {
      totalAutomatedCost,
      manualHoursLeft,
      manualCostLeft,
      manualCostPerPageLeft,
      totalCostPerPage,
      totalCost,
      manualCostPerPage,
      manualHours,
      manualCost,
      savingsPerPage,
      savings,
      b2bTotalTrafficAfterCreatingPages,
      b2bCurrentCustomers,
      b2bCurrentCustomersValue,
      b2bExpectedCustomers,
      b2bExpectedCustomersValue,
      b2bGains,
      b2bGainsValue,
      b2bMinutToolCost,
      b2bRoi,
      b2cTotalTrafficAfterCreatingPages,
      b2cCurrentCustomers,
      b2cCurrentCustomersValue,
      b2cExpectedCustomers,
      b2cExpectedCustomersValue,
      b2cGains,
      b2cGainsValue,
      b2cMinutToolCost,
      b2cRoi
    },
    currency,
    exchangeRate,
    setters: {
      setNumberOfNewPages,
      setWriterHoursPerPage,
      setWriterHourlyRate: handleWriterHourlyRateChange,
      setEstimatedTimeSavings,
      setB2BBaselineOrganicTraffic,
      setB2BProjectedAdditionalTrafficPerPage,
      setB2BWebsiteConversionRate,
      setLeadToSQLRate,
      setSqlToCustomerRate,
      setAcv: handleAcvChange,
      setIsB2C,
      setB2CBaselineOrganicTraffic,
      setB2CProjectedAdditionalTrafficPerPage,
      setB2CWebsiteConversionRate,
      setAverageBasket: handleAverageBasketChange,
      setCurrency
    }
  };
}
