import type { Topic } from '../types';

export const topic: Topic = {
  id: 'graphs',
  title: 'Graphs',
  icon: 'Share2',
  order: 10,
  description: 'Connections and relationships. BFS for shortest paths, DFS for connectivity, and topological sort for dependencies.',
  difficulty: 'advanced',
  prerequisites: ['big-o', 'arrays-strings', 'stacks-queues', 'trees'],
  theory: [
    {
      id: 'graph-representation',
      title: 'Graph Representation',
      content: `A graph consists of **vertices (nodes)** and **edges** connecting them. Graphs can be **directed** or **undirected**, **weighted** or **unweighted**.

**Representations:**

| Approach | Space | Check edge | Iterate neighbors |
|---|---|---|---|
| Adjacency Matrix | O(V²) | O(1) | O(V) |
| Adjacency List | O(V + E) | O(degree) | O(degree) |
| Edge List | O(E) | O(E) | O(E) |

**Adjacency list** is the most common choice for interviews.`,
      codeExamples: [
        {
          title: 'Building a graph (adjacency list)',
          code: `// Graph as adjacency list
var graph = new Dictionary<int, List<int>>();

// Build from edges
void BuildGraph(int[][] edges) {
    foreach (var e in edges) {
        int u = e[0], v = e[1];
        if (!graph.ContainsKey(u)) graph[u] = new List<int>();
        if (!graph.ContainsKey(v)) graph[v] = new List<int>();
        graph[u].Add(v);
        graph[v].Add(u); // undirected — add both directions
    }
}

// Graph represented as List<int>[] (if vertices are 0..n-1)
int n = 6;
var graph2 = new List<int>[n];
for (int i = 0; i < n; i++) graph2[i] = new List<int>();

// Each edge: graph2[u].Add(v); graph2[v].Add(u);

// Weighted graph
var weighted = new Dictionary<int, List<(int neighbor, int weight)>>();
weighted[u].Add((v, 5));`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'bfs-dfs',
      title: 'BFS vs DFS',
      content: `| | BFS (Queue) | DFS (Stack/Recursion) |
|---|---|---|
| Order | Level by level | Deep first |
| Shortest path | Yes (unweighted) | No |
| Space | O(width) | O(depth) |
| Use case | Shortest path, level order | Topological, connectivity, cycles |

**Key difference:** BFS uses a queue and explores neighbors level by level. DFS uses a stack (or recursion) and goes deep before backtracking.`,
      codeExamples: [
        {
          title: 'BFS and DFS templates',
          code: `// BFS — shortest path in unweighted graph
int Bfs(Dictionary<int, List<int>> graph, int start, int target) {
    var q = new Queue<int>();
    var visited = new HashSet<int>();
    q.Enqueue(start);
    visited.Add(start);
    int distance = 0;

    while (q.Count > 0) {
        int size = q.Count;
        for (int i = 0; i < size; i++) {
            int node = q.Dequeue();
            if (node == target) return distance;

            foreach (var neighbor in graph.GetValueOrDefault(node, [])) {
                if (visited.Add(neighbor))
                    q.Enqueue(neighbor);
            }
        }
        distance++;
    }
    return -1; // not reachable
}

// DFS — recursive (for connectivity, cycle detection)
bool Dfs(Dictionary<int, List<int>> graph, int node, HashSet<int> visited) {
    if (visited.Contains(node)) return false;
    visited.Add(node);

    foreach (var neighbor in graph.GetValueOrDefault(node, []))
        Dfs(graph, neighbor, visited);

    return true;
}`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'topological-sort',
      title: 'Topological Sort',
      content: `A **topological order** of a directed acyclic graph (DAG) is an ordering where every edge goes from earlier to later nodes.

**Applications:** Course prerequisites, build dependencies, task scheduling.

Two algorithms:
1. **Kahn's algorithm (BFS)** — track in-degrees, process nodes with 0 in-degree
2. **DFS-based** — post-order traversal, reverse the result`,
      codeExamples: [
        {
          title: 'Kahn\'s algorithm (BFS)',
          code: `int[] TopologicalSort(int n, int[][] edges) {
    var graph = new List<int>[n];
    var inDegree = new int[n];
    for (int i = 0; i < n; i++) graph[i] = new List<int>();

    foreach (var e in edges) {
        graph[e[0]].Add(e[1]);
        inDegree[e[1]]++;
    }

    var q = new Queue<int>();
    for (int i = 0; i < n; i++)
        if (inDegree[i] == 0) q.Enqueue(i);

    var result = new List<int>();
    while (q.Count > 0) {
        int node = q.Dequeue();
        result.Add(node);

        foreach (var neighbor in graph[node]) {
            if (--inDegree[neighbor] == 0)
                q.Enqueue(neighbor);
        }
    }

    return result.Count == n ? result.ToArray() : []; // [] if cycle
}`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Number of islands / connected components** — DFS or BFS on grid
2. **Course schedule / prerequisite order** — topological sort
3. **Clone graph** — BFS/DFS with hash map to track cloned nodes
4. **Word ladder** — BFS shortest path on implicit graph
5. **Detect cycle** — DFS with recursion stack tracking (3-coloring: unvisited, in-stack, done)
6. **Dijkstra's shortest path** — PriorityQueue for weighted graphs`,
    },
  ],
  problemIds: ['number-of-islands', 'clone-graph', 'course-schedule', 'rotting-oranges', 'word-ladder'],
};
