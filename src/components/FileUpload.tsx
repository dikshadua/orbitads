import React, { useCallback, useState } from 'react';
import { Upload, X, FileVideo, Image, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { FileAnalysis } from '../types';

interface FileUploadProps {
  onFilesAnalyzed: (analyzes: FileAnalysis[]) => void;
  uploadedFiles: FileAnalysis[];
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesAnalyzed, uploadedFiles }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeFile = useCallback(async (file: File): Promise<FileAnalysis> => {
    return new Promise((resolve) => {
      const fileType = file.type.startsWith('video/') ? 'video' : 'image';
      
      if (fileType === 'video') {
        const video = document.createElement('video');
        video.preload = 'metadata';
        
        video.onloadedmetadata = () => {
          const width = video.videoWidth;
          const height = video.videoHeight;
          const duration = Math.round(video.duration);
          const aspectRatio = `${Math.round((width / height) * 100) / 100}:1`;
          
          resolve({
            fileName: file.name,
            fileType: 'video',
            fileSize: file.size,
            resolution: { width, height },
            duration,
            aspectRatio,
            format: file.name.split('.').pop()?.toLowerCase() || 'unknown',
            id: crypto.randomUUID()
          });
        };
        
        video.onerror = () => {
          resolve({
            fileName: file.name,
            fileType: 'video',
            fileSize: file.size,
            resolution: { width: 1920, height: 1080 },
            duration: 30,
            aspectRatio: '16:9',
            format: file.name.split('.').pop()?.toLowerCase() || 'unknown',
            id: crypto.randomUUID()
          });
        };
        
        video.src = URL.createObjectURL(file);
      } else {
        const img = new window.Image();
        
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
          const divisor = gcd(width, height);
          const aspectRatio = `${width / divisor}:${height / divisor}`;
          
          resolve({
            fileName: file.name,
            fileType: 'image',
            fileSize: file.size,
            resolution: { width, height },
            aspectRatio,
            format: file.name.split('.').pop()?.toLowerCase() || 'unknown',
            id: crypto.randomUUID()
          });
        };
        
        img.onerror = () => {
          resolve({
            fileName: file.name,
            fileType: 'image',
            fileSize: file.size,
            resolution: { width: 1080, height: 1080 },
            aspectRatio: '1:1',
            format: file.name.split('.').pop()?.toLowerCase() || 'unknown',
            id: crypto.randomUUID()
          });
        };
        
        img.src = URL.createObjectURL(file);
      }
    });
  }, []);

  const handleFiles = useCallback(async (files: FileList) => {
    setIsAnalyzing(true);
    
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      return isVideo || isImage;
    });

    if (validFiles.length === 0) {
      setIsAnalyzing(false);
      return;
    }

    try {
      const analyzes = await Promise.all(validFiles.map(analyzeFile));
      const allAnalyzes = [...uploadedFiles, ...analyzes];
      onFilesAnalyzed(allAnalyzes);
    } catch (error) {
      console.error('Error analyzing files:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [analyzeFile, onFilesAnalyzed, uploadedFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeFile = useCallback((index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    onFilesAnalyzed(newFiles);
  }, [uploadedFiles, onFilesAnalyzed]);

  const clearAllFiles = useCallback(() => {
    onFilesAnalyzed([]);
  }, [onFilesAnalyzed]);

  const formatFileSize = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const videoFiles = uploadedFiles.filter(file => file.fileType === 'video');
  const imageFiles = uploadedFiles.filter(file => file.fileType === 'image');

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-[#CC5500] bg-gradient-to-br from-orange-50 to-orange-100 scale-105'
            : 'border-gray-300 hover:border-[#CC5500] hover:bg-gradient-to-br hover:from-gray-50 hover:to-orange-50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-200 ${
            isDragOver ? 'bg-[#CC5500] text-white scale-110' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400'
          }`}>
            <Upload className="w-8 h-8" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Upload Creative Assets
          </h3>
          <p className="text-gray-600 mb-4 text-lg">
            Drag and drop your video and image files here, or click to browse
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Supports: MP4, MOV (video) • JPG, PNG, GIF (images) • Max 500MB per file
          </p>
          
          <input
            type="file"
            multiple
            accept="video/mp4,video/quicktime,image/jpeg,image/jpg,image/png,image/gif"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#CC5500] text-white font-bold rounded-xl 
                     hover:bg-[#B84A00] hover:scale-105 hover:-translate-y-1
                     cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-orange-100"
          >
            <Upload className="w-5 h-5" />
            Choose Files
          </label>
        </div>
      </div>

      {/* Upload Status */}
      {isAnalyzing && (
        <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl">
          <Loader2 className="animate-spin w-6 h-6 text-[#CC5500]" />
          <div>
            <div className="font-bold text-[#CC5500] text-lg">Analyzing uploaded files...</div>
            <div className="text-sm text-gray-600">Processing file metadata and technical specifications</div>
          </div>
        </div>
      )}

      {/* Uploaded Files Display */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
              Uploaded Assets ({uploadedFiles.length})
            </h3>
            <button
              onClick={clearAllFiles}
              className="text-red-600 hover:text-red-700 font-bold px-4 py-2 rounded-lg hover:bg-red-50 
                       transition-all duration-200 border-2 border-red-200 hover:border-red-300"
            >
              Clear All
            </button>
          </div>

          {/* Video Assets */}
          {videoFiles.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                  <FileVideo className="w-5 h-5 text-[#CC5500]" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">Video Assets ({videoFiles.length})</h4>
              </div>
              <div className="space-y-3">
                {videoFiles.map((file, index) => {
                  const originalIndex = uploadedFiles.findIndex(f => f === file);
                  return (
                    <div key={originalIndex} className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 
                                                      rounded-xl border-2 border-orange-200 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#CC5500] to-[#FF6B35] rounded-xl flex items-center justify-center">
                          <FileVideo className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{file.fileName}</p>
                          <p className="text-sm text-gray-600">
                            {file.resolution.width}×{file.resolution.height} • {file.duration}s • {formatFileSize(file.fileSize)} • {file.format.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(originalIndex)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-white transition-all duration-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Static Image Assets */}
          {imageFiles.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <Image className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">Static Image Assets ({imageFiles.length})</h4>
              </div>
              <div className="space-y-3">
                {imageFiles.map((file, index) => {
                  const originalIndex = uploadedFiles.findIndex(f => f === file);
                  return (
                    <div key={originalIndex} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 
                                                      rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                          <Image className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{file.fileName}</p>
                          <p className="text-sm text-gray-600">
                            {file.resolution.width}×{file.resolution.height} • {file.aspectRatio} • {formatFileSize(file.fileSize)} • {file.format.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(originalIndex)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-white transition-all duration-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};