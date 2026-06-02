import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'll-1',
    question: 'What is the time complexity of finding the middle node of a singly linked list?',
    options: [
      'O(1) - store the length and traverse to length/2',
      'O(n) - use slow/fast pointer technique (or count then traverse)',
      'O(log n) - binary search on linked list',
      'O(n²) - compare each node with every other node',
    ],
    correctIndex: 1,
    explanation: 'Without random access, you need O(n): traverse with a slow pointer (1 step) and a fast pointer (2 steps). When fast reaches the end, slow is at the middle.',
  },
  {
    id: 'll-2',
    question: 'What is a key difference between a singly linked list and a doubly linked list?',
    options: [
      'Doubly linked list uses less memory',
      'Doubly linked list has O(1) deletion when given a node reference, singly linked list needs O(n) to find the previous node',
      'Singly linked list can traverse backward, doubly cannot',
      'Doubly linked list does not allow null values',
    ],
    correctIndex: 1,
    explanation: 'In a singly linked list, to delete a node you need its predecessor (O(n) to find). In a doubly linked list, each node has a prev pointer, so deletion is O(1) with just the node reference.',
  },
  {
    id: 'll-3',
    question: 'What does reversing a linked list in-place require?',
    options: [
      'Creating a new list and copying elements',
      'Using a stack to push all nodes then pop them',
      'Rearranging the next pointers of each node to point to the previous node',
      'Swapping the values of the first and last nodes recursively',
    ],
    correctIndex: 2,
    explanation: 'In-place reversal means mutating the existing nodes by changing each node\'s next pointer to point backward. Three pointers (prev, curr, next) are typically used.',
  },
  {
    id: 'll-4',
    question: 'What is a doubly linked list?',
    options: [
      'A dynamic array implementation that resizes automatically',
      'A singly linked list where each node has a value and a next pointer',
      'A linked list where each node has previous and next pointers',
      'A circular linked list where the tail connects to the head',
    ],
    correctIndex: 2,
    explanation: 'A doubly linked list has nodes with both a "next" and "previous" pointer, enabling O(1) insertions/deletions at known positions in both directions.',
  },
  {
    id: 'll-5',
    question: 'How would you detect a cycle in a linked list?',
    options: [
      'Reverse the list and see if you get back to the head',
      'Use two pointers: one moves 1 step, the other moves 2 steps. If they meet, there is a cycle',
      'Count the total nodes and compare to the maximum value',
      'Use recursion with a visited set stored in the nodes',
    ],
    correctIndex: 1,
    explanation: 'Floyd\'s cycle detection (tortoise and hare): two pointers where one moves twice as fast. If they ever meet before reaching the end, a cycle exists.',
  },
];
