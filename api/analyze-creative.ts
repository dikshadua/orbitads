export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageBase64, mimeType, fileName, brandName, iabIndustry, publishers } = req.body;

  if (!imageBase64) {
    return res.status(200).json({
      model: 'claude',
      violations: [],
      confidence: 'low',
      flagged: false,
      summary: 'Debug: no imageBase64 received — capture may have failed in browser.'
    });
  }

  // Log size for debugging (base64 string length / 1.33 ≈ bytes)
  const estimatedKB = Math.round(imageBase64.length / 1333);
  if (estimatedKB > 4000) {
    return res.status(200).json({
      model: 'claude',
      violations: [],
      confidence: 'low',
      flagged: false,
      summary: `Debug: image too large (${estimatedKB}KB). Reduce resize max or quality.`
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      model: 'claude',
      violations: [],
      confidence: 'low',
      flagged: false,
      summary: 'Creative review unavailable: API key not configured.'
    });
  }

  const prompt = `You are a Trust & Safety reviewer at an ad platform. Review this ad creative for policy violations before it goes live.

Advertiser: ${brandName || 'Unknown'}
IAB Industry: ${iabIndustry || 'Unknown'}
Target Platforms: ${(publishers || []).join(', ')}

Return a JSON response with this exact structure:
{
  "violations": [],
  "confidence": "high",
  "flagged": false,
  "summary": "string"
}

Check for:
- Misleading claims: unsubstantiated superlatives ("best", "#1", "guaranteed", "clinically proven"), unrealistic promises, fake testimonials
- Before/after imagery suggesting dramatic transformation
- Prohibited categories visible in the creative: gambling, crypto, adult content, weapons, violence
- Deceptive pricing, fake urgency ("limited time only", artificial scarcity)
- Sensationalist or clickbait framing
- Any content that would violate the target platforms' advertiser policies

Rules:
- violations: array of specific issues found. Empty array if clean.
- confidence: "high" (clear decision either way), "medium" (edge case), "low" (ambiguous or unclear image)
- flagged: true if any violations found
- summary: 2-3 sentences describing what the creative shows and your overall assessment.

Return ONLY valid JSON. No markdown, no code blocks.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 600,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType || 'image/jpeg',
                data: imageBase64
              }
            },
            {
              type: 'text',
              text: prompt
            }
          ]
        }]
      }),
      signal: AbortSignal.timeout(25000)
    });

    const data = await response.json() as any;

    if (!response.ok) {
      const errorDetail = data?.error?.message || JSON.stringify(data);
      return res.status(200).json({
        model: 'claude',
        violations: [],
        confidence: 'low',
        flagged: false,
        summary: `Debug API error: ${response.status} — ${errorDetail}`
      });
    }

    const responseText = data.content?.[0]?.text || '{}';
    const cleaned = responseText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    try {
      const analysis = JSON.parse(cleaned);
      return res.status(200).json({ model: 'claude', ...analysis });
    } catch (parseErr) {
      return res.status(200).json({
        model: 'claude',
        violations: [],
        confidence: 'low',
        flagged: false,
        summary: `Debug parse error: ${cleaned.substring(0, 200)}`
      });
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return res.status(200).json({
      model: 'claude',
      violations: [],
      confidence: 'low',
      flagged: false,
      summary: `Debug catch: ${errorMsg}`
    });
  }
}
