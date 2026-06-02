import type { Topic } from '../types';

export const topic: Topic = {
  id: 'linked-lists',
  title: 'Linked Lists',
  icon: 'Link2',
  order: 4,
  description: 'A linear sequence of nodes connected by pointers. Learn reversal, cycle detection, and fast/slow pointer patterns.',
  difficulty: 'intermediate',
  prerequisites: ['big-o', 'arrays-strings'],
  theory: [
    {
      id: 'linked-list-basics',
      title: 'Linked List Basics',
      content: `A linked list consists of **nodes**, each containing a value and a pointer to the next node (and optionally the previous node).

| Operation | Singly Linked | Doubly Linked |
|---|---|---|
| Access head | O(1) | O(1) |
| Access tail | O(n) | O(1) |
| Access by index | O(n) | O(n) |
| Insert at head | O(1) | O(1) |
| Insert at tail | O(n) | O(1) |
| Delete by value | O(n) | O(n) |

**When to use:** Frequent insertions/deletions at the beginning, or when size is unknown. Otherwise, prefer arrays/lists.`,
      codeExamples: [
        {
          title: 'Singly linked list node',
          code: {
            csharp: `public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int val = 0, ListNode next = null) {
        this.val = val;
        this.next = next;
    }
}

// C# also has built-in LinkedList<T> (doubly linked)
var list = new LinkedList<string>();
list.AddFirst("c");
list.AddLast("d");
list.AddBefore(list.First, "b");

// But for interviews, you'll usually implement the node class`,
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Python doesn't have a built-in linked list,
# but collections.deque is a double-ended queue
from collections import deque
dll = deque()
dll.appendleft("c")   # add to front
dll.append("d")       # add to back
dll.appendleft("b")

# For interviews, you'll usually implement the node class`,
            java: `public class ListNode {
    public int val;
    public ListNode next;
    public ListNode() {}
    public ListNode(int val) { this.val = val; }
    public ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
}

// Java has LinkedList (doubly linked)
LinkedList<String> list = new LinkedList<>();
list.addFirst("c");
list.addLast("d");
list.addFirst("b");

// But for interviews, you'll usually implement the node class`,
            javascript: `class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// No built-in linked list in JS.
// For interviews, you'll usually implement the node class`,
          cpp: `struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x = 0, ListNode* nxt = nullptr) : val(x), next(nxt) {}
};

// C++ doesn't have a built-in linked list in the standard library.
// For interviews, you'll usually implement the node struct.`,
          },
        },
      ],
    },
    {
      id: 'reversal',
      title: 'Reversing a Linked List',
      content: `Reversal is the most common linked list operation. The key: track three nodes - **prev**, **current**, and **next** - and reverse the pointer direction at each step.`,
      codeExamples: [
        {
          title: 'Iterative reversal',
          code: {
            csharp: `// Reverse a singly linked list - O(n), O(1) space
ListNode ReverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;

    while (curr != null) {
        ListNode next = curr.next;  // save next
        curr.next = prev;           // reverse pointer
        prev = curr;                // move prev forward
        curr = next;                // move curr forward
    }

    return prev; // new head
}`,
            python: `# Reverse a singly linked list - O(n), O(1) space
def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next   # save next
        curr.next = prev  # reverse pointer
        prev = curr       # move prev forward
        curr = nxt        # move curr forward
    return prev  # new head`,
            java: `// Reverse a singly linked list - O(n), O(1) space
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;

    while (curr != null) {
        ListNode next = curr.next;  // save next
        curr.next = prev;           // reverse pointer
        prev = curr;                // move prev forward
        curr = next;                // move curr forward
    }

    return prev; // new head
}`,
            javascript: `// Reverse a singly linked list - O(n), O(1) space
const reverseList = (head) => {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        const next = curr.next;  // save next
        curr.next = prev;        // reverse pointer
        prev = curr;             // move prev forward
        curr = next;             // move curr forward
    }

    return prev; // new head
};`,
          cpp: `// Reverse a singly linked list - O(n), O(1) space
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;

    while (curr != nullptr) {
        ListNode* next = curr->next;  // save next
        curr->next = prev;            // reverse pointer
        prev = curr;                  // move prev forward
        curr = next;                  // move curr forward
    }

    return prev; // new head
}`,
          },
        },
      ],
    },
    {
      id: 'fast-slow-pointer',
      title: 'Fast & Slow Pointer',
      content: `Two pointers traverse the list at different speeds. The **slow** pointer moves 1 step, the **fast** pointer moves 2 steps.

**Applications:**
- **Cycle detection** - if fast meets slow, there's a cycle (Floyd's algorithm)
- **Find middle** - when fast reaches the end, slow is at the middle
- **Find nth from end** - move fast n steps ahead, then advance both`,
      codeExamples: [
        {
          title: 'Cycle detection and find middle',
          code: {
            csharp: `// Detect cycle - O(n), O(1) space
bool HasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast?.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}

// Find middle node - O(n), O(1) space
ListNode FindMiddle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast?.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
            python: `# Detect cycle - O(n), O(1) space
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False

# Find middle node - O(n), O(1) space
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
            java: `// Detect cycle - O(n), O(1) space
public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}

// Find middle node - O(n), O(1) space
public ListNode findMiddle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
            javascript: `// Detect cycle - O(n), O(1) space
const hasCycle = (head) => {
    let slow = head, fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
};

// Find middle node - O(n), O(1) space
const findMiddle = (head) => {
    let slow = head, fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
};`,
          cpp: `// Detect cycle - O(n), O(1) space
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

// Find middle node - O(n), O(1) space
ListNode* findMiddle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
          },
        },
      ],
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Reverse** - full reversal, reverse between positions, reverse in k-groups
2. **Merge** - merge two sorted lists, merge k sorted lists
3. **Fast & slow** - cycle detection, middle, palindrome check
4. **Dummy head** - create a dummy node before the real head to simplify edge cases (especially with deletions)
5. **Two lists** - intersection, addition (sum two numbers represented as lists)`,
    },
  ],
  problemIds: ['reverse-linked-list', 'merge-two-sorted-lists', 'linked-list-cycle', 'remove-nth-from-end', 'palindrome-linked-list'],
};
