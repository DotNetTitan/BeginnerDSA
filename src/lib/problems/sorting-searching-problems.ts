import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'binary-search',
    title: 'Binary Search',
    topicId: 'sorting-searching',
    difficulty: 'easy',
    description: `Given a sorted array of integers and a target, return the index of the target. If not found, return -1.`,
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' },
    ],
    constraints: ['1 <= nums.length <= 10⁴', 'nums is sorted in ascending order.'],
    hints: ['Standard binary search with left and right pointers.', 'mid = left + (right - left) / 2 prevents overflow.'],
    solution: `public int Search(int[] nums, int target) {
    int left = 0, right = nums.Length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'search-rotated-array',
    title: 'Search in Rotated Sorted Array',
    topicId: 'sorting-searching',
    difficulty: 'medium',
    description: `There is an integer array sorted in ascending order (with distinct values) that has been rotated. Given the array and a target, return the index of the target. If not found, return -1.`,
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
    ],
    constraints: ['1 <= nums.length <= 5000', 'All values are unique.'],
    hints: ['One half of the array is always sorted.', 'Determine which half, then adjust pointers.'],
    solution: `public int Search(int[] nums, int target) {
    int left = 0, right = nums.Length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;

        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid])
                right = mid - 1;
            else
                left = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    return -1;
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'kth-largest',
    title: 'Kth Largest Element in an Array',
    topicId: 'sorting-searching',
    difficulty: 'medium',
    description: `Given an unsorted array of integers, return the kth largest element. Do not fully sort the array.`,
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
    ],
    constraints: ['1 <= k <= nums.length <= 10⁵'],
    hints: ['Use a min-heap of size k.', 'Or use quickselect (Hoare\'s selection algorithm).'],
    solution: `public int FindKthLargest(int[] nums, int k) {
    var heap = new PriorityQueue<int, int>();
    foreach (var n in nums) {
        heap.Enqueue(n, n);
        if (heap.Count > k) heap.Dequeue();
    }
    return heap.Dequeue();
}`,
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(k)',
  },
  {
    id: 'find-min-rotated',
    title: 'Find Minimum in Rotated Sorted Array',
    topicId: 'sorting-searching',
    difficulty: 'medium',
    description: `Find the minimum element in a rotated sorted array with distinct values.`,
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0' },
      { input: 'nums = [11,13,15,17]', output: '11' },
    ],
    constraints: ['1 <= nums.length <= 5000'],
    hints: ['Compare mid with right to determine which half has the minimum.', 'If nums[mid] > nums[right], min is in the right half.'],
    solution: `public int FindMin(int[] nums) {
    int left = 0, right = nums.Length - 1;

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right])
            left = mid + 1;
        else
            right = mid;
    }
    return nums[left];
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'sort-colors',
    title: 'Sort Colors (Dutch National Flag)',
    topicId: 'sorting-searching',
    difficulty: 'medium',
    description: `Given an array with 0s, 1s, and 2s, sort them in-place. 0s → red, 1s → white, 2s → blue.`,
    examples: [
      { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' },
      { input: 'nums = [2,0,1]', output: '[0,1,2]' },
    ],
    constraints: ['1 <= nums.length <= 300'],
    hints: ['Use three pointers: left, mid, right.', 'Swap elements to their correct positions.'],
    solution: `public void SortColors(int[] nums) {
    int left = 0, mid = 0, right = nums.Length - 1;

    while (mid <= right) {
        if (nums[mid] == 0) {
            (nums[left], nums[mid]) = (nums[mid], nums[left]);
            left++; mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            (nums[mid], nums[right]) = (nums[right], nums[mid]);
            right--;
        }
    }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
];
