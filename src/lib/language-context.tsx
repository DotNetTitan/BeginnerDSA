'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'dsa-language';

export type Language = 'csharp' | 'python' | 'java' | 'javascript' | 'cpp';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children, serverLanguage }: { children: ReactNode; serverLanguage?: string }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (serverLanguage && ['csharp', 'python', 'java', 'javascript', 'cpp'].includes(serverLanguage)) {
      return serverLanguage as Language;
    }
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored && ['csharp', 'python', 'java', 'javascript', 'cpp'].includes(stored)) {
      return stored as Language;
    }
    return 'csharp';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.cookie = `dsa-language=${lang};path=/;max-age=31536000`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
