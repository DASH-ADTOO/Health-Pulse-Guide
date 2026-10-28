import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { getLocalizedGlossaryTerms, GlossaryTerm } from '../data/glossary';
import { getLocalizedArticle } from '../data/articlesHindi';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Bookmark,
  Printer,
  ShieldCheck,
  Clock,
  Calendar,
  AlertTriangle,
  CheckSquare,
  Square,
  HelpCircle,
  Share2,
} from 'lucide-react';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
  onOpenGlossaryTerm?: (term: GlossaryTerm) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  const { language, t } = useLanguage();
  const [completedChecklist, setCompletedChecklist] = useState<number[]>([]);
  const [activeGlossaryPop, setActiveGlossaryPop] = useState<GlossaryTerm | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Reset completed checklist when reading a new article
    setCompletedChecklist([]);
    setActiveGlossaryPop(null);

    // Prevent body scrolling while modal is open
    if (article) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [article]);

  if (!article) return null;

  // Localized article data
  const localizedArticle = getLocalizedArticle(article, language);

  const toggleChecklistItem = (idx: number) => {
    setCompletedChecklist((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Find relevant localized glossary terms for this article
  const allTerms = getLocalizedGlossaryTerms(language);
  const relevantGlossaryTerms = allTerms.filter(
    (term) =>
      term.relatedArticleIds.includes(localizedArticle.id) ||
      localizedArticle.title.toLowerCase().includes(term.term.toLowerCase()) ||
      localizedArticle.summary.toLowerCase().includes(term.term.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-white sticky top-0 z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium truncate">
            <span className="text-teal-800 font-bold truncate">{t.readerGuideHeader}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{localizedArticle.readTimeMinutes} {t.minRead}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(localizedArticle.id)}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isSaved
                  ? 'bg-teal-50 border-teal-300 text-teal-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title={isSaved ? t.savedArticle : t.saveArticle}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-teal-700 text-teal-700' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">{isSaved ? t.savedArticle : t.saveArticle}</span>
            </button>

            {/* Share / Copy link */}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title={t.shareArticle}
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">{copiedLink ? t.copiedLink : t.shareArticle}</span>
            </button>

            {/* Print action */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title={t.printArticle}
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">{t.printArticle}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label={t.closeGuide}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-5 sm:px-8 py-6 space-y-8 flex-1">
          {/* Header & Title Section */}
          <div className="space-y-4 max-w-3xl">
            {/* Zero-Pill Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="text-teal-800 font-semibold uppercase tracking-wider">
                {localizedArticle.targetAudience}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{localizedArticle.publishedDate}</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{localizedArticle.readTimeMinutes} {t.minRead}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-heading leading-tight" style={{ textWrap: 'balance' }}>
              {localizedArticle.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {localizedArticle.subtitle}
            </p>

            {/* Medical Reviewer Byline Card */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                MD
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <span className="text-slate-500 font-normal">{t.readerReviewedBy}</span>
                  <span>{localizedArticle.medicalReviewer.name}</span>
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-slate-500">
                  {localizedArticle.medicalReviewer.role} · {localizedArticle.medicalReviewer.institution}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Banner Visual within Article */}
          <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200 h-64 sm:h-72">
            <img
              src={localizedArticle.image}
              alt={localizedArticle.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Key Takeaways Callout Box */}
          <div className="p-5 rounded-xl bg-teal-50/70 border border-teal-200/80 space-y-2">
            <h3 className="text-sm font-bold text-teal-950 font-heading uppercase tracking-wide">
              {t.readerKeyTakeaways}
            </h3>
            <ul className="space-y-1.5 text-sm text-teal-900 leading-relaxed list-disc list-inside">
              {localizedArticle.keyTakeaways.map((tip, idx) => (
                <li key={idx} className="marker:text-teal-600 pl-1">
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dietary Nutrition Protocol Box (if present) */}
          {localizedArticle.dietaryNotes && (
            <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <h3 className="text-sm font-bold text-emerald-950 font-heading uppercase tracking-wide flex items-center gap-2">
                <span>{t.readerDietaryAdaptations}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {localizedArticle.dietaryNotes.vegetarian && (
                  <div className="p-3 bg-white rounded-lg border border-emerald-200 space-y-1">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <span>{t.readerVegProtocol}</span>
                    </div>
                    <p className="text-emerald-950 leading-relaxed">
                      {localizedArticle.dietaryNotes.vegetarian}
                    </p>
                  </div>
                )}
                {localizedArticle.dietaryNotes.nonVegetarian && (
                  <div className="p-3 bg-white rounded-lg border border-amber-200 space-y-1">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <span>{t.readerNonVegProtocol}</span>
                    </div>
                    <p className="text-amber-950 leading-relaxed">
                      {localizedArticle.dietaryNotes.nonVegetarian}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Prose Reading Columns */}
          <div className="space-y-6 max-w-prose">
            {localizedArticle.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900 font-heading">
                  {section.heading}
                </h2>
                <p className="text-base text-slate-700 leading-relaxed">
                  {section.content}
                </p>
                {section.bulletPoints && (
                  <ul className="space-y-1.5 pl-4 text-sm text-slate-600 list-disc">
                    {section.bulletPoints.map((point, pIdx) => (
                      <li key={pIdx} className="leading-relaxed marker:text-slate-400">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Inline Medical Terms Found in This Guide */}
          {relevantGlossaryTerms.length > 0 && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-heading">
                  <HelpCircle className="w-4 h-4 text-teal-600" />
                  <span>{t.readerMedicalTerms}</span>
                </div>
                <span className="text-xs text-slate-500">{t.readerTapTermTip}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {relevantGlossaryTerms.map((term) => (
                  <button
                    key={term.id}
                    onClick={() => setActiveGlossaryPop(term)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-slate-200 hover:border-teal-400 hover:text-teal-900 transition-colors text-left flex items-center gap-1.5"
                  >
                    <span className="font-semibold text-slate-800">{term.term}</span>
                    {term.phonetic && (
                      <span className="text-[10px] text-slate-400 font-normal">({term.phonetic})</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Popover Preview of Selected Term */}
              {activeGlossaryPop && (
                <div className="mt-3 p-4 bg-white rounded-lg border border-teal-300 shadow-sm space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-teal-950 font-heading">
                      {activeGlossaryPop.term}{' '}
                      {activeGlossaryPop.phonetic && (
                        <span className="text-xs text-slate-400 font-normal">
                          / {activeGlossaryPop.phonetic} /
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => setActiveGlossaryPop(null)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {activeGlossaryPop.simpleDefinition}
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-slate-600">
                    <strong className="text-teal-800">
                      {language === 'hi' ? 'अभिभावकों एवं युवाओं के लिए:' : 'For Parents & Youth:'}
                    </strong>{' '}
                    {activeGlossaryPop.parentTip}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Interactive Prevention Checklist */}
          {localizedArticle.checklist.length > 0 && (
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {t.readerChecklistTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t.readerChecklistSubtext}
                  </p>
                </div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md tabular-nums">
                  {completedChecklist.length} / {localizedArticle.checklist.length} {t.readerChecklistDone}
                </span>
              </div>

              <div className="space-y-2 pt-1">
                {localizedArticle.checklist.map((item, idx) => {
                  const isChecked = completedChecklist.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleChecklistItem(idx)}
                      className={`w-full p-3 rounded-lg border text-left transition-colors flex items-start gap-3 text-xs leading-relaxed ${
                        isChecked
                          ? 'bg-teal-50/50 border-teal-300 text-teal-950 line-through opacity-85'
                          : 'bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span className="shrink-0 mt-0.5 text-teal-600">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 fill-teal-100" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </span>
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Red Flag Warning Box - "When to Seek Immediate Medical Care" */}
          {localizedArticle.redFlags.length > 0 && (
            <div className="p-5 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-950 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold font-heading text-sm uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{t.readerRedFlagsTitle}</span>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed font-medium">
                {t.readerRedFlagsIntro}
              </p>
              <ul className="space-y-1.5 text-xs text-rose-900 list-disc list-inside">
                {localizedArticle.redFlags.map((flag, idx) => (
                  <li key={idx} className="marker:text-rose-600 pl-1 leading-relaxed">
                    <strong className="text-rose-950">{flag}</strong>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-rose-200/80 text-[11px] text-rose-800">
                {t.readerRedFlagsCallNotice}
              </div>
            </div>
          )}

          {/* Home Care Protocols */}
          {localizedArticle.homeCareTips.length > 0 && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 font-heading uppercase tracking-wide">
                {t.readerHomeCareTitle}
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside leading-relaxed">
                {localizedArticle.homeCareTips.map((tip, idx) => (
                  <li key={idx} className="marker:text-slate-400 pl-1">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medical Disclaimer in Footer */}
          <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed">
            <strong>{t.readerMedicalDisclaimerLabel}</strong> {t.readerMedicalDisclaimerText}
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {t.readerReviewedBy} {localizedArticle.medicalReviewer.name}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            {t.readerDoneReading}
          </button>
        </div>
      </div>
    </div>
  );
};
