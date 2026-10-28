import React from 'react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';
import { Bookmark, ArrowLeft, BookOpen, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SavedArticlesSectionProps {
  savedArticles: Article[];
  onReadFull: (article: Article) => void;
  onToggleSave: (articleId: string) => void;
  onClearAllSaved: () => void;
  onBackToGuides: () => void;
}

export const SavedArticlesSection: React.FC<SavedArticlesSectionProps> = ({
  savedArticles,
  onReadFull,
  onToggleSave,
  onClearAllSaved,
  onBackToGuides,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
            <Bookmark className="w-4 h-4 fill-teal-600 text-teal-600" />
            <span>{t.savedHeaderBadge}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">
            {t.savedTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.savedSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={onBackToGuides}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.savedBrowseMore}</span>
          </button>

          {savedArticles.length > 0 && (
            <button
              onClick={onClearAllSaved}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.savedClearAll} ({savedArticles.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Saved Articles */}
      {savedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onReadFull={onReadFull}
              isSaved={true}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4 max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              {t.savedEmptyTitle}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.savedEmptyDesc}
            </p>
          </div>
          <button
            onClick={onBackToGuides}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.savedExploreBtn}</span>
          </button>
        </div>
      )}
    </div>
  );
};
