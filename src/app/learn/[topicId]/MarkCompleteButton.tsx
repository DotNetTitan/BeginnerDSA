'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { markTopicCompleted, getTopicProgress } from '@/lib/progress-store';
import { useState, useEffect } from 'react';

export default function MarkCompleteButton({ topicId }: { topicId: string }) {
  const [completed, setCompleted] = useState(() => getTopicProgress(topicId).completed);
  useEffect(() => {
    const handler = () => setCompleted(getTopicProgress(topicId).completed);
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, [topicId]);

  const handleClick = () => {
    markTopicCompleted(topicId);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={completed ? undefined : handleClick}
      className={completed ? 'border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' : ''}
    >
      <CheckCircle2 className={`h-4 w-4 mr-1 ${completed ? 'text-emerald-500' : ''}`} />
      {completed ? 'Read' : 'Mark as Read'}
    </Button>
  );
}
