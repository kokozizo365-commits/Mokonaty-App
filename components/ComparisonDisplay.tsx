import React from 'react';
import type { FullReport, ComparisonResult, AnalysisReport, ProfileCompatibility } from '../types';

// --- Icons ---
const RecommendationIcon: React.FC = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>);
const UpArrowIcon: React.FC = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>);
const DownArrowIcon: React.FC = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>);
const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
);
const PrintIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
);
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
const CompatibleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>);
const NotCompatibleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>);
const MaybeCompatibleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>);

interface ComparisonDisplayProps {
  reportA: FullReport;
  reportB: FullReport;
  comparisonResult: ComparisonResult;
}

const parseNumericValue = (value: string): number => {
    if (typeof value !== 'string') return 0;
    return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
}

const ComparisonRow: React.FC<{
    label: string, 
    valueA: string, 
    valueB: string,
    lowerIsBetter?: boolean,
    highlight?: boolean
}> = ({ label, valueA, valueB, lowerIsBetter = false, highlight = false }) => {
    const numA = parseNumericValue(valueA);
    const numB = parseNumericValue(valueB);
    let aClass = 'text-slate-800';
    let bClass = 'text-slate-800';

    if (numA !== numB) {
        if ((numA < numB && lowerIsBetter) || (numA > numB && !lowerIsBetter)) {
            aClass = 'text-emerald-600 font-bold';
            bClass = 'text-red-600';
        } else {
            bClass = 'text-emerald-600 font-bold';
            aClass = 'text-red-600';
        }
    }
    
    const indicator = (val1: number, val2: number, lowerBetter: boolean) => {
        if (val1 === val2) return null;
        const isBetter = lowerBetter ? val1 < val2 : val1 > val2;
        return isBetter ? 
            <span title="الأفضل" className="text-emerald-500">{lowerBetter ? <DownArrowIcon/> : <UpArrowIcon/>}</span> :
            <span title="الأقل تفضيلاً" className="text-red-500">{lowerBetter ? <UpArrowIcon/> : <DownArrowIcon/>}</span>;
    }

    return (
        <div className={`grid grid-cols-3 items-center text-center py-3 ${highlight ? 'bg-cyan-50 rounded-lg' : 'border-b border-slate-200'}`}>
            <div className={`font-semibold text-slate-700 text-sm md:text-base ${aClass} flex items-center justify-center gap-1`}>{valueA} {indicator(numA, numB, lowerIsBetter)}</div>
            <div className="font-bold text-slate-900 text-sm md:text-base">{label}</div>
            <div className={`font-semibold text-slate-700 text-sm md:text-base ${bClass} flex items-center justify-center gap-1`}>{valueB} {indicator(numB, numA, lowerIsBetter)}</div>
        </div>
    );
};

const CompatibilityBadge: React.FC<{ compatibility: ProfileCompatibility }> = ({ compatibility }) => {
    const configMap = {
        'متوافق': { Icon: CompatibleIcon, bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-700', title: 'متوافق' },
        'غير متوافق': { Icon: NotCompatibleIcon, bgColor: 'bg-red-50', borderColor: 'border-red-200', textColor: 'text-red-700', title: 'غير متوافق' },
        'قد لا يكون متوافقاً': { Icon: MaybeCompatibleIcon, bgColor: 'bg-amber-50', borderColor: 'border-amber-200', textColor: 'text-amber-700', title: 'مشكوك فيه' }
    };
    const config = configMap[compatibility.الحالة];
    if (!config) return null;
  
    return (
      <div className={`flex items-center justify-center gap-2 p-2 rounded-lg text-sm border ${config.bgColor} ${config.borderColor} ${config.textColor}`} title={compatibility.السبب}>
        <config.Icon className="w-5 h-5 shrink-0" />
        <span className="font-semibold">{config.title}</span>
      </div>
    );
};

const ProductColumn: React.FC<{report: AnalysisReport, title: string}> = ({ report, title }) => {
    const { ايجابية = [], سلبية = [], مشكوك_فيها = [] } = report.المكونات_المفصلة ?? {};
    const christianFastingStatus = report.الحالة_حسب_الديانة_المسيحية;
    const compatibility = report.تقييم_التوافق_مع_الملف_الشخصي;

    const allIngredients = [...ايجابية, ...سلبية, ...مشكوك_فيها];
    let overallHalalStatus: 'حلال بشكل عام' | 'يحتوي على مكونات محرمة' | 'يحتوي على مكونات مشكوك فيها' = 'حلال بشكل عام';
    let HalalStatusIcon = HalalIcon;
    let halalColor = 'text-emerald-600';

    if (allIngredients.some(ing => ing.الحالة_الشرعية === 'حرام')) {
        overallHalalStatus = 'يحتوي على مكونات محرمة';
        HalalStatusIcon = HaramIcon;
        halalColor = 'text-red-600';
    } else if (allIngredients.some(ing => ing.الحالة_الشرعية === 'مشكوك فيه')) {
        overallHalalStatus = 'يحتوي على مكونات مشكوك فيها';
        HalalStatusIcon = DoubtfulIcon;
        halalColor = 'text-amber-600';
    }

    const renderChristianFastingStatusCard = () => {
        if (!christianFastingStatus) return <div className="hidden sm:block"></div>;

        const { الحالة } = christianFastingStatus;
        let StatusIcon = DoubtfulIcon;
        let statusColor = 'text-amber-600';
        let statusText: string = الحالة;

        if (الحالة === 'صيامي') {
            StatusIcon = SiyamiIcon;
            statusColor = 'text-emerald-600';
            statusText = 'مناسب للصيام';
        } else if (الحالة === 'فطاري') {
            StatusIcon = HaramIcon;
            statusColor = 'text-red-600';
            statusText = 'غير مناسب للصيام';
        }
        
        return (
            <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-200 print-card h-full flex flex-col justify-center">
                <StatusIcon className={`w-8 h-8 mx-auto ${statusColor}`} />
                <h4 className={`font-bold text-md mt-1 ${statusColor}`}>{statusText}</h4>
                <p className="text-sm text-slate-600">حالة الصيام المسيحي</p>
            </div>
        );
    };

    return (
        <div className="bg-white/70 backdrop-blur-lg p-4 md:p-6 rounded-xl shadow-lg border border-slate-200 print-section space-y-4 flex flex-col">
             <h3 className="text-xl md:text-2xl font-bold text-center text-blue-600">{report.اسم_المنتج ?? 'اسم المنتج غير متوفر'}</h3>
             
             {compatibility && <CompatibilityBadge compatibility={compatibility} />}

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-200 print-card h-full flex flex-col justify-center">
                    <HalalStatusIcon className={`w-8 h-8 mx-auto ${halalColor}`} />
                    <h4 className={`font-bold text-md mt-1 ${halalColor}`}>{overallHalalStatus}</h4>
                    <p className="text-sm text-slate-600">الحالة الشرعية</p>
                </div>
                {renderChristianFastingStatusCard()}
             </div>

             <div className="grid grid-cols-3 gap-2 text-center border-t border-b border-slate-200 py-3">
                <div>
                    <p className="font-bold text-lg text-emerald-600">{ايجابية.length}</p>
                    <p className="text-sm text-slate-600">مكونات إيجابية</p>
                </div>
                <div>
                    <p className="font-bold text-lg text-red-600">{سلبية.length}</p>
                    <p className="text-sm text-slate-600">مكونات سلبية</p>
                </div>
                <div>
                    <p className="font-bold text-lg text-amber-600">{مشكوك_فيها.length}</p>
                    <p className="text-sm text-slate-600">مكونات مشكوك فيها</p>
                </div>
             </div>
             
             <div className="flex-grow">
                <h4 className="font-bold text-center mb-2">ملخص تنفيذي</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{report.ملخص_تنفيذي ?? 'الملخص غير متوفر.'}</p>
             </div>
        </div>
    );
}

const ComparisonDisplay: React.FC<ComparisonDisplayProps> = ({ reportA, reportB, comparisonResult }) => {
    const rA = reportA.تقرير_المجلس_العلمي_للكيمياء_الغذائية;
    const rB = reportB.تقرير_المجلس_العلمي_للكيمياء_الغذائية;
    const recommendedProductReport = comparisonResult.recommendedProduct === 'A' ? rA : (comparisonResult.recommendedProduct === 'B' ? rB : null);
    
    const handleShare = async () => {
        const recommendedProductName = recommendedProductReport ? recommendedProductReport.اسم_المنتج : 'لا يوجد منتج موصى به';
        const shareText = `مقارنة بين ${rA.اسم_المنتج} و ${rB.اسم_المنتج}:\n\nالتوصية: ${recommendedProductName}\nالسبب: ${comparisonResult.recommendationReason}\n\nملخص: ${comparisonResult.comparisonSummary}`;

        const shareData = {
            title: `مقارنة المنتجات: ${rA.اسم_المنتج} مقابل ${rB.اسم_المنتج}`,
            text: shareText,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareText);
                alert('تم نسخ ملخص المقارنة إلى الحافظة!');
            }
        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') { return; }
            console.error("Error sharing:", err);
            alert("حدث خطأ أثناء محاولة المشاركة.");
        }
    };


    return (
        <div className="space-y-8 mt-8 text-slate-800">
            {/* Recommendation Section */}
            <section className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white p-6 rounded-2xl shadow-2xl print-section print-recommendation">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 p-2 rounded-full"><RecommendationIcon /></div>
                    <h2 className="text-2xl font-bold">الخيار الموصى به لتحسين جودة الحياة</h2>
                </div>
                {recommendedProductReport ? (
                     <h3 className="text-3xl font-extrabold mb-2"> {recommendedProductReport.اسم_المنتج}</h3>
                ) : (
                     <h3 className="text-3xl font-extrabold mb-2">لا يوجد منتج موصى به</h3>
                )}
                <p className="leading-relaxed font-medium">{comparisonResult.recommendationReason}</p>
            </section>
            
            {/* Comparison Section */}
            <section className="bg-white/70 backdrop-blur-lg p-4 md:p-6 rounded-xl shadow-lg border border-slate-200 print-section">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-600">{rA?.اسم_المنتج ?? 'منتج أ'}</h3>
                    <span className="text-xl font-bold text-slate-500">مقابل</span>
                    <h3 className="text-xl md:text-2xl font-bold text-blue-600">{rB?.اسم_المنتج ?? 'منتج ب'}</h3>
                </div>
                <div className="space-y-2">
                    <ComparisonRow label="🔥 السعرات الحرارية" valueA={rA?.المعلومات_الغذائية_لكل_حصة?.السعرات_الحرارية_الإجمالية?.القيمة_بالكالوري ?? '--'} valueB={rB?.المعلومات_الغذائية_لكل_حصة?.السعرات_الحرارية_الإجمالية?.القيمة_بالكالوري ?? '--'} lowerIsBetter highlight/>
                    <ComparisonRow label="💪 البروتين (جم)" valueA={rA?.المعلومات_الغذائية_لكل_حصة?.المغذيات_الكبرى?.البروتين_بالجرام ?? '--'} valueB={rB?.المعلومات_الغذائية_لكل_حصة?.المغذيات_الكبرى?.البروتين_بالجرام ?? '--'} />
                    <ComparisonRow label="💧 الدهون (جم)" valueA={rA?.المعلومات_الغذائية_لكل_حصة?.المغذيات_الكبرى?.الدهون_الكلي_بالجرام ?? '--'} valueB={rB?.المعلومات_الغذائية_لكل_حصة?.المغذيات_الكبرى?.الدهون_الكلي_بالجرام ?? '--'} lowerIsBetter/>
                    <ComparisonRow label="🍞 الكربوهيدرات (جم)" valueA={rA?.المعلومات_الغذائية_لكل_حصة?.المغذيات_الكبرى?.الكربوهيدرات_الكلي_بالجرام ?? '--'} valueB={rB?.المعلومات_الغذائية_لكل_حصة?.المغذيات_الكبرى?.الكربوهيدرات_الكلي_بالجرام ?? '--'} lowerIsBetter/>
                    <ComparisonRow label="🍬 السكريات (جم)" valueA={rA?.المعلومات_الغذائية_لكل_حصة?.المغذيات_الكبرى?.السكريات_بالجرام ?? '--'} valueB={rB?.المعلومات_الغذائية_لكل_حصة?.المغذيات_الكبرى?.السكريات_بالجرام ?? '--'} lowerIsBetter highlight/>
                    <ComparisonRow label="🌾 الألياف (جم)" valueA={rA?.المعلومات_الغذائية_لكل_حصة?.المغذيات_الكبرى?.الألياف_بالجرام ?? '--'} valueB={rB?.المعلومات_الغذائية_لكل_حصة?.المغذيات_الكبرى?.الألياف_بالجرام ?? '--'} />
                </div>
            </section>

            {/* AI Summary */}
            <section className="bg-white/70 backdrop-blur-lg p-4 md:p-6 rounded-xl shadow-lg border border-slate-200 print-section">
                <h3 className="text-xl font-semibold mb-2 border-b-2 border-slate-300 pb-2">
                    ملخص مقارنة الذكاء الاصطناعي
                </h3>
                <p className="text-slate-700 leading-relaxed">{comparisonResult.comparisonSummary}</p>
            </section>

            {/* Detailed Columns */}
            <div className="grid md:grid-cols-2 gap-8 print-comparison-grid">
                {rA && <ProductColumn report={rA} title="المنتج أ" />}
                {rB && <ProductColumn report={rB} title="المنتج ب" />}
            </div>
             <div className="flex gap-4 justify-center mt-8 no-print">
                 <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-cyan-800 font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                    <ShareIcon className="w-5 h-5"/>
                    مشاركة المقارنة
                </button>
                <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
                >
                    <PrintIcon className="w-5 h-5"/>
                    طباعة / حفظ PDF
                </button>
            </div>
        </div>
    );
};

export default ComparisonDisplay;
