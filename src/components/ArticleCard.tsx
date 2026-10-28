import React from 'react';
import { Article } from '../types';
import { Bookmark, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { formatAgeLabel, formatSeasonLabel } from '../data/articles';
import { getLocalizedArticle } from '../data/articlesHindi';

interface ArticleCardProps {
  article: Article;
  onReadFull: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article: rawArticle,
  onReadFull,
  isSaved,
  onToggleSave,
}) => {
  const { language, t } = useLanguage();
  const article = getLocalizedArticle(rawArticle, language);

  // Format age groups for clean unboxed metadata
  const ageLabels = article.ageGroups
    .map((g) => formatAgeLabel(g, language))
    .join(', ');

  const seasonLabels = article.seasons
    .map((s) => formatSeasonLabel(s, language))
    .join(' / ');

  const dietLabel =
    article.dietaryPreference === 'vegetarian'
      ? (language === 'hi' ? 'शाकाहारी' : 'Vegetarian')
      : article.dietaryPreference === 'non-vegetarian'
      ? (language === 'hi' ? 'मांसाहारी' : 'Non-Vegetarian')
      : (language === 'hi' ? 'सभी आहार' : 'Veg & Non-Veg');

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Visual Thumbnail */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

        {/* Floating Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(article.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
            isSaved
              ? 'bg-teal-600 text-white hover:bg-teal-700'
              : 'bg-white/90 text-slate-700 hover:bg-white hover:text-teal-700'
          }`}
          aria-label={isSaved ? (language === 'hi' ? 'सहेजे गए से हटाएं' : 'Remove from saved') : (language === 'hi' ? 'लेख सहेजें' : 'Save article')}
          title={isSaved ? (language === 'hi' ? 'सहेजे गए से हटाएं' : 'Remove from saved') : (language === 'hi' ? 'ऑफ़लाइन संदर्भ के लिए सहेजें' : 'Save for offline reference')}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Editorial Audience Note over thumbnail bottom */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-medium truncate drop-shadow-sm flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-300 shrink-0" />
          <span className="truncate">{article.targetAudience}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="text-teal-800 font-semibold">{ageLabels}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{seasonLabels}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{article.readTimeMinutes} {t.minRead}</span>
            </span>
            {article.dietaryPreference && article.dietaryPreference !== 'all' && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className={`font-semibold ${
                  article.dietaryPreference === 'vegetarian'
                    ? 'text-emerald-800'
                    : article.dietaryPreference === 'non-vegetarian'
                    ? 'text-amber-800'
                    : 'text-slate-600'
                }`}>
                  {dietLabel}
                </span>
              </>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug group-hover:text-teal-900 transition-colors">
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>

          {/* Key practical takeaway callout */}
          {article.keyTakeaways.length > 0 && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-relaxed">
                <strong className="text-slate-900 font-semibold">{t.keyTip}</strong> {article.keyTakeaways[0]}
              </span>
            </div>
          )}
        </div>

        {/* Card Footer / Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-500 truncate">
            {article.medicalReviewer.name}
          </div>

          <button
            onClick={() => onReadFull(article)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 hover:text-teal-900 rounded-lg transition-colors whitespace-nowrap shrink-0 group/btn"
          >
            <span>{t.readFullGuide}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
