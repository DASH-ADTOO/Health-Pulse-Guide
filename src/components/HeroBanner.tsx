import React from 'react';
import { AgeGroupId, SeasonId, FamilyProfile } from '../types';
import { getLocalizedSeasons, getLocalizedPresets } from '../data/articles';
import { ShieldCheck, Sparkles, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroBannerProps {
  selectedSeason: SeasonId;
  selectedAge: AgeGroupId;
  onSelectPreset: (preset: FamilyProfile) => void;
  activePresetId: string | null;
  onClearFilters: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  selectedSeason,
  onSelectPreset,
  activePresetId,
  onClearFilters,
}) => {
  const { language, t } = useLanguage();
  const localizedSeasons = getLocalizedSeasons(language);
  const localizedPresets = getLocalizedPresets(language);
  const currentSeasonInfo = localizedSeasons.find((s) => s.id === selectedSeason) || localizedSeasons[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-900/5 via-slate-50 to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Reassuring Clinical Headline & Family Presets */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>{t.heroTag}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 font-normal">
                {t.heroYearBadge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-heading leading-tight" style={{ textWrap: 'balance' }}>
              {t.heroTitle1}{' '}
              <span className="text-teal-700">{t.heroTitle2}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Quick Family Presets Segmented Bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-600" />
                  <span>{t.heroQuickProfiles}</span>
                </span>
                {activePresetId && (
                  <button
                    onClick={onClearFilters}
                    className="text-xs text-slate-500 hover:text-teal-700 underline transition-colors cursor-pointer"
                  >
                    {t.heroResetToAll}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {localizedPresets.map((preset) => {
                  const isActive = activePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => onSelectPreset(preset)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border whitespace-nowrap text-left cursor-pointer ${
                        isActive
                          ? 'bg-teal-700 text-white border-teal-700 shadow-xs ring-2 ring-teal-600/30'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50/50'
                      }`}
                    >
                      <span className="font-semibold">{preset.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Photo with Soft Medical Vignette */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white">
              <img
                src="/src/assets/images/hero_healthpulse_1793205877436.jpg"
                alt="Pediatrician consulting with caring mother and child in modern sunlit clinic"
                className="w-full h-56 sm:h-64 lg:h-72 object-cover object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-teal-200 mb-1">
                  <ShieldCheck className="w-4 h-4 text-teal-300" />
                  <span>{t.heroReviewedByPeds}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 font-normal leading-snug">
                  {t.heroPedsTrustCopy}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal Advisory Strip */}
        <div className="mt-8 rounded-xl bg-teal-50 border border-teal-200/80 p-4 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-teal-950 block sm:inline mr-2">
                {t.heroSeasonAdvisoryPrefix} ({currentSeasonInfo.label}):
              </span>
              <span className="text-teal-900 leading-relaxed">
                {currentSeasonInfo.bannerTip}
              </span>
            </div>
          </div>
          <div className="text-xs font-semibold text-teal-800 whitespace-nowrap self-end sm:self-center shrink-0">
            {currentSeasonInfo.climateTag}
          </div>
        </div>
      </div>
    </section>
  );
};
