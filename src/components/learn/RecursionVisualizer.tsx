'use client';

import { useState, useRef, useEffect } from 'react';
import { generateFactorialSteps, type RecursionStep } from '@/lib/recursion-visualizer-algorithms';

const COLORS = {
  active: '#eab308',
  done: '#22c55e',
  waiting: '#94a3b8',
  textActive: 'black',
  textDone: 'white',
  textWaiting: 'white',
};

const SPEED_OPTIONS = [
  { label: '0.25x', value: 1600 },
  { label: '0.5x', value: 800 },
  { label: '1x', value: 400 },
  { label: '2x', value: 200 },
  { label: '4x', value: 100 },
];

export default function RecursionVisualizer() {
  const [steps] = useState<RecursionStep[]>(() => generateFactorialSteps());
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(0);
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

  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Recursion: factorial(5)</span>
          <span className="text-xs text-muted-foreground">
            Step {Math.min(currentStep + 1, steps.length)} / {steps.length}
          </span>
        </div>
      </div>

      <div className="px-4 py-4 flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col-reverse items-center gap-1">
          {current.frames.map(f => {
            const isActive = f.status === 'active';
            const isDone = f.status === 'done';
            const bg = isActive ? COLORS.active : isDone ? COLORS.done : COLORS.waiting;
            const tc = isActive ? COLORS.textActive : COLORS.textWaiting;
            return (
              <div
                key={f.n}
                className="rounded-md border px-4 py-2 min-w-[240px] transition-colors duration-200"
                style={{ backgroundColor: bg, borderColor: isActive ? '#ca8a04' : isDone ? '#16a34a' : '#64748b' }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-mono font-bold" style={{ color: tc }}>
                    factorial({f.n})
                  </span>
                  <span className="text-xs font-mono" style={{ color: tc, opacity: 0.85 }}>
                    {f.expression}
                  </span>
                  {f.result !== null && (
                    <span className="text-xs font-mono font-bold" style={{ color: tc }}>
                      = {f.result}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-2 text-center text-xs text-muted-foreground min-h-[1rem]">
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
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.active }} /> Active
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.done }} /> Done
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.waiting }} /> Waiting
        </span>
      </div>
    </div>
  );
}
