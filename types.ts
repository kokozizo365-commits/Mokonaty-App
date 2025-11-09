// FIX: Add React import to use React.ReactNode type.
import React from 'react';

export interface Ingredient {
  الاسم_العربي: string;
  الاسم_العلمي: string;
  التحليل_العلمي_والفوائد?: string;
  التحليل_العلمي_والأضرار?: string;
  الشك_العلمي_أو_الشرعي?: string;
  الحالة_الشرعية: 'حلال' | 'حرام' | 'مشكوك فيه';
  ملاحظات_شرعية_وفقهية: string;
  مصدر_المعلومة: string[];
}

export interface DetailedIngredients {
  ايجابية: Ingredient[];
  سلبية: Ingredient[];
  مشكوك_فيها: Ingredient[];
}

export interface NutritionalInfo {
  حجم_الحصة_المقترح: string;
  السعرات_الحرارية_الإجمالية: {
    القيمة_بالكالوري: string;
    مصدر_البيانات: string;
  };
  المغذيات_الكبرى: {
    البروتين_بالجرام: string;
    الدهون_الكلي_بالجرام: string;
    الكربوهيدرات_الكلي_بالجرام: string;
    السكريات_بالجرام: string;
    الألياف_بالجرام: string;
  };
  ملاحظات_غذائية: string;
}

export interface MarketingPractices {
  هل_يوجد_تضليل: boolean;
  الوصف_والتحليل: string;
}

export interface ChristianFastingStatus {
  الحالة: 'صيامي' | 'فطاري' | 'مشكوك فيه';
  ملاحظات: string;
}

export interface ProfileCompatibility {
  الحالة: 'متوافق' | 'غير متوافق' | 'قد لا يكون متوافقاً';
  السبب: string;
}

export interface AnalysisReport {
  اسم_المنتج: string;
  تاريخ_التحليل: string;
  تاريخ_الصلاحية?: string;
  ملخص_تنفيذي: string;
  المعلومات_الغذائية_لكل_حصة: NutritionalInfo;
  تقييم_التوافق_مع_الملف_الشخصي?: ProfileCompatibility;
  الحالة_حسب_الديانة_المسيحية?: ChristianFastingStatus;
  تقييم_الممارسات_التسويقية: MarketingPractices;
  المكونات_المفصلة: DetailedIngredients;
  التوصيات_النهائية_للمجلس: string;
}

export interface FullReport {
  تقرير_المجلس_العلمي_للكيمياء_الغذائية: AnalysisReport;
}

export interface ComparisonResult {
  comparisonSummary: string;
  recommendedProduct: 'A' | 'B' | 'None';
  recommendationReason: string;
}

export interface ProductState {
  file: File | null;
  previewUrl: string | null;
  report: FullReport | null;
}

export interface DietaryProfile {
  preferences: string[];
  allergies: string;
}

export interface PinnedItem {
  id: string;
  type: 'ingredient' | 'nutrient' | 'summary' | 'recommendation' | 'status' | 'marketing';
  title: string;
  content: string | React.ReactNode;
}
