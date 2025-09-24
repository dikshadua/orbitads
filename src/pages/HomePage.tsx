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
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-12">
              <Logo className="h-64 w-auto drop-shadow-sm" />
            </div>

            {/* Headline */}
            <div className="mb-8 -mt-16">
              <h1 className="text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight mb-6 text-balance">
                Compliance.
                <br />
                <span className="text-brand-500">Simplified.</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 font-normal leading-relaxed max-w-3xl mx-auto text-balance">
                Ensure your ads meet platform requirements before you launch.
                <br />
                Save time, avoid rejections.
              </p>
            </div>

            {/* Primary CTA */}
            <div className="mb-16">
              <button
                onClick={onStartCheck}
                className="inline-flex items-center px-8 py-4 bg-brand-500 text-white font-semibold text-lg rounded-2xl 
                         hover:bg-brand-600 hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-200"
              >
                Start Check
                <ArrowRight className="ml-3 w-5 h-5" />
              </button>
            </div>


      {/* Features Section */}
      <section className="relative py-24 bg-white/50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
              Built for speed
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Three capabilities that transform how you handle ad compliance
            </p>
          </div>
          
          {/* Feature grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle2,
                title: "Universal Coverage",
                description: "TikTok, YouTube, Disney+, and every major platform. One check, everywhere.",
                color: "emerald"
              },
              {
                icon: Zap,
                title: "Instant Analysis",
                description: "Detailed reports in seconds. See exactly what needs attention.",
                color: "brand"
              },
              {
                icon: Shield,
                title: "Brand Safety",
                description: "Advanced detection for policy violations before they become problems.",
                color: "blue"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 border border-neutral-200/60 
                         hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1
                         transition-all duration-300 ease-out"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110 ${
                  feature.color === 'emerald' ? 'bg-emerald-50' :
                  feature.color === 'brand' ? 'bg-brand-50' :
                  'bg-blue-50'
                }`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.color === 'emerald' ? 'text-emerald-600' :
                    feature.color === 'brand' ? 'text-brand-600' :
                    'text-blue-600'
                  }`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-brand-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 tracking-tight">
            Ready to streamline compliance?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join teams who've eliminated manual compliance checks
          </p>
          <button
            onClick={onStartCheck}
            className="inline-flex items-center px-8 py-4 bg-brand-500 text-white font-semibold text-lg rounded-2xl 
                     hover:bg-brand-600 hover:scale-[1.02] active:scale-[0.98]
                     transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-200"
          >
            Get started
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};