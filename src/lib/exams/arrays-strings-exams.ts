import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'arr-1',
    question: 'What does the two-pointer technique typically achieve?',
    options: [
      'O(n²) time by comparing every pair of elements',
      'O(n) time by using two indices moving toward each other or in the same direction',
      'O(log n) time by dividing the array in half each step',
      'O(1) time regardless of array size',
    ],
    correctIndex: 1,
    explanation: 'Two pointers typically achieve O(n) time by avoiding nested loops. One pointer starts at each end (or same end) and they move based on a condition.',
  },
  {
    id: 'arr-2',
    question: 'What is the difference between a static array and a dynamic array?',
    options: [
      'Static array is fixed-size; dynamic array is automatically resizable',
      'Static array is dynamically resizable; dynamic array is fixed-size',
      'Static array is a reference type; dynamic array is a value type',
      'There is no difference - they are interchangeable',
    ],
    correctIndex: 0,
    explanation: 'Static arrays have a fixed length set at creation. Dynamic arrays wrap a static array and automatically resize (typically doubling capacity) when full.',
  },
  {
    id: 'arr-3',
    question: 'What is the time complexity of the sliding window technique for finding the maximum sum of any subarray of size k?',
    options: [
      'O(n × k) - for each position, sum k elements',
      'O(n) - slide the window, add the new element, remove the old one',
      'O(log n) - binary search on the window size',
      'O(n²) - compare all possible windows',
    ],
    correctIndex: 1,
    explanation: 'The sliding window achieves O(n) by maintaining a running sum: add arr[i] and subtract arr[i-k] as the window moves, instead of summing k elements at each step.',
  },
  {
    id: 'arr-4',
    question: 'What does reversing an array in-place do?',
    options: [
      'Returns a new array with elements in reverse order',
      'Reverses the order of elements in the original array by swapping symmetrically from the ends',
      'Sorts the array in descending order',
      'Creates a copy of the array and reverses it',
    ],
    correctIndex: 1,
    explanation: 'In-place reversal modifies the original array by swapping elements symmetrically from the ends toward the center, using O(1) extra space.',
  },
  {
    id: 'arr-5',
    question: 'Which approach is most efficient for checking if a string is a palindrome?',
    options: [
      'Reverse the string and compare with original - O(n) time, O(n) space',
      'Use two pointers from both ends moving inward - O(n) time, O(1) space',
      'Use recursion to compare first and last characters - O(n) time, O(n) stack space',
      'Convert to char array, reverse, and compare - O(n) time, O(n) space',
    ],
    correctIndex: 1,
    explanation: 'The two-pointer approach is most space-efficient (O(1) extra space). It also handles early exit - you can stop as soon as a mismatch is found.',
  },
];
