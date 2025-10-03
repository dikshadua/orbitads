import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 pb-8">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#CC5500] mb-3 sm:mb-4 flex items-center justify-center">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12 leading-relaxed px-4">
            Your privacy and data security information
          </p>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto mt-6 sm:mt-8 lg:mt-16">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border-2 border-gray-100">
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                <strong>Last Updated:</strong> August 21, 2025
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Overview</h2>
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                This Privacy Policy explains how we handle information when you use our asset analysis service.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Information We Collect</h3>
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                We do <strong>not</strong> collect or store any uploaded assets, files, or personal information.
                All analysis is performed temporarily in memory and deleted immediately after results are displayed.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Cookies & Technical Info</h3>
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                We only use essential cookies for basic functionality. Standard server logs (IP address, browser type,
                access times) may be collected temporarily for system operation and security.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Third-Party Services</h3>
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                We do not share any uploaded content with third parties. Any references to publisher guidelines
                are publicly available information.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Data Security</h3>
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                Although no data is stored, we protect temporary processing with secure transmission (HTTPS)
                and automated data deletion.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Changes to This Policy</h3>
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                We may update this Privacy Policy occasionally. Changes will be posted here.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-gray-100">
              <button
                onClick={onBack}
                className="flex items-center justify-center w-full sm:w-auto px-4 sm:px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl
                         hover:bg-gray-50 hover:border-gray-400 hover:scale-105 hover:-translate-y-1
                         transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-gray-100 focus:outline-none
                         touch-manipulation"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};