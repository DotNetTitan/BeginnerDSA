'use client';

import type { TheorySection as TheorySectionType } from '@/lib/types';
import { useLanguage } from '@/lib/language-context';
import ComplexityTable from './ComplexityTable';
import CodeRenderer from '@/components/editor/CodeRenderer';
import DynamicSectionComponent from './DynamicSectionComponent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function TheorySection({ section }: { section: TheorySectionType }) {
  const { language } = useLanguage();

  return (
    <section id={section.id} className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-3">{section.title}</h2>

      <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            code: ({ className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              const code = String(children).replace(/\n$/, '');

              if (match) {
                return <CodeRenderer code={code} language={match[1]} />;
              }

              return (
                <code
                  className="text-xs bg-muted px-1 py-0.5 rounded font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            pre: ({ children }) => <>{children}</>,
            p: ({ children }) => <p className="text-sm leading-relaxed text-muted-foreground mb-3 last:mb-0">{children}</p>,
            ul: ({ children }) => <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5 mb-3">{children}</ul>,
            ol: ({ children }) => <ol className="text-sm text-muted-foreground space-y-1 list-decimal pl-5 mb-3">{children}</ol>,
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            h3: ({ children }) => <h3 className="text-base font-semibold mt-4 mb-2">{children}</h3>,
            table: ({ children }) => (
              <div className="overflow-x-auto my-4 rounded-lg border">
                <table className="w-full text-sm">{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
            th: ({ children }) => <th className="px-3 py-2 text-left font-semibold text-xs">{children}</th>,
            td: ({ children }) => <td className="px-3 py-2 border-t font-mono text-xs">{children}</td>,
          }}
        >
          {section.content}
        </ReactMarkdown>
      </div>

      {section.table && <ComplexityTable data={section.table} />}

      {section.component && (
        <div className="mb-6">
          {section.vizLabel && (
            <div className="mb-3 px-1">
              <h3 className="text-xl font-semibold mb-1">Problem</h3>
              <p className="text-sm text-muted-foreground">{section.vizLabel}</p>
            </div>
          )}
          <DynamicSectionComponent name={section.component} />
        </div>
      )}

      {section.codeExamples?.map((ex, i) => {
        const code = ex.code[language] ?? ex.code['csharp'];
        return code ? (
          <CodeRenderer key={i} code={code} language={language} title={ex.title} />
        ) : null;
      })}
    </section>
  );
}
