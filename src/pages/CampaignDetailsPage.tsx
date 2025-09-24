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
    
    // Clear error when user starts typing
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
      <div className="card-elevated p-8 lg:p-12">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-8 mb-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-bold flex items-center text-white mb-3">
                  <Building2 className="w-8 h-8 mr-4" />
                  Advertiser Details
                </h1>
                <p className="text-xl text-orange-100 max-w-2xl">
                  Tell us about your brand and campaign requirements to get started
                </p>
              </div>
              <div className="hidden lg:block text-right">
                <div className="text-sm text-brand-200 mb-1">Step 1 of 3</div>
                <div className="text-2xl font-bold text-white">Campaign Setup</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {/* Advertiser Name */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#CC5500]" />
              Advertiser Name
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={localFormData.brandName}
                onChange={(e) => handleInputChange('brandName', e.target.value)}
                onBlur={() => handleInputBlur('brandName')}
                placeholder="Enter your brand or company name"
                className={`input-field text-lg ${
                  getInputState('brandName') === 'error' ? 'input-error' :
                  getInputState('brandName') === 'success' ? 'input-success' : ''
                }`}
              />
              {getInputState('brandName') === 'success' && (
                <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
              {getInputState('brandName') === 'error' && (
                <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
              )}
            </div>
            {errors.brandName && (
              <div className="flex items-center gap-2 text-sm text-red-600 animate-slide-down">
                <AlertCircle className="w-4 h-4" />
                {errors.brandName}
              </div>
            )}
          </div>

          {/* Website URL */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#CC5500]" />
              Website URL
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="url"
                value={localFormData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                onBlur={() => handleInputBlur('websiteUrl')}
                placeholder="https://example.com"
                className={`input-field text-lg ${
                  getInputState('websiteUrl') === 'error' ? 'input-error' :
                  getInputState('websiteUrl') === 'success' ? 'input-success' : ''
                }`}
              />
              {getInputState('websiteUrl') === 'success' && (
                <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
              {getInputState('websiteUrl') === 'error' && (
                <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
              )}
            </div>
            {errors.websiteUrl && (
              <div className="flex items-center gap-2 text-sm text-red-600 animate-slide-down">
                <AlertCircle className="w-4 h-4" />
                {errors.websiteUrl}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Info className="w-4 h-4" />
              We'll analyze your website for brand safety compliance
            </div>
          </div>

          {/* IAB Industry */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#CC5500]" />
              IAB Industry Category
              <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <select
              value={localFormData.iabIndustry}
              onChange={(e) => handleInputChange('iabIndustry', e.target.value)}
              className="input-field text-lg"
            >
              <option value="">Select industry category</option>
              {IAB_INDUSTRIES.map((industry) => (
                <option key={industry.code} value={industry.code}>
                  {industry.name}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Info className="w-4 h-4" />
              Helps us provide more accurate compliance recommendations
            </div>
          </div>

          {/* Publisher Selection */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#CC5500]" />
                Target Publishers
                <span className="text-red-500">*</span>
              </label>
              {localFormData.selectedPublishers.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  {localFormData.selectedPublishers.length} selected
                </div>
              )}
            </div>
            
            {/* Publisher Categories */}
            <div className="space-y-8">
              {['Social', 'Video', 'CTV'].map((category, categoryIndex) => {
                const categoryPublishers = PUBLISHERS.filter(p => p.category === category);
                const selectedInCategory = categoryPublishers.filter(p => 
                  localFormData.selectedPublishers.includes(p.name)
                ).length;
                
                return (
                  <div 
                    key={category} 
                    className="space-y-4 animate-slide-up"
                    style={{ animationDelay: `${categoryIndex * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          category === 'Social' ? 'bg-blue-500' : 
                          category === 'Video' ? 'bg-green-500' : 'bg-purple-500'
                        }`}></div>
                        {category} Platforms
                      </h3>
                      {selectedInCategory > 0 && (
                        <span className="text-sm text-gray-500 font-medium">
                          {selectedInCategory} of {categoryPublishers.length} selected
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryPublishers.map((publisher, publisherIndex) => {
                        const isSelected = localFormData.selectedPublishers.includes(publisher.name);
                        return (
                          <div
                            key={publisher.name}
                            onClick={() => handlePublisherToggle(publisher.name)}
                            className={`card-interactive p-6 group cursor-pointer transition-all duration-200 ${
                              isSelected 
                                ? 'border-brand-300 bg-gradient-to-br from-brand-50 to-brand-100 shadow-brand' 
                                : 'hover:border-brand-200 hover:bg-brand-50/50'
                            }`}
                            style={{ animationDelay: `${(categoryIndex * 100) + (publisherIndex * 50)}ms` }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className={`font-semibold transition-colors duration-200 ${
                                    isSelected ? 'text-[#CC5500]' : 'text-gray-900 group-hover:text-[#CC5500]'
                                  }`}>
                                    {publisher.name}
                                  </h4>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    category === 'Social' ? 'bg-blue-100 text-blue-700' :
                                    category === 'Video' ? 'bg-green-100 text-green-700' :
                                    'bg-purple-100 text-purple-700'
                                  }`}>
                                    {publisher.category}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span>Max {publisher.technicalSpecs.maxDuration}s</span>
                                  <span>•</span>
                                  <span>{publisher.technicalSpecs.formats.join(', ').toUpperCase()}</span>
                                </div>
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#CC5500] bg-[#CC5500] scale-110'
                                  : 'border-gray-300 group-hover:border-[#CC5500]'
                              }`}>
                                {isSelected && (
                                  <CheckCircle2 className="w-4 h-4 text-white" />
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
              <div className="flex items-center gap-2 text-sm text-red-600 animate-slide-down">
                <AlertCircle className="w-4 h-4" />
                {errors.selectedPublishers}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t-2 border-gray-100">
          <div className="text-sm text-gray-500">
            Step 1 of 3 • Campaign Details
          </div>
          <button
            onClick={handleNext}
            disabled={!isValid}
            className="flex items-center px-8 py-4 bg-[#CC5500] text-white font-bold rounded-xl 
                     hover:bg-[#B84A00] hover:scale-105 hover:-translate-y-1
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0
                     transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-orange-100 focus:outline-none text-lg group"
          >
            Continue to Upload
            <ArrowRight className="w-5 h-5 ml-3" />
          </button>
        </div>
      </div>
    </div>
  );
};