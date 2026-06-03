export interface TreeNode {
  id: number;
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface NodePosition {
  id: number;
  val: number;
  x: number;
  y: number;
  left: number | null;
  right: number | null;
}

export interface TreeStep {
  positions: NodePosition[];
  currentNode: number | null;
  visited: number[];
  result: number[];
  highlighted: ('default' | 'current' | 'visited')[];
  description: string;
}

function buildBST(values: number[]): TreeNode | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  function build(arr: number[]): TreeNode | null {
    if (arr.length === 0) return null;
    const mid = Math.floor(arr.length / 2);
    return {
      id: arr[mid],
      val: arr[mid],
      left: build(arr.slice(0, mid)),
      right: build(arr.slice(mid + 1)),
    };
  }
  return build(sorted);
}

function computePositions(root: TreeNode): NodePosition[] {
  const positions: NodePosition[] = [];
  function traverse(node: TreeNode, x: number, y: number, spread: number): void {
    const leftId = node.left ? node.left.id : null;
    const rightId = node.right ? node.right.id : null;
    positions.push({ id: node.id, val: node.val, x, y, left: leftId, right: rightId });
    if (node.left) traverse(node.left, x - spread, y + 70, spread / 2);
    if (node.right) traverse(node.right, x + spread, y + 70, spread / 2);
  }
  traverse(root, 200, 40, 100);
  return positions;
}

export type TraversalType = 'inorder' | 'preorder' | 'postorder' | 'levelorder';

export function generateTraversalSteps(type: TraversalType): TreeStep[] {
  const treeValues = [20, 10, 30, 5, 15, 25, 35];
  const root = buildBST(treeValues);
  if (!root) return [];
  const positions = computePositions(root);
  const steps: TreeStep[] = [];

  function addStep(nodeId: number | null, visited: number[], result: number[], desc: string): void {
    const states = positions.map(p => {
      if (visited.includes(p.id)) return 'visited' as const;
      return 'default' as const;
    });
    steps.push({ positions, currentNode: nodeId, visited: [...visited], result: [...result], highlighted: states, description: desc });
  }

  function* inorder(n: TreeNode | null, visited: number[], result: number[]): Generator<void> {
    if (!n) return;
    yield* inorder(n.left, visited, result);
    visited.push(n.id);
    result.push(n.val);
    addStep(n.id, visited, result, `Visiting ${n.val}`);
    yield;
    yield* inorder(n.right, visited, result);
  }

  function* preorder(n: TreeNode | null, visited: number[], result: number[]): Generator<void> {
    if (!n) return;
    visited.push(n.id);
    result.push(n.val);
    addStep(n.id, visited, result, `Visiting ${n.val}`);
    yield;
    yield* preorder(n.left, visited, result);
    yield* preorder(n.right, visited, result);
  }

  function* postorder(n: TreeNode | null, visited: number[], result: number[]): Generator<void> {
    if (!n) return;
    yield* postorder(n.left, visited, result);
    yield* postorder(n.right, visited, result);
    visited.push(n.id);
    result.push(n.val);
    addStep(n.id, visited, result, `Visiting ${n.val}`);
    yield;
  }

  function* levelorder(root: TreeNode, visited: number[], result: number[]): Generator<void> {
    const queue: TreeNode[] = [root];
    while (queue.length > 0) {
      const node = queue.shift()!;
      visited.push(node.id);
      result.push(node.val);
      addStep(node.id, visited, result, `Visiting ${node.val}`);
      yield;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  const visited: number[] = [];
  const result: number[] = [];

  switch (type) {
    case 'inorder': {
      const gen = inorder(root, visited, result);
      while (!gen.next().done) { /* collect steps */ }
      break;
    }
    case 'preorder': {
      const gen = preorder(root, visited, result);
      while (!gen.next().done) { /* collect steps */ }
      break;
    }
    case 'postorder': {
      const gen = postorder(root, visited, result);
      while (!gen.next().done) { /* collect steps */ }
      break;
    }
    case 'levelorder': {
      const gen = levelorder(root, visited, result);
      while (!gen.next().done) { /* collect steps */ }
      break;
    }
  }

  addStep(null, visited, result, 'Traversal complete!');
  return steps;
}

export function getTraversalDescription(type: TraversalType): string {
  switch (type) {
    case 'inorder': return 'Inorder: left → root → right';
    case 'preorder': return 'Preorder: root → left → right';
    case 'postorder': return 'Postorder: left → right → root';
    case 'levelorder': return 'Level Order: BFS by level';
  }
}
