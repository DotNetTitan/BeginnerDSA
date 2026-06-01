import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'hash-1',
    question: 'What is the average time complexity of a Dictionary<TKey, TValue> lookup in C#?',
    options: [
      'O(n) — linear search through all keys',
      'O(log n) — binary search on sorted keys',
      'O(1) — direct hash-based lookup',
      'O(n²) — compares every key with every other key',
    ],
    correctIndex: 2,
    explanation: 'Dictionary<TKey, TValue> uses a hash table. Lookups are O(1) on average because the key is hashed to compute the bucket index directly.',
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
    explanation: 'Collisions are inevitable. C# Dictionary uses chaining (each bucket stores a linked list of entries). Other approaches like open addressing use probing.',
  },
  {
    id: 'hash-3',
    question: 'Which C# collection would you use to efficiently check if an element has been seen before?',
    options: [
      'List<T>',
      'HashSet<T>',
      'Queue<T>',
      'Stack<T>',
    ],
    correctIndex: 1,
    explanation: 'HashSet<T> provides O(1) average-time lookups via hashing, making it ideal for existence checks. List<T> would require O(n) linear search.',
  },
  {
    id: 'hash-4',
    question: 'What is the worst-case time complexity of a hash map lookup, and why?',
    options: [
      'O(1) — hashing is always constant time',
      'O(log n) — tree-based fallback for collisions',
      'O(n) — many keys could hash to the same bucket, degrading to a linear scan',
      'O(n²) — each collision requires comparing all pairs',
    ],
    correctIndex: 2,
    explanation: 'In the worst case (poor hash function or malicious input), all keys hash to the same bucket, turning the hash map into a linked list with O(n) lookup.',
  },
  {
    id: 'hash-5',
    question: 'What does GetHashCode() need to satisfy for Dictionary to work correctly?',
    options: [
      'It must return a unique value for every possible object',
      'It must return the same value for all objects',
      'If two objects are equal (Equals returns true), they must have the same hash code',
      'It must return a positive integer',
    ],
    correctIndex: 2,
    explanation: 'The contract: if Equals() returns true, GetHashCode() must return the same value. The reverse is not required — different objects can share a hash code (collision).',
  },
];
