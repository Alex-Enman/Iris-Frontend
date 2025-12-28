'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  type Language,
  type TranslationKey,
  normalizeLanguage,
  languageToLocale,
  t as translate,
} from '@lib/i18n';

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  locale: string;
  t: (key: TranslationKey) => string;
};

const initialState: LanguageProviderState = {
  language: DEFAULT_LANGUAGE,
  setLanguage: () => null,
  locale: languageToLocale(DEFAULT_LANGUAGE),
  t: () => '',
};

const LanguageProviderContext =
  createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = DEFAULT_LANGUAGE,
  storageKey = LANGUAGE_STORAGE_KEY,
  ...props
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = normalizeLanguage(window.localStorage.getItem(storageKey));
    if (stored !== language) setLanguageState(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, next);
    }
    setLanguageState(next);
  }, [storageKey]);

  const value = useMemo<LanguageProviderState>(() => {
    return {
      language,
      setLanguage,
      locale: languageToLocale(language),
      t: (key: TranslationKey) => translate(key, language),
    };
  }, [language, setLanguage]);

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error('useLanguage must be used within a LanguageProvider');

  return context;
};
