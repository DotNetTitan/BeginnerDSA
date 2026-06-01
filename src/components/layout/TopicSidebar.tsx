'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { topics } from '@/lib/topics';
import TopicIcon from '@/components/ui/TopicIcon';
import { getTopicStatus, type TopicStatus } from '@/lib/topic-status';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lock, PlayCircle, CheckCircle2, BookOpen } from 'lucide-react';
import { getProgress } from '@/lib/progress-store';
import { useEffect, useMemo, useState } from 'react';

export default function TopicSidebar() {
  const pathname = usePathname();
  const currentTopicId = pathname.split('/')[2];
  const [mounted, setMounted] = useState(false);
  const [revision, setRevision] = useState(0);
  useEffect(() => { setMounted(true); }, []); // eslint-disable-line react-hooks/set-state-in-effect
  useEffect(() => {
    const handler = () => setRevision(v => v + 1);
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, []);
  const statuses = useMemo(() => {
    if (!mounted) return {} as Record<string, TopicStatus>;
    void pathname;
    void revision;
    const p = getProgress();
    const s: Record<string, TopicStatus> = {};
    for (const t of topics) {
      s[t.id] = getTopicStatus(t, p, topics);
    }
    return s;
  }, [pathname, mounted, revision]);

  const basePath = pathname.startsWith('/learn') ? '/learn' :
    pathname.startsWith('/practice') ? '/practice' : '/learn';

  const statusIcon = (status: TopicStatus, small = false) => {
    const sz = small ? 'h-3 w-3' : 'h-3.5 w-3.5';
    switch (status) {
      case 'locked': return <Lock className={`${sz} text-muted-foreground/40`} />;
      case 'available': return <PlayCircle className={`${sz} text-emerald-500`} />;
      case 'in-progress': return <BookOpen className={`${sz} text-amber-500`} />;
      case 'completed': return <CheckCircle2 className={`${sz} text-emerald-500`} />;
    }
  };

  return (
    <aside className="hidden md:block w-60 shrink-0 border-r">
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="py-4 px-3 space-y-1">
          <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Learning Path
          </div>
          {topics.map((t) => {
            const isActive = t.id === currentTopicId;
            const status = statuses[t.id] ?? 'locked';

            return (
              <Link
                key={t.id}
                href={status !== 'locked' ? `${basePath}/${t.id}` : '#'}
                className={cn(
                  'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground font-medium'
                    : status === 'locked'
                      ? 'text-muted-foreground/40 cursor-not-allowed'
                      : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                )}
                onClick={(e) => { if (status === 'locked') e.preventDefault(); }}
              >
                <TopicIcon topicId={t.id} className="h-4 w-4 shrink-0" />
                <span className={cn('truncate', status === 'locked' && 'line-through')}>{t.title}</span>
                <span className="ml-auto shrink-0">
                  {statusIcon(status)}
                </span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
