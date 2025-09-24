import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#CC5500] mb-4 flex items-center justify-center">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Your privacy and data security information
          </p>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                <strong>Last Updated:</strong> August 21, 2025
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 mb-6">
                This Privacy Policy explains how we handle information when you use our asset analysis service.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Information We Collect</h3>
              <p className="text-gray-700 mb-6">
                We do <strong>not</strong> collect or store any uploaded assets, files, or personal information. 
                All analysis is performed temporarily in memory and deleted immediately after results are displayed.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Cookies & Technical Info</h3>
              <p className="text-gray-700 mb-6">
                We only use essential cookies for basic functionality. Standard server logs (IP address, browser type, 
                access times) may be collected temporarily for system operation and security.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Third-Party Services</h3>
              <p className="text-gray-700 mb-6">
                We do not share any uploaded content with third parties. Any references to publisher guidelines 
                are publicly available information.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Data Security</h3>
              <p className="text-gray-700 mb-6">
                Although no data is stored, we protect temporary processing with secure transmission (HTTPS) 
                and automated data deletion.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Changes to This Policy</h3>
              <p className="text-gray-700 mb-6">
                We may update this Privacy Policy occasionally. Changes will be posted here.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-gray-100">
              <button
                onClick={onBack}
                className="flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl 
                         hover:bg-gray-50 hover:border-gray-400 hover:scale-105 hover:-translate-y-1
                         transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-gray-100 focus:outline-none"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};