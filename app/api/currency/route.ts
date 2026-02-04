import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// Cache duration: 24 hours (86400 seconds)
const CACHE_DURATION = 86400;

interface FrankfurterResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

async function fetchExchangeRates(baseCurrency: string = "USD") {
  try {
    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${baseCurrency}`,
      {
        next: { revalidate: CACHE_DURATION }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }

    const data: FrankfurterResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const baseCurrency = searchParams.get("base") || "USD";
    const targetCurrency = searchParams.get("to");

    // Use unstable_cache to cache the API call
    const cachedFetchRates = unstable_cache(
      async () => fetchExchangeRates(baseCurrency),
      [`exchange-rates-${baseCurrency}`],
      {
        revalidate: CACHE_DURATION,
        tags: [`exchange-rates-${baseCurrency}`]
      }
    );

    const data = await cachedFetchRates();

    // fixe le taux EUR à 0.85
    if (data.rates) {
        data.rates["EUR"] = 0.85; 
    }

    // If target currency is specified, return only that rate
    if (targetCurrency && data.rates[targetCurrency]) {
      return NextResponse.json(
        {
          base: data.base,
          date: data.date,
          rate: data.rates[targetCurrency],
          currency: targetCurrency
        },
        {
          headers: {
            "Cache-Control":
              "public, max-age=86400, stale-while-revalidate=86399"
          }
        }
      );
    }

    // Otherwise return all rates
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=86399"
      }
    });
  } catch (error) {
    console.error("Error in currency API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch exchange rates" },
      {
        status: 500,
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=299"
        }
      }
    );
  }
}