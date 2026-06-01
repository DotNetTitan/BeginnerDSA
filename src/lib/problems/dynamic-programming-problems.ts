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
    solution: `public int ClimbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
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
    solution: `public int Rob(int[] nums) {
    int prev2 = 0, prev1 = 0;
    foreach (var n in nums) {
        int curr = Math.Max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
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
    constraints: ['1 <= coins.length <= 12', '1 <= amount <= 10⁴'],
    hints: ['dp[i] = min(dp[i], dp[i - coin] + 1) for each coin.', 'Initialize dp with amount+1 as a sentinel.'],
    solution: `public int CoinChange(int[] coins, int amount) {
    var dp = new int[amount + 1];
    Array.Fill(dp, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++)
        foreach (var coin in coins)
            if (coin <= i)
                dp[i] = Math.Min(dp[i], dp[i - coin] + 1);

    return dp[amount] > amount ? -1 : dp[amount];
}`,
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
    solution: `public int LengthOfLIS(int[] nums) {
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
    solution: `public int LongestCommonSubsequence(string text1, string text2) {
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
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
  },
];
