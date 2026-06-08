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
      id: 'why-arrays',
      title: 'Why Arrays?',
      content: `In the last module, you learned to analyze code speed with Big O. Now you get to apply it.

Arrays are the simplest and most fundamental data structure. Almost everything else in computer science builds on them. A string is just an array of characters. A matrix is an array of arrays. Hash maps, heaps, and graphs all use arrays under the hood.

Think of an array as a row of lockers. Each locker has a number (its **index**), and you can walk straight to locker #42 without checking lockers #1 through #41. That instant access by position is what makes arrays special.

But arrays aren't perfect for everything. You'll see why in this module - and that's what will motivate the data structures in the modules ahead.`,
    },
    {
      id: 'array-basics',
      title: 'Array Basics',
      content: `Arrays store elements in **contiguous memory** - meaning the elements are placed right next to each other in memory. This is why index-based access is O(1): the computer can calculate the exact memory address of arr[42] instantly.

**Two flavors:**
- **Fixed-size array** - the size is set at creation and can't change
- **Dynamic array** (called List in C#, ArrayList in Java, vector in C++, list in Python/JS) - automatically grows when you add elements

Here's how they compare:`,
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
            typescript: `// Fixed-size array
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
      table: {
        headers: ['Operation', 'Array', 'Dynamic Array'],
        rows: [
          ['Access by index', 'O(1)', 'O(1)'],
          ['Search (unsorted)', 'O(n)', 'O(n)'],
          ['Insert at end', 'N/A (fixed)', 'O(1) amortized'],
          ['Insert at middle', 'O(n) (shift)', 'O(n)'],
          ['Remove at end', 'N/A', 'O(1)'],
          ['Remove at middle', 'O(n)', 'O(n)'],
        ],
      },
    },
    {
      id: 'two-pointer',
      title: 'Two-Pointer Technique',
      content: `Here's your first array pattern. The **two-pointer technique** uses two indices to traverse the array - often from opposite ends moving toward each other, or at different speeds in the same direction.

This is useful for:
1. **Opposite ends** - palindrome checking, reversing an array in-place
2. **Same direction (slow/fast)** - finding cycles, removing duplicates (we'll revisit this with Linked Lists)
3. **Sliding window** - the next section

The beauty? These are all O(n) time with O(1) extra space.`,
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
            typescript: `// Reverse an array in-place - O(n), O(1) space
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
      content: `The **sliding window** is a two-pointer variant where you maintain a **window** (a subarray) that slides across the array. Each element enters the window once and leaves it once - O(n) total.

- **Fixed window**: the window stays the same size (e.g., "maximum sum of any 3 consecutive elements")
- **Variable window**: the window grows and shrinks based on a condition (e.g., "shortest subarray that sums to at least k")

This pattern shows up constantly in interview problems. Once you see it, you won't unsee it.`,
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
            typescript: `// Max sum of any subarray of size k - O(n)
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
      title: 'When Arrays Shine (and When They Don\'t)',
      content: `**Arrays are the right choice when:**
- You need **O(1) access by index** - jump to any position instantly
- You process elements in **sequential order** (a single pass)
- The **size is known ahead of time** (or bounded and predictable)
- You want **cache-friendly access** - contiguous memory means faster reads

**Arrays are NOT the right choice when:**
- You frequently **insert or delete at the beginning** - every element has to shift (O(n) each time). A linked list handles this better.
- You need **fast membership lookup** - scanning an unsorted array is O(n). A hash set handles this in O(1).
- The size is completely unknown - though dynamic arrays handle this pretty well.

**Quick guide:**
| What you need | Best tool |
|---|---|
| "Find element by position" | Array (O(1) index) |
| "Frequent insert/remove at front" | Linked List |
| "Check if something exists" | Hash Set |
| "Process in order, one pass" | Array |
| "Pair elements by key" | Hash Map |`,
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes',
      content: `**Off-by-one: forgetting arrays are 0-indexed**
\`for (int i = 0; i <= arr.Length; i++)\` - this tries to access arr[arr.Length] on the last iteration, which is out of bounds. Always use \`i < length\`, not \`i <= length\`.

**Mutating an array while iterating**
Removing elements during a forward loop messes up indices. Either iterate backward or build a new list.

**String immutability in loops**
In most languages, \`s = s + c\` in a loop creates a new string every iteration - O(n²) total. Use StringBuilder / \`''.join()\` / array append instead.

**Confusing "length" with "last index"**
If an array has length n, the last valid index is n-1, not n.

**"Two-pointer only works on sorted arrays"**
Not true! Two-pointer also works on unsorted arrays for problems like "move zeros to the end" or "remove duplicates in-place" using slow/fast pointers.`,
    },
    {
      id: 'common-patterns',
      title: 'Key Patterns to Remember',
      content: `1. **Two Sum** - use a hash map for O(n) lookup (see the next module)
2. **In-place manipulation** - maintain a "write index" for O(1) space
3. **Prefix sum** - precompute cumulative sums for O(1) range queries
4. **String builder** - any time you're building a string in a loop, use the right tool
5. **Character counting** - use int[26] for lowercase letters, or a dictionary for general unicode`,
    },
    {
      id: 'whats-next',
      title: 'What\'s Next?',
      content: `You now know the most basic data structure - and you've already seen its limits. Scanning an array for a specific value takes O(n) time. What if you need to answer "does this exist?" a million times?

That's where **HashMaps & Sets** come in. They trade away ordering (you can't ask "what's at position 42?") for O(1) lookups. If arrays are a row of lockers, hash maps are a coat check - you hand over your ticket and get your coat instantly, but you can't ask "what's in the 42nd coat slot?"

**Next up: HashMaps & Sets**`,
    },
  ],
  problemIds: ['two-sum-array', 'best-time-stock', 'product-except-self', 'longest-substring-no-repeat', 'valid-palindrome'],
};
