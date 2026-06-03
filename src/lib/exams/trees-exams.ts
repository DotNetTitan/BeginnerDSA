import type { ExamQuestion } from '../types';

export const questions: ExamQuestion[] = [
  {
    id: 'tree-1',
    question: 'What is the defining property of a Binary Search Tree (BST)?',
    options: [
      'Every node has exactly two children',
      'For every node, left subtree values < node value < right subtree values',
      'The tree is always balanced',
      'All leaves are at the same depth',
    ],
    correctIndex: 1,
    explanation: 'BST property: all values in the left subtree are less than the node\'s value, and all values in the right subtree are greater. This enables O(log n) search in a balanced BST.',
  },
  {
    id: 'tree-2',
    question: 'In which tree traversal order do you visit left → root → right?',
    options: [
      'Pre-order (root → left → right)',
      'In-order (left → root → right)',
      'Post-order (left → right → root)',
      'Level-order (BFS)',
    ],
    correctIndex: 1,
    explanation: 'In-order traversal visits left subtree, then root, then right subtree. On a BST, in-order traversal visits nodes in ascending order.',
  },
  {
    id: 'tree-3',
    question: 'What traversal would you use to compute the height of a binary tree?',
    options: [
      'Pre-order traversal with a counter',
      'In-order traversal with a stack',
      'Post-order traversal (compute height of children first, then add 1)',
      'Any traversal works equally well',
    ],
    correctIndex: 2,
    explanation: 'Height(root) = 1 + max(Height(left), Height(right)). Post-order ensures child heights are computed before the parent\'s height.',
  },
  {
    id: 'tree-4',
    question: 'What is the worst-case time complexity of searching in an unbalanced BST?',
    options: [
      'O(1) - constant always',
      'O(log n) - guaranteed by the tree structure',
      'O(n) - the tree could degenerate into a linked list',
      'O(n²) - quadratic for search',
    ],
    correctIndex: 2,
    explanation: 'If nodes are inserted in sorted order without balancing (e.g., 1 → 2 → 3), the BST becomes a linked list. Search degrades to O(n). Self-balancing trees (AVL, Red-Black) prevent this.',
  },
  {
    id: 'tree-5',
    question: 'How many nodes does a perfect binary tree of height h have?',
    options: [
      'h nodes',
      '2h − 1 nodes',
      '2ʰ − 1 nodes',
      '2ʰ⁺¹ − 1 nodes',
    ],
    correctIndex: 2,
    explanation: 'A perfect binary tree (all levels completely filled) has 2ʰ − 1 nodes, where h is the height (root at height 1). Each level doubles the count: 1 + 2 + 4 + ... + 2ʰ⁻¹ = 2ʰ − 1.',
  },
];
