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
      id: 'why-linked-lists',
      title: 'The Array\'s Weakness',
      content: `Arrays are great at two things: instant access by index (O(1)) and iterating sequentially. But they have a weakness: **inserting or deleting at the beginning costs O(n)** - every element has to shift.

Imagine a line of people at a movie theater. If someone cuts to the front, everyone behind has to take a step back. That's the array's "shift" problem.

Now imagine each person just holds the hand of the person behind them. To insert at the front, you just tell the new person "hold onto the current front person" - nobody moves. That's a linked list.

A **linked list** sacrifices random access (no more arr[42]) for O(1) insertions and deletions anywhere - provided you already have a reference to the right spot.`,
      table: {
        headers: ['Operation', 'Array', 'Linked List'],
        rows: [
          ['Access by index', 'O(1)', 'O(n)'],
          ['Insert at beginning', 'O(n)', 'O(1)'],
          ['Insert at end', 'O(1)*', 'O(n)**'],
          ['Delete at beginning', 'O(n)', 'O(1)'],
          ['Search by value', 'O(n)', 'O(n)'],
        ],
      },
    },
    {
      id: 'linked-list-basics',
      title: 'Linked List Basics',
      component: 'singly-linked-list',
      content: `A linked list is made of **nodes**. Each node contains a value and a pointer to the next node. The list is "linked" because each node points to the next one in sequence.

The first node is called the **head**. The last node points to **null** (nothing).

There are two flavors:
- **Singly linked** - each node points only to the next node
- **Doubly linked** - each node also points to the previous node (we'll cover this next)

The key difference from arrays: to find element #5, you can't jump there - you have to start at the head and follow pointers 5 times. That's O(n) access by index.`,
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
      table: {
        headers: ['Operation', 'Singly Linked', 'Doubly Linked'],
        rows: [
          ['Access head', 'O(1)', 'O(1)'],
          ['Access tail', 'O(n)', 'O(1)'],
          ['Access by index', 'O(n)', 'O(n)'],
          ['Insert at head', 'O(1)', 'O(1)'],
          ['Insert at tail', 'O(n)', 'O(1)'],
          ['Delete by value', 'O(n)', 'O(n)'],
        ],
      },
    },
    {
      id: 'doubly-linked-lists',
      title: 'Doubly Linked Lists',
      component: 'doubly-linked-list',
      content: `A **doubly linked list** node stores two pointers: \`prv\` (previous) and \`nxt\` (next), allowing traversal in both directions.

The trade-off: more memory per node (an extra pointer), but O(1) access to both previous and next nodes.

**When to use doubly:**
- You need O(1) tail operations (delete last, add to end)
- You need backward traversal (undo/redo, browser history)
- You frequently insert/delete before a known node

**When to stick with singly:**
- Memory is constrained
- You only need forward-only traversal
- The list is small enough that O(n) traversal doesn't matter`,
      codeExamples: [
        {
          title: 'Doubly linked list node',
          code: {
            csharp: `public class ListNode {
    public int val;
    public ListNode prv;
    public ListNode nxt;
    public ListNode(int val = 0, ListNode prv = null, ListNode nxt = null) {
        this.val = val;
        this.prv = prv;
        this.nxt = nxt;
    }
}

// Insert at head - O(1)
ListNode InsertAtHead(ListNode head, int val) {
    var newNode = new ListNode(val, null, head);
    if (head != null) head.prv = newNode;
    return newNode;
}`,
            python: `class ListNode:
    def __init__(self, val=0, prv=None, nxt=None):
        self.val = val
        self.prv = prv
        self.nxt = nxt

# Insert at head - O(1)
def insert_at_head(head, val):
    new_node = ListNode(val, None, head)
    if head:
        head.prv = new_node
    return new_node`,
            java: `public class ListNode {
    public int val;
    public ListNode prv;
    public ListNode nxt;
    public ListNode() {}
    public ListNode(int val, ListNode prv, ListNode nxt) {
        this.val = val;
        this.prv = prv;
        this.nxt = nxt;
    }
}

// Insert at head - O(1)
public ListNode insertAtHead(ListNode head, int val) {
    ListNode newNode = new ListNode(val, null, head);
    if (head != null) head.prv = newNode;
    return newNode;
}`,
            javascript: `class ListNode {
    constructor(val = 0, prv = null, nxt = null) {
        this.val = val;
        this.prv = prv;
        this.nxt = nxt;
    }
}

// Insert at head - O(1)
const insertAtHead = (head, val) => {
    const newNode = new ListNode(val, null, head);
    if (head !== null) head.prv = newNode;
    return newNode;
};`,
          cpp: `struct ListNode {
    int val;
    ListNode* prv;
    ListNode* nxt;
    ListNode(int x = 0, ListNode* p = nullptr, ListNode* n = nullptr)
        : val(x), prv(p), nxt(n) {}
};

// Insert at head - O(1)
ListNode* insertAtHead(ListNode* head, int val) {
    ListNode* newNode = new ListNode(val, nullptr, head);
    if (head != nullptr) head->prv = newNode;
    return newNode;
}`,
          },
        },
      ],
    },
    {
      id: 'reversal',
      title: 'Reversing a Linked List',
      component: 'reversal-diagram',
      content: `Reversal is the most common linked list operation - and it's a great exercise in pointer manipulation.

The idea: walk through the list, and for each node, make it point to the **previous** node instead of the **next** node. By the time you reach the end, the list is reversed.

You need to track three nodes: **prev**, **current**, and **next** (so you don't lose the rest of the list when you flip the pointer).`,
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
      component: 'fast-slow-diagram',
      content: `Two pointers traverse the list at different speeds - the **slow** pointer moves 1 step, the **fast** pointer moves 2 steps.

This is useful for:

**Find the middle node:** When fast reaches the end, slow is at the middle. (Fast moves twice as fast, so it covers the full distance while slow covers half.)

**Find the nth node from the end:** Move fast n steps ahead, then advance both pointers together. When fast hits the end, slow is at the nth-from-last node.

These patterns work because of the relative speed difference - no extra data structures needed.`,
      codeExamples: [
        {
          title: 'Find middle node',
          code: {
            csharp: `// Find middle node - O(n), O(1) space
ListNode FindMiddle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast?.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
            python: `# Find middle node - O(n), O(1) space
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
            java: `// Find middle node - O(n), O(1) space
public ListNode findMiddle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
            javascript: `// Find middle node - O(n), O(1) space
const findMiddle = (head) => {
    let slow = head, fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
};`,
          cpp: `// Find middle node - O(n), O(1) space
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
      id: 'cycle-detection',
      title: 'Cycle Detection (Floyd\'s Algorithm)',
      component: 'cycle-diagram',
      content: `A **cycle** happens when a node's \`next\` pointer points back to an earlier node instead of null - creating an infinite loop.

**Floyd's algorithm (tortoise & hare):** Use the same fast/slow pointer technique. Slow moves 1 step, fast moves 2 steps. If they ever point to the same node, there's a cycle. If fast reaches the end (null), there isn't.

The intuition: on a circular track, a faster runner will eventually lap a slower runner. In a straight line, the faster runner just reaches the finish line first.`,
      codeExamples: [
        {
          title: 'Detect cycle (Floyd\'s algorithm)',
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
}`,
            python: `# Detect cycle - O(n), O(1) space
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
            java: `// Detect cycle - O(n), O(1) space
public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
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
}`,
          },
        },
      ],
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes',
      content: `**Losing the head of the list**
If you move your head pointer without saving it first, you lose the entire list. Always keep a separate reference, or use a dummy node.

**Null dereference on .next**
Always check that both the node **and** its .next are non-null before accessing .next.next. This is the most common linked list bug.

**Forgetting to "save next" during reversal**
In reversal: you must save \`curr.next\` before overwriting it. Without \`ListNode next = curr.next\`, you lose the rest of the list.

**Assuming O(1) index access**
\`list[5]\` on a linked list is O(n) - you have to walk 5 pointers. Arrays are for random access; linked lists are for sequential access with cheap insertions/deletions.

**Starting fast/slow pointers incorrectly in cycle detection**
Both pointers should start at head, not head.next. Starting fast at head.next can miss cycles in edge cases.`,
    },
    {
      id: 'common-patterns',
      title: 'Key Patterns to Remember',
      content: `1. **Reverse** - full reversal, reverse between positions, reverse in k-groups
2. **Merge** - merge two sorted lists, merge k sorted lists
3. **Fast & slow** - cycle detection, middle node, palindrome check
4. **Dummy head** - create a dummy node before the real head to simplify edge cases (especially deletions)
5. **Two lists** - intersection, addition (sum two numbers as linked lists)`,
    },
    {
      id: 'whats-next',
      title: 'What\'s Next?',
      content: `Linked lists introduced you to the idea that data doesn't have to be stored in contiguous memory. Nodes can be anywhere, connected by pointers.

Now we'll look at two structures that build on this idea but add restrictions on how you can interact with them: **Stacks & Queues**.

A stack is like a stack of plates - you can only add or remove from the top (Last In, First Out). A queue is like a line at a store - the first person in line is the first person served (First In, First Out).

These restrictions might seem limiting, but they simplify reasoning about certain problems enormously.

**Next up: Stacks & Queues**`,
    },
  ],
  problemIds: ['reverse-linked-list', 'merge-two-sorted-lists', 'linked-list-cycle', 'remove-nth-from-end', 'palindrome-linked-list'],
};
