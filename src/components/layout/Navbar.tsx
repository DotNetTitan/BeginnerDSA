'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun, BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import MobileNav from './MobileNav';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []); // eslint-disable-line react-hooks/set-state-in-effect

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mr-4 sm:mr-8">
          <Image src="/logo.png" alt="DSA From Zero" width={36} height={36} className="h-9 w-9" />
          <span className="hidden sm:inline">DSA From Zero</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm">
          <Link href="/progress">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </Button>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <LanguageSelector />
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
