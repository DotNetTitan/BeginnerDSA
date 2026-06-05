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
      component: 'singly-linked-list',
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
      id: 'doubly-linked-lists',
      title: 'Doubly Linked Lists',
      component: 'doubly-linked-list',
      content: `A **doubly linked list** node stores two pointers: \`prv\` (previous) and \`nxt\` (next), allowing traversal in both directions.

**Singly vs Doubly:**

| Feature | Singly | Doubly |
|---|---|---|
| Pointers per node | 1 (\`nxt\`) | 2 (\`prv\` + \`nxt\`) |
| Memory per node | Less | More |
| Traverse backward | O(n) - must restart from head | O(1) - just follow \`prv\` |
| Tail access / delete | O(n) - must traverse to find previous | O(1) - tail has \`prv\` pointer |
| Insert before a node | O(n) - need to find previous | O(1) - node has \`prv\` |

**When to use doubly:**
- You need **O(1) tail operations** (delete last, add to end in a raw list)
- You need **backward traversal** (undo/redo, browser history)
- You frequently **insert/delete before a known node**

**When to stick with singly:**
- **Memory is constrained** (every \`prv\` pointer adds overhead)
- You only need **forward-only traversal**
- The list is **small** (the O(n) cost of traversal is negligible)`,
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
      component: 'fast-slow-diagram',
      content: `Two pointers traverse the list at different speeds. The **slow** pointer moves 1 step, the **fast** pointer moves 2 steps.

**Find middle node:** When \`fast\` reaches the end, \`slow\` is at the middle. This works because fast moves twice as fast.

**Find nth from end:** Move \`fast\` n steps ahead, then advance both until \`fast\` reaches the end. \`slow\` will be at the nth node from the end.`,
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
      content: `A **cycle** occurs when a node's \`nxt\` pointer points back to an earlier node instead of \`null\`, creating an infinite loop.

**Floyd's algorithm (tortoise & hare):** Use two pointers. \`slow\` moves 1 step, \`fast\` moves 2 steps. If they meet, a cycle exists.

**Key insight:** In the diagram above, node \`4\` points back to node \`2\` instead of \`null\`. This means \`fast\` will eventually lap around and meet \`slow\` from behind.`,
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
      title: 'Common Mistakes / Gotchas',
      content: `**Losing reference to the head:** If you move your head pointer without saving it first, you lose the entire list. Always keep a separate reference to head, or use a dummy node.

**Null dereference on .next:** Always check \`node?.next != null\` (or \`node != null && node.next != null\`) before accessing \`node.next.next\`. This is the most common linked list bug.

**Forgetting the "save next" step in reversal:** In iterative reversal: you must save \`curr.next\` before overwriting it. Without \`ListNode next = curr.next\`, you lose the rest of the list.

**Assuming built-in linked list has O(1) index access:** No - \`list[5]\` on a linked list is O(n). That's why array lists exist.

**Cycle detection without correct initialization:** Floyd's algorithm: start BOTH slow and fast at head. Starting fast at head.next can miss cycles in edge cases.`,
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
