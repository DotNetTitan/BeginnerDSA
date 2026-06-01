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
    constraints: ['1 <= s.length <= 10⁴'],
    hints: ['Use a stack.', 'Push opening brackets, pop and match for closing brackets.'],
    solution: `public bool IsValid(string s) {
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
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
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
    solution: `public class MinStack {
    private Stack<(int val, int min)> stack = new();

    public void Push(int val) {
        int min = stack.Count == 0 ? val : Math.Min(val, GetMin());
        stack.Push((val, min));
    }

    public void Pop() => stack.Pop();
    public int Top() => stack.Peek().val;
    public int GetMin() => stack.Peek().min;
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
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
    constraints: ['1 <= temperatures.length <= 10⁵'],
    hints: ['Use a monotonic decreasing stack (store indices).', 'When you find a warmer day, pop indices and calculate difference.'],
    solution: `public int[] DailyTemperatures(int[] temperatures) {
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
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
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
    solution: `public class MyQueue {
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
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(n)',
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
    constraints: ['1 <= nums.length <= 10⁵'],
    hints: ['Count frequencies, then use a min-heap of size k.', 'PriorityQueue<TElement, TPriority> is your friend.'],
    solution: `public int[] TopKFrequent(int[] nums, int k) {
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
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(n + k)',
  },
];
