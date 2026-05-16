import { NextResponse } from "next/server";
import { getJson } from "serpapi";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function parsePrice(text) {
  if (!text) return null;
  const match = String(text).match(/\$\s?([\d,]+(?:\.\d{2})?)/);
  if (match) return parseFloat(match[1].replace(/,/g, ""));
  return null;
}

function parseRating(text) {
  if (!text) return null;
  const match = String(text).match(/([0-5](?:\.\d)?)\s*(?:out of 5|\/5|stars?)/i);
  if (match) return parseFloat(match[1]);
  return null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");

  if (!keyword || !keyword.trim()) {
    return NextResponse.json({ error: "Please provide a keyword" }, { status: 400 });
  }

  if (!process.env.SERPAPI_KEY) {
    return NextResponse.json({ error: "SerpApi key is missing" }, { status: 500 });
  }

  try {
    const response = await getJson({
      engine: "google",
      q: 'site:etsy.com/listing "' + keyword.trim() + '"',
      api_key: process.env.SERPAPI_KEY,
      num: 20,
    });

    const organicResults = response.organic_results || [];

    const filtered = organicResults.filter((item) => {
      const link = item.link || "";
      return link.includes("etsy.com/listing");
    });

    const listings = filtered.map((item) => {
      const snippet = item.snippet || "";
      const title = item.title || "Untitled";
      const richSnippet = item.rich_snippet || {};
      const topMeta = richSnippet.top || {};
      const bottomMeta = richSnippet.bottom || {};

      // Combine all sources for max price/rating coverage
      const combinedText = [
        snippet,
        JSON.stringify(topMeta),
        JSON.stringify(bottomMeta),
        title,
      ].join(" ");

      const price =
        (topMeta.detected_extensions && topMeta.detected_extensions.price) ||
        (bottomMeta.detected_extensions && bottomMeta.detected_extensions.price) ||
        parsePrice(combinedText);

      const rating =
        (topMeta.detected_extensions && topMeta.detected_extensions.rating) ||
        (bottomMeta.detected_extensions && bottomMeta.detected_extensions.rating) ||
        parseRating(combinedText);

      return {
        title: title.replace(/\s*-\s*Etsy.*$/i, "").trim(),
        link: item.link,
        price: price,
        rating: rating,
      };
    });

    const prices = listings.map((l) => l.price).filter((p) => p !== null);
    const ratings = listings.map((l) => l.rating).filter((r) => r !== null);

    // Honest: only show averages when we have at least 3 data points
    const averagePrice = prices.length >= 3
      ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
      : null;

    const averageRating = ratings.length >= 3
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : null;

    let competitionLevel = "Unknown";
    const totalFound = listings.length;

    if (totalFound >= 15) {
      competitionLevel = "High";
    } else if (totalFound >= 8) {
      competitionLevel = "Medium";
    } else if (totalFound > 0) {
      competitionLevel = "Low";
    }

    return NextResponse.json({
      keyword: keyword.trim(),
      totalFound: totalFound,
      averagePrice: averagePrice,
      averageRating: averageRating,
      competitionLevel: competitionLevel,
      listings: listings,
    });
  } catch (error) {
    console.error("SerpApi error:", error);
    return NextResponse.json(
      { error: "Failed to fetch keyword data", details: error.message },
      { status: 500 }
    );
  }
}