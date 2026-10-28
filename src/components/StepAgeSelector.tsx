import React from 'react';
import { AgeGroupId } from '../types';
import { getLocalizedAgeGroups } from '../data/articles';
import { useLanguage } from '../context/LanguageContext';
import {
  Smile,
  Compass,
  Sparkles,
  GraduationCap,
  Baby,
  Users,
  HeartPulse,
  Check,
} from 'lucide-react';

interface StepAgeSelectorProps {
  selectedAge: AgeGroupId;
  onSelectAge: (age: AgeGroupId) => void;
}

export const StepAgeSelector: React.FC<StepAgeSelectorProps> = ({
  selectedAge,
  onSelectAge,
}) => {
  const { language, t } = useLanguage();
  const localizedAgeGroups = getLocalizedAgeGroups(language);

  const getIcon = (name: string, isSelected: boolean) => {
    switch (name) {
      case 'Smile':
        return <Smile className={`w-5 h-5 ${isSelected ? 'text-teal-700' : 'text-teal-600'}`} />;
      case 'Compass':
        return <Compass className={`w-5 h-5 ${isSelected ? 'text-blue-700' : 'text-blue-600'}`} />;
      case 'Sparkles':
        return <Sparkles className={`w-5 h-5 ${isSelected ? 'text-indigo-700' : 'text-indigo-600'}`} />;
      case 'GraduationCap':
        return <GraduationCap className={`w-5 h-5 ${isSelected ? 'text-purple-700' : 'text-purple-600'}`} />;
      case 'Baby':
        return <Baby className={`w-5 h-5 ${isSelected ? 'text-pink-700' : 'text-pink-600'}`} />;
      case 'Users':
        return <Users className={`w-5 h-5 ${isSelected ? 'text-amber-700' : 'text-amber-600'}`} />;
      case 'HeartPulse':
        return <HeartPulse className={`w-5 h-5 ${isSelected ? 'text-emerald-700' : 'text-emerald-600'}`} />;
      default:
        return <Users className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
            {t.step1Badge}
          </span>
          <h2 className="text-lg font-bold text-slate-900 font-heading">
            {t.step1Title}
          </h2>
        </div>
        <button
          onClick={() => onSelectAge('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border cursor-pointer ${
            selectedAge === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {t.labelAllAges}
        </button>
      </div>

      {/* Grid of 7 Age Brackets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {localizedAgeGroups.map((group) => {
          const isSelected = selectedAge === group.id;
          return (
            <button
              key={group.id}
              onClick={() => onSelectAge(group.id)}
              className={`relative text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between group focus:outline-hidden cursor-pointer ${
                isSelected
                  ? 'bg-white border-teal-600 shadow-sm ring-2 ring-teal-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-teal-50' : 'bg-slate-100 group-hover:bg-slate-200/70'
                    }`}
                  >
                    {getIcon(group.iconName, isSelected)}
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-teal-600 text-white' : 'text-slate-600 bg-slate-100'
                    }`}
                  >
                    {group.category.split(' ')[0]}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900 font-heading">
                  {group.label}
                </div>
                <div className="text-[11px] font-medium text-teal-800 mt-0.5">
                  {group.category}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {group.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span className="truncate">{group.focusHighlights[0]}</span>
                {isSelected && (
                  <span className="text-teal-700 font-bold flex items-center shrink-0 ml-1">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
