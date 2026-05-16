import { NextResponse } from "next/server";
import { getJson } from "serpapi";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Helper: extract clean shop name from either a URL or a raw name
function extractShopName(input) {
  if (!input) return null;
  const trimmed = input.trim();

  const urlMatch = trimmed.match(/etsy\.com\/shop\/([^/?#]+)/i);
  if (urlMatch) return urlMatch[1];

  return trimmed.replace(/[^a-zA-Z0-9_-]/g, "");
}

// Helper: extract price from snippet
function parsePrice(text) {
  if (!text) return null;
  const match = String(text).match(/\$\s?([\d,]+(?:\.\d{2})?)/);
  if (match) return `$${match[1]}`;
  return null;
}

// Helper: extract shop-level review count (e.g. "627 reviews")
function parseShopReviews(text) {
  if (!text) return null;
  const match = String(text).match(/([\d,]+)\s*(?:review|sales)/i);
  if (match) return parseInt(match[1].replace(/,/g, ""), 10) || null;
  return null;
}

// Helper: extract shop-level rating
function parseShopRating(text) {
  if (!text) return null;
  const match = String(text).match(/([0-5](?:\.\d)?)\s*(?:out of 5|\/5|stars?)/i);
  if (match) return parseFloat(match[1]);
  return null;
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
    // Single search call that targets the shop's listings
    const response = await getJson({
      engine: "google",
      q: `site:etsy.com/listing "${shopName}"`,
      api_key: process.env.SERPAPI_KEY,
      num: 20,
    });

    const organicResults = response.organic_results || [];

    // Filter only real Etsy listings
    const filtered = organicResults.filter((item) => {
      const link = item.link || "";
      return link.includes("etsy.com/listing");
    });

    // Try to find shop-level data from any snippet
    let shopReviews = null;
    let shopRating = null;
    for (const item of organicResults) {
      const text = item.snippet || "";
      if (!shopReviews) shopReviews = parseShopReviews(text);
      if (!shopRating) shopRating = parseShopRating(text);
      if (shopReviews && shopRating) break;
    }

    // Build clean listing objects
    const listings = filtered.map((item) => {
      const snippet = item.snippet || "";
      const title = item.title || "Untitled";

      return {
        title: title.replace(/\s*-\s*Etsy.*$/i, "").trim(),
        link: item.link,
        price: parsePrice(snippet) || null,
      };
    });

    return NextResponse.json({
      shopName: shopName,
      shopUrl: `https://www.etsy.com/shop/${shopName}`,
      totalFound: listings.length,
      shopReviews: shopReviews,
      shopRating: shopRating,
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