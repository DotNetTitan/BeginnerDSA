import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum (Optimal)',
    topicId: 'hashmaps-sets',
    difficulty: 'easy',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers that add up to \`target\`. Use O(n) time with a hash map.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1, 2]' },
      { input: 'nums = [3,3], target = 6', output: '[0, 1]' },
    ],
    constraints: ['2 <= nums.length <= 10⁴', 'Exactly one valid answer exists.'],
    hints: ['Use Dictionary<int, int> to store value → index.', 'For each element, check if target - nums[i] exists in the map.'],
    solution: `public int[] TwoSum(int[] nums, int target) {
    var map = new Dictionary<int, int>();

    for (int i = 0; i < nums.Length; i++) {
        int complement = target - nums[i];
        if (map.TryGetValue(complement, out int index))
            return new int[] { index, i };
        map[nums[i]] = i;
    }
    return new int[0];
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    topicId: 'hashmaps-sets',
    difficulty: 'medium',
    description: `Given an array of strings \`strs\`, group the anagrams together. An anagram is a word formed by rearranging the letters of another.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
    ],
    constraints: ['1 <= strs.length <= 10⁴', '0 <= strs[i].length <= 100'],
    hints: ['Sort each word to create a canonical form.', 'Use the sorted string as the dictionary key.'],
    solution: `public IList<IList<string>> GroupAnagrams(string[] strs) {
    var map = new Dictionary<string, IList<string>>();

    foreach (var s in strs) {
        var chars = s.ToCharArray();
        Array.Sort(chars);
        string key = new string(chars);

        if (!map.ContainsKey(key))
            map[key] = new List<string>();
        map[key].Add(s);
    }

    return new List<IList<string>>(map.Values);
}`,
    timeComplexity: 'O(n * k log k)',
    spaceComplexity: 'O(n * k)',
  },
  {
    id: 'longest-consecutive',
    title: 'Longest Consecutive Sequence',
    topicId: 'hashmaps-sets',
    difficulty: 'medium',
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.`,
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: 'Longest: [1, 2, 3, 4].' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' },
    ],
    constraints: ['0 <= nums.length <= 10⁵', '-10⁹ <= nums[i] <= 10⁹'],
    hints: ['Use a HashSet for O(1) lookups.', 'Only start counting from the smallest number in a sequence.'],
    solution: `public int LongestConsecutive(int[] nums) {
    var set = new HashSet<int>(nums);
    int maxLen = 0;

    foreach (var n in set) {
        if (!set.Contains(n - 1)) { // start of a sequence
            int curr = n;
            int len = 1;
            while (set.Contains(curr + 1)) {
                curr++;
                len++;
            }
            maxLen = Math.Max(maxLen, len);
        }
    }
    return maxLen;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'top-k-frequent',
    title: 'Top K Frequent Elements',
    topicId: 'hashmaps-sets',
    difficulty: 'medium',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the k most frequent elements.`,
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    constraints: ['1 <= nums.length <= 10⁵', 'k is in the range [1, number of unique elements]'],
    hints: ['Count frequencies with a Dictionary.', 'Use a bucket sort or heap approach.'],
    solution: `public int[] TopKFrequent(int[] nums, int k) {
    var counts = new Dictionary<int, int>();
    foreach (var n in nums) counts[n] = counts.GetValueOrDefault(n, 0) + 1;

    var buckets = new List<int>[nums.Length + 1];
    for (int i = 0; i < buckets.Length; i++)
        buckets[i] = new List<int>();

    foreach (var kvp in counts)
        buckets[kvp.Value].Add(kvp.Key);

    var result = new List<int>();
    for (int i = buckets.Length - 1; i >= 0 && result.Count < k; i--)
        foreach (var num in buckets[i]) {
            result.Add(num);
            if (result.Count == k) break;
        }

    return result.ToArray();
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
];
