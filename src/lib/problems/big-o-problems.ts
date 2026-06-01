import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'constant-vs-linear',
    title: 'Constant vs Linear',
    topicId: 'big-o',
    difficulty: 'easy',
    description: `What is the time complexity of finding the maximum element in an unsorted array of size n?`,
    examples: [
      { input: 'arr = [5, 2, 8, 1, 9]', output: 'O(n)', explanation: 'You must examine every element to find the maximum.' },
    ],
    constraints: ['Write your answer in Big O notation.'],
    hints: ['Think about what happens when the array gets larger.', 'Do you need to look at every element?'],
    solution: `// Finding max in an unsorted array
int FindMax(int[] arr) {
    int max = arr[0];
    foreach (var x in arr)
        if (x > max) max = x;
    return max;
}
// Time: O(n) — must check each element once
// Space: O(1) — only one extra variable`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'quadratic-vs-linear',
    title: 'Quadratic vs Linear',
    topicId: 'big-o',
    difficulty: 'easy',
    description: `Given an array of n integers, you compare every pair of elements. What is the time complexity?`,
    examples: [
      { input: 'n = 5', output: 'O(n²)', explanation: 'Number of pairs = n*(n-1)/2 ≈ n²/2, which simplifies to O(n²).' },
    ],
    constraints: [],
    hints: ['How many pairs exist for n elements?', 'Remember we drop constants.'],
    solution: `// Comparing all pairs — O(n²)
void CompareAllPairs(int[] arr) {
    for (int i = 0; i < arr.Length; i++)
        for (int j = i + 1; j < arr.Length; j++)
            Console.WriteLine($"{arr[i]},{arr[j]}");
}
// Number of operations: n*(n-1)/2 ≈ n²/2 → O(n²)`,
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
      { input: 'n = 5', output: 'O(n)', explanation: 'A new array of size n is allocated.' },
    ],
    constraints: [],
    hints: ['Count any new data structures created.', 'The input array itself does NOT count toward space complexity.'],
    solution: `int[] CopyArray(int[] arr) {
    var copy = new int[arr.Length];
    Array.Copy(arr, copy, arr.Length);
    return copy;
}
// Space: O(n) — creates a new array of size n`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
];
