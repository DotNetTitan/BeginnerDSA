import type { Topic } from '../types';

export const topic: Topic = {
  id: 'big-o',
  title: 'Big O & Complexity',
  icon: 'BarChart3',
  order: 1,
  description: 'Analyze how runtime and memory scale with input size. The foundation of every algorithm discussion.',
  difficulty: 'beginner',
  prerequisites: ['intro'],
  theory: [
    {
      id: 'motivating-problem',
      title: 'A Tale of Two Algorithms',
      content: `Imagine you have a phone book with 1,000,000 names, and you're looking for "Zebra, Alice."

**Strategy A - Scan from page 1:**
You start at page 1 and flip through every single page until you find "Zebra, Alice." If the name is at the very end, you check all 1,000,000 entries. Worst case? 1,000,000 checks.

**Strategy B - Open to the middle and compare:**
You open to the middle. If "Zebra" comes after the current page, you throw away the first half and search the second half. You repeat - cutting the remaining pages in half each time. Worst case? About 20 checks. (Try it: 1,000,000 → 500,000 → 250,000 → ... how many steps to get to 1?)

That's the difference between **O(n)** (Strategy A) and **O(log n)** (Strategy B). And the whole point of this module is to give you a simple language to talk about these differences.

When you write code, you're always making choices. Big O helps you answer: *"If my input gets 10x bigger, does my code get 10x slower, 100x slower, or barely slower at all?"*`,
      codeExamples: [
        {
          title: 'Two ways to find a name',
          code: {
            csharp: `// Strategy A: Linear scan - O(n) - check every entry
bool FindLinear(List<string> phoneBook, string target) {
    foreach (var name in phoneBook)
        if (name == target) return true;
    return false;
}

// Strategy B: Binary search - O(log n) - cut in half each time
// (Requires sorted list. We'll cover this in the Sorting & Searching module.)
bool FindBinary(List<string> phoneBook, string target) {
    int left = 0, right = phoneBook.Count - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int cmp = string.Compare(phoneBook[mid], target);
        if (cmp == 0) return true;
        if (cmp < 0) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}`,
            python: `# Strategy A: Linear scan - O(n) - check every entry
def find_linear(phone_book, target):
    for name in phone_book:
        if name == target:
            return True
    return False

# Strategy B: Binary search - O(log n) - cut in half each time
# (Requires sorted list. We'll cover this in the Sorting & Searching module.)
def find_binary(phone_book, target):
    left, right = 0, len(phone_book) - 1
    while left <= right:
        mid = (left + right) // 2
        if phone_book[mid] == target:
            return True
        elif phone_book[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return False`,
            java: `// Strategy A: Linear scan - O(n) - check every entry
public boolean findLinear(List<String> phoneBook, String target) {
    for (String name : phoneBook)
        if (name.equals(target)) return true;
    return false;
}

// Strategy B: Binary search - O(log n) - cut in half each time
// (Requires sorted list. We'll cover this in the Sorting & Searching module.)
public boolean findBinary(List<String> phoneBook, String target) {
    int left = 0, right = phoneBook.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int cmp = phoneBook.get(mid).compareTo(target);
        if (cmp == 0) return true;
        if (cmp < 0) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}`,
            typescript: `// Strategy A: Linear scan - O(n) - check every entry
const findLinear = (phoneBook, target) => {
    for (const name of phoneBook)
        if (name === target) return true;
    return false;
};

// Strategy B: Binary search - O(log n) - cut in half each time
// (Requires sorted list. We'll cover this in the Sorting & Searching module.)
const findBinary = (phoneBook, target) => {
    let left = 0, right = phoneBook.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (phoneBook[mid] === target) return true;
        if (phoneBook[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return false;
};`,
            cpp: `// Strategy A: Linear scan - O(n) - check every entry
bool findLinear(const std::vector<std::string>& phoneBook, const std::string& target) {
    for (const auto& name : phoneBook)
        if (name == target) return true;
    return false;
}

// Strategy B: Binary search - O(log n) - cut in half each time
// (Requires sorted list. We'll cover this in the Sorting & Searching module.)
bool findBinary(const std::vector<std::string>& phoneBook, const std::string& target) {
    int left = 0, right = phoneBook.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (phoneBook[mid] == target) return true;
        if (phoneBook[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}`,
          },
        },
      ],
    },
    {
      id: 'what-is-big-o',
      title: 'What is Big O?',
      content: `Big O notation is the language we use to talk about how fast (or slow) an algorithm is. Think of it as a speed rating for code.

Two key ideas:
- **Time complexity** - how many operations the algorithm performs
- **Space complexity** - how much extra memory it uses

Big O ignores the small stuff. It doesn't care if your computer is fast or slow, or if one loop took 5ms vs 10ms. It cares about **how the runtime grows** as the input gets bigger.

So instead of saying "this takes 4.2 microseconds on my laptop," Big O says **"this grows linearly with input size - O(n)."**

The "O" stands for "order of" (as in "on the order of"). And inside the parentheses, you put how the cost grows relative to the input size.`,
      codeExamples: [
        {
          title: 'Spot the difference',
          code: {
            csharp: `// O(1) - Constant time: same number of operations no matter the input size
int GetFirst(int[] arr) => arr[0];

// O(n) - Linear time: if array is 10x bigger, this is 10x slower
int Sum(int[] arr) {
    int total = 0;
    foreach (var x in arr) total += x;
    return total;
}

// O(n²) - Quadratic time: if array is 10x bigger, this is 100x slower
void PrintPairs(int[] arr) {
    for (int i = 0; i < arr.Length; i++)
        for (int j = 0; j < arr.Length; j++)
            Console.WriteLine($"{arr[i]},{arr[j]}");
}`,
            python: `# O(1) - Constant time: same number of operations no matter the input size
def get_first(arr):
    return arr[0]

# O(n) - Linear time: if array is 10x bigger, this is 10x slower
def sum(arr):
    total = 0
    for x in arr:
        total += x
    return total

# O(n²) - Quadratic time: if array is 10x bigger, this is 100x slower
def print_pairs(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):
            print(f"{arr[i]},{arr[j]}")`,
            java: `// O(1) - Constant time: same number of operations no matter the input size
public int getFirst(int[] arr) { return arr[0]; }

// O(n) - Linear time: if array is 10x bigger, this is 10x slower
public int sum(int[] arr) {
    int total = 0;
    for (int x : arr) total += x;
    return total;
}

// O(n²) - Quadratic time: if array is 10x bigger, this is 100x slower
public void printPairs(int[] arr) {
    for (int i = 0; i < arr.length; i++)
        for (int j = 0; j < arr.length; j++)
            System.out.println(arr[i] + "," + arr[j]);
}`,
            typescript: `// O(1) - Constant time: same number of operations no matter the input size
const getFirst = (arr) => arr[0];

// O(n) - Linear time: if array is 10x bigger, this is 10x slower
const sum = (arr) => {
    let total = 0;
    for (const x of arr) total += x;
    return total;
};

// O(n²) - Quadratic time: if array is 10x bigger, this is 100x slower
const printPairs = (arr) => {
    for (let i = 0; i < arr.length; i++)
        for (let j = 0; j < arr.length; j++)
            console.log(arr[i] + "," + arr[j]);
};`,
            cpp: `// O(1) - Constant time: same number of operations no matter the input size
int getFirst(const std::vector<int>& arr) { return arr[0]; }

// O(n) - Linear time: if array is 10x bigger, this is 10x slower
int sum(const std::vector<int>& arr) {
    int total = 0;
    for (int x : arr) total += x;
    return total;
}

// O(n²) - Quadratic time: if array is 10x bigger, this is 100x slower
void printPairs(const std::vector<int>& arr) {
    for (size_t i = 0; i < arr.size(); i++)
        for (size_t j = 0; j < arr.size(); j++)
            std::cout << arr[i] << "," << arr[j] << "\n";
}`,
          },
        },
      ],
    },
    {
      id: 'common-complexities',
      title: 'The Big O Family',
      content: `Here are the complexity classes you'll see most often. They're listed from fastest to slowest:

**O(1) - Constant time**
No matter how big the input, it takes the same time.
Example: looking up an array element by index. arr[0] on a 10-element array is the same speed as on a 10-million-element array.

**O(log n) - Logarithmic time**
Each step cuts the problem in half. Doubling the input adds just one extra step.
Example: the phone book strategy (binary search) - 1 million entries takes ~20 steps, 2 million takes ~21 steps.

**O(n) - Linear time**
Time grows proportionally with input size. 10x more input = 10x more work.
Example: summing all numbers in an array, or scanning a list to find an item.

**O(n log n) - Linearithmic time**
A bit worse than linear, but still practical for large inputs.
Example: sorting algorithms like Merge Sort and Heap Sort.

**O(n²) - Quadratic time**
Nested loops. 10x more input = 100x more work.
Example: comparing every element to every other element (nested for loops).

**O(2ⁿ) - Exponential time**
Forget about large inputs. Even n = 50 is too many operations.
Example: the naive recursive Fibonacci (we'll look at this in the Recursion module).

Here's how they stack up:`,
      table: {
        headers: ['Notation', 'Name', 'Feasibility at n=1,000,000'],
        rows: [
          ['O(1)', 'Constant', 'Instant'],
          ['O(log n)', 'Logarithmic', '~20 operations'],
          ['O(n)', 'Linear', '1M operations'],
          ['O(n log n)', 'Linearithmic', '~20M operations'],
          ['O(n²)', 'Quadratic', '1 trillion - too slow'],
          ['O(2ⁿ)', 'Exponential', 'Impossible'],
        ],
      },
    },
    {
      id: 'rules',
      title: 'Rules of Big O',
      content: `Big O has a few simple rules that make analysis easier. Once you internalize these, you can estimate complexity at a glance.

**Rule 1: Drop constants.**
An algorithm that does 2n + 3 operations is still O(n). Constants don't change the growth pattern - n, 2n, and 100n all grow linearly.

**Rule 2: Drop non-dominant terms.**
If your algorithm is O(n + n²), it simplifies to O(n²). The n² term dominates as n grows large, so the n term becomes irrelevant.

**Rule 3: Different inputs get different variables.**
If you have two arrays of different sizes, don't call them both n. Use a and b. O(a * b) is very different from O(n²).

**Rule 4: Always analyze the worst case.**
Unless someone specifically asks for the best or average case, assume worst case. That's what Big O measures.`,
      codeExamples: [
        {
          title: 'Applying the rules',
          code: {
            csharp: `// O(n) - drop the constant 2
void PrintTwice(int[] arr) {
    foreach (var x in arr) Console.WriteLine(x);  // n
    foreach (var x in arr) Console.WriteLine(x);  // n
} // 2n → O(n)

// O(n²) - drop non-dominant n term
void Process(int[] arr) {
    foreach (var x in arr) Console.WriteLine(x);   // O(n)
    foreach (var x in arr)                          // O(n²)
        foreach (var y in arr)
            Console.WriteLine($"{x},{y}");
} // O(n + n²) → O(n²)

// O(a + b) - different inputs, different variables
void Merge(int[] a, int[] b) {
    foreach (var x in a) Console.WriteLine(x);
    foreach (var y in b) Console.WriteLine(y);
} // O(a + b), NOT O(n)`,
            python: `# O(n) - drop the constant 2
def print_twice(arr):
    for x in arr: print(x)  # n
    for x in arr: print(x)  # n
# 2n → O(n)

# O(n²) - drop non-dominant n term
def process(arr):
    for x in arr: print(x)   # O(n)
    for x in arr:             # O(n²)
        for y in arr:
            print(f"{x},{y}")
# O(n + n²) → O(n²)

# O(a + b) - different inputs, different variables
def merge(a, b):
    for x in a: print(x)
    for y in b: print(y)
# O(a + b), NOT O(n)`,
            java: `// O(n) - drop the constant 2
public void printTwice(int[] arr) {
    for (int x : arr) System.out.println(x);  // n
    for (int x : arr) System.out.println(x);  // n
} // 2n → O(n)

// O(n²) - drop non-dominant n term
public void process(int[] arr) {
    for (int x : arr) System.out.println(x);   // O(n)
    for (int x : arr)                          // O(n²)
        for (int y : arr)
            System.out.println(x + "," + y);
} // O(n + n²) → O(n²)

// O(a + b) - different inputs, different variables
public void merge(int[] a, int[] b) {
    for (int x : a) System.out.println(x);
    for (int y : b) System.out.println(y);
} // O(a + b), NOT O(n)`,
            typescript: `// O(n) - drop the constant 2
const printTwice = (arr) => {
    for (const x of arr) console.log(x);  // n
    for (const x of arr) console.log(x);  // n
}; // 2n → O(n)

// O(n²) - drop non-dominant n term
const process = (arr) => {
    for (const x of arr) console.log(x);   // O(n)
    for (const x of arr)                    // O(n²)
        for (const y of arr)
            console.log(\`\${x},\${y}\`);
}; // O(n + n²) → O(n²)

// O(a + b) - different inputs, different variables
const merge = (a, b) => {
    for (const x of a) console.log(x);
    for (const y of b) console.log(y);
}; // O(a + b), NOT O(n)`,
          cpp: `// O(n) - drop the constant 2
void printTwice(const std::vector<int>& arr) {
    for (int x : arr) std::cout << x << "\n";  // n
    for (int x : arr) std::cout << x << "\n";  // n
} // 2n → O(n)

// O(n²) - drop non-dominant n term
void process(const std::vector<int>& arr) {
    for (int x : arr) std::cout << x << "\n";   // O(n)
    for (int x : arr)                            // O(n²)
        for (int y : arr)
            std::cout << x << "," << y << "\n";
} // O(n + n²) → O(n²)

// O(a + b) - different inputs, different variables
void merge(const std::vector<int>& a, const std::vector<int>& b) {
    for (int x : a) std::cout << x << "\n";
    for (int y : b) std::cout << y << "\n";
} // O(a + b), NOT O(n)`,
          },
        },
      ],
    },
    {
      id: 'space-complexity',
      title: 'Space Complexity',
      content: `Time isn't the only resource. **Space complexity** measures how much extra memory your algorithm needs beyond the input itself.

Same Big O rules apply, just for memory instead of time.

- **O(1) space** - you're rearranging things in-place, no extra storage
- **O(n) space** - you're creating a copy of the data, or using a data structure that grows with input
- **O(n²) space** - you're building a 2D grid of size n×n

One sneaky source of space usage: the **call stack**. Every time a function calls itself (recursion), it pushes a frame onto the stack. A recursive function that calls itself n times before returning uses O(n) stack space. We'll explore this more in the Recursion module.`,
      codeExamples: [
        {
          title: 'Space complexity examples',
          code: {
            csharp: `// O(1) space - in-place, no extra memory
void ReverseInPlace(int[] arr) {
    int i = 0, j = arr.Length - 1;
    while (i < j) {
        (arr[i], arr[j]) = (arr[j], arr[i]);
        i++; j--;
    }
}

// O(n) space - creates an extra array
int[] CopyArray(int[] arr) {
    var copy = new int[arr.Length];
    Array.Copy(arr, copy, arr.Length);
    return copy;
}

// O(n) stack space - recursion depth
int Factorial(int n) {
    if (n <= 1) return 1;
    return n * Factorial(n - 1);
} // Call stack grows to n frames`,
            python: `# O(1) space - in-place, no extra memory
def reverse_in_place(arr):
    i, j = 0, len(arr) - 1
    while i < j:
        arr[i], arr[j] = arr[j], arr[i]
        i += 1
        j -= 1

# O(n) space - creates an extra list
def copy_array(arr):
    return arr.copy()

# O(n) stack space - recursion depth
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
# Call stack grows to n frames`,
            java: `// O(1) space - in-place, no extra memory
public void reverseInPlace(int[] arr) {
    int i = 0, j = arr.length - 1;
    while (i < j) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
        i++; j--;
    }
}

// O(n) space - creates an extra array
public int[] copyArray(int[] arr) {
    int[] copy = new int[arr.length];
    System.arraycopy(arr, 0, copy, 0, arr.length);
    return copy;
}

// O(n) stack space - recursion depth
public int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
} // Call stack grows to n frames`,
            typescript: `// O(1) space - in-place, no extra memory
const reverseInPlace = (arr) => {
    let i = 0, j = arr.length - 1;
    while (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++; j--;
    }
};

// O(n) space - creates an extra array
const copyArray = (arr) => [...arr];

// O(n) stack space - recursion depth
const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}; // Call stack grows to n frames`,
          cpp: `// O(1) space - in-place, no extra memory
void reverseInPlace(std::vector<int>& arr) {
    int i = 0, j = arr.size() - 1;
    while (i < j) {
        std::swap(arr[i], arr[j]);
        i++; j--;
    }
}

// O(n) space - creates an extra vector
std::vector<int> copyArray(const std::vector<int>& arr) {
    return arr;
}

// O(n) stack space - recursion depth
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
} // Call stack grows to n frames`,
          },
        },
      ],
    },
    {
      id: 'when-complexity-matters',
      title: 'When to Actually Care',
      content: `Big O analysis tells you whether your code will finish in a reasonable time - or whether it'll grind to a halt.

**Care about Big O when:**
- Your input could be **large** (n > 10,000) - O(n²) can become unusable
- You're building an **API or product** - users notice slowdowns
- You're in an **interview** - you'll be asked to analyze and optimize

**Don't obsess when:**
- The input is **small and fixed** (n < 100) - any algorithm is fine
- You're writing a **one-off script** - clarity > performance
- You **haven't measured yet** - don't optimize before you know what's slow

**Quick reference:**
| n | O(n) | O(n log n) | O(n²) | O(2ⁿ) |
|---|---|---|---|---|
| 100 | Instant | Instant | Instant | Too slow |
| 10,000 | Instant | Instant | Slow | Impossible |
| 1,000,000 | Instant | ~20ms | Minutes | Impossible |`,
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes',
      content: `**"O(2n) is the same as O(2ⁿ)"**
No - O(2n) drops the constant and becomes O(n). O(2ⁿ) is exponential and completely different. Never confuse linear with exponential.

**"This is O(n) so it's fast"**
O(n) with n = 10^12 is 10 trillion operations. Always check the actual input size.

**"The best case is O(1), so the algorithm is fast"**
Always analyze the **worst case**. Best case is rarely relevant - it's the worst case that breaks production.

**"I don't need to worry about stack space"**
Recursive functions consume O(depth) stack space. Deep recursion (10,000+ calls) causes stack overflow. We'll revisit this in the Recursion module.

**"Drop constants means constants don't matter"**
In Big O analysis, yes. In practice, no. O(100n) is 100x slower than O(n), even though both simplify to O(n).`,
    },
    {
      id: 'common-patterns',
      title: 'Spotting Complexity in the Wild',
      content: `**"What is the complexity of this function?"**
Walk through: count nested loops, recursive calls, and extra data structures. One loop over n items → O(n). Two nested loops → O(n²). A loop that halves the input each time → O(log n).

**"Can you optimize this?"**
Common patterns: O(n²) → O(n) using a hash map (next module!), or O(n) → O(log n) using binary search (covered later in Sorting & Searching).

**"What if the input was 10x larger?"**
Use your complexity to predict. O(n²) on 1M elements = impossible. O(n log n) on 1M elements = ~20M operations, totally fine.`,
    },
    {
      id: 'whats-next',
      title: 'What\'s Next?',
      content: `Now that you have a language to talk about algorithm speed, you're ready to look at actual data structures - starting with the most fundamental one: **Arrays & Strings**.

Arrays are the building block of almost everything else in this course. As you learn them, pay attention to the complexity of each operation (access, search, insert, delete). You'll see the patterns we discussed here in action.

The next few modules will follow a similar structure: here's a data structure, here's what it's good at, here's what it's bad at, and here's when you'd use it instead of something else. By the end, you'll have a mental toolbox - where each tool's strengths and weaknesses are clear.

**Next up: Arrays & Strings**`,
    },
  ],
  problemIds: ['constant-vs-linear', 'quadratic-vs-linear', 'space-complexity'],
};
