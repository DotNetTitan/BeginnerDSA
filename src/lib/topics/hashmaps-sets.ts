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
      id: 'why-hashmaps',
      title: 'The Problem with Arrays',
      content: `Let's revisit a problem from the Arrays module. Remember "Two Sum"? Given an array of numbers, find two numbers that add up to a target.

With just arrays, the naive solution checks every pair - O(n²). You can do better by sorting + two-pointer, but that's still O(n log n).

The question is: **can we check "have I seen this value before?" in O(1)?**

With an array, no - you'd have to scan the whole thing (O(n)). That's the fundamental limit of arrays: they organize data by **position**, not by **value**.

Enter the hash map. It rearranges data so you can look things up by value instead of by index. And it does it in O(1) time on average.`,
    },
    {
      id: 'how-hashing-works',
      title: 'How Hash Maps Work',
      content: `A hash map (also called dictionary, unordered map, or just "map") stores **key-value pairs**. You give it a key, it gives you the associated value - instantly.

Under the hood, it works like this:
1. You give the map a key (say, the string "apple")
2. It runs the key through a **hash function** - a formula that converts the key into a number (a "hash code")
3. It uses that number as an index into an internal array (called **buckets**)
4. It stores your value in that bucket

**What about collisions?** Sometimes two different keys produce the same hash code. The map handles this by storing multiple entries in the same bucket (often using a linked list - we'll talk about those soon). With a good hash function, collisions are rare, so lookups stay O(1) on average.

| Operation | Average | Worst Case |
|---|---|---|
| Insert | O(1) | O(n) |
| Lookup | O(1) | O(n) |
| Delete | O(1) | O(n) |

The worst case happens when every key hashes to the same bucket - but this almost never happens with a good hash function.`,
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
            typescript: `// Map - key-value pairs
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
      title: 'Three Patterns That Cover 80% of Problems',
      content: `Most hash map/set problems boil down to one of these three patterns.`,
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
            typescript: `// 1. Counting frequencies
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
      title: 'HashMap vs HashSet: Which One?',
      content: `**Use a hash map (Dictionary/Map) when:**
- You need to associate values with keys (count frequencies, store indices, cache results)
- You need to look up data by a key and return associated data

**Use a hash set (Set) when:**
- You only need to know if something exists (membership testing)
- You want to remove duplicates from a collection

**Use neither when:**
- Order matters - hash structures generally don't guarantee insertion order across all languages. Use a sorted or linked variant, or check your language's specific behavior.
- You need range queries ("give me all keys between 10 and 20") - tree-based structures handle this.`,
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes',
      content: `**Using mutable objects as keys**
If you modify a key after inserting it into a hash map, you can never look it up again - its hash code has changed. Strings, numbers, and tuples are safe. Lists and custom objects (without proper hash/equality implementations) are not.

**"O(1) means it's always instant"**
O(1) is the average case. In the worst case (all keys collide), it degrades to O(n). With a good hash function, this is extremely rare, but it's worth knowing it exists.

**Double lookup anti-pattern**
\`if (map.ContainsKey(key)) return map[key]\` - this performs TWO hash lookups. Use \`TryGetValue\` / \`.get()\` with a default instead.

**Order is NOT guaranteed across all languages**
Hash maps and sets generally do not guarantee a particular iteration order (some languages like Python and JavaScript preserve insertion order in their built-in types, but others don't). If you need sorted keys or insertion-order preservation, use sorted/linked variants or check your language's guarantees.

**Confusing HashMap with HashSet**
Ask yourself: do I need to store a value associated with this key (use HashMap), or do I just need to track whether it exists (use HashSet)?`,
    },
    {
      id: 'common-patterns',
      title: 'Key Patterns to Remember',
      content: `1. **Frequency counter** - count how many times each element appears
2. **Complement lookup** - store seen values, check if target - current exists
3. **Deduplication** - use a set to filter out duplicates
4. **Two-pass** - first pass builds a map, second pass queries it
5. **Sliding window with set** - track unique characters in the current window`,
    },
    {
      id: 'whats-next',
      title: 'What\'s Next?',
      content: `You now have two tools in your toolbox: arrays for ordered, position-based data, and hash maps for O(1) value-based lookups.

But there's a gap. Arrays store elements in **contiguous memory**, and hash maps internally use an array of buckets — but entries are scattered across those buckets, not stored as a simple contiguous sequence. What if you need to insert or delete at the beginning frequently? With an array, that's O(n) - everything shifts. With a hash map, you generally can't rely on any positional ordering.

That's where **Linked Lists** come in. They sacrifice random access (indexing) for O(1) insertions and deletions — given you already have a reference to the position. They're also the foundation for more advanced structures like trees and graphs.

**Next up: Linked Lists**`,
    },
  ],
  problemIds: ['two-sum', 'group-anagrams', 'longest-consecutive', 'top-k-frequent'],
};
