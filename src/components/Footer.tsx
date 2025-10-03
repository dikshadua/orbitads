import React from 'react';

interface FooterProps {
  onShowPrivacyPolicy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowPrivacyPolicy }) => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-center">
          <div className="text-gray-600 text-xs sm:text-sm font-medium flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
            <button
              onClick={onShowPrivacyPolicy}
              className="hover:text-[#CC5500] hover:underline transition-colors duration-200 whitespace-nowrap touch-manipulation min-h-[44px] flex items-center"
            >
              Privacy Policy
            </button>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="whitespace-nowrap">© 2025 Orbit Ads. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};