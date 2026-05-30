import React from 'react';
import { Download, CheckCircle, XCircle, AlertTriangle, Video, Image, ExternalLink, RotateCcw } from 'lucide-react';
import type { ComplianceResults, ComplianceResult } from '../types';

interface ResultsDisplayProps {
  results: ComplianceResults;
  onExportCSV: () => void;
  onStartOver: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  onExportCSV,
  onStartOver
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASS':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'FAIL':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS':
        return 'text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 border-green-300';
      case 'WARNING':
        return 'text-yellow-700 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300';
      case 'FAIL':
        return 'text-red-700 bg-gradient-to-r from-red-50 to-rose-50 border-red-300';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Group results by publisher
  const resultsByPublisher = results.publisherResults.reduce((acc, result) => {
    const publisherName = result.publisher.name;
    if (!acc[publisherName]) {
      acc[publisherName] = [];
    }
    acc[publisherName].push(result);
    return acc;
  }, {} as Record<string, ComplianceResult[]>);

  // Get unique publishers and their categories for filtering
  const publisherCategories = results.publisherResults.reduce((acc, result) => {
    acc[result.publisher.name] = result.publisher.category;
    return acc;
  }, {} as Record<string, string>);

  // Filter out static results for CTV platforms
  const filteredResultsByPublisher = Object.entries(resultsByPublisher).reduce((acc, [publisherName, publisherResults]) => {
    const category = publisherCategories[publisherName];
    
    if (category === 'CTV') {
      // Only show video results for CTV platforms
      acc[publisherName] = (publisherResults || []).filter(result => result.fileAnalysis.fileType === 'video');
    } else {
      // Show all results for social platforms
      acc[publisherName] = publisherResults || [];
    }
    
    return acc;
  }, {} as Record<string, ComplianceResult[]>);

  const videoAssets = (results.fileAnalyzes || []).filter(file => file.fileType === 'video');
  const staticAssets = (results.fileAnalyzes || []).filter(file => file.fileType === 'image');

  // Calculate overall statistics
  const totalResults = results.publisherResults.length;
  const passCount = results.publisherResults.filter(r => r.overallStatus === 'PASS').length;
  const warningCount = results.publisherResults.filter(r => r.overallStatus === 'WARNING').length;
  const failCount = results.publisherResults.filter(r => r.overallStatus === 'FAIL').length;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-[#CC5500]" />
            </div>
            <span className="font-bold text-gray-900">Video Assets</span>
          </div>
          <p className="text-3xl font-bold text-[#CC5500]">{videoAssets.length}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <Image className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-bold text-gray-900">Static Assets</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">{staticAssets.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="font-bold text-gray-900">Pass Rate</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{Math.round((passCount / totalResults) * 100)}%</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <span className="font-bold text-purple-600">#</span>
            </div>
            <span className="font-bold text-gray-900">Publishers</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">{Object.keys(filteredResultsByPublisher).length}</p>
        </div>
      </div>

      {/* Website Analysis */}
      {results.websiteAnalysis && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-[#CC5500]" />
            Website Analysis Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border-2 ${
              results.websiteAnalysis.riskLevel === 'low' ? 'bg-green-50 border-green-200' :
              results.websiteAnalysis.riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' :
              'bg-red-50 border-red-200'
            }`}>
              <div className="font-semibold text-gray-900 mb-1">Risk Level</div>
              <div className={`font-bold capitalize ${
                results.websiteAnalysis.riskLevel === 'low' ? 'text-green-600' :
                results.websiteAnalysis.riskLevel === 'medium' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {results.websiteAnalysis.riskLevel}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="font-semibold text-gray-900 mb-1">Categories Detected</div>
              <div className="font-bold text-gray-600">
                {results.websiteAnalysis.detectedKeywords.length || 'None'}
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="font-semibold text-gray-900 mb-1">Total Checks</div>
              <div className="font-bold text-blue-600">{totalResults}</div>
            </div>
          </div>
          {results.websiteAnalysis.aiExplanation && (
            <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <div className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <span>AI Policy Assessment</span>
                <span className="text-xs font-normal bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full">Powered by Claude</span>
              </div>
              <p className="text-blue-900 text-sm leading-relaxed">{results.websiteAnalysis.aiExplanation}</p>
            </div>
          )}
          {results.websiteAnalysis.detectedKeywords.length > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
              <div className="font-semibold text-yellow-800 mb-2">Detected Categories:</div>
              <div className="flex flex-wrap gap-2">
                {results.websiteAnalysis.detectedKeywords.map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results by Publisher */}
      <div className="space-y-6">
        {Object.entries(filteredResultsByPublisher).map(([publisherName, publisherResults]) => {
          if (publisherResults.length === 0) return null;
          
          const publisher = publisherResults[0].publisher;
          const category = publisherCategories[publisherName];
          
          return (
            <div key={publisherName} className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-200">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b-2 border-gray-200 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{publisherName}</h2>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        publisher.category === 'Social' ? 'bg-blue-100 text-blue-700' :
                        publisher.category === 'Video' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {publisher.category}
                      </span>
                      <a 
                        href={publisher.policyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#CC5500] hover:text-[#B84A00] font-semibold text-sm flex items-center gap-1 
                                 hover:underline transition-colors duration-200"
                      >
                        View Policy <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  {category === 'CTV' && staticAssets.length > 0 && (
                    <div className="text-sm text-gray-600 bg-gray-200 px-4 py-2 rounded-full font-semibold">
                      Static ads not supported on CTV platforms
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4">
                {publisherResults.map((result, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          result.fileAnalysis.fileType === 'video' 
                            ? 'bg-gradient-to-br from-orange-100 to-orange-200' 
                            : 'bg-gradient-to-br from-blue-100 to-blue-200'
                        }`}>
                          {result.fileAnalysis.fileType === 'video' ? (
                            <Video className="w-5 h-5 text-[#CC5500]" />
                          ) : (
                            <Image className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 text-lg">
                            {result.fileAnalysis.fileName}
                          </span>
                          <div className="text-sm text-gray-500 capitalize">
                            {result.fileAnalysis.fileType} Asset
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-bold ${getStatusColor(result.overallStatus)}`}>
                        {getStatusIcon(result.overallStatus)}
                        <span>{result.overallStatus}</span>
                      </div>
                    </div>

                    {/* File Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <span className="text-gray-500 text-sm font-semibold">Format:</span>
                        <div className="font-bold text-gray-900">{result.fileAnalysis.format.toUpperCase()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm font-semibold">Size:</span>
                        <div className="font-bold text-gray-900">
                          {(result.fileAnalysis.fileSize / (1024 * 1024)).toFixed(1)}MB
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm font-semibold">Resolution:</span>
                        <div className="font-bold text-gray-900">
                          {result.fileAnalysis.resolution.width}×{result.fileAnalysis.resolution.height}
                        </div>
                      </div>
                      {result.fileAnalysis.fileType === 'video' ? (
                        <div>
                          <span className="text-gray-500 text-sm font-semibold">Duration:</span>
                          <div className="font-bold text-gray-900">{result.fileAnalysis.duration}s</div>
                        </div>
                      ) : (
                        <div>
                          <span className="text-gray-500 text-sm font-semibold">Aspect Ratio:</span>
                          <div className="font-bold text-gray-900">{result.fileAnalysis.aspectRatio}</div>
                        </div>
                      )}
                    </div>

                    {/* Technical Compliance */}
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-[#CC5500] rounded-full mr-2"></div>
                        Technical Compliance
                      </h4>
                      {result.adSpecs.issues.length === 0 ? (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">All technical requirements met</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {result.adSpecs.issues.map((issue, issueIndex) => (
                            <div key={issueIndex} className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                              <XCircle className="w-5 h-5 flex-shrink-0" />
                              <span className="font-semibold">{issue}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Brand Safety */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-[#CC5500] rounded-full mr-2"></div>
                        Brand Safety
                      </h4>
                      {result.brandSafety.issues.length === 0 ? (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">No policy violations detected</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {result.brandSafety.issues.map((issue, issueIndex) => (
                            <div key={issueIndex} className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                              <span className="font-semibold">{issue}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {result.skipReason && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-xl border-2 border-gray-200">
                        <p className="text-sm text-gray-600 font-medium">{result.skipReason}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};