'use client';

import { useEffect, useState, useRef } from 'react';
import { createHighlighter, type Highlighter } from 'shiki';
import CopyButtonClient from './CopyButtonClient';

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: ['csharp', 'python', 'java', 'javascript', 'cpp'],
    });
  }
  return highlighterPromise;
}

export default function CodeRenderer({ code, title, language = 'csharp' }: { code: string; title?: string; language?: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const trimmed = code.trim();
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    getHighlighter().then((highlighter) => {
      if (!mountedRef.current) return;
      const result = highlighter.codeToHtml(trimmed, { lang: language, theme: 'github-dark' });
      setHtml(result);
    });
    return () => { mountedRef.current = false; };
  }, [trimmed, language]);

  const langLabel = ({ csharp: 'C#', python: 'Python', java: 'Java', javascript: 'JavaScript', cpp: 'C++' } as Record<string, string>)[language] ?? language.toUpperCase();

  return (
    <div className="relative rounded-lg overflow-hidden border my-3 group">
      <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-800 font-mono bg-[#0d1117] flex items-center justify-between">
        <span>{title ?? langLabel}</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">{langLabel}</span>
      </div>
      {html ? (
        <div
          className="text-sm overflow-x-auto bg-[#0d1117] [&>pre]:!bg-transparent [&>pre]:px-4 [&>pre]:py-3 [&>pre]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="text-sm overflow-x-auto bg-[#0d1117] px-4 py-3 leading-relaxed text-gray-300 font-mono">
          <code>{trimmed}</code>
        </pre>
      )}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButtonClient code={trimmed} />
      </div>
    </div>
  );
}