import type { FormData, FileAnalysis, ComplianceResults, ComplianceResult } from '../types';
import { PUBLISHERS, type PublisherRequirements } from '../data/publishers';
import { analyzeWebsite, type WebsiteAnalysis } from './urlScraper';
import { scrapePublisherData } from './publisherScraper';

export const analyzeCompliance = async (
  formData: FormData,
  fileAnalyzes: FileAnalysis[]
): Promise<ComplianceResults> => {

  // Perform AI-powered website analysis
  const websiteAnalysis = await analyzeWebsite(formData.websiteUrl, formData.brandName, formData.iabIndustry);

  const allPublisherResults: ComplianceResult[] = [];

  // Analyze each selected publisher
  for (const publisherName of formData.selectedPublishers) {
    const publisher = PUBLISHERS.find(p => p.name === publisherName);
    if (!publisher) continue;

    // Scrape dynamic publisher data
    const scrapedData = await scrapePublisherData(publisherName);

    // Analyze each file against this publisher
    for (const fileAnalysis of fileAnalyzes) {
      const result = analyzePublisherCompliance(
        publisher,
        fileAnalysis,
        websiteAnalysis,
        formData.iabIndustry,
        scrapedData
      );
      allPublisherResults.push(result);
    }
  }

  return {
    publisherResults: allPublisherResults,
    fileAnalyzes,
    websiteAnalysis: {
      detectedKeywords: websiteAnalysis.detectedCategories,
      riskLevel: websiteAnalysis.riskLevel,
      aiExplanation: websiteAnalysis.aiExplanation
    },
    timestamp: new Date().toISOString()
  };
};

const analyzePublisherCompliance = (
  publisher: PublisherRequirements,
  fileAnalysis: FileAnalysis,
  websiteAnalysis: WebsiteAnalysis,
  iabIndustry: string,
  scrapedData: any
): ComplianceResult => {
  // Technical compliance check
  const techIssues: string[] = [];
  let techStatus: 'pass' | 'fail' = 'pass';

  if (fileAnalysis.fileType === 'video' && publisher.technicalSpecs) {
    if (!publisher.technicalSpecs.formats.includes(fileAnalysis.format)) {
      techIssues.push(`Format ${fileAnalysis.format} not supported. Requires: ${publisher.technicalSpecs.formats.join(', ')}`);
      techStatus = 'fail';
    }

    const fileSizeMB = fileAnalysis.fileSize / (1024 * 1024);
    if (fileSizeMB > publisher.technicalSpecs.maxFileSize) {
      techIssues.push(`File size ${fileSizeMB.toFixed(1)}MB exceeds limit of ${publisher.technicalSpecs.maxFileSize}MB`);
      techStatus = 'fail';
    }

    if (fileAnalysis.duration > publisher.technicalSpecs.maxDuration) {
      techIssues.push(`Duration ${fileAnalysis.duration}s exceeds limit of ${publisher.technicalSpecs.maxDuration}s`);
      techStatus = 'fail';
    }

    if (fileAnalysis.resolution.width < publisher.technicalSpecs.minResolution.width ||
        fileAnalysis.resolution.height < publisher.technicalSpecs.minResolution.height) {
      techIssues.push(`Resolution ${fileAnalysis.resolution.width}x${fileAnalysis.resolution.height} below minimum ${publisher.technicalSpecs.minResolution.width}x${publisher.technicalSpecs.minResolution.height}`);
      techStatus = 'fail';
    }
  } else if (fileAnalysis.fileType === 'image' && publisher.staticSpecs) {
    if (!publisher.staticSpecs.formats.includes(fileAnalysis.format)) {
      techIssues.push(`Format ${fileAnalysis.format} not supported. Requires: ${publisher.staticSpecs.formats.join(', ')}`);
      techStatus = 'fail';
    }

    const fileSizeMB = fileAnalysis.fileSize / (1024 * 1024);
    if (fileSizeMB > publisher.staticSpecs.maxFileSize) {
      techIssues.push(`File size ${fileSizeMB.toFixed(1)}MB exceeds limit of ${publisher.staticSpecs.maxFileSize}MB`);
      techStatus = 'fail';
    }

    if (fileAnalysis.resolution.width < publisher.staticSpecs.minResolution.width ||
        fileAnalysis.resolution.height < publisher.staticSpecs.minResolution.height) {
      techIssues.push(`Resolution ${fileAnalysis.resolution.width}x${fileAnalysis.resolution.height} below minimum ${publisher.staticSpecs.minResolution.width}x${publisher.staticSpecs.minResolution.height}`);
      techStatus = 'fail';
    }

    if (publisher.staticSpecs.aspectRatio && fileAnalysis.aspectRatio &&
        !publisher.staticSpecs.aspectRatio.includes(fileAnalysis.aspectRatio)) {
      techIssues.push(`Aspect ratio ${fileAnalysis.aspectRatio} not optimal. Recommended: ${publisher.staticSpecs.aspectRatio.join(', ')}`);
    }
  }

  // Policy compliance check
  const policyIssues: string[] = [];
  let policyStatus: 'pass' | 'fail' | 'review' = 'pass';

  const prohibitedCategories = scrapedData?.policies ?
    Object.keys(scrapedData.policies).filter(key => scrapedData.policies[key] === 'prohibited') :
    publisher.policyRestrictions.prohibited;

  const approvalCategories = scrapedData?.policies ?
    Object.keys(scrapedData.policies).filter(key => scrapedData.policies[key] === 'conditional') :
    publisher.policyRestrictions.requiresApproval;

  const prohibitedFound = websiteAnalysis.detectedCategories.filter(category =>
    prohibitedCategories.includes(category)
  );

  const approvalRequired = websiteAnalysis.detectedCategories.filter(category =>
    approvalCategories.includes(category)
  );

  if (prohibitedFound.length > 0) {
    policyStatus = 'fail';
    policyIssues.push(`Prohibited content detected: ${prohibitedFound.join(', ')}`);
  }

  if (approvalRequired.length > 0) {
    policyStatus = 'review';
    policyIssues.push(`Content requires approval: ${approvalRequired.join(', ')}`);
  }

  let overallStatus: 'pass' | 'fail' | 'review' = 'pass';
  if (techStatus === 'fail' || policyStatus === 'fail') {
    overallStatus = 'fail';
  } else if (policyStatus === 'review') {
    overallStatus = 'review';
  }

  return {
    publisher: publisher,
    fileAnalysis: fileAnalysis,
    overallStatus: overallStatus === 'review' ? 'WARNING' : overallStatus.toUpperCase() as 'PASS' | 'FAIL' | 'WARNING',
    adSpecs: {
      status: techStatus,
      issues: techIssues
    },
    brandSafety: {
      status: policyStatus,
      issues: policyIssues,
      detectedKeywords: websiteAnalysis.detectedCategories
    }
  };
};
