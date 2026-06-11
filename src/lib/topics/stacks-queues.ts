import type { Topic } from '../types';

export const topic: Topic = {
  id: 'stacks-queues',
  title: 'Stacks & Queues',
  icon: 'Layers',
  order: 5,
  description: 'LIFO and FIFO structures fundamental to parsing and monotonic patterns.',
  difficulty: 'intermediate',
  prerequisites: ['big-o', 'arrays-strings', 'linked-lists'],
  theory: [
    {
      id: 'why-stacks-queues',
      title: 'Imposing Rules to Gain Clarity',
      content: `So far, every data structure you've seen lets you access elements freely - you can read, insert, or delete from anywhere.

But sometimes, **restricting how you access data** actually makes problems easier to solve.

Think of a text editor's undo feature. You press Ctrl+Z, and the **most recent** action is undone. It doesn't matter what you did 10 steps ago - you only care about the last thing. That's a stack.

Or think of a printer queue. Documents are printed in the order they were sent - first come, first served. That's a queue.

These restrictions aren't weaknesses. They're **contracts** that make the behavior predictable. When you see a problem that involves "most recent first" or "first come, first served," you know exactly which tool to reach for.`,
    },
    {
      id: 'stack-basics',
      title: 'Stack - Last In, First Out (LIFO)',
      component: 'stack-diagram',
      content: `A stack is like a stack of plates. You add a plate to the top (push), and you take a plate from the top (pop). The plate at the bottom might stay there for a long time - you can't touch it without removing everything above it.

**Three operations, all O(1):**
- **Push** - add an item to the top
- **Pop** - remove and return the top item
- **Peek/Top** - look at the top item without removing it

**Classic uses:** undo/redo, parsing expressions, checking balanced brackets, backtracking in algorithms (we'll see this in the Recursion module).`,
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

// Check balanced parentheses - O(n), O(n) space
bool IsValid(string s) {
    var stack = new Stack<char>();
    var map = new Dictionary<char, char> {
        [')'] = '(', [']'] = '[', ['}'] = '{'
    };

    foreach (char c in s) {
        if (map.ContainsKey(c)) {
            if (stack.Count == 0 || stack.Pop() != map[c]) return false;
        } else {
            stack.Push(c);
        }
    }
    return stack.Count == 0;
}
// "()[]{}" → true,  "(]" → false`,
            python: `stack = []

stack.append(1)  # [1]
stack.append(2)  # [1, 2]
stack.append(3)  # [1, 2, 3]

top = stack[-1]     # 3 (no removal)
popped = stack.pop()  # 3, stack is now [1, 2]

# Check balanced parentheses - O(n), O(n) space
def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}

    for c in s:
        if c in pairs:
            if not stack or stack.pop() != pairs[c]:
                return False
        else:
            stack.append(c)
    return not stack
# "()[]{}" → True,  "(]" → False`,
            java: `import java.util.*;

Deque<Character> stack = new ArrayDeque<>();

stack.push('a');
stack.push('b');
stack.pop();  // removes 'b'

// Check balanced parentheses - O(n), O(n) space
public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    Map<Character, Character> map = Map.of(
        ')', '(', ']', '[', '}', '{'
    );

    for (char c : s.toCharArray()) {
        if (map.containsKey(c)) {
            if (stack.isEmpty() || stack.pop() != map.get(c)) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.isEmpty();
}
// "()[]{}" → true,  "(]" → false`,
            typescript: `const stack = [];

stack.push(1);  // [1]
stack.push(2);  // [1, 2]
stack.push(3);  // [1, 2, 3]

const top = stack[stack.length - 1]; // 3 (no removal)
const popped = stack.pop();          // 3, stack is now [1, 2]

// Check balanced parentheses - O(n), O(n) space
const isValid = (s) => {
    const stack = [];
    const pairs = { ')': '(', ']': '[', '}': '{' };

    for (const c of s) {
        if (c in pairs) {
            if (stack.length === 0 || stack.pop() !== pairs[c]) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
};
// "()[]{}" → true,  "(]" → false`,
          cpp: `#include <stack>
#include <vector>
#include <iostream>

std::stack<int> st;

st.push(1);  // [1]
st.push(2);  // [1, 2]
st.push(3);  // [1, 2, 3]

int top = st.top();   // 3 (no removal)
st.pop();             // removes top, stack is now [1, 2]

// Check balanced parentheses - O(n), O(n) space
bool isValid(const std::string& s) {
    std::stack<char> st;
    std::unordered_map<char, char> pairs = {
        {')', '('}, {']', '['}, {'}', '{'}
    };

    for (char c : s) {
        if (pairs.count(c)) {
            if (st.empty() || st.top() != pairs[c]) return false;
            st.pop();
        } else {
            st.push(c);
        }
    }
    return st.empty();
}
// "()[]{}" → true,  "(]" → false`,
          },
        },
      ],
    },
    {
      id: 'queue-basics',
      title: 'Queue - First In, First Out (FIFO)',
      component: 'queue-diagram',
      content: `A queue is like a line at a grocery store. The first person in line is the first person served. New people join at the back.

**Three operations, all O(1):**
- **Enqueue** - add an item to the back
- **Dequeue** - remove and return the front item
- **Peek** - look at the front item without removing it

**Classic uses:** task scheduling, buffering data streams, Breadth-First Search (we'll use this extensively in the Trees and Graphs modules).`,
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

// Processing items in FIFO order
var q = new Queue<int>();
q.Enqueue(1);
q.Enqueue(2);
q.Enqueue(3);

while (q.Count > 0) {
    int item = q.Dequeue();
    Console.Write(item + " ");
}
// Output: 1 2 3`,
            python: `from collections import deque

queue = deque()

queue.append(1)   # [1]
queue.append(2)   # [1, 2]
queue.append(3)   # [1, 2, 3]

front = queue[0]      # 1 (no removal)
dequeued = queue.popleft()  # 1, queue is now [2, 3]

# Processing items in FIFO order
q = deque([1, 2, 3])
while q:
    print(q.popleft(), end=" ")
# Output: 1 2 3`,
            java: `import java.util.*;

Queue<Integer> queue = new LinkedList<>();

queue.offer(1);  // [1]
queue.offer(2);  // [1, 2]
queue.offer(3);  // [1, 2, 3]

int front = queue.peek();  // 1 (no removal)
int dequeued = queue.poll(); // 1, queue is now [2, 3]

// Processing items in FIFO order
Queue<Integer> q = new LinkedList<>();
q.offer(1);
q.offer(2);
q.offer(3);

while (!q.isEmpty()) {
    System.out.print(q.poll() + " ");
}
// Output: 1 2 3`,
            typescript: `const queue = [];

queue.push(1);  // [1]
queue.push(2);  // [1, 2]
queue.push(3);  // [1, 2, 3]

const front = queue[0];       // 1 (no removal)
const dequeued = queue.shift(); // 1, queue is now [2, 3]

// Note: shift() in JS is O(n) - use an index or a proper queue for large data
// Processing items in FIFO order
const q = [1, 2, 3];
while (q.length > 0) {
    console.log(q.shift() + " ");
}
// Output: 1 2 3`,
          cpp: `#include <queue>
#include <iostream>

std::queue<int> q;

q.push(1);  // [1]
q.push(2);  // [1, 2]
q.push(3);  // [1, 2, 3]

int front = q.front();  // 1 (no removal)
q.pop();                // removes front, queue is now [2, 3]

// Processing items in FIFO order
std::queue<int> q2;
q2.push(1);
q2.push(2);
q2.push(3);

while (!q2.empty()) {
    std::cout << q2.front() << " ";
    q2.pop();
}
// Output: 1 2 3`,
          },
        },
      ],
    },
    {
      id: 'priority-queue',
      title: 'Priority Queue (Heap)',
      content: `A **priority queue** is like a queue, but instead of "first come, first served," it serves the **highest priority** item first - regardless of when it arrived.

This is implemented with a **heap** — a binary tree where the parent always has higher priority than its children. A heap supports:
- Insert: O(log n)
- Remove highest priority: O(log n)
- Peek at highest priority: O(1)

**Classic uses:** "Top K" problems, task scheduling, merging K sorted lists, Dijkstra's algorithm for shortest paths.`,
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

// Process tasks by priority
var tasks = new PriorityQueue<string, int>();
tasks.Enqueue("Write report", 3);
tasks.Enqueue("Fix critical bug", 1);
tasks.Enqueue("Review PR", 2);

while (tasks.Count > 0) {
    string task = tasks.Dequeue();
    Console.WriteLine($"Processing: {task}");
}
// Output: Fix critical bug, Review PR, Write report

// For max-heap, negate priorities or use a custom comparer
var maxHeap = new PriorityQueue<int, int>(
    Comparer<int>.Create((a, b) => b.CompareTo(a))
);`,
            python: `import heapq

# Min-heap by default (lower value = popped first)
pq = []
heapq.heappush(pq, (3, "low"))
heapq.heappush(pq, (1, "high"))
heapq.heappush(pq, (2, "medium"))

next_item = heapq.heappop(pq)[1]  # "high" (priority 1)

# Process tasks by priority
tasks = []
heapq.heappush(tasks, (3, "Write report"))
heapq.heappush(tasks, (1, "Fix critical bug"))
heapq.heappush(tasks, (2, "Review PR"))

while tasks:
    task = heapq.heappop(tasks)[1]
    print(f"Processing: {task}")
# Output: Fix critical bug, Review PR, Write report

# For max-heap, negate priorities
max_heap = []`,
            java: `import java.util.*;

// Min-heap by default (lower priority = dequeued first)
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
pq.offer(new int[]{3, 0}); // (priority, value)
pq.offer(new int[]{1, 0});
pq.offer(new int[]{2, 0});

int[] next = pq.poll(); // {1, 0} (priority 1)

// Process tasks by priority
PriorityQueue<String> tasks = new PriorityQueue<>(
    (a, b) -> Integer.compare(getPriority(a), getPriority(b))
);
// For a simpler approach, store priority with task:
PriorityQueue<int[]> taskQueue = new PriorityQueue<>((a, b) -> a[0] - b[0]);
taskQueue.offer(new int[]{3, 0}); // (priority, taskId)
taskQueue.offer(new int[]{1, 0});
taskQueue.offer(new int[]{2, 0});

while (!taskQueue.isEmpty()) {
    int[] task = taskQueue.poll();
    System.out.println("Processing task with priority: " + task[0]);
}

// For max-heap, reverse comparator
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);`,
            typescript: `// Priority queue can be implemented with a binary heap.
// Many JS runtimes now include a built-in PriorityQueue:

// Process tasks by priority
const tasks = [];
tasks.push({ priority: 3, name: "Write report" });
tasks.push({ priority: 1, name: "Fix critical bug" });
tasks.push({ priority: 2, name: "Review PR" });

tasks.sort((a, b) => a.priority - b.priority);
while (tasks.length > 0) {
    const task = tasks.shift();
    console.log("Processing: " + task.name);
}
// Output: Fix critical bug, Review PR, Write report

// For many items, use a proper heap to avoid O(n log n) sort each time`,
          cpp: `#include <queue>
#include <vector>
#include <string>
#include <iostream>

// Min-heap: priority queue using greater comparator
std::priority_queue<std::pair<int, std::string>,
    std::vector<std::pair<int, std::string>>,
    std::greater<>> pq;
pq.push({3, "low"});
pq.push({1, "high"});
pq.push({2, "medium"});

auto next = pq.top(); // "high" (priority 1)
pq.pop();

// Process tasks by priority
std::priority_queue<std::pair<int, std::string>,
    std::vector<std::pair<int, std::string>>,
    std::greater<>> tasks;
tasks.push({3, "Write report"});
tasks.push({1, "Fix critical bug"});
tasks.push({2, "Review PR"});

while (!tasks.empty()) {
    auto task = tasks.top();
    tasks.pop();
    std::cout << "Processing: " << task.second << std::endl;
}
// Output: Fix critical bug, Review PR, Write report

// For max-heap, use default (largest is top)
std::priority_queue<int> maxHeap;`,
          },
        },
      ],
    },
    {
      id: 'when-to-use-stacks-queues',
      title: 'Which One Do I Use?',
      content: `**Stack (LIFO) - "most recent first"**
- Undo/redo, backtracking, parsing nested structures
- Problems where the **most recent** element is what matters
- Signal keywords: "nested", "backtrack", "most recent", "undo"

**Queue (FIFO) - "first come, first served"**
- Task scheduling, buffering, BFS traversal
- Problems where **order of arrival** determines priority
- Signal keywords: "streaming", "buffer", "order of arrival"

**Priority Queue (Heap) - "most important first"**
- K smallest/largest elements, scheduling with priorities
- When you need to repeatedly extract the min or max
- Signal keywords: "top K", "K smallest/largest", "merge K sorted"`,
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes',
      content: `**Popping from an empty stack**
Always check that the stack isn't empty before popping. An empty pop is a runtime error in most languages.

**Using a queue when you need a stack (or vice versa)**
LIFO vs FIFO: if you need "most recent first", it's a stack. If you need "first come, first served", it's a queue. Getting this wrong means your algorithm processes data in the wrong order.

**TypeScript: shift() is O(n)**
Using \`arr.shift()\` in JavaScript re-indexes the entire array. For large queues, use an index pointer, a proper queue implementation, or a deque.

**Priority queue comparator confusion**
In a min-heap, the smallest element comes out first. In a max-heap, the largest. Double-check which default your language uses before writing logic around it.

**Stack overflow with recursion**
Every recursive call uses stack space. For deep recursion (thousands of calls), consider an iterative approach with an explicit stack. We'll cover this trade-off more in the Recursion module.`,
    },
    {
      id: 'common-patterns',
      title: 'Key Patterns to Remember',
      content: `1. **Monotonic stack** - next greater element, daily temperatures
2. **Valid parentheses** - classic stack problem with matching brackets
3. **Queue with two stacks** - implement a queue using two stacks
4. **Min stack** - stack that supports GetMin() in O(1)
5. **Queue-based processing** - processing items in arrival order (BFS)
6. **Top K elements** - use a priority queue to efficiently track K largest/smallest`,
    },
    {
      id: 'whats-next',
      title: 'What\'s Next?',
      content: `Stacks and queues are your first encounter with **restricted-access** data structures. You're starting to see a theme: different structures make different trade-offs.

Now we get to one of the most mind-bending topics in computer science: **Recursion & Backtracking**.

Recursion is when a function calls itself. It sounds circular and useless at first, but it's actually the key to solving problems that have a naturally self-similar structure - like navigating nested folders, exploring game trees, or generating all possible combinations.

And yes - recursion uses a **stack** under the hood (the call stack). So you already know more about how it works than you think.

**Next up: Recursion & Backtracking**`,
    },
  ],
  problemIds: ['valid-parentheses', 'min-stack', 'daily-temperatures', 'implement-queue-using-stacks', 'top-k-frequent-elements'],
};
