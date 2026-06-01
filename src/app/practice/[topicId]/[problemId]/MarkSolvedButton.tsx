'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { markProblemSolved, isProblemSolved } from '@/lib/progress-store';
import { useState } from 'react';

export default function MarkSolvedButton({ topicId, problemId }: { topicId: string; problemId: string }) {
  const [solved, setSolved] = useState(() => isProblemSolved(topicId, problemId));

  const handleClick = () => {
    markProblemSolved(topicId, problemId);
    setSolved(true);
  };

  return (
    <Button
      variant={solved ? 'outline' : 'outline'}
      size="sm"
      onClick={solved ? undefined : handleClick}
      className={`h-6 text-xs ${solved ? 'border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' : ''}`}
    >
      <CheckCircle2 className={`h-3 w-3 mr-1 ${solved ? 'text-emerald-500' : ''}`} />
      {solved ? 'Solved' : 'Mark Solved'}
    </Button>
  );
}
