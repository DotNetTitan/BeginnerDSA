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
          code: {
            csharp: `// Graph as adjacency list
var graph = new Dictionary<int, List<int>>();

// Build from edges
void BuildGraph(int[][] edges) {
    foreach (var e in edges) {
        int u = e[0], v = e[1];
        if (!graph.ContainsKey(u)) graph[u] = new List<int>();
        if (!graph.ContainsKey(v)) graph[v] = new List<int>();
        graph[u].Add(v);
        graph[v].Add(u); // undirected - add both directions
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
            python: `# Graph as adjacency list
graph = {}

# Build from edges
def build_graph(edges):
    for u, v in edges:
        if u not in graph:
            graph[u] = []
        if v not in graph:
            graph[v] = []
        graph[u].append(v)
        graph[v].append(u)  # undirected - add both directions

# Graph represented as list of lists (if vertices are 0..n-1)
n = 6
graph2 = [[] for _ in range(n)]

# Each edge: graph2[u].append(v); graph2[v].append(u)

# Weighted graph
weighted = {}`,
            java: `import java.util.*;

// Graph as adjacency list
Map<Integer, List<Integer>> graph = new HashMap<>();

// Build from edges
public void buildGraph(int[][] edges) {
    for (int[] e : edges) {
        int u = e[0], v = e[1];
        graph.putIfAbsent(u, new ArrayList<>());
        graph.putIfAbsent(v, new ArrayList<>());
        graph.get(u).add(v);
        graph.get(v).add(u); // undirected - add both directions
    }
}

// Graph represented as List<Integer>[] (if vertices are 0..n-1)
int n = 6;
List<Integer>[] graph2 = new List[n];
for (int i = 0; i < n; i++) graph2[i] = new ArrayList<>();

// Each edge: graph2[u].add(v); graph2[v].add(u);

// Weighted graph
Map<Integer, List<int[]>> weighted = new HashMap<>();
// weighted.get(u).add(new int[]{v, 5});`,
            javascript: `// Graph as adjacency list
const graph = new Map();

// Build from edges
const buildGraph = (edges) => {
    for (const [u, v] of edges) {
        if (!graph.has(u)) graph.set(u, []);
        if (!graph.has(v)) graph.set(v, []);
        graph.get(u).push(v);
        graph.get(v).push(u); // undirected - add both directions
    }
};

// Graph as array of arrays (if vertices are 0..n-1)
const n = 6;
const graph2 = Array.from({ length: n }, () => []);

// Each edge: graph2[u].push(v); graph2[v].push(u);

// Weighted graph
const weighted = new Map();`,
          cpp: `#include <unordered_map>
#include <vector>

// Graph as adjacency list
std::unordered_map<int, std::vector<int>> graph;

// Build from edges
void buildGraph(std::vector<std::vector<int>>& edges) {
    for (auto& e : edges) {
        int u = e[0], v = e[1];
        graph[u].push_back(v);
        graph[v].push_back(u); // undirected - add both directions
    }
}

// Graph as vector of vectors (if vertices are 0..n-1)
int n = 6;
std::vector<std::vector<int>> graph2(n);

// Each edge: graph2[u].push_back(v); graph2[v].push_back(u);

// Weighted graph
std::unordered_map<int, std::vector<std::pair<int, int>>> weighted;
// weighted[u].push_back({v, 5});`,
          },
        },
      ],
    },
    {
      id: 'bfs-dfs',
      title: 'BFS vs DFS',
      component: 'graph-traversal-viz',
      vizLabel: 'Explore all nodes of this graph starting from node A, visiting each node exactly once.',
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
          code: {
            csharp: `// BFS - shortest path in unweighted graph
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

// DFS - recursive (for connectivity, cycle detection)
bool Dfs(Dictionary<int, List<int>> graph, int node, HashSet<int> visited) {
    if (visited.Contains(node)) return false;
    visited.Add(node);

    foreach (var neighbor in graph.GetValueOrDefault(node, []))
        Dfs(graph, neighbor, visited);

    return true;
}`,
            python: `from collections import deque

# BFS - shortest path in unweighted graph
def bfs(graph, start, target):
    q = deque([start])
    visited = {start}
    distance = 0

    while q:
        for _ in range(len(q)):
            node = q.popleft()
            if node == target:
                return distance

            for neighbor in graph.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    q.append(neighbor)
        distance += 1
    return -1  # not reachable

# DFS - recursive (for connectivity, cycle detection)
def dfs(graph, node, visited):
    if node in visited:
        return False
    visited.add(node)

    for neighbor in graph.get(node, []):
        dfs(graph, neighbor, visited)

    return True`,
            java: `import java.util.*;

// BFS - shortest path in unweighted graph
public int bfs(Map<Integer, List<Integer>> graph, int start, int target) {
    Queue<Integer> q = new LinkedList<>();
    Set<Integer> visited = new HashSet<>();
    q.offer(start);
    visited.add(start);
    int distance = 0;

    while (!q.isEmpty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            int node = q.poll();
            if (node == target) return distance;

            for (int neighbor : graph.getOrDefault(node, Collections.emptyList())) {
                if (visited.add(neighbor))
                    q.offer(neighbor);
            }
        }
        distance++;
    }
    return -1; // not reachable
}

// DFS - recursive (for connectivity, cycle detection)
public boolean dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited) {
    if (visited.contains(node)) return false;
    visited.add(node);

    for (int neighbor : graph.getOrDefault(node, Collections.emptyList()))
        dfs(graph, neighbor, visited);

    return true;
}`,
            javascript: `// BFS - shortest path in unweighted graph
const bfs = (graph, start, target) => {
    const q = [start];
    const visited = new Set([start]);
    let distance = 0;

    while (q.length > 0) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const node = q.shift();
            if (node === target) return distance;

            for (const neighbor of (graph.get(node) || [])) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    q.push(neighbor);
                }
            }
        }
        distance++;
    }
    return -1; // not reachable
};

// DFS - recursive (for connectivity, cycle detection)
const dfs = (graph, node, visited = new Set()) => {
    if (visited.has(node)) return false;
    visited.add(node);

    for (const neighbor of (graph.get(node) || []))
        dfs(graph, neighbor, visited);

    return true;
};`,
          cpp: `#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <vector>

// BFS - shortest path in unweighted graph
int bfs(std::unordered_map<int, std::vector<int>>& graph, int start, int target) {
    std::queue<int> q;
    std::unordered_set<int> visited;
    q.push(start);
    visited.insert(start);
    int distance = 0;

    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            int node = q.front();
            q.pop();
            if (node == target) return distance;

            for (int neighbor : graph[node]) {
                if (visited.insert(neighbor).second)
                    q.push(neighbor);
            }
        }
        distance++;
    }
    return -1; // not reachable
}

// DFS - recursive (for connectivity, cycle detection)
void dfs(std::unordered_map<int, std::vector<int>>& graph, int node, std::unordered_set<int>& visited) {
    if (visited.count(node)) return;
    visited.insert(node);

    for (int neighbor : graph[node])
        dfs(graph, neighbor, visited);
}`,
          },
        },
      ],
    },
    {
      id: 'topological-sort',
      title: 'Topological Sort',
      content: `A **topological order** of a directed acyclic graph (DAG) is an ordering where every edge goes from earlier to later nodes.

**Applications:** Course prerequisites, build dependencies, task scheduling.

Two algorithms:
1. **Kahn's algorithm (BFS)** - track in-degrees, process nodes with 0 in-degree
2. **DFS-based** - post-order traversal, reverse the result`,
      codeExamples: [
        {
          title: 'Kahn\'s algorithm (BFS)',
          code: {
            csharp: `int[] TopologicalSort(int n, int[][] edges) {
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
            python: `from collections import deque

def topological_sort(n, edges):
    graph = [[] for _ in range(n)]
    in_degree = [0] * n

    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1

    q = deque()
    for i in range(n):
        if in_degree[i] == 0:
            q.append(i)

    result = []
    while q:
        node = q.popleft()
        result.append(node)

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                q.append(neighbor)

    return result if len(result) == n else []  # [] if cycle`,
            java: `import java.util.*;

public int[] topologicalSort(int n, int[][] edges) {
    List<Integer>[] graph = new List[n];
    int[] inDegree = new int[n];
    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();

    for (int[] e : edges) {
        graph[e[0]].add(e[1]);
        inDegree[e[1]]++;
    }

    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < n; i++)
        if (inDegree[i] == 0) q.offer(i);

    List<Integer> result = new ArrayList<>();
    while (!q.isEmpty()) {
        int node = q.poll();
        result.add(node);

        for (int neighbor : graph[node]) {
            if (--inDegree[neighbor] == 0)
                q.offer(neighbor);
        }
    }

    return result.size() == n
        ? result.stream().mapToInt(i -> i).toArray()
        : new int[0]; // [] if cycle
}`,
            javascript: `const topologicalSort = (n, edges) => {
    const graph = Array.from({ length: n }, () => []);
    const inDegree = new Array(n).fill(0);

    for (const [u, v] of edges) {
        graph[u].push(v);
        inDegree[v]++;
    }

    const q = [];
    for (let i = 0; i < n; i++)
        if (inDegree[i] === 0) q.push(i);

    const result = [];
    while (q.length > 0) {
        const node = q.shift();
        result.push(node);

        for (const neighbor of graph[node]) {
            if (--inDegree[neighbor] === 0)
                q.push(neighbor);
        }
    }

    return result.length === n ? result : []; // [] if cycle
};`,
          cpp: `#include <vector>
#include <queue>

std::vector<int> topologicalSort(int n, std::vector<std::vector<int>>& edges) {
    std::vector<std::vector<int>> graph(n);
    std::vector<int> inDegree(n, 0);

    for (auto& e : edges) {
        graph[e[0]].push_back(e[1]);
        inDegree[e[1]]++;
    }

    std::queue<int> q;
    for (int i = 0; i < n; i++)
        if (inDegree[i] == 0) q.push(i);

    std::vector<int> result;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        result.push_back(node);

        for (int neighbor : graph[node]) {
            if (--inDegree[neighbor] == 0)
                q.push(neighbor);
        }
    }

    return result.size() == n ? result : std::vector<int>(); // empty if cycle
}`,
          },
        },
      ],
    },
    {
      id: 'when-to-use-graphs',
      title: 'When to Model as a Graph',
      content: `**A graph is the right abstraction when:**
- You have **entities** (nodes) and **relationships** (edges) between them
- The relationships are **not hierarchical** (use a tree if they are)
- You need to find **paths, connectivity, or shortest distances**

**Graph vs other structures:**
| Structure | Use when |
|---|---|
| Tree | Strict hierarchy (one parent per node) |
| Graph | Arbitrary connections (many-to-many) |
| Adjacency list | Most interview problems (space-efficient) |
| Adjacency matrix | Dense graph, need O(1) edge check |

**BFS vs DFS decision guide:**
| Signal | Choice |
|---|---|
| "Shortest path in unweighted graph" | BFS (queue) |
| "Does a path exist?" | Either |
| "Topological order" | BFS (Kahn's) or DFS |
| "Detect cycle" | DFS with recursion stack |
| "Connected components" | Either (DFS is simpler) |
| "All paths from A to B" | DFS (backtracking) |
| "Level order / layers" | BFS |
| "Maze shortest path" | BFS |
| "Maze find any exit" | DFS (simpler) |

**When NOT to use a graph:**
- Only one entity type with no relationships (just use a list)
- Relationships are simple and linear (use an array or tree)
- Problem can be solved with a hash map and iteration`,
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes / Gotchas',
      content: `**Forgetting the visited set (infinite loop):** Without tracking visited nodes, BFS/DFS will revisit nodes and loop forever in a cyclic graph. Always initialize a visited set before traversal and check it before enqueuing/exploring.

**Confusing directed and undirected graphs:** In an undirected graph, add both directions: \`graph[u].Add(v)\` AND \`graph[v].Add(u)\`. In a directed graph, only add one direction. Missing this causes wrong answers.

**"BFS always finds the shortest path":** Only for unweighted graphs. In weighted graphs, BFS does NOT find the shortest path - use Dijkstra's algorithm instead.

**DFS recursion depth in large graphs:** A DFS on a graph with 100,000 nodes might recurse 100,000 levels deep. Stack overflow! Use explicit stack (iterative DFS) for large graphs.

**Confusing BFS and DFS approaches:** BFS = queue (level by level). DFS = stack/recursion (depth first). Using the wrong one wastes time or gives wrong answers. For shortest path in an unweighted graph, always choose BFS.

**Not handling disconnected components:** Most graph problems assume a connected graph. If the graph has multiple components, make sure your traversal covers ALL nodes by looping over all vertices and starting a new traversal for any unvisited node.`,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Number of islands / connected components** - DFS or BFS on grid
2. **Course schedule / prerequisite order** - topological sort
3. **Clone graph** - BFS/DFS with hash map to track cloned nodes
4. **Word ladder** - BFS shortest path on implicit graph
5. **Detect cycle** - DFS with recursion stack tracking (3-coloring: unvisited, in-stack, done)
6. **Dijkstra's shortest path** - PriorityQueue for weighted graphs`,
    },
  ],
  problemIds: ['number-of-islands', 'clone-graph', 'course-schedule', 'rotting-oranges', 'word-ladder'],
};
