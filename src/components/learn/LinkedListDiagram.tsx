'use client';

const arrowDefs = (
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
    </marker>
    <marker id="arr-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
    </marker>
    <marker id="arr-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
    </marker>

  </defs>
);

function NodeBox({ x, y, val, highlight }: { x: number; y: number; val: string; highlight?: 'green' | 'cyan' | 'red' }) {
  const borderColor = highlight === 'green' ? '#22c55e' : highlight === 'cyan' ? '#06b6d4' : highlight === 'red' ? '#ef4444' : '#4f46e5';
  return (
    <g>
      <rect x={x} y={y} width={78} height={44} rx={5} fill="#1e1b4b" stroke={borderColor} strokeWidth={1.5} />
      <text x={x + 39} y={y + 27} textAnchor="middle" fill="white" fontSize={15} fontFamily="monospace">{val}</text>
      <rect x={x + 55} y={y} width={23} height={44} fill="#312e81" rx={5} />
      <rect x={x + 55} y={y} width={23} height={44} fill="none" stroke={borderColor} strokeWidth={1.5} rx={5} />
      <text x={x + 66} y={y + 27} textAnchor="middle" fill="#a5b4fc" fontSize={9} fontFamily="monospace">nxt</text>
    </g>
  );
}

function NodeBoxDoubly({ x, y, val }: { x: number; y: number; val: string }) {
  return (
    <g>
      <rect x={x} y={y} width={96} height={44} rx={5} fill="#1e1b4b" stroke="#4f46e5" strokeWidth={1.5} />
      <rect x={x} y={y} width={22} height={44} fill="#312e81" rx={5} />
      <rect x={x} y={y} width={22} height={44} fill="none" stroke="#4f46e5" strokeWidth={1.5} rx={5} />
      <text x={x + 11} y={y + 27} textAnchor="middle" fill="#a5b4fc" fontSize={9} fontFamily="monospace">prv</text>
      <text x={x + 58} y={y + 27} textAnchor="middle" fill="white" fontSize={15} fontFamily="monospace">{val}</text>
      <rect x={x + 74} y={y} width={22} height={44} fill="#312e81" rx={5} />
      <rect x={x + 74} y={y} width={22} height={44} fill="none" stroke="#4f46e5" strokeWidth={1.5} rx={5} />
      <text x={x + 85} y={y + 27} textAnchor="middle" fill="#a5b4fc" fontSize={9} fontFamily="monospace">nxt</text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, color = 'arr' }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth={1.5} markerEnd={`url(#${color})`} />;
}

function NullLabel({ x, y }: { x: number; y: number }) {
  return <text x={x} y={y} textAnchor="middle" fill="#ef4444" fontSize={13} fontFamily="monospace" fontStyle="italic">null</text>;
}

function MutedText({ x, y, children, className = '', ...rest }: { x: number; y: number; children: React.ReactNode; className?: string } & Record<string, string | number | undefined>) {
  return <text x={x} y={y} fill="currentColor" className={`fill-muted-foreground ${className}`} {...rest}>{children}</text>;
}

function Container({ title, children, footer }: { title: string; children: React.ReactNode; footer?: string[] }) {
  return (
    <div className="border rounded-lg bg-card overflow-hidden my-6">
      <div className="px-4 py-2 border-b bg-muted/30">
        <h3 className="text-xs font-semibold tracking-wide">{title}</h3>
      </div>
      <div className="p-4 flex items-center justify-center">
        {children}
      </div>
      {footer && footer.length > 0 && (
        <div className="px-4 py-2 border-t bg-muted/30">
          {footer.map((line, i) => (
            <p key={i} className="text-xs text-muted-foreground leading-relaxed">{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export function SinglyLinkedList() {
  return (
    <Container
      title="SINGLY LINKED LIST STRUCTURE"
      footer={[
        'head — entry point to the list',
        'node — contains a value and a pointer (nxt)',
        'nxt — stores the memory address of the next node',
        'arrow — shows which node nxt points to',
        'null — marks the end of the list',
      ]}
    >
      <svg viewBox="0 0 520 150" className="w-full max-w-lg">
        {arrowDefs}
        <text x={38} y={22} textAnchor="middle" fill="#22c55e" fontSize={13} fontFamily="monospace" fontWeight="bold">head</text>
        <line x1={38} y1={25} x2={38} y2={48} stroke="#22c55e" strokeWidth={1.5} markerEnd="url(#arr-green)" />
        <NodeBox x={10} y={55} val="10" />
        <Arrow x1={88} y1={77} x2={118} y2={77} />
        <NodeBox x={120} y={55} val="20" />
        <Arrow x1={198} y1={77} x2={228} y2={77} />
        <NodeBox x={230} y={55} val="30" />
        <Arrow x1={308} y1={77} x2={338} y2={77} />
        <NodeBox x={340} y={55} val="40" />
        <text x={379} y={22} textAnchor="middle" fill="#22c55e" fontSize={13} fontFamily="monospace" fontWeight="bold">tail</text>
        <line x1={379} y1={25} x2={379} y2={48} stroke="#22c55e" strokeWidth={1.5} markerEnd="url(#arr-green)" />
        <Arrow x1={418} y1={77} x2={448} y2={77} />
        <NullLabel x={475} y={82} />
      </svg>
    </Container>
  );
}

export function DoublyLinkedList() {
  return (
    <Container
      title="DOUBLY LINKED LIST STRUCTURE"
      footer={[
        'prv — pointer to the previous node',
        'nxt — pointer to the next node',
        'head.prv → null, tail.nxt → null',
        'doubly linked: can traverse in both directions',
      ]}
    >
      <svg viewBox="0 0 560 170" className="w-full max-w-lg">
        {arrowDefs}
        <NodeBoxDoubly x={92} y={60} val="10" />
        <NodeBoxDoubly x={228} y={60} val="20" />
        <NodeBoxDoubly x={364} y={60} val="30" />
        <NullLabel x={535} y={112} />

        <NullLabel x={18} y={55} />
        <text x={140} y={22} textAnchor="middle" fill="#22c55e" fontSize={13} fontFamily="monospace" fontWeight="bold">head</text>
        <line x1={140} y1={25} x2={140} y2={50} stroke="#22c55e" strokeWidth={1.5} markerEnd="url(#arr-green)" />
        <text x={412} y={22} textAnchor="middle" fill="#22c55e" fontSize={13} fontFamily="monospace" fontWeight="bold">tail</text>
        <line x1={412} y1={25} x2={412} y2={50} stroke="#22c55e" strokeWidth={1.5} markerEnd="url(#arr-green)" />
        <MutedText x={214} y={42} textAnchor="middle" fontSize={10} fontFamily="monospace">prv</MutedText>
        <MutedText x={350} y={42} textAnchor="middle" fontSize={10} fontFamily="monospace">prv</MutedText>
        <MutedText x={208} y={128} textAnchor="middle" fontSize={10} fontFamily="monospace">nxt</MutedText>
        <MutedText x={344} y={128} textAnchor="middle" fontSize={10} fontFamily="monospace">nxt</MutedText>
        <MutedText x={490} y={128} textAnchor="middle" fontSize={10} fontFamily="monospace">nxt</MutedText>

        <Arrow x1={103} y1={55} x2={30} y2={55} />
        <Arrow x1={239} y1={55} x2={190} y2={55} />
        <Arrow x1={375} y1={55} x2={326} y2={55} />
        <Arrow x1={188} y1={110} x2={226} y2={110} />
        <Arrow x1={324} y1={110} x2={362} y2={110} />
        <Arrow x1={460} y1={110} x2={520} y2={110} />
      </svg>
    </Container>
  );
}

export function ReversalDiagram() {
  return (
    <Container
      title="LINKED LIST REVERSAL"
      footer={[
        'each node.nxt is flipped to point to the previous node',
        'the old tail becomes the new head',
      ]}
    >
      <svg viewBox="0 0 520 275" className="w-full max-w-lg">
        {arrowDefs}
        <MutedText x={15} y={25} fontSize={14} fontFamily="sans-serif" fontWeight="bold">Before:</MutedText>
        <text x={38} y={52} textAnchor="middle" fill="#22c55e" fontSize={13} fontFamily="monospace" fontWeight="bold">head</text>
        <line x1={38} y1={55} x2={38} y2={78} stroke="#22c55e" strokeWidth={1.5} markerEnd="url(#arr-green)" />
        <NodeBox x={10} y={85} val="1" />
        <Arrow x1={88} y1={107} x2={118} y2={107} />
        <NodeBox x={120} y={85} val="2" />
        <Arrow x1={198} y1={107} x2={228} y2={107} />
        <NodeBox x={230} y={85} val="3" />
        <text x={269} y={52} textAnchor="middle" fill="#22c55e" fontSize={13} fontFamily="monospace" fontWeight="bold">tail</text>
        <line x1={269} y1={55} x2={269} y2={78} stroke="#22c55e" strokeWidth={1.5} markerEnd="url(#arr-green)" />
        <Arrow x1={308} y1={107} x2={338} y2={107} />
        <NullLabel x={370} y={112} />

        <MutedText x={15} y={160} fontSize={14} fontFamily="sans-serif" fontWeight="bold">After:</MutedText>
        <text x={38} y={187} textAnchor="middle" fill="#22c55e" fontSize={13} fontFamily="monospace" fontWeight="bold">head</text>
        <line x1={38} y1={190} x2={38} y2={213} stroke="#22c55e" strokeWidth={1.5} markerEnd="url(#arr-green)" />
        <NodeBox x={10} y={220} val="3" />
        <Arrow x1={88} y1={242} x2={118} y2={242} />
        <NodeBox x={120} y={220} val="2" />
        <Arrow x1={198} y1={242} x2={228} y2={242} />
        <NodeBox x={230} y={220} val="1" />
        <text x={269} y={187} textAnchor="middle" fill="#22c55e" fontSize={13} fontFamily="monospace" fontWeight="bold">tail</text>
        <line x1={269} y1={190} x2={269} y2={213} stroke="#22c55e" strokeWidth={1.5} markerEnd="url(#arr-green)" />
        <Arrow x1={308} y1={242} x2={338} y2={242} />
        <NullLabel x={370} y={247} />
      </svg>
    </Container>
  );
}

export function FastSlowDiagram() {
  const nodeW = 42, gap = 18;
  const xs = [0, 1, 2, 3, 4].map(i => 35 + i * (nodeW + gap));
  const rowY = [34, 102, 170];
  const rows = [
    { step: 'Step 1', slow: 1, fast: 1, label: 'slow=1, fast=1' },
    { step: 'Step 2', slow: 2, fast: 3, label: 'slow=2, fast=3' },
    { step: 'Step 3', slow: 3, fast: 5, label: 'slow=3, fast=5' },
  ];
  return (
    <Container
      title="FAST & SLOW POINTER: FIND MIDDLE"
      footer={[
        'slow moves 1 node per iteration, fast moves 2 nodes',
        'when fast reaches the end, slow is at the middle node',
      ]}
    >
      <svg viewBox="0 0 520 236" className="w-full max-w-lg">
        {arrowDefs}
        {rows.map((r, ri) => {
          const y = rowY[ri];
          return (
            <g key={ri}>
              <MutedText x={5} y={y + 16} fontSize={13} fontFamily="sans-serif" fontWeight="bold">{r.step}</MutedText>

              {xs.map((x, ni) => {
                const num = ni + 1;
                const isSlow = num === r.slow;
                const isFast = num === r.fast;
                const color = isFast ? '#22c55e' : isSlow ? '#06b6d4' : '#4f46e5';
                return (
                  <g key={ni}>
                    <rect x={x} y={y + 22} width={nodeW} height={28} rx={4} fill="#1e1b4b" stroke={color} strokeWidth={1.5} />
                    <text x={x + nodeW / 2} y={y + 40} textAnchor="middle" fill="white" fontSize={12} fontFamily="monospace">{num}</text>
                  </g>
                );
              })}

              {xs.slice(0, -1).map((x, i) => (
                <Arrow key={i} x1={x + nodeW} y1={y + 36} x2={xs[i + 1] - 4} y2={y + 36} />
              ))}

              <Arrow x1={xs[4] + nodeW} y1={y + 36} x2={xs[4] + nodeW + 28} y2={y + 36} />
              <NullLabel x={xs[4] + nodeW + 40} y={y + 41} />

              <MutedText x={38 + 5 * (nodeW + gap) + 10} y={y + 16} fontSize={11} fontFamily="monospace">{r.label}</MutedText>
            </g>
          );
        })}
      </svg>
    </Container>
  );
}

export function CycleDiagram() {
  return (
    <Container
      title="FAST & SLOW POINTER: CYCLE DETECTION"
      footer={[
        'Floyd\'s algorithm: slow and fast pointers start at head',
        'if slow and fast meet, a cycle exists — no null terminator',
      ]}
    >
      <svg viewBox="0 0 480 200" className="w-full max-w-md">
        {arrowDefs}
        <text x={49} y={52} textAnchor="middle" fill="#22c55e" fontSize={13} fontFamily="monospace" fontWeight="bold">head</text>
        <line x1={49} y1={55} x2={49} y2={78} stroke="#22c55e" strokeWidth={1.5} markerEnd="url(#arr-green)" />
        <NodeBox x={10} y={85} val="1" />
        <Arrow x1={88} y1={107} x2={118} y2={107} />
        <NodeBox x={120} y={85} val="2" />
        <Arrow x1={198} y1={107} x2={228} y2={107} />
        <NodeBox x={230} y={85} val="3" />
        <Arrow x1={308} y1={107} x2={338} y2={107} />
        <NodeBox x={340} y={85} val="4" />
        <path d="M 378 95 C 440 25, 200 25, 159 85" fill="none" stroke="#64748b" strokeWidth={1.5} markerEnd="url(#arr)" strokeDasharray="5 3" />
        <text x={295} y={28} textAnchor="middle" fill="#06b6d4" fontSize={12} fontFamily="monospace">cycle: 4 → 2</text>
      </svg>
    </Container>
  );
}


