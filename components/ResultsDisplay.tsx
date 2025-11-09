// @ts-nocheck

import React, { useState } from 'react';
import type { FullReport, Ingredient, ProfileCompatibility, PinnedItem } from '../types';
import Accordion from './Accordion';

// --- ICONS ---
const HalalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
);
const HaramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
);
const DoubtfulIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
);
const SiyamiIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.5.38C11.2 20.53 14.83 18 17 8m-2-6C13.2 2 12 3.2 12 5s1.2 3 3 3s3-1.2 3-3c0-1.5-1.2-2.7-2.6-2.9C15.2 2.05 15.1 2 15 2z"/></svg>
);
const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
);
const PrintIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
);
const SummaryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
);
const FireIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>);
const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);
const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-7.5 12h13.5" />
  </svg>
);
const PinIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>);
const PinFilledIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" /></svg>);
const CloseIconSmall: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


// --- PinButton Component ---
const PinButton: React.FC<{ isPinned: boolean; onClick: () => void; size?: 'sm' | 'md' }> = ({ isPinned, onClick, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';
  return (
    <button onClick={onClick} className={`p-1.5 rounded-full transition-colors shrink-0 ${isPinned ? 'bg-cyan-100 text-cyan-600' : 'text-slate-400 hover:bg-slate-200 hover:text-slate-600'}`} title={isPinned ? 'إلغاء التثبيت' : 'تثبيت للعرض'}>
      {isPinned ? <PinFilledIcon className={sizeClasses} /> : <PinIcon className={sizeClasses} />}
    </button>
  );
};


// --- CompatibilityCard Component ---
const CompatibleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>);
const NotCompatibleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>);
const MaybeCompatibleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>);

const CompatibilityCard: React.FC<{ compatibility: ProfileCompatibility, isPinned: boolean, onPinToggle: () => void }> = ({ compatibility, isPinned, onPinToggle }) => {
  const configMap = {
    'متوافق': { Icon: CompatibleIcon, bgColor: 'bg-emerald-50', borderColor: 'border-emerald-300', textColor: 'text-emerald-800', title: 'متوافق مع ملفك الغذائي' },
    'غير متوافق': { Icon: NotCompatibleIcon, bgColor: 'bg-red-50', borderColor: 'border-red-300', textColor: 'text-red-800', title: 'غير متوافق مع ملفك الغذائي' },
    'قد لا يكون متوافقاً': { Icon: MaybeCompatibleIcon, bgColor: 'bg-amber-50', borderColor: 'border-amber-300', textColor: 'text-amber-800', title: 'قد لا يكون متوافقاً' }
  };
  const config = configMap[compatibility.الحالة];
  if (!config) return null;

  return (
    <div className={`p-4 rounded-lg border-2 flex items-start gap-4 ${config.bgColor} ${config.borderColor} print-section relative`}>
       <div className="absolute top-2 left-2 no-print">
         <PinButton isPinned={isPinned} onClick={onPinToggle} size="sm" />
       </div>
      <config.Icon className={`w-10 h-10 shrink-0 ${config.textColor}`} />
      <div>
        <h4 className={`font-bold text-lg ${config.textColor}`}>{config.title}</h4>
        <p className={`text-sm ${config.textColor.replace('800', '700')} mt-1`}>{compatibility.السبب}</p>
      </div>
    </div>
  );
};


const StatusBadge: React.FC<{ status: 'حلال' | 'حرام' | 'مشكوك فيه' }> = ({ status }) => {
  const statusConfig = {
    'حلال': { icon: <HalalIcon className="w-4 h-4" />, text: 'حلال', classes: 'bg-emerald-100 text-emerald-800'},
    'حرام': { icon: <HaramIcon className="w-4 h-4" />, text: 'حرام', classes: 'bg-red-100 text-red-800'},
    'مشكوك فيه': { icon: <DoubtfulIcon className="w-4 h-4" />, text: 'مشكوك فيه', classes: 'bg-amber-100 text-amber-800'},
  };
  const config = statusConfig[status] || { icon: null, text: status, classes: 'bg-slate-200 text-slate-900' };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-bold rounded-full ${config.classes} print-badge`}>
      {config.icon}
      <span>{config.text}</span>
    </span>
  );
};

const IngredientCard: React.FC<{ ingredient: Ingredient; isPinned: boolean; onPinToggle: () => void; }> = ({ ingredient, isPinned, onPinToggle }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showAllSources, setShowAllSources] = useState(false);
    const hasSources = ingredient.مصدر_المعلومة && ingredient.مصدر_المعلومة.length > 0;
    
    const statusStyles = {
        'حلال': {
            border: 'border-emerald-300',
            bg: 'bg-emerald-50/60',
            title: 'text-emerald-900'
        },
        'حرام': {
            border: 'border-red-300',
            bg: 'bg-red-50/60',
            title: 'text-red-900'
        },
        'مشكوك فيه': {
            border: 'border-amber-300',
            bg: 'bg-amber-50/60',
            title: 'text-amber-900'
        }
    };
    const styles = statusStyles[ingredient.الحالة_الشرعية] || { border: 'border-slate-200', bg: 'bg-slate-50', title: 'text-cyan-700'};

    const hasDetails = 
        ingredient.التحليل_العلمي_والفوائد ||
        ingredient.التحليل_العلمي_والأضرار ||
        ingredient.الشك_العلمي_أو_الشرعي ||
        ingredient.ملاحظات_شرعية_وفقهية ||
        hasSources;

    return (
        <div className={`p-4 rounded-lg border-2 ${styles.border} ${styles.bg} transition-all duration-300`}>
            <div className="flex justify-between items-start flex-wrap gap-2">
                <div className='flex-1'>
                    <h4 className={`font-bold text-lg ${styles.title}`}>{ingredient.الاسم_العربي}</h4>
                    {ingredient.الاسم_العلمي && <p className="text-sm text-slate-500 italic">{ingredient.الاسم_العلمي}</p>}
                </div>
                 <div className="flex items-center gap-2 no-print">
                    <PinButton isPinned={isPinned} onClick={onPinToggle} size="sm" />
                    <StatusBadge status={ingredient.الحالة_الشرعية} />
                </div>
                <div className="hidden print:block">
                    <StatusBadge status={ingredient.الحالة_الشرعية} />
                </div>
            </div>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-3 mt-3 border-t border-slate-200/80 space-y-3">
                    {ingredient.التحليل_العلمي_والفوائد && <p className="text-slate-700"><strong className="text-slate-900">التحليل العلمي والفوائد:</strong> {ingredient.التحليل_العلمي_والفوائد}</p>}
                    {ingredient.التحليل_العلمي_والأضرار && <p className="text-slate-700"><strong className="text-slate-900">التحليل العلمي والأضرار:</strong> {ingredient.التحليل_العلمي_والأضرار}</p>}
                    {ingredient.الشك_العلمي_أو_الشرعي && <p className="text-slate-700"><strong className="text-slate-900">ملاحظات الشك:</strong> {ingredient.الشك_العلمي_أو_الشرعي}</p>}
                    {ingredient.ملاحظات_شرعية_وفقهية && <p className="text-slate-700"><strong className="text-slate-900">ملاحظات شرعية:</strong> {ingredient.ملاحظات_شرعية_وفقهية}</p>}
                    {hasSources && (
                        <div className="pt-2">
                            <h5 className="font-semibold text-sm text-slate-600 mb-2">المصادر:</h5>
                            <ul className="text-sm text-slate-500 space-y-1">
                                {ingredient.مصدر_المعلومة.slice(0, showAllSources ? ingredient.مصدر_المعلومة.length : 1).map((source, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <ExternalLinkIcon className="w-4 h-4 shrink-0 text-cyan-500" />
                                        <a href={source} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 hover:underline break-all">
                                            {source}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            {ingredient.مصدر_المعلومة.length > 1 && (
                                <button 
                                    onClick={() => setShowAllSources(!showAllSources)} 
                                    className="text-cyan-600 hover:text-cyan-800 text-sm font-semibold mt-2"
                                >
                                    {showAllSources ? 'عرض أقل' : `عرض الكل (${ingredient.مصدر_المعلومة.length})`}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {hasDetails && (
                <div className="text-center mt-3">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm font-semibold text-cyan-700 hover:text-cyan-900 transition-colors py-1 px-3 rounded-md hover:bg-cyan-100/50 flex items-center gap-1 mx-auto"
                        aria-expanded={isExpanded}
                    >
                        <span>{isExpanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}</span>
                        <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
            )}
        </div>
    );
};

interface ResultsDisplayProps {
  reportData: FullReport;
}

const parseNutrientValue = (value: string | undefined): number => {
    if (!value || typeof value !== 'string') return 0;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
};


const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ reportData }) => {
  const [pinnedItems, setPinnedItems] = useState<PinnedItem[]>([]);
  
  const handlePinToggle = (item: PinnedItem) => {
    setPinnedItems(prev =>
      prev.some(p => p.id === item.id)
        ? prev.filter(p => p.id !== item.id)
        : [...prev, item]
    );
  };
  const isPinned = (id: string) => pinnedItems.some(p => p.id === id);

  const report = reportData.تقرير_المجلس_العلمي_للكيمياء_الغذائية;
  if (!report) return <p className="text-slate-800 text-center">لا توجد بيانات لعرضها.</p>;

  const { ايجابية = [], سلبية = [], مشكوك_فيها = [] } = report.المكونات_المفصلة ?? {};
  const nutritionalInfo = report.المعلومات_الغذائية_لكل_حصة;
  const christianFastingStatus = report.الحالة_حسب_الديانة_المسيحية;
  const compatibility = report.تقييم_التوافق_مع_الملف_الشخصي;

  const positiveCount = ايجابية.length;
  const negativeCount = سلبية.length;
  const doubtfulCount = مشكوك_فيها.length;
  const totalCount = positiveCount + negativeCount + doubtfulCount || 1;
  
  const allIngredients = [...ايجابية, ...سلبية, ...مشكوك_فيها];
  let overallHalalStatus: 'حلال بشكل عام' | 'يحتوي على مكونات محرمة' | 'يحتوي على مكونات مشكوك فيها' = 'حلال بشكل عام';
  let HalalStatusIcon = HalalIcon;
  let halalColor = 'text-emerald-500';

  if (allIngredients.some(ing => ing.الحالة_الشرعية === 'حرام')) {
    overallHalalStatus = 'يحتوي على مكونات محرمة';
    HalalStatusIcon = HaramIcon;
    halalColor = 'text-red-500';
  } else if (allIngredients.some(ing => ing.الحالة_الشرعية === 'مشكوك فيه')) {
    overallHalalStatus = 'يحتوي على مكونات مشكوك فيها';
    HalalStatusIcon = DoubtfulIcon;
    halalColor = 'text-amber-500';
  }

  const renderChristianFastingStatus = () => {
    if (!christianFastingStatus) return null;

    const { الحالة, ملاحظات } = christianFastingStatus;
    let StatusIcon = DoubtfulIcon;
    let statusColor = 'text-amber-500';
    let statusText: string = الحالة;

    if (الحالة === 'صيامي') {
        StatusIcon = SiyamiIcon;
        statusColor = 'text-emerald-500';
        statusText = 'مناسب للصيام';
    } else if (الحالة === 'فطاري') {
        StatusIcon = HaramIcon;
        statusColor = 'text-red-500';
        statusText = 'غير مناسب للصيام';
    }
    
    const id = "status-christian";
    return (
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50 border border-slate-200 text-center relative">
            <div className="absolute top-2 left-2 no-print">
              <PinButton 
                isPinned={isPinned(id)}
                onClick={() => handlePinToggle({
                  id,
                  type: 'status',
                  title: 'الصيام المسيحي',
                  content: statusText
                })}
                size="sm"
              />
            </div>
            <StatusIcon className={`w-16 h-16 ${statusColor}`} />
            <p className={`mt-2 text-xl font-bold ${statusColor}`}>{statusText}</p>
            <p className="text-slate-600 text-sm">بناءً على الديانة المسيحية</p>
            {ملاحظات && <p className="text-xs text-slate-500 mt-1">{ملاحظات}</p>}
        </div>
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: `تقرير تحليل منتج: ${report.اسم_المنتج}`,
      text: `ملخص تحليل منتج "${report.اسم_المنتج}": ${report.ملخص_تنفيذي}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
         const textToCopy = `${shareData.title}\n\n${shareData.text}`;
         await navigator.clipboard.writeText(textToCopy);
         alert('تم نسخ ملخص التقرير إلى الحافظة!');
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // User cancelled the share operation, do nothing.
        return;
      }
      console.error("Error sharing or copying:", err);
      alert("حدث خطأ أثناء محاولة المشاركة أو النسخ.");
    }
  };

  const macros = nutritionalInfo?.المغذيات_الكبرى;
  const nutrients = [
    { name: 'بروتين', value: parseNutrientValue(macros?.البروتين_بالجرام), originalValue: macros?.البروتين_بالجرام, color: 'bg-sky-500' },
    { name: 'دهون', value: parseNutrientValue(macros?.الدهون_الكلي_بالجرام), originalValue: macros?.الدهون_الكلي_بالجرام, color: 'bg-amber-500' },
    { name: 'كربوهيدرات', value: parseNutrientValue(macros?.الكربوهيدرات_الكلي_بالجرام), originalValue: macros?.الكربوهيدرات_الكلي_بالجرام, color: 'bg-rose-500' },
    { name: 'سكريات', value: parseNutrientValue(macros?.السكريات_بالجرام), originalValue: macros?.السكريات_بالجرام, color: 'bg-fuchsia-500' },
    { name: 'ألياف', value: parseNutrientValue(macros?.الألياف_بالجرام), originalValue: macros?.الألياف_بالجرام, color: 'bg-emerald-500' },
  ];

  const hasNutrients = nutrients.some(n => n.originalValue);
  const maxNutrientValue = hasNutrients ? Math.max(...nutrients.map(n => n.value), 1) : 1;

  return (
    <div className="space-y-8 mt-8 text-slate-800">
      <section className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-slate-200 print-section">
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-600">{report.اسم_المنتج ?? 'اسم المنتج غير متوفر'}</h2>
        <p className="text-center text-slate-600 mb-4">تاريخ التحليل: {report.تاريخ_التحليل ?? '--'}</p>
        
        {compatibility && <div className="my-6">
            <CompatibilityCard
                compatibility={compatibility}
                isPinned={isPinned('status-compatibility')}
                onPinToggle={() => handlePinToggle({
                    id: 'status-compatibility',
                    type: 'status',
                    title: 'التوافق مع الملف الشخصي',
                    content: compatibility.الحالة,
                })}
            />
        </div>}

        {report.تاريخ_الصلاحية && report.تاريخ_الصلاحية !== 'غير متوفر' && report.تاريخ_الصلاحية !== 'غير واضح' && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 font-bold px-4 py-2 rounded-lg border-2 border-amber-200">
              <CalendarIcon className="w-5 h-5" />
              <span>تاريخ الصلاحية: {report.تاريخ_الصلاحية}</span>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center my-6 no-print">
            <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-cyan-800 font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                <ShareIcon className="w-5 h-5"/>
                مشاركة
            </button>
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-cyan-800 font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                <PrintIcon className="w-5 h-5"/>
                طباعة / حفظ PDF
            </button>
        </div>
        
        <div className="flex items-center justify-between mb-2 border-b-2 border-slate-300 pb-2">
            <h3 className="text-xl font-semibold flex items-center gap-2">
                <SummaryIcon className="w-6 h-6 text-cyan-500" />
                ملخص تنفيذي
            </h3>
            <div className="no-print">
                <PinButton
                    isPinned={isPinned('summary')}
                    onClick={() => handlePinToggle({
                        id: 'summary',
                        type: 'summary',
                        title: 'ملخص تنفيذي',
                        content: report.ملخص_تنفيذي?.substring(0, 50) + '...',
                    })}
                />
            </div>
        </div>
        <p className="text-slate-700 leading-relaxed">{report.ملخص_تنفيذي ?? 'الملخص غير متوفر.'}</p>
      </section>

      <section className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-slate-200 print-section">
         <h3 className="text-xl font-semibold mb-4 border-b-2 border-slate-300 pb-2 flex items-center gap-2">
            نظرة سريعة على التقرير
         </h3>
         <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50 border border-slate-200 text-center relative">
                    <div className="absolute top-2 left-2 no-print">
                      <PinButton 
                        isPinned={isPinned("status-halal")}
                        onClick={() => handlePinToggle({
                          id: "status-halal",
                          type: 'status',
                          title: 'الحالة الشرعية',
                          content: overallHalalStatus
                        })}
                        size="sm"
                      />
                    </div>
                    <HalalStatusIcon className={`w-16 h-16 ${halalColor}`} />
                    <p className={`mt-2 text-xl font-bold ${halalColor}`}>{overallHalalStatus}</p>
                    <p className="text-slate-600 text-sm">بناءً على الشريعة الإسلامية</p>
                </div>
                {renderChristianFastingStatus()}
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
               <h4 className="font-bold text-lg text-center">تفصيل المكونات</h4>
               {totalCount > 1 && (
                <div className="w-full flex rounded-full h-3 bg-slate-200 overflow-hidden my-2">
                 <div className="bg-emerald-500" title={`إيجابية: ${positiveCount}`} style={{width: `${(positiveCount/totalCount)*100}%`}}></div>
                 <div className="bg-amber-500" title={`مشكوك فيها: ${doubtfulCount}`} style={{width: `${(doubtfulCount/totalCount)*100}%`}}></div>
                 <div className="bg-red-500" title={`سلبية: ${negativeCount}`} style={{width: `${(negativeCount/totalCount)*100}%`}}></div>
               </div>
               )}
               <div className="flex flex-wrap justify-around text-sm gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500"></div>إيجابية: {positiveCount}</span>
                  <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-500"></div>مشكوك فيها: {doubtfulCount}</span>
                  <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div>سلبية: {negativeCount}</span>
               </div>
            </div>
         </div>
      </section>

      <section className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-slate-200 print-section">
        <h3 className="text-xl font-semibold mb-4 border-b-2 border-slate-300 pb-2">المعلومات الغذائية</h3>
        <div className="grid grid-cols-2 gap-4 text-center mb-6">
            <div className="bg-slate-100 p-3 rounded-md flex flex-col items-center justify-center">
                <p className="text-sm text-slate-600">حجم الحصة</p>
                <p className="font-bold text-lg">{nutritionalInfo?.حجم_الحصة_المقترح ?? '--'}</p>
            </div>
            <div className="bg-cyan-500 text-white p-3 rounded-md flex flex-col items-center justify-center relative">
                 <div className="absolute top-2 left-2 no-print">
                      <PinButton 
                        isPinned={isPinned("nutrient-calories")}
                        onClick={() => handlePinToggle({
                          id: "nutrient-calories",
                          type: 'nutrient',
                          title: 'السعرات',
                          content: nutritionalInfo?.السعرات_الحرارية_الإجمالية?.القيمة_بالكالوري ?? '--'
                        })}
                        size="sm"
                      />
                    </div>
                 <FireIcon className="w-6 h-6 mb-1 opacity-80" />
                <p className="text-sm opacity-80">السعرات الحرارية</p>
                <p className="font-bold text-2xl">{nutritionalInfo?.السعرات_الحرارية_الإجمالية?.القيمة_بالكالوري ?? '--'}</p>
            </div>
        </div>
        
        <div className="space-y-3">
            {hasNutrients ? (
                nutrients.map(nutrient => {
                    if (!nutrient.originalValue) return null;
                    const percentage = (nutrient.value / maxNutrientValue) * 100;
                    const id = `nutrient-${nutrient.name}`;
                    return (
                        <div key={nutrient.name} className="grid grid-cols-[80px_1fr_60px_auto] items-center gap-2 text-sm" aria-label={`${nutrient.name}: ${nutrient.originalValue}`}>
                            <span className="text-right font-medium text-slate-700">{nutrient.name}</span>
                            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden" role="progressbar" aria-valuenow={nutrient.value} aria-valuemin={0} aria-valuemax={maxNutrientValue}>
                                <div
                                    className={`${nutrient.color} h-4 rounded-full transition-all duration-500 ease-out`}
                                    style={{ width: `${percentage}%` }}
                                    title={`${nutrient.name}: ${nutrient.originalValue}`}
                                ></div>
                            </div>
                            <span className="text-left font-semibold text-slate-800">{nutrient.originalValue}</span>
                            <div className="no-print">
                                <PinButton
                                    isPinned={isPinned(id)}
                                    onClick={() => handlePinToggle({
                                        id,
                                        type: 'nutrient',
                                        title: nutrient.name,
                                        content: nutrient.originalValue || '--'
                                    })}
                                    size="sm"
                                />
                            </div>
                        </div>
                    )
                })
            ) : (
                <p className="text-center text-slate-500 py-4">تفاصيل المغذيات غير متوفرة.</p>
            )}
        </div>

        <p className="text-sm text-slate-500 mt-4">
            <span className="font-semibold text-slate-600">مصدر البيانات:</span> {nutritionalInfo?.السعرات_الحرارية_الإجمالية?.مصدر_البيانات ?? 'غير محدد'}
            <br />
            <span className="font-semibold text-slate-600">ملاحظات:</span> {nutritionalInfo?.ملاحظات_غذائية ?? 'لا يوجد'}
        </p>
      </section>

      <section className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-slate-200 print-section">
        <h3 className="text-xl font-semibold mb-4 border-b-2 border-slate-300 pb-2">تحليل المكونات المفصل</h3>
        {ايجابية.length > 0 && (
            <Accordion title="مكونات إيجابية" count={ايجابية.length} colorClasses={{ bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-900', ring: 'focus:ring-emerald-400' }}>
                 {ايجابية.map((ing, i) => {
                    const id = `ingredient-pos-${ing.الاسم_العربي.replace(/\s/g, '-')}-${i}`;
                    return <IngredientCard key={id} ingredient={ing} isPinned={isPinned(id)} onPinToggle={() => handlePinToggle({ id, type: 'ingredient', title: ing.الاسم_العربي, content: <StatusBadge status={ing.الحالة_الشرعية} /> })} />
                 })}
            </Accordion>
        )}
        {سلبية.length > 0 && (
             <Accordion title="مكونات سلبية وتحذيرات" count={سلبية.length} colorClasses={{ bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-900', ring: 'focus:ring-red-400' }}>
                 {سلبية.map((ing, i) => {
                    const id = `ingredient-neg-${ing.الاسم_العربي.replace(/\s/g, '-')}-${i}`;
                    return <IngredientCard key={id} ingredient={ing} isPinned={isPinned(id)} onPinToggle={() => handlePinToggle({ id, type: 'ingredient', title: ing.الاسم_العربي, content: <StatusBadge status={ing.الحالة_الشرعية} /> })} />
                 })}
            </Accordion>
        )}
        {مشكوك_فيها.length > 0 && (
             <Accordion title="مكونات مشكوك فيها" count={مشكوك_فيها.length} colorClasses={{ bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-900', ring: 'focus:ring-amber-400' }}>
                 {مشكوك_فيها.map((ing, i) => {
                    const id = `ingredient-doubt-${ing.الاسم_العربي.replace(/\s/g, '-')}-${i}`;
                    return <IngredientCard key={id} ingredient={ing} isPinned={isPinned(id)} onPinToggle={() => handlePinToggle({ id, type: 'ingredient', title: ing.الاسم_العربي, content: <StatusBadge status={ing.الحالة_الشرعية} /> })} />
                 })}
            </Accordion>
        )}
      </section>

       <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-slate-200 print-section">
                <div className="flex items-center justify-between mb-2 border-b-2 border-slate-300 pb-2">
                    <h3 className="text-xl font-semibold">تقييم الممارسات التسويقية</h3>
                     <div className="no-print">
                        <PinButton
                            isPinned={isPinned('marketing')}
                            onClick={() => handlePinToggle({
                                id: 'marketing',
                                type: 'marketing',
                                title: 'التسويق',
                                content: report.تقييم_الممارسات_التسويقية?.هل_يوجد_تضليل ? 'تضليل محتمل' : 'لا يوجد تضليل',
                            })}
                        />
                    </div>
                </div>
                <p className={`font-bold mb-2 ${report.تقييم_الممارسات_التسويقية?.هل_يوجد_تضليل ? 'text-red-600' : 'text-emerald-600'}`}>
                    {report.تقييم_الممارسات_التسويقية?.هل_يوجد_تضليل ? 'يوجد تضليل محتمل' : 'لا يوجد تضليل واضح'}
                </p>
                <p className="text-slate-700">{report.تقييم_الممارسات_التسويقية?.الوصف_والتحليل ?? 'غير متوفر'}</p>
            </section>
            <section className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-slate-200 print-section">
                <div className="flex items-center justify-between mb-2 border-b-2 border-slate-300 pb-2">
                    <h3 className="text-xl font-semibold">التوصيات النهائية للمجلس</h3>
                     <div className="no-print">
                        <PinButton
                            isPinned={isPinned('recommendations')}
                            onClick={() => handlePinToggle({
                                id: 'recommendations',
                                type: 'recommendation',
                                title: 'التوصيات',
                                content: report.التوصيات_النهائية_للمجلس?.substring(0, 50) + '...',
                            })}
                        />
                    </div>
                </div>
                <p className="text-slate-700">{report.التوصيات_النهائية_للمجلس ?? 'غير متوفر'}</p>
            </section>
       </div>

        {pinnedItems.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 no-print" style={{'--safe-area-inset-bottom': 'env(safe-area-inset-bottom, 0px)'}}>
                <div className="max-w-4xl mx-auto bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-3 transform transition-transform duration-300 ease-out animate-slide-up">
                    <h4 className="text-white font-bold mb-2 px-2 text-sm">📌 العناصر المثبتة</h4>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {pinnedItems.map(item => (
                            <div key={item.id} className="bg-slate-700 text-white rounded-lg p-2 flex items-center gap-2 shrink-0">
                                <div className="text-xs">
                                    <div className="font-bold opacity-90">{item.title}</div>
                                    <div className="opacity-70">{item.content}</div>
                                </div>
                                <button onClick={() => handlePinToggle(item)} className="p-1 rounded-full bg-slate-600/70 hover:bg-slate-500/80">
                                    <CloseIconSmall className="w-3 h-3 text-white/80" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <style>{`
                    @keyframes slide-up {
                        from { transform: translateY(100%); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
                `}</style>
            </div>
        )}
    </div>
  );
};

export default ResultsDisplay;
