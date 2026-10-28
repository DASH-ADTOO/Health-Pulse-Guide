import React, { useState } from 'react';
import { getLocalizedGlossaryTerms, GlossaryTerm } from '../data/glossary';
import { useLanguage } from '../context/LanguageContext';
import { X, Search, BookOpen, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticleById?: (articleId: string) => void;
  initialTerm?: GlossaryTerm | null;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  onSelectArticleById,
  initialTerm,
}) => {
  const { language } = useLanguage();
  const terms = getLocalizedGlossaryTerms(language);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTermId, setSelectedTermId] = useState<string | null>(
    initialTerm ? initialTerm.id : terms[0]?.id || 'term-01'
  );

  if (!isOpen) return null;

  const filteredTerms = terms.filter((t) => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchesTerm = t.term.toLowerCase().includes(q);
      const matchesDef = t.simpleDefinition.toLowerCase().includes(q);
      const matchesEg = t.inContextExample.toLowerCase().includes(q);
      return matchesTerm || matchesDef || matchesEg;
    }
    return true;
  });

  const activeTerm =
    terms.find((t) => t.id === selectedTermId) || filteredTerms[0] || terms[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-slate-200 bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading leading-none">
                {language === 'hi' ? 'चिकित्सा एवं एलर्जी शब्दावली' : 'Medical & Allergy Glossary'}
              </h2>
              <span className="text-xs text-slate-500">
                {language === 'hi'
                  ? 'अभिभावकों एवं युवाओं के लिए सरल हिंदी परिभाषाएं'
                  : 'Plain-English definitions for parents and youth'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={
                language === 'hi'
                  ? 'शब्दावली खोजें (उदा. एनाफिलेक्सिस, स्पेसर, सेरामाइड्स, हिस्टामाइन)...'
                  : 'Search health terms (e.g., Anaphylaxis, Spacer, Ceramides, TEWL)...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {language === 'hi' ? 'सभी शब्द' : 'All Terms'} ({terms.length})
            </button>
            <button
              onClick={() => setSelectedCategory('respiratory')}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'respiratory'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {language === 'hi' ? 'श्वसन एवं दमा' : 'Respiratory & Asthma'}
            </button>
            <button
              onClick={() => setSelectedCategory('allergy')}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'allergy'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {language === 'hi' ? 'एलर्जी एवं परागकण' : 'Allergens & Pollen'}
            </button>
            <button
              onClick={() => setSelectedCategory('dermatology')}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'dermatology'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {language === 'hi' ? 'त्वचा एवं एक्जिमा' : 'Skin & Eczema'}
            </button>
            <button
              onClick={() => setSelectedCategory('emergency')}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'emergency'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {language === 'hi' ? 'आपातकालीन संकेत' : 'Urgent Signs'}
            </button>
          </div>
        </div>

        {/* Content Body: Split view on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Term List Sidebar */}
          <div className="md:col-span-4 border-r border-slate-200 overflow-y-auto max-h-[40vh] md:max-h-none p-2 space-y-1 bg-slate-50/40">
            {filteredTerms.map((item) => {
              const isSelected = activeTerm.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedTermId(item.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-0.5 cursor-pointer ${
                    isSelected
                      ? 'bg-white border border-teal-600 shadow-2xs font-semibold'
                      : 'hover:bg-slate-100/80 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 font-heading">
                    {item.term}
                  </span>
                  <span className="text-[11px] text-slate-500 line-clamp-1">
                    {item.simpleDefinition}
                  </span>
                </button>
              );
            })}

            {filteredTerms.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-500">
                {language === 'hi'
                  ? 'आपकी खोज के लिए कोई शब्दावली नहीं मिली।'
                  : 'No glossary terms match your search.'}
              </div>
            )}
          </div>

          {/* Term Detail View */}
          <div className="md:col-span-8 p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            {activeTerm ? (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold uppercase tracking-wider mb-1">
                    <span>
                      {language === 'hi'
                        ? `${activeTerm.category.toUpperCase()} परिभाषा`
                        : `${activeTerm.category.toUpperCase()} DEFINITION`}
                    </span>
                    {activeTerm.phonetic && (
                      <>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500 font-normal lowercase">
                          /{activeTerm.phonetic}/
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 font-heading">
                    {activeTerm.term}
                  </h3>
                </div>

                {/* Definition Box */}
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 text-sm text-teal-950 leading-relaxed">
                  <strong className="block text-xs uppercase tracking-wider text-teal-800 mb-1">
                    {language === 'hi' ? 'सरल व्याख्या:' : 'Simple Explanation:'}
                  </strong>
                  {activeTerm.simpleDefinition}
                </div>

                {/* In Context Clinical Example */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-800 uppercase tracking-wide">
                    {language === 'hi' ? 'व्यावहारिक संदर्भ:' : 'Real-World Context:'}
                  </span>
                  <p className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 italic leading-relaxed">
                    &quot;{activeTerm.inContextExample}&quot;
                  </p>
                </div>

                {/* Parent & Youth Guidance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5 font-heading">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                      <span>
                        {language === 'hi'
                          ? 'माता-पिता एवं देखभालकर्ताओं के लिए'
                          : 'For Parents & Caregivers'}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {activeTerm.parentTip}
                    </p>
                  </div>

                  {activeTerm.youthTip && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5 font-heading">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        <span>
                          {language === 'hi'
                            ? 'बच्चों एवं युवाओं के लिए'
                            : 'For Kids & Teens'}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {activeTerm.youthTip}
                      </p>
                    </div>
                  )}
                </div>

                {/* Related Articles in this app */}
                {activeTerm.relatedArticleIds.length > 0 && onSelectArticleById && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      {language === 'hi'
                        ? 'हमारे क्लिनिकल गाइड में चर्चा की गई है:'
                        : 'Discussed in our pediatric guides:'}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectArticleById(activeTerm.relatedArticleIds[0]);
                      }}
                      className="inline-flex items-center gap-1 font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
                    >
                      <span>
                        {language === 'hi'
                          ? 'संबंधित क्लिनिकल गाइड पढ़ें'
                          : 'Read Related Clinical Guide'}
                      </span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            {language === 'hi' ? 'शब्दावली बंद करें' : 'Close Glossary'}
          </button>
        </div>
      </div>
    </div>
  );
};
