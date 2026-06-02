import type { Topic } from '../types';

export const topic: Topic = {
  id: 'sorting-searching',
  title: 'Sorting & Searching',
  icon: 'ArrowUpDown',
  order: 7,
  description: 'Every interview starts with sorting or searching. Master binary search variants and comparison-based sorting.',
  difficulty: 'intermediate',
  prerequisites: ['big-o', 'arrays-strings', 'recursion'],
  theory: [
    {
      id: 'binary-search',
      title: 'Binary Search',
      content: `Binary search finds an element in a **sorted** array by repeatedly dividing the search range in half.

| | Linear Search | Binary Search |
|---|---|---|
| Time | O(n) | O(log n) |
| Requires sorted? | No | Yes |

**Binary search variants:**
- Standard: find exact target
- Lower bound: first index ≥ target
- Upper bound: first index > target
- Rotated array search
- Search in a range`,
      codeExamples: [
        {
          title: 'Binary search and its variants',
          code: `// Standard binary search — O(log n)
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

// Lower bound — first index where arr[i] >= target
int LowerBound(int[] arr, int target) {
    int left = 0, right = arr.Length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

// Upper bound — first index where arr[i] > target
int UpperBound(int[] arr, int target) {
    int left = 0, right = arr.Length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left;
}`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'sorting-algorithms',
      title: 'Sorting Algorithms',
      content: `| Algorithm | Average Time | Worst Time | Space | Stable |
|---|---|---|---|---|
| Bubble Sort | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(1) | No |

Most languages have a built-in sort that uses **introsort** (quick sort + heap sort fallback) for primitive types and a stable sort for reference types.`,
      codeExamples: [
        {
          title: 'Key sorting implementations',
          code: `// Quick sort — O(n log n) average, O(log n) space
void QuickSort(int[] arr, int left, int right) {
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
}

// Built-in C# sorting
Array.Sort(arr);                     // O(n log n), in-place
var sorted = arr.OrderBy(x => x).ToArray(); // O(n log n), new array
Array.Sort(arr, (a, b) => b.CompareTo(a));  // descending with comparer

// Custom comparer for complex objects
Array.Sort(people, (a, b) => a.Age.CompareTo(b.Age));`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'binary-search-rotated',
      title: 'Binary Search on Rotated Array',
      content: `A **rotated sorted array** is a sorted array that has been shifted. Example: [4, 5, 6, 7, 0, 1, 2].

Key insight: One half of the array is always normally sorted. Determine which half, then search accordingly.`,
      codeExamples: [
        {
          title: 'Search in rotated sorted array',
          code: `int SearchRotated(int[] arr, int target) {
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
          language: 'csharp',
        },
      ],
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Binary search on answer** — search for the minimum valid value (e.g., ship capacity, splitting arrays)
2. **Search in rotated array** — modified binary search with half-range elimination
3. **Two-pointer with sorting** — sort then use two pointers for pair/three-sum problems
4. **Dutch national flag** — three-way partition (sort 0s, 1s, 2s)
5. **Merge intervals after sorting** — sort by start time, then merge`,
    },
  ],
  problemIds: ['binary-search', 'search-rotated-array', 'kth-largest', 'find-min-rotated', 'sort-colors'],
};
