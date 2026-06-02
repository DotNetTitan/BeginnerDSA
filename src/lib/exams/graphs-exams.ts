import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'graph-1',
    question: 'What data structure is typically used for BFS (Breadth-First Search)?',
    options: [
      'Stack — LIFO order',
      'Queue — FIFO order',
      'Priority queue — ordered by distance',
      'Array — indexed by node ID',
    ],
    correctIndex: 1,
    explanation: 'BFS uses a queue. Nodes are visited in order of increasing distance from the source, so the first discovered nodes are processed first (FIFO).',
  },
  {
    id: 'graph-2',
    question: 'What data structure is typically used for DFS (Depth-First Search)?',
    options: [
      'Queue — FIFO order',
      'Stack — LIFO order (explicitly or via recursion)',
      'Heap — ordered by depth',
      'Hash set — for visited tracking only',
    ],
    correctIndex: 1,
    explanation: 'DFS uses a stack (explicit or the call stack via recursion). It explores as far as possible along a branch before backtracking.',
  },
  {
    id: 'graph-3',
    question: 'What is the time complexity of DFS or BFS on a graph with V vertices and E edges?',
    options: [
      'O(V) — each vertex visited once',
      'O(E) — each edge examined once',
      'O(V + E) — visit all vertices and examine all edges',
      'O(V × E) — for each vertex, examine all edges',
    ],
    correctIndex: 2,
    explanation: 'Both BFS and DFS have O(V + E) time complexity when using an adjacency list. Each vertex is visited once, and each edge is examined once (from both endpoints in undirected graphs).',
  },
  {
    id: 'graph-4',
    question: 'Which algorithm finds the shortest path in a weighted graph with non-negative edge weights?',
    options: [
      'BFS',
      'Dijkstra\'s algorithm',
      'DFS',
      'Bellman-Ford algorithm',
    ],
    correctIndex: 1,
    explanation: 'Dijkstra\'s algorithm finds shortest paths in O((V+E) log V) using a priority queue. BFS works only for unweighted graphs. Bellman-Ford handles negative weights but is slower.',
  },
  {
    id: 'graph-5',
    question: 'What is the difference between an adjacency matrix and an adjacency list for representing a graph?',
    options: [
      'Matrix uses O(V²) memory but O(1) edge lookup; List uses O(V+E) memory but O(degree) edge lookup',
      'Matrix uses O(V+E) memory; List uses O(V²) memory',
      'Matrix is only for directed graphs; List is only for undirected',
      'There is no practical difference',
    ],
    correctIndex: 0,
    explanation: 'Adjacency matrix: O(V²) space, O(1) edge existence check. Adjacency list: O(V+E) space, but checking edge existence requires scanning the neighbor list (O(degree)).',
  },
];
