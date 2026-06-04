'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getTopicProgress } from '@/lib/progress-store';
import { GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TakeExamButton({ topicId, totalProblems }: { topicId: string; totalProblems: number }) {
  const router = useRouter();
  const [ready, setReady] = useState(() => {
    const tp = getTopicProgress(topicId);
    return tp.completed && tp.solvedProblems.length >= totalProblems && !tp.examPassed;
  });
  useEffect(() => {
    const handler = () => {
      const tp2 = getTopicProgress(topicId);
      setReady(tp2.completed && tp2.solvedProblems.length >= totalProblems && !tp2.examPassed);
    };
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, [topicId, totalProblems]);
  if (!ready) return null;

  return (
    <Button size="sm" onClick={() => router.push(`/exam/${topicId}`)}>
      <GraduationCap className="h-4 w-4 mr-1" />
      Take Exam
    </Button>
  );
}
