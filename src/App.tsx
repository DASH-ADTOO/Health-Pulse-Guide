/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  AgeGroupId,
  SeasonId,
  HealthConcernId,
  EnvironmentSettingId,
  SymptomStageId,
  TriggerTypeId,
  PerspectiveId,
  DietaryPreference,
  Article,
  FamilyProfile,
} from './types';
import {
  ARTICLES,
  AGE_GROUPS,
  SEASONS,
  HEALTH_CONCERNS,
  SETTING_OPTIONS,
  SYMPTOM_STAGE_OPTIONS,
  TRIGGER_TYPE_OPTIONS,
  PERSPECTIVE_OPTIONS,
} from './data/articles';
import { GlossaryTerm } from './data/glossary';

import { Navbar, NavTabType } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { DietaryToggleBar } from './components/DietaryToggleBar';
import { StepAgeSelector } from './components/StepAgeSelector';
import { StepSeasonSelector } from './components/StepSeasonSelector';
import { StepConcernSelector } from './components/StepConcernSelector';
import { PrecisionFiltersBar } from './components/PrecisionFiltersBar';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { GlossaryModal } from './components/GlossaryModal';
import { PreventionTipsSection } from './components/PreventionTipsSection';
import { BmiCalculator } from './components/BmiCalculator';
import { SymptomTracker } from './components/SymptomTracker';
import { SleepTracker } from './components/SleepTracker';
import { HealthCompanionBot } from './components/HealthCompanionBot';
import { FloatingCompanionBot } from './components/FloatingCompanionBot';
import { IndianHelplinesModal } from './components/IndianHelplinesModal';
import { SavedArticlesSection } from './components/SavedArticlesSection';
import { EmergencyGuideModal } from './components/EmergencyGuideModal';
import { Footer } from './components/Footer';
import { useLanguage } from './context/LanguageContext';

import {
  Search,
  Filter,
  RotateCcw,
  BookOpen,
  ArrowUpDown,
  CheckCircle,
  X,
  Sliders,
} from 'lucide-react';

const STORAGE_KEY_SAVED = 'healthpulse_saved_article_ids';

export default function App() {
  const { language, t } = useLanguage();

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<NavTabType>('guides');
  const [isHelplinesOpen, setIsHelplinesOpen] = useState<boolean>(false);
  const [companionInitialPrompt, setCompanionInitialPrompt] = useState<string | undefined>(undefined);
  const [isFloatingBotOpen, setIsFloatingBotOpen] = useState<boolean>(false);

  // Step 1: Age Bracket (now supporting 5-9, 10-14, 14-18, 18-25, 26-35, 36-44, 50+)
  const [selectedAge, setSelectedAge] = useState<AgeGroupId>('5-9');

  // Dietary Lifestyle Preference (Top filter)
  const [dietaryPreference, setDietaryPreference] = useState<DietaryPreference>('all');

  // Step 2: Season
  const [selectedSeason, setSelectedSeason] = useState<SeasonId>('spring');

  // Step 3: Concerns & Optional Mode
  const [isSpecificIllnessMode, setIsSpecificIllnessMode] = useState<boolean>(true);
  const [selectedConcerns, setSelectedConcerns] = useState<HealthConcernId[]>([
    'allergies',
    'asthma-breathing',
  ]);

  // Precision Filters
  const [setting, setSetting] = useState<EnvironmentSettingId>('all');
  const [symptomStage, setSymptomStage] = useState<SymptomStageId>('all');
  const [triggerType, setTriggerType] = useState<TriggerTypeId>('all');
  const [perspective, setPerspective] = useState<PerspectiveId>('all');
  const [isPrecisionOpen, setIsPrecisionOpen] = useState<boolean>(false);

  // Search & Sort
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'relevance' | 'readTime' | 'newest'>('relevance');

  // Presets
  const [activePresetId, setActivePresetId] = useState<string | null>('preset-1');

  // Modals & Active Reader
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<GlossaryTerm | null>(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);

  // Bookmarks state (persisted to localStorage)
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED);
      return stored ? JSON.parse(stored) : ['hp-01', 'hp-03', 'hp-09'];
    } catch {
      return ['hp-01', 'hp-03', 'hp-09'];
    }
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedArticleIds));
    } catch {
      // ignore
    }
  }, [savedArticleIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Toggle bookmark
  const handleToggleSave = (articleId: string) => {
    setSavedArticleIds((prev) => {
      if (prev.includes(articleId)) {
        showToast('Article removed from saved guides');
        return prev.filter((id) => id !== articleId);
      } else {
        showToast('Article saved to your library!');
        return [...prev, articleId];
      }
    });
  };

  const handleClearAllSaved = () => {
    setSavedArticleIds([]);
    showToast('All saved articles removed');
  };

  // Concern Toggles
  const handleToggleConcern = (concernId: HealthConcernId) => {
    setActivePresetId(null);
    if (concernId === 'general-wellness') {
      setSelectedConcerns(['general-wellness']);
      return;
    }

    setSelectedConcerns((prev) => {
      const withoutGeneral = prev.filter((c) => c !== 'general-wellness');
      if (withoutGeneral.includes(concernId)) {
        const next = withoutGeneral.filter((c) => c !== concernId);
        return next.length > 0 ? next : ['general-wellness'];
      } else {
        return [...withoutGeneral, concernId];
      }
    });
  };

  const handleSelectAllConcerns = () => {
    setActivePresetId(null);
    setSelectedConcerns([
      'general-wellness',
      'asthma-breathing',
      'allergies',
      'skin-eczema',
      'flu-cough',
      'immunity-nutrition',
    ]);
  };

  const handleResetToGeneral = () => {
    setActivePresetId(null);
    setSelectedConcerns(['general-wellness']);
  };

  // Handle Preset selection
  const handleSelectPreset = (preset: FamilyProfile) => {
    setActivePresetId(preset.id);
    setSelectedAge(preset.ageGroup);
    setSelectedSeason(preset.season);
    setSelectedConcerns(preset.concerns);
    setIsSpecificIllnessMode(preset.concerns.some((c) => c !== 'general-wellness'));
    if (preset.setting) setSetting(preset.setting);
    if (preset.stage) setSymptomStage(preset.stage);
    if (preset.diet) setDietaryPreference(preset.diet);
    showToast(`Loaded profile: ${preset.name}`);
  };

  const handleResetPrecision = () => {
    setSetting('all');
    setSymptomStage('all');
    setTriggerType('all');
    setPerspective('all');
  };

  const handleClearFilters = () => {
    setActivePresetId(null);
    setSelectedAge('all');
    setSelectedSeason('all');
    setSelectedConcerns(['general-wellness']);
    setIsSpecificIllnessMode(false);
    setDietaryPreference('all');
    handleResetPrecision();
    setSearchQuery('');
  };

  // Dynamic Recommendation Engine with guaranteed at least 3 articles for ANY filter combination!
  const filteredArticles = useMemo(() => {
    const exactMatches: Article[] = [];
    const relatedMatches: { article: Article; score: number }[] = [];

    ARTICLES.forEach((article) => {
      let score = 0;

      // 1. Age matching
      const matchesAge =
        selectedAge === 'all' ||
        article.ageGroups.includes('all') ||
        article.ageGroups.includes(selectedAge);
      if (matchesAge) score += 40;

      // 2. Season matching
      const matchesSeason =
        selectedSeason === 'all' ||
        article.seasons.includes('all') ||
        article.seasons.includes(selectedSeason);
      if (matchesSeason) score += 30;

      // 3. Concern matching
      const matchesConcern =
        !isSpecificIllnessMode ||
        selectedConcerns.length === 0 ||
        article.concerns.some((c) => selectedConcerns.includes(c));
      if (matchesConcern) score += 35;

      // 4. Precision Setting matching
      const matchesSetting =
        setting === 'all' || article.setting === setting || article.setting === 'all';
      if (matchesSetting) score += 10;

      // 5. Precision Stage matching
      const matchesStage =
        symptomStage === 'all' || article.symptomStage === symptomStage || article.symptomStage === 'all';
      if (matchesStage) score += 10;

      // 6. Precision Trigger matching
      const matchesTrigger =
        triggerType === 'all' || article.triggerType === triggerType || article.triggerType === 'all';
      if (matchesTrigger) score += 10;

      // 7. Precision Perspective matching
      const matchesPerspective =
        perspective === 'all' || article.perspective === perspective || article.perspective === 'all';
      if (matchesPerspective) score += 10;

      // 8. Keyword search matching
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = article.title.toLowerCase().includes(q);
        const inSummary = article.summary.toLowerCase().includes(q);
        const inTakeaways = article.keyTakeaways.some((t) => t.toLowerCase().includes(q));
        const inAudience = article.targetAudience.toLowerCase().includes(q);
        const inSections = article.sections.some(
          (s) => s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
        );
        matchesSearch = inTitle || inSummary || inTakeaways || inAudience || inSections;
        if (matchesSearch) score += 50;
      }

      // 9. Dietary Lifestyle matching & optimization
      let matchesDiet = true;
      if (dietaryPreference === 'vegetarian') {
        if (article.dietaryPreference === 'non-vegetarian') {
          matchesDiet = false;
        } else if (article.dietaryPreference === 'vegetarian') {
          score += 45;
        } else if (article.dietaryPreference === 'both') {
          score += 20;
        }
      } else if (dietaryPreference === 'non-vegetarian') {
        if (article.dietaryPreference === 'vegetarian') {
          matchesDiet = false;
        } else if (article.dietaryPreference === 'non-vegetarian') {
          score += 45;
        } else if (article.dietaryPreference === 'both') {
          score += 20;
        }
      }

      const isCoreExact = matchesAge && matchesSeason && matchesConcern && matchesSearch && matchesDiet;
      const isPrecisionExact =
        matchesSetting && matchesStage && matchesTrigger && matchesPerspective;

      if (isCoreExact && isPrecisionExact) {
        exactMatches.push(article);
      } else if (matchesSearch && (dietaryPreference === 'all' || article.dietaryPreference !== (dietaryPreference === 'vegetarian' ? 'non-vegetarian' : 'vegetarian'))) {
        relatedMatches.push({ article, score });
      }
    });

    // Sort direct matches according to user preference
    exactMatches.sort((a, b) => {
      if (sortBy === 'readTime') return a.readTimeMinutes - b.readTimeMinutes;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

    // If we have 3 or more exact matches, return them
    if (exactMatches.length >= 3) {
      return exactMatches;
    }

    // Otherwise, guarantee at least 3 articles by supplementing with top-affinity related guides
    relatedMatches.sort((a, b) => b.score - a.score);
    const result = [...exactMatches];
    const existingIds = new Set(exactMatches.map((a) => a.id));

    for (const item of relatedMatches) {
      if (result.length >= 3) break;
      if (!existingIds.has(item.article.id)) {
        result.push(item.article);
        existingIds.add(item.article.id);
      }
    }

    // Baseline fallback if still under 3
    if (result.length < 3) {
      for (const article of ARTICLES) {
        if (result.length >= 3) break;
        if (!existingIds.has(article.id)) {
          result.push(article);
          existingIds.add(article.id);
        }
      }
    }

    return result;
  }, [
    selectedAge,
    selectedSeason,
    isSpecificIllnessMode,
    selectedConcerns,
    dietaryPreference,
    setting,
    symptomStage,
    triggerType,
    perspective,
    searchQuery,
    sortBy,
  ]);

  // Saved articles objects
  const savedArticles = useMemo(() => {
    return ARTICLES.filter((a) => savedArticleIds.includes(a.id));
  }, [savedArticleIds]);

  // Open article by ID helper
  const handleSelectArticleById = (articleId: string) => {
    const found = ARTICLES.find((a) => a.id === articleId);
    if (found) {
      setActiveArticle(found);
      setActiveTab('guides');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-slate-700 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedArticleIds.length}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenHelplines={() => setIsHelplinesOpen(true)}
        onOpenCompanionBot={() => setIsFloatingBotOpen(true)}
        onOpenGlossary={() => {
          setSelectedGlossaryTerm(null);
          setIsGlossaryOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'symptoms' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SymptomTracker
              currentAge={selectedAge}
              onOpenCompanionWithContext={(prompt) => {
                setCompanionInitialPrompt(prompt);
                setIsFloatingBotOpen(true);
              }}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
            />
          </div>
        ) : activeTab === 'sleep' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SleepTracker
              currentAge={selectedAge}
              onOpenCompanionWithContext={(prompt) => {
                setCompanionInitialPrompt(prompt);
                setIsFloatingBotOpen(true);
              }}
            />
          </div>
        ) : activeTab === 'companion' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HealthCompanionBot
              currentAge={selectedAge}
              currentSeason={selectedSeason}
              dietaryPreference={dietaryPreference}
              initialPrompt={companionInitialPrompt}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
              onOpenHelplines={() => setIsHelplinesOpen(true)}
            />
          </div>
        ) : activeTab === 'bmi' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BmiCalculator currentAge={selectedAge} />
          </div>
        ) : activeTab === 'prevention' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <PreventionTipsSection
              currentAge={selectedAge}
              currentConcerns={selectedConcerns}
              onOpenArticleById={handleSelectArticleById}
            />
          </div>
        ) : activeTab === 'saved' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SavedArticlesSection
              savedArticles={savedArticles}
              onReadFull={(art) => setActiveArticle(art)}
              onToggleSave={handleToggleSave}
              onClearAllSaved={handleClearAllSaved}
              onBackToGuides={() => setActiveTab('guides')}
            />
          </div>
        ) : (
          /* Main Filter Guides Tab */
          <div>
            {/* Hero Section */}
            <HeroBanner
              selectedSeason={selectedSeason}
              selectedAge={selectedAge}
              onSelectPreset={handleSelectPreset}
              activePresetId={activePresetId}
              onClearFilters={handleClearFilters}
            />

            {/* Filter Console */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              {/* Filter Cards Container */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-7">
                {/* Dietary Lifestyle Selection at Top */}
                <DietaryToggleBar
                  diet={dietaryPreference}
                  onSelectDiet={setDietaryPreference}
                />

                <div className="border-t border-slate-100" />

                {/* Step 1: 7 Age Brackets */}
                <StepAgeSelector
                  selectedAge={selectedAge}
                  onSelectAge={(age) => {
                    setActivePresetId(null);
                    setSelectedAge(age);
                  }}
                />

                <div className="border-t border-slate-100" />

                {/* Step 2: Season Selection */}
                <StepSeasonSelector
                  selectedSeason={selectedSeason}
                  onSelectSeason={(season) => {
                    setActivePresetId(null);
                    setSelectedSeason(season);
                  }}
                />

                <div className="border-t border-slate-100" />

                {/* Step 3: Concern Selection (Multi-select / Optional Modes) */}
                <StepConcernSelector
                  selectedConcerns={selectedConcerns}
                  onToggleConcern={handleToggleConcern}
                  onSelectAllConcerns={handleSelectAllConcerns}
                  onResetToGeneral={handleResetToGeneral}
                  isSpecificIllnessMode={isSpecificIllnessMode}
                  setIsSpecificIllnessMode={setIsSpecificIllnessMode}
                />

                <div className="border-t border-slate-100" />

                {/* Precision Filters: Environment, Urgency, Trigger, Role */}
                <PrecisionFiltersBar
                  setting={setting}
                  onSelectSetting={setSetting}
                  symptomStage={symptomStage}
                  onSelectStage={setSymptomStage}
                  triggerType={triggerType}
                  onSelectTrigger={setTriggerType}
                  perspective={perspective}
                  onSelectPerspective={setPerspective}
                  onResetPrecision={handleResetPrecision}
                  isOpen={isPrecisionOpen}
                  onToggleOpen={() => setIsPrecisionOpen((prev) => !prev)}
                />
              </div>

              {/* Step 4: Article Recommendation Results & Search Bar */}
              <div className="space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                        Step 4
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500 font-medium">
                        Live Precision Match Engine
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 font-heading">
                      Curated Health & Wellness Guides
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Found <strong className="text-slate-900 font-semibold">{filteredArticles.length}</strong> targeted guides matching your criteria (Guaranteed 3+ relevant guides for every filter combination)
                    </p>
                  </div>

                  {/* Search Bar & Sort Dropdown */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-72 pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Sorting Control */}
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700">
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-transparent focus:outline-hidden cursor-pointer"
                      >
                        <option value="relevance">{t.sortRelevance}</option>
                        <option value="readTime">{t.sortReadTime}</option>
                        <option value="newest">{t.sortNewest}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Active Filters Summary Strip */}
                <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-500">Active Criteria:</span>
                  
                  {/* Age */}
                  <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 font-medium">
                    Age:{' '}
                    {selectedAge === 'all'
                      ? 'All Ages'
                      : AGE_GROUPS.find((g) => g.id === selectedAge)?.label || selectedAge}
                  </span>

                  {/* Season */}
                  <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 font-medium">
                    Season:{' '}
                    {selectedSeason === 'all'
                      ? 'All Seasons'
                      : SEASONS.find((s) => s.id === selectedSeason)?.label || selectedSeason}
                  </span>

                  {/* Concerns */}
                  <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 font-medium">
                    Focus:{' '}
                    {!isSpecificIllnessMode
                      ? 'General Wellness'
                      : selectedConcerns
                          .map((c) => HEALTH_CONCERNS.find((hc) => hc.id === c)?.label || c)
                          .join(', ')}
                  </span>

                  {/* Dietary Preference */}
                  {dietaryPreference !== 'all' && (
                    <span className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 ${
                      dietaryPreference === 'vegetarian'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-amber-50 text-amber-800'
                    }`}>
                      <span>Diet: {dietaryPreference === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                      <button onClick={() => setDietaryPreference('all')} className="hover:opacity-75">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Environment */}
                  {setting !== 'all' && (
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 font-medium flex items-center gap-1">
                      <span>Setting: {SETTING_OPTIONS.find((s) => s.id === setting)?.label}</span>
                      <button onClick={() => setSetting('all')} className="hover:text-blue-950">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Stage */}
                  {symptomStage !== 'all' && (
                    <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 font-medium flex items-center gap-1">
                      <span>Stage: {SYMPTOM_STAGE_OPTIONS.find((s) => s.id === symptomStage)?.label}</span>
                      <button onClick={() => setSymptomStage('all')} className="hover:text-purple-950">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Trigger */}
                  {triggerType !== 'all' && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 font-medium flex items-center gap-1">
                      <span>Trigger: {TRIGGER_TYPE_OPTIONS.find((t) => t.id === triggerType)?.label}</span>
                      <button onClick={() => setTriggerType('all')} className="hover:text-amber-950">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Perspective */}
                  {perspective !== 'all' && (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-medium flex items-center gap-1">
                      <span>Role: {PERSPECTIVE_OPTIONS.find((p) => p.id === perspective)?.label}</span>
                      <button onClick={() => setPerspective('all')} className="hover:text-emerald-950">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {(selectedAge !== 'all' ||
                    selectedSeason !== 'all' ||
                    dietaryPreference !== 'all' ||
                    searchQuery ||
                    setting !== 'all' ||
                    symptomStage !== 'all' ||
                    triggerType !== 'all' ||
                    perspective !== 'all' ||
                    selectedConcerns.length > 0) && (
                    <button
                      onClick={handleClearFilters}
                      className="ml-auto text-xs text-slate-500 hover:text-rose-700 underline flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset all filters</span>
                    </button>
                  )}
                </div>

                {/* Article Cards Grid */}
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onReadFull={(art) => setActiveArticle(art)}
                        isSaved={savedArticleIds.includes(article.id)}
                        onToggleSave={handleToggleSave}
                      />
                    ))}
                  </div>
                ) : (
                  /* Zero Match State */
                  <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4 max-w-lg mx-auto">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
                      <Filter className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900 font-heading">
                        No articles match this exact combination
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Try switching to &quot;All Ages&quot; or clearing the precision filters to view broader wellness recommendations.
                      </p>
                    </div>
                    <button
                      onClick={handleClearFilters}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Filters & Show All</span>
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Article Reader Modal */}
      <ArticleReaderModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        isSaved={activeArticle ? savedArticleIds.includes(activeArticle.id) : false}
        onToggleSave={handleToggleSave}
        onOpenGlossaryTerm={(term) => {
          setSelectedGlossaryTerm(term);
          setIsGlossaryOpen(true);
        }}
      />

      {/* Medical Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        initialTerm={selectedGlossaryTerm}
        onSelectArticleById={handleSelectArticleById}
      />

      {/* Emergency Warning Signs Modal */}
      <EmergencyGuideModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      {/* Indian Emergency & Health Helplines Directory Modal */}
      <IndianHelplinesModal
        isOpen={isHelplinesOpen}
        onClose={() => setIsHelplinesOpen(false)}
      />

      {/* Floating Cute Doctor Health Companion Bot (Always accessible in bottom right corner) */}
      <FloatingCompanionBot
        currentAge={selectedAge}
        currentSeason={selectedSeason}
        dietaryPreference={dietaryPreference}
        isOpenControlled={isFloatingBotOpen ? true : undefined}
        onCloseControlled={() => setIsFloatingBotOpen(false)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenHelplines={() => setIsHelplinesOpen(true)}
      />

      {/* Clean Footer */}
      <Footer
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenHelplines={() => setIsHelplinesOpen(true)}
        onOpenGlossary={() => {
          setSelectedGlossaryTerm(null);
          setIsGlossaryOpen(true);
        }}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
