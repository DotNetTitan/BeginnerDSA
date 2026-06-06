'use client';

import { useLanguage } from '@/lib/language-context';
import CodeRenderer from '@/components/editor/CodeRenderer';

export default function ProblemDescription({
  description,
  code,
}: {
  description: string;
  code?: Record<string, string>;
}) {
  const { language } = useLanguage();

  return (
    <div>
      <p className="text-sm leading-relaxed">{description}</p>
      {code && (
        <CodeRenderer code={code[language] ?? code['javascript'] ?? ''} language={language} />
      )}
    </div>
  );
}
