import React from 'react';
import {
  Heart,
  Bookmark,
  AlertTriangle,
  BookOpen,
  ShieldAlert,
  Scale,
  Activity,
  Moon,
  Bot,
  Phone,
  Languages,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type NavTabType =
  | 'guides'
  | 'prevention'
  | 'bmi'
  | 'symptoms'
  | 'sleep'
  | 'companion'
  | 'glossary'
  | 'saved';

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  savedCount: number;
  onOpenEmergency: () => void;
  onOpenGlossary: () => void;
  onOpenHelplines: () => void;
  onOpenCompanionBot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenEmergency,
  onOpenGlossary,
  onOpenHelplines,
  onOpenCompanionBot,
}) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-6 h-16">
          {/* Zone 1: Wordmark */}
          <button
            onClick={() => setActiveTab('guides')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Heart className="w-5 h-5 fill-teal-100/20 text-white stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-heading block leading-none">
                {language === 'hi' ? 'हेल्थपल्स' : 'HealthPulse'}
                <span className="text-teal-600">{language === 'hi' ? 'गाइड' : 'Guide'}</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-tight block mt-0.5">
                {t.appTagline}
              </span>
            </div>
          </button>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'guides'
                  ? 'text-teal-900 bg-teal-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.navGuides}
            </button>

            <button
              onClick={() => setActiveTab('symptoms')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'symptoms'
                  ? 'text-teal-900 bg-teal-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.navSymptoms}</span>
            </button>

            <button
              onClick={() => setActiveTab('sleep')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'sleep'
                  ? 'text-indigo-900 bg-indigo-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.navSleep}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('companion');
                if (onOpenCompanionBot) onOpenCompanionBot();
              }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'companion'
                  ? 'text-teal-900 bg-teal-100/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.navCompanion}</span>
            </button>

            <button
              onClick={() => setActiveTab('bmi')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'bmi'
                  ? 'text-teal-900 bg-teal-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.navBmi}</span>
            </button>

            <button
              onClick={() => setActiveTab('prevention')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'prevention'
                  ? 'text-teal-900 bg-teal-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.navPrevention}
            </button>

            <button
              onClick={() => onOpenGlossary()}
              className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.navGlossary}</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'saved'
                  ? 'text-teal-900 bg-teal-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-teal-600 text-teal-600' : 'text-slate-400'}`} />
              <span>{t.navSaved}</span>
              {savedCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-teal-600 text-white rounded-full tabular-nums">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: Language Switcher + Indian Helplines + Warning Signs */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Top Language Switcher Button (prominently accessible) */}
            <button
              onClick={toggleLanguage}
              title={t.langSwitchTooltip}
              aria-label="Change language between English and Hindi"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-amber-50/90 border border-amber-300 rounded-lg hover:bg-amber-100 hover:border-amber-400 transition-all shadow-2xs group"
            >
              <Languages className="w-3.5 h-3.5 text-amber-700 group-hover:rotate-12 transition-transform" />
              <span className="font-heading">{t.langSwitchLabel}</span>
            </button>

            {/* Indian Helplines Button */}
            <button
              onClick={onOpenHelplines}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/90 rounded-lg hover:bg-emerald-100 hover:border-emerald-300 transition-colors whitespace-nowrap shadow-2xs"
              title="Official India Emergency & Health Helplines"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">{t.navHelplines}</span>
              <span className="sm:hidden">112 / 108</span>
            </button>

            {/* Urgent Warning Signs Button */}
            <button
              onClick={onOpenEmergency}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200/80 rounded-lg hover:bg-rose-100 hover:border-rose-300 transition-colors whitespace-nowrap shadow-2xs"
              title="View immediate danger signs requiring prompt medical evaluation"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">{t.navWarningSigns}</span>
              <span className="sm:hidden">Urgent</span>
            </button>
          </div>
        </div>

        {/* Secondary Navigation Strip (for Tablet & Mobile) */}
        <div className="xl:hidden flex items-center gap-1 py-2 border-t border-slate-100 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('guides')}
            className={`py-1 px-2.5 rounded-lg whitespace-nowrap ${
              activeTab === 'guides' ? 'text-teal-900 font-bold bg-teal-50' : 'text-slate-600'
            }`}
          >
            {t.navGuides}
          </button>
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`py-1 px-2.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'symptoms' ? 'text-teal-900 font-bold bg-teal-50' : 'text-slate-600'
            }`}
          >
            <Activity className="w-3 h-3 text-teal-600" />
            <span>{t.navSymptoms}</span>
          </button>
          <button
            onClick={() => setActiveTab('sleep')}
            className={`py-1 px-2.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'sleep' ? 'text-indigo-900 font-bold bg-indigo-50' : 'text-slate-600'
            }`}
          >
            <Moon className="w-3 h-3 text-indigo-600" />
            <span>{t.navSleep}</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('companion');
              if (onOpenCompanionBot) onOpenCompanionBot();
            }}
            className={`py-1 px-2.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'companion' ? 'text-teal-900 font-bold bg-teal-100/70' : 'text-slate-600'
            }`}
          >
            <Bot className="w-3 h-3 text-teal-600" />
            <span>{t.navCompanion}</span>
          </button>
          <button
            onClick={() => setActiveTab('bmi')}
            className={`py-1 px-2.5 rounded-lg whitespace-nowrap ${
              activeTab === 'bmi' ? 'text-teal-900 font-bold bg-teal-50' : 'text-slate-600'
            }`}
          >
            {t.navBmi}
          </button>
          <button
            onClick={() => setActiveTab('prevention')}
            className={`py-1 px-2.5 rounded-lg whitespace-nowrap ${
              activeTab === 'prevention' ? 'text-teal-900 font-bold bg-teal-50' : 'text-slate-600'
            }`}
          >
            {t.navPrevention}
          </button>
          <button
            onClick={() => onOpenGlossary()}
            className="py-1 px-2.5 rounded-lg whitespace-nowrap text-slate-600"
          >
            {t.navGlossary}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-1 px-2.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'saved' ? 'text-teal-900 font-bold bg-teal-50' : 'text-slate-600'
            }`}
          >
            {t.navSaved} ({savedCount})
          </button>
        </div>
      </div>
    </header>
  );
};
