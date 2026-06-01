'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ChevronRight, Lock } from 'lucide-react';
import { isProblemSolved } from '@/lib/progress-store';
import { useState, useEffect } from 'react';

export default function NextProblemButton({
  topicId,
  problemId,
  nextProblemId,
  nextProblemTitle,
}: {
  topicId: string;
  problemId: string;
  nextProblemId: string;
  nextProblemTitle: string;
}) {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1);
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, []);

  const solved = isProblemSolved(topicId, problemId);

  if (!solved) {
    return (
      <span
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
        title="Solve this problem first to unlock the next one"
        style={{ opacity: 0.4, cursor: 'default' }}
      >
        <Lock className="h-3 w-3 mr-1 shrink-0" />
        <span className="max-w-[80px] sm:max-w-[160px] truncate">{nextProblemTitle}</span>
        <ChevronRight className="h-4 w-4 ml-1 shrink-0" />
      </span>
    );
  }

  return (
    <Link
      href={`/practice/${topicId}/${nextProblemId}`}
      className={buttonVariants({ variant: 'outline', size: 'sm' })}
    >
      <span className="max-w-[80px] sm:max-w-[160px] truncate">{nextProblemTitle}</span>
      <ChevronRight className="h-4 w-4 ml-1 shrink-0" />
    </Link>
  );
}
