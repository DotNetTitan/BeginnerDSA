export interface GNode {
  id: number;
  x: number;
  y: number;
}

export interface GEdge {
  from: number;
  to: number;
}

export interface GraphStep {
  visited: number[];
  current: number | null;
  frontier: number[];
  frontLabel: string;
  description: string;
}

const NODES: GNode[] = [
  { id: 0, x: 100, y: 60 },
  { id: 1, x: 260, y: 60 },
  { id: 2, x: 100, y: 180 },
  { id: 3, x: 260, y: 180 },
  { id: 4, x: 400, y: 180 },
  { id: 5, x: 260, y: 300 },
];

const EDGES: GEdge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 3, to: 5 },
];

const ADJ: Record<number, number[]> = { 0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2, 4, 5], 4: [3], 5: [3] };

function step(
  visited: number[],
  current: number | null,
  frontier: number[],
  frontLabel: string,
  desc: string,
): GraphStep {
  return { visited: [...visited], current, frontier: [...frontier], frontLabel, description: desc };
}

export function generateBfsSteps(start = 0): GraphStep[] {
  const visited: number[] = [];
  const queue: number[] = [start];
  const steps: GraphStep[] = [];

  steps.push(step(visited, null, queue, 'queue', `Initialize queue with ${start}`));

  while (queue.length > 0) {
    const node = queue.shift()!;
    visited.push(node);
    steps.push(step(visited, node, queue, 'queue', `Dequeue ${node} → visit it`));

    for (const nb of ADJ[node]) {
      if (!visited.includes(nb) && !queue.includes(nb)) {
        queue.push(nb);
        steps.push(step(visited, node, queue, 'queue', `Discover ${nb}, enqueue it`));
      }
    }
  }

  return steps;
}

export function generateDfsSteps(start = 0): GraphStep[] {
  const visited: number[] = [];
  const stack: number[] = [start];
  const steps: GraphStep[] = [];

  steps.push(step(visited, null, stack, 'stack', `Initialize stack with ${start}`));

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (visited.includes(node)) continue;
    visited.push(node);
    steps.push(step(visited, node, stack, 'stack', `Pop ${node} → visit it`));

    for (const nb of [...ADJ[node]].reverse()) {
      if (!visited.includes(nb) && !stack.includes(nb)) {
        stack.push(nb);
        steps.push(step(visited, node, stack, 'stack', `Push ${nb} onto stack`));
      }
    }
  }

  return steps;
}

export function getGraphData() {
  return { nodes: NODES, edges: EDGES };
}
