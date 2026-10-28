export type Language = 'en' | 'hi';

export interface Translations {
  appName: string;
  appTagline: string;
  // Nav
  navGuides: string;
  navSymptoms: string;
  navSleep: string;
  navCompanion: string;
  navBmi: string;
  navPrevention: string;
  navGlossary: string;
  navSaved: string;
  navHelplines: string;
  navWarningSigns: string;
  langSwitchLabel: string;
  langSwitchTooltip: string;

  // Hero
  heroTag: string;
  heroYearBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroBadgeReviewed: string;
  heroBadgeAges: string;
  heroBadgeDiet: string;
  heroQuickProfiles: string;
  heroResetToAll: string;
  heroReviewedByPeds: string;
  heroPedsTrustCopy: string;
  heroSeasonAdvisoryPrefix: string;

  // Diet
  dietSectionTitle: string;
  dietFilterBadge: string;
  dietSectionSubtitle: string;
  dietAll: string;
  dietVeg: string;
  dietNonVeg: string;
  dietTooltip: string;

  // Steps
  step1Badge: string;
  step1Title: string;
  step1Desc: string;
  step2Badge: string;
  step2Title: string;
  step2Desc: string;
  step3Badge: string;
  step3Title: string;
  step3Desc: string;
  step3SubtextSpecific: string;
  step3SubtextGeneral: string;
  step3ModeGeneral: string;
  step3ModeSpecific: string;
  step3SelectAll: string;
  step4Badge: string;
  step4Subtag: string;
  step4Title: string;
  step4CountPrefix: string;
  step4CountSuffix: string;

  // Precision filters
  filtersLabel: string;
  filtersSubtitle: string;
  filtersActive: string;
  filtersReset: string;
  filterEnvLabel: string;
  filterEnvTip: string;
  filterStageLabel: string;
  filterStageTip: string;
  filterTriggerLabel: string;
  filterTriggerTip: string;
  filterRoleLabel: string;
  filterRoleTip: string;
  searchPlaceholder: string;
  sortBy: string;
  sortRelevance: string;
  sortReadTime: string;
  sortNewest: string;
  noArticlesFound: string;
  noArticlesDesc: string;
  resetFiltersBtn: string;

  // Active filters bar labels
  activeCriteriaLabel: string;
  prefixAge: string;
  prefixSeason: string;
  prefixFocus: string;
  prefixDiet: string;
  prefixSetting: string;
  prefixStage: string;
  prefixTrigger: string;
  prefixRole: string;
  labelAllAges: string;
  labelAllSeasons: string;
  labelGeneralWellness: string;
  labelVegetarian: string;
  labelNonVegetarian: string;

  // Article Cards & Reader
  readFullGuide: string;
  minRead: string;
  keyTip: string;
  saveArticle: string;
  savedArticle: string;
  shareArticle: string;
  copiedLink: string;
  printArticle: string;
  closeGuide: string;
  readerGuideHeader: string;
  readerKeyTakeaways: string;
  readerDietaryAdaptations: string;
  readerVegProtocol: string;
  readerNonVegProtocol: string;
  readerMedicalTerms: string;
  readerTapTermTip: string;
  readerChecklistTitle: string;
  readerChecklistSubtext: string;
  readerChecklistDone: string;
  readerRedFlagsTitle: string;
  readerRedFlagsIntro: string;
  readerRedFlagsCallNotice: string;
  readerHomeCareTitle: string;
  readerMedicalDisclaimerLabel: string;
  readerMedicalDisclaimerText: string;
  readerReviewedBy: string;
  readerDoneReading: string;

  // Floating Companion Bot
  botTitle: string;
  botRole: string;
  botOnline: string;
  botGreetingBubble: string;
  botInputPlaceholder: string;
  botSend: string;
  botDisclaimer: string;
  botAskMeAbout: string;
  botClearChat: string;
  botMinimize: string;
  botExpand: string;
  botInitialMessage: string;

  // Helplines modal
  helplineModalTitle: string;
  helplineModalSubtitle: string;
  helplineOfficialBadge: string;
  helplineSearchPlaceholder: string;
  helplineTipTitle: string;
  helplineTipText: string;
  helplineCallNow: string;
  helplineTollFree: string;
  helplineCommonReasons: string;
  helplineClose: string;

  // Emergency Guide
  emergencyTitle: string;
  emergencySubtitle: string;
  emergencyBannerTitle: string;
  emergency247Badge: string;
  emergencyCloseBtn: string;

  // Saved Section
  savedHeaderBadge: string;
  savedTitle: string;
  savedSubtitle: string;
  savedBrowseMore: string;
  savedClearAll: string;
  savedEmptyTitle: string;
  savedEmptyDesc: string;
  savedExploreBtn: string;

  // Toasts
  toastArticleSaved: string;
  toastArticleRemoved: string;
  toastAllSavedCleared: string;
  toastProfileLoaded: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'HealthPulse',
    appTagline: 'Youth & Family Wellness',
    navGuides: 'Filter Guides',
    navSymptoms: 'Symptom Tracker',
    navSleep: 'Sleep Tracker',
    navCompanion: 'Companion AI',
    navBmi: 'BMI Screener',
    navPrevention: 'Prevention Tips',
    navGlossary: 'Glossary',
    navSaved: 'Saved',
    navHelplines: 'Indian Helplines (112/108)',
    navWarningSigns: 'Warning Signs',
    langSwitchLabel: '🇮🇳 हिंदी',
    langSwitchTooltip: 'Switch language to Hindi (हिंदी में बदलें)',

    heroTag: 'Pediatric & Family Clinical Guidance',
    heroYearBadge: '2026 Clinical Updates',
    heroTitle1: 'Youth & Family Health',
    heroTitle2: 'Intelligence for Every Age',
    heroSubtitle:
      'Evidence-based pediatric and adolescent wellness guides tailored to age brackets, seasonal climate, dietary preferences, and daily routines.',
    heroBadgeReviewed: 'Clinically Reviewed',
    heroBadgeAges: '7 Age Brackets (5 to 50+)',
    heroBadgeDiet: 'Dietary Adapted',
    heroQuickProfiles: 'Quick Family Profiles',
    heroResetToAll: 'Reset to All Guides',
    heroReviewedByPeds: 'Reviewed by Board-Certified Pediatric Specialists',
    heroPedsTrustCopy: 'Practical, zero-alarmist guidance designed to help families make proactive, calm medical decisions.',
    heroSeasonAdvisoryPrefix: 'Active Season Advisory',

    dietSectionTitle: 'Dietary & Nutritional Preference',
    dietFilterBadge: 'Filter',
    dietSectionSubtitle: "Tailor immune nutrition, anti-inflammatory proteins, and recovery broths to your family's diet.",
    dietAll: 'All Lifestyles',
    dietVeg: 'Vegetarian Only (100% शाकाहारी)',
    dietNonVeg: 'Non-Vegetarian / Mixed',
    dietTooltip: 'Toggle to filter articles with plant-based or protein-adapted advice',

    step1Badge: 'Step 1',
    step1Title: 'Select Age Bracket',
    step1Desc: 'Clinical protocols adapt significantly between early childhood, teens, and adults',
    step2Badge: 'Step 2',
    step2Title: 'Select Season & Climate Triggers',
    step2Desc: 'Weather shifts trigger allergic rhinitis, asthma flare-ups, and skin dryness',
    step3Badge: 'Step 3',
    step3Title: 'Potential Allergy or Health Concern',
    step3Desc: 'Select specific topics or explore general preventive wellness',
    step3SubtextSpecific: 'Select one or multiple conditions to curate targeted clinical recommendations. (Multi-select enabled)',
    step3SubtextGeneral: 'Showing holistic preventative health, everyday nutrition, and seasonal habits. Toggle to filter specific chronic or acute concerns.',
    step3ModeGeneral: 'General Wellness',
    step3ModeSpecific: 'Allergy & Illness Filter',
    step3SelectAll: 'Select All',
    step4Badge: 'Step 4',
    step4Subtag: 'Live Precision Match Engine',
    step4Title: 'Curated Health & Wellness Guides',
    step4CountPrefix: 'Found',
    step4CountSuffix: 'targeted guides matching your criteria (Guaranteed 3+ relevant guides for every filter combination)',

    filtersLabel: 'Precision Clinical Filters',
    filtersSubtitle: 'Filter by Environment, Urgency Stage, Trigger Source & Reader Role',
    filtersActive: 'Active Filters',
    filtersReset: 'Reset Precision',
    filterEnvLabel: '1. Environment',
    filterEnvTip: 'Target advice for classroom, sports, bedroom, or dining.',
    filterStageLabel: '2. Urgency Stage',
    filterStageTip: 'Daily prevention vs. active midnight symptom care.',
    filterTriggerLabel: '3. Specific Trigger',
    filterTriggerTip: 'Pollen clouds, food allergens, dust mites, or cold weather.',
    filterRoleLabel: '4. Reader Role',
    filterRoleTip: 'Youth self-care empowerment vs. parental dosing & triage.',
    searchPlaceholder: 'Search health topics, allergies, fever, sleep...',
    sortBy: 'Sort by',
    sortRelevance: 'Most Relevant',
    sortReadTime: 'Quick Reads',
    sortNewest: 'Recently Updated',
    noArticlesFound: 'No articles match this exact combination',
    noArticlesDesc: 'Try switching to All Ages or clearing precision filters to view broader wellness recommendations.',
    resetFiltersBtn: 'Reset Filters & Show All',

    activeCriteriaLabel: 'Active Criteria:',
    prefixAge: 'Age:',
    prefixSeason: 'Season:',
    prefixFocus: 'Focus:',
    prefixDiet: 'Diet:',
    prefixSetting: 'Setting:',
    prefixStage: 'Stage:',
    prefixTrigger: 'Trigger:',
    prefixRole: 'Role:',
    labelAllAges: 'All Ages',
    labelAllSeasons: 'All Seasons',
    labelGeneralWellness: 'General Wellness',
    labelVegetarian: 'Vegetarian',
    labelNonVegetarian: 'Non-Vegetarian',

    readFullGuide: 'Read Full Guide',
    minRead: 'min read',
    keyTip: 'Key Tip:',
    saveArticle: 'Save',
    savedArticle: 'Saved',
    shareArticle: 'Share',
    copiedLink: 'Copied!',
    printArticle: 'Print',
    closeGuide: 'Close guide',
    readerGuideHeader: 'HealthPulse Clinical Guide',
    readerKeyTakeaways: 'Key Actionable Takeaways',
    readerDietaryAdaptations: 'Dietary Adaptations (Vegetarian & Non-Vegetarian)',
    readerVegProtocol: '🌿 Vegetarian Protocol:',
    readerNonVegProtocol: '🥩 Non-Vegetarian Protocol:',
    readerMedicalTerms: 'Medical Terms Defined in This Guide',
    readerTapTermTip: 'Tap term for quick definition',
    readerChecklistTitle: 'Interactive Household Action Checklist',
    readerChecklistSubtext: 'Tap to mark off completed proactive habits for this season.',
    readerChecklistDone: 'Done',
    readerRedFlagsTitle: 'When to Seek Immediate Medical Attention',
    readerRedFlagsIntro: 'Do not wait for office hours if you observe any of the following clinical signs:',
    readerRedFlagsCallNotice: 'In severe respiratory distress or anaphylaxis, call 112/108 (India) or 911 immediately.',
    readerHomeCareTitle: 'Calm Home Comfort Measures',
    readerMedicalDisclaimerLabel: 'Medical Disclaimer:',
    readerMedicalDisclaimerText: 'HealthPulse Guide provides educational health and seasonal wellness information for parents and youth. It is not a substitute for professional pediatric diagnosis, clinical medical advice, or individualized emergency treatment. Always consult a qualified physician regarding medical symptoms.',
    readerReviewedBy: 'Reviewed by',
    readerDoneReading: 'Done Reading',

    botTitle: 'Dr. Joy 🩺',
    botRole: 'Pediatric & Family Health Companion',
    botOnline: 'Active • AI Clinical Guidance',
    botGreetingBubble: 'Hi! Ask Dr. Joy 🩺',
    botInputPlaceholder: 'Ask Dr. Joy about symptoms, fever, diet, sleep...',
    botSend: 'Send',
    botDisclaimer: 'Educational guidance only. In emergency, immediately dial 112 or 108.',
    botAskMeAbout: 'Suggested questions for Dr. Joy:',
    botClearChat: 'Clear history',
    botMinimize: 'Minimize',
    botExpand: 'Open Chat',
    botInitialMessage: `👋 **Hello! I am Dr. Joy**, your pediatric and family health guidance companion.

I can help you:
- **Examine symptoms** like cough, fever, rashes, and seasonal allergies.
- **Review sleep patterns** and circadian rest routines.
- **Provide age-specific wellness advice** for youth and adults.
- **Identify warning signs** requiring in-person doctor consultation.

What health question can I help you or your family with today?`,

    helplineModalTitle: 'National Indian Health & Emergency Helplines',
    helplineModalSubtitle: 'Official, 24/7 toll-free government response numbers for medical ambulance dispatch, pediatric distress, Tele-MANAS counseling, and AIIMS poison guidance.',
    helplineOfficialBadge: 'Official Emergency Health Directory · India',
    helplineSearchPlaceholder: 'Search by number or concern (e.g. 108, ambulance, fever, poison, child, mental health)...',
    helplineTipTitle: 'Emergency Calling Tip:',
    helplineTipText: 'All numbers below are toll-free and can be dialed from any mobile or landline across India without a local area code prefix.',
    helplineCallNow: 'Call Now',
    helplineTollFree: 'Toll-Free',
    helplineCommonReasons: 'Common Triage Reasons:',
    helplineClose: 'Close Directory',

    emergencyTitle: 'Emergency Warning Signs Triage',
    emergencySubtitle: 'When to seek immediate emergency care or call 112/108',
    emergencyBannerTitle: 'Emergency Hotlines & Immediate Dispatch',
    emergency247Badge: 'Toll-Free 24/7',
    emergencyCloseBtn: 'I Understand & Close',

    savedHeaderBadge: 'Personal Health Library',
    savedTitle: 'Saved Articles & Health Guides',
    savedSubtitle: 'Bookmarked guides for quick offline retrieval during seasonal changes, doctor visits, or sports practices.',
    savedBrowseMore: 'Browse More Guides',
    savedClearAll: 'Clear Saved',
    savedEmptyTitle: 'No articles saved yet',
    savedEmptyDesc: 'When browsing through the seasonal guides, tap the bookmark icon on any card or inside the full reader to save it here for immediate retrieval.',
    savedExploreBtn: 'Explore Filtered Guides',

    toastArticleSaved: 'Article saved to your library!',
    toastArticleRemoved: 'Article removed from saved guides',
    toastAllSavedCleared: 'All saved articles removed',
    toastProfileLoaded: 'Loaded profile:',
  },

  hi: {
    appName: 'हेल्थपल्स',
    appTagline: 'युवा एवं पारिवारिक स्वास्थ्य',
    navGuides: 'फ़िल्टर गाइड्स',
    navSymptoms: 'लक्षण ट्रैकर',
    navSleep: 'नींद ट्रैकर',
    navCompanion: 'साथी डॉक्टर',
    navBmi: 'बीएमआई कैलकुलेटर',
    navPrevention: 'बचाव सुझाव',
    navGlossary: 'चिकित्सा शब्दावली',
    navSaved: 'सहेजे गए',
    navHelplines: 'भारतीय हेल्पलाइन (112/108)',
    navWarningSigns: 'खतरे के संकेत',
    langSwitchLabel: '🇬🇧 English',
    langSwitchTooltip: 'Switch language to English (अंग्रेजी में बदलें)',

    heroTag: 'प्रमाणित बाल एवं पारिवारिक स्वास्थ्य परामर्श',
    heroYearBadge: '2026 चिकित्सकीय अपडेट',
    heroTitle1: 'युवा एवं पारिवारिक स्वास्थ्य',
    heroTitle2: 'हर उम्र के लिए सटीक मार्गदर्शन',
    heroSubtitle:
      'आयु वर्ग, मौसमी बदलाव, खानपान की प्राथमिकताओं और दिनचर्या के अनुसार प्रमाणित बाल एवं युवा स्वास्थ्य मार्गदर्शिका।',
    heroBadgeReviewed: 'चिकित्सकीय रूप से परीक्षित',
    heroBadgeAges: '7 आयु वर्ग (5 से 50+ वर्ष)',
    heroBadgeDiet: 'आहार अनुसार अनुकूलित',
    heroQuickProfiles: 'त्वरित पारिवारिक प्रोफाइल',
    heroResetToAll: 'सभी गाइड देखें',
    heroReviewedByPeds: 'प्रमाणित बाल रोग विशेषज्ञों द्वारा चिकित्सकीय रूप से समीक्षित',
    heroPedsTrustCopy: 'व्यावहारिक और शांत मार्गदर्शन, ताकि आपका परिवार आत्मविश्वास के साथ सही चिकित्सकीय निर्णय ले सके।',
    heroSeasonAdvisoryPrefix: 'वर्तमान मौसम सलाह',

    dietSectionTitle: 'आहार एवं पोषण प्राथमिकता',
    dietFilterBadge: 'फ़िल्टर',
    dietSectionSubtitle: 'रोग प्रतिरोधक क्षमता, प्रोटीन और पुनर्प्राप्ति आहार को अपनी पारिवारिक जीवनशैली के अनुसार अनुकूलित करें।',
    dietAll: 'सभी आहार',
    dietVeg: 'केवल शाकाहारी (100% शाकाहारी)',
    dietNonVeg: 'मांसाहारी / मिश्रित आहार',
    dietTooltip: 'शाकाहारी या मिश्रित पोषण सलाह देखने के लिए चुनें',

    step1Badge: 'चरण 1',
    step1Title: 'आयु वर्ग चुनें',
    step1Desc: 'बचपन, किशोरावस्था और वयस्कों के लिए स्वास्थ्य सावधानियां और दवाएं भिन्न होती हैं',
    step2Badge: 'चरण 2',
    step2Title: 'मौसम एवं जलवायु ट्रिगर्स चुनें',
    step2Desc: 'मौसम में बदलाव से एलर्जी, खांसी, दमा और त्वचा का रूखापन बढ़ सकता है',
    step3Badge: 'चरण 3',
    step3Title: 'स्वास्थ्य समस्या या एलर्जी चुनें',
    step3Desc: 'विशिष्ट विषय चुनें या सामान्य निवारक स्वास्थ्य जानकारी देखें',
    step3SubtextSpecific: 'लक्षित स्वास्थ्य सिफारिशें देखने के लिए एक या अधिक स्थितियां चुनें। (बहु-चयन उपलब्ध)',
    step3SubtextGeneral: 'दैनिक पोषण, संपूर्ण स्वास्थ्य और मौसमी आदतों का समग्र विवरण। विशिष्ट बीमारी चुनने के लिए ऊपर टॉगल करें।',
    step3ModeGeneral: 'सामान्य स्वास्थ्य',
    step3ModeSpecific: 'एलर्जी एवं बीमारी फ़िल्टर',
    step3SelectAll: 'सभी चुनें',
    step4Badge: 'चरण 4',
    step4Subtag: 'लाइव प्रिसिजन मैच इंजन',
    step4Title: 'चयनित स्वास्थ्य एवं आरोग्य मार्गदर्शिकाएं',
    step4CountPrefix: 'आपके चयन के अनुसार',
    step4CountSuffix: 'मार्गदर्शिकाएं उपलब्ध हैं (हर संयोजन के लिए 3+ उपयोगी गाइड सुनिश्चित)',

    filtersLabel: 'सटीक नैदानिक फ़िल्टर (Precision Filters)',
    filtersSubtitle: 'वातावरण, तात्कालिकता चरण, ट्रिगर और पाठक की भूमिका के अनुसार फ़िल्टर करें',
    filtersActive: 'सक्रिय फ़िल्टर',
    filtersReset: 'सटीक फ़िल्टर हटाएं',
    filterEnvLabel: '1. वातावरण (स्थान)',
    filterEnvTip: 'कक्षा, खेल के मैदान, बेडरूम या भोजन यात्रा के लिए सुझाव।',
    filterStageLabel: '2. तात्कालिकता चरण',
    filterStageTip: 'दैनिक रोकथाम बनाम मध्यरात्रि के सक्रिय लक्षण।',
    filterTriggerLabel: '3. विशिष्ट ट्रिगर',
    filterTriggerTip: 'हवा में परागकण, खाद्य एलर्जी, धूल या अत्यधिक ठंड।',
    filterRoleLabel: '4. पाठक भूमिका',
    filterRoleTip: 'युवाओं की स्वयं-देखभाल बनाम माता-पिता द्वारा खुराक प्रबंधन।',
    searchPlaceholder: 'स्वास्थ्य विषय, एलर्जी, बुखार, नींद, त्वचा आदि खोजें...',
    sortBy: 'क्रमबद्ध करें',
    sortRelevance: 'सबसे प्रासंगिक',
    sortReadTime: 'कम समय में पढ़ने योग्य',
    sortNewest: 'हाल ही में अपडेटेड',
    noArticlesFound: 'इस फ़िल्टर संयोजन के लिए कोई लेख नहीं मिला',
    noArticlesDesc: 'कृपया "सभी आयु" चुनें या अधिक स्वास्थ्य परामर्श देखने के लिए फ़िल्टर हटाएं।',
    resetFiltersBtn: 'फ़िल्टर हटाएं और सभी गाइड देखें',

    activeCriteriaLabel: 'सक्रिय फ़िल्टर:',
    prefixAge: 'आयु:',
    prefixSeason: 'मौसम:',
    prefixFocus: 'मुख्य विषय:',
    prefixDiet: 'आहार:',
    prefixSetting: 'स्थान:',
    prefixStage: 'चरण:',
    prefixTrigger: 'ट्रिगर:',
    prefixRole: 'भूमिका:',
    labelAllAges: 'सभी आयु वर्ग',
    labelAllSeasons: 'सभी मौसम',
    labelGeneralWellness: 'सामान्य स्वास्थ्य',
    labelVegetarian: 'शाकाहारी',
    labelNonVegetarian: 'मांसाहारी',

    readFullGuide: 'पूरी गाइड पढ़ें',
    minRead: 'मिनट का पठन',
    keyTip: 'मुख्य सुझाव:',
    saveArticle: 'सहेजें',
    savedArticle: 'सहेजा गया',
    shareArticle: 'साझा करें',
    copiedLink: 'लिंक कॉपी हुआ!',
    printArticle: 'प्रिंट करें',
    closeGuide: 'गाइड बंद करें',
    readerGuideHeader: 'हेल्थपल्स क्लिनिकल गाइड',
    readerKeyTakeaways: 'प्रमुख व्यावहारिक मुख्य बिंदु',
    readerDietaryAdaptations: 'आहार अनुकूलन (शाकाहारी एवं मांसाहारी प्रोटोकॉल)',
    readerVegProtocol: '🌿 शाकाहारी प्रोटोकॉल:',
    readerNonVegProtocol: '🥩 मांसाहारी प्रोटोकॉल:',
    readerMedicalTerms: 'इस गाइड में प्रयुक्त चिकित्सा शब्दावली',
    readerTapTermTip: 'परिभाषा देखने के लिए शब्द पर टैप करें',
    readerChecklistTitle: 'इंटरैक्टिव घरेलू कार्य चेकलिस्ट',
    readerChecklistSubtext: 'इस मौसम के लिए पूर्ण की गई सावधानियों पर टिक करें।',
    readerChecklistDone: 'पूर्ण',
    readerRedFlagsTitle: 'तुरंत चिकित्सकीय सहायता कब लें (खतरे के संकेत)',
    readerRedFlagsIntro: 'यदि निम्नलिखित में से कोई भी नैदानिक लक्षण दिखाई दे तो क्लिनिक खुलने का इंतजार न करें:',
    readerRedFlagsCallNotice: 'गंभीर सांस की तकलीफ या तीव्र एलर्जी में तुरंत 112 या 108 डायल करें।',
    readerHomeCareTitle: 'घर पर प्राथमिक आराम के उपाय',
    readerMedicalDisclaimerLabel: 'चिकित्सीय अस्वीकरण (Medical Disclaimer):',
    readerMedicalDisclaimerText: 'हेल्थपल्स केवल शैक्षिक स्वास्थ्य एवं मौसमी कल्याण जानकारी प्रदान करता है। यह किसी पेशेवर बाल रोग विशेषज्ञ के निदान, आपातकालीन उपचार या चिकित्सीय सलाह का विकल्प नहीं है। गंभीर लक्षणों पर हमेशा योग्य डॉक्टर से परामर्श लें।',
    readerReviewedBy: 'समीक्षित द्वारा:',
    readerDoneReading: 'पढ़ना पूरा हुआ',

    botTitle: 'डॉ. जॉय 🩺',
    botRole: 'बाल एवं पारिवारिक स्वास्थ्य साथी',
    botOnline: 'सक्रिय • एआई स्वास्थ्य परामर्श',
    botGreetingBubble: 'नमस्ते! डॉ. जॉय से पूछें 🩺',
    botInputPlaceholder: 'लक्षण, बुखार, खानपान या नींद के बारे में पूछें...',
    botSend: 'भेजें',
    botDisclaimer: 'केवल शैक्षणिक सलाह। आपातकालीन स्थिति में तुरंत 112 या 108 पर कॉल करें।',
    botAskMeAbout: 'डॉ. जॉय से पूछे जाने वाले प्रमुख प्रश्न:',
    botClearChat: 'बातचीत साफ़ करें',
    botMinimize: 'छोटा करें',
    botExpand: 'चैट खोलें',
    botInitialMessage: `👋 **नमस्ते! मैं डॉ. जॉय हूँ**, आपकी बाल एवं पारिवारिक स्वास्थ्य साथी।

मैं आपकी मदद कर सकती हूँ:
- **लक्षणों का विश्लेषण**: सूखी खांसी, मौसमी बुखार, एलर्जी और चकत्ते।
- **नींद की गुणवत्ता**: बच्चों और युवाओं के लिए नियमित सोने की आदतें।
- **आयु-विशिष्ट सलाह**: 5 से 50+ वर्ष तक के सदस्यों के लिए उचित पोषण व देखभाल।
- **खतरे के संकेत**: कब तुरंत बाल रोग विशेषज्ञ या डॉक्टर के पास जाना चाहिए।

आज मैं आपके या आपके परिवार के स्वास्थ्य के लिए क्या मदद कर सकती हूँ?`,

    helplineModalTitle: 'भारतीय आपातकालीन एवं स्वास्थ्य हेल्पलाइन निर्देशिका',
    helplineModalSubtitle: 'भारत सरकार द्वारा संचालित 24/7 निःशुल्क आपातकालीन एम्बुलेंस, बाल सहायता, टेली-मानस मानसिक स्वास्थ्य एवं एम्स विष परामर्श नंबर।',
    helplineOfficialBadge: 'आधिकारिक आपातकालीन स्वास्थ्य निर्देशिका · भारत',
    helplineSearchPlaceholder: 'नंबर या समस्या खोजें (उदा. 108, एम्बुलेंस, बुखार, जहर, बच्चा, मानसिक स्वास्थ्य)...',
    helplineTipTitle: 'आपातकालीन कॉलिंग टिप:',
    helplineTipText: 'नीचे दिए गए सभी नंबर 100% निःशुल्क (टोल-फ्री) हैं और भारत में किसी भी मोबाइल या लैंडलाइन से बिना एसटीडी कोड के डायल किए जा सकते हैं।',
    helplineCallNow: 'तुरंत कॉल करें',
    helplineTollFree: 'निःशुल्क (Toll-Free)',
    helplineCommonReasons: 'कॉल करने के मुख्य कारण:',
    helplineClose: 'निर्देशिका बंद करें',

    emergencyTitle: 'आपातकालीन खतरे के संकेत (Triage Guide)',
    emergencySubtitle: 'कब तुरंत आपातकालीन अस्पताल जाएं या 112/108 डायल करें',
    emergencyBannerTitle: 'आपातकालीन हॉटलाइन एवं त्वरित सहायता',
    emergency247Badge: 'निःशुल्क 24/7',
    emergencyCloseBtn: 'मैं समझ गया / बंद करें',

    savedHeaderBadge: 'व्यक्तिगत स्वास्थ्य पुस्तकालय',
    savedTitle: 'सहेजे गए लेख एवं स्वास्थ्य गाइड',
    savedSubtitle: 'मौसम बदलने, डॉक्टर की यात्रा या खेल अभ्यास के दौरान त्वरित संदर्भ के लिए बुकमार्क किए गए लेख।',
    savedBrowseMore: 'अधिक गाइड देखें',
    savedClearAll: 'सहेजे गए हटाएं',
    savedEmptyTitle: 'अभी तक कोई गाइड सहेजी नहीं गई है',
    savedEmptyDesc: 'गाइड पढ़ते समय कार्ड पर या लेख के अंदर बुकमार्क आइकन पर टैप करें ताकि वह तुरंत यहां सुरक्षित हो जाए।',
    savedExploreBtn: 'सभी गाइड ब्राउज़ करें',

    toastArticleSaved: 'लेख आपकी लाइब्रेरी में सहेज लिया गया!',
    toastArticleRemoved: 'लेख सहेजे गए लेखों से हटा दिया गया',
    toastAllSavedCleared: 'सभी सहेजे गए लेख हटा दिए गए',
    toastProfileLoaded: 'प्रोफ़ाइल लोड हुई:',
  },
};
