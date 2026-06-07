'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Code2, CheckCircle2, GraduationCap, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTopicProgress, isAllUnlocked } from '@/lib/progress-store';
import { getTopic } from '@/lib/topics';
import { useState, useEffect, useSyncExternalStore } from 'react';

interface Props {
  topicId: string;
}

const steps = [
  { id: 'learn', label: 'Learn', icon: BookOpen, path: '/learn' },
  { id: 'practice', label: 'Practice', icon: Code2, path: '/practice' },
  { id: 'exam', label: 'Exam', icon: GraduationCap, path: '/exam' },
] as const;

export default function ModuleFlow({ topicId }: Props) {
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [, forceUpdate] = useState(0);
  const [allUnlocked, setAllUnlocked] = useState(false);
  useEffect(() => {
    const handler = () => { forceUpdate(n => n + 1); setAllUnlocked(isAllUnlocked()); };
    setAllUnlocked(isAllUnlocked()); // eslint-disable-line react-hooks/set-state-in-effect
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, []);

  const topic = getTopic(topicId);
  const totalProblems = topic?.problemIds.length ?? 0;
  const progress = mounted ? getTopicProgress(topicId) : { completed: false, solvedProblems: [] as string[], examPassed: false };
  const theoryRead = progress.completed;
  const problemsSolved = progress.solvedProblems.length;
  const examPassed = progress.examPassed;

  const pathname = usePathname();
  const currentStep = pathname.startsWith('/learn') ? 'learn'
    : pathname.startsWith('/practice') ? 'practice'
    : pathname.startsWith('/exam') ? 'exam'
    : 'learn';

  const isCompleted = (stepId: string) => {
    if (stepId === 'learn') return theoryRead;
    if (stepId === 'practice') return problemsSolved >= totalProblems && totalProblems > 0;
    if (stepId === 'exam') return examPassed;
    return false;
  };

  const isReachable = (stepId: string) => {
    if (allUnlocked) return true;
    if (stepId === 'learn') return true;
    if (stepId === 'practice') return theoryRead;
    if (stepId === 'exam') return theoryRead && problemsSolved >= totalProblems && totalProblems > 0;
    return false;
  };

  return (
    <div className="flex items-center gap-0 mb-6 border rounded-lg overflow-hidden bg-card min-w-0">
      {steps.map((step, i) => {
        const isActive = currentStep === step.id;
        const done = isCompleted(step.id);
        const StepIcon = step.icon;

        const reachable = isReachable(step.id);
        return (
          <Link
            key={step.id}
            href={reachable ? `${step.path}/${topicId}` : '#'}
            title={!reachable && step.id === 'practice' ? 'Read the theory first to unlock practice' : !reachable && step.id === 'exam' ? 'Complete all problems and theory to unlock exam' : step.label}
            className={cn(
              'flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2.5 text-sm font-medium transition-colors flex-1 justify-center relative min-w-0',
              isActive
                ? 'bg-primary text-primary-foreground'
                : done
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/50'
                  : reachable
                    ? 'bg-card text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                    : 'bg-card text-muted-foreground/40 cursor-default'
            )}
          >
            {done ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : !reachable ? (
              <Lock className="h-4 w-4" />
            ) : (
              <StepIcon className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{step.label}</span>
            {i < steps.length - 1 && (
              <div className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 w-px h-6',
                isActive ? 'bg-primary-foreground/20' : 'bg-border'
              )} />
            )}
          </Link>
        );
      })}
    </div>
  );
}
