import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { stockName, ticker, sector, fundamentals } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a financial analyst assistant for Indian retail investors. 
Your job is to explain stock fundamentals in simple, plain English that anyone can understand.
Keep explanations concise (2-3 sentences max per point).
Focus on what matters to long-term investors.
Use Indian context where relevant (mention rupees, Indian market conditions).
Be balanced - mention both positives and concerns.
Never give buy/sell recommendations - just explain the numbers.`;

    const userPrompt = `Provide a brief, plain-English analysis for ${stockName} (${ticker}), an Indian company in the ${sector} sector.

Key metrics:
- Revenue: ₹${fundamentals.revenue} Cr
- Net Profit: ₹${fundamentals.netProfit} Cr  
- PE Ratio: ${fundamentals.peRatio}
- ROE: ${fundamentals.roe}%
- Debt-to-Equity: ${fundamentals.debtToEquity}
- Revenue Growth: ${fundamentals.revenueGrowth}%
- Profit Growth: ${fundamentals.profitGrowth}%

Please provide:
1. A one-paragraph summary of what this company's numbers tell us
2. One key strength based on the metrics
3. One thing to watch out for

Keep it under 150 words total. Use simple language.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate summary");
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ summary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in stock-summary function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
