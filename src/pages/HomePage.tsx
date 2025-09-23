import React from 'react';
import { ArrowRight, CheckCircle, Clock, Shield, Sparkles, Zap, Target } from 'lucide-react';
import { Logo } from '../components/Logo';

interface HomePageProps {
  onStartCheck: () => void;
  onShowPrivacyPolicy: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartCheck, onShowPrivacyPolicy }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-radial from-brand-200/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-radial from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-gradient-radial from-success-200/20 to-transparent rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[85vh] flex flex-col items-center justify-center text-center px-4">
        <div className="animate-slide-up">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Logo className="h-32 w-auto drop-shadow-xl" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full flex items-center justify-center animate-pulse-soft">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 mb-12">
            <h1 className="text-5xl font-bold text-[#CC5500] -mt-24 mb-4">
              Ad Compliance Checker
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Check your advertising content against ad specifications and brand safety policies 
              across major digital platforms
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onStartCheck}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-[#CC5500] to-[#FF6B35] text-white font-bold rounded-xl 
                       hover:bg-[#B84A00] hover:scale-105 hover:-translate-y-1
                       transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-orange-100 focus:outline-none text-lg group"
            >
              <Zap className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
              Start Compliance Check
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">Free • No signup required • Instant results</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">12+ Platforms Supported</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#CC5500] rounded-full animate-pulse"></div>
              <span className="font-medium">Real-time Policy Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Enterprise-grade Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 bg-gradient-to-b from-transparent to-gray-100/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
              <Target className="w-4 h-4" />
              Why Choose Orbit Ads
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Built for modern advertising teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop wasting time on manual compliance checks. Get instant feedback and ship faster.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: CheckCircle,
                title: "Comprehensive Coverage",
                description: "Check against 12+ major platforms including TikTok, YouTube, Disney+, Netflix, and more. Real-time policy updates ensure you're always compliant.",
                color: "green",
                stats: "12+ Platforms"
              },
              {
                icon: Clock,
                title: "Instant Analysis",
                description: "Get detailed compliance reports in seconds, not hours. Identify issues before they become costly rejections or delays.",
                color: "orange",
                stats: "< 30 Seconds"
              },
              {
                icon: Shield,
                title: "Brand Safety First",
                description: "Advanced content analysis detects potential policy violations and brand safety issues across all your creative assets.",
                color: "blue",
                stats: "99.9% Accuracy"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-1 group transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${
                    feature.color === 'green' ? 'bg-gradient-to-br from-green-100 to-green-200' :
                    feature.color === 'orange' ? 'bg-gradient-to-br from-orange-100 to-orange-200' :
                    'bg-gradient-to-br from-blue-100 to-blue-200'
                  }`}>
                    <feature.icon className={`w-7 h-7 ${
                      feature.color === 'green' ? 'text-green-600' :
                      feature.color === 'orange' ? 'text-[#CC5500]' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    feature.color === 'green' ? 'bg-green-100 text-green-700' :
                    feature.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {feature.stats}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#CC5500] transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative z-10 py-16 bg-white/50 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">Trusted by advertising teams worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
              {/* Placeholder for client logos */}
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
              <div className="h-8 w-28 bg-gray-200 rounded"></div>
              <div className="h-8 w-36 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};