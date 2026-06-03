import type { Topic } from '../types';

export const topic: Topic = {
  id: 'dynamic-programming',
  title: 'Dynamic Programming',
  icon: 'BrainCircuit',
  order: 11,
  description: 'Optimization through memoization and tabulation. The hardest topic - but pattern recognition makes it solvable.',
  difficulty: 'advanced',
  prerequisites: ['big-o', 'arrays-strings', 'recursion'],
  theory: [
    {
      id: 'dp-basics',
      title: 'What is Dynamic Programming?',
      content: `Dynamic Programming = **recursion + memoization**. Solve problems by breaking them into overlapping subproblems and caching results.

**Two approaches:**
1. **Top-down (memoization)** - recursive with cache
2. **Bottom-up (tabulation)** - iterative, filling a table

**When to use DP:**
1. Problem asks for **count**, **max/min**, or **true/false** (is it possible?)
2. Problem can be broken into **smaller subproblems**
3. Subproblems **overlap** (not just divide & conquer)

**DP is NOT needed when:** Subproblems don't overlap (use divide & conquer) or greedy works.`,
      codeExamples: [
        {
          title: 'Top-down vs bottom-up (Fibonacci)',
          code: {
            csharp: `// Top-down (memoization) - O(n) time, O(n) space
int FibMemo(int n, Dictionary<int, int> memo = null) {
    memo ??= new Dictionary<int, int>();
    if (n <= 1) return n;
    if (memo.ContainsKey(n)) return memo[n];
    return memo[n] = FibMemo(n - 1, memo) + FibMemo(n - 2, memo);
}

// Bottom-up (tabulation) - O(n) time, O(1) space
int FibTab(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

// Bottom-up (full table) - O(n) time, O(n) space
int FibTable(int n) {
    if (n <= 1) return n;
    var dp = new int[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}`,
            python: `from functools import lru_cache

# Top-down (memoization) - O(n) time, O(n) space
@lru_cache(maxsize=None)
def fib_memo(n):
    if n <= 1:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

# Bottom-up (tabulation) - O(n) time, O(1) space
def fib_tab(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# Bottom-up (full table) - O(n) time, O(n) space
def fib_table(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,
            java: `import java.util.*;

// Top-down (memoization) - O(n) time, O(n) space
public int fibMemo(int n, Map<Integer, Integer> memo) {
    if (memo == null) memo = new HashMap<>();
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);
    int result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    memo.put(n, result);
    return result;
}

// Bottom-up (tabulation) - O(n) time, O(1) space
public int fibTab(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

// Bottom-up (full table) - O(n) time, O(n) space
public int fibTable(int n) {
    if (n <= 1) return n;
    int[] dp = new int[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}`,
            javascript: `// Top-down (memoization) - O(n) time, O(n) space
const fibMemo = (n, memo = {}) => {
    if (n <= 1) return n;
    if (n in memo) return memo[n];
    return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
};

// Bottom-up (tabulation) - O(n) time, O(1) space
const fibTab = (n) => {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    return b;
};

// Bottom-up (full table) - O(n) time, O(n) space
const fibTable = (n) => {
    if (n <= 1) return n;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 0; dp[1] = 1;
    for (let i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
};`,
          cpp: `#include <unordered_map>
#include <vector>

// Top-down (memoization) - O(n) time, O(n) space
int fibMemo(int n, std::unordered_map<int, int>& memo) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
}

// Bottom-up (tabulation) - O(n) time, O(1) space
int fibTab(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

// Bottom-up (full table) - O(n) time, O(n) space
int fibTable(int n) {
    if (n <= 1) return n;
    std::vector<int> dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}`,
          },
        },
      ],
    },
    {
      id: '1d-dp',
      title: '1D DP Patterns',
      content: `**Pattern 1: Climbing stairs / Fibonacci-like**
\`dp[i] = dp[i-1] + dp[i-2]\`

**Pattern 2: House robber (adjacent skip)**
\`dp[i] = max(dp[i-1], dp[i-2] + nums[i])\`

**Pattern 3: Longest Increasing Subsequence (LIS)**
\`dp[i] = 1 + max(dp[j]) for j < i and nums[j] < nums[i]\`

**Pattern 4: Partition (subset sum / coin change)**
\`dp[i] = dp[i] OR dp[i - coin]\` (for boolean)
\`dp[i] = min(dp[i], dp[i - coin] + 1)\` (for minimum coins)`,
      codeExamples: [
        {
          title: 'Classic 1D DP problems',
          code: {
            csharp: `// House Robber - O(n), O(1) space
int Rob(int[] nums) {
    int prev2 = 0, prev1 = 0;
    foreach (var n in nums) {
        int curr = Math.Max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// Climbing Stairs - O(n), O(1) space
int ClimbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b; b = c;
    }
    return b;
}

// Coin Change (minimum coins) - O(amount * coins), O(amount) space
int CoinChange(int[] coins, int amount) {
    var dp = new int[amount + 1];
    Array.Fill(dp, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        foreach (var coin in coins) {
            if (coin <= i)
                dp[i] = Math.Min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
            python: `# House Robber - O(n), O(1) space
def rob(nums):
    prev2 = prev1 = 0
    for n in nums:
        curr = max(prev1, prev2 + n)
        prev2, prev1 = prev1, curr
    return prev1

# Climbing Stairs - O(n), O(1) space
def climb_stairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

# Coin Change (minimum coins) - O(amount * coins), O(amount) space
def coin_change(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return -1 if dp[amount] > amount else dp[amount]`,
            java: `// House Robber - O(n), O(1) space
public int rob(int[] nums) {
    int prev2 = 0, prev1 = 0;
    for (int n : nums) {
        int curr = Math.max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// Climbing Stairs - O(n), O(1) space
public int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b; b = c;
    }
    return b;
}

// Coin Change (minimum coins) - O(amount * coins), O(amount) space
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
            javascript: `// House Robber - O(n), O(1) space
const rob = (nums) => {
    let prev2 = 0, prev1 = 0;
    for (const n of nums) {
        const curr = Math.max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
};

// Climbing Stairs - O(n), O(1) space
const climbStairs = (n) => {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        const c = a + b;
        a = b; b = c;
    }
    return b;
};

// Coin Change (minimum coins) - O(amount * coins), O(amount) space
const coinChange = (coins, amount) => {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
};`,
          cpp: `#include <vector>
#include <algorithm>
#include <climits>

// House Robber - O(n), O(1) space
int rob(const std::vector<int>& nums) {
    int prev2 = 0, prev1 = 0;
    for (int n : nums) {
        int curr = std::max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// Climbing Stairs - O(n), O(1) space
int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b; b = c;
    }
    return b;
}

// Coin Change (minimum coins) - O(amount * coins), O(amount) space
int coinChange(const std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i)
                dp[i] = std::min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
          },
        },
      ],
    },
    {
      id: '2d-dp',
      title: '2D DP Patterns',
      content: `**Pattern 1: Grid paths (Unique Paths)**
\`dp[i][j] = dp[i-1][j] + dp[i][j-1]\`

**Pattern 2: Longest Common Subsequence (LCS)**
\`dp[i][j] = dp[i-1][j-1] + 1 if match, else max(dp[i-1][j], dp[i][j-1])\`

**Pattern 3: Edit Distance**
\`dp[i][j] = min(insert, delete, replace)\`

**Pattern 4: 0/1 Knapsack**
\`dp[i][w] = max(dp[i-1][w], dp[i-1][w-wi] + vi)\``,
      codeExamples: [
        {
          title: '2D DP templates',
          code: {
            csharp: `// Longest Common Subsequence - O(m*n)
int LCS(string text1, string text2) {
    int m = text1.Length, n = text2.Length;
    var dp = new int[m + 1, n + 1];

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1])
                dp[i, j] = dp[i - 1, j - 1] + 1;
            else
                dp[i, j] = Math.Max(dp[i - 1, j], dp[i, j - 1]);
        }
    }
    return dp[m, n];
}

// 0/1 Knapsack - O(n * capacity)
int Knapsack(int[] weights, int[] values, int capacity) {
    int n = weights.Length;
    var dp = new int[n + 1, capacity + 1];

    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w)
                dp[i, w] = Math.Max(
                    dp[i - 1, w],
                    dp[i - 1, w - weights[i - 1]] + values[i - 1]
                );
            else
                dp[i, w] = dp[i - 1, w];
        }
    }
    return dp[n, capacity];
}`,
            python: `# Longest Common Subsequence - O(m*n)
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]

# 0/1 Knapsack - O(n * capacity)
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                )
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][capacity]`,
            java: `// Longest Common Subsequence - O(m*n)
public int lcs(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1))
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}

// 0/1 Knapsack - O(n * capacity)
public int knapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    int[][] dp = new int[n + 1][capacity + 1];

    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w)
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][capacity];
}`,
            javascript: `// Longest Common Subsequence - O(m*n)
const lcs = (text1, text2) => {
    const m = text1.length, n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
};

// 0/1 Knapsack - O(n * capacity)
const knapsack = (weights, values, capacity) => {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w)
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][capacity];
};`,
          cpp: `#include <vector>
#include <algorithm>
#include <string>

// Longest Common Subsequence - O(m*n)
int lcs(const std::string& text1, const std::string& text2) {
    int m = text1.size(), n = text2.size();
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}

// 0/1 Knapsack - O(n * capacity)
int knapsack(const std::vector<int>& weights, const std::vector<int>& values, int capacity) {
    int n = weights.size();
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(capacity + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w)
                dp[i][w] = std::max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][capacity];
}`,
          },
        },
      ],
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes / Gotchas',
      content: `**Wrong base case**
A single off-by-one in the base case propagates to every computed value. Always test small inputs (n=0, n=1, n=2) before scaling up.

**Wrong iteration order in bottom-up DP**
If \`dp[i]\` depends on \`dp[i-1]\`, you iterate forward. If it depends on \`dp[i+1]\`, you iterate backward. Getting this wrong uses stale or uninitialized values.

**Forgetting to pass the memo dictionary**
In top-down DP, if you create a new memo on each recursive call, nothing is cached and you're back to exponential time. Pass the memo by reference.

**"I can use DP for everything"**
DP is only for problems with overlapping subproblems. If subproblems don't overlap (divide and conquer), DP adds unnecessary complexity. If greedy works, DP is overkill.

**Confusing 0/1 knapsack with unbounded knapsack**
In 0/1 knapsack, each item can be used at most once (iterate items outer loop, capacity inner loop). In unbounded knapsack, items can be reused (iterate capacity outer loop, coins inner loop). Swapping the loops gives wrong answers.

**DP array size off-by-one**
\`dp[n]\` for an n-element problem often needs size n+1 (dp[0] for empty/base case). Forgetting the extra slot causes index out of bounds.`,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Fibonacci-style** - climbing stairs, house robber, decode ways
2. **Grid DP** - unique paths, min path sum, maximal square
3. **Two sequences** - LCS, edit distance, wildcard matching
4. **Knapsack / subset sum** - partition equal subset sum, coin change
5. **DP on intervals** - burst balloons, matrix chain multiplication
6. **DP on trees** - tree diameter, max path sum (post-order traversal)

**Quick checklist to find the DP recurrence:**
1. Define the state (what does dp[i] represent?)
2. Find the recurrence (how does dp[i] relate to previous states?)
3. Set base cases
4. Determine iteration order`,
    },
  ],
  problemIds: ['climbing-stairs', 'house-robber', 'coin-change', 'longest-increasing-subsequence', 'longest-common-subsequence'],
};
