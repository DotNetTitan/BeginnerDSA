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
          code: `public class TreeNode {
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
          language: 'csharp',
        },
      ],
    },
    {
      id: 'bst-operations',
      title: 'BST Operations',
      content: `BST property: \`left.val < node.val < right.val\` for ALL nodes (not just immediate children).

This property enables fast search — at each node you eliminate half the tree.`,
      codeExamples: [
        {
          title: 'BST search, insert, validate',
          code: `// BST Search — O(log n) average
TreeNode Search(TreeNode root, int target) {
    while (root != null) {
        if (root.val == target) return root;
        root = target < root.val ? root.left : root.right;
    }
    return null;
}

// BST Insert — O(log n)
TreeNode Insert(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) root.left = Insert(root.left, val);
    else root.right = Insert(root.right, val);
    return root;
}

// Validate BST — O(n)
bool IsValidBST(TreeNode root) {
    return Validate(root, long.MinValue, long.MaxValue);
}

bool Validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return Validate(node.left, min, node.val)
        && Validate(node.right, node.val, max);
}`,
          language: 'csharp',
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
          code: `public class TrieNode {
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
          language: 'csharp',
        },
      ],
    },
    {
      id: 'csharp-notes',
      title: 'C# Specific Notes',
      content: `**Recursion depth warning**
Tree problems are naturally recursive, but a skewed tree of 10,000+ nodes will overflow the stack. Prefer **iterative** traversals using an explicit \`Stack<T>\` for production code.

\`\`\`csharp
// Iterative inorder traversal
IList<int> InorderIterative(TreeNode root) {
    var result = new List<int>();
    var stack = new Stack<TreeNode>();
    var curr = root;

    while (curr != null || stack.Count > 0) {
        while (curr != null) {
            stack.Push(curr);
            curr = curr.left;
        }
        curr = stack.Pop();
        result.Add(curr.val);
        curr = curr.right;
    }
    return result;
}
\`\`\`

**Dictionary vs array for Trie children**
\`TrieNode[] children = new TrieNode[26]\` is faster (no hashing) but only works for lowercase letters. Use \`Dictionary<char, TrieNode>\` for general-purpose.`,
    },
    {
      id: 'common-patterns',
      title: 'Common Interview Patterns',
      content: `1. **Tree traversal** — inorder (sorted BST), preorder (serialization), level order (BFS)
2. **LCA (Lowest Common Ancestor)** — recursive or iterative for BST
3. **Diameter / max path sum** — post-order traversal with global variable
4. **Serialize / deserialize** — preorder with null markers
5. **Trie problems** — autocomplete, word search, word break
6. **Balanced tree check** — compute height and check balance at each node`,
    },
  ],
  problemIds: ['max-depth-binary-tree', 'inorder-traversal', 'validate-bst', 'lca-bst', 'serialize-deserialize'],
};
