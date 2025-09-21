// Test data for demonstration purposes
export const TEST_FILES = [
  {
    name: 'brand-video-tiktok.mp4',
    description: 'TikTok-optimized vertical video',
    specs: {
      format: 'MP4',
      resolution: { width: 720, height: 1280 },
      duration: 15,
      fileSize: 25 * 1024 * 1024 // 25MB
    }
  },
  {
    name: 'ctv-commercial-60s.mp4',
    description: 'Standard CTV commercial',
    specs: {
      format: 'MP4',
      resolution: { width: 1920, height: 1080 },
      duration: 60,
      fileSize: 150 * 1024 * 1024 // 150MB
    }
  },
  {
    name: 'oversized-video.mov',
    description: 'Large file that exceeds limits',
    specs: {
      format: 'MOV',
      resolution: { width: 1280, height: 720 },
      duration: 120,
      fileSize: 800 * 1024 * 1024 // 800MB
    }
  }
];

export const TEST_WEBSITES = [
  {
    url: 'https://safebrand.com',
    description: 'Clean brand website with no policy issues',
    riskLevel: 'low'
  },
  {
    url: 'https://cryptoexchange.com',
    description: 'Cryptocurrency exchange - high risk',
    riskLevel: 'high'
  },
  {
    url: 'https://winecollection.com',
    description: 'Wine brand - requires approval for some platforms',
    riskLevel: 'medium'
  },
  {
    url: 'https://healthtech.com',
    description: 'Healthcare technology - requires approval',
    riskLevel: 'medium'
  }
];