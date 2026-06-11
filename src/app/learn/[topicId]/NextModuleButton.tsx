'use client';

import { useRouter } from 'next/navigation';
import { getTopicProgress } from '@/lib/progress-store';
import { getNextTopic } from '@/lib/topics';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  topicId: string;
}

export default function NextModuleButton({ topicId }: Props) {
  const router = useRouter();
  const [completed, setCompleted] = useState(() => getTopicProgress(topicId).completed);

  useEffect(() => {
    const handler = () => setCompleted(getTopicProgress(topicId).completed);
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, [topicId]);

  if (!completed) return null;

  const next = getNextTopic(topicId);
  if (!next) return null;

  return (
    <Button size="sm" onClick={() => router.push(`/learn/${next.id}`)}>
      Go to {next.title}
      <ArrowRight className="h-4 w-4 ml-1" />
    </Button>
  );
}
