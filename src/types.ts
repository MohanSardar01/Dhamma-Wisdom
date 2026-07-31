export type QuoteAuthor =
  | 'Dr. B.R. Ambedkar'
  | 'Gautama Buddha'
  | 'Emperor Ashoka'
  | 'Nagarjuna'
  | 'Bodhidharma'
  | 'Shantideva'
  | 'Buddhaghosa'
  | 'Dogen'
  | 'Ajahn Chah'
  | 'Bhikkhu Bodhi'
  | 'Dalai Lama'
  | 'Thich Nhat Hanh'
  | 'Sant Kabir';

export type QuoteCategory =
  | 'Education'
  | 'Knowledge'
  | 'Wisdom'
  | 'Equality'
  | 'Compassion'
  | 'Meditation'
  | 'Mindfulness'
  | 'Democracy'
  | 'Constitution'
  | 'Leadership'
  | 'Justice'
  | 'Discipline'
  | 'Determination'
  | 'Peace'
  | 'Self Growth'
  | 'Social Reform'
  | 'Dhamma'
  | 'Daily Motivation';

export type LanguageCode = 'en' | 'hi' | 'mr' | 'pa';

export interface QuoteTranslations {
  en: string;
  hi?: string;
  mr?: string;
  pa?: string;
}

export interface QuoteItem {
  id: string;
  text: string;
  translations?: QuoteTranslations;
  author: QuoteAuthor;
  authorTitle: string;
  category: QuoteCategory;
  source: string;
  isVerified: boolean;
  historicalNote?: string;
  tags: string[];
  likesCount?: number;
  aiDisclaimer?: string;
}

export interface AuthorProfile {
  name: QuoteAuthor;
  title: string;
  era: string;
  bio: string;
  corePhilosophy: string[];
  keyWorks: string[];
  avatarSymbol: 'bodhi' | 'wheel' | 'pillar' | 'book' | 'lotus';
  accentColor: string;
}

export interface QuoteCollection {
  id: string;
  name: string;
  description: string;
  quoteIds: string[];
  createdAt: string;
}

export interface AIReflection {
  quoteId: string;
  coreMeaning: string;
  historicalContext: string;
  modernApplication: string;
  keyTakeaway: string;
  reflectionPrompt: string;
}

export interface CardCustomizationConfig {
  theme: 'ivory' | 'gold' | 'blue' | 'slate' | 'emerald';
  aspectRatio: '1:1' | '9:16' | '16:9';
  fontStyle: 'serif' | 'sans' | 'mono';
  showAuthorImage: boolean;
  showCategoryTag: boolean;
  showWatermark: boolean;
  customNote?: string;
}
