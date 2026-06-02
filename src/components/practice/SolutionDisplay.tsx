'use client';

import { useLanguage } from '@/lib/language-context';
import CodeRenderer from '@/components/editor/CodeRenderer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function SolutionDisplay({ solution }: { solution: Record<string, string> }) {
  const { language } = useLanguage();
  const code = solution[language] ?? solution['csharp'] ?? '';
  const langLabel = language === 'javascript' ? 'JavaScript' : language.toUpperCase();

  return (
    <Accordion>
      <AccordionItem value="solution">
        <AccordionTrigger className="text-sm font-medium">
          Reference Solution ({langLabel})
        </AccordionTrigger>
        <AccordionContent>
          <CodeRenderer code={code} language={language} title="Solution" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}