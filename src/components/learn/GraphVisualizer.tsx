'use client';

import { useState, useRef, useEffect } from 'react';
import { getGraphData, generateBfsSteps, generateDfsSteps, type GraphStep } from '@/lib/graph-visualizer-algorithms';

const COLORS = {
  unvisited: '#3b82f6',
  current: '#eab308',
  visited: '#22c55e',
  edge: '#94a3b8',
  edgeHighlight: '#eab308',
  text: '#ffffff',
  stroke: '#64748b',
};

const SPEED_OPTIONS = [
  { label: '0.25x', value: 1600 },
  { label: '0.5x', value: 800 },
  { label: '1x', value: 400 },
  { label: '2x', value: 200 },
  { label: '4x', value: 100 },
];

const { nodes: graphNodes, edges: graphEdges } = getGraphData();

export default function GraphVisualizer() {
  const [mode, setMode] = useState<'bfs' | 'dfs'>('bfs');
  const [steps, setSteps] = useState<GraphStep[]>(() => generateBfsSteps());
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

  const handleModeChange = (m: 'bfs' | 'dfs') => {
    setMode(m);
    setSteps(m === 'bfs' ? generateBfsSteps() : generateDfsSteps());
    setCurrentStep(0);
    setPlaying(false);
    setCompleted(false);
  };

  const reset = () => {
    setPlaying(false);
    setCompleted(false);
    setCurrentStep(0);
  };

  const current = steps[currentStep];
  if (!current) return null;

  const nodeR = 22;

  function getNodeColor(id: number): string {
    if (id === current.current) return COLORS.current;
    if (current.visited.includes(id)) return COLORS.visited;
    return COLORS.unvisited;
  }

  const visitedSet = new Set(current.visited);

  return (
    <div className="border rounded-lg bg-card overflow-hidden">
      <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Graph Traversal</span>
          <span className="text-xs text-muted-foreground">
            Step {Math.min(currentStep + 1, steps.length)} / {steps.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleModeChange('bfs')}
            className={`inline-flex items-center justify-center rounded-md text-xs font-medium h-7 px-3 border ${
              mode === 'bfs' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-accent'
            }`}
          >
            BFS
          </button>
          <button
            onClick={() => handleModeChange('dfs')}
            className={`inline-flex items-center justify-center rounded-md text-xs font-medium h-7 px-3 border ${
              mode === 'dfs' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-accent'
            }`}
          >
            DFS
          </button>
        </div>
      </div>

      <div className="px-4 py-4 flex items-center justify-center min-h-[340px]">
        <svg width="100%" height="300" viewBox="0 0 500 340" preserveAspectRatio="xMidYMid meet">
          {graphEdges.map(e => {
            const from = graphNodes.find(n => n.id === e.from)!;
            const to = graphNodes.find(n => n.id === e.to)!;
            const highlighted = current.current !== null && (
              (e.from === current.current && visitedSet.has(e.to)) ||
              (e.to === current.current && visitedSet.has(e.from))
            );
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={highlighted ? COLORS.edgeHighlight : COLORS.edge}
                strokeWidth={highlighted ? 3 : 2}
                className="transition-colors duration-200"
              />
            );
          })}

          {graphNodes.map(n => {
            const color = getNodeColor(n.id);
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={nodeR} fill={color} stroke={COLORS.stroke} strokeWidth="2" className="transition-colors duration-200" />
                <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight="bold" fill={COLORS.text}>
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="px-4 py-2 border-t bg-muted/30">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <span className="font-medium">{current.frontLabel}:</span>
        </div>
        <div className="flex items-center gap-1 flex-wrap min-h-[1.5rem]">
          {current.frontier.length === 0 ? (
            <span className="text-xs text-muted-foreground italic">empty</span>
          ) : (
            current.frontier.map((v, i) => (
              <span key={i} className="inline-flex items-center justify-center rounded text-xs font-bold h-6 px-2 bg-primary text-primary-foreground">
                {v}
              </span>
            ))
          )}
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
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.unvisited }} /> Unvisited
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.current }} /> Current
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.visited }} /> Visited
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.edgeHighlight }} /> Traversed edge
        </span>
      </div>
    </div>
  );
}
