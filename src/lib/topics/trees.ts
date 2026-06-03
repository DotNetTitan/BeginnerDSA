import type { Topic } from '../types';

export const topic: Topic = {
  id: 'trees',
  title: 'Trees & Tries',
  icon: 'GitBranch',
  order: 9,
  description: 'Hierarchical data structures. Master recursion on trees and prefix-based search with tries.',
  difficulty: 'advanced',
  prerequisites: ['big-o', 'arrays-strings', 'recursion'],
  theory: [
    {
      id: 'tree-basics',
      title: 'Tree Basics',
      component: 'tree-traversal-viz',
      content: `A tree is a hierarchical structure with a **root** node and **children** nodes. Each node has a **value** and pointers to its children.

**Binary Tree:** Each node has at most 2 children (left and right).
**Binary Search Tree (BST):** For every node: left < node < right.

| Operation | BST (balanced) | BST (skewed) |
|---|---|---|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Traverse | O(n) | O(n) |`,
      codeExamples: [
        {
          title: 'TreeNode class and traversals',
          code: {
            csharp: `public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// DFS Traversals (recursive)
void Inorder(TreeNode node) {      // left → root → right
    if (node == null) return;
    Inorder(node.left);
    Console.Write(node.val + " ");
    Inorder(node.right);
}

void Preorder(TreeNode node) {     // root → left → right
    if (node == null) return;
    Console.Write(node.val + " ");
    Preorder(node.left);
    Preorder(node.right);
}

void Postorder(TreeNode node) {    // left → right → root
    if (node == null) return;
    Postorder(node.left);
    Postorder(node.right);
    Console.Write(node.val + " ");
}

// BFS (Level order)
void LevelOrder(TreeNode root) {
    var q = new Queue<TreeNode>();
    q.Enqueue(root);
    while (q.Count > 0) {
        var node = q.Dequeue();
        Console.Write(node.val + " ");
        if (node.left != null) q.Enqueue(node.left);
        if (node.right != null) q.Enqueue(node.right);
    }
}`,
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# DFS Traversals (recursive)
def inorder(node):       # left → root → right
    if node is None:
        return
    inorder(node.left)
    print(node.val, end=" ")
    inorder(node.right)

def preorder(node):      # root → left → right
    if node is None:
        return
    print(node.val, end=" ")
    preorder(node.left)
    preorder(node.right)

def postorder(node):     # left → right → root
    if node is None:
        return
    postorder(node.left)
    postorder(node.right)
    print(node.val, end=" ")

# BFS (Level order)
from collections import deque

def level_order(root):
    q = deque([root])
    while q:
        node = q.popleft()
        print(node.val, end=" ")
        if node.left:
            q.append(node.left)
        if node.right:
            q.append(node.right)`,
            java: `import java.util.*;

public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode() {}
    public TreeNode(int val) { this.val = val; }
    public TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// DFS Traversals (recursive)
public void inorder(TreeNode node) {      // left → root → right
    if (node == null) return;
    inorder(node.left);
    System.out.print(node.val + " ");
    inorder(node.right);
}

public void preorder(TreeNode node) {     // root → left → right
    if (node == null) return;
    System.out.print(node.val + " ");
    preorder(node.left);
    preorder(node.right);
}

public void postorder(TreeNode node) {    // left → right → root
    if (node == null) return;
    postorder(node.left);
    postorder(node.right);
    System.out.print(node.val + " ");
}

// BFS (Level order)
public void levelOrder(TreeNode root) {
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
        TreeNode node = q.poll();
        System.out.print(node.val + " ");
        if (node.left != null) q.offer(node.left);
        if (node.right != null) q.offer(node.right);
    }
}`,
            javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// DFS Traversals (recursive)
const inorder = (node) => {        // left → root → right
    if (node === null) return;
    inorder(node.left);
    console.log(node.val + " ");
    inorder(node.right);
};

const preorder = (node) => {       // root → left → right
    if (node === null) return;
    console.log(node.val + " ");
    preorder(node.left);
    preorder(node.right);
};

const postorder = (node) => {      // left → right → root
    if (node === null) return;
    postorder(node.left);
    postorder(node.right);
    console.log(node.val + " ");
};

// BFS (Level order)
const levelOrder = (root) => {
    const q = [root];
    while (q.length > 0) {
        const node = q.shift();
        console.log(node.val + " ");
        if (node.left !== null) q.push(node.left);
        if (node.right !== null) q.push(node.right);
    }
};`,
          cpp: `#include <iostream>
#include <queue>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x = 0, TreeNode* l = nullptr, TreeNode* r = nullptr)
        : val(x), left(l), right(r) {}
};

// DFS Traversals (recursive)
void inorder(TreeNode* node) {      // left -> root -> right
    if (node == nullptr) return;
    inorder(node->left);
    std::cout << node->val << " ";
    inorder(node->right);
}

void preorder(TreeNode* node) {     // root -> left -> right
    if (node == nullptr) return;
    std::cout << node->val << " ";
    preorder(node->left);
    preorder(node->right);
}

void postorder(TreeNode* node) {    // left -> right -> root
    if (node == nullptr) return;
    postorder(node->left);
    postorder(node->right);
    std::cout << node->val << " ";
}

// BFS (Level order)
void levelOrder(TreeNode* root) {
    std::queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        std::cout << node->val << " ";
        if (node->left != nullptr) q.push(node->left);
        if (node->right != nullptr) q.push(node->right);
    }
}`,
          },
        },
      ],
    },
    {
      id: 'bst-operations',
      title: 'BST Operations',
      content: `BST property: \`left.val < node.val < right.val\` for ALL nodes (not just immediate children).

This property enables fast search - at each node you eliminate half the tree.`,
      codeExamples: [
        {
          title: 'BST search, insert, validate',
          code: {
            csharp: `// BST Search - O(log n) average
TreeNode Search(TreeNode root, int target) {
    while (root != null) {
        if (root.val == target) return root;
        root = target < root.val ? root.left : root.right;
    }
    return null;
}

// BST Insert - O(log n)
TreeNode Insert(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) root.left = Insert(root.left, val);
    else root.right = Insert(root.right, val);
    return root;
}

// Validate BST - O(n)
bool IsValidBST(TreeNode root) {
    return Validate(root, long.MinValue, long.MaxValue);
}

bool Validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return Validate(node.left, min, node.val)
        && Validate(node.right, node.val, max);
}`,
            python: `# BST Search - O(log n) average
def search(root, target):
    while root:
        if root.val == target:
            return root
        root = root.left if target < root.val else root.right
    return None

# BST Insert - O(log n)
def insert(root, val):
    if root is None:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

# Validate BST - O(n)
def is_valid_bst(root):
    def validate(node, min_val, max_val):
        if node is None:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (validate(node.left, min_val, node.val)
                and validate(node.right, node.val, max_val))

    return validate(root, float('-inf'), float('inf'))`,
            java: `// BST Search - O(log n) average
public TreeNode search(TreeNode root, int target) {
    while (root != null) {
        if (root.val == target) return root;
        root = target < root.val ? root.left : root.right;
    }
    return null;
}

// BST Insert - O(log n)
public TreeNode insert(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) root.left = insert(root.left, val);
    else root.right = insert(root.right, val);
    return root;
}

// Validate BST - O(n)
public boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private boolean validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val)
        && validate(node.right, node.val, max);
}`,
            javascript: `// BST Search - O(log n) average
const search = (root, target) => {
    while (root !== null) {
        if (root.val === target) return root;
        root = target < root.val ? root.left : root.right;
    }
    return null;
};

// BST Insert - O(log n)
const insert = (root, val) => {
    if (root === null) return new TreeNode(val);
    if (val < root.val) root.left = insert(root.left, val);
    else root.right = insert(root.right, val);
    return root;
};

// Validate BST - O(n)
const isValidBST = (root) => {
    const validate = (node, min, max) => {
        if (node === null) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val)
            && validate(node.right, node.val, max);
    };
    return validate(root, -Infinity, Infinity);
};`,
          cpp: `#include <climits>

// BST Search - O(log n) average
TreeNode* search(TreeNode* root, int target) {
    while (root != nullptr) {
        if (root->val == target) return root;
        root = target < root->val ? root->left : root->right;
    }
    return nullptr;
}

// BST Insert - O(log n)
TreeNode* insert(TreeNode* root, int val) {
    if (root == nullptr) return new TreeNode(val);
    if (val < root->val) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}

// Validate BST - O(n)
bool isValidBST(TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}

bool validate(TreeNode* node, long min, long max) {
    if (node == nullptr) return true;
    if (node->val <= min || node->val >= max) return false;
    return validate(node->left, min, node->val)
        && validate(node->right, node->val, max);
}`,
          },
        },
      ],
    },
    {
      id: 'trie',
      title: 'Trie (Prefix Tree)',
      content: `A trie (prefix tree) stores strings in a tree where each node represents a character. Used for **autocomplete**, **spell check**, and **IP routing**.

| Operation | Trie |
|---|---|
| Insert | O(m) where m = word length |
| Search | O(m) |
| Prefix search | O(m) |

Space: O(total characters across all words).`,
      codeExamples: [
        {
          title: 'Trie implementation',
          code: {
            csharp: `public class TrieNode {
    public Dictionary<char, TrieNode> children = new();
    public bool isEnd = false;
}

public class Trie {
    private readonly TrieNode root = new();

    public void Insert(string word) {
        var node = root;
        foreach (char c in word) {
            if (!node.children.ContainsKey(c))
                node.children[c] = new TrieNode();
            node = node.children[c];
        }
        node.isEnd = true;
    }

    public bool Search(string word) {
        var node = Find(word);
        return node != null && node.isEnd;
    }

    public bool StartsWith(string prefix) {
        return Find(prefix) != null;
    }

    private TrieNode Find(string s) {
        var node = root;
        foreach (char c in s) {
            if (!node.children.TryGetValue(c, out node))
                return null;
        }
        return node;
    }
}`,
            python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word):
        node = self._find(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._find(prefix) is not None

    def _find(self, s):
        node = self.root
        for c in s:
            if c not in node.children:
                return None
            node = node.children[c]
        return node`,
            java: `import java.util.*;

public class TrieNode {
    public Map<Character, TrieNode> children = new HashMap<>();
    public boolean isEnd = false;
}

public class Trie {
    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (!node.children.containsKey(c))
                node.children.put(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode node = find(word);
        return node != null && node.isEnd;
    }

    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }

    private TrieNode find(String s) {
        TrieNode node = root;
        for (char c : s.toCharArray()) {
            if (!node.children.containsKey(c))
                return null;
            node = node.children.get(c);
        }
        return node;
    }
}`,
            javascript: `class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const c of word) {
            if (!node.children.has(c))
                node.children.set(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isEnd = true;
    }

    search(word) {
        const node = this._find(word);
        return node !== null && node.isEnd;
    }

    startsWith(prefix) {
        return this._find(prefix) !== null;
    }

    _find(s) {
        let node = this.root;
        for (const c of s) {
            if (!node.children.has(c))
                return null;
            node = node.children.get(c);
        }
        return node;
    }
}`,
          cpp: `#include <unordered_map>
#include <string>

struct TrieNode {
    std::unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};

class Trie {
private:
    TrieNode* root = new TrieNode();

public:
    void insert(const std::string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c))
                node->children[c] = new TrieNode();
            node = node->children[c];
        }
        node->isEnd = true;
    }

    bool search(const std::string& word) {
        TrieNode* node = find(word);
        return node != nullptr && node->isEnd;
    }

    bool startsWith(const std::string& prefix) {
        return find(prefix) != nullptr;
    }

private:
    TrieNode* find(const std::string& s) {
        TrieNode* node = root;
        for (char c : s) {
            if (!node->children.count(c))
                return nullptr;
            node = node->children[c];
        }
        return node;
    }
};`,
          },
        },
      ],
    },
    {
      id: 'when-to-use-trees',
      title: 'When to Use Trees & Tries',
      content: `**Trees are the right choice when:**
- Data has a **hierarchical structure** (filesystem, DOM, org chart)
- You need **fast search with ordering** (BST: O(log n) average)
- You need **range queries** (BST: find all values between x and y)
- Data naturally branches (decision trees, game trees)

**Trees vs other structures:**
| Structure | Use when |
|---|---|
| Array / List | Flat, ordered data with index access |
| Hash map | Key-value lookup (no ordering needed) |
| Tree | Hierarchical OR needs sorted order OR range queries |
| Graph | No hierarchy, arbitrary connections |

**When NOT to use a tree:**
- Data is flat (just use an array)
- You only need exact membership lookup (use a hash set)
- The tree would be unbalanced (use a balanced tree library)

**Trie vs Hash Set for strings:**
| Criterion | Trie | Hash Set |
|---|---|---|
| Prefix search | O(m) - fast | O(n * L) - must scan all |
| Memory | More (node overhead) | Less |
| Exact membership | O(m) | O(1) average |
| Use case | Autocomplete, spell check | Simple word lookup |

**Decision guide:**
| Signal | Structure |
|---|---|
| "Sorted order of keys" | BST |
| "Find all values in range" | BST |
| "Hierarchy / parent-child" | Tree |
| "Autocomplete / prefix search" | Trie |
| "Fast lookup, no order needed" | Hash set/map |
| "Relationships between items" | Graph |`,
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes / Gotchas',
      content: `**BST validation: checking only immediate children**
A common mistake: \`left.val < node.val < right.val\`. This is WRONG. ALL nodes in the left subtree must be < node.val. Example: root=5, left=3, left.right=6 would pass the naive check but violates BST (6 > 5). Use the min/max range approach.

**Forgetting null checks on tree nodes**
\`node.left\` and \`node.right\` can be null. Always check \`if (node == null) return\` before accessing children.

**Recursion depth in skewed trees**
A tree with n nodes can be n levels deep if it's skewed (basically a linked list). Recursive traversal uses O(n) stack space and risks overflow. Consider iterative traversal for worst-case trees.

**Confusing tree, BST, and trie**
- **Tree**: generic hierarchical structure (any order)
- **BST**: ordered binary tree (left < node < right)
- **Trie**: prefix tree for strings (each node = one character)

**Trie: forgetting the end-of-word marker**
Without \`isEnd\` flag, \`search("app")\` returns true even if only "apple" was inserted. The flag distinguishes prefix from complete word.`,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Tree traversal** - inorder (sorted BST), preorder (serialization), level order (BFS)
2. **LCA (Lowest Common Ancestor)** - recursive or iterative for BST
3. **Diameter / max path sum** - post-order traversal with global variable
4. **Serialize / deserialize** - preorder with null markers
5. **Trie problems** - autocomplete, word search, word break
6. **Balanced tree check** - compute height and check balance at each node`,
    },
  ],
  problemIds: ['max-depth-binary-tree', 'inorder-traversal', 'validate-bst', 'lca-bst', 'serialize-deserialize'],
};
