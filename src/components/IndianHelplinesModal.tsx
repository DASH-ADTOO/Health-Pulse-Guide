import React, { useState } from 'react';
import { getLocalizedHelplines } from '../data/indianHelplines';
import { useLanguage } from '../context/LanguageContext';
import {
  Phone,
  Search,
  X,
  Clock,
  Globe,
  AlertOctagon,
} from 'lucide-react';

interface IndianHelplinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IndianHelplinesModal: React.FC<IndianHelplinesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, t } = useLanguage();
  const helplines = getLocalizedHelplines(language);

  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = language === 'hi' ? [
    { id: 'all', label: 'सभी हेल्पलाइन' },
    { id: 'emergency', label: 'आपातकालीन एवं एम्बुलेंस' },
    { id: 'maternal-child', label: 'मातृ एवं शिशु सहायता' },
    { id: 'mental-health', label: 'टेली-मानस मानसिक स्वास्थ्य' },
    { id: 'poison', label: 'विष नियंत्रण (एम्स)' },
    { id: 'advisory', label: 'स्वास्थ्य सलाह (104)' },
  ] : [
    { id: 'all', label: 'All Helplines' },
    { id: 'emergency', label: 'Emergency & Ambulance' },
    { id: 'maternal-child', label: 'Maternal & Child (JSSK/Childline)' },
    { id: 'mental-health', label: 'Tele-MANAS Mental Health' },
    { id: 'poison', label: 'Poison Control (AIIMS)' },
    { id: 'advisory', label: 'Medical Advice (104)' },
  ];

  const filtered = helplines.filter((h) => {
    const matchesCategory =
      selectedCategory === 'all' || h.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      h.number.includes(q) ||
      h.title.toLowerCase().includes(q) ||
      h.subtitle.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q) ||
      h.keyUseCases.some((u) => u.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5" />
              <span>{t.helplineOfficialBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading">
              {t.helplineModalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t.helplineModalSubtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
            title={t.helplineClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={t.helplineSearchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-600/30"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Helplines List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Quick Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertOctagon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>{t.helplineTipTitle}</strong> {t.helplineTipText}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <div
                key={item.number}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  item.highlight
                    ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight">
                          {item.number}
                        </span>
                        {item.tollFree && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                            {t.helplineTollFree}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading mt-0.5">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-teal-800 font-medium block">
                        {item.subtitle}
                      </span>
                    </div>

                    {/* Direct Tap to Call */}
                    <a
                      href={`tel:${item.number.replace(/-/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs shrink-0 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{t.helplineCallNow}</span>
                    </a>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Badges: Hours & Languages */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{item.hours}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <span>{item.languages.join(', ')}</span>
                    </span>
                  </div>

                  {/* Key Use Cases */}
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {t.helplineCommonReasons}
                    </span>
                    <ul className="text-[11px] text-slate-600 space-y-0.5 list-disc pl-3.5">
                      {item.keyUseCases.map((u, i) => (
                        <li key={i}>{u}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              {language === 'hi'
                ? 'कोई हेल्पलाइन नहीं मिली। "108", "एम्बुलेंस" या "112" खोज कर देखें।'
                : 'No helplines match your search term. Try searching for "108", "ambulance", or "poison".'}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            {language === 'hi'
              ? 'स्रोत: स्वास्थ्य एवं परिवार कल्याण मंत्रालय (MoHFW), भारत सरकार'
              : 'Source: Ministry of Health & Family Welfare (MoHFW), Govt of India'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {t.helplineClose}
          </button>
        </div>
      </div>
    </div>
  );
};
