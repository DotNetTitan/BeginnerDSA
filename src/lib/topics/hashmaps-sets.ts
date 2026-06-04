import type { Topic } from '../types';

export const topic: Topic = {
  id: 'hashmaps-sets',
  title: 'HashMaps & Sets',
  icon: 'Bookmark',
  order: 3,
  description: 'The most versatile data structure for O(1) lookups. Essential for counting, deduplication, and caching.',
  difficulty: 'beginner',
  prerequisites: ['big-o', 'arrays-strings'],
  theory: [
    {
      id: 'how-hashing-works',
      title: 'How Hashing Works',
      content: `A hash map (dictionary) stores key-value pairs. The key is hashed to compute an index into an internal array (buckets). **Collisions** (two keys hashing to the same index) are handled via separate chaining (linked list per bucket - see Module 4) or open addressing.

| Operation | Average | Worst Case |
|---|---|---|
| Insert | O(1) | O(n) |
| Lookup | O(1) | O(n) |
| Delete | O(1) | O(n) |

The worst case occurs when all keys collide (rare with a good hash function).`,
      codeExamples: [
        {
          title: 'Dictionary and HashSet basics',
          code: {
            csharp: `// Dictionary - key-value pairs
var dict = new Dictionary<string, int>();
dict["apple"] = 5;
dict["banana"] = 3;

// SAFE lookup - TryGetValue (avoids double lookup)
if (dict.TryGetValue("apple", out int count))
    Console.WriteLine(count); // 5

// ContainsKey + [] is TWO lookups - avoid this:
if (dict.ContainsKey("apple"))          // lookup 1
    Console.WriteLine(dict["apple"]);   // lookup 2

// HashSet - unique values
var set = new HashSet<int> { 1, 2, 3 };
set.Add(3);  // false - already exists
set.Contains(2); // true - O(1)`,
            python: `# Dictionary - key-value pairs
d = {}
d["apple"] = 5
d["banana"] = 3

# SAFE lookup - get() (avoids KeyError)
count = d.get("apple")
print(count)  # 5

# 'in' check + [] is TWO lookups - avoid this:
# if "apple" in d:          # lookup 1
#     print(d["apple"])     # lookup 2

# Set - unique values
s = {1, 2, 3}
s.add(3)    # no-op - already exists
2 in s      # True - O(1)`,
            java: `import java.util.*;

// HashMap - key-value pairs
Map<String, Integer> map = new HashMap<>();
map.put("apple", 5);
map.put("banana", 3);

// SAFE lookup - get() (avoids double lookup)
Integer count = map.get("apple"); // null if missing
System.out.println(count); // 5

// containsKey + get is TWO lookups - avoid this:

// HashSet - unique values
Set<Integer> set = new HashSet<>(Arrays.asList(1, 2, 3));
set.add(3);  // false - already exists
set.contains(2); // true - O(1)`,
            javascript: `// Map - key-value pairs
const map = new Map();
map.set("apple", 5);
map.set("banana", 3);

// SAFE lookup - get() (avoids double lookup)
const count = map.get("apple"); // undefined if missing
console.log(count); // 5

// has + get is TWO lookups - avoid this:
// if (map.has("apple")) console.log(map.get("apple"));

// Set - unique values
const set = new Set([1, 2, 3]);
set.add(3);  // no-op - already exists
set.has(2); // true - O(1)`,
          cpp: `#include <unordered_map>
#include <unordered_set>
#include <iostream>

// Unordered map - key-value pairs
std::unordered_map<std::string, int> map;
map["apple"] = 5;
map["banana"] = 3;

// SAFE lookup - find (avoids double lookup)
auto it = map.find("apple");
if (it != map.end())
    std::cout << it->second << "\n"; // 5

// contains + [] is TWO lookups - avoid this:
// if (map.count("apple")) std::cout << map["apple"];

// Unordered set - unique values
std::unordered_set<int> set = {1, 2, 3};
set.insert(3);  // no-op - already exists
set.count(2); // 1 (true) - O(1)`,
          },
        },
      ],
    },
    {
      id: 'key-patterns',
      title: 'Key Patterns',
      content: `These three patterns cover the majority of hash map / hash set interview problems.`,
      codeExamples: [
        {
          title: 'Common patterns',
          code: {
            csharp: `// 1. Counting frequencies
int[] nums = { 1, 2, 2, 3, 3, 3 };
var counts = new Dictionary<int, int>();
foreach (var n in nums) {
    if (counts.TryGetValue(n, out int val))
        counts[n] = val + 1;
    else
        counts[n] = 1;
}

// 2. Deduplication
int[] duplicates = { 1, 2, 2, 3, 3, 3 };
var unique = new HashSet<int>(duplicates); // { 1, 2, 3 }

// 3. Two Sum pattern - complement lookup
bool HasPairSum(int[] arr, int target) {
    var seen = new HashSet<int>();
    foreach (var n in arr) {
        if (seen.Contains(target - n)) return true;
        seen.Add(n);
    }
    return false;
}`,
            python: `# 1. Counting frequencies
nums = [1, 2, 2, 3, 3, 3]
counts = {}
for n in nums:
    counts[n] = counts.get(n, 0) + 1

# 2. Deduplication
duplicates = [1, 2, 2, 3, 3, 3]
unique = list(set(duplicates))  # [1, 2, 3] (order not guaranteed)

# 3. Two Sum pattern - complement lookup
def has_pair_sum(arr, target):
    seen = set()
    for n in arr:
        if target - n in seen:
            return True
        seen.add(n)
    return False`,
            java: `import java.util.*;

// 1. Counting frequencies
int[] nums = {1, 2, 2, 3, 3, 3};
Map<Integer, Integer> counts = new HashMap<>();
for (int n : nums)
    counts.put(n, counts.getOrDefault(n, 0) + 1);

// 2. Deduplication
int[] duplicates = {1, 2, 2, 3, 3, 3};
Set<Integer> unique = new HashSet<>();
for (int n : duplicates) unique.add(n); // {1, 2, 3}

// 3. Two Sum pattern - complement lookup
public boolean hasPairSum(int[] arr, int target) {
    Set<Integer> seen = new HashSet<>();
    for (int n : arr) {
        if (seen.contains(target - n)) return true;
        seen.add(n);
    }
    return false;
}`,
            javascript: `// 1. Counting frequencies
const nums = [1, 2, 2, 3, 3, 3];
const counts = new Map();
for (const n of nums) {
    counts.set(n, (counts.get(n) || 0) + 1);
}

// 2. Deduplication
const duplicates = [1, 2, 2, 3, 3, 3];
const unique = new Set(duplicates); // Set { 1, 2, 3 }

// 3. Two Sum pattern - complement lookup
const hasPairSum = (arr, target) => {
    const seen = new Set();
    for (const n of arr) {
        if (seen.has(target - n)) return true;
        seen.add(n);
    }
    return false;
};`,
          cpp: `#include <unordered_map>
#include <unordered_set>
#include <vector>

// 1. Counting frequencies
std::vector<int> nums = {1, 2, 2, 3, 3, 3};
std::unordered_map<int, int> counts;
for (int n : nums)
    counts[n]++;

// 2. Deduplication
std::vector<int> duplicates = {1, 2, 2, 3, 3, 3};
std::unordered_set<int> unique(duplicates.begin(), duplicates.end()); // {1, 2, 3}

// 3. Two Sum pattern - complement lookup
bool hasPairSum(const std::vector<int>& arr, int target) {
    std::unordered_set<int> seen;
    for (int n : arr) {
        if (seen.count(target - n)) return true;
        seen.insert(n);
    }
    return false;
}`,
          },
        },
      ],
    },
    {
      id: 'when-to-use',
      title: 'When to Use HashMaps vs Sets',
      content: `**Use Dictionary when:**
- You need to associate values with keys (counts, indices, cached results)
- You need to quickly look up data by a key

**Use HashSet when:**
- You only need to track presence/absence (deduplication)
- You need fast membership testing

**Use neither when:**
- Order matters (use List or SortedDictionary)
- You need range queries (use tree-based structures - see Module 8)`,
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes / Gotchas',
      content: `**Using mutable objects as keys:** If you modify a key after inserting it, you can never look it up again. Strings, numbers, and tuples are safe. Lists and objects are not.

**"O(1) lookup means it's always instant":** O(1) is the average case. Worst case (hash collisions) degrades to O(n). With a good hash function this is extremely rare.

**Double lookup anti-pattern:** \`if (map.ContainsKey(key)) return map[key]\` is TWO hash lookups. Use \`TryGetValue\` / \`get()\` with a default instead.

**HashSet vs HashMap confusion:** Use HashSet when you only need membership checks. Use HashMap when you need to associate values with keys (counts, indices, etc.).

**Order is NOT guaranteed:** Hash maps and hash sets have no defined iteration order. If order matters, use a LinkedHashMap or TreeMap.`,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Frequency counter** - count occurrences of each element
2. **Complement lookup** - store seen values and check for target - current
3. **Deduplication** - remove duplicates via HashSet
4. **Two-pass** - first pass builds map, second pass uses it
5. **Sliding window with set** - track unique characters in window`,
    },
  ],
  problemIds: ['two-sum', 'group-anagrams', 'longest-consecutive', 'top-k-frequent'],
};
