import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'constant-vs-linear',
    title: 'Constant vs Linear',
    topicId: 'big-o',
    difficulty: 'easy',
    description: `What is the time complexity (excluding input) of this function?`,
    examples: [
      { input: 'arr = [5, 2, 8, 1, 9]' },
    ],
    constraints: ['Write your answer in Big O notation.'],
    hints: ['Think about what happens when the array gets larger.', 'Do you need to look at every element?'],
    code: {
      csharp: `int FindMax(int[] arr) {
    int max = arr[0];
    foreach (var x in arr)
        if (x > max) max = x;
    return max;
}`,
      python: `def find_max(arr):
    max_val = arr[0]
    for x in arr:
        if x > max_val:
            max_val = x
    return max_val`,
      java: `public int findMax(int[] arr) {
    int max = arr[0];
    for (int x : arr)
        if (x > max) max = x;
    return max;
}`,
      javascript: `function findMax(arr) {
    let max = arr[0];
    for (const x of arr)
        if (x > max) max = x;
    return max;
}`,
      cpp: `int findMax(const std::vector<int>& arr) {
    int max = arr[0];
    for (int x : arr)
        if (x > max) max = x;
    return max;
}`,
    },
    solution: {
      csharp: `// Finding max in an unsorted array
int FindMax(int[] arr) {
    int max = arr[0];
    foreach (var x in arr)
        if (x > max) max = x;
    return max;
}
// Time: O(n) - must check each element once
// Space: O(1) - only one extra variable`,
      python: `# Finding max in an unsorted array
def find_max(arr):
    max_val = arr[0]
    for x in arr:
        if x > max_val:
            max_val = x
    return max_val
# Time: O(n) - must check each element once
# Space: O(1) - only one extra variable`,
      java: `public int findMax(int[] arr) {
    int max = arr[0];
    for (int x : arr)
        if (x > max) max = x;
    return max;
}
// Time: O(n) - must check each element once
// Space: O(1) - only one extra variable`,
      javascript: `// Finding max in an unsorted array
function findMax(arr) {
    let max = arr[0];
    for (const x of arr)
        if (x > max) max = x;
    return max;
}
// Time: O(n) - must check each element once
// Space: O(1) - only one extra variable`,
      cpp: `#include <vector>
#include <climits>

int findMax(const std::vector<int>& arr) {
    int max = arr[0];
    for (int x : arr)
        if (x > max) max = x;
    return max;
}
// Time: O(n) - must check each element once
// Space: O(1) - only one extra variable`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'quadratic-vs-linear',
    title: 'Quadratic vs Linear',
    topicId: 'big-o',
    difficulty: 'easy',
    description: `What is the time complexity (excluding input) of this function?`,
    examples: [
      { input: 'n = 5' },
    ],
    constraints: [],
    hints: ['How many pairs exist for n elements?', 'Remember we drop constants.'],
    code: {
      csharp: `void CompareAllPairs(int[] arr) {
    for (int i = 0; i < arr.Length; i++)
        for (int j = i + 1; j < arr.Length; j++)
            Console.WriteLine($"{arr[i]},{arr[j]}");
}`,
      python: `def compare_all_pairs(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            print(f"{arr[i]},{arr[j]}")`,
      java: `public void compareAllPairs(int[] arr) {
    for (int i = 0; i < arr.length; i++)
        for (int j = i + 1; j < arr.length; j++)
            System.out.println(arr[i] + "," + arr[j]);
}`,
      javascript: `function compareAllPairs(arr) {
    for (let i = 0; i < arr.length; i++)
        for (let j = i + 1; j < arr.length; j++)
            console.log(arr[i] + "," + arr[j]);
}`,
      cpp: `void compareAllPairs(const std::vector<int>& arr) {
    for (size_t i = 0; i < arr.size(); i++)
        for (size_t j = i + 1; j < arr.size(); j++)
            std::cout << arr[i] << "," << arr[j] << "\\n";
}`,
    },
    solution: {
      csharp: `// Comparing all pairs - O(n²)
void CompareAllPairs(int[] arr) {
    for (int i = 0; i < arr.Length; i++)
        for (int j = i + 1; j < arr.Length; j++)
            Console.WriteLine($"{arr[i]},{arr[j]}");
}
// Number of operations: n*(n-1)/2 ≈ n²/2 → O(n²)`,
      python: `# Comparing all pairs - O(n²)
def compare_all_pairs(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            print(f"{arr[i]},{arr[j]}")
# Number of operations: n*(n-1)/2 ≈ n²/2 → O(n²)`,
      java: `public void compareAllPairs(int[] arr) {
    for (int i = 0; i < arr.length; i++)
        for (int j = i + 1; j < arr.length; j++)
            System.out.println(arr[i] + "," + arr[j]);
}
// Number of operations: n*(n-1)/2 ≈ n²/2 → O(n²)`,
      javascript: `// Comparing all pairs - O(n²)
function compareAllPairs(arr) {
    for (let i = 0; i < arr.length; i++)
        for (let j = i + 1; j < arr.length; j++)
            console.log(arr[i] + "," + arr[j]);
}
// Number of operations: n*(n-1)/2 ≈ n²/2 → O(n²)`,
      cpp: `#include <iostream>
#include <vector>

void compareAllPairs(const std::vector<int>& arr) {
    for (size_t i = 0; i < arr.size(); i++)
        for (size_t j = i + 1; j < arr.size(); j++)
            std::cout << arr[i] << "," << arr[j] << "\\n";
}
// Number of operations: n*(n-1)/2 ≈ n²/2 → O(n²)`,
    },
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'space-complexity',
    title: 'Space Complexity Analysis',
    topicId: 'big-o',
    difficulty: 'medium',
    description: `What is the space complexity (excluding input) of this function?`,
    examples: [
      { input: 'n = 5' },
    ],
    constraints: [],
    hints: ['Count any new data structures created.', 'The input array itself does NOT count toward space complexity.'],
    code: {
      csharp: `int[] CopyArray(int[] arr) {
    var copy = new int[arr.Length];
    Array.Copy(arr, copy, arr.Length);
    return copy;
}`,
      python: `def copy_array(arr):
    copy = [0] * len(arr)
    for i in range(len(arr)):
        copy[i] = arr[i]
    return copy`,
      java: `public int[] copyArray(int[] arr) {
    int[] copy = new int[arr.length];
    for (int i = 0; i < arr.length; i++)
        copy[i] = arr[i];
    return copy;
}`,
      javascript: `function copyArray(arr) {
    const copy = new Array(arr.length);
    for (let i = 0; i < arr.length; i++)
        copy[i] = arr[i];
    return copy;
}`,
      cpp: `std::vector<int> copyArray(const std::vector<int>& arr) {
    std::vector<int> copy(arr.size());
    for (size_t i = 0; i < arr.size(); i++)
        copy[i] = arr[i];
    return copy;
}`,
    },
    solution: {
      csharp: `int[] CopyArray(int[] arr) {
    var copy = new int[arr.Length];
    Array.Copy(arr, copy, arr.Length);
    return copy;
}
// Space: O(n) - creates a new array of size n`,
      python: `def copy_array(arr):
    copy = [0] * len(arr)
    for i in range(len(arr)):
        copy[i] = arr[i]
    return copy
# Space: O(n) - creates a new array of size n`,
      java: `public int[] copyArray(int[] arr) {
    int[] copy = new int[arr.length];
    for (int i = 0; i < arr.length; i++)
        copy[i] = arr[i];
    return copy;
}
// Space: O(n) - creates a new array of size n`,
      javascript: `// Creates a new array of size n
function copyArray(arr) {
    const copy = new Array(arr.length);
    for (let i = 0; i < arr.length; i++)
        copy[i] = arr[i];
    return copy;
}
// Space: O(n) - creates a new array of size n`,
      cpp: `#include <vector>

std::vector<int> copyArray(const std::vector<int>& arr) {
    std::vector<int> copy(arr.size());
    for (size_t i = 0; i < arr.size(); i++)
        copy[i] = arr[i];
    return copy;
}
// Space: O(n) - creates a new array of size n`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
];
