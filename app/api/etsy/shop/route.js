import { NextResponse } from "next/server";
import { getJson } from "serpapi";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function extractShopName(input) {
  if (!input) return null;
  const trimmed = input.trim();

  const urlMatch = trimmed.match(/etsy\.com\/shop\/([^/?#]+)/i);
  if (urlMatch) return urlMatch[1];

  return trimmed.replace(/[^a-zA-Z0-9_-]/g, "");
}

function parsePrice(text) {
  if (!text) return null;
  const match = String(text).match(/\$\s?([\d,]+(?:\.\d{2})?)/);
  if (match) return match[1];
  return null;
}

function parseShopReviews(text) {
  if (!text) return null;
  const match = String(text).match(/([\d,]+)\s*(?:review|sales)/i);
  if (match) return parseInt(match[1].replace(/,/g, ""), 10) || null;
  return null;
}

function parseShopRating(text) {
  if (!text) return null;
  const match = String(text).match(/([0-5](?:\.\d)?)\s*(?:out of 5|\/5|stars?)/i);
  if (match) return parseFloat(match[1]);
  return null;
}

// Convert price string like "$24.99" to number 24.99
function priceToNumber(priceStr) {
  if (!priceStr) return null;
  const match = String(priceStr).match(/([\d,]+(?:\.\d{2})?)/);
  if (match) return parseFloat(match[1].replace(/,/g, ""));
  return null;
}

function median(arr) {
  if (arr.length === 0) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function analyzePricing(prices) {
  if (prices.length === 0) return null;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const med = median(prices);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

  let strategy = "Mixed";
  const lowCount = prices.filter((p) => p < med * 0.7).length;
  const highCount = prices.filter((p) => p > med * 1.5).length;

  if (highCount > prices.length * 0.4) {
    strategy = "Premium-heavy";
  } else if (lowCount > prices.length * 0.4) {
    strategy = "Race to bottom";
  } else if (max / min < 2) {
    strategy = "Tight cluster";
  }

  return {
    min: min.toFixed(2),
    max: max.toFixed(2),
    median: med.toFixed(2),
    average: avg.toFixed(2),
    strategy: strategy,
    dataPoints: prices.length,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawInput = searchParams.get("shopname");

  if (!rawInput) {
    return NextResponse.json(
      { error: "Please provide a shop name or URL" },
      { status: 400 }
    );
  }

  const shopName = extractShopName(rawInput);

  if (!shopName) {
    return NextResponse.json(
      { error: "Invalid shop name or URL" },
      { status: 400 }
    );
  }

  if (!process.env.SERPAPI_KEY) {
    return NextResponse.json(
      { error: "SerpApi key is missing" },
      { status: 500 }
    );
  }

  try {
    const response = await getJson({
      engine: "google",
      q: 'site:etsy.com/listing "' + shopName + '"',
      api_key: process.env.SERPAPI_KEY,
      num: 20,
    });

    const organicResults = response.organic_results || [];

    const filtered = organicResults.filter((item) => {
      const link = item.link || "";
      return link.includes("etsy.com/listing");
    });

    let shopReviews = null;
    let shopRating = null;
    for (const item of organicResults) {
      const text = item.snippet || "";
      if (!shopReviews) shopReviews = parseShopReviews(text);
      if (!shopRating) shopRating = parseShopRating(text);
      if (shopReviews && shopRating) break;
    }

    const listings = filtered.map((item) => {
      const snippet = item.snippet || "";
      const title = item.title || "Untitled";
      const priceStr = parsePrice(snippet);

      return {
        title: title.replace(/\s*-\s*Etsy.*$/i, "").trim(),
        link: item.link,
        price: priceStr ? "$" + priceStr : null,
      };
    });

    // NEW: Extract numeric prices for analysis
    const numericPrices = listings
      .map((l) => priceToNumber(l.price))
      .filter((p) => p !== null);

    const pricingAnalysis = numericPrices.length >= 3
      ? analyzePricing(numericPrices)
      : null;

    return NextResponse.json({
      shopName: shopName,
      shopUrl: `https://www.etsy.com/shop/${shopName}`,
      totalFound: listings.length,
      shopReviews: shopReviews,
      shopRating: shopRating,
      pricingAnalysis: pricingAnalysis,
      listings: listings,
    });
  } catch (error) {
    console.error("SerpApi error:", error);
    return NextResponse.json(
      { error: "Failed to fetch shop data", details: error.message },
      { status: 500 }
    );
  }
}