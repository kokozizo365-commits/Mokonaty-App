import React from 'react';

interface HeaderProps {
  mode: 'single' | 'compare';
  onModeChange: (mode: 'single' | 'compare') => void;
  onProfileClick: () => void;
}

const ProfileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
    </svg>
  );

const Header: React.FC<HeaderProps> = ({ mode, onModeChange, onProfileClick }) => {
  const activeClasses = 'bg-cyan-600 text-white shadow-md';
  const inactiveClasses = 'bg-white/60 text-cyan-800 hover:bg-white';

  return (
    <header className="text-center py-8">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
          مكوناتي
        </span>
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        حلل وقارن منتجاتك لتحسين جودة حياتك
      </p>

      <div className="relative max-w-sm mx-auto">
        <div className="flex justify-center bg-slate-200/70 p-1.5 rounded-xl max-w-md mx-auto no-print">
            <button 
            onClick={() => onModeChange('single')}
            className={`w-1/2 p-2 rounded-lg font-semibold transition-all duration-300 ${mode === 'single' ? activeClasses : inactiveClasses}`}
            >
            تحليل فردي
            </button>
            <button 
            onClick={() => onModeChange('compare')}
            className={`w-1/2 p-2 rounded-lg font-semibold transition-all duration-300 ${mode === 'compare' ? activeClasses : inactiveClasses}`}
            >
            مقارنة منتجين
            </button>
        </div>
         <button 
            onClick={onProfileClick}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white transition-all text-cyan-700 hover:text-cyan-600"
            title="ملفي الغذائي"
            aria-label="فتح إعدادات الملف الغذائي"
        >
            <ProfileIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
