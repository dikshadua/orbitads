import React from 'react';

interface FooterProps {
  onShowPrivacyPolicy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowPrivacyPolicy }) => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-end">
          <div className="text-gray-600 text-sm font-medium flex items-center space-x-4">
            <button 
              onClick={onShowPrivacyPolicy}
              className="hover:text-[#CC5500] hover:underline transition-colors duration-200 whitespace-nowrap"
            >
              Privacy Policy
            </button>
            <span className="text-gray-400">•</span>
            <span className="whitespace-nowrap">© 2025 Orbit Ads. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};