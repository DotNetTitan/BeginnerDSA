import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    topicId: 'greedy-intervals',
    difficulty: 'medium',
    description: `Given an array of intervals where each interval is [start, end], merge all overlapping intervals.`,
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Intervals [1,3] and [2,6] overlap, merged to [1,6].' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' },
    ],
    constraints: ['1 <= intervals.length <= 10â´'],
    hints: ['Sort by start time.', 'If current interval overlaps with the next, merge them.'],
    solution: {
      csharp: `public int[][] Merge(int[][] intervals) {
    Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
    var merged = new List<int[]>();
    int[] curr = intervals[0];

    for (int i = 1; i < intervals.Length; i++) {
        if (intervals[i][0] <= curr[1])
            curr[1] = Math.Max(curr[1], intervals[i][1]);
        else {
            merged.Add(curr);
            curr = intervals[i];
        }
    }
    merged.Add(curr);
    return merged.ToArray();
}`,
      python: `def merge(intervals):
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
`,
      java: `public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> merged = new ArrayList<>();
    int[] curr = intervals[0];
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= curr[1])
            curr[1] = Math.max(curr[1], intervals[i][1]);
        else {
            merged.add(curr);
            curr = intervals[i];
        }
    }
    merged.add(curr);
    return merged.toArray(new int[merged.size()][]);
}`,
      javascript: `function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [];
    let curr = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= curr[1])
            curr[1] = Math.max(curr[1], intervals[i][1]);
        else {
            merged.push(curr);
            curr = intervals[i];
        }
    }
    merged.push(curr);
    return merged;
}`,
      cpp: `#include <vector>
#include <algorithm>

std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
    std::sort(intervals.begin(), intervals.end());
    std::vector<std::vector<int>> merged;
    std::vector<int> curr = intervals[0];
    for (size_t i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= curr[1])
            curr[1] = std::max(curr[1], intervals[i][1]);
        else {
            merged.push_back(curr);
            curr = intervals[i];
        }
    }
    merged.push_back(curr);
    return merged;
}`,
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'non-overlapping-intervals',
    title: 'Non-Overlapping Intervals',
    topicId: 'greedy-intervals',
    difficulty: 'medium',
    description: `Given an array of intervals, return the minimum number of intervals to remove to make the rest non-overlapping.`,
    examples: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1', explanation: 'Remove [1,3] to make the rest non-overlapping.' },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2' },
    ],
    constraints: ['1 <= intervals.length <= 10âµ'],
    hints: ['Sort by end time (greedy choice).', 'Keep the interval with the earliest end time.'],
    solution: {
      csharp: `public int EraseOverlapIntervals(int[][] intervals) {
    Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
    int count = 0;
    int end = intervals[0][1];

    for (int i = 1; i < intervals.Length; i++) {
        if (intervals[i][0] < end)
            count++;
        else
            end = intervals[i][1];
    }
    return count;
}`,
      python: `def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda x: x[1])
    count = 0
    end = intervals[0][1]
    for i in range(1, len(intervals)):
        if intervals[i][0] < end:
            count += 1
        else:
            end = intervals[i][1]
    return count
`,
      java: `public int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
    int count = 0;
    int end = intervals[0][1];
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end)
            count++;
        else
            end = intervals[i][1];
    }
    return count;
}`,
      javascript: `function eraseOverlapIntervals(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0;
    let end = intervals[0][1];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end)
            count++;
        else
            end = intervals[i][1];
    }
    return count;
}`,
      cpp: `#include <vector>
#include <algorithm>

int eraseOverlapIntervals(std::vector<std::vector<int>>& intervals) {
    std::sort(intervals.begin(), intervals.end(),
        [](const auto& a, const auto& b) { return a[1] < b[1]; });
    int count = 0;
    int end = intervals[0][1];
    for (size_t i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] < end)
            count++;
        else
            end = intervals[i][1];
    }
    return count;
}`,
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'jump-game',
    title: 'Jump Game',
    topicId: 'greedy-intervals',
    difficulty: 'medium',
    description: `You are given an integer array nums where each element represents your maximum jump length from that position. Return true if you can reach the last index.`,
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'true', explanation: 'Jump 1 step from 0 to 1, then 3 steps to the end.' },
      { input: 'nums = [3,2,1,0,4]', output: 'false', explanation: 'You get stuck at index 3.' },
    ],
    constraints: ['1 <= nums.length <= 10â´'],
    hints: ['Track the furthest reachable index.', 'If you ever pass it, return false.'],
    solution: {
      csharp: `public bool CanJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.Length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.Max(maxReach, i + nums[i]);
    }
    return true;
}`,
      python: `def can_jump(nums):
    max_reach = 0
    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
    return True
`,
      java: `public boolean canJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}`,
      javascript: `function canJump(nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}`,
      cpp: `#include <vector>
#include <algorithm>

bool canJump(const std::vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < (int)nums.size(); i++) {
        if (i > maxReach) return false;
        maxReach = std::max(maxReach, i + nums[i]);
    }
    return true;
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'best-time-stock-ii',
    title: 'Best Time to Buy and Sell Stock II',
    topicId: 'greedy-intervals',
    difficulty: 'medium',
    description: `You are given an array prices where prices[i] is the price on day i. You may complete as many transactions as you like (buy one and sell one share multiple times). Return the maximum profit.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '7', explanation: 'Buy at 1, sell at 5 (profit 4). Buy at 3, sell at 6 (profit 3). Total = 7.' },
      { input: 'prices = [1,2,3,4,5]', output: '4', explanation: 'Buy at 1, sell at 5.' },
    ],
    constraints: ['1 <= prices.length <= 3 * 10â´'],
    hints: ['Sum all positive differences between consecutive days.', 'Greedy: buy when price goes up, skip when it goes down.'],
    solution: {
      csharp: `public int MaxProfit(int[] prices) {
    int profit = 0;
    for (int i = 1; i < prices.Length; i++)
        if (prices[i] > prices[i - 1])
            profit += prices[i] - prices[i - 1];
    return profit;
}`,
      python: `def max_profit(prices):
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]
    return profit
`,
      java: `public int maxProfit(int[] prices) {
    int profit = 0;
    for (int i = 1; i < prices.length; i++)
        if (prices[i] > prices[i - 1])
            profit += prices[i] - prices[i - 1];
    return profit;
}`,
      javascript: `function maxProfit(prices) {
    let profit = 0;
    for (let i = 1; i < prices.length; i++)
        if (prices[i] > prices[i - 1])
            profit += prices[i] - prices[i - 1];
    return profit;
}`,
      cpp: `#include <vector>

int maxProfitII(const std::vector<int>& prices) {
    int profit = 0;
    for (size_t i = 1; i < prices.size(); i++)
        if (prices[i] > prices[i - 1])
            profit += prices[i] - prices[i - 1];
    return profit;
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'meeting-rooms-ii',
    title: 'Meeting Rooms II',
    topicId: 'greedy-intervals',
    difficulty: 'medium',
    description: `Given an array of meeting time intervals where each interval is [start, end], return the minimum number of conference rooms required.`,
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2' },
      { input: 'intervals = [[7,10],[2,4]]', output: '1' },
    ],
    constraints: ['0 <= intervals.length <= 10â´'],
    hints: ['Sort start times and end times separately.', 'Use two pointers: when a start < an end, you need a new room.'],
    solution: {
      csharp: `public int MinMeetingRooms(int[][] intervals) {
    if (intervals.Length == 0) return 0;

    var starts = intervals.Select(i => i[0]).OrderBy(x => x).ToArray();
    var ends = intervals.Select(i => i[1]).OrderBy(x => x).ToArray();

    int rooms = 0, endIdx = 0;
    for (int i = 0; i < starts.Length; i++) {
        if (starts[i] < ends[endIdx])
            rooms++;
        else
            endIdx++;
    }
    return rooms;
}`,
      python: `def min_meeting_rooms(intervals):
    if not intervals:
        return 0
    starts = sorted(i[0] for i in intervals)
    ends = sorted(i[1] for i in intervals)
    rooms = 0
    end_idx = 0
    for i in range(len(starts)):
        if starts[i] < ends[end_idx]:
            rooms += 1
        else:
            end_idx += 1
    return rooms
`,
      java: `public int minMeetingRooms(int[][] intervals) {
    if (intervals.length == 0) return 0;
    int[] starts = new int[intervals.length];
    int[] ends = new int[intervals.length];
    for (int i = 0; i < intervals.length; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }
    Arrays.sort(starts);
    Arrays.sort(ends);
    int rooms = 0, endIdx = 0;
    for (int i = 0; i < starts.length; i++) {
        if (starts[i] < ends[endIdx])
            rooms++;
        else
            endIdx++;
    }
    return rooms;
}`,
      javascript: `function minMeetingRooms(intervals) {
    if (intervals.length === 0) return 0;
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
    let rooms = 0, endIdx = 0;
    for (let i = 0; i < starts.length; i++) {
        if (starts[i] < ends[endIdx])
            rooms++;
        else
            endIdx++;
    }
    return rooms;
}`,
      cpp: `#include <vector>
#include <algorithm>

int minMeetingRooms(std::vector<std::vector<int>>& intervals) {
    if (intervals.empty()) return 0;
    std::vector<int> starts, ends;
    for (const auto& iv : intervals) {
        starts.push_back(iv[0]);
        ends.push_back(iv[1]);
    }
    std::sort(starts.begin(), starts.end());
    std::sort(ends.begin(), ends.end());
    int rooms = 0, endIdx = 0;
    for (size_t i = 0; i < starts.size(); i++) {
        if (starts[i] < ends[endIdx])
            rooms++;
        else
            endIdx++;
    }
    return rooms;
}`,
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
  },
];
