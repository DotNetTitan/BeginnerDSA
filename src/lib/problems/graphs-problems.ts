import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    topicId: 'graphs',
    difficulty: 'medium',
    description: `Given an m×n 2D binary grid '1' (land) and '0' (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' },
    ],
    constraints: ['m, n <= 300'],
    hints: ['Use DFS or BFS to traverse each island.', 'Mark visited cells as "0" to avoid revisiting.'],
    solution: `public int NumIslands(char[][] grid) {
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
    solution: `public class Node {
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
    solution: `public bool CanFinish(int n, int[][] prerequisites) {
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
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
  },
  {
    id: 'rotting-oranges',
    title: 'Rotting Oranges',
    topicId: 'graphs',
    difficulty: 'medium',
    description: `You are given an m×n grid where 0 = empty, 1 = fresh orange, 2 = rotten orange. Each minute, any fresh orange adjacent (4-directionally) to a rotten orange becomes rotten. Return the minimum minutes until no fresh orange remains, or -1 if impossible.`,
    examples: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4' },
      { input: 'grid = [[0,2]]', output: '0' },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1' },
    ],
    constraints: ['m, n <= 10'],
    hints: ['Use BFS from all rotten oranges simultaneously.', 'Track minutes with level-order BFS.'],
    solution: `public int OrangesRotting(int[][] grid) {
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
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5', explanation: '"hit" → "hot" → "dot" → "dog" → "cog"' },
    ],
    constraints: ['1 <= beginWord.length <= 10', 'All words have the same length.'],
    hints: ['BFS on an implicit graph where edges connect words differing by one letter.', 'Use a HashSet for O(1) word lookup.'],
    solution: `public int LadderLength(string beginWord, string endWord, IList<string> wordList) {
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
    timeComplexity: 'O(n * m² * 26)',
    spaceComplexity: 'O(n)',
  },
];
