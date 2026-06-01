'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getTopicProgress } from '@/lib/progress-store';
import { Code2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PracticeNavButton({ topicId }: { topicId: string }) {
  const router = useRouter();
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1);
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, []);

  const theoryRead = getTopicProgress(topicId).completed;
  if (!theoryRead) return null;

  return (
    <Button variant="outline" size="sm" onClick={() => router.push(`/practice/${topicId}`)}>
      <Code2 className="h-4 w-4 mr-1" />
      Practice
    </Button>
  );
}
