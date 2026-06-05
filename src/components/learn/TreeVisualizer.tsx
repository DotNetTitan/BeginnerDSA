'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { generateTraversalSteps, getTraversalDescription, type TraversalType, type TreeStep } from '@/lib/tree-visualizer-algorithms';

const NODE_COLORS = {
  default: '#3b82f6',
  current: '#eab308',
  visited: '#22c55e',
};

const TRAVERSALS: { label: string; value: TraversalType }[] = [
  { label: 'Inorder (L Root R)', value: 'inorder' },
  { label: 'Preorder (Root L R)', value: 'preorder' },
  { label: 'Postorder (L R Root)', value: 'postorder' },
  { label: 'Level Order (BFS)', value: 'levelorder' },
];

const SPEED_OPTIONS = [
  { label: '0.25x', value: 1600 },
  { label: '0.5x', value: 800 },
  { label: '1x', value: 400 },
  { label: '2x', value: 200 },
  { label: '4x', value: 100 },
];

function createInitialState(type: TraversalType): TreeStep[] {
  return generateTraversalSteps(type);
}

export default function TreeVisualizer() {
  const [type, setType] = useState<TraversalType>('inorder');
  const [steps, setSteps] = useState<TreeStep[]>(() => createInitialState('inorder'));
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initTraversal = useCallback((t: TraversalType) => {
    const generated = generateTraversalSteps(t);
    setSteps(generated);
    setCurrentStep(0);
    setPlaying(false);
    setCompleted(false);
  }, []);

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

  const handleTypeChange = (newType: TraversalType) => {
    setType(newType);
    initTraversal(newType);
  };

  const current = steps[currentStep];
  if (!current) return null;

  const svgHeight = 260;
  const nodeRadius = 20;

  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Tree Traversal</span>
          <span className="text-xs text-muted-foreground">
            Step {Math.min(currentStep + 1, steps.length)} / {steps.length}
          </span>
        </div>
        <select
          value={type}
          onChange={e => handleTypeChange(e.target.value as TraversalType)}
          className="text-xs border rounded px-1 py-0.5 bg-background"
        >
          {TRAVERSALS.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div ref={containerRef} className="px-4 py-4 flex items-center justify-center" style={{ height: svgHeight }}>
        <svg width="100%" height={svgHeight - 32} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet">
          {current.positions.map(p => {
            const parentLeft = p.left !== null ? current.positions.find(c => c.id === p.left) : null;
            const parentRight = p.right !== null ? current.positions.find(c => c.id === p.right) : null;
            return (
              <g key={p.id}>
                {parentLeft && (
                  <line
                    x1={p.x} y1={p.y + nodeRadius}
                    x2={parentLeft.x} y2={parentLeft.y - nodeRadius}
                    stroke="#94a3b8" strokeWidth="2"
                  />
                )}
                {parentRight && (
                  <line
                    x1={p.x} y1={p.y + nodeRadius}
                    x2={parentRight.x} y2={parentRight.y - nodeRadius}
                    stroke="#94a3b8" strokeWidth="2"
                  />
                )}
              </g>
            );
          })}
          {current.positions.map(p => {
            let color = NODE_COLORS.default;
            if (p.id === current.currentNode) color = NODE_COLORS.current;
            else if (current.visited.includes(p.id)) color = NODE_COLORS.visited;
            return (
              <g key={p.id}>
                <circle cx={p.x} cy={p.y} r={nodeRadius} fill={color} stroke={color} strokeWidth="2" className="transition-colors duration-200" />
                <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="bold" fill="white">
                  {p.val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="px-4 py-2 text-center text-xs text-muted-foreground min-h-[1.25rem]">
        {current.description}
      </div>

      <div className="px-4 py-2 border-t bg-muted/30 text-center text-sm font-mono tracking-wider min-h-[2rem]">
        {current.result.length > 0 ? current.result.join('  ') : '\u00A0'}
      </div>

      <div className="px-4 py-3 border-t bg-muted/30 flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => handleTypeChange(type)}
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
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: NODE_COLORS.default }} /> Unvisited
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: NODE_COLORS.current }} /> Current
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: NODE_COLORS.visited }} /> Visited
        </span>
        <span className="text-xs text-muted-foreground shrink-0">{getTraversalDescription(type)}</span>
      </div>
    </div>
  );
}
