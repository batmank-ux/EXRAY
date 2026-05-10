process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextResponse } from "next/server";
import {
  getJson,
  MissingApiKeyError,
  InvalidArgumentError,
  InvalidTimeoutError,
} from "serpapi";

function isValidKeyword(value) {
  if (!value || value.length > 200) return false;
  return !/[<>"]/.test(value);
}

function parseExtractedPrice(item) {
  const v = item?.extracted_price;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (v == null || v === "") return null;
  const cleaned = String(v).replace(/[$,\s]/g, "");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
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

function competitionLevel(totalReviews) {
  const t = Number(totalReviews) || 0;
  if (t > 10000) return "High";
  if (t > 3000) return "Medium";
  return "Low";
}

function extractTopEtsyShoppingRows(data, limit = 10) {
  const rows = Array.isArray(data?.shopping_results) ? data.shopping_results : [];
  const topRows = rows.slice(0, limit);
  const out = [];

  for (const item of topRows) {
    if (!item || typeof item !== "object") continue;

    const source = String(item.source ?? "");
    if (!source.includes("Etsy")) continue;

    out.push({
      title: String(item.title ?? "").replace(/\s+/g, " ").trim() || null,
      source,
      link:
        String(item.link ?? item.product_link ?? "").replace(/\s+/g, " ").trim() ||
        null,
      extracted_price: parseExtractedPrice(item),
      rating: normalizeRating(item.rating),
      reviews: normalizeReviews(item.reviews),
    });
  }

  return out;
}

function computeAggregates(items) {
  const prices = [];
  const ratings = [];
  let totalReviews = 0;

  for (const item of items) {
    const p = parseExtractedPrice(item);
    if (p != null) prices.push(p);

    const r = normalizeRating(item.rating);
    if (r != null) ratings.push(r);

    const rev = normalizeReviews(item.reviews);
    if (rev != null) totalReviews += rev;
  }

  const average_price =
    prices.length > 0
      ? Math.round((prices.reduce((a, b) => a + b, 0) / prices.length) * 100) /
        100
      : null;

  const average_rating =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 100) /
        100
      : null;

  return {
    average_price,
    average_rating,
    total_reviews: totalReviews,
    competition_level: competitionLevel(totalReviews),
  };
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
    const keyword = searchParams.get("keyword")?.trim();

    if (!keyword || !isValidKeyword(keyword)) {
      return NextResponse.json(
        { error: "Missing or invalid keyword query parameter." },
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
        q: `${keyword} etsy`,
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
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      console.error("[api/etsy/keywords] SerpApi request failed", err);
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

    const items = extractTopEtsyShoppingRows(data, 10);
    const {
      average_price,
      average_rating,
      total_reviews,
      competition_level,
    } = computeAggregates(items);

    return NextResponse.json({
      keyword,
      average_price,
      average_rating,
      total_reviews,
      competition_level,
      top_listings: items,
    });
  } catch (error) {
    console.error("[api/etsy/keywords]", error);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
