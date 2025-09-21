// URL scraping and keyword detection utilities
const restrictedKeywords = {
  crypto: ["bitcoin", "cryptocurrency", "crypto", "blockchain", "coinbase", "ethereum", "trading crypto", "digital currency", "BTC", "ETH", "NFT"],
  gambling: ["casino", "bet", "poker", "gambling", "sportsbook", "wager", "slots", "lottery", "jackpot"],
  alcohol: ["beer", "wine", "vodka", "brewery", "distillery", "alcohol", "spirits", "whiskey", "bourbon"],
  healthcare: ["prescription", "medication", "cure", "treatment", "medical device", "FDA approved", "clinical"],
  financial: ["loan", "credit", "investment", "forex", "payday loan", "get rich quick"],
  adult: ["adult", "mature", "explicit", "nsfw", "escort"],
  misleading: ["miracle", "guaranteed results", "lose weight fast", "one weird trick"]
};

export interface WebsiteAnalysis {
  detectedKeywords: string[];
  detectedCategories: string[];
  htmlPreview: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  try {
    // Try multiple CORS proxy services for better reliability
    const proxies = [
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
      `https://cors-anywhere.herokuapp.com/${url}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
    ];
    
    let htmlContent = '';
    let lastError = null;
    
    for (const proxyUrl of proxies) {
      try {
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
          },
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        htmlContent = (data.contents || data.content || data).toLowerCase();
        break; // Success, exit loop
      } catch (error) {
        lastError = error;
        console.warn(`Proxy ${proxyUrl} failed:`, error);
        continue; // Try next proxy
      }
    }
    
    // If all proxies failed, perform basic URL analysis
    if (!htmlContent) {
      console.warn('All CORS proxies failed, performing basic URL analysis');
      return performBasicUrlAnalysis(url);
    }
    
    const detectedKeywords: string[] = [];
    const detectedCategories: string[] = [];
    
    Object.entries(restrictedKeywords).forEach(([category, keywords]) => {
      const found = keywords.filter(keyword => htmlContent.includes(keyword.toLowerCase()));
      if (found.length > 0) {
        detectedKeywords.push(...found);
        if (!detectedCategories.includes(category)) {
          detectedCategories.push(category);
        }
      }
    });
    
    const riskLevel = calculateRiskLevel(detectedCategories);
    
    return { 
      detectedKeywords, 
      detectedCategories, 
      htmlPreview: htmlContent.substring(0, 200),
      riskLevel
    };
  } catch (error) {
    console.error('Website analysis failed:', error);
    return performBasicUrlAnalysis(url);
  }
}

function performBasicUrlAnalysis(url: string): WebsiteAnalysis {
  const urlLower = url.toLowerCase();
  const detectedKeywords: string[] = [];
  const detectedCategories: string[] = [];
  
  // Analyze URL for suspicious keywords
  Object.entries(restrictedKeywords).forEach(([category, keywords]) => {
    const found = keywords.filter(keyword => urlLower.includes(keyword.toLowerCase()));
    if (found.length > 0) {
      detectedKeywords.push(...found);
      if (!detectedCategories.includes(category)) {
        detectedCategories.push(category);
      }
    }
  });
  
  const riskLevel = calculateRiskLevel(detectedCategories);
  
  return {
    detectedKeywords,
    detectedCategories,
    htmlPreview: `Basic URL analysis performed (content scraping unavailable): ${url.substring(0, 100)}`,
    riskLevel
  };
}
function calculateRiskLevel(categories: string[]): 'low' | 'medium' | 'high' {
  if (categories.length === 0) return 'low';
  if (categories.length <= 2) return 'medium';
  return 'high';
}