'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { topics } from '@/lib/topics';
import TopicIcon from '@/components/ui/TopicIcon';
import { getStats, getRecentActivity, resetProgress, getProgress, isAllUnlocked } from '@/lib/progress-store';
import { BookOpen, Code2, RotateCcw, Trophy, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function ProgressContent() {
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [refresh, setRefresh] = useState(0);
  const [resetOpen, setResetOpen] = useState(false);
  const stats = useMemo(() => { void refresh; return getStats(isAllUnlocked()); }, [refresh]);
  const activity = useMemo(() => { void refresh; return getRecentActivity(10); }, [refresh]);
  const topicProgress = useMemo(() => {
    void refresh; const p = getProgress();
    const tp: Record<string, { theoryRead: boolean; examPassed: boolean; solved: number; total: number }> = {};
    for (const t of topics) {
      const pr = p.topics[t.id];
      tp[t.id] = {
        theoryRead: pr?.completed ?? false,
        examPassed: pr?.examPassed ?? false,
        solved: pr?.solvedProblems?.length ?? 0,
        total: t.problemIds.length,
      };
    }
    return tp;
  }, [refresh]);

  const handleReset = () => {
    resetProgress();
    setRefresh(r => r + 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Your Progress</h1>
          <p className="text-sm text-muted-foreground">Track your DSA learning journey</p>
        </div>
        <Dialog open={resetOpen} onOpenChange={setResetOpen}>
          <DialogTrigger className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Progress?</DialogTitle>
              <DialogDescription>This will erase all your progress data. This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setResetOpen(false)}>Cancel</Button>
              <Button variant="destructive" className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800" onClick={() => { handleReset(); setResetOpen(false); }}>Reset Everything</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {mounted ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.completedTopics}/{stats.totalTopics}</p>
              <Progress value={(stats.completedTopics / stats.totalTopics) * 100} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Code2 className="h-4 w-4 text-muted-foreground" />
                Problems Solved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.solvedProblems}/{stats.totalProblems}</p>
              <Progress value={stats.totalProblems > 0 ? (stats.solvedProblems / stats.totalProblems) * 100 : 0} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                Overall
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.percentage}%</p>
              <Progress value={stats.percentage} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[0, 1, 2].map(i => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">—</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">—</p>
                <Progress value={0} className="h-1.5 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {mounted && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Per-Topic Breakdown</h2>
          <div className="space-y-3">
            {topics.map((t) => {
              const tp = topicProgress[t.id];
              if (!tp) return null;
              const pct = tp.total > 0 ? (tp.solved / tp.total) * 100 : 0;
              return (
                <div key={t.id} className="flex items-center gap-3">
                  <TopicIcon topicId={t.id} className="h-5 w-5 shrink-0 text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium flex items-center gap-1.5">
                        {t.title}
                        {tp.examPassed && <GraduationCap className="h-3.5 w-3.5 text-emerald-500" />}
                      </span>
                      <span className="text-muted-foreground text-xs flex items-center gap-1.5">
                        {tp.examPassed ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        ) : tp.theoryRead ? (
                          <BookOpen className="h-3.5 w-3.5 text-amber-500" />
                        ) : null}
                        {tp.solved}/{tp.total}
                      </span>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {mounted && activity.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {activity.map((a, i) => {
              const topic = topics.find(t => t.id === a.topicId);
              return (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-xs">{new Date(a.timestamp).toLocaleDateString()}</span>
                  <span>
                    {a.type === 'solved-problem' ? 'Solved' : a.type === 'viewed-topic' ? 'Studied' : 'Passed exam'}
                    {' '}
                    <span className="font-medium text-foreground">{topic?.title ?? a.topicId}</span>
                    {a.problemId && <span>: {a.problemId}</span>}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
