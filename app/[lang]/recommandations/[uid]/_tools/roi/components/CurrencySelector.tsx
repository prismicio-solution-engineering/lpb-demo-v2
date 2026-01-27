"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import clsx from "clsx";

const CURRENCIES = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" }
];

interface CurrencySelectorProps {
  currency: string;
  onCurrencyChange: (value: string) => void;
  hasBg?: boolean;
}

export function CurrencySelector({
  currency,
  onCurrencyChange,
  hasBg = true
}: CurrencySelectorProps) {
  const form = useForm({
    defaultValues: {
      currency: currency
    }
  });

  React.useEffect(() => {
    form.setValue("currency", currency);
  }, [currency, form]);

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select
                small
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  onCurrencyChange(value);
                }}
                theme="light"
              >
                <SelectTrigger className={clsx("flex items-center gap-2", {
                  "!bg-quaternary-green": hasBg
                })}>
                  <span className="font-bold">Currency:</span>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((curr) => (
                    <SelectItem key={curr.value} value={curr.value}>
                      {curr.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
}
