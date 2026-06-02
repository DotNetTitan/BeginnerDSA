import type { Topic } from '../types';

export const topic: Topic = {
  id: 'big-o',
  title: 'Big O & Complexity',
  icon: 'BarChart3',
  order: 1,
  description: 'Analyze how runtime and memory scale with input size. The foundation of every algorithm discussion.',
  difficulty: 'beginner',
  prerequisites: [],
  theory: [
    {
      id: 'what-is-big-o',
      title: 'What is Big O?',
      content: `Big O notation describes how the runtime or memory usage of an algorithm grows as the input size grows. It focuses on the **worst-case scenario** and ignores constants and smaller terms.

Key ideas:
- **Time complexity** — how many operations an algorithm performs
- **Space complexity** — how much extra memory an algorithm uses

Big O answers: "If I double the input, does my algorithm get 2x slower? 4x slower? Or does it not matter?"`,
      codeExamples: [
        {
          title: 'Constant vs Linear growth',
          code: `// O(1) — Constant time: always 1 operation
int GetFirst(int[] arr) => arr[0];

// O(n) — Linear time: n operations
int Sum(int[] arr) {
    int total = 0;
    foreach (var x in arr) total += x;
    return total;
}

// O(n²) — Quadratic time: n² operations
void PrintPairs(int[] arr) {
    for (int i = 0; i < arr.Length; i++)
        for (int j = 0; j < arr.Length; j++)
            Console.WriteLine($"{arr[i]},{arr[j]}");
}`,
          language: 'csharp',
        },
      ],
      table: {
        headers: ['Notation', 'Name', 'Example', 'Feasibility at n=1,000,000'],
        rows: [
          ['O(1)', 'Constant', 'Array lookup by index', 'Instant'],
          ['O(log n)', 'Logarithmic', 'Binary search', '~20 operations'],
          ['O(n)', 'Linear', 'Iterating an array', '1M operations'],
          ['O(n log n)', 'Linearithmic', 'Merge sort / Quick sort', '~20M operations'],
          ['O(n²)', 'Quadratic', 'Nested loops', '1 trillion — too slow'],
          ['O(2ⁿ)', 'Exponential', 'Recursive Fibonacci', 'Impossible'],
        ],
      },
    },
    {
      id: 'rules',
      title: 'Rules of Big O',
      content: `**1. Drop constants**
An algorithm that does 2n + 3 operations is still O(n). We only care about the growth rate.

**2. Drop non-dominant terms**
If an algorithm is O(n + n²), it simplifies to O(n²). The n² term dominates.

**3. Different inputs = different variables**
If you have two arrays of different sizes, use different variables: O(a * b) not O(n²).

**4. Worst case**
Always analyze the worst-case scenario unless specified otherwise.`,
      codeExamples: [
        {
          title: 'Applying the rules',
          code: `// O(n) — drop the constant 2
void PrintTwice(int[] arr) {
    foreach (var x in arr) Console.WriteLine(x);  // n
    foreach (var x in arr) Console.WriteLine(x);  // n
} // 2n → O(n)

// O(n²) — drop non-dominant n term
void Process(int[] arr) {
    foreach (var x in arr) Console.WriteLine(x);   // O(n)
    foreach (var x in arr)                          // O(n²)
        foreach (var y in arr)
            Console.WriteLine($"{x},{y}");
} // O(n + n²) → O(n²)

// O(a + b) — different inputs
void Merge(int[] a, int[] b) {
    foreach (var x in a) Console.WriteLine(x);
    foreach (var y in b) Console.WriteLine(y);
} // O(a + b), NOT O(n)`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'space-complexity',
      title: 'Space Complexity',
      content: `Space complexity measures the **extra memory** an algorithm uses beyond the input itself.

| Space | Example |
|---|---|
| O(1) | In-place array reversal (swap in place) |
| O(n) | Creating a copy of the array |
| O(n²) | 2D matrix of size n×n |

**Stack space matters too:** Recursive calls consume space on the call stack. A recursive function that calls itself n times before returning uses O(n) stack space.`,
      codeExamples: [
        {
          title: 'Space complexity examples',
          code: `// O(1) space — in-place
void ReverseInPlace(int[] arr) {
    int i = 0, j = arr.Length - 1;
    while (i < j) {
        (arr[i], arr[j]) = (arr[j], arr[i]);
        i++; j--;
    }
}

// O(n) space — extra array
int[] CopyArray(int[] arr) {
    var copy = new int[arr.Length];
    Array.Copy(arr, copy, arr.Length);
    return copy;
}

// O(n) stack space — recursion depth
int Factorial(int n) {
    if (n <= 1) return 1;
    return n * Factorial(n - 1);
} // Call stack grows to n frames`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `**"What is the complexity of this function?"**
Walk through: count nested loops, recursive calls, and extra data structures.

**"Can you optimize this?"**
Common pattern: O(n²) → O(n) using a hash map, or O(n) → O(log n) using binary search.

**"What if the input was 10x larger?"**
Use your answer to predict feasibility. An O(n²) algorithm on 1M elements = impossible.
An O(n log n) algorithm on 1M elements = ~20M operations, fine.`,
    },
  ],
  problemIds: ['constant-vs-linear', 'quadratic-vs-linear', 'space-complexity'],
};
