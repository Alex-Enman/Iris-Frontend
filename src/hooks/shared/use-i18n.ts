'use client';

// Re-export types and utilities from lib/i18n for use in hooks/contexts
// This allows components to access i18n through hooks instead of directly from lib
export type { TranslationKey, Language } from '@lib/i18n';
export {
  translations,
  getStoredLanguage,
  t,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from '@lib/i18n';

