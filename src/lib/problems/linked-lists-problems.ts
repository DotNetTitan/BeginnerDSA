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
    solution: {
      csharp: `public ListNode ReverseList(ListNode head) {
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
      python: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev
`,
      java: `public ListNode reverseList(ListNode head) {
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
      javascript: `function reverseList(head) {
    let prev = null;
    let curr = head;
    while (curr !== null) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
    },
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
    solution: {
      csharp: `public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
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
      python: `def merge_two_lists(list1, list2):
    dummy = ListNode()
    curr = dummy
    while list1 and list2:
        if list1.val <= list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next
    curr.next = list1 or list2
    return dummy.next
`,
      java: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode();
    ListNode curr = dummy;
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
    curr.next = list1 != null ? list1 : list2;
    return dummy.next;
}`,
      javascript: `function mergeTwoLists(list1, list2) {
    const dummy = new ListNode();
    let curr = dummy;
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next;
    }
    curr.next = list1 || list2;
    return dummy.next;
}`,
      cpp: `ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode dummy;
    ListNode* curr = &dummy;
    while (list1 != nullptr && list2 != nullptr) {
        if (list1->val <= list2->val) {
            curr->next = list1;
            list1 = list1->next;
        } else {
            curr->next = list2;
            list2 = list2->next;
        }
        curr = curr->next;
    }
    curr->next = list1 != nullptr ? list1 : list2;
    return dummy.next;
}`,
    },
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
    constraints: ['The number of nodes is in the range [0, 10â´].'],
    hints: ['Use Floyd\'s cycle detection (fast and slow pointer).', 'If fast catches up to slow, there is a cycle.'],
    solution: {
      csharp: `public bool HasCycle(ListNode head) {
    ListNode slow = head, fast = head;

    while (fast?.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }

    return false;
}`,
      python: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
`,
      java: `public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
      javascript: `function hasCycle(head) {
    let slow = head, fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}`,
      cpp: `bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
    },
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
    solution: {
      csharp: `public ListNode RemoveNthFromEnd(ListNode head, int n) {
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
      python: `def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    slow = fast = dummy
    for _ in range(n):
        fast = fast.next
    while fast.next:
        slow = slow.next
        fast = fast.next
    slow.next = slow.next.next
    return dummy.next
`,
      java: `public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
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
      javascript: `function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0, head);
    let slow = dummy, fast = dummy;
    for (let i = 0; i < n; i++)
        fast = fast.next;
    while (fast.next !== null) {
        slow = slow.next;
        fast = fast.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
}`,
      cpp: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummy(0, head);
    ListNode* slow = &dummy;
    ListNode* fast = &dummy;
    for (int i = 0; i < n; i++)
        fast = fast->next;
    while (fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next;
    }
    slow->next = slow->next->next;
    return dummy.next;
}`,
    },
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
    constraints: ['The number of nodes is in the range [1, 10âµ].'],
    hints: ['Find the middle of the list.', 'Reverse the second half and compare.'],
    solution: {
      csharp: `public bool IsPalindrome(ListNode head) {
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
      python: `def is_palindrome(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    second_half = reverse_list(slow)
    first_half = head
    while second_half:
        if first_half.val != second_half.val:
            return False
        first_half = first_half.next
        second_half = second_half.next
    return True


def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev
`,
      java: `public boolean isPalindrome(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    ListNode secondHalf = reverseList(slow);
    ListNode firstHalf = head;
    while (secondHalf != null) {
        if (firstHalf.val != secondHalf.val) return false;
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }
    return true;
}

private ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      javascript: `function isPalindrome(head) {
    let slow = head, fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let secondHalf = reverseList(slow);
    let firstHalf = head;
    while (secondHalf !== null) {
        if (firstHalf.val !== secondHalf.val) return false;
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }
    return true;
}

function reverseList(head) {
    let prev = null, curr = head;
    while (curr !== null) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      cpp: `bool isPalindrome(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    ListNode* secondHalf = reverseList(slow);
    ListNode* firstHalf = head;
    while (secondHalf != nullptr) {
        if (firstHalf->val != secondHalf->val) return false;
        firstHalf = firstHalf->next;
        secondHalf = secondHalf->next;
    }
    return true;
}

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
];
