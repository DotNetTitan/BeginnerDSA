'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getTopicProgress } from '@/lib/progress-store';
import { GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TakeExamButton({ topicId, totalProblems }: { topicId: string; totalProblems: number }) {
  const router = useRouter();
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1);
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, []);

  const topicProgress = getTopicProgress(topicId);
  const theoryRead = topicProgress.completed;
  const solvedProblems = topicProgress.solvedProblems.length;
  const examPassed = topicProgress.examPassed;
  const allSolved = solvedProblems >= totalProblems;
  const ready = theoryRead && allSolved && !examPassed;

  if (!ready) return null;

  return (
    <Button size="sm" onClick={() => router.push(`/exam/${topicId}`)}>
      <GraduationCap className="h-4 w-4 mr-1" />
      Take Exam
    </Button>
  );
}
