import type { Topic } from '../types';

export const topic: Topic = {
  id: 'greedy-intervals',
  title: 'Greedy & Intervals',
  icon: 'Zap',
  order: 8,
  description: 'Make the locally optimal choice at each step. Works when local optimal choices lead to a global optimum.',
  difficulty: 'intermediate',
  prerequisites: ['big-o', 'arrays-strings', 'sorting-searching'],
  theory: [
    {
      id: 'greedy-basics',
      title: 'Greedy Algorithm Basics',
      content: `A greedy algorithm makes the **best choice at each step** without considering future consequences.

**When greedy works:**
- The problem has **optimal substructure** (optimal solution contains optimal sub-solutions)
- The **greedy choice property** holds (a locally optimal choice leads to a globally optimal solution)

**When greedy fails:**
- Problems where you need to look ahead (use DP instead)
- Knapsack (0/1), coin change (with arbitrary denominations)

**Classic greedy problems:**
- Activity selection / interval scheduling
- Minimum spanning tree (Prim's, Kruskal's)
- Huffman coding
- Dijkstra's algorithm
- Jump game`,
      codeExamples: [
        {
          title: 'Greedy vs non-greedy',
          code: `// GREEDY WORKS: Activity selection
// Choose the activity with the earliest end time
int MaxActivities(int[][] intervals) {
    Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
    int count = 1;
    int end = intervals[0][1];

    for (int i = 1; i < intervals.Length; i++) {
        if (intervals[i][0] >= end) {
            count++;
            end = intervals[i][1];
        }
    }
    return count;
} // O(n log n) — greedy choice (earliest end) is optimal

// GREEDY FAILS: Coin change with denominations [1, 3, 4], target 6
// Greedy: 4 + 1 + 1 = 3 coins
// Optimal: 3 + 3 = 2 coins (needs DP)`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'interval-problems',
      title: 'Interval Problems',
      content: `Interval problems are a common interview category. They typically involve **sorting by start or end time** then scanning.

**Common interval operations:**

| Operation | Approach |
|---|---|
| Merge overlapping | Sort by start, extend if overlap |
| Count non-overlapping | Sort by end, count non-overlapping |
| Find min rooms needed | Sweep line (start+1, end-1) |
| Insert interval | Find insertion point, merge if needed |

**Key insight:** Almost all interval problems start with sorting.`,
      codeExamples: [
        {
          title: 'Interval templates',
          code: `// Merge Intervals — O(n log n)
int[][] Merge(int[][] intervals) {
    Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
    var merged = new List<int[]>();
    int[] curr = intervals[0];

    for (int i = 1; i < intervals.Length; i++) {
        if (intervals[i][0] <= curr[1]) {
            curr[1] = Math.Max(curr[1], intervals[i][1]);
        } else {
            merged.Add(curr);
            curr = intervals[i];
        }
    }
    merged.Add(curr);
    return merged.ToArray();
}

// Non-overlapping intervals (remove min to make non-overlapping) — O(n log n)
int EraseOverlapIntervals(int[][] intervals) {
    Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
    int count = 0;
    int end = intervals[0][1];

    for (int i = 1; i < intervals.Length; i++) {
        if (intervals[i][0] < end) count++;
        else end = intervals[i][1];
    }
    return count;
}

// Min meeting rooms (min platforms) — O(n log n)
int MinMeetingRooms(int[][] intervals) {
    var starts = intervals.Select(i => i[0]).OrderBy(x => x).ToArray();
    var ends = intervals.Select(i => i[1]).OrderBy(x => x).ToArray();
    int rooms = 0, endIdx = 0;

    for (int i = 0; i < starts.Length; i++) {
        if (starts[i] < ends[endIdx]) rooms++;
        else endIdx++;
    }
    return rooms;
}`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'greedy-patterns',
      title: 'Key Greedy Patterns',
      content: `**Pattern 1: "Can you reach the end?" (Jump Game)**
At each position, track the furthest you can reach. If you ever pass that point, fail.

**Pattern 2: "Maximum profit" (Stock)**
Buy low, sell high. Track minimum seen so far.

**Pattern 3: "Minimum number of arrows/coins/platforms"**
Sort by end, greedily place the endpoint.

**Pattern 4: "Largest/smallest number from digits"**
Build digit by digit, maintaining constraints.`,
      codeExamples: [
        {
          title: 'Jump Game and Best Time to Buy/Sell Stock',
          code: `// Jump Game — O(n)
bool CanJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.Length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.Max(maxReach, i + nums[i]);
    }
    return true;
}

// Best Time to Buy/Sell Stock (single transaction) — O(n)
int MaxProfit(int[] prices) {
    int minPrice = int.MaxValue;
    int maxProfit = 0;
    foreach (var price in prices) {
        if (price < minPrice) minPrice = price;
        else maxProfit = Math.Max(maxProfit, price - minPrice);
    }
    return maxProfit;
}

// Jump Game II (minimum jumps) — O(n)
int Jump(int[] nums) {
    int jumps = 0, currEnd = 0, farthest = 0;
    for (int i = 0; i < nums.Length - 1; i++) {
        farthest = Math.Max(farthest, i + nums[i]);
        if (i == currEnd) {
            jumps++;
            currEnd = farthest;
        }
    }
    return jumps;
}`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'csharp-notes',
      title: 'C# Specific Notes',
      content: `**Sorting intervals**
Use \`Array.Sort\` with a lambda comparer:
\`\`\`csharp
Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0])); // sort by start
Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1])); // sort by end
\`\`\`

**LINQ for interval manipulation**
\`\`\`csharp
var starts = intervals.Select(i => i[0]).OrderBy(x => x).ToArray();
var merged = intervals.OrderBy(i => i[0]).Aggregate(...)
\`\`\`

**int[][] as interval type**
Most problems use \`int[][]\` where each \`int[2]\` is [start, end]. For readability, create a helper:
\`\`\`csharp
int Start(int[] interval) => interval[0];
int End(int[] interval) => interval[1];
\`\`\``,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Interval scheduling** — sort by end, pick non-overlapping
2. **Merge intervals** — sort by start, merge overlapping
3. **Insert interval** — linear scan, merge where needed
4. **Jump Game** — greedy reachability or minimum jumps
5. **Stock trading** — max profit (one transaction = greedy, multiple = DP)
6. **Minimum platforms / meeting rooms** — sweep line or two-pointer`,
    },
  ],
  problemIds: ['merge-intervals', 'non-overlapping-intervals', 'jump-game', 'best-time-stock-ii', 'meeting-rooms-ii'],
};
