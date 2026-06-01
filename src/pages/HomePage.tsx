import React from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield } from 'lucide-react';
import { Logo } from '../components/Logo';

interface HomePageProps {
  onStartCheck: () => void;
  onShowPrivacyPolicy: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartCheck, onShowPrivacyPolicy }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-orange-50/30 relative">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none"></div>
      
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <Logo className="h-48 sm:h-64 lg:h-80 w-auto drop-shadow-lg" />
            </div>

            {/* Headline */}
            <div className="mb-6 sm:mb-8 -mt-8 sm:-mt-10 lg:-mt-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-neutral-900 tracking-tight mb-4 sm:mb-6 px-4 lg:whitespace-nowrap">
                Ad Compliance & Brand Safety.
                <br />
                <span className="text-brand-500">Simplified.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto text-balance px-4">
                Check ad specs and brand safety across every major platform before you go live.
              </p>
            </div>

            {/* Primary CTA */}
            <div>
              <button
                onClick={onStartCheck}
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-brand-500 text-white font-semibold text-base sm:text-lg rounded-2xl
                         hover:bg-brand-600 hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-200
                         touch-manipulation"
              >
                Check My Ads
                <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-8 sm:py-10 lg:py-12 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 tracking-tight px-4">
              Built to catch what you'd miss
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed px-4">
              Three capabilities that replace the manual compliance checklist
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: CheckCircle2,
                title: "Universal Coverage",
                description: "TikTok, YouTube, Disney+, and every major platform. One check, everywhere.",
                color: "emerald"
              },
              {
                icon: Zap,
                title: "AI-Powered Analysis",
                description: "Claude analyses your landing page for brand safety risks across platform-specific content policies.",
                color: "brand"
              },
              {
                icon: Shield,
                title: "Brand Safety",
                description: "AI detection of policy violations — gambling, crypto, misleading claims — before they get your ads rejected.",
                color: "blue"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/60
                         hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1
                         transition-all duration-300 ease-out touch-manipulation"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Icon */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-200 group-hover:scale-110 ${
                  feature.color === 'emerald' ? 'bg-emerald-50' :
                  feature.color === 'brand' ? 'bg-brand-50' :
                  'bg-blue-50'
                }`}>
                  <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    feature.color === 'emerald' ? 'text-emerald-600' :
                    feature.color === 'brand' ? 'text-brand-600' :
                    'text-blue-600'
                  }`} />
                </div>
                
                {/* Content */}
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3 group-hover:text-brand-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-10 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-3 sm:mb-4 tracking-tight px-4">
            Stop guessing. Start checking.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mb-5 sm:mb-6 max-w-xl mx-auto leading-relaxed px-4">
            Run your ads through compliance and brand safety checks before they go live.
          </p>
          <button
            onClick={onStartCheck}
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-brand-500 text-white font-semibold text-base sm:text-lg rounded-2xl
                     hover:bg-brand-600 hover:scale-[1.02] active:scale-[0.98]
                     transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-200
                     touch-manipulation"
          >
            Check My Ads
            <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};