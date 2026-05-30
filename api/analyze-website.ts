import Anthropic from '@anthropic-ai/sdk';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const { url, iabIndustry, brandName } = await req.json();

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
  }

  // Fetch website content server-side (no CORS issues)
  let htmlContent = '';
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OrbitAds/1.0; +https://orbitads.app)' },
      signal: AbortSignal.timeout(10000)
    });
    const text = await response.text();
    // Strip script/style tags and truncate to keep prompt focused
    htmlContent = text
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 6000);
  } catch {
    htmlContent = `Could not fetch content from ${url}`;
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `You are an ad policy compliance expert analyzing a website for brand safety and advertiser eligibility.

Advertiser: ${brandName || 'Unknown'}
Website URL: ${url}
IAB Industry Category: ${iabIndustry || 'Unknown'}

Website content:
${htmlContent}

Analyze this website and return a JSON response with this exact structure:
{
  "detectedCategories": [],
  "riskLevel": "low",
  "aiExplanation": "string",
  "detectedKeywords": []
}

Rules:
- detectedCategories: array of flagged categories from this list only: crypto, gambling, alcohol, healthcare, financial, adult, misleading. Empty array if none.
- riskLevel: "low" (no issues), "medium" (requires approval), or "high" (likely prohibited)
- aiExplanation: 2-3 sentences explaining the brand safety assessment. Be specific — name the exact concerns and which types of publishers would reject or flag this advertiser. If clean, say so clearly.
- detectedKeywords: specific words or phrases from the content that triggered flags. Empty array if none.

Return ONLY valid JSON. No markdown, no code blocks, no other text.`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }]
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '{}';
    const analysis = JSON.parse(responseText);

    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({
      detectedCategories: [],
      riskLevel: 'low',
      aiExplanation: 'Automated analysis unavailable — please review this website manually before running campaigns.',
      detectedKeywords: []
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}
