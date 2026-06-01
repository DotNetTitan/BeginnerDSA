import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'dp-1',
    question: 'What are the two essential properties for a problem to be solvable with dynamic programming?',
    options: [
      'Divide and conquer + recursion',
      'Optimal substructure + overlapping subproblems',
      'Greedy choice + optimal substructure',
      'Memoization + tabulation',
    ],
    correctIndex: 1,
    explanation: 'Optimal substructure: the optimal solution can be built from optimal solutions to subproblems. Overlapping subproblems: the same subproblems are solved multiple times.',
  },
  {
    id: 'dp-2',
    question: 'What is the difference between top-down (memoization) and bottom-up (tabulation) DP?',
    options: [
      'Top-down solves all subproblems even if not needed; bottom-up only solves needed subproblems',
      'Top-down is recursive with caching; bottom-up is iterative filling a table from base cases upward',
      'Top-down uses O(1) space; bottom-up uses O(n) space',
      'There is no difference; they are the same approach',
    ],
    correctIndex: 1,
    explanation: 'Top-down: recurse from the original problem, cache results. Bottom-up: start with base cases, iteratively fill a table to build up to the answer. Bottom-up avoids recursion overhead.',
  },
  {
    id: 'dp-3',
    question: 'What is the time complexity of the 0/1 Knapsack DP solution with n items and capacity W?',
    options: [
      'O(n) — linear in number of items',
      'O(W) — linear in capacity',
      'O(n × W) — fill an n×W DP table',
      'O(2ⁿ) — consider all subsets',
    ],
    correctIndex: 2,
    explanation: 'The DP table has n rows and W+1 columns. Each cell takes O(1) to compute, so total time is O(n×W). This is pseudo-polynomial because W is the numeric value of the input.',
  },
  {
    id: 'dp-4',
    question: 'Which of the following is the best candidate for a greedy algorithm rather than DP?',
    options: [
      '0/1 Knapsack — items have different values and weights',
      'Finding the minimum number of coins for a target amount (with canonical coin denominations)',
      'Longest Common Subsequence (LCS)',
      'Edit distance between two strings',
    ],
    correctIndex: 1,
    explanation: 'With canonical denominations (e.g., US coins: 1, 5, 10, 25), the greedy algorithm (always pick the largest coin ≤ remaining amount) gives the optimal answer. The others all need DP.',
  },
  {
    id: 'dp-5',
    question: 'What does the recurrence LCS(i, j) = 1 + LCS(i-1, j-1) represent?',
    options: [
      'When characters match — extend the LCS by including this character',
      'When characters do not match — take the max of skipping either character',
      'The base case when i=0 or j=0',
      'The initialization of the DP table boundaries',
    ],
    correctIndex: 0,
    explanation: 'In Longest Common Subsequence, when str1[i] == str2[j], the LCS length increases by 1, and we move diagonally (i-1, j-1). The recurrence is: LCS(i,j) = 1 + LCS(i-1, j-1) if match; else max(LCS(i-1, j), LCS(i, j-1)).',
  },
];
