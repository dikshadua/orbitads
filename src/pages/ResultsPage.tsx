import React, { useState, useEffect } from 'react';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { ArrowLeft, RotateCcw, Shield, Loader2, CheckCircle2 } from 'lucide-react';
import type { FormData, FileAnalysis, ComplianceResults } from '../types';

interface ResultsPageProps {
  formData: FormData;
  fileAnalyzes: FileAnalysis[];
  onBack: () => void;
  onStartOver: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ formData, fileAnalyzes, onBack, onStartOver }) => {
  const [complianceResults, setComplianceResults] = useState<ComplianceResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisStep, setAnalysisStep] = useState(0);

  const analysisSteps = [
    'Checking ad specs against publisher requirements...',
    'Reviewing creatives for policy violations...',
    'Fetching publisher policies...',
    'Running AI-powered brand safety analysis...',
    'Generating results...'
  ];

  useEffect(() => {
    const runAnalysis = async () => {
      setIsAnalyzing(true);

      // Animate first 3 steps quickly while real analysis runs in parallel
      for (let i = 0; i < 3; i++) {
        setAnalysisStep(i);
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      // Step 4: AI analysis — stays active until the real call completes
      setAnalysisStep(3);
      const { analyzeCompliance } = await import('../utils/complianceAnalyzer');
      const results = await analyzeCompliance(formData, fileAnalyzes);

      // Step 5: wrap up
      setAnalysisStep(4);
      await new Promise(resolve => setTimeout(resolve, 400));

      setComplianceResults(results);
      setIsAnalyzing(false);
    };

    runAnalysis();
  }, [formData, fileAnalyzes]);

  const handleExportCSV = () => {
    if (!complianceResults) return;
    
    // Create CSV content
    const headers = ['Publisher', 'File Name', 'File Type', 'Overall Status', 'Technical Issues', 'Brand Safety Issues'];
    const rows = complianceResults.publisherResults.map(result => [
      result.publisher.name,
      result.fileAnalysis.fileName,
      result.fileAnalysis.fileType,
      result.overallStatus,
      result.adSpecs.issues.join('; '),
      result.brandSafety.issues.join('; ')
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-report-${formData.brandName}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {isAnalyzing ? (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#CC5500] to-[#FF6B35] rounded-2xl flex items-center justify-center mb-8 
                          animate-pulse shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            
            <div className="mb-8">
              <Loader2 className="animate-spin w-12 h-12 text-[#CC5500] mx-auto mb-4" />
              <div className="w-64 bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-[#CC5500] to-[#FF6B35] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Analyzing Your Ads
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Checking ad specs and brand safety across {formData.selectedPublishers.length} publishers...
            </p>
            
            <div className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl p-6 border-2 border-gray-200 max-w-md">
              <div className="space-y-3">
                {analysisSteps.map((step, index) => (
                  <div key={index} className={`flex items-center text-sm ${
                    index < analysisStep ? 'text-green-600' : 
                    index === analysisStep ? 'text-[#CC5500] font-semibold' : 'text-gray-400'
                  }`}>
                    {index < analysisStep ? (
                      <CheckCircle2 className="w-4 h-4 mr-3" />
                    ) : index === analysisStep ? (
                      <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 mr-3 rounded-full border-2 border-gray-300"></div>
                    )}
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : complianceResults ? (
        <div>
          <div className="bg-gradient-to-r from-[#CC5500] to-[#FF6B35] rounded-2xl p-8 mb-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold flex items-center">
                  <Shield className="w-10 h-10 mr-4" />
                  Analysis Complete
                </h2>
                <p className="mt-2 text-orange-100 text-lg">
                  Your results are ready
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-orange-100 mb-1">Campaign</div>
                <div className="font-bold text-2xl">{formData.brandName}</div>
                <div className="text-sm text-orange-200">
                  {fileAnalyzes.length} asset{fileAnalyzes.length !== 1 ? 's' : ''} • {formData.selectedPublishers.length} publishers
                </div>
              </div>
            </div>
          </div>

          <ResultsDisplay 
            results={complianceResults}
            onExportCSV={handleExportCSV}
            onStartOver={onStartOver}
          />

          <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-200">
            <button
              onClick={onBack}
              className="flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl 
                       hover:bg-gray-50 hover:border-gray-400 hover:scale-105 hover:-translate-y-1
                       transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-gray-100 focus:outline-none"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Upload
            </button>

            <button
              onClick={onStartOver}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-[#CC5500] to-[#FF6B35] text-white font-bold rounded-xl 
                       hover:bg-[#B84A00] hover:scale-105 hover:-translate-y-1
                       transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-orange-100 focus:outline-none"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Check New Ads
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};