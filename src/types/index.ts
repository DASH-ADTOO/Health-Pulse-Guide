export type AgeGroupId =
  | '5-9'
  | '10-14'
  | '14-18'
  | '18-25'
  | '26-35'
  | '36-44'
  | '50+'
  | 'all';

export type SeasonId = 'spring' | 'summer' | 'autumn-monsoon' | 'winter' | 'all';

export type HealthConcernId =
  | 'general-wellness'
  | 'asthma-breathing'
  | 'allergies'
  | 'skin-eczema'
  | 'flu-cough'
  | 'immunity-nutrition';

export type EnvironmentSettingId =
  | 'school-work'
  | 'sports-outdoors'
  | 'home-bedroom'
  | 'dining-travel'
  | 'all';

export type SymptomStageId =
  | 'prevention'
  | 'early-signs'
  | 'active-flare'
  | 'recovery'
  | 'all';

export type TriggerTypeId =
  | 'airborne-pollen'
  | 'food-ingestion'
  | 'indoor-mites'
  | 'physical-climate'
  | 'all';

export type PerspectiveId = 'youth-self' | 'parent-caregiver' | 'all';

export type DietaryPreference = 'all' | 'vegetarian' | 'non-vegetarian';

export interface AgeGroupInfo {
  id: AgeGroupId;
  label: string;
  category: string;
  description: string;
  iconName: string;
  focusHighlights: string[];
}

export interface SeasonInfo {
  id: SeasonId;
  label: string;
  climateTag: string;
  description: string;
  iconName: string;
  seasonalRisks: string[];
  bannerTip: string;
}

export interface HealthConcernInfo {
  id: HealthConcernId;
  label: string;
  description: string;
  iconName: string;
  isIllnessOrAllergy: boolean;
}

export interface FilterOption<T> {
  id: T;
  label: string;
  shortLabel?: string;
  description?: string;
}

export interface MedicalReviewer {
  name: string;
  role: string;
  institution: string;
  verifiedYear: number;
}

export interface ArticleSection {
  heading: string;
  content: string;
  bulletPoints?: string[];
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  ageGroups: AgeGroupId[];
  seasons: SeasonId[];
  concerns: HealthConcernId[];
  setting: EnvironmentSettingId;
  symptomStage: SymptomStageId;
  triggerType: TriggerTypeId;
  perspective: PerspectiveId;
  readTimeMinutes: number;
  publishedDate: string;
  medicalReviewer: MedicalReviewer;
  image: string;
  summary: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  checklist: string[];
  redFlags: string[];
  homeCareTips: string[];
  targetAudience: string;
  isFeatured?: boolean;
  dietaryPreference?: 'all' | 'vegetarian' | 'non-vegetarian' | 'both';
  dietaryNotes?: {
    vegetarian?: string;
    nonVegetarian?: string;
  };
}

export interface FamilyProfile {
  id: string;
  name: string;
  ageGroup: AgeGroupId;
  season: SeasonId;
  concerns: HealthConcernId[];
  setting?: EnvironmentSettingId;
  stage?: SymptomStageId;
  diet?: DietaryPreference;
  notes?: string;
}

export type SymptomCategory =
  | 'fever'
  | 'cough-cold'
  | 'allergic-rhinitis'
  | 'asthma-wheezing'
  | 'eczema-rash'
  | 'headache'
  | 'digestive'
  | 'fatigue-bodyache';

export type SymptomSeverity = 'mild' | 'moderate' | 'severe';

export interface SymptomLog {
  id: string;
  timestamp: string; // ISO string
  category: SymptomCategory;
  symptomName: string;
  severity: SymptomSeverity;
  temperatureF?: number;
  temperatureC?: number;
  triggers: string[];
  notes?: string;
  ageGroup: AgeGroupId;
}

export interface SleepLog {
  id: string;
  date: string; // YYYY-MM-DD
  bedtime: string; // HH:MM
  wakeTime: string; // HH:MM
  durationMinutes: number;
  qualityRating: 1 | 2 | 3 | 4 | 5;
  awakeningsCount: number;
  disruptions: string[];
  notes?: string;
  ageGroup: AgeGroupId;
}

export interface IndianHelpline {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'emergency' | 'maternal-child' | 'mental-health' | 'advisory' | 'poison';
  tollFree: boolean;
  hours: string;
  languages: string[];
  keyUseCases: string[];
  highlight?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  suggestedActions?: string[];
}
