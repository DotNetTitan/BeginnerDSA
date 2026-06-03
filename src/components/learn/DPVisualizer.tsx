'use client';

import { useState, useRef, useEffect } from 'react';
import { generateClimbingStairsSteps, type DPStep } from '@/lib/dp-visualizer-algorithms';

const SPEED_OPTIONS = [
  { label: '0.25x', value: 1600 },
  { label: '0.5x', value: 800 },
  { label: '1x', value: 400 },
  { label: '2x', value: 200 },
  { label: '4x', value: 100 },
];

export default function DPVisualizer() {
  const [steps] = useState<DPStep[]>(() => generateClimbingStairsSteps(6));
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (playing && currentStep < steps.length - 1) {
      timerRef.current = setTimeout(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          if (next >= steps.length - 1) {
            setPlaying(false);
            setCompleted(true);
          }
          return next;
        });
      }, SPEED_OPTIONS[speed].value);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, currentStep, steps.length, speed]);

  const togglePlay = () => {
    if (completed) {
      setCompleted(false);
      setCurrentStep(0);
      setPlaying(true);
      return;
    }
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setPlaying(p => !p);
  };

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => {
        const next = prev + 1;
        if (next >= steps.length - 1) setCompleted(true);
        return next;
      });
    }
  };

  const stepBack = () => {
    if (currentStep > 0) {
      setPlaying(false);
      setCompleted(false);
      setCurrentStep(prev => prev - 1);
    }
  };

  const reset = () => {
    setPlaying(false);
    setCompleted(false);
    setCurrentStep(0);
  };

  const current = steps[currentStep];
  if (!current) return null;

  const cellColor = (i: number) => {
    if (current.values[i] === null) return { bg: '#e2e8f0', border: '#cbd5e1', text: '#94a3b8' };
    if (i === current.computingIndex && i <= 1) return { bg: '#3b82f6', border: '#2563eb', text: 'white' };
    if (i === current.computingIndex) return { bg: '#f59e0b', border: '#d97706', text: 'black' };
    if (current.referencedIndices.includes(i)) return { bg: '#22c55e', border: '#16a34a', text: 'white' };
    return { bg: '#1e293b', border: '#0f172a', text: 'white' };
  };

  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Climbing Stairs: Bottom-Up DP
          </span>
          <span className="text-xs text-muted-foreground">
            Step {Math.min(currentStep + 1, steps.length)} / {steps.length}
          </span>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col items-center gap-4 min-h-[200px]">
        <div className="flex items-end gap-2">
          {current.values.map((val, i) => {
            const colors = cellColor(i);
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-muted-foreground">
                  Step {i}
                </span>
                <div
                  className="w-14 h-14 rounded-md border-2 flex items-center justify-center text-lg font-mono font-bold transition-colors duration-200"
                  style={{
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                >
                  {val !== null ? val : '?'}
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {val !== null ? `${val} way${val === 1 ? '' : 's'}` : ''}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center min-h-[2rem]">
          <div className="text-xs font-mono font-semibold text-foreground bg-muted/50 px-3 py-1.5 rounded-md inline-block">
            {current.formula || '\u00A0'}
          </div>
        </div>
      </div>

      <div className="px-4 py-2 text-center text-xs text-muted-foreground min-h-[1rem] border-t">
        {current.description}
      </div>

      <div className="px-4 py-3 border-t bg-muted/30 flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-md text-xs font-medium h-8 px-3 border bg-background hover:bg-accent"
        >
          Reset
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={stepBack}
            disabled={currentStep === 0}
            className="inline-flex items-center justify-center rounded-md text-xs font-medium h-8 w-8 border bg-background hover:bg-accent disabled:opacity-30"
          >
            ◀
          </button>
          <button
            onClick={togglePlay}
            className="inline-flex items-center justify-center rounded-md text-xs font-medium h-8 px-4 border bg-background hover:bg-accent min-w-[4rem]"
          >
            {playing ? '⏸ Pause' : completed ? '▶ Replay' : '▶ Play'}
          </button>
          <button
            onClick={stepForward}
            disabled={currentStep >= steps.length - 1}
            className="inline-flex items-center justify-center rounded-md text-xs font-medium h-8 w-8 border bg-background hover:bg-accent disabled:opacity-30"
          >
            ▶
          </button>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <span className="text-xs text-muted-foreground">Speed:</span>
          {SPEED_OPTIONS.map((opt, i) => (
            <button
              key={opt.label}
              onClick={() => setSpeed(i)}
              className={`inline-flex items-center justify-center rounded-md text-xs font-medium h-7 px-2 border ${
                speed === i ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-accent'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 border-t flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#3b82f6' }} /> Base case
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#22c55e' }} /> Referenced
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#f59e0b' }} /> Computing
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#1e293b' }} /> Done
        </span>
      </div>
    </div>
  );
}
