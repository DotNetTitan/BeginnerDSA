'use client';

import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';

const geist = Geist({ subsets: ['latin'] });

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={`${geist.className} min-h-screen bg-background text-foreground antialiased flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    </ThemeProvider>
  );
}
