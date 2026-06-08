'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { topics } from '@/lib/topics';
import TopicIcon from '@/components/ui/TopicIcon';
import { getTopicStatus, type TopicStatus } from '@/lib/topic-status';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menu, BookOpen, BarChart3, Lock, PlayCircle, CheckCircle2, Bug, Unlock } from 'lucide-react';
import UnlockConfirmDialog from '@/components/layout/UnlockConfirmDialog';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { getProgress, isAllUnlocked, toggleAllUnlocked } from '@/lib/progress-store';

export default function MobileNav() {
  const pathname = usePathname();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [open, setOpen] = useState(false);
  const [revision, setRevision] = useState(0);
  const [allUnlocked, setAllUnlocked] = useState(false);
  const [showUnlockConfirm, setShowUnlockConfirm] = useState(false);
  useEffect(() => {
    const handler = () => { setRevision(v => v + 1); setAllUnlocked(isAllUnlocked()); };
    setAllUnlocked(isAllUnlocked()); // eslint-disable-line react-hooks/set-state-in-effect
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, []);

  const statuses = useMemo(() => {
    if (!mounted) return {} as Record<string, TopicStatus>;
    void revision;
    const p = getProgress();
    const s: Record<string, TopicStatus> = {};
    for (const t of topics) {
      s[t.id] = getTopicStatus(t, p, topics, allUnlocked);
    }
    return s;
  }, [mounted, revision, allUnlocked]);

  const basePath = pathname.startsWith('/practice') ? '/practice' : '/learn';
  const currentTopicId = pathname.split('/')[2];

  const statusIcon = (status: TopicStatus) => {
    switch (status) {
      case 'locked': return <Lock className="h-3.5 w-3.5 text-muted-foreground/40" />;
      case 'available': return <PlayCircle className="h-3.5 w-3.5 text-emerald-500" />;
      case 'in-progress': return <BookOpen className="h-3.5 w-3.5 text-amber-500" />;
      case 'completed': return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />;
    }
  };

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden ml-auto" render={<Button variant="ghost" size="icon" />}>
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <div className="flex items-center gap-2 p-4 border-b">
          <Image src="/logo.png" alt="Zero To DSA" width={36} height={36} className="h-9 w-9" />
          <span className="font-bold text-lg">Zero To DSA</span>
        </div>

        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/report-bug" onClick={close}>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <Bug className="h-4 w-4" /> Report a Bug
            </Button>
          </Link>
          <Link href="/progress" onClick={close}>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <BarChart3 className="h-4 w-4" /> Progress
            </Button>
          </Link>
        </div>

        <ScrollArea className="flex-1">
          <div className="py-2 px-3 space-y-1">
            <div className="px-2 pb-3 mb-1 border-b border-border/50">
              <button
                onClick={() => { if (allUnlocked) { toggleAllUnlocked(); setAllUnlocked(false); } else { setShowUnlockConfirm(true); } }}
                className={`w-full inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-[0.98] ${
                  allUnlocked
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-primary text-primary-foreground hover:brightness-110'
                }`}
              >
                {allUnlocked ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                {allUnlocked ? 'All Unlocked' : 'Unlock All'}
              </button>
              <UnlockConfirmDialog
                open={showUnlockConfirm}
                onOpenChange={setShowUnlockConfirm}
                onConfirm={() => { toggleAllUnlocked(); setAllUnlocked(true); }}
              />
            </div>
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Learning Path
            </div>
            {topics.map((t) => {
              const status = statuses[t.id] ?? 'locked';
              const isActive = t.id === currentTopicId;

              return (
                <Link
                  key={t.id}
                  href={status !== 'locked' ? `${basePath}/${t.id}` : '#'}
                  onClick={(e) => { if (status === 'locked') e.preventDefault(); else close(); }}
                  className={cn(
                    'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground font-medium'
                      : status === 'locked'
                        ? 'text-muted-foreground/40 cursor-not-allowed'
                        : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                  )}
                >
                  <TopicIcon topicId={t.id} className="h-4 w-4 shrink-0" />
                  <span className={cn('truncate', status === 'locked' && 'line-through')}>{t.title}</span>
                  <span className="ml-auto shrink-0">{statusIcon(status)}</span>
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
