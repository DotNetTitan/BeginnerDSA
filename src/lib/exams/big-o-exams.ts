import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'big-o-1',
    question: 'Which of the following best describes O(log n) time complexity?',
    options: [
      'The algorithm runs in logarithmic time — the number of operations grows proportionally to the logarithm of the input size',
      'The algorithm runs in linear time — each input element requires one operation',
      'The algorithm runs in constant time — it always takes the same number of operations regardless of input size',
      'The algorithm runs in quadratic time — operations grow as the square of the input size',
    ],
    correctIndex: 0,
    explanation: 'O(log n) means the runtime grows logarithmically with input size. Binary search on a sorted array is the classic example — each step halves the search space.',
  },
  {
    id: 'big-o-2',
    question: 'What is the time complexity of accessing an element by index in a dynamic array?',
    options: [
      'O(log n)',
      'O(n)',
      'O(1)',
      'O(n log n)',
    ],
    correctIndex: 2,
    explanation: 'A dynamic array is backed by a static array, so index-based access is O(1) — direct memory addressing gives constant-time lookup.',
  },
  {
    id: 'big-o-3',
    question: 'What is the space complexity of an algorithm that creates a new array of size n/2?',
    options: [
      'O(1) — constant space',
      'O(log n) — logarithmic space',
      'O(n) — linear space',
      'O(n²) — quadratic space',
    ],
    correctIndex: 2,
    explanation: 'Space complexity is O(n) because the additional memory used grows linearly with n. The constant factor of 1/2 is dropped in Big O notation.',
  },
];
