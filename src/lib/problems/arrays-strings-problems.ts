import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'two-sum-array',
    title: 'Two Sum (Brute Force)',
    topicId: 'arrays-strings',
    difficulty: 'easy',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`. Solve this without using a hash map (O(nÂ²) solution).`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3,2,4], target = 6', output: '[1, 2]' },
    ],
    constraints: ['2 <= nums.length <= 10Â³', 'Only one valid answer exists.'],
    hints: ['Use two nested loops.', 'Outer loop i from 0 to n-1, inner loop j from i+1 to n-1.'],
    solution: {
      csharp: `public int[] TwoSum(int[] nums, int target) {
    for (int i = 0; i < nums.Length; i++) {
        for (int j = i + 1; j < nums.Length; j++) {
            if (nums[i] + nums[j] == target)
                return new int[] { i, j };
        }
    }
    return new int[0];
}`,
      python: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
`,
      java: `public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target)
                return new int[] { i, j };
        }
    }
    return new int[0];
}`,
      javascript: `function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target)
                return [i, j];
        }
    }
    return [];
}`,
      cpp: `#include <vector>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    for (size_t i = 0; i < nums.size(); i++) {
        for (size_t j = i + 1; j < nums.size(); j++) {
            if (nums[i] + nums[j] == target)
                return {static_cast<int>(i), static_cast<int>(j)};
        }
    }
    return {};
}`,
    },
    timeComplexity: 'O(nÂ²)',
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
    constraints: ['1 <= prices.length <= 10âµ', '0 <= prices[i] <= 10â´'],
    hints: ['Track the minimum price seen so far.', 'At each price, calculate profit = current - minPrice.'],
    solution: {
      csharp: `public int MaxProfit(int[] prices) {
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
      python: `def max_profit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        else:
            max_profit = max(max_profit, price - min_price)
    return max_profit
`,
      java: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;
    for (int price : prices) {
        if (price < minPrice)
            minPrice = price;
        else
            maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
      javascript: `function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const price of prices) {
        if (price < minPrice)
            minPrice = price;
        else
            maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
      cpp: `#include <vector>
#include <climits>
#include <algorithm>

int maxProfit(const std::vector<int>& prices) {
    int minPrice = INT_MAX;
    int maxProfit = 0;
    for (int price : prices) {
        if (price < minPrice)
            minPrice = price;
        else
            maxProfit = std::max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
    },
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
    constraints: ['2 <= nums.length <= 10âµ', '-30 <= nums[i] <= 30'],
    hints: ['Use prefix and suffix products.', 'First pass: compute prefix products. Second pass: multiply by suffix.'],
    solution: {
      csharp: `public int[] ProductExceptSelf(int[] nums) {
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
      python: `def product_except_self(nums):
    n = len(nums)
    result = [1] * n
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    return result
`,
      java: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, 1);
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
      javascript: `function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}`,
      cpp: `#include <vector>

std::vector<int> productExceptSelf(const std::vector<int>& nums) {
    int n = nums.size();
    std::vector<int> result(n, 1);
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
    },
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
    constraints: ['0 <= s.length <= 5 * 10â´'],
    hints: ['Use sliding window with a hash set.', 'When you see a duplicate, shrink the window from the left.'],
    solution: {
      csharp: `public int LengthOfLongestSubstring(string s) {
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
      python: `def length_of_longest_substring(s):
    chars = set()
    max_len = left = 0
    for right in range(len(s)):
        while s[right] in chars:
            chars.remove(s[left])
            left += 1
        chars.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len
`,
      java: `public int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        while (set.contains(s.charAt(right))) {
            set.remove(s.charAt(left));
            left++;
        }
        set.add(s.charAt(right));
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      javascript: `function lengthOfLongestSubstring(s) {
    const set = new Set();
    let maxLen = 0, left = 0;
    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      cpp: `#include <string>
#include <unordered_set>
#include <algorithm>

int lengthOfLongestSubstring(const std::string& s) {
    std::unordered_set<char> set;
    int maxLen = 0, left = 0;
    for (int right = 0; right < (int)s.length(); right++) {
        while (set.count(s[right])) {
            set.erase(s[left]);
            left++;
        }
        set.insert(s[right]);
        maxLen = std::max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
    },
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
    constraints: ['1 <= s.length <= 2 * 10âµ'],
    hints: ['Use two pointers from opposite ends.', 'Skip non-alphanumeric characters.'],
    solution: {
      csharp: `public bool IsPalindrome(string s) {
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
      python: `def is_palindrome(s):
    i, j = 0, len(s) - 1
    while i < j:
        while i < j and not s[i].isalnum():
            i += 1
        while i < j and not s[j].isalnum():
            j -= 1
        if s[i].lower() != s[j].lower():
            return False
        i += 1
        j -= 1
    return True
`,
      java: `public boolean isPalindrome(String s) {
    int i = 0, j = s.length() - 1;
    while (i < j) {
        while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++;
        while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--;
        if (Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j)))
            return false;
        i++; j--;
    }
    return true;
}`,
      javascript: `function isPalindrome(s) {
    let i = 0, j = s.length - 1;
    while (i < j) {
        while (i < j && !/[a-zA-Z0-9]/.test(s[i])) i++;
        while (i < j && !/[a-zA-Z0-9]/.test(s[j])) j--;
        if (s[i].toLowerCase() !== s[j].toLowerCase())
            return false;
        i++; j--;
    }
    return true;
}`,
      cpp: `#include <string>
#include <cctype>

bool isPalindrome(const std::string& s) {
    int i = 0, j = s.length() - 1;
    while (i < j) {
        while (i < j && !std::isalnum(s[i])) i++;
        while (i < j && !std::isalnum(s[j])) j--;
        if (std::tolower(s[i]) != std::tolower(s[j]))
            return false;
        i++; j--;
    }
    return true;
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
];
