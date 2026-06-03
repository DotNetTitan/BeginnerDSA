'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getProgress } from '@/lib/progress-store';
import { getTopicStatus } from '@/lib/topic-status';
import { topics } from '@/lib/topics';
import type { AppProgress } from '@/lib/types';

interface Props {
  prev: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
}

export default function TopicNavButtons({ prev, next }: Props) {
  const router = useRouter();
  const [progress, setProgress] = useState<AppProgress | null>(null);
  useEffect(() => { setProgress(getProgress()); }, []);

  const isLocked = (id: string) => {
    if (!progress) return true;
    const topic = topics.find(t => t.id === id);
    if (!topic) return true;
    return getTopicStatus(topic, progress, topics) === 'locked';
  };

  return (
    <div className="mt-10 pt-6 border-t flex items-center justify-between">
      <div className="flex gap-2">
        {prev && (
          <Button
            variant="outline"
            size="sm"
            disabled={isLocked(prev.id)}
            onClick={() => router.push(`/learn/${prev.id}`)}
          >
            {isLocked(prev.id) ? <Lock className="h-3 w-3 mr-1" /> : <ChevronLeft className="h-4 w-4 mr-1" />}
            {prev.title}
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        {next && (
          <Button
            variant="outline"
            size="sm"
            disabled={isLocked(next.id)}
            onClick={() => router.push(`/learn/${next.id}`)}
          >
            {next.title}
            {isLocked(next.id) ? <Lock className="h-3 w-3 ml-1" /> : <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        )}
      </div>
    </div>
  );
}