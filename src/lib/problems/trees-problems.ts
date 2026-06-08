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
    constraints: ['The number of nodes is in the range [0, 10^4].'],
    hints: ['Recursive: depth = 1 + max(depth of left, depth of right).', 'Base case: null node has depth 0.'],
    solution: {
      csharp: `public int MaxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.Max(MaxDepth(root.left), MaxDepth(root.right));
}`,
      python: `def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
`,
      java: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      typescript: `function maxDepth(root) {
    if (root === null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      cpp: `struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* left, TreeNode* right) : val(x), left(left), right(right) {}
};

int maxDepth(TreeNode* root) {
    if (root == nullptr) return 0;
    return 1 + std::max(maxDepth(root->left), maxDepth(root->right));
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
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
    solution: {
      csharp: `public IList<int> InorderTraversal(TreeNode root) {
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
      python: `def inorder_traversal(root):
    result = []
    stack = []
    curr = root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        result.append(curr.val)
        curr = curr.right
    return result
`,
      java: `public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    Stack<TreeNode> stack = new Stack<>();
    TreeNode curr = root;
    while (curr != null || !stack.isEmpty()) {
        while (curr != null) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        result.add(curr.val);
        curr = curr.right;
    }
    return result;
}`,
      typescript: `function inorderTraversal(root) {
    const result = [];
    const stack = [];
    let curr = root;
    while (curr !== null || stack.length > 0) {
        while (curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        result.push(curr.val);
        curr = curr.right;
    }
    return result;
}`,
      cpp: `#include <vector>
#include <stack>

std::vector<int> inorderTraversal(TreeNode* root) {
    std::vector<int> result;
    std::stack<TreeNode*> stack;
    TreeNode* curr = root;
    while (curr != nullptr || !stack.empty()) {
        while (curr != nullptr) {
            stack.push(curr);
            curr = curr->left;
        }
        curr = stack.top(); stack.pop();
        result.push_back(curr->val);
        curr = curr->right;
    }
    return result;
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
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
    constraints: ['The number of nodes is in the range [1, 10^4].'],
    hints: ['Use min/max range for each node.', 'Pass down valid range (long.MinValue, long.MaxValue) initially.'],
    code: {
      cpp: `bool isValidBST(TreeNode* root) {
    // TODO: implement your solution here
    return false;
}`,
    },
    solution: {
      csharp: `public bool IsValidBST(TreeNode root) {
    return Validate(root, long.MinValue, long.MaxValue);
}

bool Validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return Validate(node.left, min, node.val)
        && Validate(node.right, node.val, max);
}`,
      python: `def is_valid_bst(root):
    def validate(node, lo, hi):
        if node is None:
            return True
        if node.val <= lo or node.val >= hi:
            return False
        return (validate(node.left, lo, node.val) and
                validate(node.right, node.val, hi))
    return validate(root, float('-inf'), float('inf'))
`,
      java: `public boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private boolean validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
}`,
      typescript: `function isValidBST(root) {
    function validate(node, min, max) {
        if (node === null) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
    return validate(root, -Infinity, Infinity);
}`,
      cpp: `#include <climits>

bool validate(TreeNode* node, long min, long max) {
    if (node == nullptr) return true;
    if (node->val <= min || node->val >= max) return false;
    return validate(node->left, min, node->val) && validate(node->right, node->val, max);
}

bool isValidBST(TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
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
    solution: {
      csharp: `public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
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
      python: `def lowest_common_ancestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root
    return None
`,
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
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
      typescript: `function lowestCommonAncestor(root, p, q) {
    while (root !== null) {
        if (p.val < root.val && q.val < root.val)
            root = root.left;
        else if (p.val > root.val && q.val > root.val)
            root = root.right;
        else
            return root;
    }
    return null;
}`,
      cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    while (root != nullptr) {
        if (p->val < root->val && q->val < root->val)
            root = root->left;
        else if (p->val > root->val && q->val > root->val)
            root = root->right;
        else
            return root;
    }
    return nullptr;
}`,
    },
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(1)',
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
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
    constraints: ['The number of nodes is in the range [0, 10^4].'],
    hints: ['Use preorder traversal (root, left, right).', 'Mark null nodes with a sentinel like "#".'],
    code: {
      csharp: `public class Codec {
    public string Serialize(TreeNode root) {
        // TODO: implement your solution here
        return "";
    }

    public TreeNode Deserialize(string data) {
        // TODO: implement your solution here
        return null;
    }
}`,
      python: `class Codec:
    def serialize(self, root):
        # TODO: implement your solution here
        return ""

    def deserialize(self, data):
        # TODO: implement your solution here
        return None
`,
      java: `public class Codec {
    public String serialize(TreeNode root) {
        // TODO: implement your solution here
        return "";
    }

    public TreeNode deserialize(String data) {
        // TODO: implement your solution here
        return null;
    }
}`,
      typescript: `class Codec {
    serialize(root) {
        // TODO: implement your solution here
        return "";
    }
    deserialize(data) {
        // TODO: implement your solution here
        return null;
    }
}`,
      cpp: `class Codec {
public:
    std::string serialize(TreeNode* root) {
        // TODO: implement your solution here
        return "";
    }

    TreeNode* deserialize(const std::string& data) {
        // TODO: implement your solution here
        return nullptr;
    }
};`,
    },
    solution: {
      csharp: `public class Codec {
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
      python: `class Codec:
    def serialize(self, root):
        def dfs(node):
            if node is None:
                return "#"
            return f"{node.val},{dfs(node.left)},{dfs(node.right)}"
        return dfs(root)

    def deserialize(self, data):
        def dfs(nodes):
            val = next(nodes)
            if val == "#":
                return None
            node = TreeNode(int(val))
            node.left = dfs(nodes)
            node.right = dfs(nodes)
            return node
        return dfs(iter(data.split(",")))
`,
      java: `public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        serialize(root, sb);
        return sb.toString();
    }

    private void serialize(TreeNode node, StringBuilder sb) {
        if (node == null) { sb.append("#,"); return; }
        sb.append(node.val).append(",");
        serialize(node.left, sb);
        serialize(node.right, sb);
    }

    public TreeNode deserialize(String data) {
        Queue<String> q = new LinkedList<>(Arrays.asList(data.split(",")));
        return deserialize(q);
    }

    private TreeNode deserialize(Queue<String> q) {
        String val = q.poll();
        if (val.equals("#")) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = deserialize(q);
        node.right = deserialize(q);
        return node;
    }
}`,
      typescript: `class Codec {
    serialize(root) {
        function dfs(node) {
            if (node === null) return "#";
            return node.val + "," + dfs(node.left) + "," + dfs(node.right);
        }
        return dfs(root);
    }
    deserialize(data) {
        const nodes = data.split(",");
        function dfs() {
            const val = nodes.shift();
            if (val === "#") return null;
            const node = new TreeNode(parseInt(val));
            node.left = dfs();
            node.right = dfs();
            return node;
        }
        return dfs();
    }
}`,
      cpp: `#include <string>
#include <sstream>
#include <queue>

class Codec {
public:
    std::string serialize(TreeNode* root) {
        std::ostringstream out;
        serialize(root, out);
        return out.str();
    }

    TreeNode* deserialize(const std::string& data) {
        std::istringstream in(data);
        return deserialize(in);
    }

private:
    void serialize(TreeNode* node, std::ostringstream& out) {
        if (node == nullptr) {
            out << "# ";
            return;
        }
        out << node->val << " ";
        serialize(node->left, out);
        serialize(node->right, out);
    }

    TreeNode* deserialize(std::istringstream& in) {
        std::string val;
        in >> val;
        if (val == "#") return nullptr;
        auto node = new TreeNode(std::stoi(val));
        node->left = deserialize(in);
        node->right = deserialize(in);
        return node;
    }
};`,
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
  },
];
