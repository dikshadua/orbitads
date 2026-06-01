import React, { useCallback, useState } from 'react';
import { Upload, X, FileVideo, Image, AlertCircle, CheckCircle2, Loader2, Plus, Film, ImageIcon } from 'lucide-react';
import { FileAnalysis } from '../types';

interface FileUploadProps {
  onFilesAnalyzed: (analyzes: FileAnalysis[]) => void;
  uploadedFiles: FileAnalysis[];
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesAnalyzed, uploadedFiles }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const resizeToBase64 = (source: HTMLImageElement | HTMLVideoElement, maxSize = 1024): string => {
    let w = source instanceof HTMLVideoElement ? source.videoWidth : source.naturalWidth;
    let h = source instanceof HTMLVideoElement ? source.videoHeight : source.naturalHeight;
    if (w > maxSize || h > maxSize) {
      const scale = maxSize / Math.max(w, h);
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    }
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.drawImage(source, 0, 0, w, h);
    return canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
  };

  const analyzeFile = useCallback(async (file: File): Promise<FileAnalysis> => {
    return new Promise((resolve) => {
      const fileType = file.type.startsWith('video/') ? 'video' : 'image';
      const objectUrl = URL.createObjectURL(file);

      if (fileType === 'video') {
        const video = document.createElement('video');
        video.preload = 'metadata';
        let resolved = false;

        const doResolve = (extra: { imageBase64?: string; mimeType?: string } = {}) => {
          if (resolved) return;
          resolved = true;
          URL.revokeObjectURL(objectUrl);
          const width = video.videoWidth || 1920;
          const height = video.videoHeight || 1080;
          const duration = Math.round(video.duration) || 30;
          const aspectRatio = `${Math.round((width / height) * 100) / 100}:1`;
          resolve({
            fileName: file.name,
            fileType: 'video',
            fileSize: file.size,
            resolution: { width, height },
            duration,
            aspectRatio,
            format: file.name.split('.').pop()?.toLowerCase() || 'unknown',
            id: crypto.randomUUID(),
            ...extra
          });
        };

        video.onloadedmetadata = () => {
          // Seek to 1s (or 10% of duration) to capture a representative frame
          video.onseeked = () => {
            try {
              const imageBase64 = resizeToBase64(video);
              doResolve(imageBase64 ? { imageBase64, mimeType: 'image/jpeg' } : {});
            } catch {
              doResolve();
            }
          };
          video.currentTime = Math.min(1, (video.duration || 10) * 0.1);
          // Fallback if seek takes too long
          setTimeout(() => doResolve(), 3000);
        };

        video.onerror = () => doResolve();
        video.src = objectUrl;
      } else {
        const img = new window.Image();

        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
          const divisor = gcd(width, height);
          const aspectRatio = `${width / divisor}:${height / divisor}`;
          const imageBase64 = resizeToBase64(img);
          const mimeType = 'image/jpeg'; // canvas.toDataURL always outputs JPEG
          URL.revokeObjectURL(objectUrl);
          resolve({
            fileName: file.name,
            fileType: 'image',
            fileSize: file.size,
            resolution: { width, height },
            aspectRatio,
            format: file.name.split('.').pop()?.toLowerCase() || 'unknown',
            id: crypto.randomUUID(),
            ...(imageBase64 ? { imageBase64, mimeType } : {})
          });
        };

        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
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

        img.src = objectUrl;
      }
    });
  }, []);

  const handleFiles = useCallback(async (files: FileList) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
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
      const analyzes = [];
      for (let i = 0; i < validFiles.length; i++) {
        const analysis = await analyzeFile(validFiles[i]);
        analyzes.push(analysis);
        setAnalysisProgress(((i + 1) / validFiles.length) * 100);
      }
      
      const allAnalyzes = [...uploadedFiles, ...analyzes];
      onFilesAnalyzed(allAnalyzes);
    } catch (error) {
      console.error('Error analyzing files:', error);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
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
    <div className="space-y-8 animate-slide-up">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-brand-400 bg-gradient-to-br from-brand-50 to-brand-100 scale-[1.02]'
            : 'border-neutral-300 hover:border-brand-300 hover:bg-gradient-to-br hover:from-neutral-50 hover:to-brand-50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-300 ${
            isDragOver 
              ? 'bg-brand-500 text-white scale-110 rotate-12' 
              : 'bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-400 hover:from-brand-100 hover:to-brand-200 hover:text-brand-500'
          }`}>
            <Upload className="w-10 h-10" />
          </div>
          
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">
            Upload Creative Assets
          </h3>
          <p className="text-lg text-neutral-600 mb-2 max-w-2xl">
            Drag and drop your video and image files here, or click to browse
          </p>
          <p className="text-sm text-neutral-500 mb-8">
            Supports: <span className="font-medium">MP4, MOV</span> (video) • <span className="font-medium">JPG, PNG, GIF</span> (images) • Max 500MB per file
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
            className="btn-primary text-lg px-8 py-4 group cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-200" />
            Choose Files
          </label>
        </div>
      </div>

      {/* Upload Progress */}
      {isAnalyzing && (
        <div className="card p-6 animate-scale-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-100 to-brand-200 rounded-2xl flex items-center justify-center">
              <Loader2 className="animate-spin w-6 h-6 text-brand-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-neutral-900">Analyzing uploaded files...</h4>
                <span className="text-sm font-medium text-neutral-600">{Math.round(analysisProgress)}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-brand-500 to-brand-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-neutral-500 mt-2">Processing file metadata and technical specifications</p>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Files Display */}
      {uploadedFiles.length > 0 && (
        <div className="card p-8 animate-slide-up">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-success-100 to-success-200 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  Uploaded Assets ({uploadedFiles.length})
                </h3>

              </div>
            </div>
            <button
              onClick={clearAllFiles}
              className="btn-ghost text-error-600 hover:bg-error-50 hover:text-error-700"
            >
              Clear All
            </button>
          </div>

          {/* Video Assets */}
          {videoFiles.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-100 to-brand-200 rounded-xl flex items-center justify-center">
                  <Film className="w-5 h-5 text-brand-600" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900">Video Assets ({videoFiles.length})</h4>
              </div>
              <div className="grid gap-4">
                {videoFiles.map((file, index) => {
                  const originalIndex = uploadedFiles.findIndex(f => f === file);
                  return (
                    <div 
                      key={originalIndex} 
                      className="card-interactive p-6 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center">
                            <FileVideo className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors duration-200">
                              {file.fileName}
                            </h5>
                            <div className="flex items-center gap-4 text-sm text-neutral-600 mt-1">
                              <span className="font-medium">{file.resolution.width}×{file.resolution.height}</span>
                              <span>•</span>
                              <span className="font-medium">{file.duration}s</span>
                              <span>•</span>
                              <span className="font-medium">{formatFileSize(file.fileSize)}</span>
                              <span>•</span>
                              <span className="font-medium uppercase">{file.format}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(originalIndex)}
                          className="w-10 h-10 rounded-xl text-neutral-400 hover:text-error-500 hover:bg-error-50 transition-all duration-200 flex items-center justify-center"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Static Image Assets */}
          {imageFiles.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900">Static Image Assets ({imageFiles.length})</h4>
              </div>
              <div className="grid gap-4">
                {imageFiles.map((file, index) => {
                  const originalIndex = uploadedFiles.findIndex(f => f === file);
                  return (
                    <div 
                      key={originalIndex} 
                      className="card-interactive p-6 group"
                      style={{ animationDelay: `${(videoFiles.length + index) * 50}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                            <Image className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors duration-200">
                              {file.fileName}
                            </h5>
                            <div className="flex items-center gap-4 text-sm text-neutral-600 mt-1">
                              <span className="font-medium">{file.resolution.width}×{file.resolution.height}</span>
                              <span>•</span>
                              <span className="font-medium">{file.aspectRatio}</span>
                              <span>•</span>
                              <span className="font-medium">{formatFileSize(file.fileSize)}</span>
                              <span>•</span>
                              <span className="font-medium uppercase">{file.format}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(originalIndex)}
                          className="w-10 h-10 rounded-xl text-neutral-400 hover:text-error-500 hover:bg-error-50 transition-all duration-200 flex items-center justify-center"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
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