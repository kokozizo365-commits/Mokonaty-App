import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
  condensed?: boolean;
}

const CameraIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, isLoading, condensed = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraUpload = () => {
    cameraInputRef.current?.click();
  };

  const containerClasses = condensed
    ? ""
    : "bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-slate-200";

  return (
    <div className={containerClasses}>
       {!condensed && (
         <>
          <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">ابدأ بتحليل منتجك</h2>
          <p className="text-slate-600 text-center mb-6">اختر صورة للمكونات من جهازك أو استخدم الكاميرا مباشرة.</p>
         </>
       )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
        
        <button
          onClick={triggerCameraUpload}
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <CameraIcon />
          استخدم الكاميرا
        </button>
        
        <button
          onClick={triggerFileUpload}
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-cyan-700 bg-white hover:bg-slate-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <UploadIcon />
          ارفع صورة
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
