import { topics } from '@/lib/topics';
import { getProblems } from '@/lib/problems';
import TopicGrid from '@/components/home/TopicGrid';
import { BookOpen, Code2, Signal, Coffee } from 'lucide-react';

export default function HomePage() {
  const moduleCount = topics.length;
  const allProblems = topics.flatMap(t => getProblems(t.id));
  const problemCount = allProblems.length;
  const easyCount = allProblems.filter(p => p.difficulty === 'easy').length;
  const mediumCount = allProblems.filter(p => p.difficulty === 'medium').length;
  const hardCount = allProblems.filter(p => p.difficulty === 'hard').length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Zero To DSA</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Learn DSA from zero. Structured modules and coding challenges for absolute beginners.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
        <div className="border rounded-lg p-3 text-center">
          <BookOpen className="h-4 w-4 mx-auto mb-1 text-primary" />
          <p className="text-lg font-bold leading-tight">{moduleCount}</p>
          <p className="text-[11px] text-muted-foreground">Modules</p>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <Code2 className="h-4 w-4 mx-auto mb-1 text-primary" />
          <p className="text-lg font-bold leading-tight">{problemCount}</p>
          <p className="text-[11px] text-muted-foreground">Problems</p>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <Signal className="h-4 w-4 mx-auto mb-1 text-primary" />
          <p className="text-lg font-bold leading-tight">{easyCount} / {mediumCount} / {hardCount}</p>
          <p className="text-[11px] text-muted-foreground">Easy / Medium / Hard</p>
        </div>
      </div>

      <TopicGrid />

      <div className="mt-10 border rounded-lg p-5 text-center">
        <Coffee className="h-6 w-6 mx-auto mb-2 text-amber-500" />
        <p className="font-semibold">Enjoying Zero To DSA?</p>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          If this helped you, consider supporting the project!
        </p>
        <a
          href="https://ko-fi.com/zerotodsa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 hover:scale-105 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
        >
          <Coffee className="h-4 w-4" />
          Buy me a coffee
        </a>
      </div>
    </div>
  );
}
