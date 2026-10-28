import React from 'react';
import { DietaryPreference } from '../types';
import { Leaf, Utensils, Drumstick } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DietaryToggleBarProps {
  diet: DietaryPreference;
  onSelectDiet: (diet: DietaryPreference) => void;
}

export const DietaryToggleBar: React.FC<DietaryToggleBarProps> = ({
  diet,
  onSelectDiet,
}) => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-2xs">
          <Utensils className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900 font-heading flex items-center gap-2">
            <span>{language === 'hi' ? 'आहार एवं पोषण प्राथमिकता' : 'Dietary & Nutritional Preference'}</span>
            <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.2 rounded-full">
              {language === 'hi' ? 'फ़िल्टर' : 'Filter'}
            </span>
          </div>
          <p className="text-[11px] text-slate-600">
            {language === 'hi'
              ? 'रोग प्रतिरोधक क्षमता, प्रोटीन और पुनर्प्राप्ति आहार को अपनी पारिवारिक जीवनशैली के अनुसार अनुकूलित करें।'
              : "Tailor immune nutrition, anti-inflammatory proteins, and recovery broths to your family's diet."}
          </p>
        </div>
      </div>

      {/* Segmented Control Buttons */}
      <div className="flex items-center gap-1.5 bg-white/90 p-1 rounded-xl border border-emerald-200 shadow-2xs self-stretch sm:self-auto">
        <button
          onClick={() => onSelectDiet('all')}
          className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            diet === 'all'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Utensils className="w-3.5 h-3.5 text-slate-400" />
          <span>{language === 'hi' ? 'सभी आहार' : 'All Lifestyles'}</span>
        </button>

        <button
          onClick={() => onSelectDiet('vegetarian')}
          className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            diet === 'vegetarian'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'text-emerald-900 hover:bg-emerald-100/60'
          }`}
        >
          <Leaf className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'शाकाहारी (Veg)' : 'Vegetarian'}</span>
        </button>

        <button
          onClick={() => onSelectDiet('non-vegetarian')}
          className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            diet === 'non-vegetarian'
              ? 'bg-amber-800 text-white shadow-2xs'
              : 'text-amber-950 hover:bg-amber-100/60'
          }`}
        >
          <Drumstick className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'मांसाहारी / मिश्रित' : 'Non-Vegetarian'}</span>
        </button>
      </div>
    </div>
  );
};
