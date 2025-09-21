import React from 'react';
import { Building2, Globe, Tag, Users } from 'lucide-react';
import type { FormData } from '../types';
import { PUBLISHERS } from '../data/publishers';
import { IAB_INDUSTRIES } from '../data/iabIndustries';

interface InputFormProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ formData, onFormDataChange }) => {
  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  const handlePublisherToggle = (publisherName: string) => {
    const currentSelection = formData.selectedPublishers;
    const newSelection = currentSelection.includes(publisherName)
      ? currentSelection.filter(p => p !== publisherName)
      : [...currentSelection, publisherName];
    
    handleInputChange('selectedPublishers', newSelection);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Building2 className="w-6 h-6 mr-2 text-blue-600" />
        Campaign Details
      </h2>

      <div className="space-y-6">
        {/* Brand Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Brand Name *
          </label>
          <input
            type="text"
            value={formData.brandName}
            onChange={(e) => handleInputChange('brandName', e.target.value)}
            placeholder="Enter brand name"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Website URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            Website URL *
          </label>
          <input
            type="url"
            value={formData.websiteUrl}
            onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* IAB Industry */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            IAB Industry Category
          </label>
          <select
            value={formData.iabIndustry}
            onChange={(e) => handleInputChange('iabIndustry', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select industry category</option>
            {IAB_INDUSTRIES.map((industry) => (
              <option key={industry.code} value={industry.code}>
                {industry.name}
              </option>
            ))}
          </select>
        </div>

        {/* Publisher Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Users className="w-4 h-4 mr-1" />
            Target Publishers *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {PUBLISHERS.map((publisher) => (
              <div
                key={publisher.name}
                onClick={() => handlePublisherToggle(publisher.name)}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                  formData.selectedPublishers.includes(publisher.name)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{publisher.name}</h3>
                    <p className="text-xs text-gray-500">{publisher.category}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    formData.selectedPublishers.includes(publisher.name)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {formData.selectedPublishers.includes(publisher.name) && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};