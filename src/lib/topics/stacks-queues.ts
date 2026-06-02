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
          title: 'Stack usage',
          code: {
            csharp: `var stack = new Stack<int>();

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
            python: `stack = []

stack.append(1)  # [1]
stack.append(2)  # [1, 2]
stack.append(3)  # [1, 2, 3]

top = stack[-1]     # 3 (no removal)
popped = stack.pop()  # 3, stack is now [1, 2]

# Monotonic stack pattern — maintain increasing/decreasing order
def next_greater_element(arr):
    result = [-1] * len(arr)
    mono_stack = []  # stores indices

    for i in range(len(arr)):
        while mono_stack and arr[i] > arr[mono_stack[-1]]:
            idx = mono_stack.pop()
            result[idx] = arr[i]
        mono_stack.append(i)
    return result
# For [2, 1, 3], returns [3, 3, -1]`,
            java: `import java.util.*;

Deque<Integer> stack = new ArrayDeque<>();

stack.push(1);  // [1]
stack.push(2);  // [1, 2]
stack.push(3);  // [1, 2, 3]

int top = stack.peek();   // 3 (no removal)
int popped = stack.pop(); // 3, stack is now [1, 2]

// Monotonic stack pattern — maintain increasing/decreasing order
public int[] nextGreaterElement(int[] arr) {
    int[] result = new int[arr.length];
    Arrays.fill(result, -1);
    Deque<Integer> monoStack = new ArrayDeque<>(); // stores indices

    for (int i = 0; i < arr.length; i++) {
        while (!monoStack.isEmpty() && arr[i] > arr[monoStack.peek()]) {
            int idx = monoStack.pop();
            result[idx] = arr[i];
        }
        monoStack.push(i);
    }
    return result;
}
// For [2, 1, 3], returns [3, 3, -1]`,
            javascript: `const stack = [];

stack.push(1);  // [1]
stack.push(2);  // [1, 2]
stack.push(3);  // [1, 2, 3]

const top = stack[stack.length - 1]; // 3 (no removal)
const popped = stack.pop();          // 3, stack is now [1, 2]

// Monotonic stack pattern — maintain increasing/decreasing order
const nextGreaterElement = (arr) => {
    const result = new Array(arr.length).fill(-1);
    const monoStack = []; // stores indices

    for (let i = 0; i < arr.length; i++) {
        while (monoStack.length > 0 && arr[i] > arr[monoStack[monoStack.length - 1]]) {
            const idx = monoStack.pop();
            result[idx] = arr[i];
        }
        monoStack.push(i);
    }
    return result;
};
// For [2, 1, 3], returns [3, 3, -1]`,
          cpp: `#include <stack>
#include <vector>
#include <iostream>

std::stack<int> st;

st.push(1);  // [1]
st.push(2);  // [1, 2]
st.push(3);  // [1, 2, 3]

int top = st.top();   // 3 (no removal)
st.pop();             // removes top, stack is now [1, 2]

// Monotonic stack pattern — maintain increasing/decreasing order
std::vector<int> nextGreaterElement(const std::vector<int>& arr) {
    std::vector<int> result(arr.size(), -1);
    std::stack<int> monoStack; // stores indices

    for (int i = 0; i < arr.size(); i++) {
        while (!monoStack.empty() && arr[i] > arr[monoStack.top()]) {
            int idx = monoStack.top();
            monoStack.pop();
            result[idx] = arr[i];
        }
        monoStack.push(i);
    }
    return result;
}
// For [2, 1, 3], returns [3, 3, -1]`,
          },
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
          title: 'Queue usage',
          code: {
            csharp: `var queue = new Queue<int>();

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
            python: `from collections import deque

queue = deque()

queue.append(1)   # [1]
queue.append(2)   # [1, 2]
queue.append(3)   # [1, 2, 3]

front = queue[0]      # 1 (no removal)
dequeued = queue.popleft()  # 1, queue is now [2, 3]

# BFS template using deque
def bfs(root):
    q = deque([root])
    while q:
        level_size = len(q)
        for _ in range(level_size):
            node = q.popleft()
            print(node.val, end=" ")
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        print()  # new level`,
            java: `import java.util.*;

Queue<Integer> queue = new LinkedList<>();

queue.offer(1);  // [1]
queue.offer(2);  // [1, 2]
queue.offer(3);  // [1, 2, 3]

int front = queue.peek();  // 1 (no removal)
int dequeued = queue.poll(); // 1, queue is now [2, 3]

// BFS template using Queue
public void bfs(TreeNode root) {
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);

    while (!q.isEmpty()) {
        int levelSize = q.size();
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = q.poll();
            System.out.print(node.val + " ");
            if (node.left != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        System.out.println(); // new level
    }
}`,
            javascript: `const queue = [];

queue.push(1);  // [1]
queue.push(2);  // [1, 2]
queue.push(3);  // [1, 2, 3]

const front = queue[0];       // 1 (no removal)
const dequeued = queue.shift(); // 1, queue is now [2, 3]

// BFS template using array as queue (index pointer avoids O(n) shift)
const bfs = (root) => {
    const q = [root];
    let idx = 0;
    while (idx < q.length) {
        const levelSize = q.length - idx;
        for (let i = 0; i < levelSize; i++) {
            const node = q[idx++];
            console.log(node.val + " ");
            if (node.left !== null) q.push(node.left);
            if (node.right !== null) q.push(node.right);
        }
        console.log(); // new level
    }
};`,
          cpp: `#include <queue>
#include <iostream>

std::queue<int> q;

q.push(1);  // [1]
q.push(2);  // [1, 2]
q.push(3);  // [1, 2, 3]

int front = q.front();  // 1 (no removal)
q.pop();                // removes front, queue is now [2, 3]

// BFS template using Queue
void bfs(TreeNode* root) {
    if (root == nullptr) return;
    std::queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = q.size();
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            std::cout << node->val << " ";
            if (node->left != nullptr) q.push(node->left);
            if (node->right != nullptr) q.push(node->right);
        }
        std::cout << "\n"; // new level
    }
}`,
          },
        },
      ],
    },
    {
      id: 'priority-queue',
      title: 'Priority Queue',
      content: `A priority queue dequeues elements by **priority**, not insertion order.

| Operation | Priority Queue |
|---|---|
| Enqueue | O(log n) |
| Dequeue | O(log n) |
| Peek | O(1) |

**Uses:** Dijkstra's algorithm, Huffman coding, K smallest/largest elements.`,
      codeExamples: [
        {
          title: 'PriorityQueue usage',
          code: {
            csharp: `// Min-heap by default (lower priority = dequeued first)
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
            python: `import heapq

# Min-heap by default (lower value = popped first)
pq = []
heapq.heappush(pq, (3, "low"))
heapq.heappush(pq, (1, "high"))
heapq.heappush(pq, (2, "medium"))

next_item = heapq.heappop(pq)[1]  # "high" (priority 1)

# For max-heap, negate priorities
max_heap = []

# Top K frequent elements pattern
def top_k_frequent(nums, k):
    counts = {}
    for n in nums:
        counts[n] = counts.get(n, 0) + 1

    heap = []
    for num, freq in counts.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)  # keep only top K

    result = []
    for _ in range(k):
        result.append(heapq.heappop(heap)[1])
    return result`,
            java: `import java.util.*;

// Min-heap by default (lower priority = dequeued first)
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
pq.offer(new int[]{3, 0}); // (priority, value)
pq.offer(new int[]{1, 0});
pq.offer(new int[]{2, 0});

int[] next = pq.poll(); // {1, 0} (priority 1)

// For max-heap, reverse comparator
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);

// Top K frequent elements pattern
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> counts = new HashMap<>();
    for (int n : nums) counts.put(n, counts.getOrDefault(n, 0) + 1);

    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    for (Map.Entry<Integer, Integer> e : counts.entrySet()) {
        heap.offer(new int[]{e.getValue(), e.getKey()});
        if (heap.size() > k) heap.poll(); // keep only top K
    }

    int[] result = new int[k];
    for (int i = 0; i < k; i++) result[i] = heap.poll()[1];
    return result;
}`,
            javascript: `// Min-heap: use a library like \`@datastructures-js/priority-queue\`
// or implement a simple binary heap.
// Here we show the pattern using a min-heap array approach.

// Top K frequent elements pattern (simple array + sort fallback)
const topKFrequent = (nums, k) => {
    const counts = new Map();
    for (const n of nums) counts.set(n, (counts.get(n) || 0) + 1);

    // Sort entries by frequency descending, take top k
    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([num]) => num);
};`,
          cpp: `#include <queue>
#include <vector>
#include <unordered_map>

// Min-heap: priority queue using greater comparator
std::priority_queue<std::pair<int, std::string>,
    std::vector<std::pair<int, std::string>>,
    std::greater<>> pq;
pq.push({3, "low"});
pq.push({1, "high"});
pq.push({2, "medium"});

auto next = pq.top(); // "high" (priority 1)
pq.pop();

// For max-heap, use default (largest is top)
std::priority_queue<int> maxHeap;

// Top K frequent elements pattern
std::vector<int> topKFrequent(const std::vector<int>& nums, int k) {
    std::unordered_map<int, int> counts;
    for (int n : nums) counts[n]++;

    std::priority_queue<std::pair<int, int>,
        std::vector<std::pair<int, int>>,
        std::greater<>> heap;
    for (auto& [num, freq] : counts) {
        heap.push({freq, num});
        if (heap.size() > k) heap.pop(); // keep only top K
    }

    std::vector<int> result;
    while (!heap.empty()) {
        result.push_back(heap.top().second);
        heap.pop();
    }
    return result;
}`,
          },
        },
      ],
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
