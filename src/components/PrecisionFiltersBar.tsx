import React from 'react';
import {
  EnvironmentSettingId,
  SymptomStageId,
  TriggerTypeId,
  PerspectiveId,
} from '../types';
import {
  getLocalizedSettings,
  getLocalizedStages,
  getLocalizedTriggers,
  getLocalizedPerspectives,
} from '../data/articles';
import { useLanguage } from '../context/LanguageContext';
import {
  Building2,
  Activity,
  Zap,
  UserCheck,
  RotateCcw,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface PrecisionFiltersBarProps {
  setting: EnvironmentSettingId;
  onSelectSetting: (setting: EnvironmentSettingId) => void;
  symptomStage: SymptomStageId;
  onSelectStage: (stage: SymptomStageId) => void;
  triggerType: TriggerTypeId;
  onSelectTrigger: (trigger: TriggerTypeId) => void;
  perspective: PerspectiveId;
  onSelectPerspective: (perspective: PerspectiveId) => void;
  onResetPrecision: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const PrecisionFiltersBar: React.FC<PrecisionFiltersBarProps> = ({
  setting,
  onSelectSetting,
  symptomStage,
  onSelectStage,
  triggerType,
  onSelectTrigger,
  perspective,
  onSelectPerspective,
  onResetPrecision,
  isOpen,
  onToggleOpen,
}) => {
  const { language, t } = useLanguage();

  const settingsOptions = getLocalizedSettings(language);
  const stagesOptions = getLocalizedStages(language);
  const triggersOptions = getLocalizedTriggers(language);
  const perspectivesOptions = getLocalizedPerspectives(language);

  const hasActivePrecision =
    setting !== 'all' ||
    symptomStage !== 'all' ||
    triggerType !== 'all' ||
    perspective !== 'all';

  return (
    <div className="bg-slate-50/80 rounded-2xl border border-slate-200 overflow-hidden transition-all">
      {/* Header bar that toggles precision filters */}
      <button
        onClick={onToggleOpen}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors focus:outline-hidden cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-2xs">
            <Sliders className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 font-heading flex items-center gap-2">
              <span>{t.filtersLabel}</span>
              {hasActivePrecision && (
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              )}
            </div>
            <span className="text-[11px] text-slate-500">
              {t.filtersSubtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {hasActivePrecision && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onResetPrecision();
              }}
              className="text-xs text-teal-800 hover:text-teal-950 font-medium underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.filtersReset}</span>
            </button>
          )}

          <div className="p-1 rounded-md bg-white border border-slate-200 text-slate-600">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Expanded Filter Controls */}
      {isOpen && (
        <div className="p-5 pt-2 border-t border-slate-200 bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* 1. Setting / Environment */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <Building2 className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.filterEnvLabel}</span>
            </label>
            <select
              value={setting}
              onChange={(e) => onSelectSetting(e.target.value as EnvironmentSettingId)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 cursor-pointer"
            >
              {settingsOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400">
              {t.filterEnvTip}
            </p>
          </div>

          {/* 2. Symptom Stage */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.filterStageLabel}</span>
            </label>
            <select
              value={symptomStage}
              onChange={(e) => onSelectStage(e.target.value as SymptomStageId)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 cursor-pointer"
            >
              {stagesOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400">
              {t.filterStageTip}
            </p>
          </div>

          {/* 3. Trigger Type */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.filterTriggerLabel}</span>
            </label>
            <select
              value={triggerType}
              onChange={(e) => onSelectTrigger(e.target.value as TriggerTypeId)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 cursor-pointer"
            >
              {triggersOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400">
              {t.filterTriggerTip}
            </p>
          </div>

          {/* 4. Reader Perspective */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <UserCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>{t.filterRoleLabel}</span>
            </label>
            <select
              value={perspective}
              onChange={(e) => onSelectPerspective(e.target.value as PerspectiveId)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 cursor-pointer"
            >
              {perspectivesOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400">
              {t.filterRoleTip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
