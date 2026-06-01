export interface FormData {
  brandName: string;
  websiteUrl: string;
  iabIndustry: string;
  selectedPublishers: string[];
}

export interface FileAnalysis {
  fileName: string;
  fileSize: number;
  fileType: 'video' | 'image';
  duration: number;
  format: string;
  resolution: {
    width: number;
    height: number;
  };
  aspectRatio?: string;
  bitrate?: number;
  id: string;
  imageBase64?: string; // resized image or video frame for creative review
  mimeType?: string;
}

// One result per model — eval-ready
export interface ModelCreativeAnalysis {
  model: 'claude' | 'gpt-4o';
  violations: string[];
  confidence: 'high' | 'medium' | 'low';
  flagged: boolean;
  summary: string;
}

// Per-file creative review, supports multiple model results side by side
export interface CreativeReview {
  fileId: string;
  fileName: string;
  fileType: 'video' | 'image';
  modelResults: ModelCreativeAnalysis[];
  agreement: 'agree-safe' | 'agree-flagged' | 'disagree' | 'single-model';
  recommendHumanReview: boolean;
}

export interface PublisherRequirements {
  name: string;
  logo: string;
  category: 'Social' | 'CTV' | 'Video';
  technicalSpecs: {
    formats: string[];
    maxFileSize: number; // in MB
    maxDuration: number; // in seconds
    minResolution: {
      width: number;
      height: number;
    };
    aspectRatio?: string[];
  };
  staticSpecs?: {
    formats: string[];
    maxFileSize: number; // in MB
    minResolution: {
      width: number;
      height: number;
    };
    aspectRatio?: string[];
    recommended?: string;
  };
  policyRestrictions: {
    prohibited: string[];
    requiresApproval: string[];
  };
  policyUrl: string;
}

export interface ComplianceResult {
  publisher: PublisherRequirements;
  fileAnalysis: FileAnalysis;
  adSpecs: {
    status: 'pass' | 'fail';
    issues: string[];
  };
  brandSafety: {
    status: 'pass' | 'fail' | 'review';
    issues: string[];
    detectedKeywords: string[];
  };
  overallStatus: 'PASS' | 'FAIL' | 'WARNING';
  skipReason?: string;
}

export interface ComplianceResults {
  publisherResults: ComplianceResult[];
  fileAnalyzes: FileAnalysis[];
  websiteAnalysis: {
    detectedKeywords: string[];
    riskLevel: 'low' | 'medium' | 'high';
    aiExplanation?: string;
  };
  creativeReviews?: CreativeReview[];
  timestamp: string;
}