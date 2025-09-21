// Dynamic publisher data scraping
export interface PublisherScrapingResult {
  adSpecs: {
    minResolution?: string;
    maxDuration?: number;
    formats?: string[];
    maxFileSize?: number;
  };
  policies: {
    [key: string]: 'prohibited' | 'conditional' | 'allowed';
  };
}

const publisherSources = {
  tiktok: {
    policyUrl: "https://ads.tiktok.com/help/article/tiktok-advertising-policies",
    specsUrl: "https://ads.tiktok.com/help/article/video-specs-and-formats",
    scrapingRules: {
      restrictedIndustries: "look for sections about prohibited content, restricted categories",
      adSpecs: "extract video format requirements, duration limits, resolution specs"
    }
  },
  youtube: {
    policyUrl: "https://support.google.com/adspolicy/answer/6023676",
    specsUrl: "https://support.google.com/youtube/answer/1722171",
    scrapingRules: {
      restrictedIndustries: "find advertiser-friendly content guidelines",
      adSpecs: "extract video upload requirements and format specs"
    }
  },
  facebook: {
    policyUrl: "https://transparency.meta.com/policies/ad-standards/",
    specsUrl: "https://www.facebook.com/business/help/218673814885947",
    scrapingRules: {
      restrictedIndustries: "extract prohibited and restricted content categories",
      adSpecs: "find video ad technical requirements"
    }
  },
  hulu: {
    policyUrl: "https://www.hulu.com/advertising",
    specsUrl: "https://advertising.hulu.com/ad-products/video/",
    scrapingRules: {
      adSpecs: "look for HD requirements, duration limits, format specs"
    }
  }
};

// Fallback data when scraping fails
const publisherPolicies = {
  tiktok: {
    prohibited: {
      crypto: "Cryptocurrency advertising completely banned",
      gambling: "Gambling and betting prohibited",
      adult: "Adult/mature content not allowed"
    },
    conditional: {
      alcohol: "Alcohol allowed with age-gating 21+",
      financial: "Financial services need pre-approval",
      healthcare: "Healthcare claims require certification"
    }
  },
  hulu: {
    prohibited: {
      gambling: "Online gambling not permitted",
      adult: "Explicit content banned"
    },
    conditional: {
      crypto: "Cryptocurrency allowed with disclaimers",
      alcohol: "Alcohol permitted with restrictions",
      financial: "Investment products need compliance review"
    }
  },
  disney: {
    prohibited: {
      crypto: "Cryptocurrency completely banned",
      gambling: "All gambling content prohibited", 
      alcohol: "Alcohol advertising not permitted",
      adult: "Must be family-friendly"
    },
    conditional: {
      financial: "Banking/insurance only with approval"
    }
  },
  youtube: {
    prohibited: {
      misleading: "False health/financial claims banned"
    },
    conditional: {
      crypto: "Crypto allowed with proper disclosures",
      gambling: "Licensed operators only with geo-restrictions",
      alcohol: "Alcohol permitted with age-gating", 
      healthcare: "Health products need substantiation"
    }
  },
  facebook: {
    prohibited: {
      crypto: "Cryptocurrency ads banned globally",
      adult: "Adult services not permitted"
    },
    conditional: {
      gambling: "Real-money gambling restricted by region",
      alcohol: "Alcohol allowed with targeting restrictions"
    }
  },
  instagram: {
    prohibited: {
      crypto: "Cryptocurrency ads banned globally",
      adult: "Adult services not permitted"
    },
    conditional: {
      gambling: "Real-money gambling restricted by region", 
      alcohol: "Alcohol allowed with targeting restrictions"
    }
  },
  netflix: {
    prohibited: {
      gambling: "Gambling content not permitted",
      adult: "Adult content banned",
      crypto: "Cryptocurrency advertising not allowed"
    },
    conditional: {
      alcohol: "Alcohol allowed with restrictions",
      financial: "Financial services need approval"
    }
  },
  prime: {
    prohibited: {
      adult: "Explicit content not allowed"
    },
    conditional: {
      crypto: "Cryptocurrency allowed with disclaimers",
      gambling: "Licensed gambling with restrictions",
      alcohol: "Alcohol permitted with age verification"
    }
  },
  paramount: {
    prohibited: {
      gambling: "Gambling content not permitted",
      adult: "Adult content banned"
    },
    conditional: {
      crypto: "Cryptocurrency needs approval",
      alcohol: "Alcohol allowed with restrictions"
    }
  },
  discovery: {
    prohibited: {
      gambling: "Gambling content not permitted",
      adult: "Adult content banned"
    },
    conditional: {
      crypto: "Cryptocurrency needs approval",
      alcohol: "Alcohol allowed with restrictions",
      financial: "Financial services need review"
    }
  }
};

// Multiple CORS proxy services for better reliability
const corsProxies = [
  'https://api.allorigins.win/get?url=',
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/',
  'https://thingproxy.freeboard.io/fetch/',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://yacdn.org/proxy/'
]

async function fetchWithFallback(url: string): Promise<string> {
  for (const proxy of corsProxies) {
    try {
      const proxyUrl = proxy + encodeURIComponent(url);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(proxyUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      // Try to parse as JSON first, fallback to text
      let data;
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
          
          // Handle different proxy response formats
          if (data.contents) {
            return data.contents; // allorigins format
          } else if (data.data) {
            return data.data; // codetabs format
          } else if (typeof data === 'string') {
            return data; // direct content
          } else {
            throw new Error('Unexpected JSON response format');
          }
        } catch (jsonError) {
          // If JSON parsing fails, try as text
          data = await response.text();
          return data;
        }
      } else {
        // Handle as plain text
        data = await response.text();
        return data;
      }
    } catch (error) {
      console.warn(`Proxy ${proxy} failed:`, error instanceof Error ? error.message : 'Unknown error');
      continue; // Try next proxy
    }
  }
  
  console.warn('All proxy services failed, using fallback data');
  throw new Error('All proxy services failed - using cached policy data');
}

export async function scrapePublisherData(publisher: string): Promise<PublisherScrapingResult> {
  const publisherKey = publisher.toLowerCase().replace(/\+/g, '').replace(/\s/g, '');
  const source = publisherSources[publisherKey as keyof typeof publisherSources];
  const results: PublisherScrapingResult = { adSpecs: {}, policies: {} };
  
  if (!source) {
    // Return fallback data if no scraping source available
    return getFallbackData(publisherKey);
  }
  
  try {
    // Scrape policy page
    const policyText = await fetchWithFallback(source.policyUrl);
    const policyContent = policyText.toLowerCase();
    
    // Extract restricted industries using keywords
    results.policies.crypto = policyContent.includes('cryptocurrency') && policyContent.includes('prohibited') ? 'prohibited' : 'conditional';
    results.policies.gambling = policyContent.includes('gambling') && policyContent.includes('prohibited') ? 'prohibited' : 'conditional';
    results.policies.alcohol = policyContent.includes('alcohol') && policyContent.includes('prohibited') ? 'prohibited' : 'conditional';
    
    // Scrape specs page
    const specsText = await fetchWithFallback(source.specsUrl);
    const specsContent = specsText.toLowerCase();
    
    // Extract technical specs using regex patterns
    const resolutionMatch = specsContent.match(/(\d{3,4})\s*x\s*(\d{3,4})/);
    if (resolutionMatch) {
      results.adSpecs.minResolution = `${resolutionMatch[1]}x${resolutionMatch[2]}`;
    }
    
    const durationMatch = specsContent.match(/(\d+)\s*second/);
    if (durationMatch) {
      results.adSpecs.maxDuration = parseInt(durationMatch[1]);
    }
    
    return results;
  } catch (error) {
    console.error(`Failed to scrape ${publisher}:`, error);
    return getFallbackData(publisherKey);
  }
}

function getFallbackData(publisherKey: string): PublisherScrapingResult {
  const fallback = publisherPolicies[publisherKey as keyof typeof publisherPolicies];
  if (!fallback) {
    return { adSpecs: {}, policies: {} };
  }
  
  const policies: { [key: string]: 'prohibited' | 'conditional' | 'allowed' } = {};
  
  // Convert fallback data to the expected format
  Object.keys(fallback.prohibited || {}).forEach(key => {
    policies[key] = 'prohibited';
  });
  
  Object.keys(fallback.conditional || {}).forEach(key => {
    policies[key] = 'conditional';
  });
  
  return {
    adSpecs: {},
    policies
  };
}