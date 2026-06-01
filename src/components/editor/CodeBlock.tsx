import { codeToHtml } from 'shiki';
import CopyButtonClient from './CopyButtonClient';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default async function CodeBlock({ code, language = 'csharp', title }: CodeBlockProps) {
  const trimmed = code.trim();
  const html = await codeToHtml(trimmed, {
    lang: language,
    theme: 'github-dark',
  });

  return (
    <div className="relative rounded-lg overflow-hidden border bg-[#0d1117] my-3 group">
      {title && (
        <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-800 font-mono">
          {title}
        </div>
      )}
      <div
        className="text-sm overflow-x-auto [&>pre]:px-4 [&>pre]:py-3 [&>pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButtonClient code={trimmed} />
      </div>
    </div>
  );
}
