import React from 'react';
import { ArrowRight, CheckCircle, Clock, Shield, Sparkles, Zap, Target } from 'lucide-react';
import { Logo } from '../components/Logo';

interface HomePageProps {
  onStartCheck: () => void;
  onShowPrivacyPolicy: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartCheck, onShowPrivacyPolicy }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50 relative overflow-hidden">
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
            <h1 className="text-display bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 bg-clip-text text-transparent max-w-5xl mx-auto text-balance">
              Ship ads with confidence across every platform
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed text-pretty">
              Get instant compliance checks against platform specs and brand safety policies. 
              From TikTok to Disney+, ensure your creative assets meet every requirement before launch.
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onStartCheck}
              className="btn-primary text-lg px-8 py-4 group"
            >
              <Zap className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
              Start Compliance Check
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span className="font-medium">Free • No signup required • Instant results</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-500 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="font-medium">12+ Platforms Supported</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
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
      <section className="relative z-10 section-padding bg-gradient-to-b from-transparent to-neutral-100/50">
        <div className="container-wide">
          <div className="text-center mb-20 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold mb-6">
              <Target className="w-4 h-4" />
              Why Choose Orbit Ads
            </div>
            <h2 className="text-headline text-neutral-900 mb-6 text-balance">
              Built for modern advertising teams
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto text-pretty">
              Stop wasting time on manual compliance checks. Get instant feedback and ship faster.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: CheckCircle,
                title: "Comprehensive Coverage",
                description: "Check against 12+ major platforms including TikTok, YouTube, Disney+, Netflix, and more. Real-time policy updates ensure you're always compliant.",
                color: "success",
                stats: "12+ Platforms"
              },
              {
                icon: Clock,
                title: "Instant Analysis",
                description: "Get detailed compliance reports in seconds, not hours. Identify issues before they become costly rejections or delays.",
                color: "brand",
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
                className="card-elevated p-8 group hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${
                    feature.color === 'success' ? 'bg-gradient-to-br from-success-100 to-success-200' :
                    feature.color === 'brand' ? 'bg-gradient-to-br from-brand-100 to-brand-200' :
                    'bg-gradient-to-br from-blue-100 to-blue-200'
                  }`}>
                    <feature.icon className={`w-7 h-7 ${
                      feature.color === 'success' ? 'text-success-600' :
                      feature.color === 'brand' ? 'text-brand-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    feature.color === 'success' ? 'bg-success-100 text-success-700' :
                    feature.color === 'brand' ? 'bg-brand-100 text-brand-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {feature.stats}
                  </div>
                </div>
                
                <h3 className="text-title text-neutral-900 mb-4 group-hover:text-brand-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-body text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative z-10 py-16 bg-white/50 backdrop-blur-sm border-y border-neutral-200">
        <div className="container-wide">
          <div className="text-center">
            <p className="text-overline text-neutral-500 mb-8">Trusted by advertising teams worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
              {/* Placeholder for client logos */}
              <div className="h-8 w-24 bg-neutral-200 rounded"></div>
              <div className="h-8 w-32 bg-neutral-200 rounded"></div>
              <div className="h-8 w-28 bg-neutral-200 rounded"></div>
              <div className="h-8 w-36 bg-neutral-200 rounded"></div>
              <div className="h-8 w-24 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};