export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, iabIndustry, brandName } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      detectedCategories: [], riskLevel: 'low',
      aiExplanation: 'Debug: ANTHROPIC_API_KEY is not set in environment variables.',
      detectedKeywords: []
    });
  }

  // Fetch website content server-side
  let htmlContent = '';
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OrbitAds/1.0)' },
      signal: AbortSignal.timeout(5000)
    });
    const text = await response.text();
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
- aiExplanation: 2-3 sentences explaining the brand safety assessment. Be specific about concerns and which publishers would flag this. If clean, say so clearly.
- detectedKeywords: specific words/phrases that triggered flags. Empty array if none.

Return ONLY valid JSON. No markdown, no code blocks, no other text.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json() as any;

    if (!response.ok) {
      return res.status(200).json({
        detectedCategories: [], riskLevel: 'low',
        aiExplanation: `Debug: ${response.status} ${JSON.stringify(data)}`,
        detectedKeywords: []
      });
    }

    const responseText = data.content?.[0]?.text || '{}';
    const analysis = JSON.parse(responseText);
    return res.status(200).json(analysis);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return res.status(200).json({
      detectedCategories: [], riskLevel: 'low',
      aiExplanation: `Debug catch: ${errorMsg}`,
      detectedKeywords: []
    });
  }
}
