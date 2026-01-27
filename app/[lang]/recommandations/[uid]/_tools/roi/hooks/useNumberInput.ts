"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Hook to handle number inputs that can be empty (showing empty string)
 * but still convert to 0 for calculations
 */
export function useNumberInput(
  value: number,
  onChange: (value: number) => void
) {
  const [inputValue, setInputValue] = useState(value.toString());
  const lastSetValue = useRef<number | null>(null);

  // Sync local state when prop changes from external source
  useEffect(() => {
    if (lastSetValue.current !== value) {
      setInputValue(value.toString());
    }
    lastSetValue.current = null;
  }, [value]);

  const handleChange = (stringValue: string) => {
    setInputValue(stringValue);
    const numValue = stringValue === "" ? 0 : Number(stringValue);
    if (!isNaN(numValue)) {
      lastSetValue.current = numValue;
      onChange(numValue);
    }
  };

  return [inputValue, handleChange] as const;
}

