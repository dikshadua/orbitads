import React, { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { CampaignDetailsPage } from './pages/CampaignDetailsPage';
import { CreativeUploadPage } from './pages/CreativeUploadPage';
import { ResultsPage } from './pages/ResultsPage';
import { SiteHeader } from './components/SiteHeader';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import type { FormData, FileAnalysis, ComplianceResults } from './types';

type PageType = 'home' | 'campaign' | 'upload' | 'results' | 'privacy';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    websiteUrl: '',
    iabIndustry: '',
    selectedPublishers: []
  });
  
  const [fileAnalyzes, setFileAnalyzes] = useState<FileAnalysis[] | null>(null);
  const [complianceResults, setComplianceResults] = useState<ComplianceResults | null>(null);


  const handleStartCheck = () => {
    setCurrentPage('campaign');
  };

  const handleCampaignNext = (data: FormData) => {
    setFormData(data);
    setCurrentPage('upload');
  };

  const handleUploadNext = (analyzes: FileAnalysis[]) => {
    setFileAnalyzes(analyzes);
    setCurrentPage('results');
  };

  const handleBackToCampaign = () => {
    setCurrentPage('campaign');
  };

  const handleBackToUpload = () => {
    setCurrentPage('upload');
  };

  const handleStartOver = () => {
    setCurrentPage('home');
    setFormData({
      brandName: '',
      websiteUrl: '',
      iabIndustry: '',
      selectedPublishers: []
    });
    setFileAnalyzes(null);
    setComplianceResults(null);
  };

  const handleShowPrivacyPolicy = () => {
    setCurrentPage('privacy');
  };

  const handleBackFromPrivacy = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onStartCheck={handleStartCheck}
            onShowPrivacyPolicy={handleShowPrivacyPolicy}
          />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage onBack={handleBackFromPrivacy} />
        )}

        {(currentPage === 'campaign' || currentPage === 'upload' || currentPage === 'results') && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative">
            {/* Background Decorations */}
            <div className="hidden md:block absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full blur-3xl opacity-20"></div>
            <div className="hidden md:block absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full blur-3xl opacity-15"></div>

            <header className="text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
                <button onClick={() => setCurrentPage('home')} className="hover:opacity-80 transition-opacity touch-manipulation">
                  <Logo className="h-48 sm:h-64 lg:h-80 w-auto drop-shadow-lg" />
                </button>
              </div>

              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-black -mt-12 sm:-mt-16 lg:-mt-24 mb-2 sm:mb-4 px-4">
                  Ad Compliance Checker
                </h1>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12 leading-relaxed px-4">
                Check your advertising content against ad specifications and brand safety policies
                across major digital platforms
              </p>
              
              {/* Progress Indicator */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-gray-100 max-w-2xl mx-auto">
                <div className={`flex items-center ${currentPage === 'campaign' ? 'text-[#CC5500]' : currentPage === 'upload' || currentPage === 'results' ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border-2 flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-200 ${
                    currentPage === 'campaign' ? 'border-[#CC5500] bg-orange-50' : 
                    currentPage === 'upload' || currentPage === 'results' ? 'border-green-600 bg-green-50' : 
                    'border-gray-300'
                  }`}>
                    1
                  </div>
                  <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-semibold whitespace-nowrap">Advertiser Details</span>
                </div>

                <div className={`hidden sm:block w-8 sm:w-12 h-1 rounded-full ${currentPage === 'upload' || currentPage === 'results' ? 'bg-green-600' : 'bg-gray-300'}`}></div>

                <div className={`flex items-center ${currentPage === 'upload' ? 'text-[#CC5500]' : currentPage === 'results' ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border-2 flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-200 ${
                    currentPage === 'upload' ? 'border-[#CC5500] bg-orange-50' : 
                    currentPage === 'results' ? 'border-green-600 bg-green-50' : 
                    'border-gray-300'
                  }`}>
                    2
                  </div>
                  <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-semibold whitespace-nowrap">Creative Upload</span>
                </div>

                <div className={`hidden sm:block w-8 sm:w-12 h-1 rounded-full ${currentPage === 'results' ? 'bg-green-600' : 'bg-gray-300'}`}></div>

                <div className={`flex items-center ${currentPage === 'results' ? 'text-[#CC5500]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border-2 flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-200 ${
                    currentPage === 'results' ? 'border-[#CC5500] bg-orange-50' : 'border-gray-300'
                  }`}>
                    3
                  </div>
                  <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-semibold whitespace-nowrap">Results</span>
                </div>
              </div>
            </header>

            <div className="mt-8 sm:mt-12 lg:mt-16">
            {currentPage === 'campaign' && (
              <CampaignDetailsPage 
                formData={formData}
                onNext={handleCampaignNext}
              />
            )}

            {currentPage === 'upload' && (
              <CreativeUploadPage 
                formData={formData}
                onNext={handleUploadNext}
                onBack={handleBackToCampaign}
              />
            )}

            {currentPage === 'results' && fileAnalyzes && (
              <ResultsPage 
                formData={formData}
                fileAnalyzes={fileAnalyzes}
                onBack={handleBackToUpload}
                onStartOver={handleStartOver}
              />
            )}
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      {currentPage !== 'privacy' && <Footer onShowPrivacyPolicy={handleShowPrivacyPolicy} />}
    </div>
  );
}

export default App;