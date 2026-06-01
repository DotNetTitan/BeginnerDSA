import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'rec-1',
    question: 'What are the two essential parts of any recursive function?',
    options: [
      'A loop and a conditional statement',
      'A base case that stops recursion and a recursive case that calls itself',
      'A stack and a queue',
      'A return statement and a void method',
    ],
    correctIndex: 1,
    explanation: 'Every recursive function needs a base case (terminating condition) and a recursive case (calls itself with modified arguments approaching the base case). Without a base case, you get infinite recursion.',
  },
  {
    id: 'rec-2',
    question: 'What is the time complexity of the naive recursive Fibonacci (Fib(n) = Fib(n-1) + Fib(n-2))?',
    options: [
      'O(n) — linear recursion depth',
      'O(n²) — quadratic growth',
      'O(2ⁿ) — exponential, each call branches into two',
      'O(log n) — divide and conquer',
    ],
    correctIndex: 2,
    explanation: 'Naive recursion computes Fib(n) in O(2ⁿ) because each call spawns two more calls, forming a binary tree of height n. This is why memoization or tabulation is essential.',
  },
  {
    id: 'rec-3',
    question: 'What is the primary risk of using recursion without memoization for large inputs?',
    options: [
      'Infinite loop detection by the compiler',
      'Stack overflow due to deep call stacks',
      'Data loss due to variable shadowing',
      'Slow memory allocation for return values',
    ],
    correctIndex: 1,
    explanation: 'Each recursive call adds a frame to the call stack. Deep recursion (e.g., naive Fib(10000)) will exhaust the stack and throw a StackOverflowException.',
  },
  {
    id: 'rec-4',
    question: 'How does memoization improve recursive algorithms?',
    options: [
      'It reduces the number of parameters',
      'It caches results of expensive function calls and reuses them for identical inputs',
      'It converts recursion to iteration automatically',
      'It reduces the base case to a single condition',
    ],
    correctIndex: 1,
    explanation: 'Memoization stores previously computed results in a cache (e.g., Dictionary). When the same input occurs again, the cached result is returned instead of recomputing.',
  },
  {
    id: 'rec-5',
    question: 'Which of the following can always be converted to an iterative solution?',
    options: [
      'Any recursive function — recursion and iteration are equally expressive',
      'Only tail-recursive functions',
      'Only functions with a single base case',
      'Recursive functions cannot be converted to iteration',
    ],
    correctIndex: 0,
    explanation: 'Any recursive function can be rewritten iteratively (usually using an explicit stack). The choice between recursion and iteration is often about readability and stack safety.',
  },
];
