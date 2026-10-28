import {
  AgeGroupId,
  SeasonId,
  HealthConcernId,
  AgeGroupInfo,
  SeasonInfo,
  HealthConcernInfo,
  FilterOption,
  EnvironmentSettingId,
  SymptomStageId,
  TriggerTypeId,
  PerspectiveId,
  Article,
  FamilyProfile,
} from '../types';

import imgSpringAllergies from '../assets/images/article_spring_allergies_1793205877764.jpg';
import imgSummerHydration from '../assets/images/article_summer_hydration_1793205879655.jpg';
import imgWinterSkincare from '../assets/images/article_winter_skincare_1793205878530.jpg';
import imgHeroHealthpulse from '../assets/images/hero_healthpulse_1793205877436.jpg';
import imgAsthmaLungs from '../assets/images/article_asthma_lungs_1793207984351.jpg';
import imgFoodAllergyDining from '../assets/images/article_food_allergy_dining_1793207984301.jpg';
import imgFluImmunity from '../assets/images/article_flu_immunity_1793207983004.jpg';
import imgMatureWellness from '../assets/images/article_mature_wellness_1793207983675.jpg';

export const AGE_GROUPS: AgeGroupInfo[] = [
  {
    id: '5-9',
    label: '5–9 Years',
    category: 'Kids',
    description: 'School-age immune building, playground allergies, childhood asthma, and hydration habits.',
    iconName: 'Smile',
    focusHighlights: ['School allergen triggers', 'Safe medication delivery', 'Hand hygiene & flu defense'],
  },
  {
    id: '10-14',
    label: '10–14 Years',
    category: 'Early Teens',
    description: 'Puberty onset, sports breathing endurance, middle school lunch allergens, and developing self-care.',
    iconName: 'Compass',
    focusHighlights: ['Sports asthma safety', 'Self-carrying inhalers & EpiPens', 'Hormonal skin sensitivity'],
  },
  {
    id: '14-18',
    label: '14–18 Years',
    category: 'Late Teens',
    description: 'High school athletics, exam stress immunity, late-night sleep health, and independent allergy management.',
    iconName: 'Sparkles',
    focusHighlights: ['High school sports heat safety', 'Study fatigue & immune balance', 'Restaurant allergen safety'],
  },
  {
    id: '18-25',
    label: '18–25 Years',
    category: 'Young Adults',
    description: 'Campus dorm allergens, cafeteria cross-contamination, fitness conditioning, and independent healthcare.',
    iconName: 'GraduationCap',
    focusHighlights: ['Dorm room mold & dust', 'College dining allergen advocacy', 'Adult asthma monitoring'],
  },
  {
    id: '26-35',
    label: '26–35 Years',
    category: 'New Parents & Adults',
    description: 'Infant/toddler illness triage, adult-onset allergies, postpartum skin changes, and daycare bug waves.',
    iconName: 'Baby',
    focusHighlights: ['Daycare viral exposure', 'Adult-onset pollen rhinitis', 'Workplace ergonomics & stress'],
  },
  {
    id: '36-44',
    label: '36–44 Years',
    category: 'Mid-Adults & Families',
    description: 'Family household air quality, dual-generation caregiving, chronic eczema cycles, and athletic recovery.',
    iconName: 'Users',
    focusHighlights: ['Household allergen isolation', 'Managing school-age sports schedules', 'Chronic cough triage'],
  },
  {
    id: '50+',
    label: '50+ Years',
    category: 'Mature Adults & Seniors',
    description: 'Cold-weather bronchospasm, dry thinning skin barrier, seasonal influenza vaccines, and joint comfort.',
    iconName: 'HeartPulse',
    focusHighlights: ['Cold-weather lung protection', 'Ceramide barrier restoration', 'Immune resilience & flu shots'],
  },
];

export const SEASONS: SeasonInfo[] = [
  {
    id: 'spring',
    label: 'Spring',
    climateTag: 'High Pollen & Allergies',
    description: 'Spiking tree & grass pollen, windblown spores, eye irritation, and reactive airway bronchospasms.',
    iconName: 'Flower2',
    seasonalRisks: ['Tree pollen surge (birch, oak, cedar)', 'Allergic conjunctivitis', 'Spring asthma exacerbations'],
    bannerTip: 'Pollen counts peak between 5:00 AM and 10:00 AM. Keep bedroom windows shut during early morning hours.',
  },
  {
    id: 'summer',
    label: 'Summer',
    climateTag: 'Dehydration & Sun Safety',
    description: 'High UV index, heat exhaustion, playground dehydration, chlorine rashes, insect bites, and summer camp meals.',
    iconName: 'Sun',
    seasonalRisks: ['Rapid pediatric dehydration', 'Sunburn & heat exhaustion', 'Camp cross-contamination allergens'],
    bannerTip: 'Young athletes lose up to 1.5 liters of fluid per hour in high heat. Offer electrolyte water every 20 minutes.',
  },
  {
    id: 'autumn-monsoon',
    label: 'Monsoon / Autumn',
    climateTag: 'Viral Infections & Flu',
    description: 'Back-to-school bug transmission, indoor humidity shifts, mold spore blooms, and early influenza waves.',
    iconName: 'CloudRain',
    seasonalRisks: ['Classroom viral transmission', 'Indoor dampness & mold allergies', 'Seasonal influenza surge'],
    bannerTip: 'Indoor humidity over 50% promotes mold spores. Keep indoor relative humidity between 35% and 45%.',
  },
  {
    id: 'winter',
    label: 'Winter',
    climateTag: 'Cold, Dry Skin & Cough',
    description: 'Sub-zero outdoor air, harsh indoor central heating, dry eczema flare-ups, RSV, and winter viral coughs.',
    iconName: 'Snowflake',
    seasonalRisks: ['Severe skin barrier breakdown & eczema', 'Cold-induced bronchospasm', 'Indoor dust mite concentration'],
    bannerTip: 'Apply thick ceramide ointments within 3 minutes of bathing to seal the skin barrier against dry winter air.',
  },
];

export const HEALTH_CONCERNS: HealthConcernInfo[] = [
  {
    id: 'general-wellness',
    label: 'None / General Wellness',
    description: 'Everyday nutrition, immune system defense, active hydration, and restorative sleep habits.',
    iconName: 'HeartHandshake',
    isIllnessOrAllergy: false,
  },
  {
    id: 'asthma-breathing',
    label: 'Asthma / Breathing',
    description: 'Wheezing, reactive airways, cold-induced coughing, peak flow tracking, and spacer device techniques.',
    iconName: 'Wind',
    isIllnessOrAllergy: true,
  },
  {
    id: 'allergies',
    label: 'Food / Environmental Allergies',
    description: 'Allergic rhinitis, pollen sensitivities, peanut/tree nut alerts, and emergency auto-injector protocols.',
    iconName: 'AlertCircle',
    isIllnessOrAllergy: true,
  },
  {
    id: 'skin-eczema',
    label: 'Skin Issues / Eczema',
    description: 'Atopic dermatitis, dry winter cracking, summer heat rash, contact dermatitis, and barrier creams.',
    iconName: 'Droplet',
    isIllnessOrAllergy: true,
  },
  {
    id: 'flu-cough',
    label: 'Seasonal Flu / Cough',
    description: 'Fever management, respiratory cough relief, viral recovery phases, and doctor visit warning signs.',
    iconName: 'Thermometer',
    isIllnessOrAllergy: true,
  },
  {
    id: 'immunity-nutrition',
    label: 'Immunity & Seasonal Nutrition',
    description: 'Vitamin balance, gut microbiome, zinc-rich foods, and seasonal nutritional defense for active kids.',
    iconName: 'Apple',
    isIllnessOrAllergy: false,
  },
];

export const SETTING_OPTIONS: FilterOption<EnvironmentSettingId>[] = [
  { id: 'all', label: 'All Settings' },
  { id: 'school-work', label: 'School & Workplace', description: 'Desks, cafeterias, classrooms, offices' },
  { id: 'sports-outdoors', label: 'Sports & Outdoors', description: 'Athletic fields, pools, camps, trails' },
  { id: 'home-bedroom', label: 'Home & Bedroom', description: 'Mattresses, HVAC filters, indoor air' },
  { id: 'dining-travel', label: 'Dining & Travel', description: 'Restaurants, dorms, road trips, flights' },
];

export const SYMPTOM_STAGE_OPTIONS: FilterOption<SymptomStageId>[] = [
  { id: 'all', label: 'All Stages' },
  { id: 'prevention', label: 'Daily Prevention', description: 'Proactive routines before symptoms start' },
  { id: 'early-signs', label: 'Early Warning', description: 'First scratchy throat, light sneeze, dry patch' },
  { id: 'active-flare', label: 'Active Flare Care', description: 'Mid-episode relief, fever, acute wheezing' },
  { id: 'recovery', label: 'Recovery & Return', description: 'Post-viral cough, rebuilding gut, returning to sports' },
];

export const TRIGGER_TYPE_OPTIONS: FilterOption<TriggerTypeId>[] = [
  { id: 'all', label: 'All Triggers' },
  { id: 'airborne-pollen', label: 'Airborne Pollen', description: 'Trees, grasses, ragweed, spores' },
  { id: 'food-ingestion', label: 'Food Allergens', description: 'Peanuts, nuts, dairy, sesame, eggs' },
  { id: 'indoor-mites', label: 'Indoor Mites & Mold', description: 'Dust mites, pet dander, bathroom mold' },
  { id: 'physical-climate', label: 'Climate & Heat/Cold', description: 'Sub-zero winds, UV radiation, chlorine' },
];

export const PERSPECTIVE_OPTIONS: FilterOption<PerspectiveId>[] = [
  { id: 'all', label: 'All Perspectives' },
  { id: 'youth-self', label: 'Youth Self-Advocacy', description: 'Direct steps for kids, teens, and young adults' },
  { id: 'parent-caregiver', label: 'Parent & Caregiver', description: 'Medication tracking, triage, home hygiene' },
];

export const AGE_GROUPS_HI: AgeGroupInfo[] = [
  {
    id: '5-9',
    label: '5–9 वर्ष',
    category: 'बच्चे',
    description: 'स्कूली बच्चों में रोग प्रतिरोधक क्षमता, खेल के मैदान में एलर्जी, बाल दमा और पानी पीने की आदतें।',
    iconName: 'Smile',
    focusHighlights: ['स्कूल एलर्जी ट्रिगर्स', 'सुरक्षित दवा सेवन', 'हाथ की स्वच्छता व फ्लू रक्षा'],
  },
  {
    id: '10-14',
    label: '10–14 वर्ष',
    category: 'आरंभिक किशोर',
    description: 'किशोरावस्था की शुरुआत, खेलकूद में सांस की सहनशक्ति, स्कूल भोजन एलर्जी और आत्म-देखभाल।',
    iconName: 'Compass',
    focusHighlights: ['खेलकूद में दमा सुरक्षा', 'स्वयं इनहेलर रखना', 'हार्मोनल त्वचा संवेदनशीलता'],
  },
  {
    id: '14-18',
    label: '14–18 वर्ष',
    category: 'किशोर युवा',
    description: 'हाई स्कूल खेलकूद, परीक्षा तनाव में इम्यूनिटी, देर रात सोने की आदतें और एलर्जी प्रबंधन।',
    iconName: 'Sparkles',
    focusHighlights: ['गर्मी में खेलकूद सुरक्षा', 'थकावट व रोग प्रतिरोधक संतुलन', 'बाहर भोजन एलर्जी सुरक्षा'],
  },
  {
    id: '18-25',
    label: '18–25 वर्ष',
    category: 'युवा वयस्क',
    description: 'कॉलेज हॉस्टल एलर्जी, मेस के भोजन में सुरक्षा, फिटनेस और स्वतंत्र स्वास्थ्य देखभाल।',
    iconName: 'GraduationCap',
    focusHighlights: ['हॉस्टल फफूंद व धूल', 'कॉलेज मेस में एलर्जी सावधानी', 'वयस्क दमा निगरानी'],
  },
  {
    id: '26-35',
    label: '26–35 वर्ष',
    category: 'नए माता-पिता व वयस्क',
    description: 'शिशु-बालक बीमारी ट्राइएज, वयस्कों में नई एलर्जी, प्रसवोत्तर त्वचा बदलाव और काम का तनाव।',
    iconName: 'Baby',
    focusHighlights: ['डेकेयर वायरल संक्रमण', 'वयस्क पराग एलर्जी', 'कार्यस्थल पर तनाव व थकान'],
  },
  {
    id: '36-44',
    label: '36–44 वर्ष',
    category: 'मध्यम आयु व परिवार',
    description: 'घर की वायु गुणवत्ता, परिवार की देखभाल, दीर्घकालिक एक्जिमा और दैनिक स्वास्थ्य दिनचर्या।',
    iconName: 'Users',
    focusHighlights: ['घरेलू एलर्जी रोकथाम', 'बच्चों के खेलकूद व दिनचर्या', 'दीर्घकालिक खांसी देखभाल'],
  },
  {
    id: '50+',
    label: '50+ वर्ष',
    category: 'वरिष्ठ एवं बुजुर्ग',
    description: 'सर्दियों में सांस की नलियों का सिकुड़ना, शुष्क त्वचा, मौसमी फ्लू का टीका और जोड़ों का आराम।',
    iconName: 'HeartPulse',
    focusHighlights: ['सर्दियों में फेफड़ों की सुरक्षा', 'त्वचा का रूखापन रोकना', 'इम्यूनिटी व मौसमी फ्लू टीका'],
  },
];

export const SEASONS_HI: SeasonInfo[] = [
  {
    id: 'spring',
    label: 'वसंत ऋतु',
    climateTag: 'अधिक परागकण व एलर्जी',
    description: 'पेड़-पौधों के परागकण, हवा में उड़ते कण, आंखों में जलन और सांस की एलर्जी।',
    iconName: 'Flower2',
    seasonalRisks: ['पेड़ों से परागकण का फैलाव', 'एलर्जिक कंजंक्टिवाइटिस (आंखों में जलन)', 'वसंत में दमा के दौरे'],
    bannerTip: 'सुबह 5:00 बजे से 10:00 बजे के बीच परागकण सबसे अधिक होते हैं। सुबह के समय बेडरूम की खिड़कियां बंद रखें।',
  },
  {
    id: 'summer',
    label: 'ग्रीष्म ऋतु (गर्मी)',
    climateTag: 'निर्जलीकरण व धूप से बचाव',
    description: 'तीव्र धूप (UV), डिहाइड्रेशन, लू लगना, पसीने की घमौरियां, और गर्मी के शिविर में भोजन।',
    iconName: 'Sun',
    seasonalRisks: ['बच्चों में तेजी से पानी की कमी', 'सनबर्न और लू (हीट एग्जॉशन)', 'शिविरों में खानपान एलर्जी'],
    bannerTip: 'तेज गर्मी में खेलकूद के दौरान बच्चे प्रति घंटे 1.5 लीटर तक पसीना बहाते हैं। हर 20 मिनट में इलेक्ट्रोलाइट या पानी दें।',
  },
  {
    id: 'autumn-monsoon',
    label: 'मानसून / शरद ऋतु',
    climateTag: 'वायरल संक्रमण व फ्लू',
    description: 'स्कूलों में वायरल संक्रमण, सीलन, फफूंद के बीजाणु और मौसमी फ्लू का फैलाव।',
    iconName: 'CloudRain',
    seasonalRisks: ['कक्षाओं में सर्दी-जुकाम का फैलाव', 'घर में नमी और फफूंद एलर्जी', 'मौसमी इन्फ्लुएंजा में वृद्धि'],
    bannerTip: 'घर में 50% से अधिक नमी होने पर फफूंद पनपती है। कमरे में नमी को 35% से 45% के बीच बनाए रखें।',
  },
  {
    id: 'winter',
    label: 'शीत ऋतु (सर्दी)',
    climateTag: 'ठंड, शुष्क त्वचा व खांसी',
    description: 'बर्फीली ठंडी हवा, कमरे के हीटर, शुष्क त्वचा, एक्जिमा, और सर्दियों की सूखी खांसी।',
    iconName: 'Snowflake',
    seasonalRisks: ['गंभीर शुष्क त्वचा व एक्जिमा', 'ठंड से सांस की नली सिकुड़ना', 'घर के अंदर धूल के कीटाणु'],
    bannerTip: 'नहाने के 3 मिनट के भीतर गाढ़ा मॉइस्चराइज़र या सेरामाइड क्रीम लगाएं ताकि त्वचा की नमी बंद रहे।',
  },
];

export const HEALTH_CONCERNS_HI: HealthConcernInfo[] = [
  {
    id: 'general-wellness',
    label: 'सामान्य स्वास्थ्य एवं पोषण',
    description: 'दैनिक पोषण, रोग प्रतिरोधक क्षमता, पर्याप्त पानी और भरपूर नींद की आदतें।',
    iconName: 'HeartHandshake',
    isIllnessOrAllergy: false,
  },
  {
    id: 'asthma-breathing',
    label: 'दमा एवं सांस की समस्या',
    description: 'घरघराहट, सांस लेने में कठिनाई, ठंड में खांसी, पीक फ्लो ट्रैकिंग और इनहेलर तकनीक।',
    iconName: 'Wind',
    isIllnessOrAllergy: true,
  },
  {
    id: 'allergies',
    label: 'खाद्य एवं पर्यावरणीय एलर्जी',
    description: 'एलर्जिक राइनाइटिस (छींकें), पराग संवेदनशीलता, मूंगफली/नट एलर्जी और आपातकालीन ऑटो-इंजेक्टर।',
    iconName: 'AlertCircle',
    isIllnessOrAllergy: true,
  },
  {
    id: 'skin-eczema',
    label: 'त्वचा समस्याएं / एक्जिमा',
    description: 'एटॉपिक डर्मेटाइटिस, सर्दियों में त्वचा का फटना, घमौरियां और सुरक्षित बैरियर क्रीम।',
    iconName: 'Droplet',
    isIllnessOrAllergy: true,
  },
  {
    id: 'flu-cough',
    label: 'मौसमी फ्लू एवं खांसी',
    description: 'बुखार प्रबंधन, श्वसन खांसी में आराम, वायरल संक्रमण के चरण और डॉक्टर के पास जाने के संकेत।',
    iconName: 'Thermometer',
    isIllnessOrAllergy: true,
  },
  {
    id: 'immunity-nutrition',
    label: 'रोग प्रतिरोधक क्षमता व पोषण',
    description: 'विटामिन संतुलन, आंतों का स्वास्थ्य, जिंक युक्त आहार और बच्चों के लिए मौसमी सुरक्षा।',
    iconName: 'Apple',
    isIllnessOrAllergy: false,
  },
];

export const SETTING_OPTIONS_HI: FilterOption<EnvironmentSettingId>[] = [
  { id: 'all', label: 'सभी वातावरण' },
  { id: 'school-work', label: 'स्कूल एवं कार्यस्थल', description: 'डेस्क, कैंटीन, कक्षाएं, कार्यालय' },
  { id: 'sports-outdoors', label: 'खेलकूद एवं खुले मैदान', description: 'मैदान, तरणताल (पूल), कैंप, ट्रेल्स' },
  { id: 'home-bedroom', label: 'घर एवं शयनकक्ष', description: 'गद्दे, एयर फिल्टर, भीतरी हवा' },
  { id: 'dining-travel', label: 'भोजन एवं यात्रा', description: 'रेस्तरां, हॉस्टल, रोड ट्रिप, उड़ानें' },
];

export const SYMPTOM_STAGE_OPTIONS_HI: FilterOption<SymptomStageId>[] = [
  { id: 'all', label: 'सभी चरण' },
  { id: 'prevention', label: 'दैनिक रोकथाम', description: 'लक्षण शुरू होने से पहले सक्रिय दिनचर्या' },
  { id: 'early-signs', label: 'प्रारंभिक लक्षण / चेतावनी', description: 'गले में पहली खराश, हल्की छींक, रूखापन' },
  { id: 'active-flare', label: 'सक्रिय लक्षण देखभाल', description: 'मध्य-एपिसोड राहत, बुखार, तीव्र घरघराहट' },
  { id: 'recovery', label: 'स्वास्थ्य लाभ एवं वापसी', description: 'संक्रमण के बाद की खांसी, खेल में वापसी' },
];

export const TRIGGER_TYPE_OPTIONS_HI: FilterOption<TriggerTypeId>[] = [
  { id: 'all', label: 'सभी ट्रिगर्स' },
  { id: 'airborne-pollen', label: 'हवा में परागकण', description: 'पेड़, घास, पराग, बीजाणु' },
  { id: 'food-ingestion', label: 'खाद्य एलर्जी', description: 'मूंगफली, नट्स, डेयरी, तिल, अंडे' },
  { id: 'indoor-mites', label: 'धूल के कीटाणु व फफूंद', description: 'डस्ट माइट्स, पालतू जानवर, बाथरूम मोल्ड' },
  { id: 'physical-climate', label: 'मौसम व ठंड/गर्मी', description: 'बर्फीली हवा, तीव्र धूप (UV), क्लोरीन' },
];

export const PERSPECTIVE_OPTIONS_HI: FilterOption<PerspectiveId>[] = [
  { id: 'all', label: 'सभी दृष्टिकोण' },
  { id: 'youth-self', label: 'युवा स्वयं-देखभाल', description: 'बच्चों, किशोरों और युवाओं के लिए सीधे कदम' },
  { id: 'parent-caregiver', label: 'अभिभावक एवं देखभालकर्ता', description: 'दवा ट्रैकिंग, ट्राइएज, घरेलू स्वच्छता' },
];

export const INITIAL_PRESETS: FamilyProfile[] = [
  {
    id: 'preset-1',
    name: 'Leo (7 yrs, Spring Allergies)',
    ageGroup: '5-9',
    season: 'spring',
    concerns: ['allergies', 'asthma-breathing'],
    setting: 'school-work',
    stage: 'prevention',
    notes: 'Tree pollen sensitivity and mild playground exercise wheezing',
  },
  {
    id: 'preset-2',
    name: 'Maya (13 yrs, Summer Sports)',
    ageGroup: '10-14',
    season: 'summer',
    concerns: ['general-wellness', 'skin-eczema'],
    setting: 'sports-outdoors',
    stage: 'prevention',
    notes: 'Hydration pacing for soccer camp & chlorine pool eczema',
  },
  {
    id: 'preset-3',
    name: 'Lucas (16 yrs, Winter Flu Recovery)',
    ageGroup: '14-18',
    season: 'winter',
    concerns: ['flu-cough', 'immunity-nutrition'],
    setting: 'home-bedroom',
    stage: 'early-signs',
    notes: 'Winter sports fatigue, exam season immunity, and dry air cough',
  },
  {
    id: 'preset-4',
    name: 'Chloe (21 yrs, College Dining)',
    ageGroup: '18-25',
    season: 'autumn-monsoon',
    concerns: ['allergies', 'general-wellness'],
    setting: 'dining-travel',
    stage: 'prevention',
    notes: 'Dorm air quality, campus dining allergen cross-contact safety',
  },
  {
    id: 'preset-5',
    name: 'David & Sarah (32 yrs, Daycare Waves)',
    ageGroup: '26-35',
    season: 'winter',
    concerns: ['flu-cough', 'skin-eczema'],
    setting: 'home-bedroom',
    stage: 'active-flare',
    notes: 'Toddler viral waves and parent adult-onset eczema flareups',
  },
  {
    id: 'preset-6',
    name: 'Arthur (58 yrs, Winter Asthma)',
    ageGroup: '50+',
    season: 'winter',
    concerns: ['asthma-breathing', 'skin-eczema'],
    setting: 'sports-outdoors',
    stage: 'early-signs',
    notes: 'Cold dry wind bronchospasm and elderly winter barrier care',
  },
];

export const INITIAL_PRESETS_HI: FamilyProfile[] = [
  {
    id: 'preset-1',
    name: 'लियो (7 वर्ष, वसंत एलर्जी)',
    ageGroup: '5-9',
    season: 'spring',
    concerns: ['allergies', 'asthma-breathing'],
    setting: 'school-work',
    stage: 'prevention',
    notes: 'पेड़ों के पराग से एलर्जी और खेल के मैदान में हल्की मौसमी घरघराहट',
  },
  {
    id: 'preset-2',
    name: 'माया (13 वर्ष, ग्रीष्मकालीन खेल)',
    ageGroup: '10-14',
    season: 'summer',
    concerns: ['general-wellness', 'skin-eczema'],
    setting: 'sports-outdoors',
    stage: 'prevention',
    notes: 'फुटबॉल कैंप में पानी की कमी और क्लोरीन युक्त पूल से एक्जिमा',
  },
  {
    id: 'preset-3',
    name: 'लुकास (16 वर्ष, सर्दियों का फ्लू)',
    ageGroup: '14-18',
    season: 'winter',
    concerns: ['flu-cough', 'immunity-nutrition'],
    setting: 'home-bedroom',
    stage: 'early-signs',
    notes: 'सर्दियों के खेलों में थकावट, परीक्षा के दौरान इम्यूनिटी और शुष्क हवा में खांसी',
  },
  {
    id: 'preset-4',
    name: 'क्लोई (21 वर्ष, कॉलेज डाइनिंग)',
    ageGroup: '18-25',
    season: 'autumn-monsoon',
    concerns: ['allergies', 'general-wellness'],
    setting: 'dining-travel',
    stage: 'prevention',
    notes: 'हॉस्टल के कमरे की वायु गुणवत्ता और कॉलेज मेस में खाद्य एलर्जी सुरक्षा',
  },
  {
    id: 'preset-5',
    name: 'डेविड व सारा (32 वर्ष, डेकेयर संक्रमण)',
    ageGroup: '26-35',
    season: 'winter',
    concerns: ['flu-cough', 'skin-eczema'],
    setting: 'home-bedroom',
    stage: 'active-flare',
    notes: 'छोटे बच्चे के वायरल संक्रमण और माता-पिता के वयस्क एक्जिमा का प्रबंधन',
  },
  {
    id: 'preset-6',
    name: 'आर्थर (58 वर्ष, सर्दियों का दमा)',
    ageGroup: '50+',
    season: 'winter',
    concerns: ['asthma-breathing', 'skin-eczema'],
    setting: 'sports-outdoors',
    stage: 'early-signs',
    notes: 'ठंडी हवा से सांस की नली का सिकुड़ना और सर्दियों में त्वचा की देखभाल',
  },
];

export function getLocalizedAgeGroups(language: string): AgeGroupInfo[] {
  return language === 'hi' ? AGE_GROUPS_HI : AGE_GROUPS;
}

export function getLocalizedSeasons(language: string): SeasonInfo[] {
  return language === 'hi' ? SEASONS_HI : SEASONS;
}

export function getLocalizedConcerns(language: string): HealthConcernInfo[] {
  return language === 'hi' ? HEALTH_CONCERNS_HI : HEALTH_CONCERNS;
}

export function getLocalizedSettings(language: string): FilterOption<EnvironmentSettingId>[] {
  return language === 'hi' ? SETTING_OPTIONS_HI : SETTING_OPTIONS;
}

export function getLocalizedStages(language: string): FilterOption<SymptomStageId>[] {
  return language === 'hi' ? SYMPTOM_STAGE_OPTIONS_HI : SYMPTOM_STAGE_OPTIONS;
}

export function getLocalizedTriggers(language: string): FilterOption<TriggerTypeId>[] {
  return language === 'hi' ? TRIGGER_TYPE_OPTIONS_HI : TRIGGER_TYPE_OPTIONS;
}

export function getLocalizedPerspectives(language: string): FilterOption<PerspectiveId>[] {
  return language === 'hi' ? PERSPECTIVE_OPTIONS_HI : PERSPECTIVE_OPTIONS;
}

export function getLocalizedPresets(language: string): FamilyProfile[] {
  return language === 'hi' ? INITIAL_PRESETS_HI : INITIAL_PRESETS;
}

export function formatAgeLabel(id: AgeGroupId, language: string): string {
  if (id === 'all') return language === 'hi' ? 'सभी आयु वर्ग' : 'All Ages';
  const list = language === 'hi' ? AGE_GROUPS_HI : AGE_GROUPS;
  return list.find((g) => g.id === id)?.label || (language === 'hi' ? `${id} वर्ष` : `${id} yrs`);
}

export function formatSeasonLabel(id: SeasonId, language: string): string {
  if (id === 'all') return language === 'hi' ? 'सभी मौसम' : 'All Seasons';
  const list = language === 'hi' ? SEASONS_HI : SEASONS;
  return list.find((s) => s.id === id)?.label || id;
}

export function formatConcernLabel(id: HealthConcernId, language: string): string {
  const list = language === 'hi' ? HEALTH_CONCERNS_HI : HEALTH_CONCERNS;
  return list.find((c) => c.id === id)?.label || id;
}

export const ARTICLES: Article[] = [
  // 1. Kids (5-9) - Spring Pollen Defense
  {
    id: 'hp-01',
    title: 'Spring Pollen Defense: A Pediatric Asthma & Allergy Survival Guide for 5–9 Year Olds',
    subtitle: 'Practical tactics for recess, school bus rides, and bedroom allergen isolation.',
    slug: 'spring-pollen-defense-kids',
    ageGroups: ['5-9'],
    seasons: ['spring'],
    concerns: ['allergies', 'asthma-breathing'],
    setting: 'school-work',
    symptomStage: 'prevention',
    triggerType: 'airborne-pollen',
    perspective: 'parent-caregiver',
    readTimeMinutes: 5,
    publishedDate: 'March 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgSpringAllergies,
    summary: 'When trees release microscopic pollen clouds in early spring, young lungs and nasal passages are on the frontline. Learn how to configure a morning anti-histamine schedule, school bus precautions, and evening hair rinses to reduce symptoms by up to 70%.',
    keyTakeaways: [
      'Pollen clings to hair, clothing, and backpacks; wash hair before bedtime to avoid depositing pollen on pillows.',
      'Always prime asthma spacers before morning recess when grass pollen peaks.',
      'Keep bedroom windows latched during high-pollen counts; rely on HEPA filtration.',
    ],
    sections: [
      {
        heading: 'The Spring Pollen Cascade in Young Children',
        content: 'Between the ages of 5 and 9, children spend hours engaged in rigorous playground play where their breathing shifts from nasal to oral, allowing unfiltered pollen grains to hit reactive bronchial airways directly.',
        bulletPoints: [
          'High risk hours: 6:00 AM – 11:00 AM and dry, breezy afternoons.',
          'Cross-reactivity: Children allergic to birch pollen may experience itchy mouths when eating apples or carrots.',
        ],
      },
    ],
    checklist: [
      'Check local pollen forecast every morning before school departures.',
      'Place school clothes straight into laundry hampers, not onto bedroom chairs.',
      'Rinse face, eyes, and hair with lukewarm water right after coming inside.',
    ],
    redFlags: [
      'Visible retraction: skin pulling in between ribs or at the base of the throat while breathing.',
      'Inability to speak a full sentence of 4-5 words without gasping for breath.',
    ],
    homeCareTips: [
      'Saline nasal mist twice daily to mechanically wash out trapped irritants.',
      'Cool compress over closed eyelids for 5 minutes after outdoor play to calm itching.',
    ],
    targetAudience: 'Parents of kindergarten to third grade students facing spring allergies.',
    isFeatured: true,
  },

  // 2. Teen Athletes (10-14 & 14-18) - Summer Hydration
  {
    id: 'hp-02',
    title: 'Hydration Math & Heat Illness Prevention for Active Teen Athletes',
    subtitle: 'Electrolyte balance, core temperature cooling, and spotting exertional heat exhaustion.',
    slug: 'summer-hydration-teen-athletes',
    ageGroups: ['10-14', '14-18'],
    seasons: ['summer'],
    concerns: ['general-wellness'],
    setting: 'sports-outdoors',
    symptomStage: 'prevention',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 4,
    publishedDate: 'June 2026',
    medicalReviewer: {
      name: 'Dr. Marcus Vance, MD',
      role: 'Sports Medicine & Adolescent Health Fellow',
      institution: 'Metropolitan Youth Sports Institute',
      verifiedYear: 2026,
    },
    image: imgSummerHydration,
    summary: 'Teen athletes sweat at rates comparable to collegiate players, yet their thirst sensation lags significantly behind cellular dehydration. Here is the exact fluid formula, sodium replacement ratio, and heat acclimatization timeline required for summer sports camps.',
    keyTakeaways: [
      'Thirst is a lagging indicator: by the time a teen feels thirsty, they are already 1.5% to 2% dehydrated.',
      'Water alone during 90+ minute intense practices can lead to hyponatremia; pair with light sodium electrolytes.',
      'Weigh athletes before and after training: drink 16 oz of fluid for every pound lost during high exertion.',
    ],
    sections: [
      {
        heading: 'Why Adolescent Heat Dissipation is Different',
        content: 'Young teenagers produce more metabolic heat per pound of body weight than mature adults and have lower sweat rates per gland.',
      },
    ],
    checklist: [
      'Pack a designated 32 oz insulated water bottle that keeps drinks below 55°F.',
      'Schedule practices before 10:00 AM or after 6:00 PM during heat waves.',
      'Check urine color: pale lemonade indicates good hydration.',
    ],
    redFlags: [
      'Dizziness, lightheadedness, or sudden loss of coordination on the field.',
      'Profuse sweating that suddenly stops, leaving hot, dry or clammy skin.',
    ],
    homeCareTips: [
      'Move immediately into shaded or air-conditioned shelter if feeling faint.',
      'Apply ice packs wrapped in thin towels to the armpits, groin, and back of neck.',
    ],
    targetAudience: 'Middle and high school student-athletes, coaches, and sports parents.',
    isFeatured: true,
  },

  // 3. Eczema & Winter Barrier Repair (All Ages)
  {
    id: 'hp-03',
    title: 'Winter Eczema & Skin Barrier Repair: The 3-Minute Post-Bath Seal Protocol',
    subtitle: 'Ceramides, humidifier settings, and winter clothing fabrics that prevent intense itching.',
    slug: 'winter-eczema-barrier-repair',
    ageGroups: ['5-9', '10-14', '26-35', '36-44', '50+'],
    seasons: ['winter'],
    concerns: ['skin-eczema'],
    setting: 'home-bedroom',
    symptomStage: 'active-flare',
    triggerType: 'physical-climate',
    perspective: 'parent-caregiver',
    readTimeMinutes: 5,
    publishedDate: 'November 2026',
    medicalReviewer: {
      name: 'Dr. Elena Rostova, MD',
      role: 'Pediatric Dermatologist',
      institution: 'University Pediatric Dermatology Clinic',
      verifiedYear: 2026,
    },
    image: imgWinterSkincare,
    summary: 'When winter temperatures plummet, outdoor humidity drops and indoor radiators strip ambient moisture. For children and adults with atopic dermatitis, this cracks the delicate lipid stratum corneum. Discover the evidence-backed Soak-and-Seal method to end the scratch-itch cycle.',
    keyTakeaways: [
      'Bathing should be brief (5–10 minutes) in lukewarm water, never steaming hot water which strips lipids.',
      'Apply thick ointment or cream within 180 seconds of towel-patting to lock in hydrated water molecules.',
      '100% breathable organic cotton undergarments are essential; avoid wool and coarse synthetics directly against skin.',
    ],
    sections: [
      {
        heading: 'The Anatomy of the Winter Itch-Scratch Cycle',
        content: 'Winter air holds significantly less water vapor. When furnaces kick on, indoor air often dips below 20% relative humidity.',
      },
    ],
    checklist: [
      'Switch from pump lotions (which have high water/alcohol content) to tub ointments.',
      'Set a cool-mist ultrasonic humidifier in the bedroom to maintain 40–50% relative humidity.',
    ],
    redFlags: [
      'Yellowish crusting, oozing honey-colored fluid, or small pus-filled blisters (suggests impetigo).',
      'Sudden outbreak of painful round sores accompanied by fever.',
    ],
    homeCareTips: [
      'Keep moisturizer tub in the refrigerator for a soothing, anti-itch cooling sensation on contact.',
      'Wet-wrap therapy: damp cotton pyjamas under dry outer layers for severe stubborn flare nights.',
    ],
    targetAudience: 'Parents and adults managing sensitive, dry, or eczema-prone skin during winter.',
    isFeatured: true,
  },

  // 4. Pediatric & Family Winter Cough
  {
    id: 'hp-04',
    title: 'Demystifying the Winter Cough: Croup, Bronchiolitis, or Common Flu?',
    subtitle: 'Sound cues, respiratory rates, and safe home vapor protocols for worried parents.',
    slug: 'winter-cough-demystified',
    ageGroups: ['5-9', '26-35', '36-44'],
    seasons: ['winter'],
    concerns: ['flu-cough', 'asthma-breathing'],
    setting: 'home-bedroom',
    symptomStage: 'early-signs',
    triggerType: 'physical-climate',
    perspective: 'parent-caregiver',
    readTimeMinutes: 6,
    publishedDate: 'December 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgHeroHealthpulse,
    summary: 'A barking seal-like cough at 2:00 AM strikes fear into every parent. This pediatric triage guide breaks down distinct cough signatures, explains how to assess work of breathing, and details when cool mist vs steam is medically appropriate.',
    keyTakeaways: [
      'A barking, seal-like cough usually indicates croup (swelling in the upper trachea), worsened by dry night air.',
      'A tight wheeze during exhalation points toward lower airway constriction (bronchiolitis or asthma).',
      'Never give over-the-counter cough suppressants to children under 6; use natural honey (only for kids over 1 year old).',
    ],
    sections: [
      {
        heading: 'Reading the Acoustic Clues of a Cough',
        content: 'Coughing is a protective bodily reflex. Observing sound, timing, and whether the child is playful between bouts provides critical insight.',
      },
    ],
    checklist: [
      'Count breaths for 60 seconds when child is asleep: over 40 breaths/min warrants medical evaluation.',
      'Administer 1 teaspoon of dark buckwheat honey 30 minutes before bed (for kids 12 months+).',
    ],
    redFlags: [
      'Stridor: high-pitched whistling noise when inhaling while resting quietly.',
      'Flaring nostrils with each breath, or head bobbing in rhythm with breathing.',
    ],
    homeCareTips: [
      'Bundle up child and step into crisp night outdoor air for 5 minutes to shrink swollen vocal cords.',
      'Elevate the head of the mattress slightly with a rolled towel placed underneath.',
    ],
    targetAudience: 'Parents managing winter respiratory coughs in young children.',
    isFeatured: true,
  },

  // 5. Early Teens (10-14) - Middle School Food Allergies
  {
    id: 'hp-05',
    title: 'Middle School Cafeteria Allergen Defense: Building 10–14 Year Old Confidence',
    subtitle: 'From table bans to self-advocacy, how young teens can eat safely without feeling isolated.',
    slug: 'middle-school-food-allergies',
    ageGroups: ['10-14'],
    seasons: ['all', 'autumn-monsoon'],
    concerns: ['allergies'],
    setting: 'school-work',
    symptomStage: 'prevention',
    triggerType: 'food-ingestion',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'September 2026',
    medicalReviewer: {
      name: 'Dr. Priya Patel, MD',
      role: 'Adolescent Medicine Specialist',
      institution: 'Youth Wellness Alliance',
      verifiedYear: 2026,
    },
    image: imgSpringAllergies,
    summary: 'The transition from elementary allergen-free tables to middle school cafeterias is an anxiety peak. This guide empowers 10–14 year olds with scripts to decline shared snacks, wipe lunch surfaces, and practice self-administering auto-injectors.',
    keyTakeaways: [
      'Roleplaying cafeteria scenarios reduces peer pressure to accept unlabeled homemade treats.',
      'Epinephrine auto-injectors should remain on the teen’s person in a zippered waist pack, not locked in the office.',
      'Washing hands with running water and soap removes peanut and egg proteins; hand sanitizer does NOT eliminate allergens.',
    ],
    sections: [
      {
        heading: 'The Shift Toward Personal Responsibility',
        content: 'Between the ages of 10 and 14, teens want to fit in and may downplay mild allergic reactions to avoid unwanted attention.',
      },
    ],
    checklist: [
      'Check auto-injector expiration dates every semester.',
      'Practice with a needle-free trainer device once a month to build muscle memory.',
    ],
    redFlags: [
      'Tightness in the throat, hoarse voice, or feeling like "something is stuck".',
      'Hives spreading rapidly across chest or face after suspected ingestion.',
    ],
    homeCareTips: [
      'Designate a safe pantry shelf at home stocked with pre-vetted grab-and-go sports snacks.',
      'Craft a concise one-liner: "Thanks, but I have a serious nut allergy so I only eat food I packed."',
    ],
    targetAudience: 'Early teens with food allergies and their parents preparing for middle school.',
  },

  // 6. Autumn/Monsoon Classroom Flu Shield (All Ages)
  {
    id: 'hp-06',
    title: 'Monsoon & Autumn Viral Flu Shield: Strengthening Classroom & Office Immunity',
    subtitle: 'Ventilation habits, zinc intake, and sleep debt recovery for back-to-school resilience.',
    slug: 'autumn-monsoon-flu-shield',
    ageGroups: ['5-9', '10-14', '14-18', '26-35', '36-44'],
    seasons: ['autumn-monsoon'],
    concerns: ['flu-cough', 'immunity-nutrition'],
    setting: 'school-work',
    symptomStage: 'prevention',
    triggerType: 'physical-climate',
    perspective: 'parent-caregiver',
    readTimeMinutes: 4,
    publishedDate: 'October 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgHeroHealthpulse,
    summary: 'As windows close and heating cycles begin in rainy autumn months, classroom viral transmission spikes exponentially. Learn the nutritional foundations of mucosal barrier defense and how to tell influenza from the common cold.',
    keyTakeaways: [
      '9 hours of uninterrupted sleep restores T-cell function critical for neutralizing rhinoviruses.',
      'Zinc and Vitamin D3 maintain mucosal barrier integrity in the upper nasal passages.',
      'Influenza strikes rapidly with sudden high fever and body aches; common colds develop gradually.',
    ],
    sections: [
      {
        heading: 'Classroom & Office Transmission Dynamics',
        content: 'When schools and offices close windows during rainy autumn days, unventilated air recirculates bio-aerosols.',
      },
    ],
    checklist: [
      'Schedule annual influenza vaccine early in autumn before peak circulation.',
      'Ensure child sleeps 9–10 hours each night with devices charged outside the bedroom.',
    ],
    redFlags: [
      'Child spikes a brand new high fever with ear pain after appearing to recover (bacterial infection).',
      'Rapid breathing with chest muscles visibly heaving.',
    ],
    homeCareTips: [
      'Hydrate with warm ginger, lemon, and honey tea for soothing anti-inflammatory relief.',
    ],
    targetAudience: 'Families preparing for autumn back-to-school bug season.',
  },

  // 7. Late Teens (14-18) - Exam Stress Immunity
  {
    id: 'hp-07',
    title: 'High School Exam Stress, Sleep Deficits & Immune Dips in Late Teens',
    subtitle: 'How 14–18 year olds can avoid the finals-week sickness trap with biological rhythm hacks.',
    slug: 'late-teen-exam-stress-immunity',
    ageGroups: ['14-18'],
    seasons: ['winter', 'autumn-monsoon', 'spring'],
    concerns: ['general-wellness', 'immunity-nutrition'],
    setting: 'school-work',
    symptomStage: 'prevention',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'January 2026',
    medicalReviewer: {
      name: 'Dr. Marcus Vance, MD',
      role: 'Sports Medicine & Adolescent Health Fellow',
      institution: 'Metropolitan Youth Sports Institute',
      verifiedYear: 2026,
    },
    image: imgSummerHydration,
    summary: 'Late teens face a unique hormonal phase delay that makes falling asleep before 11 PM difficult. Combined with rigorous testing and caffeine overconsumption, cortisol spikes deplete natural killer cells right before major exams.',
    keyTakeaways: [
      'Caffeine after 3:00 PM blocks adenosine receptors, destroying restorative deep slow-wave sleep.',
      'A 20-minute daily brisk outdoor walk during daylight calibrates melatonin production.',
      'Short 25-minute power naps between 1 PM and 3 PM recover cognitive memory without sleep inertia.',
    ],
    sections: [
      {
        heading: 'The Biology of the "Post-Finals Crash"',
        content: 'Operating under chronic adrenaline suppresses immune symptoms until stress abruptly drops, triggering viral flare-ups.',
      },
    ],
    checklist: [
      'Cut off energy drinks and espresso 8 hours prior to targeted sleep time.',
      'Replace midnight chips with magnesium-rich snacks (pumpkin seeds, almonds, bananas).',
    ],
    redFlags: [
      'Persistent swollen lymph nodes in the neck lasting more than two weeks.',
      'Severe depressive mood, panic attacks, or feelings of hopelessness.',
    ],
    homeCareTips: [
      'Practice 4-7-8 rhythmic breathing when lying in bed to activate vagal parasympathetic tone.',
    ],
    targetAudience: 'High school students, varsity athletes, and parents supporting teens through exams.',
  },

  // 8. Whole Home Environmental Allergen Audit (26-35, 36-44)
  {
    id: 'hp-08',
    title: 'Whole-Home Environmental Allergen Audit: Dust Mites, Pet Dander & HEPA Standards',
    subtitle: 'A clean room blueprint for parents managing pediatric asthma and chronic morning sneezing.',
    slug: 'home-allergen-audit-parents',
    ageGroups: ['26-35', '36-44', '50+'],
    seasons: ['all', 'winter', 'spring'],
    concerns: ['allergies', 'asthma-breathing'],
    setting: 'home-bedroom',
    symptomStage: 'prevention',
    triggerType: 'indoor-mites',
    perspective: 'parent-caregiver',
    readTimeMinutes: 6,
    publishedDate: 'February 2026',
    medicalReviewer: {
      name: 'Dr. Priya Patel, MD',
      role: 'Adolescent Medicine Specialist',
      institution: 'Youth Wellness Alliance',
      verifiedYear: 2026,
    },
    image: imgWinterSkincare,
    summary: 'Over 80% of children and adults with chronic allergic rhinitis react to microscopic indoor dust mite feces and pet dander. Discover which cleaning interventions actually make a clinical difference and which commercial products are marketing gimmicks.',
    keyTakeaways: [
      'Dust mite allergen encasements on mattresses and pillows reduce nighttime exposure by over 90%.',
      'Wash bedding weekly in water heated to at least 130°F (54°C) to denature mite proteins.',
      'Vacuuming without a sealed HEPA exhaust merely redistributes fine allergens into the breathing air.',
    ],
    sections: [
      {
        heading: 'Why Nighttime is the Danger Zone',
        content: 'Children and adults spend one-third of their life with their face resting inches from pillow surfaces where microscopic mites thrive.',
      },
    ],
    checklist: [
      'Install zippered, woven allergen barrier covers on all pillows and mattresses.',
      'Replace HVAC furnace filters every 60 to 90 days with MERV 11 or higher rated media.',
    ],
    redFlags: [
      'Nighttime coughing waking the child more than twice a week (indicates uncontrolled asthma).',
      'Chronic sinus infections requiring more than 3 antibiotic rounds per year.',
    ],
    homeCareTips: [
      'Wipe hard surfaces with a damp microfiber cloth instead of feather dusters.',
    ],
    targetAudience: 'Parents wanting an actionable, clinically verified checklist for an allergen-safe home.',
  },

  // 9. Young Adults (18-25): Campus Dorm & Shared Living Allergens
  {
    id: 'hp-09',
    title: 'Campus Dorm Living with Allergies & Asthma: An 18–25 Survival Guide',
    subtitle: 'Managing old dorm radiator heating, moldy communal showers, and dining hall cross-contact.',
    slug: 'college-dorm-allergies-asthma',
    ageGroups: ['18-25'],
    seasons: ['autumn-monsoon', 'winter', 'spring'],
    concerns: ['allergies', 'asthma-breathing'],
    setting: 'dining-travel',
    symptomStage: 'prevention',
    triggerType: 'indoor-mites',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'August 2026',
    medicalReviewer: {
      name: 'Dr. Priya Patel, MD',
      role: 'Adolescent Medicine Specialist',
      institution: 'Youth Wellness Alliance',
      verifiedYear: 2026,
    },
    image: imgSpringAllergies,
    summary: 'Moving into a university residence hall exposes young adults to decades of accumulated dust mites, high-humidity communal bathrooms, and unfamiliar dining options. Here is how college students can register medical housing accommodations and eat safely.',
    keyTakeaways: [
      'Register for dietary accommodations under the Americans with Disabilities Act (ADA) with campus dining before move-in.',
      'Older campus heating vents often harbor mold spores; run a standalone HEPA unit within 3 feet of your desk and bed.',
      'Keep backup auto-injectors at roommate-accessible locations, not buried in packed luggage.',
    ],
    sections: [
      {
        heading: 'Navigating Campus Dining Without Fear',
        content: 'College buffet stations are notorious for shared utensils and accidental cross-contact. Learn to request meals cooked in dedicated allergy-safe kitchenettes.',
      },
    ],
    checklist: [
      'Upload epinephrine prescription and asthma action plan to university student health portal.',
      'Encase university-provided mattresses in waterproof, mite-proof zippered covers.',
      'Designate one clean skillet and cutting board for your personal dorm kitchen use.',
    ],
    redFlags: [
      'Sudden throat constriction or dizziness after consuming cafeteria sauces.',
      'Wheezing unresponsive to standard rescue inhaler doses after party smoke exposure.',
    ],
    homeCareTips: [
      'Store medicine at room temperature (68°F–77°F); never place auto-injectors in dorm mini-fridges where freezing ruins the mechanism.',
    ],
    targetAudience: 'College freshmen, university students, and young adults living away from home.',
    isFeatured: true,
  },

  // 10. Young Adults (18-25): Fitness & Recovery Hydration
  {
    id: 'hp-10',
    title: 'Young Adult Fitness & Recovery: Electrolyte Protocols for High-Intensity Training',
    subtitle: 'From CrossFit to marathon training, how 18–25 year olds prevent exertional cramping and immune crashes.',
    slug: 'young-adult-fitness-hydration-recovery',
    ageGroups: ['18-25'],
    seasons: ['summer', 'spring'],
    concerns: ['general-wellness', 'immunity-nutrition'],
    setting: 'sports-outdoors',
    symptomStage: 'prevention',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 4,
    publishedDate: 'May 2026',
    medicalReviewer: {
      name: 'Dr. Marcus Vance, MD',
      role: 'Sports Medicine & Adolescent Health Fellow',
      institution: 'Metropolitan Youth Sports Institute',
      verifiedYear: 2026,
    },
    image: imgSummerHydration,
    summary: 'Intense physical conditioning in warm weather depletes plasma volume rapidly. Learn how young adults can balance sodium-to-potassium ratios, avoid hyponatremia from over-drinking plain water, and support muscle recovery.',
    keyTakeaways: [
      'Drinking gallons of distilled or plain filtered water without electrolytes during heavy sweat sessions can cause dangerous cellular swelling.',
      'Consume 400–600mg of sodium per liter of water during sessions lasting over 75 minutes in warm weather.',
      'Protein synthesis peaks when paired with rapid hydration within 45 minutes of workout completion.',
    ],
    sections: [
      {
        heading: 'The Mechanics of Sweating in High Exertion',
        content: 'Young adults have peak cardiovascular stamina, which can sometimes mask the early signs of heat exhaustion until core temperature spikes.',
      },
    ],
    checklist: [
      'Drink 16 oz of water 90 minutes before heavy lifting or endurance cardio.',
      'Add a pinch of sea salt and lemon to training bottles for natural electrolyte balance.',
    ],
    redFlags: [
      'Confusion, severe throbbing headache, or sudden cessation of sweating during exertion.',
      'Dark brown or tea-colored urine post-workout (warning sign of rhabdomyolysis).',
    ],
    homeCareTips: [
      'Replenish lost fluids with coconut water, diluted fruit juices, and potassium-rich bananas.',
    ],
    targetAudience: 'College athletes, gym enthusiasts, and young adults pursuing endurance training.',
  },

  // 11. New Parents (26-35): Daycare Bug Wave & Pediatric Triage
  {
    id: 'hp-11',
    title: 'The First Year of Daycare: Surviving 10–12 Viral Illnesses as a New Parent',
    subtitle: 'A clinical roadmap for fever spikes, ear infections, and adult catch-up sickness.',
    slug: 'daycare-illness-survival-new-parents',
    ageGroups: ['26-35'],
    seasons: ['autumn-monsoon', 'winter'],
    concerns: ['flu-cough', 'immunity-nutrition'],
    setting: 'home-bedroom',
    symptomStage: 'active-flare',
    triggerType: 'physical-climate',
    perspective: 'parent-caregiver',
    readTimeMinutes: 6,
    publishedDate: 'October 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgHeroHealthpulse,
    summary: 'It is medically normal for infants and toddlers in daycare to experience 8 to 12 viral infections in their first year. Here is how 26–35 year old parents can manage pediatric fevers calmly, prevent adult cross-infection, and know when ear tugging warrants a doctor visit.',
    keyTakeaways: [
      'Fevers are a healthy immune mechanism that slows viral replication; treat the child’s comfort rather than the thermometer number.',
      'Alternating acetaminophen and ibuprofen requires strict dosage-by-weight logging to avoid accidental medication errors.',
      'Parents often catch secondary viral bouts with greater severity due to chronic infant sleep deprivation.',
    ],
    sections: [
      {
        heading: 'Why Daycare Bugs Feel Constant',
        content: 'Infant immune systems are encountering hundreds of novel rhinoviruses, enteroviruses, and adenoviruses for the very first time.',
      },
    ],
    checklist: [
      'Calculate fever reducer dosages based on child\'s weight in kilograms, never age bracket on the bottle.',
      'Keep a nasal bulb syringe and sterile saline drops ready before bedtime.',
    ],
    redFlags: [
      'Fever above 100.4°F in an infant younger than 3 months (immediate emergency evaluation required).',
      'Child has fewer than 3 wet diapers in a 24-hour window.',
    ],
    homeCareTips: [
      'Run cool-mist humidifiers right next to the crib to keep nasal passages hydrated.',
      'Sip warm electrolyte fluids and protect parental sleep in shifts during sick weeks.',
    ],
    targetAudience: 'First-time parents and working caregivers navigating infant daycare illnesses.',
    isFeatured: true,
  },

  // 12. New Parents & Adults (26-35): Adult-Onset Allergies & Rhinitis
  {
    id: 'hp-12',
    title: 'Why Did I Suddenly Develop Allergies at 30? Adult-Onset Environmental Sensitivities',
    subtitle: 'Relocation, immune recalibration, and second-generation antihistamine regimens.',
    slug: 'adult-onset-allergies-thirties',
    ageGroups: ['26-35'],
    seasons: ['spring', 'autumn-monsoon'],
    concerns: ['allergies', 'asthma-breathing'],
    setting: 'school-work',
    symptomStage: 'early-signs',
    triggerType: 'airborne-pollen',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'March 2026',
    medicalReviewer: {
      name: 'Dr. Priya Patel, MD',
      role: 'Adolescent Medicine Specialist',
      institution: 'Youth Wellness Alliance',
      verifiedYear: 2026,
    },
    image: imgSpringAllergies,
    summary: 'Moving cities or experiencing prolonged career stress can trigger brand new pollen or pet dander allergies in your late twenties and early thirties. Discover how immune tolerance shifts with age and how to restore daytime mental clarity.',
    keyTakeaways: [
      'It takes an average of 2–3 seasonal cycles in a new geographic climate for your body to synthesize IgE antibodies against local tree pollen.',
      'Fluticasone and mometasone nasal sprays take 5–7 days of continuous use to reach full anti-inflammatory effectiveness.',
      'Allergy brain fog is caused by systemic cytokines crossing the blood-brain barrier.',
    ],
    sections: [
      {
        heading: 'The Adult Sensitization Shift',
        content: 'Many adults are surprised when spring tree pollen suddenly causes sinus pressure and fatigue after decades of clear breathing.',
      },
    ],
    checklist: [
      'Start non-drowsy antihistamines 2 weeks prior to typical local pollen release.',
      'Angle nasal steroid sprays outward toward the ear, not at the central septum.',
    ],
    redFlags: [
      'Shortness of breath or persistent wheeze accompanying seasonal sneezing.',
      'Sudden swelling of lips or tongue after eating raw stone fruits.',
    ],
    homeCareTips: [
      'Perform evening nasal irrigation with warm distilled saline to flush out trapped pollen.',
    ],
    targetAudience: 'Working adults and young parents dealing with newly developed seasonal allergies.',
  },

  // 13. Mid-Adults & Families (36-44): Managing Dual-Generation Seasonal Flares
  {
    id: 'hp-13',
    title: 'The Sandwich Generation Wellness Playbook: Managing Kid Asthma & Aging Parent Comfort',
    subtitle: 'Household air quality, winter furnace maintenance, and multi-generational allergy prevention.',
    slug: 'dual-generation-family-wellness-36-44',
    ageGroups: ['36-44'],
    seasons: ['winter', 'spring'],
    concerns: ['asthma-breathing', 'allergies', 'general-wellness'],
    setting: 'home-bedroom',
    symptomStage: 'prevention',
    triggerType: 'indoor-mites',
    perspective: 'parent-caregiver',
    readTimeMinutes: 6,
    publishedDate: 'November 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgWinterSkincare,
    summary: 'Parents aged 36–44 often juggle their school-aged children’s sports asthma alongside their own aging parents’ delicate respiratory health. This home environmental audit delivers maximum protection for every generation under one roof.',
    keyTakeaways: [
      'Both growing lungs and older bronchial airways are hypersensitive to fine particulate matter (PM2.5) and indoor combustion fumes.',
      'Maintain indoor relative humidity strictly between 38% and 45% to suppress both viral transmission and mold blooms.',
      'Color-code family spacer chambers and inhaler delivery devices to prevent accidental cross-use.',
    ],
    sections: [
      {
        heading: 'Multi-Generational Respiratory Fragility',
        content: 'When children bring home viral coughs from middle school, grandparents and older relatives in the home face high risk of secondary bronchial complications.',
      },
    ],
    checklist: [
      'Audit HVAC filters every 60 days and verify MERV 11+ efficiency rating.',
      'Check emergency inhaler supplies for both children and visiting grandparents.',
    ],
    redFlags: [
      'Oxygen saturation below 93% on fingertip pulse oximeter for any family member.',
      'Confusion or lethargy accompanying high fevers in older family members.',
    ],
    homeCareTips: [
      'Run true HEPA air purifiers continuously in shared living spaces and bedrooms.',
    ],
    targetAudience: 'Parents managing multi-generational households with children and seniors.',
  },

  // 14. Mid-Adults (36-44): Chronic Eczema & Occupational Skin Stress
  {
    id: 'hp-14',
    title: 'Adult Hand Eczema & Stress-Induced Dermatitis: Practical Relief for Busy 36–44 Year Olds',
    subtitle: 'Frequent handwashing, dishwashing detergents, and lipid barrier restoration.',
    slug: 'adult-hand-eczema-barrier-repair',
    ageGroups: ['36-44'],
    seasons: ['winter', 'autumn-monsoon'],
    concerns: ['skin-eczema'],
    setting: 'home-bedroom',
    symptomStage: 'active-flare',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 4,
    publishedDate: 'December 2026',
    medicalReviewer: {
      name: 'Dr. Elena Rostova, MD',
      role: 'Pediatric Dermatologist',
      institution: 'University Pediatric Dermatology Clinic',
      verifiedYear: 2026,
    },
    image: imgWinterSkincare,
    summary: 'Repetitive handwashing at work, preparing family meals, and handling harsh cleaning detergents strips the lipid mortar between skin cells. Here is how mid-career adults can heal deep, painful finger fissures and stop nighttime itching.',
    keyTakeaways: [
      'Wear cotton-lined rubber gloves for all dishwashing and bathroom cleaning chores.',
      'Apply 100% white petrolatum to cracked fingertips before bed and wear breathable white cotton gloves overnight.',
      'Switch kitchen hand soaps from antibacterial foaming gels to hydrating syndet cleansers.',
    ],
    sections: [
      {
        heading: 'Why Hand Eczema Spikes in Mid-Adulthood',
        content: 'Cumulative chemical exposure combined with elevated cortisol reduces natural ceramide synthesis by up to 40% compared to younger years.',
      },
    ],
    checklist: [
      'Place a tub of heavy ceramide cream next to every sink in the house.',
      'Avoid liquid dish soaps with fragrance and methylisothiazolinone preservatives.',
    ],
    redFlags: [
      'Deep cracks with yellow crusting or red streaks spreading up the wrist (bacterial infection).',
      'Severe pain preventing normal manual work or grip strength.',
    ],
    homeCareTips: [
      'Soak hands in lukewarm water for 5 minutes, pat gently, and apply prescribed topical steroids directly to active fissures.',
    ],
    targetAudience: 'Working adults and busy parents with dry, cracked, or eczema-prone hands.',
  },

  // 15. Mature Adults & Seniors (50+): Cold Weather Respiratory Defense
  {
    id: 'hp-15',
    title: 'Cold-Air Bronchospasm & Respiratory Protection for Active Adults 50+',
    subtitle: 'Warming inhaled air, managing COPD/asthma overlaps, and winter morning walking safety.',
    slug: 'mature-adult-cold-air-bronchospasm',
    ageGroups: ['50+'],
    seasons: ['winter'],
    concerns: ['asthma-breathing', 'general-wellness'],
    setting: 'sports-outdoors',
    symptomStage: 'prevention',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'November 2026',
    medicalReviewer: {
      name: 'Dr. Marcus Vance, MD',
      role: 'Sports Medicine & Adolescent Health Fellow',
      institution: 'Metropolitan Youth Sports Institute',
      verifiedYear: 2026,
    },
    image: imgHeroHealthpulse,
    summary: 'As lungs mature, the elastic recoil of bronchial tissue gradually decreases. Cold winter air acts as a powerful physical trigger that causes sudden airway constriction during brisk morning walks. Learn how to condition your lungs and exercise outdoors safely.',
    keyTakeaways: [
      'Breathing sub-freezing air through a loose knit scarf or thermal mask raises air temperature by up to 20°F before it hits vocal cords.',
      'Inhale 2 puffs of your prescribed bronchodilator 15 minutes before stepping into sub-zero weather.',
      'Check local Air Quality Index (AQI): winter temperature inversions trap woodsmoke and particulate matter near ground level.',
    ],
    sections: [
      {
        heading: 'The Physiology of the Mature Airway in Winter',
        content: 'Cold, dry air triggers mast cells along the bronchial tree to release inflammatory leukotrienes, causing instant narrowing.',
      },
    ],
    checklist: [
      'Keep rescue inhaler in an inside coat pocket close to body heat so cold does not alter propellant pressure.',
      'Opt for indoor track walking or mall walking on days when temperatures drop below 20°F (-6°C).',
    ],
    redFlags: [
      'Persistent chest tightness unresponsive to albuterol inhalers within 20 minutes.',
      'Shortness of breath while sitting quietly or resting in a chair.',
    ],
    homeCareTips: [
      'Take slow nasal breaths during morning walks; nasal passages naturally warm and humidify air.',
    ],
    targetAudience: 'Active adults aged 50 and older, walking groups, and seniors managing reactive airways.',
    isFeatured: true,
  },

  // 16. Mature Adults & Seniors (50+): Thinning Skin Barrier & Winter Pruritus
  {
    id: 'hp-16',
    title: 'Winter Itch & Xerosis in Adults 50+: Restoring Mature Skin Lipids',
    subtitle: 'Why mature skin becomes paper-dry in winter and how to rebuild the stratum corneum.',
    slug: 'mature-skin-xerosis-winter-itch',
    ageGroups: ['50+'],
    seasons: ['winter', 'autumn-monsoon'],
    concerns: ['skin-eczema'],
    setting: 'home-bedroom',
    symptomStage: 'early-signs',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 4,
    publishedDate: 'December 2026',
    medicalReviewer: {
      name: 'Dr. Elena Rostova, MD',
      role: 'Pediatric Dermatologist',
      institution: 'University Pediatric Dermatology Clinic',
      verifiedYear: 2026,
    },
    image: imgWinterSkincare,
    summary: 'After age 50, epidermal sebum production declines by nearly 50%, leading to winter "Asteatotic Eczema" or "Winter Itch" on the shins, arms, and back. Discover the exact lipid replacement creams and non-soap bathing regimens to prevent severe scratching.',
    keyTakeaways: [
      'Steaming hot showers provide temporary pleasure but severely dissolve the few natural lipids mature skin retains.',
      'Look for creams containing cholesterol, free fatty acids, and ceramides in a 3:1:1 physiological ratio.',
      'Never rub with rough loofahs or stiff sponges; use bare hands with lukewarm water.',
    ],
    sections: [
      {
        heading: 'The Natural Aging of the Lipid Matrix',
        content: 'Mature skin has a delayed barrier recovery rate. While a teenager’s skin repairs in 24 hours, mature skin can take up to 72 hours to seal microscopic fissures.',
      },
    ],
    checklist: [
      'Limit shower time to under 8 minutes in warm (not steaming) water.',
      'Apply thick cream within 3 minutes of stepping out of the shower.',
    ],
    redFlags: [
      'Spreading red rash that feels hot and tender to the touch (signs of cellulitis).',
      'Bleeding skin tears that do not close after gentle pressure.',
    ],
    homeCareTips: [
      'Run bedroom humidifiers continuously through winter months.',
      'Wear smooth cotton underlayers beneath wool sweaters.',
    ],
    targetAudience: 'Adults aged 50 and above experiencing winter itching, flaking, or sensitive skin.',
  },

  // 17. Kids (5-9) - Summer Heat Rash & Sunburn Triage
  {
    id: 'hp-17',
    title: 'Playground Heat Rash & Sunburn Triage for School-Age Kids (5–9)',
    subtitle: 'Blocked sweat ducts, mineral zinc sunscreen tips, and instant cooling relief.',
    slug: 'kids-heat-rash-sunburn-triage',
    ageGroups: ['5-9'],
    seasons: ['summer'],
    concerns: ['skin-eczema', 'general-wellness'],
    setting: 'sports-outdoors',
    symptomStage: 'active-flare',
    triggerType: 'physical-climate',
    perspective: 'parent-caregiver',
    readTimeMinutes: 4,
    publishedDate: 'July 2026',
    medicalReviewer: {
      name: 'Dr. Elena Rostova, MD',
      role: 'Pediatric Dermatologist',
      institution: 'University Pediatric Dermatology Clinic',
      verifiedYear: 2026,
    },
    image: imgSummerHydration,
    summary: 'When energetic 5–9 year olds run around in summer playgrounds, small sweat ducts easily clog, causing tiny prickling red bumps (miliaria rubra). Learn how to differentiate heat rash from allergic hives and soothe summer skin quickly.',
    keyTakeaways: [
      'Heat rash resolves best with cool airflow and dry skin; do NOT apply heavy greasy ointments over heat rash.',
      'Use 100% mineral zinc oxide sunscreens which sit on top of the skin without blocking sweat pores.',
      'Dress kids in loose, lightweight, breathable cotton shirts during park outings.',
    ],
    sections: [
      {
        heading: 'Heat Rash vs. Allergic Hives',
        content: 'Heat rash appears as pinhead-sized red bumps in skin folds (neck, groin, armpits), whereas hives are raised, broad pink wheals that migrate across the body.',
      },
    ],
    checklist: [
      'Keep a spray bottle of cool water in the stroller or park bag for quick skin misting.',
      'Reapply SPF 30+ mineral sunscreen every 80 minutes during pool and park play.',
    ],
    redFlags: [
      'Sunburn that develops large fluid-filled blisters over large surface areas.',
      'Child appears weak, complains of severe dizziness, or spikes a high fever.',
    ],
    homeCareTips: [
      'Give child a cool 5-minute sponge bath and allow skin to air dry under a gentle fan.',
    ],
    targetAudience: 'Parents of kindergarten and elementary school kids during peak summer months.',
  },

  // 18. Early Teens (10-14) - Exercise-Induced Bronchoconstriction
  {
    id: 'hp-18',
    title: 'Track & Soccer Breathing: Managing Exercise-Induced Asthma in 10–14 Year Olds',
    subtitle: 'Pre-workout warmups, breathing through the nose, and confidence on the team.',
    slug: 'early-teen-sports-asthma-management',
    ageGroups: ['10-14'],
    seasons: ['spring', 'autumn-monsoon', 'winter'],
    concerns: ['asthma-breathing'],
    setting: 'sports-outdoors',
    symptomStage: 'prevention',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'April 2026',
    medicalReviewer: {
      name: 'Dr. Marcus Vance, MD',
      role: 'Sports Medicine & Adolescent Health Fellow',
      institution: 'Metropolitan Youth Sports Institute',
      verifiedYear: 2026,
    },
    image: imgSummerHydration,
    summary: 'Many middle school athletes feel embarrassed when coughing sets in 10 minutes into a soccer scrimmage. Discover how taking 2 puffs of albuterol through a spacer before warm-ups keeps airways wide open and allows full athletic participation.',
    keyTakeaways: [
      'Taking bronchodilators 15 minutes before exertion prevents airway narrowing for up to 3 hours.',
      'A structured 10-minute progressive warm-up induces a natural "refractory period" where lungs resist bronchospasm.',
      'Nasal breathing filters, warms, and humidifies air before it reaches the bronchial tree.',
    ],
    sections: [
      {
        heading: 'Why Young Athletes Cough During Sprints',
        content: 'Rapid mouth breathing dries out the delicate airway lining, triggering smooth muscle tightening.',
      },
    ],
    checklist: [
      'Inhale pre-sports medication 15 minutes prior to game whistle.',
      'Ensure the team coach has a copy of your Asthma Action Plan.',
    ],
    redFlags: [
      'Severe tightness where athlete cannot speak or finish a short sprint drill.',
      'Wheezing continues 20 minutes after taking rescue medication.',
    ],
    homeCareTips: [
      'Walk slowly during cool-downs; never sit down abruptly right after intense sprints.',
    ],
    targetAudience: 'Middle school athletes, parents, and youth sports coaches.',
  },

  // 19. Late Teens (14-18) - Carrying Epinephrine Independently
  {
    id: 'hp-19',
    title: 'Dating, Dining Out & Carrying Epi: Teen Independence with Severe Food Allergies',
    subtitle: 'How 14–18 year olds can dine safely, talk to dates, and handle accidental cross-contact.',
    slug: 'late-teen-dating-dining-severe-allergies',
    ageGroups: ['14-18'],
    seasons: ['all'],
    concerns: ['allergies'],
    setting: 'dining-travel',
    symptomStage: 'prevention',
    triggerType: 'food-ingestion',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'September 2026',
    medicalReviewer: {
      name: 'Dr. Priya Patel, MD',
      role: 'Adolescent Medicine Specialist',
      institution: 'Youth Wellness Alliance',
      verifiedYear: 2026,
    },
    image: imgSpringAllergies,
    summary: 'High schoolers frequently face peer pressure to eat at unfamiliar restaurants or attend parties where allergen cross-contamination is high. This guide provides scripts for ordering, explains kissing cross-contact risks, and reinforces carrying two auto-injectors.',
    keyTakeaways: [
      'Partners who have eaten peanuts or tree nuts can transfer allergens via saliva for up to 4 hours; waiting and brushing teeth is essential.',
      'Never attend a social gathering without two epinephrine devices on your person.',
      'Always inspect food packaging yourself rather than relying on a friend\'s verbal assurance.',
    ],
    sections: [
      {
        heading: 'Social Pressure and the Danger of Downplaying Symptoms',
        content: 'Studies show older teens are most vulnerable to severe reactions because of hesitation to use auto-injectors in front of peers.',
      },
    ],
    checklist: [
      'Carry two unexpired epinephrine auto-injectors in a dedicated pocket or bag.',
      'Set up medical emergency ID on your smartphone lock screen.',
    ],
    redFlags: [
      'Throat tightness, tingling lips, sudden hoarseness, or feeling faint.',
      'Vomiting combined with hives after eating restaurant food.',
    ],
    homeCareTips: [
      'Administer epinephrine immediately into outer thigh and call 911.',
    ],
    targetAudience: 'High school students, varsity athletes, and young adults with food allergies.',
  },

  // 20. Young Adults (18-25): Post-Viral Fatigue & Immune Recovery
  {
    id: 'hp-20',
    title: 'Overcoming Post-Viral Fatigue & Lingering Cough in Young Adults (18–25)',
    subtitle: 'Rebuilding lung endurance, mitochondrial energy, and safe return to campus life.',
    slug: 'young-adult-post-viral-fatigue-recovery',
    ageGroups: ['18-25'],
    seasons: ['winter', 'autumn-monsoon', 'spring'],
    concerns: ['flu-cough', 'immunity-nutrition', 'general-wellness'],
    setting: 'school-work',
    symptomStage: 'recovery',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'February 2026',
    medicalReviewer: {
      name: 'Dr. Marcus Vance, MD',
      role: 'Sports Medicine & Adolescent Health Fellow',
      institution: 'Metropolitan Youth Sports Institute',
      verifiedYear: 2026,
    },
    image: imgHeroHealthpulse,
    summary: 'After recovering from influenza, mono, or COVID-19, young adults often attempt to resume intense workouts too quickly, triggering weeks of chronic exhaustion. Learn the graded return-to-activity protocol and nutritional rebuilding plan.',
    keyTakeaways: [
      'Post-viral bronchial hyper-reactivity can cause a dry, nagging cough for up to 6 weeks after viral clearance.',
      'Wait until resting heart rate has returned to baseline for 48 consecutive hours before resuming gym workouts.',
      'Support cellular recovery with coenzyme Q10, magnesium glycinate, and colorful polyphenols.',
    ],
    sections: [
      {
        heading: 'Why Rushing Back Prolongs Sickness',
        content: 'Immune cells consume massive energy during viral clearance. Pushing through exhaustion causes systemic cortisol surges that delay tissue repair.',
      },
    ],
    checklist: [
      'Follow the 50% rule: start workouts at half your normal intensity and duration.',
      'Ensure 8.5 hours of sleep nightly while recovering.',
    ],
    redFlags: [
      'Chest pain, shortness of breath while walking on flat ground, or irregular heart palpitations.',
      'Fever returns after being completely normal for several days.',
    ],
    homeCareTips: [
      'Warm saltwater gargles and steam inhalations soothe lingering airway irritation.',
    ],
    targetAudience: 'College students, working young adults, and athletes recovering from seasonal viral bugs.',
  },

  // 21. New Parents (26-35): Pediatric Eczema Bathing & Corticosteroid Safety
  {
    id: 'hp-21',
    title: 'Topical Steroid Phobia vs. Pediatric Eczema Relief: A Clinical Guide for 26–35 Parents',
    subtitle: 'Understanding potency classes, finger-tip units, and safe flare tapers for babies and toddlers.',
    slug: 'pediatric-topical-steroid-safety-guide',
    ageGroups: ['26-35'],
    seasons: ['winter', 'spring', 'autumn-monsoon'],
    concerns: ['skin-eczema'],
    setting: 'home-bedroom',
    symptomStage: 'active-flare',
    triggerType: 'physical-climate',
    perspective: 'parent-caregiver',
    readTimeMinutes: 6,
    publishedDate: 'January 2026',
    medicalReviewer: {
      name: 'Dr. Elena Rostova, MD',
      role: 'Pediatric Dermatologist',
      institution: 'University Pediatric Dermatology Clinic',
      verifiedYear: 2026,
    },
    image: imgWinterSkincare,
    summary: 'Many new parents fear using prescribed hydrocortisone on their infant’s red cheeks and skin folds. This guide clears up medical misconceptions, explains the Finger Tip Unit (FTU) dosing standard, and provides a gentle tapering schedule.',
    keyTakeaways: [
      'Under-treating eczema allows chronic inflammation to damage the skin barrier, increasing the risk of allergic sensitization.',
      'One Finger Tip Unit (from adult index finger crease to tip) covers an area equal to two adult hands.',
      'Apply medicated ointment first to red inflamed patches, wait 15 minutes, then apply thick moisturizer over entire body.',
    ],
    sections: [
      {
        heading: 'Dispelling the Fear Around Low-Potency Topical Steroids',
        content: 'Low-potency 1% hydrocortisone has a 60-year pediatric safety track record when used for short 5–7 day bursts to quench active inflammation.',
      },
    ],
    checklist: [
      'Use the Fingertip Unit standard to avoid using too much or too little cream.',
      'Taper frequency from twice daily down to once daily as redness subsides.',
    ],
    redFlags: [
      'Skin that oozes honey-colored fluid or forms yellow crusting.',
      'Child is unable to sleep due to severe continuous itching.',
    ],
    homeCareTips: [
      'Keep infant fingernails filed short and dress in soft cotton scratch mittens at night.',
    ],
    targetAudience: 'New parents and infant caregivers managing childhood atopic dermatitis.',
  },

  // 22. Mid-Adults (36-44): Spring Asthma Flares & Outdoor Gardening
  {
    id: 'hp-22',
    title: 'Spring Yardwork & Gardening with Asthma: Safe Allergen Shield for 36–44 Year Olds',
    subtitle: 'Mulch mold, grass pollen clouds, and protective barrier strategies for weekend gardeners.',
    slug: 'spring-gardening-asthma-allergy-shield',
    ageGroups: ['36-44'],
    seasons: ['spring'],
    concerns: ['allergies', 'asthma-breathing'],
    setting: 'sports-outdoors',
    symptomStage: 'prevention',
    triggerType: 'airborne-pollen',
    perspective: 'youth-self',
    readTimeMinutes: 4,
    publishedDate: 'April 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgSpringAllergies,
    summary: 'Raking old autumn mulch and mowing damp spring lawns releases massive concentrations of Alternaria mold spores and grass allergens. Discover how parents can landscape and garden safely without triggering severe bronchospasms.',
    keyTakeaways: [
      'Wear an N95 particulate respirator when mowing lawns or spreading wood mulch.',
      'Mow in the late afternoon when grass pollen counts are substantially lower than morning peaks.',
      'Shower and change clothes immediately after outdoor yard chores.',
    ],
    sections: [
      {
        heading: 'The Hidden Mold Spores in Spring Mulch',
        content: 'Damp mulch heaps trap fungal spores that become aerosolized the moment they are disturbed by rakes or shovels.',
      },
    ],
    checklist: [
      'Check local pollen and mold counts before starting major landscaping.',
      'Keep rescue inhaler in your gardening apron pocket.',
    ],
    redFlags: [
      'Wheezing and chest tightness that does not clear after rest and bronchodilator use.',
      'Severe eye swelling with pain or vision changes.',
    ],
    homeCareTips: [
      'Rinse eyes with sterile saline and wash hair to remove trapped botanical dust.',
    ],
    targetAudience: 'Homeowners and active adults aged 36–44 who enjoy gardening and outdoor maintenance.',
  },

  // 23. Mature Adults (50+): Seasonal Influenza & Vaccine Timing
  {
    id: 'hp-23',
    title: 'Autumn Influenza & RSV Vaccine Guidance for Adults 50+: Maximizing Antibody Protection',
    subtitle: 'Immunosenescence, high-dose vaccine options, and protecting family gatherings.',
    slug: 'mature-adults-flu-rsv-vaccine-timing',
    ageGroups: ['50+'],
    seasons: ['autumn-monsoon', 'winter'],
    concerns: ['flu-cough', 'immunity-nutrition'],
    setting: 'home-bedroom',
    symptomStage: 'prevention',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'September 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgHeroHealthpulse,
    summary: 'As the immune system matures (immunosenescence), antibody titers from standard vaccines can wane faster. This clinical guide explains optimal vaccination windows in early autumn, high-dose formulations, and how to stay healthy when grandchildren visit.',
    keyTakeaways: [
      'Receive seasonal flu shots in late September or October for peak antibody coverage across winter waves.',
      'Adults over 65 qualify for high-dose or adjuvanted flu shots that elicit stronger protective immune responses.',
      'Encourage family members with runny noses to wear masks around vulnerable older relatives.',
    ],
    sections: [
      {
        heading: 'Why Timing Matters in Seasonal Vaccination',
        content: 'Vaccinating too early in July or August can result in reduced antibody protection by February when late-season flu strains peak.',
      },
    ],
    checklist: [
      'Schedule annual influenza and updated COVID-19 vaccines in October.',
      'Wash hands thoroughly after handling school backpacks or toys from visiting grandchildren.',
    ],
    redFlags: [
      'Sudden high fever accompanied by confusion, severe weakness, or chest pressure.',
      'Shortness of breath walking from room to room.',
    ],
    homeCareTips: [
      'Rest completely, hydrate with warm broths, and consult your physician within 48 hours for antiviral medications (like oseltamivir) if flu symptoms appear.',
    ],
    targetAudience: 'Adults aged 50 and above, grandparents, and caregivers of older family members.',
  },

  // 24. Mature Adults (50+): Summer Heat & Medication Interactions
  {
    id: 'hp-24',
    title: 'Summer Heat Vulnerability & Common Medications in Adults 50+: Blood Pressure & Diuretics',
    subtitle: 'How cardiovascular and allergy medications impair sweat cooling and hydration balance.',
    slug: 'mature-adults-summer-heat-medication-interactions',
    ageGroups: ['50+'],
    seasons: ['summer'],
    concerns: ['general-wellness'],
    setting: 'sports-outdoors',
    symptomStage: 'prevention',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'June 2026',
    medicalReviewer: {
      name: 'Dr. Marcus Vance, MD',
      role: 'Sports Medicine & Adolescent Health Fellow',
      institution: 'Metropolitan Youth Sports Institute',
      verifiedYear: 2026,
    },
    image: imgSummerHydration,
    summary: 'Many mature adults take blood pressure medications (ACE inhibitors, beta-blockers) or diuretics that alter sweat rates and blunt thirst sensation. Discover how to exercise outdoors, walk in the park, and stay safely hydrated in high summer heat.',
    keyTakeaways: [
      'Beta-blockers reduce blood flow to the skin, limiting the body\'s natural heat dissipation mechanism.',
      'Diuretics increase fluid excretion, speeding up heat exhaustion on days with temperatures above 85°F (29°C).',
      'Schedule walks before 9:00 AM or after 7:00 PM and take shaded rest breaks every 15 minutes.',
    ],
    sections: [
      {
        heading: 'How Medications Alter Temperature Regulation',
        content: 'Certain common prescriptions interfere with autonomic thermoregulation, making mature adults prone to sudden fainting (heat syncope).',
      },
    ],
    checklist: [
      'Carry a 24 oz insulated water bottle on every outdoor stroll.',
      'Check blood pressure regularly during heatwaves as dehydration can cause sharp drops in pressure.',
    ],
    redFlags: [
      'Dizziness when standing up, slurred speech, confusion, or hot dry skin without sweating.',
      'Rapid heart rate combined with nausea and lightheadedness.',
    ],
    homeCareTips: [
      'Rest in air conditioning, sip cool water, and apply damp washcloths to wrists and forehead.',
    ],
    targetAudience: 'Mature adults aged 50+, retirees, and adult children checking in on aging parents.',
  },

  // 25. All Ages - Spring Grass Pollen & Reactive Bronchospasms
  {
    id: 'hp-25',
    title: 'Spring Grass Pollen & Reactive Bronchospasms: A Guide for Kids, Teens & Adults',
    subtitle: 'Cross-reactive timothy grass, ocular itching, and outdoor sports air conditioning.',
    slug: 'spring-grass-pollen-bronchospasm-all-ages',
    ageGroups: ['5-9', '10-14', '14-18', '18-25', '26-35', '36-44', '50+'],
    seasons: ['spring', 'summer'],
    concerns: ['allergies', 'asthma-breathing'],
    setting: 'sports-outdoors',
    symptomStage: 'early-signs',
    triggerType: 'airborne-pollen',
    perspective: 'all',
    readTimeMinutes: 5,
    publishedDate: 'April 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgAsthmaLungs,
    summary: 'Grass pollen spikes in late spring and early summer when lawn mowers and athletic turf churn microscopic fragments airborne. Discover how second-generation antihistamines combined with saline ocular rinses prevent sudden asthma bronchospasms.',
    keyTakeaways: [
      'Grass pollen is smaller than tree pollen and can penetrate deeper into secondary bronchioles.',
      'Wear wraparound sunglasses during windy outdoor soccer or track sessions to block conjunctival pollen deposition.',
      'Keep car windows rolled up with air conditioning set to recirculation mode during morning commutes.',
    ],
    sections: [
      {
        heading: 'Why Grass Pollen Hits the Lower Airways Hard',
        content: 'When grass pollen grains absorb atmospheric humidity and rupture, they release sub-micronic allergen particles that stay suspended in breathing air for hours.',
      },
    ],
    checklist: [
      'Take oral antihistamine 60 minutes before attending outdoor sporting events.',
      'Wipe down pets with a damp towel before letting them indoors after romping in fresh grass.',
    ],
    redFlags: [
      'Audible wheezing that restricts speaking to single words.',
      'Chest tightness persisting after repeated bronchodilator puffs.',
    ],
    homeCareTips: [
      'Place cold gel eye masks over closed lids to rapidly reduce allergic inflammation and itching.',
    ],
    targetAudience: 'Families, youth athletes, and active adults facing late spring grass pollen.',
  },

  // 26. All Ages - Summer Food Allergy Road Trips & Travel Dining
  {
    id: 'hp-26',
    title: 'Summer Vacation Food Allergy Survival: Road Trips, Flights & Beachside Dining',
    subtitle: 'Packing cooler bags, airline epinephrine letters, and multilingual restaurant cards.',
    slug: 'summer-travel-food-allergy-safety',
    ageGroups: ['5-9', '10-14', '14-18', '18-25', '26-35', '36-44', '50+'],
    seasons: ['summer'],
    concerns: ['allergies', 'general-wellness'],
    setting: 'dining-travel',
    symptomStage: 'prevention',
    triggerType: 'food-ingestion',
    perspective: 'all',
    readTimeMinutes: 5,
    publishedDate: 'July 2026',
    medicalReviewer: {
      name: 'Dr. Priya Patel, MD',
      role: 'Adolescent Medicine Specialist',
      institution: 'Youth Wellness Alliance',
      verifiedYear: 2026,
    },
    image: imgFoodAllergyDining,
    summary: 'Traveling during summer introduces unpredictable cross-contact risks at highway rest stops, seafood shacks, and vacation rentals. Learn how to secure airline medical pre-clearance, inspect hotel kitchenettes, and pack shelf-stable allergen-safe provisions.',
    keyTakeaways: [
      'Never pack epinephrine in checked luggage where freezing temperatures in cargo holds destroy medication potency.',
      'Carry two sets of auto-injectors per allergic individual in carry-on bags alongside a physician travel letter.',
      'Wipe airplane tray tables and seatbelts with commercial detergent wipes upon boarding.',
    ],
    sections: [
      {
        heading: 'The Rest-Stop Hazard',
        content: 'Fast food outlets during peak summer highway travel frequently interchange cooking utensils and fry oils without allergen segregation.',
      },
    ],
    checklist: [
      'Pack non-perishable safe snacks (sunflower butter pouches, seed crackers, certified oat bars).',
      'Download hospital emergency department locations along your driving route.',
    ],
    redFlags: [
      'Sudden swelling of lips, tongue, or throat after eating vacation meals.',
      'Persistent vomiting or dizziness following suspected restaurant contamination.',
    ],
    homeCareTips: [
      'Inject epinephrine without hesitation if two body systems are affected, and contact local emergency dispatch.',
    ],
    targetAudience: 'Families, road-trippers, and solo travelers navigating severe food allergies.',
  },

  // 27. All Ages - Autumn Gut-Lung Axis & Mucosal Immunity
  {
    id: 'hp-27',
    title: 'The Autumn Gut-Lung Axis: Fermented Nutrition & Mucosal Immune Defense',
    subtitle: 'How probiotic diversity, short-chain fatty acids, and zinc fortify respiratory linings.',
    slug: 'autumn-gut-lung-axis-mucosal-immunity',
    ageGroups: ['5-9', '10-14', '14-18', '18-25', '26-35', '36-44', '50+'],
    seasons: ['autumn-monsoon', 'winter'],
    concerns: ['immunity-nutrition', 'general-wellness'],
    setting: 'home-bedroom',
    symptomStage: 'prevention',
    triggerType: 'physical-climate',
    perspective: 'parent-caregiver',
    readTimeMinutes: 5,
    publishedDate: 'October 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgFluImmunity,
    summary: 'Cutting-edge immunological research reveals that 70% of mucosal defense against respiratory viruses is calibrated by the gut microbiome. Discover how prebiotic fibers, kefir, and fermented vegetables prime circulating dendritic cells before winter flu arrives.',
    keyTakeaways: [
      'Short-chain fatty acids (like butyrate) produced in the colon travel through the bloodstream to enhance alveolar macrophage antiviral defense.',
      'Aim for 30 distinct plant foods per week across fruits, vegetables, seeds, and whole grains to maximize microbial diversity.',
      'Minimize unnecessary antibiotic usage for common viral colds to preserve essential microbiome species.',
    ],
    sections: [
      {
        heading: 'The Communication Network Between Gut and Lungs',
        content: 'When gut microbiota ferment dietary prebiotic fibers, they generate signals that strengthen the tight junctions of airway epithelial cells.',
      },
    ],
    checklist: [
      'Incorporate 1 tablespoon of fermented sauerkraut, kimchi, or live-culture yogurt daily.',
      'Snack on raw apples, berries, and chia seeds rich in fermentable pectin.',
    ],
    redFlags: [
      'Chronic diarrhea or severe abdominal pain accompanied by unexplained weight loss.',
      'High fever lasting longer than 4 days during viral illness.',
    ],
    homeCareTips: [
      'Drink warm bone or vegetable broths seasoned with fresh garlic and turmeric during cold season.',
    ],
    targetAudience: 'Parents, health-conscious youth, and adults wanting evidence-based nutritional immune support.',
  },

  // 28. Winter RSV & Pediatric Wheezing in Multi-Child Homes
  {
    id: 'hp-28',
    title: 'Winter RSV & Toddler Wheezing in Multi-Child Households: Sibling Separation Rules',
    subtitle: 'Nasal suctioning, oxygen monitoring, and preventing infant respiratory syncytial virus.',
    slug: 'winter-rsv-toddler-wheezing-multi-child-home',
    ageGroups: ['5-9', '26-35', '36-44'],
    seasons: ['winter'],
    concerns: ['flu-cough', 'asthma-breathing'],
    setting: 'home-bedroom',
    symptomStage: 'active-flare',
    triggerType: 'physical-climate',
    perspective: 'parent-caregiver',
    readTimeMinutes: 6,
    publishedDate: 'December 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgFluImmunity,
    summary: 'When school-age siblings bring home respiratory viruses in December, infants and toddlers face elevated risk of bronchiolitis and bronchiolar swelling. Learn the clinical triage protocol, nasal clearing techniques, and when to seek hospital evaluation.',
    keyTakeaways: [
      'RSV symptoms typically peak on days 4 and 5 of illness; do not let your guard down on day 2.',
      'Clear nasal mucus thoroughly before every feeding so babies can nurse without choking or exhaustion.',
      'School-age kids should wash hands and change shirts before cuddling baby siblings during winter months.',
    ],
    sections: [
      {
        heading: 'The Unique Anatomy of Infant Airways',
        content: 'Infants have tiny bronchial passages easily obstructed by mucus plugs, causing significant work of breathing.',
      },
    ],
    checklist: [
      'Suction nose with saline mist 10 minutes prior to feeds and naps.',
      'Keep baby fully upright for 20 minutes after drinking milk.',
    ],
    redFlags: [
      'Belly breathing where abdomen pulls in hard and chest sinks.',
      'Fewer than 1 wet diaper in a 6-hour period or dry lips.',
    ],
    homeCareTips: [
      'Keep nursery humidity at 40-50% with clean ultrasonic cool-mist humidifiers.',
    ],
    targetAudience: 'Parents of babies and young children managing winter viral bugs.',
  },

  // 29. Summer Heat Exhaustion Recovery & Cellular Hydration
  {
    id: 'hp-29',
    title: 'Exertional Heat Recovery: The 24-Hour Protocol for Children & Adults',
    subtitle: 'Active cooling baths, cellular rehydration, and returning to physical activity safely.',
    slug: 'heat-exhaustion-cellular-rehydration-protocol',
    ageGroups: ['5-9', '10-14', '14-18', '18-25', '26-35', '36-44', '50+'],
    seasons: ['summer'],
    concerns: ['general-wellness'],
    setting: 'sports-outdoors',
    symptomStage: 'recovery',
    triggerType: 'physical-climate',
    perspective: 'all',
    readTimeMinutes: 4,
    publishedDate: 'June 2026',
    medicalReviewer: {
      name: 'Dr. Marcus Vance, MD',
      role: 'Sports Medicine & Adolescent Health Fellow',
      institution: 'Metropolitan Youth Sports Institute',
      verifiedYear: 2026,
    },
    image: imgSummerHydration,
    summary: 'After experiencing mild heat exhaustion (nausea, dizziness, heavy sweating, muscle cramps), returning to high heat too quickly can precipitate life-threatening heatstroke. Follow this mandatory 24-hour physiological restoration timeline.',
    keyTakeaways: [
      'Rest in air-conditioned shelter (<72°F) for at least 24 hours following heat exhaustion.',
      'Sip 4–6 ounces of balanced oral rehydration solution every 15 minutes rather than chugging icy water.',
      'Avoid all caffeine and high-sugar sports drinks which pull water into the intestines and delay rehydration.',
    ],
    sections: [
      {
        heading: 'The Cellular Impact of Heat Stress',
        content: 'Heat stress temporarily damages vascular endothelial permeability. Full recovery requires rest, mineral salts, and cool environmental temperatures.',
      },
    ],
    checklist: [
      'Monitor urine color until it consistently matches pale straw or clear lemonade.',
      'Check resting pulse rate: it should return to baseline before light exercise resumes.',
    ],
    redFlags: [
      'Temperature above 103°F (39.4°C) with dry or clammy skin.',
      'Confusion, loss of balance, or loss of consciousness.',
    ],
    homeCareTips: [
      'Rest horizontally with feet elevated 6 inches to restore venous blood return to the heart.',
    ],
    targetAudience: 'Athletes, parents, outdoor workers, and seniors recovering from hot summer days.',
  },

  // 30. Spring Indoor Allergen Management & Open Windows
  {
    id: 'hp-30',
    title: 'The Open-Window Dilemma: Managing Spring Fresh Air vs. Pollen Influx',
    subtitle: 'Window screen pollen filters, cross-ventilation timing, and HEPA air scrubbing.',
    slug: 'spring-open-window-pollen-management',
    ageGroups: ['5-9', '10-14', '14-18', '18-25', '26-35', '36-44', '50+'],
    seasons: ['spring'],
    concerns: ['allergies', 'asthma-breathing'],
    setting: 'home-bedroom',
    symptomStage: 'prevention',
    triggerType: 'airborne-pollen',
    perspective: 'parent-caregiver',
    readTimeMinutes: 4,
    publishedDate: 'April 2026',
    medicalReviewer: {
      name: 'Dr. Priya Patel, MD',
      role: 'Adolescent Medicine Specialist',
      institution: 'Youth Wellness Alliance',
      verifiedYear: 2026,
    },
    image: imgSpringAllergies,
    summary: 'After months of winter lockdown, everyone wants to fling open windows to fresh spring air. For families with asthma and allergies, this lets billions of pollen particles settle into sofa cushions and mattresses. Here is the safe ventilation protocol.',
    keyTakeaways: [
      'Only open windows after 8:00 PM or during steady rainfall when atmospheric pollen is washed out.',
      'Install electrostatically charged micron window screen filters to block 90% of tree pollen.',
      'Run bedroom HEPA purifiers on turbo mode for 30 minutes before sleep with all doors and windows sealed.',
    ],
    sections: [
      {
        heading: 'Diurnal Pollen Convection Currents',
        content: 'Sunlight warms the ground in early morning, creating upward thermal drafts that disperse tree pollen between 6:00 AM and noon.',
      },
    ],
    checklist: [
      'Keep bedroom windows shut 24/7 during your child’s peak allergen season.',
      'Wipe windowsill surfaces weekly with damp microfiber rags.',
    ],
    redFlags: [
      'Awakening with severe wheezing or stridor in the middle of the night.',
      'Severe eye swelling with light sensitivity.',
    ],
    homeCareTips: [
      'Wash bed linens in 130°F water weekly to kill dust mites and denature outdoor pollen.',
    ],
    targetAudience: 'Families and apartment dwellers balancing fresh spring air with severe allergies.',
  },

  // 31. Monsoon & Autumn Indoor Mold & Dampness Defense
  {
    id: 'hp-31',
    title: 'Monsoon Dampness & Mold Spores: Airway Protection in Humid Autumn Weather',
    subtitle: 'Dehumidifier thresholds, bathroom ventilation, and spotting Cladosporium mold.',
    slug: 'autumn-monsoon-mold-spore-asthma-defense',
    ageGroups: ['10-14', '14-18', '18-25', '26-35', '36-44', '50+'],
    seasons: ['autumn-monsoon'],
    concerns: ['asthma-breathing', 'allergies'],
    setting: 'home-bedroom',
    symptomStage: 'early-signs',
    triggerType: 'indoor-mites',
    perspective: 'all',
    readTimeMinutes: 5,
    publishedDate: 'September 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgAsthmaLungs,
    summary: 'Prolonged autumn rainstorms and monsoon humidity drive relative indoor humidity over 60%, creating prime breeding grounds for indoor mold colonies. Learn how fungal beta-glucans inflame bronchial passages and how to keep indoor air crisp and safe.',
    keyTakeaways: [
      'Maintain indoor relative humidity between 35% and 50% using compressor dehumidifiers in basements and bedrooms.',
      'Run bathroom exhaust fans for at least 20 minutes after showers to dry out tile grout and shower curtains.',
      'Replace moldy silicone caulking promptly; bleach only removes surface color while roots remain in porous walls.',
    ],
    sections: [
      {
        heading: 'Why Mold Allergens Trigger Severe Asthma Attacks',
        content: 'Mold spores release fungal proteases that degrade mucosal protective barriers, enabling allergens to trigger intense eosinophilic airway inflammation.',
      },
    ],
    checklist: [
      'Inspect window sills and under-sink cabinets for dark spotting or musty odors.',
      'Clean dehumidifier collection tanks weekly with white vinegar to prevent bacterial slime.',
    ],
    redFlags: [
      'Persistent nighttime wheezing unresponsive to standard bronchodilators.',
      'Blood-tinged sputum or high fever accompanying persistent wet cough.',
    ],
    homeCareTips: [
      'Use HEPA air purifiers equipped with activated carbon filters to absorb both mold spores and musty volatile organic compounds.',
    ],
    targetAudience: 'Families living in rainy, humid, or coastal regions during autumn and monsoon seasons.',
  },

  // 32. Winter Nosebleeds & Dry Mucosal Lining Care
  {
    id: 'hp-32',
    title: 'Winter Nosebleeds (Epistaxis) & Parched Airway Care for Kids and Seniors',
    subtitle: 'Kiesselbach’s plexus protection, saline sprays, and safe nosebleed compression.',
    slug: 'winter-dry-air-nosebleeds-epistaxis-care',
    ageGroups: ['5-9', '10-14', '14-18', '18-25', '26-35', '36-44', '50+'],
    seasons: ['winter'],
    concerns: ['skin-eczema', 'general-wellness'],
    setting: 'home-bedroom',
    symptomStage: 'active-flare',
    triggerType: 'physical-climate',
    perspective: 'parent-caregiver',
    readTimeMinutes: 4,
    publishedDate: 'January 2026',
    medicalReviewer: {
      name: 'Dr. Elena Rostova, MD',
      role: 'Pediatric Dermatologist',
      institution: 'University Pediatric Dermatology Clinic',
      verifiedYear: 2026,
    },
    image: imgWinterSkincare,
    summary: 'Sub-zero outdoor air and forced-air radiators strip the delicate mucosal lining of the nasal septum, causing fragile capillaries to crack and bleed. Learn the correct forward-lean pinching method and how to lubricate nasal passages before bed.',
    keyTakeaways: [
      'Never tilt the head backward during a nosebleed; this causes blood to drain down the throat, triggering coughing and nausea.',
      'Pinch the soft lower third of the nose firmly for a full 10 uninterrupted minutes with head tilted slightly forward.',
      'Apply a thin dab of white petroleum jelly or saline nasal gel to the anterior nostrils before bed to create a protective barrier.',
    ],
    sections: [
      {
        heading: 'The Vulnerability of Kiesselbach’s Capillaries',
        content: 'Five separate arterial branches converge at the front of the nasal septum, where dry winter breathing causes rapid crusting and mechanical tearing.',
      },
    ],
    checklist: [
      'Keep bedroom humidity above 40% with a cool-mist humidifier.',
      'Teach kids not to pick dry nasal crusts; use gentle saline mist to soften mucus.',
    ],
    redFlags: [
      'Bleeding that continues after 20 minutes of firm, continuous direct pressure.',
      'Child feels dizzy, lightheaded, or looks pale from heavy bleeding.',
    ],
    homeCareTips: [
      'Apply an ice pack to the bridge of the nose while pinching to stimulate vasoconstriction.',
    ],
    targetAudience: 'Parents of school-age children and older adults experiencing frequent winter nosebleeds.',
  },

  // 33. All-Weather Sports Hydration & Electrolytes
  {
    id: 'hp-33',
    title: 'Year-Round Sports Hydration & Electrolyte Timing for Active Teens & Adults',
    subtitle: 'Sodium loading, sweat rate testing, and pre-exercise fluid pacing across all seasons.',
    slug: 'year-round-sports-hydration-electrolyte-timing',
    ageGroups: ['10-14', '14-18', '18-25', '26-35', '36-44', '50+'],
    seasons: ['all', 'spring', 'summer', 'autumn-monsoon', 'winter'],
    concerns: ['general-wellness', 'immunity-nutrition'],
    setting: 'sports-outdoors',
    symptomStage: 'prevention',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'May 2026',
    medicalReviewer: {
      name: 'Dr. Marcus Vance, MD',
      role: 'Sports Medicine & Adolescent Health Fellow',
      institution: 'Metropolitan Youth Sports Institute',
      verifiedYear: 2026,
    },
    image: imgMatureWellness,
    summary: 'Dehydration does not just happen under direct summer sunlight—winter sports and rainy-day indoor training cause heavy fluid loss through respiration and perspiration. Master the scientific hydration formula for peak athletic output.',
    keyTakeaways: [
      'In cold winter sports, athletes lose up to 1 liter of moisture per hour simply through rapid vapor exhalation in cold dry air.',
      'Thirst is blunted by up to 40% in cold weather due to peripheral vasoconstriction; drink on a clock schedule.',
      'Pair post-workout fluids with 20–30 grams of protein and complex carbohydrates to accelerate cellular re-uptake.',
    ],
    sections: [
      {
        heading: 'Why Cold Weather Masking Dehydration is Dangerous',
        content: 'Because sweat evaporates faster in dry winter air, athletes often believe they are not sweating at all, leading to severe evening cramping.',
      },
    ],
    checklist: [
      'Drink 8 oz of fluid every 20 minutes during prolonged sports practices.',
      'Weigh yourself before and after training to calculate precise fluid replenishment.',
    ],
    redFlags: [
      'Inability to produce urine for more than 6 hours following athletic competition.',
      'Extreme muscle rigidity, weakness, or disorientation.',
    ],
    homeCareTips: [
      'Drink warm electrolyte broths or diluted juices after winter sports practices.',
    ],
    targetAudience: 'Student athletes, adult runners, gym goers, and sports parents.',
  },

  // 34. Winter Circadian Energy & Vitamin D Defense
  {
    id: 'hp-34',
    title: 'Winter Circadian Health & Vitamin D: Combating Seasonal Sluggishness in Adults',
    subtitle: 'Morning daylight exposure, serum 25-hydroxyvitamin D3 targets, and immune activation.',
    slug: 'winter-circadian-health-vitamin-d-sluggishness',
    ageGroups: ['18-25', '26-35', '36-44', '50+'],
    seasons: ['winter'],
    concerns: ['immunity-nutrition', 'general-wellness'],
    setting: 'home-bedroom',
    symptomStage: 'prevention',
    triggerType: 'physical-climate',
    perspective: 'youth-self',
    readTimeMinutes: 5,
    publishedDate: 'November 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgMatureWellness,
    summary: 'When winter daylight hours shrink, circadian rhythms slip, causing daytime fatigue, carbohydrate cravings, and reduced immune surveillance against respiratory viruses. Learn how to calibrate morning lux exposure and maintain optimal Vitamin D3 levels.',
    keyTakeaways: [
      'Between November and March above 37° latitude, the sun angle is too low for the human skin to synthesize Vitamin D.',
      'Target a serum 25(OH)D blood level between 40 and 60 ng/mL for optimal innate immune peptide synthesis.',
      'View 10,000 lux natural morning light or light therapy within 30 minutes of waking to anchor cortisol and melatonin cycles.',
    ],
    sections: [
      {
        heading: 'The Direct Immune Role of Vitamin D3',
        content: 'Vitamin D stimulates respiratory epithelial cells to produce cathelicidins and defensins—natural antimicrobial peptides that destroy viral envelopes.',
      },
    ],
    checklist: [
      'Have your 25-hydroxyvitamin D level tested during annual wellness visits.',
      'Take Vitamin D3 with a meal containing healthy fats for optimal absorption.',
    ],
    redFlags: [
      'Severe depressive mood, inability to get out of bed, or thoughts of self-harm.',
      'Bone pain or severe muscle weakness.',
    ],
    homeCareTips: [
      'Take a brisk 20-minute midday walk outdoors even on overcast winter days.',
    ],
    targetAudience: 'Young adults, working professionals, and mature adults feeling winter fatigue.',
  },

  // 35. Pediatric Post-Fever Safe Return to School
  {
    id: 'hp-35',
    title: 'The Post-Fever Protocol: When is Your Child Truly Ready to Return to School?',
    subtitle: 'The 24-hour unmedicated fever rule, residual coughs, and protecting classroom peers.',
    slug: 'pediatric-post-fever-school-readiness-protocol',
    ageGroups: ['5-9', '10-14', '26-35', '36-44'],
    seasons: ['all', 'winter', 'autumn-monsoon', 'spring'],
    concerns: ['flu-cough', 'general-wellness'],
    setting: 'school-work',
    symptomStage: 'recovery',
    triggerType: 'physical-climate',
    perspective: 'parent-caregiver',
    readTimeMinutes: 4,
    publishedDate: 'October 2026',
    medicalReviewer: {
      name: 'Dr. Sarah Jenkins, MD, FAAP',
      role: 'Chief of Pediatric Allergy & Immunology',
      institution: 'Children\'s Health Center',
      verifiedYear: 2026,
    },
    image: imgFluImmunity,
    summary: 'Sending a child back to school too soon after a viral fever risks secondary bacterial infections and restarts classroom transmission chains. Discover the clinical 24-hour unmedicated fever clearance rule and how to assess energy reserves.',
    keyTakeaways: [
      'A child must be fever-free for a full 24 hours without using acetaminophen or ibuprofen before returning to school.',
      'Appetite and stamina must be recovered: if a child cannot play actively for 30 minutes at home, they are not ready for a 7-hour school day.',
      'A mild lingering post-viral dry cough is normal for 2–3 weeks as bronchial cilia regenerate, provided energy is high and fever is gone.',
    ],
    sections: [
      {
        heading: 'Why Masking Fevers with Medication Backfires',
        content: 'Administering fever reducers in the morning to send a child to school leaves them vulnerable to midday crashes and exposes classmates.',
      },
    ],
    checklist: [
      'Confirm temperature remains normal (<99.5°F) for 24 hours without any medicine.',
      'Ensure child is eating solid food and staying well hydrated.',
    ],
    redFlags: [
      'A child who has been fever-free for 2 days suddenly develops a new spike in temperature above 102°F with ear pain.',
      'Extreme lethargy or difficulty waking.',
    ],
    homeCareTips: [
      'Pack an extra water bottle and request a recess activity modification for the first two days back.',
    ],
    targetAudience: 'Parents of preschool and elementary school children recovering from viral bugs.',
  },

  // 36. Whole-Family Anti-Inflammatory Meal Prep
  {
    id: 'hp-36',
    title: 'Whole-Family Anti-Inflammatory Meal Prep: Seasonal Recipes for Lung & Skin Health',
    subtitle: 'Omega-3 fatty acids, quercetin-rich foods, and antioxidant broths for all ages.',
    slug: 'whole-family-anti-inflammatory-seasonal-meal-prep',
    ageGroups: ['5-9', '10-14', '14-18', '18-25', '26-35', '36-44', '50+'],
    seasons: ['all', 'spring', 'summer', 'autumn-monsoon', 'winter'],
    concerns: ['immunity-nutrition', 'skin-eczema', 'asthma-breathing', 'general-wellness'],
    setting: 'home-bedroom',
    symptomStage: 'prevention',
    triggerType: 'food-ingestion',
    perspective: 'all',
    readTimeMinutes: 5,
    publishedDate: 'March 2026',
    medicalReviewer: {
      name: 'Dr. Priya Patel, MD',
      role: 'Adolescent Medicine Specialist',
      institution: 'Youth Wellness Alliance',
      verifiedYear: 2026,
    },
    image: imgFoodAllergyDining,
    summary: 'What we feed growing bodies directly influences systemic inflammatory pathways in the lungs and dermis. Learn how quercetin (found in red onions and apples) naturally stabilizes mast cells, while marine omega-3s dial down eczema and asthma flares.',
    keyTakeaways: [
      'Quercetin is a natural bioflavonoid that prevents mast cells from dumping histamine into the bloodstream.',
      'Wild-caught fatty fish (salmon, sardines) provide EPA and DHA that suppress inflammatory leukotriene synthesis.',
      'Batch-cook rich vegetable bone broths with ginger, shiitake mushrooms, and garlic for quick weeknight immune dinners.',
    ],
    sections: [
      {
        heading: 'Food as Cellular Signaling',
        content: 'Nutrients in colorful plant foods act as biochemical switches that upregulate antioxidant enzymes and calm hyper-reactive immune responses.',
      },
    ],
    checklist: [
      'Include fatty fish or chia/flax seeds at least twice weekly in family meals.',
      'Keep raw apples with skin intact in lunchboxes for natural quercetin intake.',
    ],
    redFlags: [
      'Any sudden facial swelling or wheezing after eating newly introduced foods.',
    ],
    homeCareTips: [
      'Prepare warm golden turmeric milk with a pinch of black pepper before bedtime for soothing anti-inflammatory sleep.',
    ],
    targetAudience: 'Families, parents, and health-conscious youth aiming for long-term seasonal resilience.',
    dietaryPreference: 'both',
    dietaryNotes: {
      vegetarian: 'Rely on organic sprouted tofu, walnuts, chia seeds, and algae-based DHA for anti-inflammatory lipid repair.',
      nonVegetarian: 'Wild Alaskan salmon, pasture-raised egg yolks, and homemade chicken bone broths for rich glycine and EPA.',
    },
  },

  // 37. Dedicated Vegetarian Pediatric & Family Immunity Guide
  {
    id: 'hp-37',
    title: 'The Vegetarian Pediatric & Family Immune Defense: Plant-Based Zinc, Iron & Omega-3s',
    subtitle: 'Overcoming phytate binding, pairing Vitamin C with legumes, and algae DHA for lung health.',
    slug: 'vegetarian-pediatric-family-immune-defense',
    ageGroups: ['5-9', '10-14', '14-18', '18-25', '26-35', '36-44', '50+'],
    seasons: ['all', 'autumn-monsoon', 'winter', 'spring'],
    concerns: ['immunity-nutrition', 'general-wellness'],
    setting: 'home-bedroom',
    symptomStage: 'prevention',
    triggerType: 'food-ingestion',
    perspective: 'all',
    readTimeMinutes: 5,
    publishedDate: 'November 2026',
    medicalReviewer: {
      name: 'Dr. Priya Patel, MD',
      role: 'Adolescent Medicine Specialist',
      institution: 'Youth Wellness Alliance',
      verifiedYear: 2026,
    },
    image: imgFoodAllergyDining,
    summary: 'A well-planned vegetarian or plant-forward lifestyle offers potent antioxidant and polyphenol protection against viral infections. Learn how to soak lentils to neutralize phytates, optimize non-heme iron absorption with lemon juice, and boost cellular zinc levels.',
    keyTakeaways: [
      'Soaking lentils, chickpeas, and beans for 12 hours breaks down phytic acid, increasing zinc and iron bioavailability by up to 50%.',
      'Pair plant-based iron (spinach, lentils) with Vitamin C (citrus, bell peppers) to boost absorption by four-fold.',
      'Algae-derived DHA/EPA supplements provide pure anti-inflammatory omega-3s without fish allergens or ocean contaminants.',
    ],
    sections: [
      {
        heading: 'Optimizing Plant Micronutrients for Respiratory Immunity',
        content: 'Zinc is essential for thymus gland function and T-cell replication. Pumpkin seeds, hemp hearts, fortified nutritional yeast, and sprouted legumes provide rich, bioavailable plant zinc.',
      },
    ],
    checklist: [
      'Add pumpkin seeds or chia seeds to morning oatmeal or smoothies.',
      'Always squeeze fresh lemon juice over cooked lentil soups or spinach dishes.',
      'Include Vitamin B12 fortified foods or supplements for nervous system stamina.',
    ],
    redFlags: [
      'Unusual pale gums, brittle spoon-shaped nails, or extreme chronic lethargy (signs of iron deficiency anemia).',
    ],
    homeCareTips: [
      'Brew warming golden milk using fortified soy or oat milk, freshly grated turmeric, ginger, and a dash of black pepper.',
    ],
    targetAudience: 'Vegetarian and plant-based families, children, teens, and adults.',
    dietaryPreference: 'vegetarian',
    dietaryNotes: {
      vegetarian: '100% vegetarian plant protocol optimized with sprouted grains, seeds, and fermented tempeh.',
    },
  },

  // 38. Dedicated Non-Vegetarian Recovery & Bioavailable Nutrients Guide
  {
    id: 'hp-38',
    title: 'The Omnivore Recovery Blueprint: Bone Broths, Wild Salmon & Bioavailable Zinc',
    subtitle: 'Heme iron for sports stamina, collagen for gut lining repair, and cold-season convalescence.',
    slug: 'omnivore-recovery-bone-broths-wild-salmon-zinc',
    ageGroups: ['5-9', '10-14', '14-18', '18-25', '26-35', '36-44', '50+'],
    seasons: ['all', 'winter', 'autumn-monsoon', 'spring'],
    concerns: ['immunity-nutrition', 'general-wellness', 'flu-cough'],
    setting: 'home-bedroom',
    symptomStage: 'recovery',
    triggerType: 'food-ingestion',
    perspective: 'all',
    readTimeMinutes: 5,
    publishedDate: 'November 2026',
    medicalReviewer: {
      name: 'Dr. Marcus Vance, MD',
      role: 'Sports Medicine & Adolescent Health Fellow',
      institution: 'Metropolitan Youth Sports Institute',
      verifiedYear: 2026,
    },
    image: imgFluImmunity,
    summary: 'Animal-based whole foods supply pre-formed Vitamin A (retinol), highly bioavailable heme iron, and direct EPA/DHA omega-3s. Discover how traditional slow-simmered chicken and beef bone broths seal leaky mucosal barriers and accelerate post-viral recovery.',
    keyTakeaways: [
      'Gelatin and glycine extracted from slow-cooked bone broth rebuild the intestinal epithelial barrier, reducing systemic allergic flares.',
      'Heme iron from grass-fed beef and dark poultry meat absorbs at 25–30%, preventing sports-induced fatigue in young athletes.',
      'Wild salmon and sardines provide direct marine EPA and DHA that suppress airway eosinophils in asthma.',
    ],
    sections: [
      {
        heading: 'Why Traditional Convalescent Broths Work',
        content: 'Chicken broth delivers carnosine, a compound that calms upper respiratory neutrophils, easing congestion and sore throat pain.',
      },
    ],
    checklist: [
      'Simmer poultry bones with vegetables, bay leaf, and apple cider vinegar for 12–24 hours.',
      'Serve wild salmon or mackerel twice weekly for peak anti-inflammatory marine fats.',
    ],
    redFlags: [
      'Sudden allergic reaction or hives following seafood ingestion.',
    ],
    homeCareTips: [
      'Sip warm seasoned bone broth with crushed fresh ginger during viral fever recovery phases.',
    ],
    targetAudience: 'Non-vegetarian households, student athletes, and adults looking for nutrient-dense recovery.',
    dietaryPreference: 'non-vegetarian',
    dietaryNotes: {
      nonVegetarian: 'Focuses on grass-fed broths, pasture-raised poultry, and wild cold-water seafood for recovery.',
    },
  },
];


