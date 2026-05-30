export interface WebsiteAnalysis {
  detectedKeywords: string[];
  detectedCategories: string[];
  htmlPreview: string;
  riskLevel: 'low' | 'medium' | 'high';
  aiExplanation?: string;
}

export async function analyzeWebsite(url: string, brandName?: string, iabIndustry?: string): Promise<WebsiteAnalysis> {
  try {
    const response = await fetch('/api/analyze-website', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, brandName, iabIndustry })
    });

    if (!response.ok) throw new Error('API call failed');

    const analysis = await response.json();

    return {
      detectedKeywords: analysis.detectedKeywords || [],
      detectedCategories: analysis.detectedCategories || [],
      htmlPreview: '',
      riskLevel: analysis.riskLevel || 'low',
      aiExplanation: analysis.aiExplanation
    };
  } catch {
    return performBasicUrlAnalysis(url);
  }
}

// Fallback used if the API call fails
const restrictedKeywords = {
  crypto: ['bitcoin', 'cryptocurrency', 'crypto', 'blockchain', 'ethereum', 'NFT'],
  gambling: ['casino', 'bet', 'poker', 'gambling', 'sportsbook', 'wager', 'slots', 'lottery'],
  alcohol: ['beer', 'wine', 'vodka', 'brewery', 'distillery', 'alcohol', 'spirits', 'whiskey'],
  healthcare: ['prescription', 'medication', 'cure', 'treatment', 'medical device', 'FDA approved'],
  financial: ['loan', 'credit', 'investment', 'forex', 'payday loan', 'get rich quick'],
  adult: ['adult', 'mature', 'explicit', 'nsfw', 'escort'],
  misleading: ['miracle', 'guaranteed results', 'lose weight fast', 'one weird trick']
};

function performBasicUrlAnalysis(url: string): WebsiteAnalysis {
  const urlLower = url.toLowerCase();
  const detectedKeywords: string[] = [];
  const detectedCategories: string[] = [];

  Object.entries(restrictedKeywords).forEach(([category, keywords]) => {
    const found = keywords.filter(keyword => urlLower.includes(keyword.toLowerCase()));
    if (found.length > 0) {
      detectedKeywords.push(...found);
      if (!detectedCategories.includes(category)) {
        detectedCategories.push(category);
      }
    }
  });

  return {
    detectedKeywords,
    detectedCategories,
    htmlPreview: `Basic URL analysis performed (AI analysis unavailable): ${url.substring(0, 100)}`,
    riskLevel: detectedCategories.length === 0 ? 'low' : detectedCategories.length <= 2 ? 'medium' : 'high'
  };
}
