import React, { useState } from 'react';
import { Building2, Globe, Tag, Users, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
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

  const handlePublisherToggle = (publisherName: string) => {
    const currentSelection = localFormData.selectedPublishers;
    const newSelection = currentSelection.includes(publisherName)
      ? currentSelection.filter(p => p !== publisherName)
      : [...currentSelection, publisherName];
    
    handleInputChange('selectedPublishers', newSelection);
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

  const isValid = localFormData.brandName && localFormData.websiteUrl && localFormData.selectedPublishers.length > 0;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:shadow-2xl transition-all duration-200">
        <div className="bg-gradient-to-r from-[#CC5500] to-[#FF6B35] rounded-xl p-6 mb-8 text-white">
          <h2 className="text-3xl font-bold flex items-center">
            <Building2 className="w-8 h-8 mr-3" />
            Advertiser Details
          </h2>
          <p className="mt-2 text-orange-100">Tell us about your brand and campaign requirements</p>
        </div>

        <div className="space-y-8">
          {/* Advertiser Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
              <Building2 className="w-4 h-4 mr-2 text-[#CC5500]" />
              Advertiser Name *
            </label>
            <div className="relative">
              <input
                type="text"
                value={localFormData.brandName}
                onChange={(e) => handleInputChange('brandName', e.target.value)}
                placeholder="Enter advertiser name"
                className={`w-full px-4 py-4 border-2 rounded-xl text-lg font-medium transition-all duration-200
                  focus:ring-4 focus:ring-orange-100 focus:outline-none ${
                  errors.brandName 
                    ? 'border-red-300 bg-red-50 focus:border-red-500' 
                    : localFormData.brandName 
                      ? 'border-green-300 bg-green-50 focus:border-green-500'
                      : 'border-gray-200 focus:border-[#CC5500] hover:border-gray-300'
                }`}
              />
              {localFormData.brandName && !errors.brandName && (
                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
              {errors.brandName && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
              )}
            </div>
            {errors.brandName && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.brandName}
              </p>
            )}
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
              <Globe className="w-4 h-4 mr-2 text-[#CC5500]" />
              Website URL *
            </label>
            <div className="relative">
              <input
                type="url"
                value={localFormData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                placeholder="https://example.com"
                className={`w-full px-4 py-4 border-2 rounded-xl text-lg font-medium transition-all duration-200
                  focus:ring-4 focus:ring-orange-100 focus:outline-none ${
                  errors.websiteUrl 
                    ? 'border-red-300 bg-red-50 focus:border-red-500' 
                    : localFormData.websiteUrl && localFormData.websiteUrl.match(/^https?:\/\/.+/)
                      ? 'border-green-300 bg-green-50 focus:border-green-500'
                      : 'border-gray-200 focus:border-[#CC5500] hover:border-gray-300'
                }`}
              />
              {localFormData.websiteUrl && localFormData.websiteUrl.match(/^https?:\/\/.+/) && !errors.websiteUrl && (
                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
              {errors.websiteUrl && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
              )}
            </div>
            {errors.websiteUrl && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.websiteUrl}
              </p>
            )}
          </div>

          {/* IAB Industry */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
              <Tag className="w-4 h-4 mr-2 text-[#CC5500]" />
              IAB Industry Category
            </label>
            <select
              value={localFormData.iabIndustry}
              onChange={(e) => handleInputChange('iabIndustry', e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-lg font-medium 
                       focus:ring-4 focus:ring-orange-100 focus:border-[#CC5500] focus:outline-none
                       hover:border-gray-300 transition-all duration-200"
            >
              <option value="">Select industry category (optional)</option>
              {IAB_INDUSTRIES.map((industry) => (
                <option key={industry.code} value={industry.code}>
                  {industry.name}
                </option>
              ))}
            </select>
          </div>

          {/* Publisher Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center">
              <Users className="w-4 h-4 mr-2 text-[#CC5500]" />
              Target Publishers *
            </label>
            
            {/* Publisher Categories */}
            <div className="space-y-6">
              {['Social', 'Video', 'CTV'].map(category => {
                const categoryPublishers = PUBLISHERS.filter(p => p.category === category);
                return (
                  <div key={category} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        category === 'Social' ? 'bg-blue-500' : 
                        category === 'Video' ? 'bg-green-500' : 'bg-purple-500'
                      }`}></div>
                      {category} Platforms
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categoryPublishers.map((publisher) => (
                        <div
                          key={publisher.name}
                          onClick={() => handlePublisherToggle(publisher.name)}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 
                                    hover:scale-105 hover:-translate-y-1 hover:shadow-lg group ${
                            localFormData.selectedPublishers.includes(publisher.name)
                              ? 'border-[#CC5500] bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg'
                              : 'border-gray-200 bg-white hover:border-[#CC5500] hover:bg-orange-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-gray-900 group-hover:text-[#CC5500] transition-colors duration-200">
                                {publisher.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {publisher.category} • Max {publisher.technicalSpecs.maxDuration}s
                              </p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                                localFormData.selectedPublishers.includes(publisher.name)
                                  ? 'border-[#CC5500] bg-[#CC5500] scale-110'
                                  : 'border-gray-300 group-hover:border-[#CC5500]'
                              }`}>
                                {localFormData.selectedPublishers.includes(publisher.name) && (
                                  <CheckCircle2 className="w-full h-full text-white" />
                                )}
                              </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {localFormData.selectedPublishers.length > 0 && (
              <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <p className="text-sm text-green-700 font-semibold flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {localFormData.selectedPublishers.length} publisher{localFormData.selectedPublishers.length > 1 ? 's' : ''} selected
                </p>
              </div>
            )}
            
            {errors.selectedPublishers && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.selectedPublishers}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-12 pt-8 border-t-2 border-gray-100">
          <button
            onClick={handleNext}
            disabled={!isValid}
            className="flex items-center px-8 py-4 bg-[#CC5500] text-white font-bold rounded-xl 
                     hover:bg-[#B84A00] hover:scale-105 hover:-translate-y-1
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0
                     transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-orange-100 focus:outline-none"
          >
            Continue to Upload
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};