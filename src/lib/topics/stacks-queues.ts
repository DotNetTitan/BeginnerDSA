import type { Topic } from '../types';

export const topic: Topic = {
  id: 'stacks-queues',
  title: 'Stacks & Queues',
  icon: 'Layers',
  order: 5,
  description: 'LIFO and FIFO structures fundamental to parsing, BFS/DFS, and monotonic patterns.',
  difficulty: 'intermediate',
  prerequisites: ['big-o', 'arrays-strings', 'linked-lists'],
  theory: [
    {
      id: 'stack-basics',
      title: 'Stack (LIFO)',
      content: `A stack follows **Last In, First Out**. Think of a stack of plates — you add and remove from the top.

| Operation | Stack |
|---|---|
| Push | O(1) |
| Pop | O(1) |
| Peek | O(1) |

**Uses:** Undo/redo, backtracking, expression evaluation, DFS (implicitly via recursion).`,
      codeExamples: [
        {
          title: 'Stack in C#',
          code: `var stack = new Stack<int>();

stack.Push(1);  // [1]
stack.Push(2);  // [1, 2]
stack.Push(3);  // [1, 2, 3]

int top = stack.Peek();  // 3 (no removal)
int popped = stack.Pop(); // 3, stack is now [1, 2]

// Monotonic stack pattern — maintain increasing/decreasing order
int[] NextGreaterElement(int[] arr) {
    var result = new int[arr.Length];
    Array.Fill(result, -1);
    var monoStack = new Stack<int>(); // stores indices

    for (int i = 0; i < arr.Length; i++) {
        while (monoStack.Count > 0 && arr[i] > arr[monoStack.Peek()]) {
            int idx = monoStack.Pop();
            result[idx] = arr[i];
        }
        monoStack.Push(i);
    }
    return result;
}
// For [2, 1, 3], returns [3, 3, -1]`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'queue-basics',
      title: 'Queue (FIFO)',
      content: `A queue follows **First In, First Out**. Think of a line at a store.

| Operation | Queue |
|---|---|
| Enqueue | O(1) |
| Dequeue | O(1) |
| Peek | O(1) |

**Uses:** BFS, task scheduling, buffering, sliding window.`,
      codeExamples: [
        {
          title: 'Queue in C#',
          code: `var queue = new Queue<int>();

queue.Enqueue(1);  // [1]
queue.Enqueue(2);  // [1, 2]
queue.Enqueue(3);  // [1, 2, 3]

int front = queue.Peek();  // 1 (no removal)
int dequeued = queue.Dequeue(); // 1, queue is now [2, 3]

// BFS template using Queue
void Bfs(TreeNode root) {
    var q = new Queue<TreeNode>();
    q.Enqueue(root);

    while (q.Count > 0) {
        int levelSize = q.Count;
        for (int i = 0; i < levelSize; i++) {
            var node = q.Dequeue();
            Console.Write(node.val + " ");
            if (node.left != null) q.Enqueue(node.left);
            if (node.right != null) q.Enqueue(node.right);
        }
        Console.WriteLine(); // new level
    }
}`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'priority-queue',
      title: 'Priority Queue (.NET 6+)',
      content: `A priority queue dequeues elements by **priority**, not insertion order. In C#, \`PriorityQueue<TElement, TPriority>\` was introduced in .NET 6.

| Operation | PriorityQueue |
|---|---|
| Enqueue | O(log n) |
| Dequeue | O(log n) |
| Peek | O(1) |

**Uses:** Dijkstra's algorithm, Huffman coding, K smallest/largest elements.`,
      codeExamples: [
        {
          title: 'PriorityQueue usage',
          code: `// Min-heap by default (lower priority = dequeued first)
var pq = new PriorityQueue<string, int>();

pq.Enqueue("low", 3);
pq.Enqueue("high", 1);
pq.Enqueue("medium", 2);

string next = pq.Dequeue(); // "high" (priority 1)

// For max-heap, negate priorities or use a custom comparer
var maxHeap = new PriorityQueue<int, int>(
    Comparer<int>.Create((a, b) => b.CompareTo(a))
);

// Top K frequent elements pattern
int[] TopKFrequent(int[] nums, int k) {
    var counts = new Dictionary<int, int>();
    foreach (var n in nums) counts[n] = counts.GetValueOrDefault(n) + 1;

    var heap = new PriorityQueue<int, int>();
    foreach (var kvp in counts) {
        heap.Enqueue(kvp.Key, kvp.Value);
        if (heap.Count > k) heap.Dequeue(); // keep only top K
    }

    var result = new int[k];
    for (int i = 0; i < k; i++) result[i] = heap.Dequeue();
    return result;
}`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'csharp-notes',
      title: 'C# Specific Notes',
      content: `**Stack<T> and Queue<T>** are backed by arrays and resize automatically. They are in \`System.Collections.Generic\`.

**PriorityQueue** is in \`System.Collections.Generic\` and available in .NET 6+. For older .NET, implement your own heap.

**Stack vs Stack<T>:** Avoid the non-generic \`System.Collections.Stack\` (boxing overhead).

**Performance tip:** If you know the approximate size, pass the capacity to the constructor to avoid resizing:
\`\`\`csharp
var stack = new Stack<int>(1000);
var queue = new Queue<int>(1000);
\`\`\``,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Monotonic stack** — next greater element, daily temperatures, largest rectangle in histogram
2. **Valid parentheses** — classic stack problem with matching brackets
3. **Queue with two stacks** — implement a queue using two stacks
4. **Min stack** — stack that supports GetMin() in O(1)
5. **Level-order traversal** — BFS using a queue (tree problems)
6. **Top K elements** — use PriorityQueue to efficiently track K largest/smallest`,
    },
  ],
  problemIds: ['valid-parentheses', 'min-stack', 'daily-temperatures', 'implement-queue-using-stacks', 'top-k-frequent-elements'],
};
