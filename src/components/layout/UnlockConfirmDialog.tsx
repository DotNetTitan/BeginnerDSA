'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Unlock } from 'lucide-react';

export default function UnlockConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Unlock className="h-5 w-5" />
            Unlock all modules?
          </DialogTitle>
          <DialogDescription className="pt-1">
            These topics are ordered to build on each other. Following the path is recommended for the best learning experience, but you can skip ahead if you prefer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-amber-500 text-white hover:bg-amber-600"
            onClick={() => { onConfirm(); onOpenChange(false); }}
          >
            Unlock Anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
