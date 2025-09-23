import React from 'react';

interface FooterProps {
  onShowPrivacyPolicy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowPrivacyPolicy }) => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-end text-right">
          <p className="text-gray-600 text-sm text-center font-medium space-x-4">
            <button 
              onClick={onShowPrivacyPolicy}
              className="hover:text-[#CC5500] hover:underline transition-colors duration-200"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <span>© 2025 Orbit Ads. All Rights Reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};