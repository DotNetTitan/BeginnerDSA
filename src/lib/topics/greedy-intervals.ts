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
          code: {
            csharp: `// GREEDY WORKS: Activity selection
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
} // O(n log n) - greedy choice (earliest end) is optimal

// GREEDY FAILS: Coin change with denominations [1, 3, 4], target 6
// Greedy: 4 + 1 + 1 = 3 coins
// Optimal: 3 + 3 = 2 coins (needs DP)`,
            python: `# GREEDY WORKS: Activity selection
# Choose the activity with the earliest end time
def max_activities(intervals):
    intervals.sort(key=lambda x: x[1])
    count = 1
    end = intervals[0][1]

    for i in range(1, len(intervals)):
        if intervals[i][0] >= end:
            count += 1
            end = intervals[i][1]
    return count
# O(n log n) - greedy choice (earliest end) is optimal

# GREEDY FAILS: Coin change with denominations [1, 3, 4], target 6
# Greedy: 4 + 1 + 1 = 3 coins
# Optimal: 3 + 3 = 2 coins (needs DP)`,
            java: `import java.util.*;

// GREEDY WORKS: Activity selection
// Choose the activity with the earliest end time
public int maxActivities(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
    int count = 1;
    int end = intervals[0][1];

    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= end) {
            count++;
            end = intervals[i][1];
        }
    }
    return count;
} // O(n log n) - greedy choice (earliest end) is optimal

// GREEDY FAILS: Coin change with denominations [1, 3, 4], target 6
// Greedy: 4 + 1 + 1 = 3 coins
// Optimal: 3 + 3 = 2 coins (needs DP)`,
            javascript: `// GREEDY WORKS: Activity selection
// Choose the activity with the earliest end time
const maxActivities = (intervals) => {
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 1;
    let end = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= end) {
            count++;
            end = intervals[i][1];
        }
    }
    return count;
}; // O(n log n) - greedy choice (earliest end) is optimal

// GREEDY FAILS: Coin change with denominations [1, 3, 4], target 6
// Greedy: 4 + 1 + 1 = 3 coins
// Optimal: 3 + 3 = 2 coins (needs DP)`,
          cpp: `#include <vector>
#include <algorithm>
#include <iostream>

// GREEDY WORKS: Activity selection
// Choose the activity with the earliest end time
int maxActivities(std::vector<std::vector<int>>& intervals) {
    std::sort(intervals.begin(), intervals.end(),
        [](auto& a, auto& b) { return a[1] < b[1]; });
    int count = 1;
    int end = intervals[0][1];

    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] >= end) {
            count++;
            end = intervals[i][1];
        }
    }
    return count;
} // O(n log n) - greedy choice (earliest end) is optimal

// GREEDY FAILS: Coin change with denominations [1, 3, 4], target 6
// Greedy: 4 + 1 + 1 = 3 coins
// Optimal: 3 + 3 = 2 coins (needs DP)`,
          },
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
          code: {
            csharp: `// Merge Intervals - O(n log n)
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

// Non-overlapping intervals (remove min to make non-overlapping) - O(n log n)
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

// Min meeting rooms (min platforms) - O(n log n)
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
            python: `# Merge Intervals - O(n log n)
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    curr = intervals[0]

    for i in range(1, len(intervals)):
        if intervals[i][0] <= curr[1]:
            curr[1] = max(curr[1], intervals[i][1])
        else:
            merged.append(curr)
            curr = intervals[i]
    merged.append(curr)
    return merged

# Non-overlapping intervals (remove min to make non-overlapping) - O(n log n)
def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda x: x[1])
    count = 0
    end = intervals[0][1]

    for i in range(1, len(intervals)):
        if intervals[i][0] < end:
            count += 1
        else:
            end = intervals[i][1]
    return count

# Min meeting rooms (min platforms) - O(n log n)
def min_meeting_rooms(intervals):
    starts = sorted(i[0] for i in intervals)
    ends = sorted(i[1] for i in intervals)
    rooms = 0
    end_idx = 0

    for i in range(len(starts)):
        if starts[i] < ends[end_idx]:
            rooms += 1
        else:
            end_idx += 1
    return rooms`,
            java: `import java.util.*;

// Merge Intervals - O(n log n)
public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> merged = new ArrayList<>();
    int[] curr = intervals[0];

    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= curr[1]) {
            curr[1] = Math.max(curr[1], intervals[i][1]);
        } else {
            merged.add(curr);
            curr = intervals[i];
        }
    }
    merged.add(curr);
    return merged.toArray(new int[0][]);
}

// Non-overlapping intervals (remove min to make non-overlapping) - O(n log n)
public int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
    int count = 0;
    int end = intervals[0][1];

    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) count++;
        else end = intervals[i][1];
    }
    return count;
}

// Min meeting rooms (min platforms) - O(n log n)
public int minMeetingRooms(int[][] intervals) {
    int n = intervals.length;
    int[] starts = new int[n];
    int[] ends = new int[n];
    for (int i = 0; i < n; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }
    Arrays.sort(starts);
    Arrays.sort(ends);
    int rooms = 0, endIdx = 0;

    for (int i = 0; i < n; i++) {
        if (starts[i] < ends[endIdx]) rooms++;
        else endIdx++;
    }
    return rooms;
}`,
            javascript: `// Merge Intervals - O(n log n)
const merge = (intervals) => {
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [];
    let curr = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= curr[1]) {
            curr[1] = Math.max(curr[1], intervals[i][1]);
        } else {
            merged.push(curr);
            curr = intervals[i];
        }
    }
    merged.push(curr);
    return merged;
};

// Non-overlapping intervals (remove min to make non-overlapping) - O(n log n)
const eraseOverlapIntervals = (intervals) => {
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0;
    let end = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) count++;
        else end = intervals[i][1];
    }
    return count;
};

// Min meeting rooms (min platforms) - O(n log n)
const minMeetingRooms = (intervals) => {
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
    let rooms = 0, endIdx = 0;

    for (let i = 0; i < starts.length; i++) {
        if (starts[i] < ends[endIdx]) rooms++;
        else endIdx++;
    }
    return rooms;
};`,
          cpp: `#include <vector>
#include <algorithm>
#include <queue>

// Merge Intervals - O(n log n)
std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
    std::sort(intervals.begin(), intervals.end(),
        [](auto& a, auto& b) { return a[0] < b[0]; });
    std::vector<std::vector<int>> merged;
    auto curr = intervals[0];

    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= curr[1]) {
            curr[1] = std::max(curr[1], intervals[i][1]);
        } else {
            merged.push_back(curr);
            curr = intervals[i];
        }
    }
    merged.push_back(curr);
    return merged;
}

// Non-overlapping intervals (remove min to make non-overlapping) - O(n log n)
int eraseOverlapIntervals(std::vector<std::vector<int>>& intervals) {
    std::sort(intervals.begin(), intervals.end(),
        [](auto& a, auto& b) { return a[1] < b[1]; });
    int count = 0;
    int end = intervals[0][1];

    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] < end) count++;
        else end = intervals[i][1];
    }
    return count;
}

// Min meeting rooms (min platforms) - O(n log n)
int minMeetingRooms(std::vector<std::vector<int>>& intervals) {
    std::vector<int> starts, ends;
    for (auto& i : intervals) {
        starts.push_back(i[0]);
        ends.push_back(i[1]);
    }
    std::sort(starts.begin(), starts.end());
    std::sort(ends.begin(), ends.end());
    int rooms = 0, endIdx = 0;

    for (int i = 0; i < starts.size(); i++) {
        if (starts[i] < ends[endIdx]) rooms++;
        else endIdx++;
    }
    return rooms;
}`,
          },
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
          code: {
            csharp: `// Jump Game - O(n)
bool CanJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.Length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.Max(maxReach, i + nums[i]);
    }
    return true;
}

// Best Time to Buy/Sell Stock (single transaction) - O(n)
int MaxProfit(int[] prices) {
    int minPrice = int.MaxValue;
    int maxProfit = 0;
    foreach (var price in prices) {
        if (price < minPrice) minPrice = price;
        else maxProfit = Math.Max(maxProfit, price - minPrice);
    }
    return maxProfit;
}

// Jump Game II (minimum jumps) - O(n)
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
            python: `# Jump Game - O(n)
def can_jump(nums):
    max_reach = 0
    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
    return True

# Best Time to Buy/Sell Stock (single transaction) - O(n)
def max_profit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        else:
            max_profit = max(max_profit, price - min_price)
    return max_profit

# Jump Game II (minimum jumps) - O(n)
def jump(nums):
    jumps = 0
    curr_end = 0
    farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == curr_end:
            jumps += 1
            curr_end = farthest
    return jumps`,
            java: `// Jump Game - O(n)
public boolean canJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}

// Best Time to Buy/Sell Stock (single transaction) - O(n)
public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;
    for (int price : prices) {
        if (price < minPrice) minPrice = price;
        else maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}

// Jump Game II (minimum jumps) - O(n)
public int jump(int[] nums) {
    int jumps = 0, currEnd = 0, farthest = 0;
    for (int i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i == currEnd) {
            jumps++;
            currEnd = farthest;
        }
    }
    return jumps;
}`,
            javascript: `// Jump Game - O(n)
const canJump = (nums) => {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
};

// Best Time to Buy/Sell Stock (single transaction) - O(n)
const maxProfit = (prices) => {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const price of prices) {
        if (price < minPrice) minPrice = price;
        else maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
};

// Jump Game II (minimum jumps) - O(n)
const jump = (nums) => {
    let jumps = 0, currEnd = 0, farthest = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === currEnd) {
            jumps++;
            currEnd = farthest;
        }
    }
    return jumps;
};`,
          cpp: `#include <vector>
#include <algorithm>
#include <climits>

// Jump Game - O(n)
bool canJump(const std::vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false;
        maxReach = std::max(maxReach, i + nums[i]);
    }
    return true;
}

// Best Time to Buy/Sell Stock (single transaction) - O(n)
int maxProfit(const std::vector<int>& prices) {
    int minPrice = INT_MAX;
    int maxProfit = 0;
    for (int price : prices) {
        if (price < minPrice) minPrice = price;
        else maxProfit = std::max(maxProfit, price - minPrice);
    }
    return maxProfit;
}

// Jump Game II (minimum jumps) - O(n)
int jump(const std::vector<int>& nums) {
    int jumps = 0, currEnd = 0, farthest = 0;
    for (int i = 0; i < nums.size() - 1; i++) {
        farthest = std::max(farthest, i + nums[i]);
        if (i == currEnd) {
            jumps++;
            currEnd = farthest;
        }
    }
    return jumps;
}`,
          },
        },
      ],
    },
    {
      id: 'greedy-vs-dp',
      title: 'Greedy vs Dynamic Programming',
      content: `**Greedy works when a local best choice is always the global best choice.**

**Greedy is the right tool when:**
- The problem has the **greedy choice property** (what's best now is best overall)
- Making a choice **doesn't limit** future options in a harmful way
- The obvious "pick the extreme" works (earliest deadline, smallest weight)

**Greedy FAILS when:**
- You need to **explore multiple possibilities** before deciding (use DP)
- Skipping a good local choice now could lead to a better result later
- The problem asks for "count all ways" or "minimum cost with constraints"

**Decision guide:**
| Signal | Likely greedy? | Why |
|---|---|---|
| "Earliest finish time" | Yes | Classic interval scheduling |
| "Minimum number of coins" | No (with arbitrary denominations) | Need DP |
| "Can you reach the end?" | Yes | Jump Game (greedy) |
| "Maximum profit with unlimited trades" | Yes | Stock II (greedy) |
| "Maximum profit with cooldown" | No | Need DP |
| "Minimum path sum" | No | Dijkstra is greedy, general path is DP |
| "Schedule to maximize meetings" | Yes | Earliest finish time |
| "Knapsack (0/1)" | No | Must consider all combinations (DP) |

**Rule of thumb:** If you can prove that the optimal solution always includes the locally optimal choice, go greedy. If unsure, start with DP and optimize later.`,
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes / Gotchas',
      content: `**"Greedy always works" - it doesn't**
Greedy only works when the greedy choice property holds. Classic counterexample: coin change with denominations [1, 3, 4] for target 6. Greedy picks 4+1+1 (3 coins), but optimal is 3+3 (2 coins). This needs DP.

**Not proving the greedy choice before coding**
Before writing greedy code, ask: "Can I prove that the locally optimal choice is always part of the globally optimal solution?" If not, consider DP.

**Sorting by the wrong property**
For interval scheduling, sort by **end time**. For merge intervals, sort by **start time**. Sorting by the wrong key gives wrong intervals.

**Using greedy when DP is required**
Problem signals that greedy likely won't work: "minimum cost with constraints", "all possible ways", "with exactly k items", "with a budget". These usually need DP or backtracking.

**Forgetting to update the tracked value in greedy algorithms**
In interval scheduling: after picking an interval, update the current end time. In Jump Game: after reaching the current end, update the next jump boundary. Stale tracking values cause wrong results.`,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Interval scheduling** - sort by end, pick non-overlapping
2. **Merge intervals** - sort by start, merge overlapping
3. **Insert interval** - linear scan, merge where needed
4. **Jump Game** - greedy reachability or minimum jumps
5. **Stock trading** - max profit (one transaction = greedy, multiple = DP)
6. **Minimum platforms / meeting rooms** - sweep line or two-pointer`,
    },
  ],
  problemIds: ['merge-intervals', 'non-overlapping-intervals', 'jump-game', 'best-time-stock-ii', 'meeting-rooms-ii'],
};
