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
    constraints: ['2 <= nums.length <= 10^4', 'Exactly one valid answer exists.'],
    hints: ['Use Dictionary<int, int> to store value -> index.', 'For each element, check if target - nums[i] exists in the map.'],
    solution: {
      csharp: `public int[] TwoSum(int[] nums, int target) {
    var map = new Dictionary<int, int>();

    for (int i = 0; i < nums.Length; i++) {
        int complement = target - nums[i];
        if (map.TryGetValue(complement, out int index))
            return new int[] { index, i };
        map[nums[i]] = i;
    }
    return new int[0];
}`,
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement))
            return new int[] { map.get(complement), i };
        map.put(nums[i], i);
    }
    return new int[0];
}`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement))
            return [map.get(complement), i];
        map.set(nums[i], i);
    }
    return [];
}`,
      cpp: `#include <vector>
#include <unordered_map>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> map;
    for (int i = 0; i < (int)nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement))
            return {map[complement], i};
        map[nums[i]] = i;
    }
    return {};
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
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
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100'],
    hints: ['Sort each word to create a canonical form.', 'Use the sorted string as the dictionary key.'],
    solution: {
      csharp: `public IList<IList<string>> GroupAnagrams(string[] strs) {
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
      python: `def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = "".join(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())
`,
      java: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(map.values());
}`,
      javascript: `function groupAnagrams(strs) {
    const map = new Map();
    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!map.has(key))
            map.set(key, []);
        map.get(key).push(s);
    }
    return Array.from(map.values());
}`,
      cpp: `#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

std::vector<std::vector<std::string>> groupAnagrams(const std::vector<std::string>& strs) {
    std::unordered_map<std::string, std::vector<std::string>> map;
    for (const auto& s : strs) {
        std::string key = s;
        std::sort(key.begin(), key.end());
        map[key].push_back(s);
    }
    std::vector<std::vector<std::string>> result;
    for (auto& kv : map)
        result.push_back(std::move(kv.second));
    return result;
}`,
    },
    timeComplexity: 'O(n * k log k)',
    spaceComplexity: 'O(n * k)',
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
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
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    hints: ['Use a HashSet for O(1) lookups.', 'Only start counting from the smallest number in a sequence.'],
    solution: {
      csharp: `public int LongestConsecutive(int[] nums) {
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
      python: `def longest_consecutive(nums):
    num_set = set(nums)
    max_len = 0
    for n in num_set:
        if n - 1 not in num_set:
            curr = n
            length = 1
            while curr + 1 in num_set:
                curr += 1
                length += 1
            max_len = max(max_len, length)
    return max_len
`,
      java: `public int longestConsecutive(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int n : nums) set.add(n);
    int maxLen = 0;
    for (int n : set) {
        if (!set.contains(n - 1)) {
            int curr = n;
            int len = 1;
            while (set.contains(curr + 1)) {
                curr++;
                len++;
            }
            maxLen = Math.max(maxLen, len);
        }
    }
    return maxLen;
}`,
      javascript: `function longestConsecutive(nums) {
    const set = new Set(nums);
    let maxLen = 0;
    for (const n of set) {
        if (!set.has(n - 1)) {
            let curr = n;
            let len = 1;
            while (set.has(curr + 1)) {
                curr++;
                len++;
            }
            maxLen = Math.max(maxLen, len);
        }
    }
    return maxLen;
}`,
      cpp: `#include <vector>
#include <unordered_set>
#include <algorithm>

int longestConsecutive(const std::vector<int>& nums) {
    std::unordered_set<int> set(nums.begin(), nums.end());
    int maxLen = 0;
    for (int n : set) {
        if (!set.count(n - 1)) {
            int curr = n;
            int len = 1;
            while (set.count(curr + 1)) {
                curr++;
                len++;
            }
            maxLen = std::max(maxLen, len);
        }
    }
    return maxLen;
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',
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
    constraints: ['1 <= nums.length <= 10^5', 'k is in the range [1, number of unique elements]'],
    hints: ['Count frequencies with a Dictionary.', 'Use a bucket sort or heap approach.'],
    solution: {
      csharp: `public int[] TopKFrequent(int[] nums, int k) {
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
      python: `def top_k_frequent(nums, k):
    counts = {}
    for n in nums:
        counts[n] = counts.get(n, 0) + 1
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in counts.items():
        buckets[freq].append(num)
    result = []
    for i in range(len(buckets) - 1, -1, -1):
        for num in buckets[i]:
            result.append(num)
            if len(result) == k:
                return result
    return result
`,
      java: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> counts = new HashMap<>();
    for (int n : nums) counts.put(n, counts.getOrDefault(n, 0) + 1);
    List<Integer>[] buckets = new List[nums.length + 1];
    for (int i = 0; i < buckets.length; i++)
        buckets[i] = new ArrayList<>();
    for (Map.Entry<Integer, Integer> e : counts.entrySet())
        buckets[e.getValue()].add(e.getKey());
    int[] result = new int[k];
    int idx = 0;
    for (int i = buckets.length - 1; i >= 0 && idx < k; i--)
        for (int num : buckets[i]) {
            result[idx++] = num;
            if (idx == k) break;
        }
    return result;
}`,
      javascript: `function topKFrequent(nums, k) {
    const counts = new Map();
    for (const n of nums)
        counts.set(n, (counts.get(n) || 0) + 1);
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, freq] of counts)
        buckets[freq].push(num);
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--)
        for (const num of buckets[i]) {
            result.push(num);
            if (result.length === k) break;
        }
    return result;
}`,
      cpp: `#include <vector>
#include <unordered_map>
#include <algorithm>

std::vector<int> topKFrequent(const std::vector<int>& nums, int k) {
    std::unordered_map<int, int> counts;
    for (int n : nums) counts[n]++;
    std::vector<std::vector<int>> buckets(nums.size() + 1);
    for (auto& kv : counts)
        buckets[kv.second].push_back(kv.first);
    std::vector<int> result;
    for (int i = buckets.size() - 1; i >= 0 && (int)result.size() < k; i--)
        for (int num : buckets[i]) {
            result.push_back(num);
            if ((int)result.size() == k) break;
        }
    return result;
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
  },
];
