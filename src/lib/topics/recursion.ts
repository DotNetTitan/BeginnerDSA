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
1. **Base case** — the condition that stops the recursion
2. **Recursive case** — the function calling itself with modified input

The **call stack** tracks each recursive call. Too many recursive calls = **stack overflow**.`,
      codeExamples: [
        {
          title: 'Recursion vs iteration',
          code: `// Iterative factorial — O(n) time, O(1) space
int FactorialIter(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

// Recursive factorial — O(n) time, O(n) stack space
int FactorialRec(int n) {
    if (n <= 1) return 1;          // base case
    return n * FactorialRec(n - 1); // recursive case
}

// Fibonacci — naive: O(2ⁿ) time, O(n) stack space
int FibNaive(int n) {
    if (n <= 1) return n;
    return FibNaive(n - 1) + FibNaive(n - 2); // exponential!
}

// Fibonacci — memoized: O(n) time, O(n) space
int FibMemo(int n, Dictionary<int, int> memo = null) {
    memo ??= new Dictionary<int, int>();
    if (n <= 1) return n;
    if (memo.ContainsKey(n)) return memo[n];
    return memo[n] = FibMemo(n - 1, memo) + FibMemo(n - 2, memo);
}`,
          language: 'csharp',
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
          code: `// Generate all subsets (powerset) — O(2ⁿ)
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

// Generate all permutations — O(n!)
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
          language: 'csharp',
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
          title: 'Merge sort — classic divide & conquer',
          code: `int[] MergeSort(int[] arr) {
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
          language: 'csharp',
        },
      ],
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Subsets (powerset)** — for each element, include or exclude
2. **Permutations** — try each unused element at each position
3. **Combination sum** — pick elements (with/without repetition) to reach target
4. **Generate parentheses** — add open or close parenthesis, tracking counts
5. **Tree traversal** — DFS is naturally recursive (preorder/inorder/postorder)
6. **Divide & conquer** — merge sort, quick sort, maximum subarray`,
    },
  ],
  problemIds: ['subsets', 'permutations', 'combination-sum', 'generate-parentheses', 'n-queens'],
};
