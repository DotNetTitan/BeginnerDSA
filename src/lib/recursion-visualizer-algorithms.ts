export interface RecursionFrame {
  n: number;
  status: 'active' | 'done' | 'waiting';
  result: string | null;
  expression: string;
}

export interface RecursionStep {
  frames: RecursionFrame[];
  description: string;
}

function buildFrames(
  activeN: number,
  done: Map<number, number>,
): RecursionFrame[] {
  const frames: RecursionFrame[] = [];
  for (let n = 5; n >= 1; n--) {
    if (done.has(n)) {
      const r = done.get(n)!;
      frames.push({
        n,
        status: 'done',
        result: String(r),
        expression: n === 1 ? 'base case → 1' : `${n} × ${r / n} = ${r}`,
      });
    } else if (n === activeN) {
      frames.push({
        n,
        status: 'active',
        result: null,
        expression: n === 1 ? 'base case' : `${n} × factorial(${n - 1})`,
      });
    } else {
      frames.push({
        n,
        status: 'waiting',
        result: '?',
        expression: n === 1 ? 'base case → 1' : `${n} × ?`,
      });
    }
  }
  return frames;
}

export function generateFactorialSteps(): RecursionStep[] {
  const steps: RecursionStep[] = [];
  const done = new Map<number, number>();

  steps.push({
    frames: [{ n: 5, status: 'active', result: null, expression: '5 × factorial(4)' }],
    description: 'Call factorial(5) - stack frame pushed',
  });

  steps.push({
    frames: [
      { n: 5, status: 'waiting', result: '?', expression: '5 × ?' },
      { n: 4, status: 'active', result: null, expression: '4 × factorial(3)' },
    ],
    description: 'Call factorial(4) - stack frame pushed',
  });

  steps.push({
    frames: [
      { n: 5, status: 'waiting', result: '?', expression: '5 × ?' },
      { n: 4, status: 'waiting', result: '?', expression: '4 × ?' },
      { n: 3, status: 'active', result: null, expression: '3 × factorial(2)' },
    ],
    description: 'Call factorial(3) - stack frame pushed',
  });

  steps.push({
    frames: [
      { n: 5, status: 'waiting', result: '?', expression: '5 × ?' },
      { n: 4, status: 'waiting', result: '?', expression: '4 × ?' },
      { n: 3, status: 'waiting', result: '?', expression: '3 × ?' },
      { n: 2, status: 'active', result: null, expression: '2 × factorial(1)' },
    ],
    description: 'Call factorial(2) - stack frame pushed',
  });

  steps.push({
    frames: [
      { n: 5, status: 'waiting', result: '?', expression: '5 × ?' },
      { n: 4, status: 'waiting', result: '?', expression: '4 × ?' },
      { n: 3, status: 'waiting', result: '?', expression: '3 × ?' },
      { n: 2, status: 'waiting', result: '?', expression: '2 × ?' },
      { n: 1, status: 'active', result: null, expression: 'base case' },
    ],
    description: 'Call factorial(1) - base case reached!',
  });

  done.set(1, 1);
  steps.push({
    frames: buildFrames(-1, done),
    description: 'factorial(1) = 1 - return 1, result computed',
  });

  done.set(2, 2);
  steps.push({
    frames: buildFrames(-1, done),
    description: 'factorial(2) = 2 x 1 = 2 - return 2, result computed',
  });

  done.set(3, 6);
  steps.push({
    frames: buildFrames(-1, done),
    description: 'factorial(3) = 3 x 2 = 6 - return 6, result computed',
  });

  done.set(4, 24);
  steps.push({
    frames: buildFrames(-1, done),
    description: 'factorial(4) = 4 x 6 = 24 - return 24, result computed',
  });

  done.set(5, 120);
  steps.push({
    frames: buildFrames(-1, done),
    description: 'factorial(5) = 5 x 24 = 120 - return 120, done!',
  });

  return steps;
}
