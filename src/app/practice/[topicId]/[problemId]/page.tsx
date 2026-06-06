import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTopic } from '@/lib/topics';
import TopicIcon from '@/components/ui/TopicIcon';
import { getProblem, getProblems } from '@/lib/problems';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import MarkSolvedButton from './MarkSolvedButton';
import NextProblemButton from '@/components/practice/NextProblemButton';
import ExamOfferModal from '@/components/exam/ExamOfferModal';
import KeyboardNav from '@/components/layout/KeyboardNav';
import SolutionDisplay from '@/components/practice/SolutionDisplay';

interface Props {
  params: Promise<{ topicId: string; problemId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId, problemId } = await params;
  const problem = getProblem(topicId, problemId);
  if (!problem) return { title: 'Problem Not Found' };
  return { title: `${problem.title} - Zero To DSA` };
}

export default async function ProblemPage({ params }: Props) {
  const { topicId, problemId } = await params;
  const topic = getTopic(topicId);
  const problem = getProblem(topicId, problemId);
  if (!topic || !problem) notFound();

  const problems = getProblems(topicId);
  const problemIdx = problems.findIndex(p => p.id === problemId);
  const prevProblem = problemIdx > 0 ? problems[problemIdx - 1] : null;
  const nextProblem = problemIdx < problems.length - 1 ? problems[problemIdx + 1] : null;

  const difficultyColor = (d: string) => {
    switch (d) {
      case 'easy': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return '';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <Link href={`/practice/${topicId}`}>
          <Button variant="ghost" size="sm" className="max-w-[40vw] truncate">
            <ChevronLeft className="h-4 w-4 mr-1 shrink-0" />
            <span className="truncate">Back to {topic.title} problems</span>
          </Button>
        </Link>
        <div className="flex gap-1 flex-wrap justify-end">
          {prevProblem && (
            <Link
              href={`/practice/${topicId}/${prevProblem.id}`}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              <ChevronLeft className="h-4 w-4 mr-1 shrink-0" />
              <span className="max-w-[80px] sm:max-w-[160px] truncate">{prevProblem.title}</span>
            </Link>
          )}
          {nextProblem && (
            <NextProblemButton
              topicId={topicId}
              problemId={problemId}
              nextProblemId={nextProblem.id}
              nextProblemTitle={nextProblem.title}
            />
          )}
        </div>
      </div>

      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TopicIcon topicId={topicId} className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{problem.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={difficultyColor(problem.difficulty)}>
              {problem.difficulty}
            </Badge>
            <MarkSolvedButton topicId={topicId} problemId={problemId} />
            {problem.leetcodeUrl && (
              <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Solve on LeetCode
                </Button>
              </a>
            )}
          </div>
        </div>
        {topicId !== 'big-o' && (
          <div className="text-right text-xs text-muted-foreground">
            <div>Time: <span className="font-mono font-medium">{problem.timeComplexity}</span></div>
            <div>Space: <span className="font-mono font-medium">{problem.spaceComplexity}</span></div>
          </div>
        )}
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
        <p className="text-sm leading-relaxed">{problem.description}</p>
      </div>

      {problem.constraints.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Constraints</h3>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}

      <div className="mb-6 space-y-3">
        <h3 className="text-sm font-semibold">Examples</h3>
        {problem.examples.map((ex, i) => (
          <div key={i} className="border rounded-lg p-3 text-sm">
            <div><span className="font-semibold">Input:</span> <code className="text-xs bg-muted px-1 py-0.5 rounded">{ex.input}</code></div>
            {ex.output && (
              <div><span className="font-semibold">Output:</span> <code className="text-xs bg-muted px-1 py-0.5 rounded">{ex.output}</code></div>
            )}
            {ex.explanation && <div className="text-xs text-muted-foreground mt-1">{ex.explanation}</div>}
          </div>
        ))}
      </div>

      {problem.hints.length > 0 && (
        <div className="mb-6">
          <Accordion>
            <AccordionItem value="hints">
              <AccordionTrigger className="text-sm font-medium">Hints</AccordionTrigger>
              <AccordionContent>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                  {problem.hints.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      <SolutionDisplay solution={problem.solution} />

      {!nextProblem && <ExamOfferModal topicId={topicId} />}
      <KeyboardNav
        prevHref={prevProblem ? `/practice/${topicId}/${prevProblem.id}` : undefined}
        nextHref={nextProblem ? `/practice/${topicId}/${nextProblem.id}` : undefined}
      />
    </div>
  );
}
