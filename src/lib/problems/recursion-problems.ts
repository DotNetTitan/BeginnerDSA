import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'subsets',
    title: 'Subsets (Power Set)',
    topicId: 'recursion',
    difficulty: 'medium',
    description: `Given an array of distinct integers, return all possible subsets (the power set).`,
    examples: [
      { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
      { input: 'nums = [0]', output: '[[],[0]]' },
    ],
    constraints: ['1 <= nums.length <= 10'],
    hints: ['Use the backtracking template.', 'At each step, you can either include or exclude the current element.'],
    solution: {
      csharp: `public IList<IList<int>> Subsets(int[] nums) {
    var result = new List<IList<int>>();
    var current = new List<int>();
    Backtrack(0);
    return result;

    void Backtrack(int start) {
        result.Add(new List<int>(current));
        for (int i = start; i < nums.Length; i++) {
            current.Add(nums[i]);
            Backtrack(i + 1);
            current.RemoveAt(current.Count - 1);
        }
    }
}`,
      python: `def subsets(nums):
    result = []
    current = []

    def backtrack(start):
        result.append(current[:])
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1)
            current.pop()

    backtrack(0)
    return result
`,
      java: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
    result.add(new ArrayList<>(current));
    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.remove(current.size() - 1);
    }
}`,
      javascript: `function subsets(nums) {
    const result = [];
    const current = [];
    function backtrack(start) {
        result.push([...current]);
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1);
            current.pop();
        }
    }
    backtrack(0);
    return result;
}`,
      cpp: `#include <vector>
#include <functional>

std::vector<std::vector<int>> subsets(const std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    std::function<void(int)> backtrack = [&](int start) {
        result.push_back(current);
        for (int i = start; i < (int)nums.size(); i++) {
            current.push_back(nums[i]);
            backtrack(i + 1);
            current.pop_back();
        }
    };
    backtrack(0);
    return result;
}`,
    },
    timeComplexity: 'O(n * 2^n)',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/subsets/',
  },
  {
    id: 'permutations',
    title: 'Permutations',
    topicId: 'recursion',
    difficulty: 'medium',
    description: `Given an array of distinct integers, return all possible permutations.`,
    examples: [
      { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
      { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' },
    ],
    constraints: ['1 <= nums.length <= 6'],
    hints: ['Track which elements are used with a boolean array.', 'Add current element, recurse, then undo.'],
    solution: {
      csharp: `public IList<IList<int>> Permute(int[] nums) {
    var result = new List<IList<int>>();
    var current = new List<int>();
    var used = new bool[nums.Length];
    Backtrack();
    return result;

    void Backtrack() {
        if (current.Count == nums.Length) {
            result.Add(new List<int>(current));
            return;
        }
        for (int i = 0; i < nums.Length; i++) {
            if (used[i]) continue;
            used[i] = true;
            current.Add(nums[i]);
            Backtrack();
            current.RemoveAt(current.Count - 1);
            used[i] = false;
        }
    }
}`,
      python: `def permute(nums):
    result = []
    current = []
    used = [False] * len(nums)

    def backtrack():
        if len(current) == len(nums):
            result.append(current[:])
            return
        for i in range(len(nums)):
            if used[i]:
                continue
            used[i] = True
            current.append(nums[i])
            backtrack()
            current.pop()
            used[i] = False

    backtrack()
    return result
`,
      java: `public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, new boolean[nums.length], new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current));
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        current.add(nums[i]);
        backtrack(nums, used, current, result);
        current.remove(current.size() - 1);
        used[i] = false;
    }
}`,
      javascript: `function permute(nums) {
    const result = [];
    const current = [];
    const used = new Array(nums.length).fill(false);
    function backtrack() {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            current.push(nums[i]);
            backtrack();
            current.pop();
            used[i] = false;
        }
    }
    backtrack();
    return result;
}`,
      cpp: `#include <vector>
#include <functional>

std::vector<std::vector<int>> permute(const std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    std::vector<bool> used(nums.size(), false);
    std::function<void()> backtrack = [&]() {
        if (current.size() == nums.size()) {
            result.push_back(current);
            return;
        }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true;
            current.push_back(nums[i]);
            backtrack();
            current.pop_back();
            used[i] = false;
        }
    };
    backtrack();
    return result;
}`,
    },
    timeComplexity: 'O(n * n!)',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/permutations/',
  },
  {
    id: 'combination-sum',
    title: 'Combination Sum',
    topicId: 'recursion',
    difficulty: 'medium',
    description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return all unique combinations where candidates sum to target. You may use the same number an unlimited number of times.`,
    examples: [
      { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
      { input: 'candidates = [2,3,5], target = 8', output: '[[2,2,2,2],[2,3,3],[3,5]]' },
    ],
    constraints: ['1 <= candidates.length <= 30', 'All candidates are distinct.'],
    hints: ['Sort candidates first (optional).', 'In the recursive call, you can reuse the same index (not i+1).'],
    solution: {
      csharp: `public IList<IList<int>> CombinationSum(int[] candidates, int target) {
    var result = new List<IList<int>>();
    var current = new List<int>();
    Backtrack(0, target);
    return result;

    void Backtrack(int start, int remaining) {
        if (remaining == 0) {
            result.Add(new List<int>(current));
            return;
        }
        for (int i = start; i < candidates.Length; i++) {
            if (candidates[i] > remaining) continue;
            current.Add(candidates[i]);
            Backtrack(i, remaining - candidates[i]);
            current.RemoveAt(current.Count - 1);
        }
    }
}`,
      python: `def combination_sum(candidates, target):
    result = []
    current = []

    def backtrack(start, remaining):
        if remaining == 0:
            result.append(current[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                continue
            current.append(candidates[i])
            backtrack(i, remaining - candidates[i])
            current.pop()

    backtrack(0, target)
    return result
`,
      java: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, target, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] candidates, int remaining, int start, List<Integer> current, List<List<Integer>> result) {
    if (remaining == 0) {
        result.add(new ArrayList<>(current));
        return;
    }
    for (int i = start; i < candidates.length; i++) {
        if (candidates[i] > remaining) continue;
        current.add(candidates[i]);
        backtrack(candidates, remaining - candidates[i], i, current, result);
        current.remove(current.size() - 1);
    }
}`,
      javascript: `function combinationSum(candidates, target) {
    const result = [];
    const current = [];
    function backtrack(start, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) continue;
            current.push(candidates[i]);
            backtrack(i, remaining - candidates[i]);
            current.pop();
        }
    }
    backtrack(0, target);
    return result;
}`,
      cpp: `#include <vector>
#include <functional>

std::vector<std::vector<int>> combinationSum(const std::vector<int>& candidates, int target) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    std::function<void(int, int)> backtrack = [&](int start, int remaining) {
        if (remaining == 0) {
            result.push_back(current);
            return;
        }
        for (int i = start; i < (int)candidates.size(); i++) {
            if (candidates[i] > remaining) continue;
            current.push_back(candidates[i]);
            backtrack(i, remaining - candidates[i]);
            current.pop_back();
        }
    };
    backtrack(0, target);
    return result;
}`,
    },
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(target / min(candidates))',
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum/',
  },
  {
    id: 'generate-parentheses',
    title: 'Generate Parentheses',
    topicId: 'recursion',
    difficulty: 'medium',
    description: `Given n pairs of parentheses, generate all combinations of well-formed parentheses.`,
    examples: [
      { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' },
      { input: 'n = 1', output: '["()"]' },
    ],
    constraints: ['1 <= n <= 8'],
    hints: ['Track open and close counts.', 'You can add an open if open < n. You can add a close if close < open.'],
    solution: {
      csharp: `public IList<string> GenerateParenthesis(int n) {
    var result = new List<string>();
    Backtrack(0, 0, "");
    return result;

    void Backtrack(int open, int close, string current) {
        if (current.Length == n * 2) {
            result.Add(current);
            return;
        }
        if (open < n) Backtrack(open + 1, close, current + "(");
        if (close < open) Backtrack(open, close + 1, current + ")");
    }
}`,
      python: `def generate_parenthesis(n):
    result = []

    def backtrack(open_count, close_count, current):
        if len(current) == n * 2:
            result.append(current)
            return
        if open_count < n:
            backtrack(open_count + 1, close_count, current + "(")
        if close_count < open_count:
            backtrack(open_count, close_count + 1, current + ")")

    backtrack(0, 0, "")
    return result
`,
      java: `public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack(n, 0, 0, "", result);
    return result;
}

private void backtrack(int n, int open, int close, String current, List<String> result) {
    if (current.length() == n * 2) {
        result.add(current);
        return;
    }
    if (open < n) backtrack(n, open + 1, close, current + "(", result);
    if (close < open) backtrack(n, open, close + 1, current + ")", result);
}`,
      javascript: `function generateParenthesis(n) {
    const result = [];
    function backtrack(open, close, current) {
        if (current.length === n * 2) {
            result.push(current);
            return;
        }
        if (open < n) backtrack(open + 1, close, current + "(");
        if (close < open) backtrack(open, close + 1, current + ")");
    }
    backtrack(0, 0, "");
    return result;
}`,
      cpp: `#include <vector>
#include <string>
#include <functional>

std::vector<std::string> generateParenthesis(int n) {
    std::vector<std::string> result;
    std::function<void(int, int, std::string)> backtrack = [&](int open, int close, std::string current) {
        if ((int)current.length() == n * 2) {
            result.push_back(current);
            return;
        }
        if (open < n) backtrack(open + 1, close, current + "(");
        if (close < open) backtrack(open, close + 1, current + ")");
    };
    backtrack(0, 0, "");
    return result;
}`,
    },
    timeComplexity: 'O(4^n / sqrt(n))',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/',
  },
  {
    id: 'n-queens',
    title: 'N-Queens',
    topicId: 'recursion',
    difficulty: 'hard',
    description: `The n-queens puzzle: place n queens on an n×n board such that no two queens attack each other. Return all distinct solutions.`,
    examples: [
      { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: 'n = 1', output: '[["Q"]]' },
    ],
    constraints: ['1 <= n <= 9'],
    hints: ['Place one queen per row.', 'Use sets to track occupied columns, diagonals, and anti-diagonals.'],
    solution: {
      csharp: `public IList<IList<string>> SolveNQueens(int n) {
    var result = new List<IList<string>>();
    var board = new char[n][];
    for (int i = 0; i < n; i++) {
        board[i] = new char[n];
        Array.Fill(board[i], '.');
    }

    var cols = new HashSet<int>();
    var diag = new HashSet<int>();
    var anti = new HashSet<int>();

    Backtrack(0);
    return result;

    void Backtrack(int row) {
        if (row == n) {
            result.Add(board.Select(r => new string(r)).ToList());
            return;
        }
        for (int col = 0; col < n; col++) {
            if (cols.Contains(col) || diag.Contains(row - col) || anti.Contains(row + col))
                continue;

            board[row][col] = 'Q';
            cols.Add(col); diag.Add(row - col); anti.Add(row + col);

            Backtrack(row + 1);

            board[row][col] = '.';
            cols.Remove(col); diag.Remove(row - col); anti.Remove(row + col);
        }
    }
}`,
      python: `def solve_n_queens(n):
    result = []
    board = [["."] * n for _ in range(n)]
    cols = set()
    diag = set()
    anti = set()

    def backtrack(row):
        if row == n:
            result.append(["".join(r) for r in board])
            return
        for col in range(n):
            if col in cols or (row - col) in diag or (row + col) in anti:
                continue
            board[row][col] = "Q"
            cols.add(col)
            diag.add(row - col)
            anti.add(row + col)
            backtrack(row + 1)
            board[row][col] = "."
            cols.remove(col)
            diag.remove(row - col)
            anti.remove(row + col)

    backtrack(0)
    return result
`,
      java: `public List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    char[][] board = new char[n][n];
    for (int i = 0; i < n; i++) Arrays.fill(board[i], '.');
    Set<Integer> cols = new HashSet<>();
    Set<Integer> diag = new HashSet<>();
    Set<Integer> anti = new HashSet<>();
    backtrack(n, 0, board, cols, diag, anti, result);
    return result;
}

private void backtrack(int n, int row, char[][] board, Set<Integer> cols, Set<Integer> diag, Set<Integer> anti, List<List<String>> result) {
    if (row == n) {
        List<String> copy = new ArrayList<>();
        for (char[] r : board) copy.add(new String(r));
        result.add(copy);
        return;
    }
    for (int col = 0; col < n; col++) {
        if (cols.contains(col) || diag.contains(row - col) || anti.contains(row + col))
            continue;
        board[row][col] = 'Q';
        cols.add(col); diag.add(row - col); anti.add(row + col);
        backtrack(n, row + 1, board, cols, diag, anti, result);
        board[row][col] = '.';
        cols.remove(col); diag.remove(row - col); anti.remove(row + col);
    }
}`,
      javascript: `function solveNQueens(n) {
    const result = [];
    const board = Array.from({ length: n }, () => new Array(n).fill('.'));
    const cols = new Set();
    const diag = new Set();
    const anti = new Set();
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag.has(row - col) || anti.has(row + col))
                continue;
            board[row][col] = 'Q';
            cols.add(col); diag.add(row - col); anti.add(row + col);
            backtrack(row + 1);
            board[row][col] = '.';
            cols.delete(col); diag.delete(row - col); anti.delete(row + col);
        }
    }
    backtrack(0);
    return result;
}`,
      cpp: `#include <vector>
#include <string>
#include <unordered_set>
#include <functional>

std::vector<std::vector<std::string>> solveNQueens(int n) {
    std::vector<std::vector<std::string>> result;
    std::vector<std::string> board(n, std::string(n, '.'));
    std::unordered_set<int> cols, diag, anti;
    std::function<void(int)> backtrack = [&](int row) {
        if (row == n) {
            result.push_back(board);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag.count(row - col) || anti.count(row + col))
                continue;
            board[row][col] = 'Q';
            cols.insert(col); diag.insert(row - col); anti.insert(row + col);
            backtrack(row + 1);
            board[row][col] = '.';
            cols.erase(col); diag.erase(row - col); anti.erase(row + col);
        }
    };
    backtrack(0);
    return result;
}`,
    },
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n²)',
    leetcodeUrl: 'https://leetcode.com/problems/n-queens/',
  },
];
