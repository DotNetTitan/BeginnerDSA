import type { Topic } from '../types';

export const topic: Topic = {
  id: 'dynamic-programming',
  title: 'Dynamic Programming',
  icon: 'BrainCircuit',
  order: 11,
  description: 'Optimization through memoization and tabulation. The hardest topic — but pattern recognition makes it solvable.',
  difficulty: 'advanced',
  prerequisites: ['big-o', 'arrays-strings', 'recursion'],
  theory: [
    {
      id: 'dp-basics',
      title: 'What is Dynamic Programming?',
      content: `Dynamic Programming = **recursion + memoization**. Solve problems by breaking them into overlapping subproblems and caching results.

**Two approaches:**
1. **Top-down (memoization)** — recursive with cache
2. **Bottom-up (tabulation)** — iterative, filling a table

**When to use DP:**
1. Problem asks for **count**, **max/min**, or **true/false** (is it possible?)
2. Problem can be broken into **smaller subproblems**
3. Subproblems **overlap** (not just divide & conquer)

**DP is NOT needed when:** Subproblems don't overlap (use divide & conquer) or greedy works.`,
      codeExamples: [
        {
          title: 'Top-down vs bottom-up (Fibonacci)',
          code: `// Top-down (memoization) — O(n) time, O(n) space
int FibMemo(int n, Dictionary<int, int> memo = null) {
    memo ??= new Dictionary<int, int>();
    if (n <= 1) return n;
    if (memo.ContainsKey(n)) return memo[n];
    return memo[n] = FibMemo(n - 1, memo) + FibMemo(n - 2, memo);
}

// Bottom-up (tabulation) — O(n) time, O(1) space
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

// Bottom-up (full table) — O(n) time, O(n) space
int FibTable(int n) {
    if (n <= 1) return n;
    var dp = new int[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}`,
          language: 'csharp',
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
          code: `// House Robber — O(n), O(1) space
int Rob(int[] nums) {
    int prev2 = 0, prev1 = 0;
    foreach (var n in nums) {
        int curr = Math.Max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// Climbing Stairs — O(n), O(1) space
int ClimbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b; b = c;
    }
    return b;
}

// Coin Change (minimum coins) — O(amount * coins), O(amount) space
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
          language: 'csharp',
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
          code: `// Longest Common Subsequence — O(m*n)
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

// 0/1 Knapsack — O(n * capacity)
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
          language: 'csharp',
        },
      ],
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Fibonacci-style** — climbing stairs, house robber, decode ways
2. **Grid DP** — unique paths, min path sum, maximal square
3. **Two sequences** — LCS, edit distance, wildcard matching
4. **Knapsack / subset sum** — partition equal subset sum, coin change
5. **DP on intervals** — burst balloons, matrix chain multiplication
6. **DP on trees** — tree diameter, max path sum (post-order traversal)

**Quick checklist to find the DP recurrence:**
1. Define the state (what does dp[i] represent?)
2. Find the recurrence (how does dp[i] relate to previous states?)
3. Set base cases
4. Determine iteration order`,
    },
  ],
  problemIds: ['climbing-stairs', 'house-robber', 'coin-change', 'longest-increasing-subsequence', 'longest-common-subsequence'],
};
