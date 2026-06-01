import type { Topic } from '../types';

export const topic: Topic = {
  id: 'arrays-strings',
  title: 'Arrays & Strings',
  icon: 'List',
  order: 2,
  description: 'The most fundamental data structures. Master traversal, two-pointer, sliding window, and in-place manipulation.',
  difficulty: 'beginner',
  prerequisites: ['big-o'],
  theory: [
    {
      id: 'array-basics',
      title: 'Array Basics',
      content: `Arrays store elements in **contiguous memory** with O(1) index-based access. In C#, arrays are fixed-size. Use \`List<T>\` for dynamic sizing.

| Operation | Array | List<T> |
|---|---|---|
| Access by index | O(1) | O(1) |
| Search (unsorted) | O(n) | O(n) |
| Insert at end | N/A (fixed) | O(1) amortized |
| Insert at middle | O(n) (shift) | O(n) |
| Remove at end | N/A | O(1) |
| Remove at middle | O(n) | O(n) |`,
      codeExamples: [
        {
          title: 'Array vs List declarations',
          code: `// Fixed-size array
int[] arr = new int[5] { 1, 2, 3, 4, 5 };

// Dynamic list
List<int> list = new List<int> { 1, 2, 3 };
list.Add(4);                    // O(1) amortized
list.Insert(0, 0);              // O(n) — shifts elements
list.RemoveAt(1);               // O(n) — shifts elements

// Array utilities
Array.Sort(arr);                // O(n log n)
Array.Reverse(arr);             // O(n)
int index = Array.IndexOf(arr, 3); // O(n)`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'two-pointer',
      title: 'Two-Pointer Technique',
      content: `Two pointers iterate from different positions toward each other (or in the same direction at different speeds). Useful for **sorted arrays**, **palindromes**, and **in-place reversal**.

Common patterns:
1. **Opposite ends** — one at start, one at end, move toward each other
2. **Same direction** — slow and fast pointer (also used in linked lists)
3. **Sliding window** — maintain a window that expands/contracts`,
      codeExamples: [
        {
          title: 'Two pointers from opposite ends',
          code: `// Reverse an array in-place — O(n), O(1) space
void Reverse(int[] arr) {
    int left = 0, right = arr.Length - 1;
    while (left < right) {
        (arr[left], arr[right]) = (arr[right], arr[left]);
        left++;
        right--;
    }
}

// Check if a string is a palindrome — O(n), O(1) space
bool IsPalindrome(string s) {
    int i = 0, j = s.Length - 1;
    while (i < j) {
        if (s[i] != s[j]) return false;
        i++; j--;
    }
    return true;
}`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'sliding-window',
      title: 'Sliding Window',
      content: `A window (subarray) slides across the array. Used for subarray problems like **max sum subarray of size k** or **longest substring without repeating characters**.

**Fixed window**: Window size is constant.
**Variable window**: Window expands and contracts based on a condition.

Complexity: O(n) — each element enters and leaves the window at most once.`,
      codeExamples: [
        {
          title: 'Fixed-size sliding window',
          code: `// Max sum of any subarray of size k — O(n)
int MaxSumSubarray(int[] arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++)
        windowSum += arr[i];

    int maxSum = windowSum;
    for (int i = k; i < arr.Length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.Max(maxSum, windowSum);
    }
    return maxSum;
}`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'string-gotchas',
      title: 'C# String Gotchas',
      content: `**Strings are immutable** in C#. Every "modification" creates a new string. Use \`StringBuilder\` for heavy string manipulation.

\`\`\`csharp
// BAD — O(n²) time, creates n intermediate strings
string s = "";
for (int i = 0; i < 100000; i++)
    s += i.ToString();

// GOOD — O(n) time
var sb = new StringBuilder();
for (int i = 0; i < 100000; i++)
    sb.Append(i);
string result = sb.ToString();
\`\`\`

**Common string operations:**
- \`s.ToCharArray()\` — O(n)
- \`s.Substring(start, length)\` — O(length) in .NET 7+
- \`s.ToLower() / s.ToUpper()\` — O(n)
- \`string.Join(",", arr)\` — O(n)
- \`s.Split(delimiter)\` — O(n)`,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Two Sum variant** — use a hash map for O(n) lookup
2. **In-place array manipulation** — maintain a "write index"
3. **Prefix sum** — precompute cumulative sums for O(1) range sum queries
4. **String builder** — anytime you need to build/modify a string in a loop
5. **Character counting** — use int[26] for lowercase letters, Dictionary<char,int> for general`,
    },
  ],
  problemIds: ['two-sum-array', 'best-time-stock', 'product-except-self', 'longest-substring-no-repeat', 'valid-palindrome'],
};
