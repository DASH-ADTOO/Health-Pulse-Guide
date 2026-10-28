import React from 'react';
import { SeasonId } from '../types';
import { getLocalizedSeasons } from '../data/articles';
import { useLanguage } from '../context/LanguageContext';
import { Flower2, Sun, CloudRain, Snowflake, Check, Globe } from 'lucide-react';

interface StepSeasonSelectorProps {
  selectedSeason: SeasonId;
  onSelectSeason: (season: SeasonId) => void;
}

export const StepSeasonSelector: React.FC<StepSeasonSelectorProps> = ({
  selectedSeason,
  onSelectSeason,
}) => {
  const { language, t } = useLanguage();
  const localizedSeasons = getLocalizedSeasons(language);

  const getSeasonIcon = (name: string, isSelected: boolean) => {
    switch (name) {
      case 'Flower2':
        return <Flower2 className={`w-5 h-5 ${isSelected ? 'text-emerald-700' : 'text-emerald-600'}`} />;
      case 'Sun':
        return <Sun className={`w-5 h-5 ${isSelected ? 'text-amber-700' : 'text-amber-600'}`} />;
      case 'CloudRain':
        return <CloudRain className={`w-5 h-5 ${isSelected ? 'text-sky-700' : 'text-sky-600'}`} />;
      case 'Snowflake':
        return <Snowflake className={`w-5 h-5 ${isSelected ? 'text-cyan-700' : 'text-cyan-600'}`} />;
      default:
        return <Globe className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
            {t.step2Badge}
          </span>
          <h2 className="text-lg font-bold text-slate-900 font-heading">
            {t.step2Title}
          </h2>
        </div>
        <button
          onClick={() => onSelectSeason('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border cursor-pointer ${
            selectedSeason === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {t.labelAllSeasons}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {localizedSeasons.map((season) => {
          const isSelected = selectedSeason === season.id;
          return (
            <button
              key={season.id}
              onClick={() => onSelectSeason(season.id)}
              className={`relative text-left p-4 rounded-xl border transition-all flex flex-col justify-between group focus:outline-hidden cursor-pointer ${
                isSelected
                  ? 'bg-white border-teal-600 shadow-sm ring-2 ring-teal-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-teal-50' : 'bg-slate-100 group-hover:bg-slate-200/70'
                  }`}>
                    {getSeasonIcon(season.iconName, isSelected)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {season.label}
                  </span>
                </div>

                <div className="text-base font-bold text-slate-900 font-heading">
                  {season.label}
                </div>
                <div className="text-xs font-semibold text-teal-800 mt-0.5">
                  {season.climateTag}
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {season.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate">{season.seasonalRisks[0]}</span>
                {isSelected && (
                  <span className="text-teal-700 font-semibold flex items-center gap-0.5 shrink-0 ml-1">
                    <Check className="w-3.5 h-3.5" />
                    {language === 'hi' ? 'चयनित' : 'Selected'}
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
