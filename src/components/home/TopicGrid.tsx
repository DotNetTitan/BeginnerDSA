'use client';

import { topics } from '@/lib/topics';
import TopicIcon from '@/components/ui/TopicIcon';
import { getTopicStatus, getNextRecommendedTopic, isReadyForExam, isPracticeReachable, type TopicStatus } from '@/lib/topic-status';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { getProgress } from '@/lib/progress-store';
import { Lock, CheckCircle2, BookOpen, Code2, ArrowRight, ListTodo, GitBranch, GraduationCap } from 'lucide-react';

function emptyProgress() {
  return { topics: {} as Record<string, never>, activityLog: [] };
}

export default function TopicGrid() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []); // eslint-disable-line react-hooks/set-state-in-effect
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const progress = mounted ? getProgress() : emptyProgress();
  const statuses = useMemo(() => {
    const s: Record<string, TopicStatus> = {};
    for (const t of topics) {
      s[t.id] = getTopicStatus(t, progress, topics);
    }
    return s;
  }, [progress]);
  const nextTopic = useMemo(() => getNextRecommendedTopic(progress, topics), [progress]);
  const allDone = useMemo(() => topics.every(t => statuses[t.id] === 'completed'), [statuses]);
  const isNextReadyForExam = nextTopic ? isReadyForExam(nextTopic, progress) : false;

  const difficultyColor = (d: string) => {
    switch (d) {
      case 'beginner': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'intermediate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return '';
    }
  };

  const solved = (topicId: string) => {
    const tp = progress.topics[topicId];
    return tp?.solvedProblems?.length ?? 0;
  };

  const groups: { label: string; dotClass: string; textClass: string; topics: typeof topics }[] = [
    { label: 'Beginner', dotClass: 'bg-emerald-400 dark:bg-emerald-400 border-emerald-400/60 dark:border-emerald-400/60', textClass: 'text-emerald-600 dark:text-emerald-400', topics: topics.filter(t => t.difficulty === 'beginner') },
    { label: 'Intermediate', dotClass: 'bg-amber-400 dark:bg-amber-400 border-amber-400/60 dark:border-amber-400/60', textClass: 'text-amber-600 dark:text-amber-400', topics: topics.filter(t => t.difficulty === 'intermediate') },
    { label: 'Advanced', dotClass: 'bg-red-400 dark:bg-red-400 border-red-400/60 dark:border-red-400/60', textClass: 'text-red-600 dark:text-red-400', topics: topics.filter(t => t.difficulty === 'advanced') },
  ];

  const renderTopicCard = (t: typeof topics[number], idx: number, isLast: boolean) => {
    const status = statuses[t.id] ?? 'locked';
    const solvedCount = solved(t.id);
    const totalProblems = t.problemIds.length;
    const pct = totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;
    const isClickable = status !== 'locked';

    return (
      <div key={t.id} className="flex items-stretch gap-3">
        <div className="flex flex-col items-center w-6 shrink-0">
          <div className={`h-6 w-6 rounded-full flex items-center justify-center border-2 ${
            status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
            status === 'in-progress' ? 'bg-amber-500 border-amber-500' :
            status === 'available' ? 'bg-emerald-100 dark:bg-emerald-900 border-emerald-400' :
            'bg-muted border-muted-foreground/30'
          }`}>
            {status === 'completed' ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-white" />
            ) : status === 'locked' ? (
              <Lock className="h-3 w-3 text-muted-foreground/50" />
            ) : (
              <span className={`text-[10px] font-bold ${
                status === 'available' ? 'text-emerald-700 dark:text-emerald-300' : 'text-white'
              }`}>
                {t.order}
              </span>
            )}
          </div>
          {!isLast && (
            <div className={`w-0.5 flex-1 min-h-[8px] ${
              status === 'completed' ? 'bg-emerald-300 dark:bg-emerald-700' :
              'bg-muted-foreground/20'
            }`} />
          )}
        </div>

        <Card
          className={`flex-1 mb-0 transition-all cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 hover:ring-primary/30 ${
            !isClickable ? 'opacity-60 hover:ring-foreground/10' : ''
          }`}
          title={!isClickable && t.prerequisites.length > 0 ? `Requires: ${t.prerequisites.map(id => topics.find(t2 => t2.id === id)?.title).join(', ')}` : undefined}
          onClick={() => setSelectedTopic(t.id)}
        >
          <CardContent className="py-3 px-4">
            <div className="flex items-center gap-3">
              <TopicIcon topicId={t.id} className={`h-5 w-5 shrink-0 ${
                status === 'completed' ? 'text-emerald-500' :
                status === 'locked' ? 'text-muted-foreground/50' :
                'text-primary'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-medium ${
                    status === 'locked' ? 'text-muted-foreground/60' : ''
                  }`}>
                    {t.title}
                  </span>
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-4 ${difficultyColor(t.difficulty)}`}>
                    {t.difficulty}
                  </Badge>
                        {status === 'locked' && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                            <Lock className="h-3 w-3 mr-0.5" />
                            Locked
                          </Badge>
                        )}
                  {t.prerequisites.length > 0 && status === 'locked' && (
                    <span className="text-[10px] text-muted-foreground/60">
                      Requires: {t.prerequisites.map(id => topics.find(t2 => t2.id === id)?.title.split(' ')[0]).join(', ')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{t.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{totalProblems} problems</span>
                </div>

                <div className="flex items-center gap-1">
                  {status !== 'locked' && (
                    <div className="flex gap-0.5">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                        progress.topics[t.id]?.completed
                          ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <BookOpen className="h-3 w-3" />
                      </div>
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                        solvedCount > 0
                          ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Code2 className="h-3 w-3" />
                      </div>
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                        progress.topics[t.id]?.examPassed
                          ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <GraduationCap className="h-3 w-3" />
                      </div>
                    </div>
                  )}
                  {isClickable && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
                  )}
                </div>
              </div>
            </div>

            {(status === 'in-progress' || status === 'completed') && (
              <Progress value={pct} className="h-1 mt-2" />
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {allDone ? (
        <Card className="border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20">
          <CardContent className="py-4 px-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">All Modules Completed</p>
                <p className="text-sm text-muted-foreground">Great work! You&apos;ve finished all 11 modules.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : nextTopic && (
        <Card
          className="border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 cursor-pointer transition-all hover:scale-[1.02] hover:-translate-y-0.5 hover:ring-emerald-500/40"
          onClick={() => router.push(isNextReadyForExam ? `/exam/${nextTopic.id}` : `/learn/${nextTopic.id}`)}
        >
          <CardContent className="py-4 px-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <TopicIcon topicId={nextTopic.id} className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Continue Learning</p>
                  <p className="font-semibold text-sm">{nextTopic.title}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {isNextReadyForExam ? (
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); router.push(`/exam/${nextTopic.id}`); }}>
                    <GraduationCap className="h-4 w-4 mr-1" />
                    Exam
                  </Button>
                ) : (
                  <>
                    <Button size="sm" onClick={(e) => { e.stopPropagation(); router.push(`/learn/${nextTopic.id}`); }}>
                      <BookOpen className="h-4 w-4 mr-1" />
                      Learn
                    </Button>
                    {isPracticeReachable(nextTopic, progress, topics) && (
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); router.push(`/practice/${nextTopic.id}`); }}>
                        <Code2 className="h-4 w-4 mr-1" />
                        Practice
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {groups.map((group, gi) => (
          <div key={group.label}>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-3 mt-2">
              <div className="flex flex-col items-center w-6 shrink-0">
                <div className={`h-6 w-6 rounded-full border-2 border-dashed flex items-center justify-center ${group.dotClass.replace('bg-', 'border-').split(' ')[0]}`}>
                  <div className={`h-2 w-2 rounded-full ${group.dotClass.split(' ')[0]}`} />
                </div>
              </div>
              <span className={`text-xs font-semibold uppercase tracking-widest ${group.textClass}`}>
                {group.label}
              </span>
            </div>

            {/* Topic cards in this group */}
            <div className="space-y-3">
              {group.topics.map((t, ti) => renderTopicCard(t, ti, ti === group.topics.length - 1))}
            </div>

            {/* Connector to next group */}
            {gi < groups.length - 1 && (
              <div className="flex items-center gap-3 py-0.5">
                <div className="flex flex-col items-center w-6 shrink-0">
                  <div className="w-0.5 h-4 bg-muted-foreground/15" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Topic overview dialog */}
      {selectedTopic && (() => {
        const topic = topics.find(t => t.id === selectedTopic)!;
        const status = statuses[topic.id] ?? 'locked';
        const isClickable = status !== 'locked';

        return (
          <Dialog open={!!selectedTopic} onOpenChange={(open) => { if (!open) setSelectedTopic(null); }}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <TopicIcon topicId={topic.id} className="h-5 w-5" />
                  <DialogTitle>{topic.title}</DialogTitle>
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-4 ${difficultyColor(topic.difficulty)}`}>
                    {topic.difficulty}
                  </Badge>
                  {!isClickable && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                      <Lock className="h-3 w-3 mr-0.5" />
                      Locked
                    </Badge>
                  )}
                </div>
                <DialogDescription>{topic.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-3 text-sm">
                {topic.prerequisites.length > 0 && (
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">
                      Prerequisites: {topic.prerequisites.map(id => topics.find(t2 => t2.id === id)?.title).join(', ')}
                    </span>
                  </div>
                )}

                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Theory Sections</p>
                  <div className="flex flex-wrap gap-1">
                    {topic.theory.map(s => (
                      <Badge key={s.id} variant="outline" className="text-[11px]">
                        {s.title}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-muted-foreground pt-1">
                  <ListTodo className="h-4 w-4" />
                  <span>{topic.problemIds.length} problems</span>
                </div>
              </div>

              {isClickable ? (
                <div className="flex gap-2 pt-2">
                  {isReadyForExam(topic, progress) ? (
                    <Button size="sm" className="flex-1" onClick={() => { setSelectedTopic(null); router.push(`/exam/${topic.id}`); }}>
                      <GraduationCap className="h-4 w-4 mr-1" />
                      Exam
                    </Button>
                  ) : (
                    <>
                      <Button size="sm" className="flex-1" onClick={() => { setSelectedTopic(null); router.push(`/learn/${topic.id}`); }}>
                        <BookOpen className="h-4 w-4 mr-1" />
                        Learn
                      </Button>
                      {isPracticeReachable(topic, progress, topics) && (
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => { setSelectedTopic(null); router.push(`/practice/${topic.id}`); }}>
                          <Code2 className="h-4 w-4 mr-1" />
                          Practice
                        </Button>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground border-t pt-3 mt-1">
                  <Lock className="h-3.5 w-3.5 shrink-0" />
                  <span>Complete prerequisites first to unlock this module.</span>
                </div>
              )}
            </DialogContent>
          </Dialog>
        );
      })()}
    </div>
  );
}
