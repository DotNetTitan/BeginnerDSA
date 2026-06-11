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
      <p
        className="text-sm sm:text-base leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: description.replace(/`([^`]+)`/g, '<code class="text-xs sm:text-sm bg-muted px-1 py-0.5 rounded font-mono">$1</code>'),
        }}
      />
      {code && (
        <CodeRenderer code={code[language] ?? code['typescript'] ?? ''} language={language} />
      )}
    </div>
  );
}
