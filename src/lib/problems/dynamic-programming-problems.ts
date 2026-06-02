import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    topicId: 'dynamic-programming',
    difficulty: 'easy',
    description: `You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you reach the top?`,
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1, 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1' },
    ],
    constraints: ['1 <= n <= 45'],
    hints: ['This is the Fibonacci sequence in disguise.', 'dp[i] = dp[i-1] + dp[i-2].'],
    solution: {
      csharp: `public int ClimbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
      python: `def climb_stairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b
`,
      java: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
      javascript: `function climbStairs(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        const c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
      cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'house-robber',
    title: 'House Robber',
    topicId: 'dynamic-programming',
    difficulty: 'medium',
    description: `You are a robber planning to rob houses along a street. Each house has a certain amount of money. Adjacent houses have security systems that will alert police if two adjacent houses are robbed. Return the maximum amount you can rob without alerting police.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (1) and house 3 (3). Total = 4.' },
      { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1 (2), house 3 (9), house 5 (1). Total = 12.' },
    ],
    constraints: ['1 <= nums.length <= 100'],
    hints: ['dp[i] = max(dp[i-1], dp[i-2] + nums[i])', 'Optimize to O(1) space with two variables.'],
    solution: {
      csharp: `public int Rob(int[] nums) {
    int prev2 = 0, prev1 = 0;
    foreach (var n in nums) {
        int curr = Math.Max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      python: `def rob(nums):
    prev2 = prev1 = 0
    for n in nums:
        curr = max(prev1, prev2 + n)
        prev2 = prev1
        prev1 = curr
    return prev1
`,
      java: `public int rob(int[] nums) {
    int prev2 = 0, prev1 = 0;
    for (int n : nums) {
        int curr = Math.max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      javascript: `function rob(nums) {
    let prev2 = 0, prev1 = 0;
    for (const n of nums) {
        const curr = Math.max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      cpp: `#include <vector>
#include <algorithm>

int rob(const std::vector<int>& nums) {
    int prev2 = 0, prev1 = 0;
    for (int n : nums) {
        int curr = std::max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    topicId: 'dynamic-programming',
    difficulty: 'medium',
    description: `Given an array of coin denominations and a target amount, return the fewest number of coins needed to make that amount. If impossible, return -1. You may use each coin an unlimited number of times.`,
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '5 + 5 + 1 = 11' },
      { input: 'coins = [2], amount = 3', output: '-1' },
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= amount <= 10â´'],
    hints: ['dp[i] = min(dp[i], dp[i - coin] + 1) for each coin.', 'Initialize dp with amount+1 as a sentinel.'],
    solution: {
      csharp: `public int CoinChange(int[] coins, int amount) {
    var dp = new int[amount + 1];
    Array.Fill(dp, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++)
        foreach (var coin in coins)
            if (coin <= i)
                dp[i] = Math.Min(dp[i], dp[i - coin] + 1);

    return dp[amount] > amount ? -1 : dp[amount];
}`,
      python: `def coin_change(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return -1 if dp[amount] > amount else dp[amount]
`,
      java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int coin : coins)
            if (coin <= i)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++)
        for (const coin of coins)
            if (coin <= i)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      cpp: `#include <vector>
#include <algorithm>

int coinChange(const std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int coin : coins)
            if (coin <= i)
                dp[i] = std::min(dp[i], dp[i - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
    },
    timeComplexity: 'O(amount * coins)',
    spaceComplexity: 'O(amount)',
  },
  {
    id: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    topicId: 'dynamic-programming',
    difficulty: 'medium',
    description: `Given an unsorted array of integers, find the length of the longest strictly increasing subsequence.`,
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: '[2,3,7,101]' },
      { input: 'nums = [0,1,0,3,2,3]', output: '4' },
    ],
    constraints: ['1 <= nums.length <= 2500'],
    hints: ['dp[i] = 1 + max(dp[j]) for j < i and nums[j] < nums[i].', 'Use patience sorting for O(n log n) solution.'],
    solution: {
      csharp: `public int LengthOfLIS(int[] nums) {
    var tails = new List<int>();

    foreach (var n in nums) {
        int idx = tails.BinarySearch(n);
        if (idx < 0) idx = ~idx;
        if (idx == tails.Count)
            tails.Add(n);
        else
            tails[idx] = n;
    }
    return tails.Count;
}`,
      python: `import bisect

def length_of_lis(nums):
    tails = []
    for n in nums:
        idx = bisect.bisect_left(tails, n)
        if idx == len(tails):
            tails.append(n)
        else:
            tails[idx] = n
    return len(tails)
`,
      java: `public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int n : nums) {
        int idx = Collections.binarySearch(tails, n);
        if (idx < 0) idx = -(idx + 1);
        if (idx == tails.size())
            tails.add(n);
        else
            tails.set(idx, n);
    }
    return tails.size();
}`,
      javascript: `function lengthOfLIS(nums) {
    const tails = [];
    for (const n of nums) {
        let left = 0, right = tails.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < n) left = mid + 1;
            else right = mid;
        }
        if (left === tails.length)
            tails.push(n);
        else
            tails[left] = n;
    }
    return tails.length;
}`,
      cpp: `#include <vector>
#include <algorithm>

int lengthOfLIS(const std::vector<int>& nums) {
    std::vector<int> tails;
    for (int n : nums) {
        auto it = std::lower_bound(tails.begin(), tails.end(), n);
        if (it == tails.end())
            tails.push_back(n);
        else
            *it = n;
    }
    return tails.size();
}`,
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    topicId: 'dynamic-programming',
    difficulty: 'medium',
    description: `Given two strings, return the length of their longest common subsequence (LCS).`,
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: '"ace" is the LCS.' },
      { input: 'text1 = "abc", text2 = "def"', output: '0' },
    ],
    constraints: ['1 <= text1.length, text2.length <= 1000'],
    hints: ['2D DP table where dp[i][j] = LCS of prefixes.', 'If characters match, dp[i][j] = dp[i-1][j-1] + 1.', 'Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).'],
    solution: {
      csharp: `public int LongestCommonSubsequence(string text1, string text2) {
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
}`,
      python: `def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]
`,
      java: `public int longestCommonSubsequence(String text1, String text2) {
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
}`,
      javascript: `function longestCommonSubsequence(text1, text2) {
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
}`,
      cpp: `#include <string>
#include <vector>
#include <algorithm>

int longestCommonSubsequence(const std::string& text1, const std::string& text2) {
    int m = text1.length(), n = text2.length();
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
}`,
    },
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
  },
];
