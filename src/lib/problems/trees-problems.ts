import type { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'max-depth-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    topicId: 'trees',
    difficulty: 'easy',
    description: `Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from root to leaf.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' },
    ],
    constraints: ['The number of nodes is in the range [0, 10⁴].'],
    hints: ['Recursive: depth = 1 + max(depth of left, depth of right).', 'Base case: null node has depth 0.'],
    solution: `public int MaxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.Max(MaxDepth(root.left), MaxDepth(root.right));
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
  },
  {
    id: 'inorder-traversal',
    title: 'Binary Tree Inorder Traversal',
    topicId: 'trees',
    difficulty: 'easy',
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values (iteratively).`,
    examples: [
      { input: 'root = [1,null,2,3]', output: '[1,3,2]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes is in the range [0, 100].'],
    hints: ['Use an explicit stack.', 'Push all left nodes, then pop, process, and go right.'],
    solution: `public IList<int> InorderTraversal(TreeNode root) {
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
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
  },
  {
    id: 'validate-bst',
    title: 'Validate Binary Search Tree',
    topicId: 'trees',
    difficulty: 'medium',
    description: `Given the root of a binary tree, determine if it is a valid BST.`,
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'Root value 5 with right child 4 violates BST property.' },
    ],
    constraints: ['The number of nodes is in the range [1, 10⁴].'],
    hints: ['Use min/max range for each node.', 'Pass down valid range (long.MinValue, long.MaxValue) initially.'],
    solution: `public bool IsValidBST(TreeNode root) {
    return Validate(root, long.MinValue, long.MaxValue);
}

bool Validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return Validate(node.left, min, node.val)
        && Validate(node.right, node.val, max);
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
  },
  {
    id: 'lca-bst',
    title: 'Lowest Common Ancestor of BST',
    topicId: 'trees',
    difficulty: 'medium',
    description: `Given a BST, find the lowest common ancestor of two given nodes.`,
    examples: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6' },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2' },
    ],
    constraints: ['All values are unique.', 'p and q exist in the tree.'],
    hints: ['Use BST property to decide which direction to go.', 'If both are smaller than root, go left. If both are larger, go right.'],
    solution: `public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    while (root != null) {
        if (p.val < root.val && q.val < root.val)
            root = root.left;
        else if (p.val > root.val && q.val > root.val)
            root = root.right;
        else
            return root;
    }
    return null;
}`,
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'serialize-deserialize',
    title: 'Serialize and Deserialize Binary Tree',
    topicId: 'trees',
    difficulty: 'hard',
    description: `Design an algorithm to serialize (convert to string) and deserialize (convert back) a binary tree. Use preorder traversal with null markers.`,
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]', explanation: 'Serialize then deserialize produces the same tree.' },
    ],
    constraints: ['The number of nodes is in the range [0, 10⁴].'],
    hints: ['Use preorder traversal (root, left, right).', 'Mark null nodes with a sentinel like "#".'],
    solution: `public class Codec {
    public string Serialize(TreeNode root) {
        var sb = new StringBuilder();
        Serialize(root, sb);
        return sb.ToString().TrimEnd(',');
    }

    void Serialize(TreeNode node, StringBuilder sb) {
        if (node == null) { sb.Append("#,"); return; }
        sb.Append(node.val + ",");
        Serialize(node.left, sb);
        Serialize(node.right, sb);
    }

    public TreeNode Deserialize(string data) {
        var q = new Queue<string>(data.Split(','));
        return Deserialize(q);
    }

    TreeNode Deserialize(Queue<string> q) {
        string val = q.Dequeue();
        if (val == "#") return null;
        var node = new TreeNode(int.Parse(val));
        node.left = Deserialize(q);
        node.right = Deserialize(q);
        return node;
    }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
];
