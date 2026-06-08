import type { Topic } from '../types';

export const topic: Topic = {
  id: 'sorting-searching',
  title: 'Searching & Sorting',
  icon: 'ArrowUpDown',
  order: 7,
  description: 'Every interview starts with sorting or searching. Master binary search variants and comparison-based sorting.',
  difficulty: 'intermediate',
  prerequisites: ['big-o', 'arrays-strings', 'recursion'],
  theory: [
    {
      id: 'why-search-sort',
      title: 'Two Problems You\'ll Solve Every Day',
      content: `**Finding things** and **ordering things** - these are the two most common operations in programming.

You've been searching since Module 1. The phone book problem? That was binary search. Checking if something exists in an array? That's linear search. Now you'll learn to implement both properly.

And sorting - why does it matter? Because sorted data makes many problems trivial. Finding a value in an unsorted array is O(n). In a sorted array, it's O(log n). Finding duplicates in an unsorted array might require a hash set; in a sorted array, they're right next to each other.

Many interview problems follow the pattern: **"sort first, then solve."** Learning when and how to sort is a superpower.`,
    },
    {
      id: 'linear-search',
      title: 'Linear Search - The Brute Force',
      content: `Linear search checks every element one by one until it finds the target. It's the simplest search - no preprocessing needed, works on any data.

| | Linear Search |
|---|---|
| Time | O(n) |
| Space | O(1) |
| Requires sorted? | No |

**When to use:**
- Small or unsorted arrays
- One-time search (sorting just to use binary search would cost more)
- When you need to find all occurrences

Despite being "slow" on paper, linear search is often the right choice for small inputs.`,
      codeExamples: [
        {
          title: 'Linear search implementation',
          code: {
            csharp: `// Linear search - O(n)
int LinearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.Length; i++)
        if (arr[i] == target) return i;
    return -1;
}

// Find all occurrences
List<int> FindAll(int[] arr, int target) {
    var result = new List<int>();
    for (int i = 0; i < arr.Length; i++)
        if (arr[i] == target) result.Add(i);
    return result;
}`,
            python: `# Linear search - O(n)
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Find all occurrences
def find_all(arr, target):
    return [i for i in range(len(arr)) if arr[i] == target]`,
            java: `// Linear search - O(n)
public int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++)
        if (arr[i] == target) return i;
    return -1;
}

// Find all occurrences
public List<Integer> findAll(int[] arr, int target) {
    List<Integer> result = new ArrayList<>();
    for (int i = 0; i < arr.length; i++)
        if (arr[i] == target) result.add(i);
    return result;
}`,
            typescript: `// Linear search - O(n)
const linearSearch = (arr, target) => {
    for (let i = 0; i < arr.length; i++)
        if (arr[i] === target) return i;
    return -1;
};

// Find all occurrences
const findAll = (arr, target) =>
    arr.reduce((acc, val, i) => val === target ? [...acc, i] : acc, []);`,
            cpp: `// Linear search - O(n)
int linearSearch(const std::vector<int>& arr, int target) {
    for (size_t i = 0; i < arr.size(); i++)
        if (arr[i] == target) return (int)i;
    return -1;
}

// Find all occurrences
std::vector<int> findAll(const std::vector<int>& arr, int target) {
    std::vector<int> result;
    for (size_t i = 0; i < arr.size(); i++)
        if (arr[i] == target) result.push_back((int)i);
    return result;
}`,
          },
        },
      ],
    },
    {
      id: 'binary-search',
      title: 'Binary Search - Cutting the Problem in Half',
      content: `Binary search finds an element in a **sorted** array by repeatedly dividing the search range in half. Each step eliminates half the remaining elements.

We first saw this in the Big O module with the phone book example. Now you'll implement it.

**Key requirement:** The array must be sorted. If you only need to search once, sorting just to use binary search may not be worth it - linear search might be faster.

**Binary search variants:**
- Standard: find exact target
- Lower bound: first index ≥ target
- Upper bound: first index > target
- Search in a range`,
      codeExamples: [
        {
          title: 'Binary search and its variants',
          code: {
            csharp: `// Standard binary search - O(log n)
int BinarySearch(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Lower bound - first index where arr[i] >= target
int LowerBound(int[] arr, int target) {
    int left = 0, right = arr.Length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

// Upper bound - first index where arr[i] > target
int UpperBound(int[] arr, int target) {
    int left = 0, right = arr.Length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left;
}`,
            python: `# Standard binary search - O(log n)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Lower bound - first index where arr[i] >= target
def lower_bound(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = left + (right - left) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left

# Upper bound - first index where arr[i] > target
def upper_bound(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = left + (right - left) // 2
        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid
    return left`,
            java: `// Standard binary search - O(log n)
public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Lower bound - first index where arr[i] >= target
public int lowerBound(int[] arr, int target) {
    int left = 0, right = arr.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

// Upper bound - first index where arr[i] > target
public int upperBound(int[] arr, int target) {
    int left = 0, right = arr.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left;
}`,
            typescript: `// Standard binary search - O(log n)
const binarySearch = (arr, target) => {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};

// Lower bound - first index where arr[i] >= target
const lowerBound = (arr, target) => {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
};

// Upper bound - first index where arr[i] > target
const upperBound = (arr, target) => {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left;
};`,
          cpp: `#include <vector>
#include <algorithm>

// Standard binary search - O(log n)
int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Lower bound - first index where arr[i] >= target
int lowerBound(const std::vector<int>& arr, int target) {
    return (int)(std::lower_bound(arr.begin(), arr.end(), target) - arr.begin());
}

// Upper bound - first index where arr[i] > target
int upperBound(const std::vector<int>& arr, int target) {
    return (int)(std::upper_bound(arr.begin(), arr.end(), target) - arr.begin());
}`,
          },
        },
      ],
    },

    {
      id: 'search-algorithms',
      title: 'Search Algorithms Comparison',
      content: `| Algorithm | Time | Space | Sorted? | Best For |
|---|---|---|---|---|
| **Linear Search** | O(n) | O(1) | No | Small/unsorted |
| **Binary Search** | O(log n) | O(1) | Yes | Large sorted |
| **BS on Answer** | O(log range) | O(1) | Predicate | Optimization problems |

**When to use what:**
- **Unsorted & small** → Linear Search (no preprocessing cost)
- **Sorted & static** → Binary Search
- **Need O(1) lookup** → Hash Map (from Module 3)
- **Searching in a range of values** → Binary Search on Answer (e.g., "minimum capacity to ship within D days")

Binary search is the most commonly tested in interviews, but knowing *when* linear search is actually the right choice is just as important.`,
    },
    {
      id: 'sorting-algorithms',
      title: 'Sorting Algorithms Overview',
      content: `| Algorithm | Average Time | Worst Time | Space | Stable |
|---|---|---|---|---|
| Bubble Sort | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(1) | No |

Most languages have a built-in sort that's highly optimized. But understanding how these work is essential for interviews - and for knowing which one to reach for when a built-in won't do.`,
    },
    {
      id: 'when-to-sort',
      title: 'Choosing the Right Sort',
      content: `| Decision | Best Choice | Why |
|---|---|---|
| Small input (< 50 items) | Insertion Sort (or built-in) | Simple, fast on small data |
| General purpose, need speed | Quick Sort | In-place, fast average case |
| Need guaranteed O(n log n) | Merge Sort or Heap Sort | No O(n²) worst case |
| Limited memory (O(1) space) | Heap Sort | O(n log n) time, O(1) space |
| Need stable sort | Merge Sort | Preserves relative order of equal elements |
| Nearly sorted data | Insertion Sort | O(n) on nearly-sorted, minimal swaps |
| Don't care | Built-in sort | Optimized for general use |

**Key trade-off:** Quick sort is the interview favorite; learn it well. Merge sort is the "safe" choice with guaranteed performance. Heap sort wins on space.

**Interview tip:** Always ask about constraints before choosing. "Is the data nearly sorted? Do we need stability? What's the input size?"`,
    },
    {
      id: 'bubble-sort',
      title: 'Bubble Sort',
      component: 'bubble-sort-viz',
      content: `Bubble sort repeatedly steps through the array, swapping adjacent elements if they're in the wrong order. Larger elements "bubble up" to their correct position with each pass.

**Why learn it:** It's the simplest sort to understand and teaches the concept of swapping. **Why NOT to use it:** O(n²) makes it impractical for real data.

| Operation | Count |
|---|---|
| Passes | n-1 |
| Comparisons per pass | n-1, n-2, ..., 1 |
| Total comparisons | n(n-1)/2 ≈ O(n²) |`,
      vizLabel: 'Given an unsorted array, arrange the numbers in ascending order by repeatedly swapping adjacent elements that are out of order.',
      codeExamples: [
        {
          title: 'Bubble sort implementation',
          code: {
            csharp: `void BubbleSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                swapped = true;
            }
        }
        if (!swapped) break; // optimization: already sorted
    }
}`,
            python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:  # optimization: already sorted
            break`,
            java: `public void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
            typescript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
            cpp: `void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
          },
        },
      ],
    },
    {
      id: 'quick-sort',
      title: 'Quick Sort',
      component: 'quick-sort-viz',
      content: `Quick sort picks a **pivot**, partitions the array so all elements ≤ pivot come before it, then recursively sorts each side.

**Key advantage:** It sorts in-place, using only O(log n) stack space (compared to Merge Sort's O(n) space).

**Key risk:** Worst-case O(n²) when pivot selection is poor - for example, always picking the last element on an already-sorted array. This is why good implementations use a random pivot or median-of-three.

Quick sort is the most commonly asked sorting implementation in interviews.`,
      vizLabel: 'Given an unsorted array, arrange the numbers in ascending order by selecting a pivot, partitioning around it, and recursing on both sides.',
      codeExamples: [
        {
          title: 'Quick sort with Lomuto partition',
          code: {
            csharp: `void QuickSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int pivot = Partition(arr, left, right);
    QuickSort(arr, left, pivot - 1);
    QuickSort(arr, pivot + 1, right);
}

int Partition(int[] arr, int left, int right) {
    int pivot = arr[right];
    int i = left - 1;
    for (int j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            (arr[i], arr[j]) = (arr[j], arr[i]);
        }
    }
    (arr[i + 1], arr[right]) = (arr[right], arr[i + 1]);
    return i + 1;
}`,
            python: `def quick_sort(arr, left, right):
    if left >= right:
        return
    pivot = partition(arr, left, right)
    quick_sort(arr, left, pivot - 1)
    quick_sort(arr, pivot + 1, right)

def partition(arr, left, right):
    pivot = arr[right]
    i = left - 1
    for j in range(left, right):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[right] = arr[right], arr[i + 1]
    return i + 1`,
            java: `public void quickSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int pivot = partition(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
}

public int partition(int[] arr, int left, int right) {
    int pivot = arr[right];
    int i = left - 1;
    for (int j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }
    int tmp = arr[i + 1]; arr[i + 1] = arr[right]; arr[right] = tmp;
    return i + 1;
}`,
            typescript: `const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return;
    const pivot = partition(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
};

const partition = (arr, left, right) => {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
};`,
            cpp: `void quickSort(std::vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int pivot = partition(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
}

int partition(std::vector<int>& arr, int left, int right) {
    int pivot = arr[right];
    int i = left - 1;
    for (int j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[right]);
    return i + 1;
}`,
          },
        },
      ],
    },
    {
      id: 'merge-sort',
      title: 'Merge Sort',
      component: 'merge-sort-viz',
      content: `Merge sort is a **divide and conquer** algorithm that splits the array in half, recursively sorts each half, then merges the sorted halves.

**Key advantage over Quick Sort:** Guaranteed O(n log n) in all cases - no worst-case O(n²) trap.

**Key disadvantage:** Requires O(n) extra space for merging.

It's also **stable** - equal elements keep their original relative order. This matters when sorting by multiple criteria.`,
      vizLabel: 'Given an unsorted array, arrange the numbers in ascending order by repeatedly splitting in half, sorting each half, then merging the sorted halves.',
      codeExamples: [
        {
          title: 'Merge sort implementation',
          code: {
            csharp: `// Merge sort - O(n log n) time, O(n) space
int[] MergeSort(int[] arr) {
    if (arr.Length <= 1) return arr;

    int mid = arr.Length / 2;
    var left = MergeSort(arr[..mid]);
    var right = MergeSort(arr[mid..]);

    return Merge(left, right);
}

int[] Merge(int[] left, int[] right) {
    var result = new int[left.Length + right.Length];
    int i = 0, j = 0, k = 0;

    while (i < left.Length && j < right.Length)
        result[k++] = left[i] <= right[j] ? left[i++] : right[j++];

    while (i < left.Length) result[k++] = left[i++];
    while (j < right.Length) result[k++] = right[j++];

    return result;
}`,
            python: `# Merge sort - O(n log n) time, O(n) space
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
            java: `public int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;

    int mid = arr.length / 2;
    int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));

    return merge(left, right);
}

public int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;

    while (i < left.length && j < right.length)
        result[k++] = left[i] <= right[j] ? left[i++] : right[j++];

    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];

    return result;
}`,
            typescript: `const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
};

const merge = (left, right) => {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length)
        result.push(left[i] <= right[j] ? left[i++] : right[j++]);

    result.push(...left.slice(i));
    result.push(...right.slice(j));

    return result;
};`,
            cpp: `std::vector<int> mergeSort(const std::vector<int>& arr) {
    if (arr.size() <= 1) return arr;

    int mid = arr.size() / 2;
    auto left = mergeSort(std::vector<int>(arr.begin(), arr.begin() + mid));
    auto right = mergeSort(std::vector<int>(arr.begin() + mid, arr.end()));

    return merge(left, right);
}

std::vector<int> merge(const std::vector<int>& left, const std::vector<int>& right) {
    std::vector<int> result;
    int i = 0, j = 0;

    while (i < left.size() && j < right.size())
        result.push_back(left[i] <= right[j] ? left[i++] : right[j++]);

    result.insert(result.end(), left.begin() + i, left.end());
    result.insert(result.end(), right.begin() + j, right.end());

    return result;
}`,
          },
        },
      ],
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes',
      content: `**Binary search off-by-one: \`left < right\` vs \`left <= right\`**
Use \`left <= right\` when searching for an exact value (standard binary search). Use \`left < right\` when narrowing to a single position (lower bound, rotated array min). Getting this wrong causes infinite loops or missed elements.

**Forgetting to sort before binary search**
Binary search requires a sorted array. Searching an unsorted array with binary search gives random results.

**Sorting without a custom comparator for non-default ordering**
In JavaScript, \`.sort()\` defaults to lexicographic sort: \`[1, 2, 10].sort() = [1, 10, 2]\`. Always pass a comparator: \`.sort((a, b) => a - b)\`.

**Confusing stable vs unstable sort**
A stable sort preserves the relative order of equal elements. Merge sort is stable; quick sort is not. This matters when sorting by multiple criteria (e.g., sort by date, then by priority).

**"Quicksort is always O(n log n)"**
Quick sort degrades to O(n²) on already sorted arrays if pivot selection is poor. Use random pivot selection or median-of-three.

**In-place vs non-in-place confusion**
Merge sort creates new arrays (O(n) space). Quick sort sorts in-place (O(log n) stack space). Don't claim "O(1) space" for merge sort.`,
    },
    {
      id: 'binary-search-rotated',
      title: 'Advanced: Binary Search on a Rotated Array',
      content: `A **rotated sorted array** is a sorted array that's been shifted. Example: [4, 5, 6, 7, 0, 1, 2].

This is a common interview challenge, not a core topic. Make sure you're comfortable with standard binary search before attempting this.

**Key insight:** One half of the array is always normally sorted. Determine which half, then search accordingly.`,
      codeExamples: [
        {
          title: 'Search in rotated sorted array',
          code: {
            csharp: `int SearchRotated(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;

        // Left half is sorted
        if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid])
                right = mid - 1;
            else
                left = mid + 1;
        }
        // Right half is sorted
        else {
            if (target > arr[mid] && target <= arr[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    return -1;
}

// Find minimum in rotated array
int FindMin(int[] arr) {
    int left = 0, right = arr.Length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] > arr[right])
            left = mid + 1;  // min is in right half
        else
            right = mid;     // min is in left half (including mid)
    }
    return arr[left];
}`,
            python: `def search_rotated(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid

        # Left half is sorted
        if arr[left] <= arr[mid]:
            if arr[left] <= target < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if arr[mid] < target <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1

# Find minimum in rotated array
def find_min(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        mid = left + (right - left) // 2
        if arr[mid] > arr[right]:
            left = mid + 1  # min is in right half
        else:
            right = mid     # min is in left half (including mid)
    return arr[left]`,
            java: `public int searchRotated(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;

        // Left half is sorted
        if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid])
                right = mid - 1;
            else
                left = mid + 1;
        }
        // Right half is sorted
        else {
            if (target > arr[mid] && target <= arr[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    return -1;
}

// Find minimum in rotated array
public int findMin(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] > arr[right])
            left = mid + 1;  // min is in right half
        else
            right = mid;     // min is in left half (including mid)
    }
    return arr[left];
}`,
            typescript: `const searchRotated = (arr, target) => {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) return mid;

        // Left half is sorted
        if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid])
                right = mid - 1;
            else
                left = mid + 1;
        }
        // Right half is sorted
        else {
            if (target > arr[mid] && target <= arr[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    return -1;
};

// Find minimum in rotated array
const findMin = (arr) => {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] > arr[right])
            left = mid + 1;  // min is in right half
        else
            right = mid;     // min is in left half (including mid)
    }
    return arr[left];
};`,
          cpp: `#include <vector>
#include <algorithm>

int searchRotated(const std::vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;

        // Left half is sorted
        if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid])
                right = mid - 1;
            else
                left = mid + 1;
        }
        // Right half is sorted
        else {
            if (target > arr[mid] && target <= arr[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    return -1;
}

// Find minimum in rotated array
int findMin(const std::vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] > arr[right])
            left = mid + 1;  // min is in right half
        else
            right = mid;     // min is in left half (including mid)
    }
    return arr[left];
}`,
          },
        },
      ],
    },
    {
      id: 'common-patterns',
      title: 'Key Patterns to Remember',
      content: `1. **Binary search on answer** - search for the minimum valid value (ship capacity, splitting arrays)
2. **Search in rotated array** - modified binary search with half-range elimination
3. **Two-pointer with sorting** - sort then use two pointers for pair/three-sum problems
4. **Dutch national flag** - three-way partition (sort 0s, 1s, 2s)
5. **Merge intervals after sorting** - sort by start time, then merge`,
    },
    {
      id: 'whats-next',
      title: 'What\'s Next?',
      content: `You now know how to search and sort efficiently. These skills will serve you well in every module that follows.

Next, we move from linear structures to **hierarchical** ones. **Trees & Tries** introduce the concept of parent-child relationships - data that branches instead of lining up in a row.

Trees are everywhere: file systems, HTML DOM, organizational charts, and decision processes. And binary search trees? They give you O(log n) search and insert - like binary search, but with fast insertions too.

**Next up: Trees & Tries**`,
    },
  ],
  problemIds: ['binary-search', 'search-rotated-array', 'kth-largest', 'find-min-rotated', 'sort-colors'],
};
