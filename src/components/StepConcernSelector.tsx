import React from 'react';
import { HealthConcernId } from '../types';
import { getLocalizedConcerns } from '../data/articles';
import { useLanguage } from '../context/LanguageContext';
import {
  HeartHandshake,
  Wind,
  AlertCircle,
  Droplet,
  Thermometer,
  Apple,
  Check,
  SlidersHorizontal,
} from 'lucide-react';

interface StepConcernSelectorProps {
  selectedConcerns: HealthConcernId[];
  onToggleConcern: (concernId: HealthConcernId) => void;
  onSelectAllConcerns: () => void;
  onResetToGeneral: () => void;
  isSpecificIllnessMode: boolean;
  setIsSpecificIllnessMode: (mode: boolean) => void;
}

export const StepConcernSelector: React.FC<StepConcernSelectorProps> = ({
  selectedConcerns,
  onToggleConcern,
  onSelectAllConcerns,
  onResetToGeneral,
  isSpecificIllnessMode,
  setIsSpecificIllnessMode,
}) => {
  const { language, t } = useLanguage();
  const localizedConcerns = getLocalizedConcerns(language);

  const getConcernIcon = (iconName: string, isSelected: boolean) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className={`w-4 h-4 ${isSelected ? 'text-teal-700' : 'text-teal-600'}`} />;
      case 'Wind':
        return <Wind className={`w-4 h-4 ${isSelected ? 'text-sky-700' : 'text-sky-600'}`} />;
      case 'AlertCircle':
        return <AlertCircle className={`w-4 h-4 ${isSelected ? 'text-rose-700' : 'text-rose-600'}`} />;
      case 'Droplet':
        return <Droplet className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-emerald-600'}`} />;
      case 'Thermometer':
        return <Thermometer className={`w-4 h-4 ${isSelected ? 'text-amber-700' : 'text-amber-600'}`} />;
      case 'Apple':
        return <Apple className={`w-4 h-4 ${isSelected ? 'text-green-700' : 'text-green-600'}`} />;
      default:
        return <HeartHandshake className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
            {t.step3Badge}
          </span>
          <h2 className="text-lg font-bold text-slate-900 font-heading">
            {t.step3Title}
          </h2>
        </div>

        {/* Mode switcher: Optional / General Wellness vs Specific Filter */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium border border-slate-200">
            <button
              onClick={() => {
                setIsSpecificIllnessMode(false);
                onResetToGeneral();
              }}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                !isSpecificIllnessMode
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.step3ModeGeneral}
            </button>
            <button
              onClick={() => {
                setIsSpecificIllnessMode(true);
              }}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                isSpecificIllnessMode
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3 text-teal-600" />
              <span>{t.step3ModeSpecific}</span>
            </button>
          </div>

          {isSpecificIllnessMode && (
            <button
              onClick={onSelectAllConcerns}
              className="text-xs text-slate-500 hover:text-teal-700 underline px-1 transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.step3SelectAll}
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        {isSpecificIllnessMode
          ? t.step3SubtextSpecific
          : t.step3SubtextGeneral}
      </p>

      {/* Multi-select Concern Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {localizedConcerns.map((concern) => {
          const isSelected = selectedConcerns.includes(concern.id);
          return (
            <button
              key={concern.id}
              onClick={() => {
                if (!isSpecificIllnessMode && concern.id !== 'general-wellness') {
                  setIsSpecificIllnessMode(true);
                }
                onToggleConcern(concern.id);
              }}
              className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 group focus:outline-hidden cursor-pointer ${
                isSelected
                  ? 'bg-teal-50/60 border-teal-600 ring-1 ring-teal-600/30'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }`}
              >
                {isSelected ? <Check className="w-4 h-4 text-white stroke-[2.5]" /> : getConcernIcon(concern.iconName, false)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm font-bold text-slate-900 truncate font-heading">
                    {concern.label}
                  </span>
                  {concern.isIllnessOrAllergy && (
                    <span className="text-[10px] text-slate-500 font-medium">
                      {language === 'hi' ? 'स्वास्थ्य स्थिति' : 'Condition'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                  {concern.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
