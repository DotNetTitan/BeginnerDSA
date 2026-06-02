import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'hash-1',
    question: 'What is the average time complexity of a hash map (dictionary) lookup?',
    options: [
      'O(n) - linear search through all keys',
      'O(log n) - binary search on sorted keys',
      'O(1) - direct hash-based lookup',
      'O(n²) - compares every key with every other key',
    ],
    correctIndex: 2,
    explanation: 'A hash map uses a hash table. Lookups are O(1) on average because the key is hashed to compute the bucket index directly.',
  },
  {
    id: 'hash-2',
    question: 'What happens when two different keys produce the same hash code in a hash map?',
    options: [
      'The second key overwrites the first',
      'The program throws an exception',
      'Both entries are stored in the same bucket (collision is resolved by chaining or probing)',
      'The hash map automatically resizes to prevent the collision',
    ],
    correctIndex: 2,
    explanation: 'Collisions are inevitable. Hash maps typically resolve collisions using chaining (linked list per bucket) or open addressing (probing).',
  },
  {
    id: 'hash-3',
    question: 'Which data structure would you use to efficiently check if an element has been seen before?',
    options: [
      'Array / List',
      'Hash set',
      'Queue',
      'Stack',
    ],
    correctIndex: 1,
    explanation: 'A hash set provides O(1) average-time lookups via hashing, making it ideal for existence checks. A list would require O(n) linear search.',
  },
  {
    id: 'hash-4',
    question: 'What is the worst-case time complexity of a hash map lookup, and why?',
    options: [
      'O(1) - hashing is always constant time',
      'O(log n) - tree-based fallback for collisions',
      'O(n) - many keys could hash to the same bucket, degrading to a linear scan',
      'O(n²) - each collision requires comparing all pairs',
    ],
    correctIndex: 2,
    explanation: 'In the worst case (poor hash function or malicious input), all keys hash to the same bucket, turning the hash map into a linked list with O(n) lookup.',
  },
  {
    id: 'hash-5',
    question: 'What contract must an object\'s hash code satisfy for a hash map to work correctly?',
    options: [
      'It must return a unique value for every possible object',
      'It must return the same value for all objects',
      'If two objects are equal, they must have the same hash code',
      'It must return a positive integer',
    ],
    correctIndex: 2,
    explanation: 'The contract: if two objects are equal, they must have the same hash code. The reverse is not required - different objects can share a hash code (collision).',
  },
];
