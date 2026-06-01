import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'two-sum-array',
    title: 'Two Sum (Brute Force)',
    topicId: 'arrays-strings',
    difficulty: 'easy',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`. Solve this without using a hash map (O(n²) solution).`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3,2,4], target = 6', output: '[1, 2]' },
    ],
    constraints: ['2 <= nums.length <= 10³', 'Only one valid answer exists.'],
    hints: ['Use two nested loops.', 'Outer loop i from 0 to n-1, inner loop j from i+1 to n-1.'],
    solution: `public int[] TwoSum(int[] nums, int target) {
    for (int i = 0; i < nums.Length; i++) {
        for (int j = i + 1; j < nums.Length; j++) {
            if (nums[i] + nums[j] == target)
                return new int[] { i, j };
        }
    }
    return new int[0];
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'best-time-stock',
    title: 'Best Time to Buy and Sell Stock',
    topicId: 'arrays-strings',
    difficulty: 'easy',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on day i. You want to maximize your profit by choosing a single day to buy and a different day to sell. Return the maximum profit. If no profit is possible, return 0.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy at 1 (day 2), sell at 6 (day 5). Profit = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No profit possible, return 0.' },
    ],
    constraints: ['1 <= prices.length <= 10⁵', '0 <= prices[i] <= 10⁴'],
    hints: ['Track the minimum price seen so far.', 'At each price, calculate profit = current - minPrice.'],
    solution: `public int MaxProfit(int[] prices) {
    int minPrice = int.MaxValue;
    int maxProfit = 0;

    foreach (var price in prices) {
        if (price < minPrice)
            minPrice = price;
        else
            maxProfit = Math.Max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'product-except-self',
    title: 'Product of Array Except Self',
    topicId: 'arrays-strings',
    difficulty: 'medium',
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`. You must solve it without division and in O(n) time.`,
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' },
    ],
    constraints: ['2 <= nums.length <= 10⁵', '-30 <= nums[i] <= 30'],
    hints: ['Use prefix and suffix products.', 'First pass: compute prefix products. Second pass: multiply by suffix.'],
    solution: `public int[] ProductExceptSelf(int[] nums) {
    int n = nums.Length;
    var result = new int[n];
    Array.Fill(result, 1);

    int prefix = 1;
    for (int i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'longest-substring-no-repeat',
    title: 'Longest Substring Without Repeating Characters',
    topicId: 'arrays-strings',
    difficulty: 'medium',
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: '"abc" has length 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: '"b" has length 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: '"wke" has length 3.' },
    ],
    constraints: ['0 <= s.length <= 5 * 10⁴'],
    hints: ['Use sliding window with a hash set.', 'When you see a duplicate, shrink the window from the left.'],
    solution: `public int LengthOfLongestSubstring(string s) {
    var set = new HashSet<char>();
    int maxLen = 0, left = 0;

    for (int right = 0; right < s.Length; right++) {
        while (set.Contains(s[right])) {
            set.Remove(s[left]);
            left++;
        }
        set.Add(s[right]);
        maxLen = Math.Max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
  },
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    topicId: 'arrays-strings',
    difficulty: 'easy',
    description: `A phrase is a palindrome if it reads the same forward and backward after converting to lowercase and removing all non-alphanumeric characters. Given a string \`s\`, return true if it is a palindrome.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false' },
    ],
    constraints: ['1 <= s.length <= 2 * 10⁵'],
    hints: ['Use two pointers from opposite ends.', 'Skip non-alphanumeric characters.'],
    solution: `public bool IsPalindrome(string s) {
    int i = 0, j = s.Length - 1;

    while (i < j) {
        while (i < j && !char.IsLetterOrDigit(s[i])) i++;
        while (i < j && !char.IsLetterOrDigit(s[j])) j--;

        if (char.ToLower(s[i]) != char.ToLower(s[j]))
            return false;

        i++; j--;
    }
    return true;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
];
