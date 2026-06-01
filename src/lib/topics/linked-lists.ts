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
          code: `public class ListNode {
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
          language: 'csharp',
        },
      ],
    },
    {
      id: 'reversal',
      title: 'Reversing a Linked List',
      content: `Reversal is the most common linked list operation. The key: track three nodes — **prev**, **current**, and **next** — and reverse the pointer direction at each step.`,
      codeExamples: [
        {
          title: 'Iterative reversal',
          code: `// Reverse a singly linked list — O(n), O(1) space
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
          language: 'csharp',
        },
      ],
    },
    {
      id: 'fast-slow-pointer',
      title: 'Fast & Slow Pointer',
      content: `Two pointers traverse the list at different speeds. The **slow** pointer moves 1 step, the **fast** pointer moves 2 steps.

**Applications:**
- **Cycle detection** — if fast meets slow, there's a cycle (Floyd's algorithm)
- **Find middle** — when fast reaches the end, slow is at the middle
- **Find nth from end** — move fast n steps ahead, then advance both`,
      codeExamples: [
        {
          title: 'Cycle detection and find middle',
          code: `// Detect cycle — O(n), O(1) space
bool HasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast?.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}

// Find middle node — O(n), O(1) space
ListNode FindMiddle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast?.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'csharp-notes',
      title: 'C# Specific Notes',
      content: `**LinkedList<T> (built-in)**
\`\`\`csharp
var list = new LinkedList<int>();
list.AddLast(1);    // O(1)
list.AddFirst(2);   // O(1)
var first = list.First; // LinkedListNode<int>
var last = list.Last;
list.Remove(first); // O(1)
\`\`\`

**For interviews**, you'll typically define your own \`ListNode\` class (as shown above). The built-in \`LinkedList<T>\` is rarely used in interview problems — it doesn't expose the internal node structure easily.

**Recursion warning:** Recursive linked list solutions use O(n) stack space. If n is large (10⁵+), prefer iterative approaches to avoid stack overflow.`,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Reverse** — full reversal, reverse between positions, reverse in k-groups
2. **Merge** — merge two sorted lists, merge k sorted lists
3. **Fast & slow** — cycle detection, middle, palindrome check
4. **Dummy head** — create a dummy node before the real head to simplify edge cases (especially with deletions)
5. **Two lists** — intersection, addition (sum two numbers represented as lists)`,
    },
  ],
  problemIds: ['reverse-linked-list', 'merge-two-sorted-lists', 'linked-list-cycle', 'remove-nth-from-end', 'palindrome-linked-list'],
};
