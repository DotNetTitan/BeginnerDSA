<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:debugging -->
# Debugging third-party issues first

Before troubleshooting any unexpected behavior or console noise from a third-party service (CDN, widget, analytics, CDN, etc.), search its official docs or known issues first to check if it's expected. Do not assume every anomaly is a bug in the app.
<!-- END:debugging -->

<!-- BEGIN:parseSignature-regex -->
# parseSignature regex pitfalls (src/lib/compiler-map.ts)

The `parseSignature` regex uses `matchAll().pop()` to find the last matching function signature as the entry point. This has two key pitfalls:

1. **False positive matches from statements**: `return foo(x)`, `new Bar(x)`, `if (cond)`, `for (...)`, etc. all match the regex because they look like `RETURN_TYPE METHOD_NAME(PARAMS)`. Fix: the regex has `(?!\s*;)` negative lookahead after `\)` to exclude statement-level calls ending with `;`.

2. **Last match assumption**: The last matching function definition is assumed to be the entry point. This works for most DSA problems (entry point is usually the last function defined, after helpers), but may fail for classes with multiple methods (e.g. MinStack). For those, a `code` field in the problems file bypasses `extractStarter` entirely.

Regular expression (current):
```
/(?:public\s+|private\s+|protected\s+)?([^\s;(:{]+(?:\s*<[^>]+>)?(?:\[\])?)\s+(\w+)\s*\(([^)]*)\)(?!\s*;)/g
```

# C++ graph helpers (src/lib/compiler-map.ts)

The `generateCppWrapper` function supports `Node*` (graph) params and return types via two helper functions:

- **`buildGraph(json)`**: Parses adjacency list JSON string (e.g. `[[2,4],[1,3],[2,4],[1,3]]`) into a `Node*` graph. Nodes are 1-indexed by position. Stored in `CPP_GRAPH_HELPERS` constant.
- **`graphToJson(node)`**: Serializes a `Node*` graph back to adjacency list JSON string using BFS, sorted by node `val`.

When `needsGraphHelper(sig)` returns true (any param or return type is a pointer type), the helpers are prepended to the wrapper. Test results use proper string comparison (`actual == expected`) instead of the placeholder `"["` comparison used for non-graph types.

`canAutoGenerateTests` accepts `Node*` params (graph builders exist) but still blocks `ListNode*` and `TreeNode*` (no builders yet).

# Python graph helpers (src/lib/compiler-map.ts)

The same `buildGraph`/`graphToJson` pattern exists for Python via `PYTHON_GRAPH_HELPERS`:

- **`build_graph(json_str)`**: Parses adjacency list JSON string into `Node` objects. Uses `json.loads` internally.
- **`graph_to_json(node)`**: Serializes a `Node` graph back to compact JSON adjacency list using BFS, sorted by `node.val`.

Python detection uses `needsGraphCode(code)` which checks for `class Node` + `def` in the code. The Python `parseSignature` also handles the case where `class Node:` is the first line (not a `def`) by scanning all lines from the bottom for the last top-level `def`.

`PYTHON_GRAPH_HELPERS` does NOT include `import json` (it's already in the wrapper header). The Python Run and Run Tests flows both use `build_graph(args)` for param construction and `graph_to_json(result)` for result serialization with compact `json.dumps(..., separators=(",", ":"))`.
<!-- END:parseSignature-regex -->
