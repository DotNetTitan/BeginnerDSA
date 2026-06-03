import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'gi-1',
    question: 'What does it mean for an interval [a, b] to overlap with [c, d]?',
    options: [
      'a equals c and b equals d',
      'The intervals share no common points',
      'The intervals share at least one common point - max(a, c) ≤ min(b, d)',
      'One interval is completely inside the other',
    ],
    correctIndex: 2,
    explanation: 'Two intervals overlap if they share any point in time or space. The condition is max(a, c) ≤ min(b, d). If this is false, they are disjoint.',
  },
  {
    id: 'gi-2',
    question: 'What is the first step of the classic interval scheduling problem (maximize non-overlapping intervals)?',
    options: [
      'Sort intervals by start time',
      'Sort intervals by end time',
      'Sort intervals by duration',
      'Sort intervals by the sum of start and end',
    ],
    correctIndex: 1,
    explanation: 'The greedy algorithm for maximum non-overlapping intervals sorts by end time. Then pick the earliest-finishing interval and remove any that overlap with it.',
  },
  {
    id: 'gi-3',
    question: 'In the merge intervals problem, when should you extend the current interval?',
    options: [
      'When the next interval starts after the current ends',
      'When the next interval starts before or at the current end (overlap)',
      'When the next interval is longer than the current',
      'When the next interval is shorter than the current',
    ],
    correctIndex: 1,
    explanation: 'If next.start ≤ current.end, they overlap - merge by setting current.end = max(current.end, next.end). If no overlap, add current to result and move to next.',
  },
  {
    id: 'gi-4',
    question: 'When can the greedy approach fail for interval problems?',
    options: [
      'When intervals have equal start times',
      'When the optimal solution requires looking ahead more than one step (e.g., weighted intervals)',
      'When intervals are sorted by start time',
      'Greedy always works for interval problems',
    ],
    correctIndex: 1,
    explanation: 'Weighted interval scheduling requires DP, not greedy. Greedy picks intervals by end time, which may skip short, high-value intervals in favor of longer, low-value ones.',
  },
  {
    id: 'gi-5',
    question: 'What is the time complexity of merging overlapping intervals after sorting?',
    options: [
      'O(n²) - nested loop to check all pairs',
      'O(n log n) - sorting dominates, merging is O(n)',
      'O(n) - both sorting and merging are linear',
      'O(log n) - binary search for overlaps',
    ],
    correctIndex: 1,
    explanation: 'Sorting is O(n log n). The merge pass is a single O(n) scan: for each interval, either merge it with the last result or add it as a new interval.',
  },
];
