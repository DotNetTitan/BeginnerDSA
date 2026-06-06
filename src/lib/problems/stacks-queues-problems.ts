import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    topicId: 'stacks-queues',
    difficulty: 'easy',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. A string is valid if brackets close in the correct order.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([)]"', output: 'false' },
    ],
    constraints: ['1 <= s.length <= 10^4'],
    hints: ['Use a stack.', 'Push opening brackets, pop and match for closing brackets.'],
    solution: {
      csharp: `public bool IsValid(string s) {
    var stack = new Stack<char>();

    foreach (char c in s) {
        if (c == '(' || c == '{' || c == '[') {
            stack.Push(c);
        } else {
            if (stack.Count == 0) return false;
            char top = stack.Pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '['))
                return false;
        }
    }

    return stack.Count == 0;
}`,
      python: `def is_valid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in pairs:
            if not stack or stack[-1] != pairs[c]:
                return False
            stack.pop()
        else:
            stack.append(c)
    return not stack
`,
      java: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) return false;
            char top = stack.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '['))
                return false;
        }
    }
    return stack.isEmpty();
}`,
      javascript: `function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    for (const c of s) {
        if (c in pairs) {
            if (!stack.length || stack[stack.length - 1] !== pairs[c])
                return false;
            stack.pop();
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
}`,
      cpp: `#include <stack>

bool isValid(const std::string& s) {
    std::stack<char> stack;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);
        } else {
            if (stack.empty()) return false;
            char top = stack.top(); stack.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '['))
                return false;
        }
    }
    return stack.empty();
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
  },
  {
    id: 'min-stack',
    title: 'Min Stack',
    topicId: 'stacks-queues',
    difficulty: 'medium',
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.`,
    examples: [
      { input: 'MinStack minStack = new MinStack(); minStack.Push(-2); minStack.Push(0); minStack.Push(-3); minStack.GetMin(); // return -3 minStack.Pop(); minStack.Top(); // return 0 minStack.GetMin(); // return -2', output: 'null', explanation: 'Implement the MinStack class.' },
    ],
    constraints: ['pop, top, and getMin will always be called on non-empty stacks.'],
    hints: ['Use a second stack to track the minimum at each level.', 'Alternatively, store each element as (value, currentMin).'],
    solution: {
      csharp: `public class MinStack {
    private Stack<(int val, int min)> stack = new();

    public void Push(int val) {
        int min = stack.Count == 0 ? val : Math.Min(val, GetMin());
        stack.Push((val, min));
    }

    public void Pop() => stack.Pop();
    public int Top() => stack.Peek().val;
    public int GetMin() => stack.Peek().min;
}`,
      python: `class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val):
        if not self.stack:
            self.stack.append((val, val))
        else:
            self.stack.append((val, min(val, self.get_min())))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def get_min(self):
        return self.stack[-1][1]
`,
      java: `class MinStack {
    private Stack<int[]> stack = new Stack<>();

    public void push(int val) {
        int min = stack.isEmpty() ? val : Math.min(val, getMin());
        stack.push(new int[]{val, min});
    }

    public void pop() { stack.pop(); }
    public int top() { return stack.peek()[0]; }
    public int getMin() { return stack.peek()[1]; }
}`,
      javascript: `class MinStack {
    constructor() {
        this.stack = [];
    }
    push(val) {
        const min = this.stack.length === 0 ? val : Math.min(val, this.getMin());
        this.stack.push([val, min]);
    }
    pop() {
        this.stack.pop();
    }
    top() {
        return this.stack[this.stack.length - 1][0];
    }
    getMin() {
        return this.stack[this.stack.length - 1][1];
    }
}`,
      cpp: `#include <stack>
#include <utility>

class MinStack {
    std::stack<std::pair<int, int>> st;
public:
    void push(int val) {
        int min = st.empty() ? val : std::min(val, st.top().second);
        st.push({val, min});
    }
    void pop() { st.pop(); }
    int top() { return st.top().first; }
    int getMin() { return st.top().second; }
};`,
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/min-stack/',
  },
  {
    id: 'daily-temperatures',
    title: 'Daily Temperatures',
    topicId: 'stacks-queues',
    difficulty: 'medium',
    description: `Given an array of integers \`temperatures\` representing daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days until a warmer temperature. If no warmer day ahead, \`answer[i] = 0\`.`,
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
      { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' },
    ],
    constraints: ['1 <= temperatures.length <= 10^5'],
    hints: ['Use a monotonic decreasing stack (store indices).', 'When you find a warmer day, pop indices and calculate difference.'],
    solution: {
      csharp: `public int[] DailyTemperatures(int[] temperatures) {
    var result = new int[temperatures.Length];
    var stack = new Stack<int>(); // stores indices

    for (int i = 0; i < temperatures.Length; i++) {
        while (stack.Count > 0 &&
               temperatures[i] > temperatures[stack.Peek()]) {
            int idx = stack.Pop();
            result[idx] = i - idx;
        }
        stack.Push(i);
    }

    return result;
}`,
      python: `def daily_temperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []
    for i in range(len(temperatures)):
        while stack and temperatures[i] > temperatures[stack[-1]]:
            idx = stack.pop()
            result[idx] = i - idx
        stack.append(i)
    return result
`,
      java: `public int[] dailyTemperatures(int[] temperatures) {
    int[] result = new int[temperatures.length];
    Stack<Integer> stack = new Stack<>();
    for (int i = 0; i < temperatures.length; i++) {
        while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
            int idx = stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }
    return result;
}`,
      javascript: `function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = [];
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }
    return result;
}`,
      cpp: `#include <vector>
#include <stack>

std::vector<int> dailyTemperatures(const std::vector<int>& temperatures) {
    std::vector<int> result(temperatures.size(), 0);
    std::stack<int> stack;
    for (int i = 0; i < (int)temperatures.size(); i++) {
        while (!stack.empty() && temperatures[i] > temperatures[stack.top()]) {
            int idx = stack.top(); stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }
    return result;
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/',
  },
  {
    id: 'implement-queue-using-stacks',
    title: 'Implement Queue Using Stacks',
    topicId: 'stacks-queues',
    difficulty: 'easy',
    description: `Implement a first-in-first-out (FIFO) queue using only two stacks.`,
    examples: [
      { input: 'MyQueue q = new MyQueue(); q.Push(1); q.Push(2); q.Peek(); // 1 q.Pop(); // 1 q.Empty(); // false', output: 'null' },
    ],
    constraints: ['All calls are valid (pop/peek on non-empty queue).'],
    hints: ['Use one stack for input, one for output.', 'When output stack is empty, transfer all from input to output.'],
    solution: {
      csharp: `public class MyQueue {
    private Stack<int> input = new();
    private Stack<int> output = new();

    public void Push(int x) => input.Push(x);

    public int Pop() {
        EnsureOutput();
        return output.Pop();
    }

    public int Peek() {
        EnsureOutput();
        return output.Peek();
    }

    public bool Empty() => input.Count == 0 && output.Count == 0;

    private void EnsureOutput() {
        if (output.Count == 0)
            while (input.Count > 0)
                output.Push(input.Pop());
    }
}`,
      python: `class MyQueue:
    def __init__(self):
        self.input = []
        self.output = []

    def push(self, x):
        self.input.append(x)

    def pop(self):
        self._ensure_output()
        return self.output.pop()

    def peek(self):
        self._ensure_output()
        return self.output[-1]

    def empty(self):
        return not self.input and not self.output

    def _ensure_output(self):
        if not self.output:
            while self.input:
                self.output.append(self.input.pop())
`,
      java: `class MyQueue {
    private Stack<Integer> input = new Stack<>();
    private Stack<Integer> output = new Stack<>();

    public void push(int x) { input.push(x); }

    public int pop() {
        ensureOutput();
        return output.pop();
    }

    public int peek() {
        ensureOutput();
        return output.peek();
    }

    public boolean empty() { return input.isEmpty() && output.isEmpty(); }

    private void ensureOutput() {
        if (output.isEmpty())
            while (!input.isEmpty())
                output.push(input.pop());
    }
}`,
      javascript: `class MyQueue {
    constructor() {
        this.input = [];
        this.output = [];
    }
    push(x) {
        this.input.push(x);
    }
    pop() {
        this._ensureOutput();
        return this.output.pop();
    }
    peek() {
        this._ensureOutput();
        return this.output[this.output.length - 1];
    }
    empty() {
        return this.input.length === 0 && this.output.length === 0;
    }
    _ensureOutput() {
        if (this.output.length === 0) {
            while (this.input.length > 0)
                this.output.push(this.input.pop());
        }
    }
}`,
      cpp: `#include <stack>

class MyQueue {
    std::stack<int> input;
    std::stack<int> output;
    void ensureOutput() {
        if (output.empty())
            while (!input.empty()) {
                output.push(input.top());
                input.pop();
            }
    }
public:
    void push(int x) { input.push(x); }
    int pop() { ensureOutput(); int val = output.top(); output.pop(); return val; }
    int peek() { ensureOutput(); return output.top(); }
    bool empty() { return input.empty() && output.empty(); }
};`,
    },
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/',
  },
  {
    id: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements (Heap)',
    topicId: 'stacks-queues',
    difficulty: 'medium',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the k most frequent elements using a heap/priority queue.`,
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    hints: ['Count frequencies, then use a min-heap of size k.', 'PriorityQueue<TElement, TPriority> is your friend.'],
    solution: {
      csharp: `public int[] TopKFrequent(int[] nums, int k) {
    var counts = new Dictionary<int, int>();
    foreach (var n in nums) counts[n] = counts.GetValueOrDefault(n, 0) + 1;

    var heap = new PriorityQueue<int, int>();
    foreach (var kvp in counts) {
        heap.Enqueue(kvp.Key, kvp.Value);
        if (heap.Count > k) heap.Dequeue();
    }

    var result = new int[k];
    for (int i = k - 1; i >= 0; i--)
        result[i] = heap.Dequeue();

    return result;
}`,
      python: `import heapq

def top_k_frequent(nums, k):
    counts = {}
    for n in nums:
        counts[n] = counts.get(n, 0) + 1
    heap = []
    for num, freq in counts.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)
    result = [0] * k
    for i in range(k - 1, -1, -1):
        result[i] = heapq.heappop(heap)[1]
    return result
`,
      java: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> counts = new HashMap<>();
    for (int n : nums) counts.put(n, counts.getOrDefault(n, 0) + 1);
    PriorityQueue<Map.Entry<Integer, Integer>> heap = new PriorityQueue<>(
        (a, b) -> a.getValue() - b.getValue()
    );
    for (Map.Entry<Integer, Integer> e : counts.entrySet()) {
        heap.offer(e);
        if (heap.size() > k) heap.poll();
    }
    int[] result = new int[k];
    for (int i = k - 1; i >= 0; i--)
        result[i] = heap.poll().getKey();
    return result;
}`,
      javascript: `function topKFrequent(nums, k) {
    const counts = new Map();
    for (const n of nums)
        counts.set(n, (counts.get(n) || 0) + 1);
    const heap = [];
    for (const [num, freq] of counts) {
        heap.push([freq, num]);
        heap.sort((a, b) => a[0] - b[0]);
        if (heap.length > k) heap.pop();
    }
    const result = new Array(k);
    for (let i = k - 1; i >= 0; i--)
        result[i] = heap.pop()[1];
    return result;
}`,
      cpp: `#include <vector>
#include <unordered_map>
#include <queue>

std::vector<int> topKFrequentHeap(const std::vector<int>& nums, int k) {
    std::unordered_map<int, int> counts;
    for (int n : nums) counts[n]++;
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> heap;
    for (auto& kv : counts) {
        heap.push({kv.second, kv.first});
        if ((int)heap.size() > k) heap.pop();
    }
    std::vector<int> result(k);
    for (int i = k - 1; i >= 0; i--) {
        result[i] = heap.top().second;
        heap.pop();
    }
    return result;
}`,
    },
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(n + k)',
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
  },
];
