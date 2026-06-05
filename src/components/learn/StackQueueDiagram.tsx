'use client';

const arrowDefs = (
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
    </marker>
    <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
    </marker>
    <marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
    </marker>
    <marker id="arr-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
    </marker>
  </defs>
);

function Container({ title, children, footer }: { title: string; children: React.ReactNode; footer?: string[] }) {
  return (
    <div className="border border-gray-800 rounded-lg bg-[#0d1117] overflow-hidden my-6">
      <div className="px-4 py-2 border-b border-gray-800">
        <h3 className="text-xs font-semibold tracking-wide text-gray-300">{title}</h3>
      </div>
      <div className="p-4 flex items-center justify-center">
        {children}
      </div>
      {footer && footer.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-800">
          {footer.map((line, i) => (
            <p key={i} className="text-xs text-gray-400 leading-relaxed">{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function MutedText({ x, y, children, className = '', ...rest }: { x: number; y: number; children: React.ReactNode; className?: string } & Record<string, string | number | undefined>) {
  return <text x={x} y={y} fill="currentColor" className={`fill-muted-foreground ${className}`} {...rest}>{children}</text>;
}

function StackFrame({ x, values, bottomY, cellW, cellH, gap, topLabel }: { x: number; values: string[]; bottomY: number; cellW: number; cellH: number; gap: number; topLabel?: boolean }) {
  const n = values.length;
  const topY = bottomY - cellH - (n - 1) * (cellH + gap);
  const containerH = n * cellH + (n - 1) * gap;
  return (
    <g>
      <rect x={x} y={topY} width={cellW} height={containerH} rx={5} fill="none" stroke="#4f46e5" strokeWidth={1.5} />
      {values.map((val, i) => {
        const y = bottomY - cellH - i * (cellH + gap);
        return (
          <g key={i}>
            <rect x={x} y={y} width={cellW} height={cellH} rx={3} fill="#1e1b4b" stroke="#4f46e5" strokeWidth={1} />
            <text x={x + cellW / 2} y={y + cellH / 2 + 5} textAnchor="middle" fill="white" fontSize={13} fontFamily="monospace">{val}</text>
          </g>
        );
      })}
      {topLabel && (
        <g>
          <text x={x + cellW / 2} y={topY - 10} textAnchor="middle" fill="#06b6d4" fontSize={11} fontFamily="monospace" fontWeight="bold">top</text>
          <line x1={x + cellW / 2} y1={topY - 7} x2={x + cellW / 2} y2={topY} stroke="#06b6d4" strokeWidth={1.5} markerEnd="url(#arr-cyan)" />
        </g>
      )}
    </g>
  );
}

export function StackDiagram() {
  const cellW = 56, cellH = 26, gap = 3;
  const bottomY = 258;

  const pushBeforeX = 74, pushAfterX = 150;
  const popBeforeX = 314, popAfterX = 390;

  return (
    <Container
      title="STACK (LIFO)"
      footer={[
        'push = new element added to the top; stack grows upward',
        'pop = top element removed; stack shrinks from the top',
        'cyan arrow = top pointer, green = push, red = pop',
        'LIFO: the last element pushed is the first one popped',
      ]}
    >
      <svg viewBox="0 0 520 300" className="w-full max-w-lg">
        {arrowDefs}

        <text x={140} y={30} textAnchor="middle" fill="#22c55e" fontSize={14} fontFamily="monospace" fontWeight="bold">PUSH</text>
        <StackFrame x={pushBeforeX} values={['A', 'B']} bottomY={bottomY} cellW={cellW} cellH={cellH} gap={gap} topLabel />
        <StackFrame x={pushAfterX} values={['A', 'B', 'C']} bottomY={bottomY} cellW={cellW} cellH={cellH} gap={gap} topLabel />
        <rect x={125} y={76} width={30} height={26} rx={3} fill="#132a1a" stroke="#22c55e" strokeWidth={1.5} strokeDasharray="3 2" />
        <text x={140} y={93} textAnchor="middle" fill="#22c55e" fontSize={13} fontFamily="monospace" fontWeight="bold">C</text>
        <path d="M 140 106 Q 160 138, 178 174" fill="none" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arr-green)" />
        <MutedText x={102} y={282} textAnchor="middle" fontSize={11} fontFamily="monospace">Before</MutedText>
        <MutedText x={178} y={282} textAnchor="middle" fontSize={11} fontFamily="monospace">After</MutedText>

        <line x1={258} y1={45} x2={258} y2={270} stroke="#334155" strokeWidth={1} strokeDasharray="4 4" />

        <text x={420} y={30} textAnchor="middle" fill="#ef4444" fontSize={14} fontFamily="monospace" fontWeight="bold">POP</text>
        <StackFrame x={popBeforeX} values={['A', 'B', 'C']} bottomY={bottomY} cellW={cellW} cellH={cellH} gap={gap} topLabel />
        <StackFrame x={popAfterX} values={['A', 'B']} bottomY={bottomY} cellW={cellW} cellH={cellH} gap={gap} topLabel />
        <rect x={405} y={76} width={30} height={26} rx={3} fill="#2d1414" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="3 2" />
        <text x={420} y={93} textAnchor="middle" fill="#ef4444" fontSize={13} fontFamily="monospace" fontWeight="bold">C</text>
        <path d="M 342 174 Q 400 138, 420 106" fill="none" stroke="#ef4444" strokeWidth={2} markerEnd="url(#arr-red)" />
        <MutedText x={342} y={282} textAnchor="middle" fontSize={11} fontFamily="monospace">Before</MutedText>
        <MutedText x={418} y={282} textAnchor="middle" fontSize={11} fontFamily="monospace">After</MutedText>
      </svg>
    </Container>
  );
}

function QueueFrame({ x, y, values, cellW, cellH, gap, frontLabel, rearLabel }: {
  x: number; y: number; values: string[];
  cellW: number; cellH: number; gap: number;
  frontLabel?: boolean; rearLabel?: boolean;
}) {
  const n = values.length;
  const totalW = n * (cellW + gap) - gap;
  return (
    <g>
      <rect x={x - 4} y={y - 4} width={totalW + 8} height={cellH + 8} rx={5} fill="none" stroke="#4f46e5" strokeWidth={1.5} />
      {values.map((val, i) => {
        const cx = x + i * (cellW + gap);
        return (
          <g key={i}>
            <rect x={cx} y={y} width={cellW} height={cellH} rx={3} fill="#1e1b4b" stroke="#4f46e5" strokeWidth={1} />
            <text x={cx + cellW / 2} y={y + cellH / 2 + 5} textAnchor="middle" fill="white" fontSize={13} fontFamily="monospace">{val}</text>
          </g>
        );
      })}
      {frontLabel && (
        <g>
          <text x={x + cellW / 2} y={y - 14} textAnchor="middle" fill="#22c55e" fontSize={10} fontFamily="monospace" fontWeight="bold">front</text>
          <line x1={x + cellW / 2} y1={y - 11} x2={x + cellW / 2} y2={y - 1} stroke="#22c55e" strokeWidth={1.5} markerEnd="url(#arr-green)" />
        </g>
      )}
      {rearLabel && (
        <g>
          <text x={x + (n - 1) * (cellW + gap) + cellW / 2} y={y - 14} textAnchor="middle" fill="#06b6d4" fontSize={10} fontFamily="monospace" fontWeight="bold">rear</text>
          <line x1={x + (n - 1) * (cellW + gap) + cellW / 2} y1={y - 11} x2={x + (n - 1) * (cellW + gap) + cellW / 2} y2={y - 1} stroke="#06b6d4" strokeWidth={1.5} markerEnd="url(#arr-cyan)" />
        </g>
      )}
    </g>
  );
}

export function QueueDiagram() {
  const cellW = 36, cellH = 26, gap = 2;

  return (
    <Container
      title="QUEUE (FIFO)"
      footer={[
        'enqueue = new element added at the rear; queue extends',
        'dequeue = front element removed; queue shifts forward',
        'green arrow = front pointer, cyan arrow = rear pointer',
        'green = enqueue, red = dequeue',
        'FIFO: the first element enqueued is the first one dequeued',
      ]}
    >
      <svg viewBox="0 0 560 240" className="w-full max-w-lg">
        {arrowDefs}

        <text x={155} y={22} textAnchor="middle" fill="#22c55e" fontSize={14} fontFamily="monospace" fontWeight="bold">ENQUEUE</text>

        <QueueFrame x={65} y={78} values={['1', '2', '3']} cellW={cellW} cellH={cellH} gap={gap} frontLabel rearLabel />
        <QueueFrame x={65} y={190} values={['1', '2', '3', '4']} cellW={cellW} cellH={cellH} gap={gap} frontLabel rearLabel />

        <MutedText x={10} y={95} textAnchor="start" fontSize={11} fontFamily="monospace">Before</MutedText>
        <MutedText x={10} y={207} textAnchor="start" fontSize={11} fontFamily="monospace">After</MutedText>

        <rect x={183} y={28} width={28} height={24} rx={3} fill="#132a1a" stroke="#22c55e" strokeWidth={1.5} strokeDasharray="3 2" />
        <text x={197} y={44} textAnchor="middle" fill="#22c55e" fontSize={12} fontFamily="monospace" fontWeight="bold">4</text>
        <path d="M 197 56 Q 208 123, 197 190" fill="none" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arr-green)" />

        <line x1={275} y1={40} x2={275} y2={222} stroke="#334155" strokeWidth={1} strokeDasharray="4 4" />

        <text x={425} y={22} textAnchor="middle" fill="#ef4444" fontSize={14} fontFamily="monospace" fontWeight="bold">DEQUEUE</text>

        <QueueFrame x={355} y={78} values={['1', '2', '3', '4']} cellW={cellW} cellH={cellH} gap={gap} frontLabel rearLabel />
        <QueueFrame x={355} y={190} values={['2', '3', '4']} cellW={cellW} cellH={cellH} gap={gap} frontLabel rearLabel />

        <MutedText x={286} y={95} textAnchor="start" fontSize={11} fontFamily="monospace">Before</MutedText>
        <MutedText x={286} y={207} textAnchor="start" fontSize={11} fontFamily="monospace">After</MutedText>

        <rect x={286} y={16} width={28} height={24} rx={3} fill="#2d1414" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="3 2" />
        <text x={300} y={32} textAnchor="middle" fill="#ef4444" fontSize={12} fontFamily="monospace" fontWeight="bold">1</text>
        <path d="M 351 91 Q 340 55, 300 40" fill="none" stroke="#ef4444" strokeWidth={2} markerEnd="url(#arr-red)" />
      </svg>
    </Container>
  );
}
