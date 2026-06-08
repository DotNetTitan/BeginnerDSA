import type { Topic } from '../types';

export const topic: Topic = {
  id: 'recursion',
  title: 'Recursion & Backtracking',
  icon: 'RefreshCw',
  order: 6,
  description: 'Problems that solve themselves: functions that call themselves. Essential for combinatorial search and divide-and-conquer algorithms.',
  difficulty: 'intermediate',
  prerequisites: ['big-o', 'arrays-strings', 'stacks-queues'],
  theory: [
    {
      id: 'why-recursion',
      title: 'When Solving a Problem Means Solving a Smaller Version of It',
      content: `Imagine you're in a movie theater and you want to know what row you're sitting in. You can't turn around and count from the front. But you can ask the person in front of you: "What row are you in?" They don't know either, so they ask the person in front of them. Eventually, the first person says "Row 1." That answer travels back: "Row 2," "Row 3," until you get "Row 7."

That's recursion. A function that solves a problem by calling itself with a **smaller input**, until it reaches a version so simple the answer is obvious. Then the answers propagate back up.

You've already seen the stack structure in the previous module. Recursion uses the **call stack** - each recursive call pushes a frame onto the stack, and when the base case is reached, the frames pop off one by one.

Every recursive function needs two things:
1. **Base case** - the condition where the answer is immediate (no more recursion)
2. **Recursive case** - the function calling itself with a smaller or simpler input`,
      vizLabel: 'Compute 5! (5 factorial) by breaking it into smaller subproblems. Watch how the call stack grows as each recursive call is pushed.',
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
      title: 'Backtracking - Try, Then Undo',
      content: `Backtracking is recursion applied to **exploring all possibilities**. You make a choice, recurse to explore the consequences, then **undo** the choice and try the next option.

Think of a maze. At each fork, you pick a direction and walk. If you hit a dead end, you backtrack to the last fork and try a different direction. The "undo" step is the key - without it, your path choices accumulate and you can't explore alternative branches.

**The template:**
1. Check if the current state is a valid solution → add to results
2. For each possible choice at this step:
   - Make the choice
   - Recurse (explore from this new state)
   - **Undo** the choice

This pattern is used for permutations, subsets, combination sums, N-Queens, and Sudoku solvers.`,
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
      content: `A recursive pattern that shows up everywhere in computer science:

1. **Divide** the problem into smaller subproblems
2. **Conquer** each subproblem recursively
3. **Combine** the results

It sounds abstract, but you've already seen it: binary search (from the Big O module), merge sort, quick sort, and many tree algorithms all follow this pattern. The key insight is that if you can solve a smaller version of the problem, you can combine those solutions to solve the full problem.`,
      codeExamples: [
        {
          title: 'Sum of array - divide & conquer',
          code: {
            csharp: `int Sum(int[] arr, int left, int right) {
    if (left == right)
        return arr[left];              // base case

    int mid = left + (right - left) / 2;
    int leftSum = Sum(arr, left, mid);     // divide
    int rightSum = Sum(arr, mid + 1, right); // divide

    return leftSum + rightSum;             // combine
}
// Sum(arr, 0, arr.Length - 1) to start
// O(n) time, O(log n) stack space`,
            python: `def sum_arr(arr, left, right):
    if left == right:
        return arr[left]          # base case

    mid = (left + right) // 2
    left_sum = sum_arr(arr, left, mid)      # divide
    right_sum = sum_arr(arr, mid + 1, right) # divide

    return left_sum + right_sum             # combine
# sum_arr(arr, 0, len(arr) - 1) to start
# O(n) time, O(log n) stack space`,
            java: `public int sum(int[] arr, int left, int right) {
    if (left == right)
        return arr[left];                  // base case

    int mid = left + (right - left) / 2;
    int leftSum = sum(arr, left, mid);         // divide
    int rightSum = sum(arr, mid + 1, right);   // divide

    return leftSum + rightSum;                 // combine
}
// sum(arr, 0, arr.length - 1) to start
// O(n) time, O(log n) stack space`,
            javascript: `const sum = (arr, left, right) => {
    if (left === right)
        return arr[left];                // base case

    const mid = Math.floor((left + right) / 2);
    const leftSum = sum(arr, left, mid);      // divide
    const rightSum = sum(arr, mid + 1, right); // divide

    return leftSum + rightSum;                // combine
};
// sum(arr, 0, arr.length - 1) to start
// O(n) time, O(log n) stack space`,
          cpp: `#include <vector>

int sum(const std::vector<int>& arr, int left, int right) {
    if (left == right)
        return arr[left];                  // base case

    int mid = left + (right - left) / 2;
    int leftSum = sum(arr, left, mid);         // divide
    int rightSum = sum(arr, mid + 1, right);   // divide

    return leftSum + rightSum;                 // combine
}
// sum(arr, 0, arr.size() - 1) to start
// O(n) time, O(log n) stack space`,
          },
        },
      ],
    },
    {
      id: 'when-to-use-recursion',
      title: 'Recursion vs Iteration',
      content: `**Recursion works best when:**
- The problem has a natural recursive structure (nested data, divide and conquer, recursive definitions)
- The backtracking pattern fits (try, recurse, undo)
- Code clarity matters more than pushing the last ounce of performance

**Iteration is better when:**
- Stack depth could be a problem (deep recursion can overflow the call stack)
- The problem is linear (looping through an array)
- Performance is critical (function calls aren't free)
- The recursion would do duplicate work (use memoization or iterate instead)

**Decision guide:**
| Pattern | Use recursion? |
|---|---|
| Tree traversal | Yes - natural recursive structure |
| Array iteration | No - simple loop is faster |
| Permutations / subsets | Yes - backtracking is naturally recursive |
| Factorial / Fibonacci | Memoized recursion or iteration |
| Divide & conquer | Yes - split, solve, combine |
| Level-order processing | No - queue iteration is simpler |

**Warning signs for recursion:**
- Depth could exceed 1000 (stack overflow risk)
- Problem has no overlapping subproblems (simple iteration works)
- You need to pass mutable state through many levels`,
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes',
      content: `**Missing base case (infinite recursion)**
Without a base case, the recursion never stops and you get a stack overflow. Always write the base case first.

**Not returning the recursive result**
\`factorial(n) = n * factorial(n - 1)\` - if you forget the \`return\`, the function returns nothing. Always propagate the result back up.

**Naive Fibonacci is O(2ⁿ)**
\`fib(n) = fib(n-1) + fib(n-2)\` without memoization recomputes the same values exponentially. For n=50, it's trillions of calls. Use memoization (caching) or iteration.

**Stack overflow from deep recursion**
Each call adds a stack frame. Beyond ~1000 frames (Python) or ~10000 (C#/Java/C++), you risk overflow. For linear problems, consider the iterative version.

**Forgetting to undo in backtracking**
If you modify shared state (like a list) during recursion and don't undo it, sibling branches see corrupted state. The "undo" step in backtracking is not optional.

**Confusing recursion depth with problem size**
A recursive function on a balanced binary tree of n elements has O(log n) depth, not O(n). The depth depends on the structure, not the total element count.`,
    },
    {
      id: 'common-patterns',
      title: 'Key Patterns to Remember',
      content: `1. **Subsets (powerset)** - for each element, include or exclude it
2. **Permutations** - try each unused element at each position
3. **Combination sum** - pick elements (with/without repetition) to reach a target sum
4. **Generate parentheses** - add open or close parenthesis, tracking counts
5. **DFS traversal** - naturally recursive, used heavily in trees and graphs
6. **Divide & conquer** - split, solve recursively, combine`,
    },
    {
      id: 'whats-next',
      title: 'What\'s Next?',
      content: `Recursion gives you a powerful way to think about problems - especially ones that can be broken into smaller versions of themselves.

Now we'll apply that thinking to **Sorting & Searching**. Sorting is the ultimate divide-and-conquer success story. Algorithms like Merge Sort and Quick Sort are textbook examples of recursion in action. And searching - especially binary search - is the O(log n) superpower we hinted at way back in the Big O module.

**Next up: Sorting & Searching**`,
    },
  ],
  problemIds: ['subsets', 'permutations', 'combination-sum', 'generate-parentheses', 'n-queens'],
};
