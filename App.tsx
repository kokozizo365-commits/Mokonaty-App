import React, { useState, useCallback, useEffect } from 'react';
import type { FullReport, ProductState, ComparisonResult, DietaryProfile } from './types';
import { analyzeProductImage, compareProducts } from './services/geminiService';

import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';
import ComparisonDisplay from './components/ComparisonDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

// --- ProfileModal Component ---
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: DietaryProfile) => void;
  initialProfile: DietaryProfile;
}

const PREFERENCES_OPTIONS = [
  "نباتي (Vegetarian)",
  "نباتي صرف (Vegan)",
  "خالي من الجلوتين",
  "خالي من اللاكتوز",
  "خالي من السكر المضاف",
];

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSave, initialProfile }) => {
  const [preferences, setPreferences] = useState<string[]>(initialProfile.preferences);
  const [allergies, setAllergies] = useState<string>(initialProfile.allergies);

  useEffect(() => {
    if (isOpen) {
        setPreferences(initialProfile.preferences);
        setAllergies(initialProfile.allergies);
    }
  }, [isOpen, initialProfile]);
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handlePreferenceChange = (pref: string) => {
    setPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleSave = () => {
    onSave({ preferences, allergies });
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()} style={{ animationFillMode: 'forwards' }}
      >
        <header className="flex justify-between items-center p-4 border-b border-slate-200">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">ملفي الغذائي</h2>
          <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-200" aria-label="إغلاق">
            <CloseIcon />
          </button>
        </header>
        
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">تفضيلات النظام الغذائي</h3>
            <div className="space-y-2">
              {PREFERENCES_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center space-x-3 space-x-reverse p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={preferences.includes(opt)}
                    onChange={() => handlePreferenceChange(opt)}
                    className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="text-slate-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="allergies" className="block font-semibold text-slate-800 mb-2">
              الحساسية من مكونات معينة
            </label>
            <textarea
              id="allergies"
              rows={3}
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="مثال: فول سوداني, صويا, محار..."
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
            <p className="text-xs text-slate-500 mt-1">افصل بين كل مكون بفاصلة.</p>
          </div>
        </div>

        <footer className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl">
            <div className="flex justify-end gap-4">
                <button onClick={onClose} className="px-5 py-2.5 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">
                    إلغاء
                </button>
                <button onClick={handleSave} className="px-5 py-2.5 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-all shadow-md">
                    حفظ التغييرات
                </button>
            </div>
        </footer>
      </div>
      <style>{`
        @keyframes fade-in-scale { to { opacity: 1; transform: scale(1); } }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s ease-out; }
      `}</style>
    </div>
  );
};


const initialProductState: ProductState = { file: null, previewUrl: null, report: null };

const App: React.FC = () => {
  const [mode, setMode] = useState<'single' | 'compare'>('single');
  const [productA, setProductA] = useState<ProductState>(initialProductState);
  const [productB, setProductB] = useState<ProductState>(initialProductState);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<DietaryProfile>({ preferences: [], allergies: '' });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('dietaryProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Failed to load profile from localStorage", error);
    }
  }, []);

  const handleSaveProfile = (newProfile: DietaryProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('dietaryProfile', JSON.stringify(newProfile));
    } catch (error) {
      console.error("Failed to save profile to localStorage", error);
    }
  };


  const resetState = useCallback(() => {
    setProductA(p => {
      if (p.previewUrl) {
        URL.revokeObjectURL(p.previewUrl);
      }
      return initialProductState;
    });
    setProductB(p => {
      if (p.previewUrl) {
        URL.revokeObjectURL(p.previewUrl);
      }
      return initialProductState;
    });
    setComparisonResult(null);
    setIsLoading(false);
    setError(null);
  }, []);

  const handleModeChange = (newMode: 'single' | 'compare') => {
    resetState();
    setMode(newMode);
  };
  
  const handleImageSelect = (file: File, product: 'A' | 'B') => {
    const setter = product === 'A' ? setProductA : setProductB;

    setter(prevState => {
      if (prevState.previewUrl) {
        URL.revokeObjectURL(prevState.previewUrl);
      }
      return { ...initialProductState, file, previewUrl: URL.createObjectURL(file) };
    });
    setError(null);
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!productA.file) {
      setError("الرجاء اختيار صورة أولاً.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeProductImage(productA.file, profile);
      setProductA(p => ({ ...p, report: result }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع.");
    } finally {
      setIsLoading(false);
    }
  }, [productA.file, profile]);

  const handleCompareClick = useCallback(async () => {
    if (!productA.file || !productB.file) {
      setError("الرجاء اختيار صورتين للمقارنة.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setComparisonResult(null);

    try {
      // Analyze both products in parallel
      const [reportA, reportB] = await Promise.all([
        analyzeProductImage(productA.file, profile),
        analyzeProductImage(productB.file, profile)
      ]);
      setProductA(p => ({ ...p, report: reportA }));
      setProductB(p => ({ ...p, report: reportB }));

      // Then, get the AI comparison
      const comparison = await compareProducts(reportA, reportB);
      setComparisonResult(comparison);

    } catch (err) {
       setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع أثناء المقارنة.");
    } finally {
      setIsLoading(false);
    }
  }, [productA.file, productB.file, profile]);


  const renderUploader = (productKey: 'A' | 'B', title: string) => {
    const product = productKey === 'A' ? productA : productB;
    return (
      <div className="bg-white/70 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-slate-200 flex-1 flex flex-col gap-3">
        <h2 className="text-xl font-bold text-slate-900 text-center">{title}</h2>
        <div className="flex-grow flex flex-col justify-center py-2">
            {product.previewUrl ? (
               <img src={product.previewUrl} alt={`Preview ${productKey}`} className="max-w-xs w-full mx-auto rounded-lg shadow-lg" />
            ) : (
              <p className="text-slate-600 text-center">اختر صورة للمكونات.</p>
            )}
        </div>
        <div>
            <ImageUploader onImageSelect={(file) => handleImageSelect(file, productKey)} isLoading={isLoading} condensed />
        </div>
      </div>
    );
  };
  
  const showResults = mode === 'single' ? productA.report : (productA.report && productB.report && comparisonResult);

  return (
    <div className="relative min-h-screen text-gray-900">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-white via-cyan-50 to-blue-100 -z-10"></div>
      <div className="relative container mx-auto max-w-5xl py-8 px-4">
        <Header mode={mode} onModeChange={handleModeChange} onProfileClick={() => setIsProfileModalOpen(true)} />
        
        <ProfileModal 
            isOpen={isProfileModalOpen} 
            onClose={() => setIsProfileModalOpen(false)}
            onSave={handleSaveProfile}
            initialProfile={profile}
        />

        <main>
          {!showResults && (
            <>
              {mode === 'single' && (
                <div className="max-w-xl mx-auto">
                   <div className="bg-white/70 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-slate-200 flex flex-col gap-3">
                      <h2 className="text-xl font-bold text-slate-900 text-center">تحليل منتج فردي</h2>
                       <div className="flex-grow flex flex-col justify-center py-2">
                          {productA.previewUrl ? (
                            <img src={productA.previewUrl} alt="Product preview" className="max-w-sm w-full mx-auto rounded-lg shadow-lg" />
                          ) : (
                            <p className="text-slate-600 text-center">اختر صورة للمكونات لبدء التحليل.</p>
                          )}
                      </div>
                      <div>
                          <ImageUploader onImageSelect={(file) => handleImageSelect(file, 'A')} isLoading={isLoading} condensed />
                      </div>
                   </div>
                </div>
              )}

              {mode === 'compare' && (
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  {renderUploader('A', 'المنتج الأول')}
                  {renderUploader('B', 'المنتج الثاني')}
                </div>
              )}
            </>
          )}

          {!isLoading && !showResults && (
             <div className="text-center mt-8">
                <button
                    onClick={mode === 'single' ? handleAnalyzeClick : handleCompareClick}
                    disabled={isLoading || (mode === 'single' && !productA.file) || (mode === 'compare' && (!productA.file || !productB.file))}
                    className="px-8 py-4 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-all text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    {mode === 'single' ? '🔬 تحليل المكونات' : '⚖️ قارن الآن'}
                </button>
            </div>
          )}

          {isLoading && <LoadingSpinner message={mode === 'compare' ? '...جاري تحليل ومقارنة المنتجين' : undefined}/>}
          
          {error && <ErrorMessage message={error} />}

          {showResults && (
            <div>
              {mode === 'single' && productA.report && <ResultsDisplay reportData={productA.report} />}
              {mode === 'compare' && productA.report && productB.report && comparisonResult && (
                <ComparisonDisplay reportA={productA.report} reportB={productB.report} comparisonResult={comparisonResult} />
              )}
              <div className="text-center mt-8 no-print">
                <button
                    onClick={resetState}
                    className="px-6 py-3 bg-slate-200 text-cyan-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
                >
                  {mode === 'single' ? 'تحليل منتج آخر' : 'إجراء مقارنة جديدة'}
                </button>
              </div>
            </div>
          )}
        </main>
        
        <footer className="text-center text-slate-600 mt-12 pb-4">
          <p>تحذير: هذا التحليل هو لأغراض معلوماتية ولا يغني عن استشارة الخبراء.</p>
          <p>صمم بواسطة Ramzy_Koky_01203168883</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
