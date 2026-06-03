import type { Topic } from '../types';

export const topic: Topic = {
  id: 'recursion',
  title: 'Recursion & Backtracking',
  icon: 'RefreshCw',
  order: 6,
  description: 'Problems that solve themselves: functions that call themselves. Essential for trees, graphs, and combinatorial search.',
  difficulty: 'intermediate',
  prerequisites: ['big-o', 'arrays-strings', 'stacks-queues'],
  theory: [
    {
      id: 'recursion-basics',
      title: 'Recursion Basics',
      content: `A recursive function calls itself with a **smaller or simpler input** until it reaches a **base case** (the simplest possible input).

Every recursive function needs:
1. **Base case** - the condition that stops the recursion
2. **Recursive case** - the function calling itself with modified input

The **call stack** tracks each recursive call. Too many recursive calls = **stack overflow**.`,
      codeExamples: [
        {
          title: 'Recursion vs iteration',
          code: {
            csharp: `// Iterative factorial - O(n) time, O(1) space
int FactorialIter(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

// Recursive factorial - O(n) time, O(n) stack space
int FactorialRec(int n) {
    if (n <= 1) return 1;          // base case
    return n * FactorialRec(n - 1); // recursive case
}

// Fibonacci - naive: O(2ⁿ) time, O(n) stack space
int FibNaive(int n) {
    if (n <= 1) return n;
    return FibNaive(n - 1) + FibNaive(n - 2); // exponential!
}

// Fibonacci - memoized: O(n) time, O(n) space
int FibMemo(int n, Dictionary<int, int> memo = null) {
    memo ??= new Dictionary<int, int>();
    if (n <= 1) return n;
    if (memo.ContainsKey(n)) return memo[n];
    return memo[n] = FibMemo(n - 1, memo) + FibMemo(n - 2, memo);
}`,
            python: `# Iterative factorial - O(n) time, O(1) space
def factorial_iter(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Recursive factorial - O(n) time, O(n) stack space
def factorial_rec(n):
    if n <= 1:          # base case
        return 1
    return n * factorial_rec(n - 1)  # recursive case

# Fibonacci - naive: O(2ⁿ) time, O(n) stack space
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)  # exponential!

# Fibonacci - memoized: O(n) time, O(n) space
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n):
    if n <= 1:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)`,
            java: `import java.util.*;

// Iterative factorial - O(n) time, O(1) space
public int factorialIter(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

// Recursive factorial - O(n) time, O(n) stack space
public int factorialRec(int n) {
    if (n <= 1) return 1;          // base case
    return n * factorialRec(n - 1); // recursive case
}

// Fibonacci - naive: O(2ⁿ) time, O(n) stack space
public int fibNaive(int n) {
    if (n <= 1) return n;
    return fibNaive(n - 1) + fibNaive(n - 2); // exponential!
}

// Fibonacci - memoized: O(n) time, O(n) space
public int fibMemo(int n, Map<Integer, Integer> memo) {
    if (memo == null) memo = new HashMap<>();
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);
    int result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    memo.put(n, result);
    return result;
}`,
            javascript: `// Iterative factorial - O(n) time, O(1) space
const factorialIter = (n) => {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
};

// Recursive factorial - O(n) time, O(n) stack space
const factorialRec = (n) => {
    if (n <= 1) return 1;           // base case
    return n * factorialRec(n - 1); // recursive case
};

// Fibonacci - naive: O(2ⁿ) time, O(n) stack space
const fibNaive = (n) => {
    if (n <= 1) return n;
    return fibNaive(n - 1) + fibNaive(n - 2); // exponential!
};

// Fibonacci - memoized: O(n) time, O(n) space
const fibMemo = (n, memo = {}) => {
    if (n <= 1) return n;
    if (n in memo) return memo[n];
    return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
};`,
          cpp: `#include <unordered_map>

// Iterative factorial - O(n) time, O(1) space
int factorialIter(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

// Recursive factorial - O(n) time, O(n) stack space
int factorialRec(int n) {
    if (n <= 1) return 1;          // base case
    return n * factorialRec(n - 1); // recursive case
}

// Fibonacci - naive: O(2ⁿ) time, O(n) stack space
int fibNaive(int n) {
    if (n <= 1) return n;
    return fibNaive(n - 1) + fibNaive(n - 2); // exponential!
}

// Fibonacci - memoized: O(n) time, O(n) space
int fibMemo(int n, std::unordered_map<int, int>& memo) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
}`,
          },
        },
      ],
      table: {
        headers: ['Approach', 'Time', 'Space', 'When to use'],
        rows: [
          ['Iterative', 'O(n)', 'O(1)', 'Simple linear problems'],
          ['Recursive', 'O(recursions)', 'O(depth)', 'Tree/graph traversal, divide & conquer'],
          ['Memoized', 'O(states)', 'O(states)', 'Overlapping subproblems'],
        ],
      },
    },
    {
      id: 'backtracking',
      title: 'Backtracking',
      content: `Backtracking is a systematic way to try all possibilities. You make a choice, explore recursively, then **undo** the choice (backtrack) and try the next option.

**Template:**
1. Check if current state is a valid solution → add to results
2. Iterate through all possible choices at this step
3. Make the choice → recurse → **undo** the choice

Used for: permutations, subsets, combination sum, N-Queens, Sudoku solver.`,
      codeExamples: [
        {
          title: 'Backtracking template',
          code: {
            csharp: `// Generate all subsets (powerset) - O(2ⁿ)
IList<IList<int>> Subsets(int[] nums) {
    var result = new List<IList<int>>();
    var current = new List<int>();
    Backtrack(0);
    return result;

    void Backtrack(int start) {
        result.Add(new List<int>(current)); // add current subset

        for (int i = start; i < nums.Length; i++) {
            current.Add(nums[i]);            // choose
            Backtrack(i + 1);                // explore
            current.RemoveAt(current.Count - 1); // un-choose
        }
    }
}

// Generate all permutations - O(n!)
IList<IList<int>> Permute(int[] nums) {
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
            python: `# Generate all subsets (powerset) - O(2ⁿ)
def subsets(nums):
    result = []
    current = []

    def backtrack(start):
        result.append(current[:])  # add current subset

        for i in range(start, len(nums)):
            current.append(nums[i])   # choose
            backtrack(i + 1)          # explore
            current.pop()             # un-choose

    backtrack(0)
    return result

# Generate all permutations - O(n!)
def permute(nums):
    result = []
    used = [False] * len(nums)
    current = []

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
    return result`,
            java: `import java.util.*;

// Generate all subsets (powerset) - O(2ⁿ)
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrackSubsets(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrackSubsets(int[] nums, int start,
        List<Integer> current, List<List<Integer>> result) {
    result.add(new ArrayList<>(current)); // add current subset

    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);            // choose
        backtrackSubsets(nums, i + 1, current, result); // explore
        current.remove(current.size() - 1); // un-choose
    }
}

// Generate all permutations - O(n!)
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    boolean[] used = new boolean[nums.length];
    backtrackPermute(nums, used, new ArrayList<>(), result);
    return result;
}

private void backtrackPermute(int[] nums, boolean[] used,
        List<Integer> current, List<List<Integer>> result) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current));
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        current.add(nums[i]);
        backtrackPermute(nums, used, current, result);
        current.remove(current.size() - 1);
        used[i] = false;
    }
}`,
            javascript: `// Generate all subsets (powerset) - O(2ⁿ)
const subsets = (nums) => {
    const result = [];
    const current = [];

    const backtrack = (start) => {
        result.push([...current]); // add current subset

        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);   // choose
            backtrack(i + 1);        // explore
            current.pop();           // un-choose
        }
    };

    backtrack(0);
    return result;
};

// Generate all permutations - O(n!)
const permute = (nums) => {
    const result = [];
    const used = new Array(nums.length).fill(false);
    const current = [];

    const backtrack = () => {
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
    };

    backtrack();
    return result;
};`,
          cpp: `#include <vector>
#include <functional>

// Generate all subsets (powerset) - O(2ⁿ)
std::vector<std::vector<int>> subsets(const std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    std::function<void(int)> backtrack = [&](int start) {
        result.push_back(current);
        for (int i = start; i < nums.size(); i++) {
            current.push_back(nums[i]);
            backtrack(i + 1);
            current.pop_back();
        }
    };
    backtrack(0);
    return result;
}

// Generate all permutations - O(n!)
std::vector<std::vector<int>> permute(const std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    std::vector<bool> used(nums.size(), false);
    std::function<void()> backtrack = [&]() {
        if (current.size() == nums.size()) {
            result.push_back(current);
            return;
        }
        for (int i = 0; i < nums.size(); i++) {
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
        },
      ],
    },
    {
      id: 'divide-and-conquer',
      title: 'Divide & Conquer',
      content: `A recursive pattern where you:
1. **Divide** the problem into smaller subproblems
2. **Conquer** each subproblem recursively
3. **Combine** the results

Examples: Merge sort, quick sort, binary search, tree traversals.`,
      codeExamples: [
        {
          title: 'Merge sort - classic divide & conquer',
          code: {
            csharp: `int[] MergeSort(int[] arr) {
    if (arr.Length <= 1) return arr;

    int mid = arr.Length / 2;
    var left = MergeSort(arr[..mid]);     // divide
    var right = MergeSort(arr[mid..]);    // divide

    return Merge(left, right);            // combine
}

int[] Merge(int[] left, int[] right) {
    var result = new int[left.Length + right.Length];
    int i = 0, j = 0, k = 0;

    while (i < left.Length && j < right.Length)
        result[k++] = left[i] <= right[j] ? left[i++] : right[j++];

    while (i < left.Length) result[k++] = left[i++];
    while (j < right.Length) result[k++] = right[j++];

    return result;
}
// O(n log n) time, O(n) space`,
            python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])   # divide
    right = merge_sort(arr[mid:])  # divide

    return merge(left, right)      # combine

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result
# O(n log n) time, O(n) space`,
            java: `public int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;

    int mid = arr.length / 2;
    int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));   // divide
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length)); // divide

    return merge(left, right); // combine
}

public int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;

    while (i < left.length && j < right.length)
        result[k++] = left[i] <= right[j] ? left[i++] : right[j++];

    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];

    return result;
}
// O(n log n) time, O(n) space`,
            javascript: `const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));   // divide
    const right = mergeSort(arr.slice(mid));     // divide

    return merge(left, right);                   // combine
};

const merge = (left, right) => {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length)
        result.push(left[i] <= right[j] ? left[i++] : right[j++]);

    result.push(...left.slice(i));
    result.push(...right.slice(j));

    return result;
};
// O(n log n) time, O(n) space`,
          cpp: `#include <vector>

std::vector<int> mergeSort(const std::vector<int>& arr) {
    if (arr.size() <= 1) return arr;

    int mid = arr.size() / 2;
    auto left = mergeSort(std::vector<int>(arr.begin(), arr.begin() + mid));
    auto right = mergeSort(std::vector<int>(arr.begin() + mid, arr.end()));

    return merge(left, right);
}

std::vector<int> merge(const std::vector<int>& left, const std::vector<int>& right) {
    std::vector<int> result;
    int i = 0, j = 0;

    while (i < left.size() && j < right.size())
        result.push_back(left[i] <= right[j] ? left[i++] : right[j++]);

    result.insert(result.end(), left.begin() + i, left.end());
    result.insert(result.end(), right.begin() + j, right.end());

    return result;
}
// O(n log n) time, O(n) space`,
          },
        },
      ],
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Subsets (powerset)** - for each element, include or exclude
2. **Permutations** - try each unused element at each position
3. **Combination sum** - pick elements (with/without repetition) to reach target
4. **Generate parentheses** - add open or close parenthesis, tracking counts
5. **Tree traversal** - DFS is naturally recursive (preorder/inorder/postorder)
6. **Divide & conquer** - merge sort, quick sort, maximum subarray`,
    },
  ],
  problemIds: ['subsets', 'permutations', 'combination-sum', 'generate-parentheses', 'n-queens'],
};
