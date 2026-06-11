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

export default function NextModulePrompt({ topicId }: Props) {
  const router = useRouter();
  const [show, setShow] = useState(() => getTopicProgress(topicId).completed);

  useEffect(() => {
    const handler = () => {
      setShow(getTopicProgress(topicId).completed);
    };
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, [topicId]);

  if (!show) return null;

  const next = getNextTopic(topicId);
  if (!next) return null;

  return (
    <div className="border rounded-lg p-4 bg-muted/30 text-center space-y-2">
      <p className="font-semibold">{topicId === 'intro' ? 'Introduction complete!' : 'Module complete!'}</p>
      <p className="text-sm text-muted-foreground">{next.title} is now unlocked.</p>
      <Button onClick={() => router.push(`/learn/${next.id}`)}>
        Go to {next.title}
        <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
