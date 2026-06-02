'use client';

import { useLanguage, type Language } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'csharp', label: 'C#' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGUAGES.find(l => l.value === language) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => setOpen(!open)}>
        {current.label}
        <ChevronDown className="h-3 w-3" />
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-36 rounded-lg border bg-background shadow-lg z-50 py-1">
          {LANGUAGES.map(l => (
            <button
              key={l.value}
              className={`w-full text-left px-3 py-1.5 text-sm flex items-center justify-between hover:bg-muted ${language === l.value ? 'font-medium' : ''}`}
              onClick={() => { setLanguage(l.value); setOpen(false); }}
            >
              {l.label}
              {language === l.value && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
