'use client';

import { useState, useCallback, useEffect, useRef, type KeyboardEvent } from 'react';
import { useLanguage } from '@/lib/language-context';
import { generateWrapper, parseExampleInput } from '@/lib/compiler-map';
import { Loader2, Play, Terminal, Clock, MemoryStick as Memory, ChevronDown, ChevronRight, Check, X, FileCheck } from 'lucide-react';
import CopyButtonClient from './CopyButtonClient';
import { Button } from '@/components/ui/button';
import type { Example } from '@/lib/types';
import { createHighlighter, createJavaScriptRegexEngine, type Highlighter, type BundledLanguage } from 'shiki';

const LANG_MAP: Record<string, string> = {
  typescript: 'typescript',
  python: 'python',
  java: 'java',
  csharp: 'csharp',
  cpp: 'cpp',
};

let highlighterInstance: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter(): Promise<Highlighter> {
  if (highlighterInstance) return highlighterInstance;
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      langs: ['typescript', 'python', 'java', 'csharp', 'cpp'],
      themes: ['github-dark'],
      engine: createJavaScriptRegexEngine(),
    }).then(h => {
      highlighterInstance = h;
      return h;
    });
  }
  return highlighterPromise;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

interface CodeEditorProps {
  starterCode?: Record<string, string>;
  solutionCode: Record<string, string>;
  examples: Example[];
  problemId: string;
  topicId: string;
}

function extractStarter(code: string, language: string): string {
  const sigMatch = code.match(
    /(?:public\s+|private\s+|protected\s+)?(\S+(?:\s*<[^>]+>)?(?:\[\])?)\s+(\w+)\s*\(([^)]*)\)/
  );
  const pyMatch = code.match(/^def\s+(\w+)\s*\(([^)]*)\)/);

  const returnDefault = (rt: string): string => {
    if (language === 'python') {
      if (rt === 'void') return '';
      if (rt === 'int' || rt === 'long') return '0';
      if (rt === 'bool') return 'False';
      if (rt === 'string') return '""';
      if (rt.endsWith('[]') || rt.startsWith('IList')) return '[]';
      return 'None';
    }
    if (rt === 'void') return '';
    if (rt === 'int' || rt === 'long') return '0';
    if (rt === 'bool') return 'false';
    if (rt === 'string') return '""';
    if (rt.endsWith('[]') || rt.startsWith('IList')) return 'null!';
    return 'null';
  };

  if (pyMatch) {
    const methodName = pyMatch[1];
    const params = pyMatch[2].trim();
    const paramNames = params.split(',').map(p => p.trim().split(/\s+/).pop() ?? 'p').join(', ');
    return `def ${methodName}(${paramNames}):
    # TODO: implement your solution here
    pass`;
  }

  if (!sigMatch) return code;

  const returnType = sigMatch[1].trim();
  const methodName = sigMatch[2];
  const params = sigMatch[3];
  const ret = returnDefault(returnType);
  const retLine = ret ? `\n    return ${ret};` : '';

  const sig = (() => {
    switch (language) {
      case 'csharp': return `public ${returnType} ${methodName}(${params})`;
      case 'java': return `public ${returnType} ${methodName}(${params})`;
      case 'typescript': {
        const pnames = params.split(',').map(p => p.trim().split(/\s+/).pop()).join(', ');
        return `function ${methodName}(${pnames})`;
      }
      case 'cpp': return `${returnType} ${methodName}(${params})`;
      default: return `${returnType} ${methodName}(${params})`;
    }
  })();

  return `${sig} {
    // TODO: implement your solution here${retLine}
}`;
}

export default function CodeEditor({ starterCode, solutionCode, examples }: CodeEditorProps) {
  const { language } = useLanguage();
  const [runningMode, setRunningMode] = useState<'run' | 'tests' | null>(null);
  const [rawOutput, setRawOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [execTime, setExecTime] = useState<string | null>(null);
  const [execMemory, setExecMemory] = useState<string | null>(null);
  const [exitCode, setExitCode] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [testResults, setTestResults] = useState<{ index: number; passed: boolean; expected: string; actual: string }[] | null>(null);
  const [runPassed, setRunPassed] = useState(false);
  const [code, setCode] = useState(() => {
    if (starterCode?.[language]) return starterCode[language];
    if (solutionCode[language]) return extractStarter(solutionCode[language], language);
    return '';
  });

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (starterCode?.[language]) { setCode(starterCode[language]); }
    else if (solutionCode[language]) { setCode(extractStarter(solutionCode[language], language)); }
    else { setCode(''); }
    setRunPassed(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [language, starterCode, solutionCode]);

  const [highlightedHtml, setHighlightedHtml] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const testableExamples = examples.filter(e => e.output != null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!code.trim()) {
        setHighlightedHtml('');
        return;
      }
      try {
        const hl = await getHighlighter();
        const shikiLang = (LANG_MAP[language] ?? 'typescript') as BundledLanguage;
        const tokens = hl.codeToTokensBase(code, { lang: shikiLang, theme: 'github-dark' });
        const html = tokens.map(line =>
          `<span class="line">${line.map(t => {
            const color = t.color || '#e6edf3';
            const style = `color:${color}`;
            return `<span style="${style}">${escapeHtml(t.content)}</span>`;
          }).join('')}</span>`
        ).join('\n');
        setHighlightedHtml(html);
      } catch {
        setHighlightedHtml('');
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [code, language]);

  const syncScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const executeCode = useCallback(async (runTests: boolean) => {
    const mode = runTests ? 'tests' : 'run';
    setRunningMode(mode);
    setRawOutput(null);
    setError(null);
    setExecTime(null);
    setExecMemory(null);
    setExitCode(null);
    setTestResults(null);

    try {
      let wrappedCode: string;
      if (runTests) {
        const testCases = testableExamples.map(ex => ({
          args: parseExampleInput(ex.input),
          expected: ex.output!,
        }));
        wrappedCode = generateWrapper(language, code, testCases);
      } else {
        const runArgs = testableExamples.length > 0 ? parseExampleInput(testableExamples[0].input) : [];
        wrappedCode = generateWrapper(language, code, undefined, runArgs);
      }

      const res = await fetch('/api/run-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code: wrappedCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to execute code');
        return;
      }

      setRawOutput(data.output || '');
      setExecTime(data.time);
      setExecMemory(data.memory);
      setExitCode(data.exitCode);

      if (!runTests) {
        setRunPassed(data.exitCode === 0);
      }

      if (data.testResults) {
        setTestResults(data.testResults);
      }

      if (data.error && data.exitCode !== 0) {
        setError(data.error);
      }
    } catch {
      setError('Network error: could not reach the execution service');
    } finally {
      setRunningMode(null);
    }
  }, [code, language, testableExamples, setRunPassed]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newVal = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newVal);
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 4;
      }, 0);
    }
  };

  const isRunning = runningMode !== null;
  const passedCount = testResults?.filter(r => r.passed).length ?? 0;
  const totalCount = testResults?.length ?? 0;
  const hasResult = testResults !== null || rawOutput !== null || error !== null;

  return (
    <div className="border rounded-lg overflow-hidden my-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted/80 transition-colors text-sm font-medium"
      >
        <span className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          Code Editor
        </span>
        {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {expanded && (
        <div className="p-4 space-y-3">
          <div className="relative rounded-lg border bg-[#0d1117]">
            <div style={{ display: 'grid', minHeight: '16rem' }}>
              <pre
                ref={preRef}
                style={{ gridArea: '1/1', pointerEvents: 'none', overflow: 'auto', margin: 0, whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                className="p-4 text-sm font-mono leading-relaxed tab-size-4 [scrollbar-width:none] [-ms-overflow-style:none]"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              />
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => { setCode(e.target.value); setRunPassed(false); }}
                onKeyDown={handleKeyDown}
                onScroll={syncScroll}
                style={{ gridArea: '1/1', background: 'transparent', color: 'transparent', caretColor: '#d1d5db', resize: 'vertical' }}
                className="w-full p-4 text-sm font-mono leading-relaxed tab-size-4 focus:outline-none focus:ring-1 focus:ring-primary overflow-auto"
                spellCheck={false}
                placeholder="Write your code here..."
              />
            </div>
            <div className="absolute top-1.5 right-1.5 z-10">
              <CopyButtonClient code={code} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => executeCode(false)}
                disabled={isRunning || !code.trim()}
                size="sm"
                variant="outline"
                className="gap-1.5"
              >
                {runningMode === 'run' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {runningMode === 'run' ? 'Running...' : 'Run'}
              </Button>
            </div>
            {runPassed && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => executeCode(true)}
                  disabled={isRunning || !code.trim()}
                  size="sm"
                  className="gap-1.5"
                >
                  {runningMode === 'tests' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileCheck className="h-4 w-4" />
                  )}
                  {runningMode === 'tests' ? 'Running...' : 'Run Tests'}
                </Button>
              </div>
            )}
          </div>

          {hasResult && (
            <div className="border rounded-lg overflow-hidden">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/50 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  {testResults && testResults.length > 0 ? (
                    <>
                      {passedCount === totalCount ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <X className="h-3.5 w-3.5 text-red-500" />}
                      {passedCount === totalCount ? 'All Tests Passed' : `${totalCount - passedCount} Test${totalCount - passedCount > 1 ? 's' : ''} Failed`}
                    </>
                  ) : exitCode === 0 ? (
                    <><Check className="h-3.5 w-3.5 text-emerald-500" /> Ran Successfully</>
                  ) : exitCode !== null && exitCode !== 0 ? (
                    <><X className="h-3.5 w-3.5 text-red-500" /> Execution Failed</>
                  ) : (
                    'Output'
                  )}
                </span>
                {(execTime || execMemory) && (
                  <span className="flex items-center gap-3">
                    {execTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {parseFloat(execTime).toFixed(3)}s
                      </span>
                    )}
                    {execMemory && (
                      <span className="flex items-center gap-1">
                        <Memory className="h-3 w-3" />
                        {Math.round(parseInt(execMemory) / 1024)}MB
                      </span>
                    )}

                  </span>
                )}
              </div>

              {testResults && testResults.length > 0 && (
                <div className="divide-y">
                  {testResults.map((tr, i) => (
                    <div key={i} className={`px-3 py-2.5 flex items-center gap-3 text-sm ${tr.passed ? '' : 'bg-red-50/30 dark:bg-red-950/10'}`}>
                      <div className={`shrink-0 rounded-full p-0.5 ${tr.passed ? 'text-emerald-500' : 'text-red-500'}`}>
                        {tr.passed ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-xs">Test {tr.index}</span>
                          <span className={`text-xs font-medium ${tr.passed ? 'text-emerald-600' : 'text-red-600'}`}>
                            {tr.passed ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                        {!tr.passed && (
                          <div className="text-xs text-muted-foreground mt-0.5 space-y-0.5">
                            <div>Expected: <code className="text-xs bg-muted px-1 py-0.5 rounded">{tr.expected}</code></div>
                            <div>Got: <code className="text-xs bg-muted px-1 py-0.5 rounded">{tr.actual || '(empty)'}</code></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className={`px-3 py-2 text-xs font-medium ${passedCount === totalCount ? 'text-emerald-600' : 'text-red-600'}`}>
                    {passedCount} / {totalCount} tests passed
                  </div>
                </div>
              )}

              {!testResults && rawOutput && !error && (
                <pre className="p-3 text-sm font-mono leading-relaxed overflow-x-auto text-gray-300 max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {rawOutput}
                </pre>
              )}

              {error && (
                <pre className="p-3 text-sm font-mono leading-relaxed overflow-x-auto bg-red-50/20 text-red-400 max-h-40 overflow-y-auto">
                  {error}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
