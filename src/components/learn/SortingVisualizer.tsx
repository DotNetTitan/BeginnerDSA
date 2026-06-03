'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { generateSteps, generateRandomArray, getAlgorithmName, type AlgorithmType, type SortStep, type BarState } from '@/lib/sorting-visualizer-algorithms';

interface SortingVisualizerProps {
  algorithm: AlgorithmType;
  initialSize?: number;
}

const BAR_COLORS: Record<BarState, string> = {
  default: '#3b82f6',
  comparing: '#eab308',
  swapping: '#ef4444',
  sorted: '#22c55e',
  pivot: '#a855f7',
};

const SPEED_OPTIONS = [
  { label: '0.5x', value: 800 },
  { label: '1x', value: 400 },
  { label: '2x', value: 200 },
  { label: '4x', value: 100 },
];

function createInitialState(algorithm: AlgorithmType, size: number): SortStep[] {
  const arr = generateRandomArray(size);
  return generateSteps(algorithm, arr);
}

export default function SortingVisualizer({ algorithm, initialSize = 12 }: SortingVisualizerProps) {
  const [arraySize, setArraySize] = useState(initialSize);
  const [steps, setSteps] = useState<SortStep[]>(() => createInitialState(algorithm, initialSize));
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(600);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    setContainerWidth(el.clientWidth);
    return () => observer.disconnect();
  }, []);

  const initArray = useCallback(() => {
    const arr = generateRandomArray(arraySize);
    const generated = generateSteps(algorithm, arr);
    setSteps(generated);
    setCurrentStep(0);
    setPlaying(false);
    setCompleted(false);
  }, [algorithm, arraySize]);

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
    initArray();
  };

  const current = steps[currentStep];
  if (!current) return null;

  const maxVal = Math.max(...current.array);
  const barWidth = Math.max(4, Math.min(32, Math.floor((containerWidth / current.array.length) - 4)));
  const svgHeight = 280;

  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">{getAlgorithmName(algorithm)}</span>
          <span className="text-xs text-muted-foreground">
            Step {Math.min(currentStep + 1, steps.length)} / {steps.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <label className="text-xs text-muted-foreground mr-1">Size:</label>
          <select
            value={arraySize}
            onChange={e => { setArraySize(Number(e.target.value)); setPlaying(false); }}
            className="text-xs border rounded px-1 py-0.5 bg-background"
          >
            {[8, 10, 12, 16, 20].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <div ref={containerRef} className="px-4 py-6 flex items-end justify-center" style={{ height: svgHeight }}>
        <svg width="100%" height={svgHeight - 48} viewBox={`0 0 ${current.array.length * (barWidth + 4)} ${svgHeight - 48}`} preserveAspectRatio="xMidYMid meet">
          {current.array.map((val, i) => {
            const x = i * (barWidth + 4);
            const barH = (val / maxVal) * (svgHeight - 80);
            const y = svgHeight - 48 - barH;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  fill={BAR_COLORS[current.states[i]]}
                  rx={2}
                  className="transition-colors duration-150"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 4}
                  textAnchor="middle"
                  fontSize={Math.min(11, barWidth + 2)}
                  fill="currentColor"
                  className="fill-muted-foreground"
                >
                  {val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="px-4 py-2 text-center text-xs text-muted-foreground min-h-[1.25rem]">
        {current.description}
      </div>

      <div className="px-4 py-3 border-t bg-muted/30 flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-md text-xs font-medium h-8 px-3 border bg-background hover:bg-accent"
          title="Reset"
        >
          Reset
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={stepBack}
            disabled={currentStep === 0}
            className="inline-flex items-center justify-center rounded-md text-xs font-medium h-8 w-8 border bg-background hover:bg-accent disabled:opacity-30"
            title="Step back"
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
            title="Step forward"
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
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: BAR_COLORS.default }} /> Default
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: BAR_COLORS.comparing }} /> Comparing
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: BAR_COLORS.swapping }} /> Swapping
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: BAR_COLORS.sorted }} /> Sorted
        </span>
        {algorithm === 'quick' && (
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: BAR_COLORS.pivot }} /> Pivot
          </span>
        )}
      </div>
    </div>
  );
}
