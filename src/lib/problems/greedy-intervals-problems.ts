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
    constraints: ['1 <= intervals.length <= 10⁴'],
    hints: ['Sort by start time.', 'If current interval overlaps with the next, merge them.'],
    solution: `public int[][] Merge(int[][] intervals) {
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
    constraints: ['1 <= intervals.length <= 10⁵'],
    hints: ['Sort by end time (greedy choice).', 'Keep the interval with the earliest end time.'],
    solution: `public int EraseOverlapIntervals(int[][] intervals) {
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
    constraints: ['1 <= nums.length <= 10⁴'],
    hints: ['Track the furthest reachable index.', 'If you ever pass it, return false.'],
    solution: `public bool CanJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.Length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.Max(maxReach, i + nums[i]);
    }
    return true;
}`,
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
    constraints: ['1 <= prices.length <= 3 * 10⁴'],
    hints: ['Sum all positive differences between consecutive days.', 'Greedy: buy when price goes up, skip when it goes down.'],
    solution: `public int MaxProfit(int[] prices) {
    int profit = 0;
    for (int i = 1; i < prices.Length; i++)
        if (prices[i] > prices[i - 1])
            profit += prices[i] - prices[i - 1];
    return profit;
}`,
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
    constraints: ['0 <= intervals.length <= 10⁴'],
    hints: ['Sort start times and end times separately.', 'Use two pointers: when a start < an end, you need a new room.'],
    solution: `public int MinMeetingRooms(int[][] intervals) {
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
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
  },
];
