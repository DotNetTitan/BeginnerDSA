'use client';

import { useLanguage } from '@/lib/language-context';
import CodeRenderer from '@/components/editor/CodeRenderer';

export default function SolutionDisplay({ solution }: { solution: Record<string, string> }) {
  const { language } = useLanguage();
  const code = solution[language] ?? solution['csharp'] ?? '';

  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">
        Reference Solution ({language === 'javascript' ? 'JavaScript' : language.toUpperCase()})
      </h3>
      <CodeRenderer code={code} language={language} title="Solution" />
    </div>
  );
}