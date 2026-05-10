process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextResponse } from "next/server";
import {
  getJson,
  MissingApiKeyError,
  InvalidArgumentError,
  InvalidTimeoutError,
} from "serpapi";

function isValidShopname(value) {
  if (!value || value.length > 120) return false;
  return !/[<>"]/.test(value);
}

function prettifyShopSlug(slug) {
  const s = slug.trim();
  if (!s) return "Unknown shop";
  return s
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatPrice(value) {
  if (value == null || value === "") return null;
  if (typeof value === "number" && Number.isFinite(value)) {
    return `$${value.toFixed(2)}`;
  }
  const str = String(value).trim();
  if (/^\$/.test(str)) return str;
  if (/^\d/.test(str)) return `$${str}`;
  return str || null;
}

function pickListingPrice(item) {
  if (item.price != null && item.price !== "") {
    const formatted = formatPrice(item.price);
    if (formatted) return formatted;
  }
  return formatPrice(item.extracted_price);
}

function normalizeReviews(value) {
  if (value == null) return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const n = Number.parseInt(String(value).replace(/,/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

function normalizeRating(value) {
  if (value == null) return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const n = Number.parseFloat(String(value));
  return Number.isFinite(n) ? n : null;
}

function extractShoppingResults(data, limit = 10) {
  const rows = Array.isArray(data?.shopping_results)
    ? data.shopping_results
    : [];

  const listings = [];
  const seen = new Set();

  for (const item of rows) {
    if (listings.length >= limit) break;
    if (!item || typeof item !== "object") continue;

    const source = String(item.source ?? "");
    if (!source.includes("Etsy")) continue;

    const title = String(item.title ?? "").replace(/\s+/g, " ").trim();
    if (!title) continue;

    const dedupeKey =
      String(item.link ?? item.product_link ?? "").trim() ||
      `${title}|${item.extracted_price ?? pickListingPrice(item)}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    listings.push({
      title,
      price: pickListingPrice(item),
      rating: normalizeRating(item.rating),
      reviews: normalizeReviews(item.reviews),
    });
  }

  return listings;
}

function serpApiErrorMessage(err) {
  if (typeof err === "string") {
    try {
      const parsed = JSON.parse(err);
      if (parsed?.error) return String(parsed.error);
    } catch {
      if (err.length > 0 && err.length < 400) return err;
    }
    return "SerpApi returned an error response.";
  }
  if (err instanceof Error) return err.message;
  return "SerpApi request failed.";
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const shopname = searchParams.get("shopname")?.trim();

    if (!shopname || !isValidShopname(shopname)) {
      return NextResponse.json(
        { error: "Missing or invalid shopname query parameter." },
        { status: 400 }
      );
    }

    const apiKey = process.env.SERPAPI_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: "SERPAPI_KEY is not set in the environment." },
        { status: 500 }
      );
    }

    let data;
    try {
      data = await getJson({
        engine: "google_shopping",
        q: `${shopname} etsy`,
        api_key: apiKey,
        timeout: 30_000,
      });
    } catch (err) {
      if (err instanceof MissingApiKeyError) {
        return NextResponse.json(
          { error: "SerpApi API key is missing or invalid." },
          { status: 500 }
        );
      }
      if (err instanceof InvalidArgumentError || err instanceof InvalidTimeoutError) {
        return NextResponse.json(
          { error: err.message },
          { status: 400 }
        );
      }
      console.error("[api/etsy/shop] SerpApi request failed", err);
      return NextResponse.json(
        { error: serpApiErrorMessage(err) },
        { status: 502 }
      );
    }

    if (data?.error) {
      const msg =
        typeof data.error === "string"
          ? data.error
          : "SerpApi returned an error in the response body.";
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    const shopName = prettifyShopSlug(shopname);
    const listings = extractShoppingResults(data, 10);

    return NextResponse.json({
      shopName,
      listings,
    });
  } catch (error) {
    console.error("[api/etsy/shop]", error);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
