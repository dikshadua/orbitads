import React, { useState } from 'react';
import { Building2, Globe, Tag, Users, ArrowRight, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import type { FormData } from '../types';
import { PUBLISHERS } from '../data/publishers';
import { IAB_INDUSTRIES } from '../data/iabIndustries';

interface CampaignDetailsPageProps {
  formData: FormData;
  onNext: (data: FormData) => void;
}

export const CampaignDetailsPage: React.FC<CampaignDetailsPageProps> = ({ formData, onNext }) => {
  const [localFormData, setLocalFormData] = useState<FormData>(formData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setLocalFormData({
      ...localFormData,
      [field]: value
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInputBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handlePublisherToggle = (publisherName: string) => {
    const currentSelection = localFormData.selectedPublishers;
    const newSelection = currentSelection.includes(publisherName)
      ? currentSelection.filter(p => p !== publisherName)
      : [...currentSelection, publisherName];

    handleInputChange('selectedPublishers', newSelection);
    setTouched(prev => ({ ...prev, selectedPublishers: true }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!localFormData.brandName.trim()) {
      newErrors.brandName = 'Advertiser name is required';
    }

    if (!localFormData.websiteUrl.trim()) {
      newErrors.websiteUrl = 'Website URL is required';
    } else if (!localFormData.websiteUrl.match(/^https?:\/\/.+/)) {
      newErrors.websiteUrl = 'Please enter a valid URL starting with http:// or https://';
    }

    if (localFormData.selectedPublishers.length === 0) {
      newErrors.selectedPublishers = 'Please select at least one publisher';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(localFormData);
    }
  };

  const getInputState = (field: string) => {
    if (errors[field]) return 'error';
    if (touched[field] && localFormData[field as keyof FormData]) return 'success';
    return 'default';
  };

  const isValid = localFormData.brandName && localFormData.websiteUrl && localFormData.selectedPublishers.length > 0;

  return (
    <div className="container-wide animate-slide-up">
      <div className="card-elevated p-4 sm:p-6 lg:p-12">
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12 text-white relative overflow-hidden">
          <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="hidden md:block absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center text-white mb-2 sm:mb-3">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mr-2 sm:mr-3 lg:mr-4" />
                  Advertiser Details
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-brand-100 max-w-2xl">
                  Tell us about your brand and campaign requirements to get started
                </p>
              </div>
              <div className="hidden lg:block text-right flex-shrink-0">
                <div className="text-xs sm:text-sm text-brand-200 mb-1">Step 1 of 3</div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Campaign Setup</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          <div className="space-y-2 sm:space-y-3">
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 flex items-center gap-2">
              <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-brand-500" />
              Advertiser Name
              <span className="text-error-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={localFormData.brandName}
                onChange={(e) => handleInputChange('brandName', e.target.value)}
                onBlur={() => handleInputBlur('brandName')}
                placeholder="Enter your brand or company name"
                className={`input-field text-base sm:text-lg ${
                  getInputState('brandName') === 'error' ? 'input-error' :
                  getInputState('brandName') === 'success' ? 'input-success' : ''
                }`}
              />
              {getInputState('brandName') === 'success' && (
                <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-success-500" />
              )}
              {getInputState('brandName') === 'error' && (
                <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-error-500" />
              )}
            </div>
            {errors.brandName && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-error-600 animate-slide-down">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                {errors.brandName}
              </div>
            )}
          </div>

          <div className="space-y-2 sm:space-y-3">
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 flex items-center gap-2">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-brand-500" />
              Website URL
              <span className="text-error-500">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={localFormData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                onBlur={() => handleInputBlur('websiteUrl')}
                placeholder="https://example.com"
                className={`input-field text-base sm:text-lg ${
                  getInputState('websiteUrl') === 'error' ? 'input-error' :
                  getInputState('websiteUrl') === 'success' ? 'input-success' : ''
                }`}
              />
              {getInputState('websiteUrl') === 'success' && (
                <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-success-500" />
              )}
              {getInputState('websiteUrl') === 'error' && (
                <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-error-500" />
              )}
            </div>
            {errors.websiteUrl && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-error-600 animate-slide-down">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                {errors.websiteUrl}
              </div>
            )}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500">
              <Info className="w-3 h-3 sm:w-4 sm:h-4" />
              We'll analyze your website for brand safety compliance
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <label className="block text-xs sm:text-sm font-semibold text-neutral-700 flex items-center gap-2">
              <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-brand-500" />
              IAB Industry Category
              <span className="text-neutral-400 text-xs">(Optional)</span>
            </label>
            <select
              value={localFormData.iabIndustry}
              onChange={(e) => handleInputChange('iabIndustry', e.target.value)}
              className="input-field text-base sm:text-lg"
            >
              <option value="">Select industry category</option>
              {IAB_INDUSTRIES.map((industry) => (
                <option key={industry.code} value={industry.code}>
                  {industry.name}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500">
              <Info className="w-3 h-3 sm:w-4 sm:h-4" />
              Helps us provide more accurate compliance recommendations
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <label className="block text-xs sm:text-sm font-semibold text-neutral-700 flex items-center gap-2">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-brand-500" />
                Target Publishers
                <span className="text-error-500">*</span>
              </label>
              {localFormData.selectedPublishers.length > 0 && (
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-success-100 text-success-700 rounded-full text-xs sm:text-sm font-medium">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  {localFormData.selectedPublishers.length} selected
                </div>
              )}
            </div>

            <div className="space-y-6 sm:space-y-8">
              {['Social', 'Video', 'CTV'].map((category, categoryIndex) => {
                const categoryPublishers = PUBLISHERS.filter(p => p.category === category);
                const selectedInCategory = categoryPublishers.filter(p =>
                  localFormData.selectedPublishers.includes(p.name)
                ).length;

                return (
                  <div
                    key={category}
                    className="space-y-3 sm:space-y-4 animate-slide-up"
                    style={{ animationDelay: `${categoryIndex * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0">
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-900 flex items-center gap-2 sm:gap-3">
                        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                          category === 'Social' ? 'bg-blue-500' :
                          category === 'Video' ? 'bg-success-500' : 'bg-purple-500'
                        }`}></div>
                        {category} Platforms
                      </h3>
                      {selectedInCategory > 0 && (
                        <span className="text-xs sm:text-sm text-neutral-500 font-medium">
                          {selectedInCategory} of {categoryPublishers.length} selected
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {categoryPublishers.map((publisher, publisherIndex) => {
                        const isSelected = localFormData.selectedPublishers.includes(publisher.name);
                        return (
                          <div
                            key={publisher.name}
                            onClick={() => handlePublisherToggle(publisher.name)}
                            className={`card-interactive p-4 sm:p-6 group cursor-pointer transition-all duration-200 touch-manipulation ${
                              isSelected
                                ? 'border-brand-300 bg-gradient-to-br from-brand-50 to-brand-100 shadow-brand'
                                : 'hover:border-brand-200 hover:bg-brand-50/50'
                            }`}
                            style={{ animationDelay: `${(categoryIndex * 100) + (publisherIndex * 50)}ms` }}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                                  <h4 className={`font-semibold transition-colors duration-200 text-sm sm:text-base truncate ${
                                    isSelected ? 'text-brand-700' : 'text-neutral-900 group-hover:text-brand-600'
                                  }`}>
                                    {publisher.name}
                                  </h4>
                                  <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                                    category === 'Social' ? 'bg-blue-100 text-blue-700' :
                                    category === 'Video' ? 'bg-success-100 text-success-700' :
                                    'bg-purple-100 text-purple-700'
                                  }`}>
                                    {publisher.category}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-600 flex-wrap">
                                  <span>Max {publisher.technicalSpecs.maxDuration}s</span>
                                  <span className="hidden sm:inline">•</span>
                                  <span className="truncate">{publisher.technicalSpecs.formats.join(', ').toUpperCase()}</span>
                                </div>
                              </div>
                              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? 'border-brand-500 bg-brand-500 scale-110'
                                  : 'border-neutral-300 group-hover:border-brand-400'
                              }`}>
                                {isSelected && (
                                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {errors.selectedPublishers && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-error-600 animate-slide-down">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                {errors.selectedPublishers}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t-2 border-neutral-100">
          <div className="text-xs sm:text-sm text-neutral-500 text-center sm:text-left">
            Step 1 of 3 • Campaign Details
          </div>
          <button
            onClick={handleNext}
            disabled={!isValid}
            className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 group w-full sm:w-auto touch-manipulation"
          >
            Continue to Upload
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
