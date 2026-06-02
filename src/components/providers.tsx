'use client';

import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import CookieBanner from '@/components/layout/CookieBanner';
import { LanguageProvider } from '@/lib/language-context';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';

const geist = Geist({ subsets: ['latin'] });

export function Providers({ children, language }: { children: ReactNode; language?: string }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider serverLanguage={language}>
        <div className={`${geist.className} min-h-screen bg-background text-foreground antialiased flex flex-col`}>
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
        <CookieBanner />
      </LanguageProvider>
    </ThemeProvider>
  );
}
