import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'sort-1',
    question: 'What is the worst-case time complexity of QuickSort?',
    options: [
      'O(n log n) — always, regardless of pivot choice',
      'O(n²) — when a poor pivot is consistently chosen (e.g., first or last element on already sorted data)',
      'O(n) — linear time for all cases',
      'O(log n) — logarithmic time',
    ],
    correctIndex: 1,
    explanation: 'QuickSort has O(n²) worst case when the pivot is always the smallest or largest element, creating highly unbalanced partitions. Random pivot or median-of-three mitigates this.',
  },
  {
    id: 'sort-2',
    question: 'Which sorting algorithm has O(n log n) worst-case time complexity and is stable?',
    options: [
      'QuickSort',
      'HeapSort',
      'MergeSort',
      'SelectionSort',
    ],
    correctIndex: 2,
    explanation: 'MergeSort guarantees O(n log n) in all cases and is stable (preserves relative order of equal elements). QuickSort is not stable; HeapSort is not stable.',
  },
  {
    id: 'sort-3',
    question: 'What is the key requirement for Binary Search?',
    options: [
      'The array must contain unique elements',
      'The array must be sorted',
      'The array must have a power-of-2 length',
      'The array must be non-empty and contain positive integers only',
    ],
    correctIndex: 1,
    explanation: 'Binary search requires a sorted array (or any sorted sequence with random access). It repeatedly divides the search range in half by comparing the target to the middle element.',
  },
  {
    id: 'sort-4',
    question: 'Given a sorted array of 1,000,000 elements, how many comparisons does binary search need in the worst case?',
    options: [
      'About 1,000,000 — linear search',
      'About 20 — log₂(1,000,000) ≈ 20',
      'Exactly 500,000 — half the array',
      'About 1,000 — square root of n',
    ],
    correctIndex: 1,
    explanation: 'Binary search halves the search space each iteration. log₂(1,000,000) ≈ 20, so at most 20 comparisons are needed in the worst case.',
  },
  {
    id: 'sort-5',
    question: 'What is the time complexity of HeapSort?',
    options: [
      'O(n²) worst case',
      'O(n log n) worst case',
      'O(n) worst case',
      'O(log n) worst case',
    ],
    correctIndex: 1,
    explanation: 'HeapSort has O(n log n) time complexity in all cases. Building the heap takes O(n), and extracting n elements takes O(n log n). Unlike QuickSort, there is no worst-case degradation.',
  },
];
