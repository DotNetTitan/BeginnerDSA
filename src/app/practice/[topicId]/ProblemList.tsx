'use client';

import type { Problem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { isProblemSolved, getTopicProgress } from '@/lib/progress-store';
import { GraduationCap, Lock } from 'lucide-react';

interface Props {
  problems: Problem[];
  topicId: string;
}

export default function ProblemList({ problems, topicId }: Props) {
  const router = useRouter();
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1);
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, []);

  const solved = useMemo(() => {
    const s: Record<string, boolean> = {};
    for (const p of problems) {
      s[p.id] = isProblemSolved(topicId, p.id);
    }
    return s;
  }, [problems, topicId]);

  const progress = getTopicProgress(topicId);
  const allSolved = problems.length > 0 && problems.every(p => solved[p.id]);
  const examAvailable = allSolved && !progress.examPassed;

  const difficultyColor = (d: string) => {
    switch (d) {
      case 'easy': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return '';
    }
  };

  if (problems.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No problems available for this topic yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {examAvailable && (
        <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
          <CardContent className="py-3 px-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-amber-700 dark:text-amber-300 font-medium">All problems solved!</span>
              <span className="text-muted-foreground">Ready for the exam?</span>
            </div>
            <Button size="sm" onClick={() => router.push(`/exam/${topicId}`)}>
              Take Exam
            </Button>
          </CardContent>
        </Card>
      )}

      {problems.map((p, idx) => {
        const done = solved[p.id];
        const locked = idx > 0 && !solved[problems[idx - 1].id];
        return (
          <Card
            key={p.id}
            className={`transition-shadow ${locked ? 'opacity-50' : 'cursor-pointer hover:shadow-sm'}`}
            onClick={() => { if (!locked) router.push(`/practice/${topicId}/${p.id}`); }}
          >
            <CardHeader className="py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {locked && <Lock className="h-4 w-4 text-muted-foreground shrink-0" />}
                  <CardTitle className={`text-sm font-medium ${locked ? 'text-muted-foreground' : ''}`}>{p.title}</CardTitle>
                  {done && (
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 text-xs">
                      Solved
                    </Badge>
                  )}
                </div>
                <Badge variant="secondary" className={difficultyColor(p.difficulty)}>
                  {p.difficulty}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
