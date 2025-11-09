import React, { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
    message?: string;
}

const tips = [
  "هل تعلم أن العسل هو الغذاء الوحيد الذي لا يفسد أبداً؟",
  "يتم تحليل حوالي 1000 مكون جديد في صناعة مستحضرات التجميل كل عام.",
  "الجزر لم يكن لونه برتقالياً دائماً، كان في الأصل أرجوانياً أو أصفر.",
  "قراءة ملصق المكونات هي أقوى أداة لديك لاتخاذ خيارات صحية.",
  "الشوكولاتة كانت تستخدم كعملة من قبل حضارة الأزتيك.",
  "الذكاء الاصطناعي يساعد الآن في اكتشاف المكونات الضارة المحتملة بشكل أسرع.",
  "تتم معالجة بيانات صورتك بأمان تام ولا يتم تخزينها بعد التحليل.",
  "أحمر الشفاه كان يصنع قديماً من الحشرات المسحوقة.",
];


const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    // Set an initial tip immediately so the user sees one right away.
    setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);

    const intervalId = setInterval(() => {
      // Set a new random tip, ensuring it's different from the current one for a better UX.
      setCurrentTip(prevTip => {
        let newTip = prevTip;
        while (newTip === prevTip) {
          newTip = tips[Math.floor(Math.random() * tips.length)];
        }
        return newTip;
      });
    }, 4000); // Change tip every 4 seconds

    // Cleanup interval on component unmount to prevent memory leaks.
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-8 space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
      <p className="text-cyan-700 text-lg font-semibold">{message || '...جاري التحليل بإستخدام الذكاء الاصطناعي'}</p>
       {currentTip && (
         <div key={currentTip} className="text-center max-w-sm mt-2">
             <p className="text-slate-600 text-sm animate-fade-in">{currentTip}</p>
         </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
