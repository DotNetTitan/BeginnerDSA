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
      content: `A hash map (dictionary) stores key-value pairs. The key is hashed to compute an index into an internal array (buckets). **Collisions** (two keys hashing to the same index) are handled via separate chaining (linked list per bucket) or open addressing.

| Operation | Average | Worst Case |
|---|---|---|
| Insert | O(1) | O(n) |
| Lookup | O(1) | O(n) |
| Delete | O(1) | O(n) |

The worst case occurs when all keys collide (rare with a good hash function — C# uses \`GetHashCode()\`).`,
      codeExamples: [
        {
          title: 'Dictionary and HashSet basics',
          code: `// Dictionary — key-value pairs
var dict = new Dictionary<string, int>();
dict["apple"] = 5;
dict["banana"] = 3;

// SAFE lookup — TryGetValue (avoids double lookup)
if (dict.TryGetValue("apple", out int count))
    Console.WriteLine(count); // 5

// ContainsKey + [] is TWO lookups — avoid this:
if (dict.ContainsKey("apple"))          // lookup 1
    Console.WriteLine(dict["apple"]);   // lookup 2

// HashSet — unique values
var set = new HashSet<int> { 1, 2, 3 };
set.Add(3);  // false — already exists
set.Contains(2); // true — O(1)`,
          language: 'csharp',
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
- You need range queries (use tree-based structures)`,
      codeExamples: [
        {
          title: 'Common patterns',
          code: `// 1. Counting frequencies
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

// 3. Two Sum pattern — complement lookup
bool HasPairSum(int[] arr, int target) {
    var seen = new HashSet<int>();
    foreach (var n in arr) {
        if (seen.Contains(target - n)) return true;
        seen.Add(n);
    }
    return false;
}`,
          language: 'csharp',
        },
      ],
    },
    {
      id: 'csharp-gotchas',
      title: 'C# Specific Notes',
      content: `**1. Always use TryGetValue, not ContainsKey + []**
ContainsKey does one lookup, the indexer does another. TryGetValue does it in one.

**2. Default capacity and resizing**
Dictionary starts with a small capacity and resizes when full. Resizing is O(n). If you know the size upfront, pass capacity to the constructor: \`new Dictionary<int, string>(1000)\`.

**3. Custom equality**
For custom types, override \`Equals\` and \`GetHashCode\` (both must be consistent). Use \`record\` types in modern C# — they implement these automatically.

**4. Order is NOT guaranteed**
Dictionary and HashSet do not preserve insertion order. Use \`OrderedDictionary\` or \`SortedDictionary<K,V>\` if order matters.`,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Frequency counter** — count occurrences of each element
2. **Complement lookup** — store seen values and check for target - current
3. **Deduplication** — remove duplicates via HashSet
4. **Two-pass** — first pass builds map, second pass uses it
5. **Sliding window with set** — track unique characters in window`,
    },
  ],
  problemIds: ['two-sum', 'group-anagrams', 'longest-consecutive', 'top-k-frequent'],
};
