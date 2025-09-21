import React from 'react';
import { Upload, ArrowRight, CheckCircle, Clock, Shield } from 'lucide-react';
import { Logo } from '../components/Logo';

interface HomePageProps {
  onStartCheck: () => void;
  onShowPrivacyPolicy: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartCheck, onShowPrivacyPolicy }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-orange-50 min-h-screen relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full blur-3xl opacity-15"></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-green-200 to-blue-300 rounded-full blur-3xl opacity-10"></div>

      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative z-10">
        <div className="flex justify-center mb-6">
          <Logo className="h-80 w-auto drop-shadow-lg" />
        </div>

        {/* Tagline */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto -mt-24 leading-tight">
          Get an initial check on your ad content before you launch.
        </h2>

        {/* Supporting Line */}
        <p className="text-xl text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed">
          Verify your ads against platform specifications and brand safety policies across 
          TikTok, YouTube, Hulu, Disney, Prime, and more.
        </p>

        {/* CTA Button */}
        <div className="mb-8">
          <button
            onClick={onStartCheck}
            className="inline-flex items-center px-12 py-4 bg-[#CC5500] text-white text-xl font-bold rounded-xl 
                     hover:bg-[#B84A00] hover:scale-105 hover:-translate-y-1 
                     transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-orange-100 focus:outline-none"
          >
            <Upload className="mr-3 h-6 w-6" />
            Start Your Check
            <ArrowRight className="ml-3 h-6 w-6" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-orange-50 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why use Orbit Ads?</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-2 
                          transition-all duration-200 border-2 border-gray-100 group">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center 
                              group-hover:scale-110 transition-transform duration-200">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Comprehensive Checks
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Verify against multiple platform specifications and brand safety policies with real-time validation
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-2 
                          transition-all duration-200 border-2 border-gray-100 group">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center 
                              group-hover:scale-110 transition-transform duration-200">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Quick Results
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Get instant feedback on your ad content before launch with detailed compliance reports
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-2 
                          transition-all duration-200 border-2 border-gray-100 group">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center 
                              group-hover:scale-110 transition-transform duration-200">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Brand Safety
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Ensure your content meets platform and advertiser guidelines with advanced policy checking
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};