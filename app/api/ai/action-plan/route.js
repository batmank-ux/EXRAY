// app/api/ai/action-plan/route.js
// OpenRouter API — EXRAY AI Action Plan
 
import { NextResponse } from "next/server";
 
export async function POST(req) {
  try {
    const body = await req.json();
    const { shopData, keywordData, shopName, keyword } = body;
 
    if (!shopData && !keywordData) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }
 
    // Build context from real data
    const shopContext = shopData ? `
SHOP INTELLIGENCE DATA:
- Shop Name: ${shopData.shopName}
- Total Listings Found: ${shopData.totalFound}
- Shop Reviews: ${shopData.shopReviews || "N/A"}
- Shop Rating: ${shopData.shopRating || "N/A"}
- Pricing Strategy: ${shopData.pricingAnalysis?.strategy || "Unknown"}
- Price Floor: $${shopData.pricingAnalysis?.min || "N/A"}
- Price Median: $${shopData.pricingAnalysis?.median || "N/A"}
- Price Average: $${shopData.pricingAnalysis?.average || "N/A"}
- Price Ceiling: $${shopData.pricingAnalysis?.max || "N/A"}
- Data Points: ${shopData.pricingAnalysis?.dataPoints || 0} listings with visible prices
- Top Listings: ${shopData.listings?.slice(0,5).map(l => `"${l.title}" at ${l.price || "unknown price"}`).join("; ") || "N/A"}
` : "";
 
    const keywordContext = keywordData ? `
KEYWORD INTELLIGENCE DATA:
- Keyword: "${keywordData.keyword}"
- Average Price: $${keywordData.averagePrice || "N/A"}
- Average Rating: ${keywordData.averageRating || "N/A"} stars
- Total Listings Found: ${keywordData.totalFound}
- Competition Level: ${keywordData.competitionLevel || "N/A"}
- Difficulty Score: ${keywordData.difficultyScore || "N/A"}
- Pricing Strategy: ${keywordData.pricingAnalysis?.strategy || "N/A"}
- Price Range: $${keywordData.pricingAnalysis?.min || "N/A"} – $${keywordData.pricingAnalysis?.max || "N/A"}
- Median Price: $${keywordData.pricingAnalysis?.median || "N/A"}
- Top Listings: ${keywordData.listings?.slice(0,5).map(l => `"${l.title}" at ${l.price || "unknown price"}`).join("; ") || "N/A"}
` : "";
 
    const systemPrompt = `You are EXRAY's AI Market Strategist — an elite Etsy competitor intelligence system.
 
You analyze real market data and generate structured strategic intelligence reports.
 
Your tone is:
- Sharp and precise
- Analytically confident
- Strategic and consulting-grade
- Never motivational or generic
- Never vague or fluffy
 
You think like: McKinsey meets Bloomberg Terminal for Etsy sellers.
 
CRITICAL RULES:
1. Base EVERY insight on the actual data provided
2. Use specific numbers from the data
3. Be brutally honest about weaknesses
4. Identify real opportunities, not generic advice
5. Return ONLY valid JSON — no markdown, no explanation outside JSON
6. All scores must be 0-100 integers
7. Confidence scores must be realistic based on data quality`;
 
    const userPrompt = `Analyze this Etsy market intelligence data and generate a complete AI Action Plan.
 
${shopContext}
${keywordContext}
 
Return a JSON object with this EXACT structure (no markdown, pure JSON):
 
{
  "strategicScore": {
    "overall": 0-100,
    "marketPosition": "string describing position",
    "growthPotential": "High|Medium|Low",
    "competitionDifficulty": "High|Medium|Low",
    "saturationLevel": "High|Medium|Low",
    "headline": "One sharp strategic sentence about their situation"
  },
  "criticalIssues": [
    {
      "title": "Issue title",
      "severity": "Critical|High|Medium",
      "confidence": 0-100,
      "whyItMatters": "Specific explanation with data",
      "strategicImpact": "Impact on business",
      "action": "Specific recommended action"
    }
  ],
  "growthOpportunities": [
    {
      "title": "Opportunity title",
      "potential": "High|Medium|Low",
      "confidence": 0-100,
      "insight": "Specific opportunity with data reasoning",
      "action": "How to capture this opportunity",
      "timeframe": "Immediate|Short-term|Long-term"
    }
  ],
  "pricingIntelligence": {
    "assessment": "Sharp pricing assessment",
    "positioning": "Budget|Mid-market|Premium|Ultra-premium",
    "recommendation": "Specific pricing recommendation with numbers",
    "insights": [
      "Specific pricing insight 1 with data",
      "Specific pricing insight 2 with data"
    ]
  },
  "keywordStrategy": {
    "assessment": "Overall keyword situation",
    "opportunities": [
      {
        "keyword": "keyword phrase",
        "why": "Why this is valuable or dangerous",
        "opportunityScore": 0-100,
        "action": "What to do with this keyword"
      }
    ]
  },
  "saturationAnalysis": {
    "level": "High|Medium|Low",
    "score": 0-100,
    "assessment": "Saturation situation assessment",
    "signals": [
      { "signal": "Signal description", "status": "danger|warning|opportunity" }
    ]
  },
  "quickWins": [
    {
      "action": "Specific immediate action",
      "impact": "High|Medium|Low",
      "effort": "Low|Medium|High",
      "timeframe": "Today|This week|This month"
    }
  ],
  "longTermStrategy": [
    {
      "move": "Strategic long-term move",
      "rationale": "Why this matters strategically",
      "timeframe": "1-3 months|3-6 months|6-12 months"
    }
  ],
  "actionTimeline": [
    {
      "phase": "Phase 1|Phase 2|Phase 3",
      "timeframe": "timeframe string",
      "focus": "Main focus area",
      "actions": ["action 1", "action 2", "action 3"]
    }
  ]
}`;
 
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://exray.vercel.app",
        "X-Title": "EXRAY Intelligence Platform",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens: 3000,
      }),
    });
 
    if (!response.ok) {
      const err = await response.text();
      console.error("OpenRouter error:", err);
      return NextResponse.json({ error: "AI service error" }, { status: 500 });
    }
 
    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";
 
    // Clean and parse JSON
    const cleaned = rawContent
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
 
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON parse error:", e, "Raw:", cleaned.slice(0, 500));
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }
 
    return NextResponse.json(parsed);
 
  } catch (err) {
    console.error("Action plan error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
 