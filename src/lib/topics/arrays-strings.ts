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
      content: `Arrays store elements in **contiguous memory** with O(1) index-based access. Arrays are fixed-size. Use a dynamic array for dynamic sizing.

| Operation | Array | Dynamic Array |
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
          code: {
            csharp: `// Fixed-size array
int[] arr = new int[5] { 1, 2, 3, 4, 5 };

// Dynamic list
List<int> list = new List<int> { 1, 2, 3 };
list.Add(4);                    // O(1) amortized
list.Insert(0, 0);              // O(n) - shifts elements
list.RemoveAt(1);               // O(n) - shifts elements

// Array utilities
Array.Sort(arr);                // O(n log n)
Array.Reverse(arr);             // O(n)
int index = Array.IndexOf(arr, 3); // O(n)`,
            python: `# Fixed-size list
arr = [1, 2, 3, 4, 5]

# Dynamic list
lst = [1, 2, 3]
lst.append(4)                    # O(1) amortized
lst.insert(0, 0)                # O(n) - shifts elements
lst.pop(1)                      # O(n) - shifts elements

# List utilities
arr.sort()                      # O(n log n)
arr.reverse()                   # O(n)
index = arr.index(3)            # O(n) - raises ValueError if not found`,
            java: `import java.util.*;

// Fixed-size array
int[] arr = {1, 2, 3, 4, 5};

// Dynamic list
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));
list.add(4);                        // O(1) amortized
list.add(0, 0);                     // O(n) - shifts elements
list.remove(1);                     // O(n) - shifts elements

// Array utilities
Arrays.sort(arr);                   // O(n log n)
// Reverse: no built-in, manual swap
int index = Arrays.binarySearch(arr, 3); // O(log n) - requires sorted`,
            javascript: `// Fixed-size array
const arr = [1, 2, 3, 4, 5];

// Dynamic array
const list = [1, 2, 3];
list.push(4);                      // O(1) amortized
list.splice(0, 0, 0);             // O(n) - shifts elements
list.splice(1, 1);                // O(n) - shifts elements

// Array utilities
arr.sort((a, b) => a - b);        // O(n log n)
arr.reverse();                    // O(n)
const index = arr.indexOf(3);     // O(n)`,
          cpp: `#include <vector>
#include <algorithm>
#include <iostream>

// Fixed-size array (C-style)
int arr[5] = {1, 2, 3, 4, 5};

// Dynamic vector
std::vector<int> vec = {1, 2, 3};
vec.push_back(4);                    // O(1) amortized
vec.insert(vec.begin(), 0);          // O(n) - shifts elements
vec.erase(vec.begin() + 1);          // O(n) - shifts elements

// Vector utilities
std::sort(vec.begin(), vec.end());   // O(n log n)
std::reverse(vec.begin(), vec.end());// O(n)
auto it = std::find(vec.begin(), vec.end(), 3); // O(n)
int index = (int)(it - vec.begin());`,
          },
        },
      ],
    },
    {
      id: 'two-pointer',
      title: 'Two-Pointer Technique',
      content: `Two pointers iterate from different positions toward each other (or in the same direction at different speeds). Useful for **sorted arrays**, **palindromes**, and **in-place reversal**.

Common patterns:
1. **Opposite ends** - one at start, one at end, move toward each other
2. **Same direction** - slow and fast pointer (also used in linked lists)
3. **Sliding window** - maintain a window that expands/contracts`,
      codeExamples: [
        {
          title: 'Two pointers from opposite ends',
          code: {
            csharp: `// Reverse an array in-place - O(n), O(1) space
void Reverse(int[] arr) {
    int left = 0, right = arr.Length - 1;
    while (left < right) {
        (arr[left], arr[right]) = (arr[right], arr[left]);
        left++;
        right--;
    }
}

// Check if a string is a palindrome - O(n), O(1) space
bool IsPalindrome(string s) {
    int i = 0, j = s.Length - 1;
    while (i < j) {
        if (s[i] != s[j]) return false;
        i++; j--;
    }
    return true;
}`,
            python: `# Reverse an array in-place - O(n), O(1) space
def reverse(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

# Check if a string is a palindrome - O(n), O(1) space
def is_palindrome(s):
    i, j = 0, len(s) - 1
    while i < j:
        if s[i] != s[j]:
            return False
        i += 1
        j -= 1
    return True`,
            java: `// Reverse an array in-place - O(n), O(1) space
public void reverse(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int tmp = arr[left];
        arr[left] = arr[right];
        arr[right] = tmp;
        left++;
        right--;
    }
}

// Check if a string is a palindrome - O(n), O(1) space
public boolean isPalindrome(String s) {
    int i = 0, j = s.length() - 1;
    while (i < j) {
        if (s.charAt(i) != s.charAt(j)) return false;
        i++; j--;
    }
    return true;
}`,
            javascript: `// Reverse an array in-place - O(n), O(1) space
const reverse = (arr) => {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
};

// Check if a string is a palindrome - O(n), O(1) space
const isPalindrome = (s) => {
    let i = 0, j = s.length - 1;
    while (i < j) {
        if (s[i] !== s[j]) return false;
        i++; j--;
    }
    return true;
};`,
          cpp: `// Reverse an array in-place - O(n), O(1) space
void reverse(std::vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        std::swap(arr[left], arr[right]);
        left++;
        right--;
    }
}

// Check if a string is a palindrome - O(n), O(1) space
bool isPalindrome(const std::string& s) {
    int i = 0, j = s.size() - 1;
    while (i < j) {
        if (s[i] != s[j]) return false;
        i++; j--;
    }
    return true;
}`,
          },
        },
      ],
    },
    {
      id: 'sliding-window',
      title: 'Sliding Window',
      content: `A window (subarray) slides across the array. Used for subarray problems like **max sum subarray of size k** or **longest substring without repeating characters**.

**Fixed window**: Window size is constant.
**Variable window**: Window expands and contracts based on a condition.

Complexity: O(n) - each element enters and leaves the window at most once.`,
      codeExamples: [
        {
          title: 'Fixed-size sliding window',
          code: {
            csharp: `// Max sum of any subarray of size k - O(n)
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
            python: `# Max sum of any subarray of size k - O(n)
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum`,
            java: `// Max sum of any subarray of size k - O(n)
public int maxSumSubarray(int[] arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];

    int maxSum = windowSum;
    for (int i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
            javascript: `// Max sum of any subarray of size k - O(n)
const maxSumSubarray = (arr, k) => {
    let windowSum = 0;
    for (let i = 0; i < k; i++) windowSum += arr[i];

    let maxSum = windowSum;
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
};`,
          cpp: `#include <vector>
#include <algorithm>

// Max sum of any subarray of size k - O(n)
int maxSumSubarray(const std::vector<int>& arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++)
        windowSum += arr[i];

    int maxSum = windowSum;
    for (int i = k; i < arr.size(); i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = std::max(maxSum, windowSum);
    }
    return maxSum;
}`,
          },
        },
      ],
    },
    {
      id: 'when-to-use-arrays',
      title: 'When to Use Arrays',
      content: `**Arrays are the right choice when:**
- You need **O(1) access by index** (random access)
- You process elements in **sequential order** (iterating once)
- The **size is known ahead of time** (or bounded)
- You need **contiguous memory** for cache-friendly access

**Arrays are NOT the right choice when:**
- You frequently **insert or delete at the beginning** (use linked list)
- The **size changes unpredictably** and you can't pre-allocate (use dynamic array, still fine)
- You need **fast membership lookup** (use a hash set)

**Decision guide:**
| Signal | Best choice |
|---|---|
| "Find element by position" | Array (O(1) index) |
| "Frequent insert/remove at front" | Linked list |
| "Check if something exists" | Hash set |
| "Process in order, one pass" | Array |
| "Pair elements by key" | Hash map (from arrays) |`,
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes / Gotchas',
      content: `**Off-by-one: forgetting arrays are 0-indexed**
\`for (int i = 0; i <= arr.Length; i++)\` accesses arr[arr.Length] which is out of bounds.

**Mutating an array while iterating over it**
Removing elements during iteration messes up indices. Either iterate backward or build a new list.

**String immutability in loops**
\`s = s + c\` in a loop creates a new string each time - O(n²). Use StringBuilder / join / list append instead.

**Confusing "length" with "last index"**
If arr has length n, the last valid index is n-1, not n.

**"Two-pointer only works on sorted arrays"**
Two-pointer can also work on unsorted arrays for problems like "move zeros" or "remove duplicates in-place" using slow/fast pointers.`,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Two Sum variant** - use a hash map for O(n) lookup
2. **In-place array manipulation** - maintain a "write index"
3. **Prefix sum** - precompute cumulative sums for O(1) range sum queries
4. **String builder** - anytime you need to build/modify a string in a loop
5. **Character counting** - use int[26] for lowercase letters, Dictionary<char,int> for general`,
    },
  ],
  problemIds: ['two-sum-array', 'best-time-stock', 'product-except-self', 'longest-substring-no-repeat', 'valid-palindrome'],
};
