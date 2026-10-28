import React, { useState } from 'react';
import { getLocalizedPreventionTips, PreventionTip } from '../data/preventionTips';
import { AgeGroupId, HealthConcernId } from '../types';
import { getLocalizedAgeGroups } from '../data/articles';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Search,
  RotateCcw,
  Users,
} from 'lucide-react';

interface PreventionTipsSectionProps {
  currentAge: AgeGroupId;
  currentConcerns: HealthConcernId[];
  onOpenArticleById?: (articleId: string) => void;
}

export const PreventionTipsSection: React.FC<PreventionTipsSectionProps> = ({
}) => {
  const { language } = useLanguage();
  const tips = getLocalizedPreventionTips(language);
  const localizedAgeGroups = getLocalizedAgeGroups(language);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<AgeGroupId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTipId, setExpandedTipId] = useState<string | null>('prev-01');

  const filteredTips = tips.filter((tip) => {
    // Category Tag filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'hygiene' && tip.categoryTag !== 'Hygiene') return false;
      if (selectedCategory === 'respiratory' && tip.categoryTag !== 'Respiratory') return false;
      if (selectedCategory === 'allergy' && tip.categoryTag !== 'Allergy' && tip.categoryTag !== 'Environmental') return false;
      if (selectedCategory === 'skin' && tip.categoryTag !== 'Skin') return false;
      if (selectedCategory === 'flu' && tip.categoryTag !== 'Flu') return false;
      if (selectedCategory === 'nutrition' && tip.categoryTag !== 'Nutrition') return false;
    }

    // Age filter
    if (selectedAgeFilter !== 'all') {
      if (!tip.ageGroups.includes(selectedAgeFilter)) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = tip.title.toLowerCase().includes(q);
      const matchesSummary = tip.summary.toLowerCase().includes(q);
      const matchesSteps = tip.actionSteps.some((s) => s.toLowerCase().includes(q));
      const matchesBadge = tip.badgeLabel.toLowerCase().includes(q);
      if (!matchesTitle && !matchesSummary && !matchesSteps && !matchesBadge) {
        return false;
      }
    }

    return true;
  });

  // Calculate counts for categories
  const hygieneCount = tips.filter((t) => t.categoryTag === 'Hygiene').length;
  const respiratoryCount = tips.filter((t) => t.categoryTag === 'Respiratory').length;
  const allergyCount = tips.filter((t) => t.categoryTag === 'Allergy' || t.categoryTag === 'Environmental').length;
  const skinCount = tips.filter((t) => t.categoryTag === 'Skin').length;
  const fluCount = tips.filter((t) => t.categoryTag === 'Flu').length;
  const nutritionCount = tips.filter((t) => t.categoryTag === 'Nutrition').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>
              {language === 'hi'
                ? 'सक्रिय नैदानिक निवारण मार्गदर्शिका'
                : 'Proactive Clinical Prevention Guide'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            {language === 'hi'
              ? 'स्वच्छता, दैनिक आदतें एवं स्वास्थ्य प्रोटोकॉल'
              : 'Hygiene, Daily Habits & Health Protocols'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'सामान्य स्वच्छता, वायुमार्ग देखभाल, घरेलू एलर्जी से बचाव, त्वचा सुरक्षा और मौसमी संक्रमण से रक्षा के लिए साक्ष्य-आधारित व्यावहारिक कदम।'
              : 'Evidence-backed actionable habits across general hygiene, respiratory airway maintenance, indoor mold/mite eradication, skin barriers, and schoolroom illness defense.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3.5">
        {/* Category Tabs */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            {language === 'hi' ? 'विषय अनुसार फ़िल्टर करें:' : 'Filter by Domain:'}
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'hi' ? 'सभी उपाय' : 'All Tips'} ({tips.length})
            </button>
            <button
              onClick={() => setSelectedCategory('hygiene')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'hygiene'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'hi' ? 'सामान्य स्वच्छता' : 'General Hygiene'} ({hygieneCount})
            </button>
            <button
              onClick={() => setSelectedCategory('respiratory')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'respiratory'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'hi' ? 'श्वसन एवं फेफड़े' : 'Respiratory & Airway'} ({respiratoryCount})
            </button>
            <button
              onClick={() => setSelectedCategory('allergy')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'allergy'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'hi' ? 'एलर्जी एवं वातावरण' : 'Allergy & Home'} ({allergyCount})
            </button>
            <button
              onClick={() => setSelectedCategory('skin')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'skin'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'hi' ? 'त्वचा एवं एक्जिमा' : 'Skin & Eczema'} ({skinCount})
            </button>
            <button
              onClick={() => setSelectedCategory('flu')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'flu'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'hi' ? 'फ्लू एवं संक्रमण' : 'Flu & Infection'} ({fluCount})
            </button>
            <button
              onClick={() => setSelectedCategory('nutrition')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'nutrition'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'hi' ? 'पोषण एवं जलयोजन' : 'Nutrition & Hydration'} ({nutritionCount})
            </button>
          </div>
        </div>

        {/* Secondary controls: Age Filter & Keyword Search */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-600 shrink-0">
              {language === 'hi' ? 'आयु वर्ग:' : 'Age Group:'}
            </span>
            <select
              value={selectedAgeFilter}
              onChange={(e) => setSelectedAgeFilter(e.target.value as AgeGroupId)}
              className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 cursor-pointer"
            >
              <option value="all">{language === 'hi' ? 'सभी आयु वर्ग' : 'All Ages'}</option>
              {localizedAgeGroups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label} ({g.category})
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={
                language === 'hi'
                  ? 'खोजें (हाथ धोना, इन्हेलर, धूल, बुखार, त्वचा)...'
                  : 'Search (e.g., handwashing, spacer, mold, fever)...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600"
            />
          </div>
        </div>
      </div>

      {/* Prevention Cards Grid */}
      <div className="space-y-4">
        {filteredTips.map((tip) => {
          const isExpanded = expandedTipId === tip.id;
          return (
            <div
              key={tip.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
            >
              {/* Card Header Accordion Click */}
              <button
                onClick={() => setExpandedTipId(isExpanded ? null : tip.id)}
                className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors focus:outline-hidden cursor-pointer"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-teal-800 uppercase tracking-wide">
                      {tip.badgeLabel}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 font-medium text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{tip.cadence}</span>
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>
                      {tip.ageGroups.length >= 6
                        ? (language === 'hi' ? 'सभी आयु वर्ग' : 'All Ages')
                        : tip.ageGroups.map((g) => `${g} ${language === 'hi' ? 'वर्ष' : 'yrs'}`).join(', ')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {tip.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tip.summary}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-slate-100 text-slate-500 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expanded Strategy Details */}
              {isExpanded && (
                <div className="p-5 pt-0 space-y-4 border-t border-slate-100 mt-2">
                  {/* Step by step action bullets */}
                  <div className="space-y-2 pt-3">
                    <span className="text-xs font-bold text-slate-900 font-heading uppercase tracking-wider block">
                      {language === 'hi' ? 'अनुशंसित क्रियात्मक कदम:' : 'Recommended Action Steps:'}
                    </span>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {tip.actionSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dual youth vs parent perspective callouts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-100 space-y-1">
                      <div className="text-xs font-bold text-teal-950 font-heading flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                        <span>{language === 'hi' ? 'युवा स्वयं-देखभाल सुझाव' : 'Youth Empowerment Tip'}</span>
                      </div>
                      <p className="text-xs text-teal-900 leading-relaxed">
                        {tip.youthTip}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
                      <div className="text-xs font-bold text-blue-950 font-heading flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                        <span>{language === 'hi' ? 'माता-पिता / अभिभावक चेकलिस्ट' : 'Parent Caregiver Checklist'}</span>
                      </div>
                      <p className="text-xs text-blue-900 leading-relaxed">
                        {tip.parentAdvice}
                      </p>
                    </div>
                  </div>

                  {/* Pitfall to avoid */}
                  <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>{language === 'hi' ? 'सामान्य गलती जिससे बचें:' : 'Common Pitfall to Avoid:'}</strong> {tip.avoidPitfall}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredTips.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3 max-w-md mx-auto">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
              <RotateCcw className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-slate-800">
              {language === 'hi'
                ? 'वर्तमान फ़िल्टर के लिए कोई सुझाव नहीं मिला।'
                : 'No prevention tips match the current filter.'}
            </p>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'कृपया "सभी उपाय" चुनें या खोज शब्द बदलें।'
                : 'Try switching to "All Tips" or clearing your search term.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedAgeFilter('all');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Prevention Filters'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
