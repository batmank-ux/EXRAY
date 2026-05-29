// app/api/ai/action-plan/route.js
// OpenRouter API — EXRAY AI Action Plan — Updated System Prompt
 
import { NextResponse } from "next/server";
 
export async function POST(req) {
  try {
    const body = await req.json();
    const { shopData, keywordData, shopName, keyword } = body;
 
    if (!shopData && !keywordData && !shopName && !keyword) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }
 
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
 
    const manualContext = (!shopData && !keywordData) ? `
MANUAL INPUT:
- Shop Name: ${shopName || "Not provided"}
- Target Keyword: ${keyword || "Not provided"}
` : "";
 
    // ─── UPGRADED SYSTEM PROMPT ───────────────────────────────────
    const systemPrompt = `You are the core AI intelligence engine behind EXRAY — an elite Etsy market intelligence platform.
 
Your role is NOT to behave like a generic AI assistant.
 
You are:
- An Etsy market strategist
- Competitor intelligence analyst
- Conversion optimization expert
- Pricing strategist
- Marketplace growth consultant
 
Your goal: analyze the seller's Etsy data and generate a highly actionable AI Action Plan designed to improve sales, positioning, conversion, competitiveness, pricing strategy, discoverability, and niche advantage.
 
ANALYSIS FRAMEWORK — evaluate across:
1. Market Positioning — where the shop sits, beginner vs premium, differentiation
2. Pricing Strategy — competitor pricing, psychology, anchoring, underpricing risks
3. Listing Quality — title structure, thumbnail clarity, conversion potential
4. Keyword Competitiveness — difficulty, density, ranking feasibility, intent
5. Niche Saturation — competition density, visual similarity, review dominance
6. Competitor Intelligence — why competitors outperform, their advantages
7. Review & Trust Signals — recurring complaints, gaps competitors ignore
8. Growth Opportunities — underserved niches, pricing gaps, bundles
 
AI TONE — sound like:
- A strategic consultant
- An intelligence analyst
- A professional growth advisor
NOT: overly friendly, robotic, motivational, or generic
 
CRITICAL RULES:
1. Base EVERY insight on the actual data provided — reference specific numbers
2. Be brutally honest about weaknesses
3. Identify real opportunities — not generic "optimize SEO" advice
4. Never give vague or motivational filler content
5. Sound like a McKinsey analyst reviewing an Etsy business
6. Return ONLY valid JSON — no markdown, no text outside JSON
7. All scores must be 0-100 integers
8. Confidence scores must be realistic based on available data quality
 
The seller should feel: understood, strategically guided, professionally advised.
The output should feel like: a premium Etsy intelligence report by a professional market strategist.`;
 
    const userPrompt = `Analyze this Etsy market intelligence data and generate a complete AI Action Plan.
 
${shopContext}
${keywordContext}
${manualContext}
 
Return a JSON object with this EXACT structure (pure JSON only, no markdown):
 
{
  "strategicScore": {
    "overall": 0-100,
    "marketPosition": "string describing position in 3-5 words",
    "growthPotential": "High|Medium|Low",
    "competitionDifficulty": "High|Medium|Low",
    "saturationLevel": "High|Medium|Low",
    "headline": "One sharp strategic sentence about their situation — be specific, use data"
  },
  "criticalIssues": [
    {
      "title": "Specific issue title",
      "severity": "Critical|High|Medium",
      "confidence": 0-100,
      "whyItMatters": "Specific explanation referencing actual data",
      "strategicImpact": "Concrete impact on sales/positioning",
      "action": "Specific recommended action with numbers where possible"
    }
  ],
  "growthOpportunities": [
    {
      "title": "Opportunity title",
      "potential": "High|Medium|Low",
      "confidence": 0-100,
      "insight": "Specific opportunity with data-backed reasoning",
      "action": "Concrete steps to capture this opportunity",
      "timeframe": "Immediate|Short-term|Long-term"
    }
  ],
  "pricingIntelligence": {
    "assessment": "Sharp pricing assessment with specific numbers",
    "positioning": "Budget|Mid-market|Premium|Ultra-premium",
    "recommendation": "Specific pricing recommendation with exact numbers or percentages",
    "insights": [
      "Specific pricing insight with data reference",
      "Second specific pricing insight"
    ]
  },
  "keywordStrategy": {
    "assessment": "Overall keyword situation — be specific",
    "opportunities": [
      {
        "keyword": "keyword phrase",
        "why": "Specific reason this keyword is valuable or dangerous",
        "opportunityScore": 0-100,
        "action": "Concrete action for this keyword"
      }
    ]
  },
  "saturationAnalysis": {
    "level": "High|Medium|Low",
    "score": 0-100,
    "assessment": "Specific saturation assessment with context",
    "signals": [
      { "signal": "Specific market signal", "status": "danger|warning|opportunity" }
    ]
  },
  "competitorIntelligence": {
    "assessment": "Why top competitors are winning based on data",
    "advantages": [
      "Specific competitor advantage observed in data"
    ],
    "weaknesses": [
      "Specific competitor weakness you can exploit"
    ]
  },
  "quickWins": [
    {
      "action": "Specific immediate action — be precise",
      "impact": "High|Medium|Low",
      "effort": "Low|Medium|High",
      "timeframe": "Today|This week|This month",
      "reasoning": "Why this will work based on data"
    }
  ],
  "longTermStrategy": [
    {
      "move": "Strategic long-term move",
      "rationale": "Consulting-grade reasoning for this move",
      "timeframe": "1-3 months|3-6 months|6-12 months"
    }
  ],
  "actionTimeline": [
    {
      "phase": "Phase 1|Phase 2|Phase 3",
      "timeframe": "timeframe string",
      "focus": "Main strategic focus",
      "actions": ["specific action 1", "specific action 2", "specific action 3"]
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
          { role: "user",   content: userPrompt },
        ],
        temperature: 0.35,
        max_tokens: 3500,
      }),
    });
 
    if (!response.ok) {
      const err = await response.text();
      console.error("OpenRouter error:", err);
      return NextResponse.json({ error: "AI service error. Check your OpenRouter API key." }, { status: 500 });
    }
 
    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";
 
    // Clean JSON — remove markdown fences if present
    const cleaned = rawContent
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
 
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON parse error:", e, "\nRaw (first 500):", cleaned.slice(0, 500));
      return NextResponse.json({ error: "Failed to parse AI response. Try again." }, { status: 500 });
    }
 
    return NextResponse.json(parsed);
 
  } catch (err) {
    console.error("Action plan error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
 