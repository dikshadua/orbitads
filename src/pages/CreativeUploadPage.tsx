import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { ArrowLeft, ArrowRight, FileVideo, CheckCircle2 } from 'lucide-react';
import type { FormData, FileAnalysis } from '../types';

interface CreativeUploadPageProps {
  formData: FormData;
  onNext: (analyzes: FileAnalysis[]) => void;
  onBack: () => void;
}

export const CreativeUploadPage: React.FC<CreativeUploadPageProps> = ({ formData, onNext, onBack }) => {
  const [fileAnalyzes, setFileAnalyzes] = useState<FileAnalysis[]>([]);

  const handleNext = () => {
    if (fileAnalyzes.length > 0) {
      onNext(fileAnalyzes);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:shadow-2xl transition-all duration-200">
        <div className="bg-gradient-to-r from-[#CC5500] to-[#FF6B35] rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold flex items-center">
                <FileVideo className="w-8 h-8 mr-3" />
                Creative Upload
              </h2>
              <p className="mt-2 text-orange-100">Upload your creative assets for compliance checking</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-orange-100 mb-1">Campaign</div>
              <div className="font-bold text-lg">{formData.brandName}</div>
              <div className="text-sm text-orange-200">{formData.selectedPublishers.length} publishers selected</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <FileUpload 
            onFilesAnalyzed={setFileAnalyzes}
            uploadedFiles={fileAnalyzes}
          />
        </div>

        {/* Upload Summary */}
        {fileAnalyzes.length > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-bold text-green-800">Files Ready for Analysis</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {fileAnalyzes.filter(f => f.fileType === 'video').length}
                </div>
                <div className="text-sm text-green-700 font-semibold">Video Assets</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {fileAnalyzes.filter(f => f.fileType === 'image').length}
                </div>
                <div className="text-sm text-green-700 font-semibold">Static Assets</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {formData.selectedPublishers.length}
                </div>
                <div className="text-sm text-green-700 font-semibold">Publishers</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-100">
          <button
            onClick={onBack}
            className="flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl 
                     hover:bg-gray-50 hover:border-gray-400 hover:scale-105 hover:-translate-y-1
                     transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-gray-100 focus:outline-none"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Advertiser
          </button>

          <button
            onClick={handleNext}
            disabled={fileAnalyzes.length === 0}
            className="flex items-center px-8 py-4 bg-[#CC5500] text-white font-bold rounded-xl 
                     hover:bg-[#B84A00] hover:scale-105 hover:-translate-y-1
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0
                     transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-orange-100 focus:outline-none"
          >
            Analyze Compliance
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};