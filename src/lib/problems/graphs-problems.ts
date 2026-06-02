import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    topicId: 'graphs',
    difficulty: 'medium',
    description: `Given an mÃ—n 2D binary grid '1' (land) and '0' (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' },
    ],
    constraints: ['m, n <= 300'],
    hints: ['Use DFS or BFS to traverse each island.', 'Mark visited cells as "0" to avoid revisiting.'],
    solution: {
      csharp: `public int NumIslands(char[][] grid) {
    int count = 0;
    for (int i = 0; i < grid.Length; i++)
        for (int j = 0; j < grid[0].Length; j++)
            if (grid[i][j] == '1') {
                count++;
                Dfs(grid, i, j);
            }
    return count;
}

void Dfs(char[][] grid, int i, int j) {
    if (i < 0 || i >= grid.Length || j < 0 || j >= grid[0].Length || grid[i][j] != '1')
        return;
    grid[i][j] = '0';
    Dfs(grid, i + 1, j);
    Dfs(grid, i - 1, j);
    Dfs(grid, i, j + 1);
    Dfs(grid, i, j - 1);
}`,
      python: `def num_islands(grid):
    def dfs(i, j):
        if (i < 0 or i >= len(grid) or
            j < 0 or j >= len(grid[0]) or
                grid[i][j] != "1"):
            return
        grid[i][j] = "0"
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)

    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == "1":
                count += 1
                dfs(i, j)
    return count
`,
      java: `public int numIslands(char[][] grid) {
    int count = 0;
    for (int i = 0; i < grid.length; i++)
        for (int j = 0; j < grid[0].length; j++)
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, i, j);
            }
    return count;
}

private void dfs(char[][] grid, int i, int j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] != '1')
        return;
    grid[i][j] = '0';
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
}`,
      javascript: `function numIslands(grid) {
    function dfs(i, j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] !== "1")
            return;
        grid[i][j] = "0";
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    let count = 0;
    for (let i = 0; i < grid.length; i++)
        for (let j = 0; j < grid[0].length; j++)
            if (grid[i][j] === "1") {
                count++;
                dfs(i, j);
            }
    return count;
}`,
      cpp: `#include <vector>

void dfs(std::vector<std::vector<char>>& grid, int i, int j) {
    if (i < 0 || i >= (int)grid.size() || j < 0 || j >= (int)grid[0].size() || grid[i][j] != '1')
        return;
    grid[i][j] = '0';
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
}

int numIslands(std::vector<std::vector<char>>& grid) {
    int count = 0;
    for (int i = 0; i < (int)grid.size(); i++)
        for (int j = 0; j < (int)grid[0].size(); j++)
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, i, j);
            }
    return count;
}`,
    },
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
  },
  {
    id: 'clone-graph',
    title: 'Clone Graph',
    topicId: 'graphs',
    difficulty: 'medium',
    description: `Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.`,
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]', explanation: 'The graph has 4 nodes.' },
    ],
    constraints: ['The number of nodes is in the range [0, 100].'],
    hints: ['Use a Dictionary<Node, Node> to map original to clone.', 'Use DFS or BFS.'],
    solution: {
      csharp: `public class Node {
    public int val;
    public IList<Node> neighbors;
    public Node(int _val, IList<Node> _neighbors = null) {
        val = _val;
        neighbors = _neighbors ?? new List<Node>();
    }
}

public Node CloneGraph(Node node) {
    if (node == null) return null;
    var map = new Dictionary<Node, Node>();
    return Clone(node);

    Node Clone(Node n) {
        if (map.ContainsKey(n)) return map[n];
        var copy = new Node(n.val);
        map[n] = copy;
        foreach (var neighbor in n.neighbors)
            copy.neighbors.Add(Clone(neighbor));
        return copy;
    }
}`,
      python: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def clone_graph(node):
    if node is None:
        return None
    mapping = {}

    def dfs(n):
        if n in mapping:
            return mapping[n]
        copy = Node(n.val)
        mapping[n] = copy
        for neighbor in n.neighbors:
            copy.neighbors.append(dfs(neighbor))
        return copy

    return dfs(node)
`,
      java: `public Node cloneGraph(Node node) {
    if (node == null) return null;
    Map<Node, Node> map = new HashMap<>();
    return clone(node, map);
}

private Node clone(Node n, Map<Node, Node> map) {
    if (map.containsKey(n)) return map.get(n);
    Node copy = new Node(n.val);
    map.put(n, copy);
    for (Node neighbor : n.neighbors)
        copy.neighbors.add(clone(neighbor, map));
    return copy;
}`,
      javascript: `function cloneGraph(node) {
    if (node === null) return null;
    const map = new Map();
    function dfs(n) {
        if (map.has(n)) return map.get(n);
        const copy = new Node(n.val);
        map.set(n, copy);
        for (const neighbor of n.neighbors)
            copy.neighbors.push(dfs(neighbor));
        return copy;
    }
    return dfs(node);
}`,
      cpp: `#include <vector>
#include <unordered_map>

class Node {
public:
    int val;
    std::vector<Node*> neighbors;
    Node(int _val) : val(_val) {}
};

Node* clone(Node* n, std::unordered_map<Node*, Node*>& map) {
    if (map.count(n)) return map[n];
    auto copy = new Node(n->val);
    map[n] = copy;
    for (auto neighbor : n->neighbors)
        copy->neighbors.push_back(clone(neighbor, map));
    return copy;
}

Node* cloneGraph(Node* node) {
    if (node == nullptr) return nullptr;
    std::unordered_map<Node*, Node*> map;
    return clone(node, map);
}`,
    },
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 'course-schedule',
    title: 'Course Schedule',
    topicId: 'graphs',
    difficulty: 'medium',
    description: `There are n courses labeled 0 to n-1. You are given prerequisites pairs [a, b] meaning you must take b before a. Determine if it's possible to finish all courses.`,
    examples: [
      { input: 'n = 2, prerequisites = [[1,0]]', output: 'true' },
      { input: 'n = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Cycle detected.' },
    ],
    constraints: ['1 <= n <= 2000'],
    hints: ['This is a cycle detection problem in a directed graph.', 'Use Kahn\'s algorithm (topological sort with BFS).'],
    solution: {
      csharp: `public bool CanFinish(int n, int[][] prerequisites) {
    var graph = new List<int>[n];
    var inDegree = new int[n];
    for (int i = 0; i < n; i++) graph[i] = new List<int>();

    foreach (var p in prerequisites) {
        graph[p[1]].Add(p[0]);
        inDegree[p[0]]++;
    }

    var q = new Queue<int>();
    for (int i = 0; i < n; i++)
        if (inDegree[i] == 0) q.Enqueue(i);

    int processed = 0;
    while (q.Count > 0) {
        int node = q.Dequeue();
        processed++;
        foreach (var neighbor in graph[node])
            if (--inDegree[neighbor] == 0)
                q.Enqueue(neighbor);
    }

    return processed == n;
}`,
      python: `from collections import deque

def can_finish(n, prerequisites):
    graph = [[] for _ in range(n)]
    in_degree = [0] * n
    for a, b in prerequisites:
        graph[b].append(a)
        in_degree[a] += 1
    q = deque([i for i in range(n) if in_degree[i] == 0])
    processed = 0
    while q:
        node = q.popleft()
        processed += 1
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                q.append(neighbor)
    return processed == n
`,
      java: `public boolean canFinish(int n, int[][] prerequisites) {
    List<Integer>[] graph = new List[n];
    int[] inDegree = new int[n];
    for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();
    for (int[] p : prerequisites) {
        graph[p[1]].add(p[0]);
        inDegree[p[0]]++;
    }
    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < n; i++)
        if (inDegree[i] == 0) q.offer(i);
    int processed = 0;
    while (!q.isEmpty()) {
        int node = q.poll();
        processed++;
        for (int neighbor : graph[node])
            if (--inDegree[neighbor] == 0)
                q.offer(neighbor);
    }
    return processed == n;
}`,
      javascript: `function canFinish(n, prerequisites) {
    const graph = Array.from({ length: n }, () => []);
    const inDegree = new Array(n).fill(0);
    for (const [a, b] of prerequisites) {
        graph[b].push(a);
        inDegree[a]++;
    }
    const q = [];
    for (let i = 0; i < n; i++)
        if (inDegree[i] === 0) q.push(i);
    let processed = 0;
    while (q.length > 0) {
        const node = q.shift();
        processed++;
        for (const neighbor of graph[node])
            if (--inDegree[neighbor] === 0)
                q.push(neighbor);
    }
    return processed === n;
}`,
      cpp: `#include <vector>
#include <queue>

bool canFinish(int n, std::vector<std::vector<int>>& prerequisites) {
    std::vector<std::vector<int>> graph(n);
    std::vector<int> inDegree(n, 0);
    for (auto& p : prerequisites) {
        graph[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }
    std::queue<int> q;
    for (int i = 0; i < n; i++)
        if (inDegree[i] == 0) q.push(i);
    int processed = 0;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        processed++;
        for (int neighbor : graph[node])
            if (--inDegree[neighbor] == 0)
                q.push(neighbor);
    }
    return processed == n;
}`,
    },
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
  },
  {
    id: 'rotting-oranges',
    title: 'Rotting Oranges',
    topicId: 'graphs',
    difficulty: 'medium',
    description: `You are given an mÃ—n grid where 0 = empty, 1 = fresh orange, 2 = rotten orange. Each minute, any fresh orange adjacent (4-directionally) to a rotten orange becomes rotten. Return the minimum minutes until no fresh orange remains, or -1 if impossible.`,
    examples: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4' },
      { input: 'grid = [[0,2]]', output: '0' },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1' },
    ],
    constraints: ['m, n <= 10'],
    hints: ['Use BFS from all rotten oranges simultaneously.', 'Track minutes with level-order BFS.'],
    solution: {
      csharp: `public int OrangesRotting(int[][] grid) {
    int m = grid.Length, n = grid[0].Length;
    var q = new Queue<(int r, int c)>();
    int fresh = 0;

    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) q.Enqueue((i, j));
            else if (grid[i][j] == 1) fresh++;
        }

    int minutes = 0;
    int[] dr = { -1, 1, 0, 0 };
    int[] dc = { 0, 0, -1, 1 };

    while (q.Count > 0 && fresh > 0) {
        int size = q.Count;
        for (int i = 0; i < size; i++) {
            var (r, c) = q.Dequeue();
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    q.Enqueue((nr, nc));
                    fresh--;
                }
            }
        }
        minutes++;
    }

    return fresh == 0 ? minutes : -1;
}`,
      python: `from collections import deque

def oranges_rotting(grid):
    m, n = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 2:
                q.append((i, j))
            elif grid[i][j] == 1:
                fresh += 1
    minutes = 0
    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 1]
    while q and fresh > 0:
        for _ in range(len(q)):
            r, c = q.popleft()
            for d in range(4):
                nr, nc = r + dr[d], c + dc[d]
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    q.append((nr, nc))
                    fresh -= 1
        minutes += 1
    return minutes if fresh == 0 else -1
`,
      java: `public int orangesRotting(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    Queue<int[]> q = new LinkedList<>();
    int fresh = 0;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) q.offer(new int[]{i, j});
            else if (grid[i][j] == 1) fresh++;
        }
    int minutes = 0;
    int[] dr = {-1, 1, 0, 0};
    int[] dc = {0, 0, -1, 1};
    while (!q.isEmpty() && fresh > 0) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            int[] cell = q.poll();
            int r = cell[0], c = cell[1];
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    q.offer(new int[]{nr, nc});
                    fresh--;
                }
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}`,
      javascript: `function orangesRotting(grid) {
    const m = grid.length, n = grid[0].length;
    const q = [];
    let fresh = 0;
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) q.push([i, j]);
            else if (grid[i][j] === 1) fresh++;
        }
    let minutes = 0;
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    while (q.length > 0 && fresh > 0) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const [r, c] = q.shift();
            for (let d = 0; d < 4; d++) {
                const nr = r + dr[d], nc = c + dc[d];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2;
                    q.push([nr, nc]);
                    fresh--;
                }
            }
        }
        minutes++;
    }
    return fresh === 0 ? minutes : -1;
}`,
      cpp: `#include <vector>
#include <queue>
#include <utility>

int orangesRotting(std::vector<std::vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    std::queue<std::pair<int, int>> q;
    int fresh = 0;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) q.push({i, j});
            else if (grid[i][j] == 1) fresh++;
        }
    int minutes = 0;
    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};
    while (!q.empty() && fresh > 0) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            auto [r, c] = q.front(); q.pop();
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    q.push({nr, nc});
                    fresh--;
                }
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}`,
    },
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder',
    topicId: 'graphs',
    difficulty: 'hard',
    description: `Given two words (beginWord and endWord) and a dictionary's word list, return the length of the shortest transformation sequence from beginWord to endWord. Each transformation can change only one letter.`,
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5', explanation: '"hit" â†’ "hot" â†’ "dot" â†’ "dog" â†’ "cog"' },
    ],
    constraints: ['1 <= beginWord.length <= 10', 'All words have the same length.'],
    hints: ['BFS on an implicit graph where edges connect words differing by one letter.', 'Use a HashSet for O(1) word lookup.'],
    solution: {
      csharp: `public int LadderLength(string beginWord, string endWord, IList<string> wordList) {
    var words = new HashSet<string>(wordList);
    if (!words.Contains(endWord)) return 0;

    var q = new Queue<string>();
    q.Enqueue(beginWord);
    int steps = 1;

    while (q.Count > 0) {
        int size = q.Count;
        for (int i = 0; i < size; i++) {
            string curr = q.Dequeue();
            if (curr == endWord) return steps;

            var chars = curr.ToCharArray();
            for (int j = 0; j < chars.Length; j++) {
                char original = chars[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    chars[j] = c;
                    string next = new string(chars);
                    if (words.Contains(next)) {
                        words.Remove(next);
                        q.Enqueue(next);
                    }
                }
                chars[j] = original;
            }
        }
        steps++;
    }
    return 0;
}`,
      python: `from collections import deque

def ladder_length(begin_word, end_word, word_list):
    words = set(word_list)
    if end_word not in words:
        return 0
    q = deque([begin_word])
    steps = 1
    while q:
        for _ in range(len(q)):
            curr = q.popleft()
            if curr == end_word:
                return steps
            chars = list(curr)
            for j in range(len(chars)):
                original = chars[j]
                for c in "abcdefghijklmnopqrstuvwxyz":
                    chars[j] = c
                    nxt = "".join(chars)
                    if nxt in words:
                        words.remove(nxt)
                        q.append(nxt)
                chars[j] = original
        steps += 1
    return 0
`,
      java: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> words = new HashSet<>(wordList);
    if (!words.contains(endWord)) return 0;
    Queue<String> q = new LinkedList<>();
    q.offer(beginWord);
    int steps = 1;
    while (!q.isEmpty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            String curr = q.poll();
            if (curr.equals(endWord)) return steps;
            char[] chars = curr.toCharArray();
            for (int j = 0; j < chars.length; j++) {
                char original = chars[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    chars[j] = c;
                    String next = new String(chars);
                    if (words.contains(next)) {
                        words.remove(next);
                        q.offer(next);
                    }
                }
                chars[j] = original;
            }
        }
        steps++;
    }
    return 0;
}`,
      javascript: `function ladderLength(beginWord, endWord, wordList) {
    const words = new Set(wordList);
    if (!words.has(endWord)) return 0;
    const q = [beginWord];
    let steps = 1;
    while (q.length > 0) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const curr = q.shift();
            if (curr === endWord) return steps;
            const chars = curr.split('');
            for (let j = 0; j < chars.length; j++) {
                const original = chars[j];
                for (let k = 0; k < 26; k++) {
                    chars[j] = String.fromCharCode(97 + k);
                    const next = chars.join('');
                    if (words.has(next)) {
                        words.delete(next);
                        q.push(next);
                    }
                }
                chars[j] = original;
            }
        }
        steps++;
    }
    return 0;
}`,
      cpp: `#include <string>
#include <vector>
#include <unordered_set>
#include <queue>

int ladderLength(const std::string& beginWord, const std::string& endWord, const std::vector<std::string>& wordList) {
    std::unordered_set<std::string> words(wordList.begin(), wordList.end());
    if (!words.count(endWord)) return 0;
    std::queue<std::string> q;
    q.push(beginWord);
    int steps = 1;
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            std::string curr = q.front(); q.pop();
            if (curr == endWord) return steps;
            for (size_t j = 0; j < curr.length(); j++) {
                char original = curr[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    curr[j] = c;
                    if (words.count(curr)) {
                        words.erase(curr);
                        q.push(curr);
                    }
                }
                curr[j] = original;
            }
        }
        steps++;
    }
    return 0;
}`,
    },
    timeComplexity: 'O(n * mÂ² * 26)',
    spaceComplexity: 'O(n)',
  },
];
