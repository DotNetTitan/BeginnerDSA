import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    topicId: 'linked-lists',
    difficulty: 'easy',
    description: `Given the head of a singly linked list, reverse the list and return the new head.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
    ],
    constraints: ['The number of nodes is in the range [0, 5000].'],
    hints: ['Use three pointers: prev, curr, next.', 'Draw it out on paper first.'],
    solution: `public ListNode ReverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;

    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    topicId: 'linked-lists',
    difficulty: 'easy',
    description: `Merge two sorted linked lists and return it as a sorted new list.`,
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' },
    ],
    constraints: ['The number of nodes is in the range [0, 50].'],
    hints: ['Use a dummy head to simplify the logic.', 'Compare values and attach the smaller one.'],
    solution: `public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
    var dummy = new ListNode();
    var curr = dummy;

    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next;
    }

    curr.next = list1 ?? list2;
    return dummy.next;
}`,
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    topicId: 'linked-lists',
    difficulty: 'easy',
    description: `Given the head of a linked list, determine if the list has a cycle.`,
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'Tail connects to node at index 1.' },
      { input: 'head = [1,2], pos = 0', output: 'true' },
      { input: 'head = [1], pos = -1', output: 'false' },
    ],
    constraints: ['The number of nodes is in the range [0, 10⁴].'],
    hints: ['Use Floyd\'s cycle detection (fast and slow pointer).', 'If fast catches up to slow, there is a cycle.'],
    solution: `public bool HasCycle(ListNode head) {
    ListNode slow = head, fast = head;

    while (fast?.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }

    return false;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'remove-nth-from-end',
    title: 'Remove Nth Node From End',
    topicId: 'linked-lists',
    difficulty: 'medium',
    description: `Given the head of a linked list, remove the nth node from the end of the list and return its head.`,
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
      { input: 'head = [1], n = 1', output: '[]' },
    ],
    constraints: ['1 <= n <= number of nodes'],
    hints: ['Use a dummy head and two pointers.', 'Move fast pointer n steps ahead, then move both until fast reaches end.'],
    solution: `public ListNode RemoveNthFromEnd(ListNode head, int n) {
    var dummy = new ListNode(0, head);
    ListNode slow = dummy, fast = dummy;

    for (int i = 0; i < n; i++)
        fast = fast.next;

    while (fast.next != null) {
        slow = slow.next;
        fast = fast.next;
    }

    slow.next = slow.next.next;
    return dummy.next;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'palindrome-linked-list',
    title: 'Palindrome Linked List',
    topicId: 'linked-lists',
    difficulty: 'medium',
    description: `Given the head of a singly linked list, return true if it is a palindrome.`,
    examples: [
      { input: 'head = [1,2,2,1]', output: 'true' },
      { input: 'head = [1,2]', output: 'false' },
    ],
    constraints: ['The number of nodes is in the range [1, 10⁵].'],
    hints: ['Find the middle of the list.', 'Reverse the second half and compare.'],
    solution: `public bool IsPalindrome(ListNode head) {
    ListNode slow = head, fast = head;

    while (fast?.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    ListNode secondHalf = ReverseList(slow);
    ListNode firstHalf = head;

    while (secondHalf != null) {
        if (firstHalf.val != secondHalf.val) return false;
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }
    return true;
}

ListNode ReverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
];
