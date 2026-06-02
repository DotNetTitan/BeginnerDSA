import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'sq-1',
    question: 'What principle does a stack follow?',
    options: [
      'First-In-First-Out (FIFO)',
      'Last-In-First-Out (LIFO)',
      'Random access by index',
      'Priority-based ordering',
    ],
    correctIndex: 1,
    explanation: 'A stack follows LIFO: the last element pushed is the first one popped. Think of a stack of plates — you remove from the top.',
  },
  {
    id: 'sq-2',
    question: 'What principle does a queue follow?',
    options: [
      'Last-In-First-Out (LIFO)',
      'First-In-First-Out (FIFO)',
      'Highest priority first',
      'Random order',
    ],
    correctIndex: 1,
    explanation: 'A queue follows FIFO: the first element enqueued is the first one dequeued. Like a line at a ticket counter.',
  },
  {
    id: 'sq-3',
    question: 'What is the most efficient way to implement a queue using two stacks?',
    options: [
      'Push to stack1, pop from stack2. Transfer when stack2 is empty',
      'Always push to stack1 and pop from stack1 after reversing',
      'Use stack1 for enqueue, stack2 for dequeue by pushing all elements back and forth on every operation',
      'Store the queue in a single stack and use recursion to reverse',
    ],
    correctIndex: 0,
    explanation: 'Enqueue: push to stack1. Dequeue: if stack2 is empty, transfer all from stack1 to stack2 (this reverses order), then pop from stack2. Each element is moved at most twice, giving O(1) amortized time.',
  },
  {
    id: 'sq-4',
    question: 'Which of the following problems is best solved with a stack?',
    options: [
      'Finding the shortest path in a graph',
      'Validating balanced parentheses: ([{}])',
      'Implementing a cache (LRU)',
      'Sorting a list of integers',
    ],
    correctIndex: 1,
    explanation: 'Stack is ideal for balanced parentheses: push open brackets, pop on close brackets, and check if the popped bracket matches. Also used for expression evaluation and undo operations.',
  },
  {
    id: 'sq-5',
    question: 'What is the difference between a queue and a stack?',
    options: [
      'Queue is FIFO (first in, first out); Stack is LIFO (last in, first out)',
      'Queue is LIFO; Stack is FIFO',
      'Queue allows random access; Stack does not',
      'Queue stores reference types only; Stack stores value types only',
    ],
    correctIndex: 0,
    explanation: 'Queue: enqueue adds to the back, dequeue removes from the front (FIFO). Stack: push adds to the top, pop removes from the top (LIFO).',
  },
];
