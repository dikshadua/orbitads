import type { PublisherRequirements } from '../types';

export const PUBLISHERS: PublisherRequirements[] = [
  {
    name: 'TikTok',
    logo: '',
    category: 'Social',
    technicalSpecs: {
      formats: ['mp4'],
      maxFileSize: 500, // MB
      maxDuration: 60, // seconds
      minResolution: { width: 720, height: 1280 },
      aspectRatio: ['9:16', '1:1', '16:9']
    },
    staticSpecs: {
      formats: ['jpg', 'png'],
      maxFileSize: 10, // MB
      minResolution: { width: 640, height: 640 },
      aspectRatio: ['9:16', '1:1', '16:9']
    },
    policyRestrictions: {
      prohibited: ['crypto', 'gambling', 'adult'],
      requiresApproval: ['alcohol', 'financial', 'healthcare']
    },
    policyUrl: 'https://ads.tiktok.com/help/article?aid=9552'
  },
  {
    name: 'Facebook',
    logo: '',
    category: 'Social',
    technicalSpecs: {
      formats: ['mp4', 'mov'],
      maxFileSize: 4000, // MB
      maxDuration: 240, // seconds
      minResolution: { width: 1080, height: 1080 },
      aspectRatio: ['1:1', '16:9', '9:16', '4:5']
    },
    staticSpecs: {
      formats: ['jpg', 'png'],
      maxFileSize: 30, // MB
      minResolution: { width: 1080, height: 1080 },
      aspectRatio: ['1:1', '16:9', '9:16', '4:5']
    },
    policyRestrictions: {
      prohibited: ['crypto', 'adult'],
      requiresApproval: ['gambling', 'alcohol', 'financial', 'healthcare', 'politics']
    },
    policyUrl: 'https://www.facebook.com/policies/ads'
  },
  {
    name: 'Instagram',
    logo: '',
    category: 'Social',
    technicalSpecs: {
      formats: ['mp4', 'mov'],
      maxFileSize: 4000, // MB
      maxDuration: 120, // seconds
      minResolution: { width: 1080, height: 1080 },
      aspectRatio: ['1:1', '16:9', '9:16', '4:5']
    },
    staticSpecs: {
      formats: ['jpg', 'png'],
      maxFileSize: 30, // MB
      minResolution: { width: 1080, height: 1080 },
      aspectRatio: ['1:1', '9:16', '16:9', '4:5']
    },
    policyRestrictions: {
      prohibited: ['crypto', 'adult'],
      requiresApproval: ['gambling', 'alcohol', 'financial', 'healthcare', 'politics']
    },
    policyUrl: 'https://www.facebook.com/policies/ads'
  },
  {
    name: 'Pinterest',
    logo: '',
    category: 'Social',
    technicalSpecs: {
      formats: ['mp4', 'mov'],
      maxFileSize: 2000, // MB
      maxDuration: 15, // seconds
      minResolution: { width: 1000, height: 1500 },
      aspectRatio: ['2:3', '1:1', '9:16']
    },
    staticSpecs: {
      formats: ['jpg', 'png'],
      maxFileSize: 20, // MB
      minResolution: { width: 1000, height: 1500 },
      aspectRatio: ['2:3', '1:1', '9:16'],
      recommended: '2:3 aspect ratio optimal for Pinterest'
    },
    policyRestrictions: {
      prohibited: ['adult', 'misleading'],
      requiresApproval: ['crypto', 'gambling', 'alcohol', 'healthcare']
    },
    policyUrl: 'https://policy.pinterest.com/advertising-guidelines'
  },
  {
    name: 'YouTube',
    logo: '',
    category: 'Video',
    technicalSpecs: {
      formats: ['mp4', 'mov'],
      maxFileSize: 10000, // MB
      maxDuration: 120, // seconds for ads
      minResolution: { width: 1280, height: 720 },
      aspectRatio: ['16:9', '1:1', '9:16']
    },
    staticSpecs: {
      formats: ['jpg', 'png'],
      maxFileSize: 2, // MB
      minResolution: { width: 1280, height: 720 },
      aspectRatio: ['16:9']
    },
    policyRestrictions: {
      prohibited: ['adult', 'violence'],
      requiresApproval: ['financial', 'healthcare', 'gambling', 'alcohol', 'politics']
    },
    policyUrl: 'https://support.google.com/adspolicy/answer/6008942'
  },
  {
    name: 'Netflix',
    logo: '',
    category: 'CTV',
    technicalSpecs: {
      formats: ['mp4', 'mov'],
      maxFileSize: 2000, // MB
      maxDuration: 30, // seconds
      minResolution: { width: 1920, height: 1080 },
      aspectRatio: ['16:9']
    },
    staticSpecs: {
      formats: ['jpg', 'png'],
      maxFileSize: 2, // MB
      minResolution: { width: 1280, height: 720 },
      aspectRatio: ['16:9']
    },
    policyRestrictions: {
      prohibited: ['crypto', 'adult', 'gambling', 'violence'],
      requiresApproval: ['alcohol', 'financial', 'healthcare']
    },
    policyUrl: 'https://advertising.netflix.com/en-us/faqs'
  },
  {
    name: 'Hulu',
    logo: '',
    category: 'CTV',
    technicalSpecs: {
      formats: ['mp4', 'mov'],
      maxFileSize: 2000, // MB
      maxDuration: 60, // seconds
      minResolution: { width: 1280, height: 720 },
      aspectRatio: ['16:9']
    },
    staticSpecs: {
      formats: ['jpg', 'png'],
      maxFileSize: 2, // MB
      minResolution: { width: 1280, height: 720 },
      aspectRatio: ['16:9']
    },
    policyRestrictions: {
      prohibited: ['crypto', 'adult', 'gambling'],
      requiresApproval: ['alcohol', 'financial', 'healthcare', 'politics']
    },
    policyUrl: 'https://www.disneycampaignmanager.com/creative-hub/tech-specs-for-video-ads/'
  },
  {
    name: 'Disney+',
    logo: '',
    category: 'CTV',
    technicalSpecs: {
      formats: ['mp4', 'mov'],
      maxFileSize: 2000, // MB
      maxDuration: 30, // seconds
      minResolution: { width: 1920, height: 1080 },
      aspectRatio: ['16:9']
    },
    staticSpecs: {
      formats: ['jpg', 'png'],
      maxFileSize: 2, // MB
      minResolution: { width: 1280, height: 720 },
      aspectRatio: ['16:9']
    },
    policyRestrictions: {
      prohibited: ['crypto', 'adult', 'gambling', 'alcohol', 'violence'],
      requiresApproval: ['financial', 'healthcare']
    },
    policyUrl: 'https://www.disneycampaignmanager.com/creative-hub/tech-specs-for-video-ads/'
  },
  {
    name: 'Prime Video',
    logo: '',
    category: 'CTV',
    technicalSpecs: {
      formats: ['mp4', 'mov'],
      maxFileSize: 3000, // MB
      maxDuration: 60, // seconds
      minResolution: { width: 1920, height: 1080 },
      aspectRatio: ['16:9']
    },
    staticSpecs: {
      formats: ['jpg', 'png'],
      maxFileSize: 2, // MB
      minResolution: { width: 1280, height: 720 },
      aspectRatio: ['16:9']
    },
    policyRestrictions: {
      prohibited: ['crypto', 'adult'],
      requiresApproval: ['gambling', 'alcohol', 'financial', 'healthcare', 'politics']
    },
    policyUrl: 'https://advertising.amazon.com/resources/ad-policy/'
  },
  {
    name: 'Paramount',
    logo: '',
    category: 'CTV',
    technicalSpecs: {
      formats: ['mp4', 'mov'],
      maxFileSize: 2000, // MB
      maxDuration: 60, // seconds
      minResolution: { width: 1280, height: 720 },
      aspectRatio: ['16:9']
    },
    staticSpecs: {
      formats: ['jpg', 'png'],
      maxFileSize: 2, // MB
      minResolution: { width: 1280, height: 720 },
      aspectRatio: ['16:9']
    },
    policyRestrictions: {
      prohibited: ['crypto', 'adult', 'gambling'],
      requiresApproval: ['alcohol', 'financial', 'healthcare', 'politics']
    },
    policyUrl: 'https://www.paramount.com/advertising'
  },
  {
    name: 'Discovery',
    logo: '',
    category: 'CTV',
    technicalSpecs: {
      formats: ['mp4', 'mov'],
      maxFileSize: 2000, // MB
      maxDuration: 60, // seconds
      minResolution: { width: 1280, height: 720 },
      aspectRatio: ['16:9']
    },
    staticSpecs: {
      formats: ['jpg', 'png'],
      maxFileSize: 2, // MB
      minResolution: { width: 1280, height: 720 },
      aspectRatio: ['16:9']
    },
    policyRestrictions: {
      prohibited: ['crypto', 'adult', 'gambling'],
      requiresApproval: ['alcohol', 'financial', 'healthcare', 'politics']
    },
    policyUrl: 'https://www.discovery.com/advertising'
  },
];