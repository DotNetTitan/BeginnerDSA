'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { getTopicProgress } from '@/lib/progress-store';
import { getTopic } from '@/lib/topics';
import { GraduationCap, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ExamOfferModal({ topicId }: { topicId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const progress = getTopicProgress(topicId);
      const topic = getTopic(topicId);
      if (!topic) return;
      const allSolved = progress.solvedProblems.length >= topic.problemIds.length;
      if (allSolved && !progress.examPassed) {
        setOpen(true);
      }
    };
    check();
    window.addEventListener('dsa-progress-changed', check);
    return () => window.removeEventListener('dsa-progress-changed', check);
  }, [topicId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <DialogTitle>All Problems Solved!</DialogTitle>
          </div>
          <DialogDescription>
            You&apos;ve completed every practice problem for this module. Ready to test your knowledge?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-center">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Keep Practicing
          </Button>
          <Button onClick={() => { setOpen(false); router.push(`/exam/${topicId}`); }}>
            <GraduationCap className="h-4 w-4 mr-1" />
            Take Exam
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
