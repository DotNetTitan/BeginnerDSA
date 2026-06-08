export type Language = 'csharp' | 'python' | 'java' | 'typescript' | 'cpp';

export interface TestCase {
  args: string[];
  expected: string;
}

const COMPILER_IDS: Record<Language, string> = {
  csharp: 'dotnet-csharp-9',
  python: 'python-3.14',
  java: 'openjdk-25',
  typescript: 'typescript-deno',
  cpp: 'g++-15',
};

export function getCompilerId(language: Language): string {
  return COMPILER_IDS[language];
}

interface MethodSignature {
  methodName: string;
  returnType: string;
  params: { type: string; name: string }[];
}

function parseSignature(code: string): MethodSignature | null {
  const lines = code.trim().split('\n');
  const firstLine = lines[0].trim();

  const pyMatch = firstLine.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/);
  if (pyMatch) {
    const methodName = pyMatch[1];
    const paramsStr = pyMatch[2].trim();
    const params: { type: string; name: string }[] = [];
    if (paramsStr) {
      for (const p of paramsStr.split(',')) {
        const name = p.trim().split(/\s+/).pop() ?? '';
        if (name) params.push({ type: 'object', name });
      }
    }
    return { methodName, returnType: 'object', params };
  }

  // Check for Python function definition on any top-level line (not indented)
  for (let i = lines.length - 1; i >= 0; i--) {
    const pyDefMatch = lines[i].match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/);
    if (pyDefMatch) {
      const methodName = pyDefMatch[1];
      const paramsStr = pyDefMatch[2].trim();
      const params: { type: string; name: string }[] = [];
      if (paramsStr) {
        for (const p of paramsStr.split(',')) {
          const name = p.trim().split(/\s+/).pop() ?? '';
          if (name) params.push({ type: 'object', name });
        }
      }
      return { methodName, returnType: 'object', params };
    }
  }

  const allMatches = [...code.matchAll(
    /(?:public\s+|private\s+|protected\s+)?([^\s;(:{]+(?:\s*<[^>]+>)?(?:\[\])?)\s+(\w+)\s*\(([^)]*)\)(?!\s*;)/g
  )];
  const filteredMatches = allMatches.filter(m => !/^\s*(private|protected)\s/.test(m[0]));
  const sigMatch = (filteredMatches.length > 0 ? filteredMatches : allMatches).pop();
  if (!sigMatch) return null;

  const returnType = sigMatch[1].trim();
  const methodName = sigMatch[2];
  const paramsStr = sigMatch[3].trim();

  const params: { type: string; name: string }[] = [];
  if (paramsStr) {
    for (const p of paramsStr.split(',')) {
      const parts = p.trim().split(/\s+/);
      if (parts.length >= 2) {
        const name = parts[parts.length - 1];
        const type = parts.slice(0, -1).join(' ');
        params.push({ type, name });
      }
    }
  }

  return { methodName, returnType, params };
}

function csharpArgExpr(value: string, type: string): string {
  if (type === 'int') return value;
  if (type === 'string') return `"${value.replace(/^"|"$/g, '')}"`;
  if (type === 'bool') return value.toLowerCase();
  if (type.endsWith('*')) return 'null';
  if (type === 'int[]' || type === 'int []') {
    if (value === '[]' || value === '') return 'new int[0]';
    const nums = value.replace(/^\[|\]$/g, '').split(',').map(s => s.trim()).join(', ');
    return `new int[] { ${nums} }`;
  }
  if (type === 'int[][]' || type === 'int [][]') {
    const inner = value.slice(1, -1);
    const items = splitTopLevel(inner);
    const nested = items.map(item => csharpArgExpr(item, 'int[]'));
    return `new int[][] { ${nested.join(', ')} }`;
  }
  if (type === 'char[][]' || type === 'char [][]') {
    const inner = value.slice(1, -1);
    const items = splitTopLevel(inner);
    const nested = items.map(item => {
      const row = item.replace(/^\[|\]$/g, '').split(',').map((s: string) => `'${s.trim().replace(/^"|"$/g, '')}'`).join(', ');
      return `new char[] { ${row} }`;
    });
    return `new char[][] { ${nested.join(', ')} }`;
  }
  if (type === 'string[]' || type === 'string []') {
    if (value === '[]' || value === '') return 'new string[0]';
    const items = value.replace(/^\[|\]$/g, '').split(',').map((s: string) => s.trim());
    return `new string[] { ${items.join(', ')} }`;
  }
  if (type.startsWith('IList<') || type.startsWith('List<')) {
    const concreteType = type.startsWith('IList<') ? 'List<' + type.slice(6) : type;
    if (value === '[]') return `new ${concreteType}()`;
    const items = value.replace(/^\[|\]$/g, '').split(',').map((s: string) => s.trim());
    return `new ${concreteType} { ${items.join(', ')} }`;
  }
  return value;
}

function javaArgExpr(value: string, type: string): string {
  if (type === 'int') return value;
  if (type === 'String') return `"${value.replace(/^"|"$/g, '')}"`;
  if (type === 'boolean' || type === 'bool') return value.toLowerCase();
  if (type === 'int[]' || type === 'int []') {
    if (value === '[]' || value === '') return 'new int[0]';
    const nums = value.replace(/^\[|\]$/g, '').split(',').map(s => s.trim()).join(', ');
    return `new int[] { ${nums} }`;
  }
  if (type === 'int[][]' || type === 'int [][]') {
    const inner = value.slice(1, -1);
    const items = splitTopLevel(inner);
    const nested = items.map(item => javaArgExpr(item, 'int[]'));
    return `new int[][] { ${nested.join(', ')} }`;
  }
  if (type === 'char[][]' || type === 'char [][]') {
    const inner = value.slice(1, -1);
    const items = splitTopLevel(inner);
    const nested = items.map(item => {
      const row = item.replace(/^\[|\]$/g, '').split(',').map((s: string) => `'${s.trim().replace(/^"|"$/g, '')}'`).join(', ');
      return `new char[] { ${row} }`;
    });
    return `new char[][] { ${nested.join(', ')} }`;
  }
  if (type === 'String[]' || type === 'String []') {
    if (value === '[]' || value === '') return 'new String[0]';
    const items = value.replace(/^\[|\]$/g, '').split(',').map((s: string) => s.trim());
    return `new String[] { ${items.join(', ')} }`;
  }
  if (type.startsWith('List<')) {
    if (value === '[]') return `new ${type}()`;
    const items = value.replace(/^\[|\]$/g, '').split(',').map((s: string) => s.trim());
    return `Arrays.asList(${items.join(', ')})`;
  }
  return value;
}

function splitTopLevel(s: string): string[] {
  const result: string[] = [];
  let depth = 0, current = '';
  for (const ch of s) {
    if (ch === '[' || ch === '{') { depth++; current += ch; }
    else if (ch === ']' || ch === '}') { depth--; current += ch; }
    else if (ch === ',' && depth === 0) { result.push(current.trim()); current = ''; }
    else { current += ch; }
  }
  if (current.trim()) result.push(current.trim());
  return result;
}

function jsonToCppValue(value: string, rawInnerType: string): string {
  const innerType = rawInnerType.replace(/^std::/, '');
  // innerType is e.g. 'char', 'int', 'string', 'vector<char>', 'vector<int>'
  if (!value.startsWith('[')) {
    // Scalar value
    if (innerType === 'char') {
      const v = value.replace(/^"|"$/g, '');
      return `'${v}'`;
    }
    if (innerType === 'string' || innerType === 'std::string') return value;
    return value;
  }

  const inner = value.slice(1, -1);
  const items = splitTopLevel(inner);

  // Determine element type for nested vectors
  const nestedMatch = innerType.match(/^vector<(.+)>$/);
  const elementType = nestedMatch ? nestedMatch[1] : innerType;

  if (nestedMatch) {
    const nested = items.map(item => jsonToCppValue(item, elementType));
    return `vector<${elementType}>{${nested.join(', ')}}`;
  }

  // Flat array
  if (elementType === 'char') {
    return '{' + items.map(v => `'${v.replace(/^"|"$/g, '')}'`).join(', ') + '}';
  }
  if (elementType === 'string' || elementType === 'std::string') {
    return '{' + items.join(', ') + '}';
  }
  return '{' + items.join(', ') + '}';
}

function normalizedType(raw: string): string {
  return raw
    .replace(/^(const\s+)?/, '')
    .replace(/[&*]$/, '')
    .replace(/^std::/, '')
    .trim();
}

function cppArgExpr(value: string, rawType: string): string {
  if (rawType.endsWith('*')) return 'nullptr';
  const type = normalizedType(rawType);

  if (type === 'int') return value;
  if (type === 'string' || type === 'std::string') return `"${value}"`;
  if (type === 'bool') return value.toLowerCase();

  // vector<T> or nested vector<vector<T>>
  if (type.startsWith('vector<')) {
    if (value === '[]') return `${type}()`;
    return jsonToCppValue(value, type);
  }

  return value;
}

function generateCSharpWrapper(userCode: string, testCases: TestCase[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'Solve';
  const usesGraph = testCases.length > 0 && needsGraphCode(userCode);
  const isVoid = sig ? (() => {
    const m = userCode.match(
      /(?:public\s+|private\s+|protected\s+)?void\s+\w+\s*\(/
    );
    return !!m;
  })() : false;

  const lines: string[] = [];
  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    let args: string;
    if (usesGraph) {
      args = tc.args.map(v => `BuildGraph(${JSON.stringify(v)})`).join(', ');
    } else {
      args = tc.args.map((v, j) => {
        const t = sig?.params[j]?.type ?? 'int';
        return csharpArgExpr(v, t);
      }).join(', ');
    }
    const exp = tc.expected;
    const n = i + 1;

    function addLine(passExpr: string, actualExpr: string) {
      lines.push(`            items.Add("{\\"index\\":${n},\\"passed\\":" + ${passExpr} + ",\\"expected\\":\\"${exp}\\",\\"actual\\":\\"" + ${actualExpr} + "\\"}");`);
    }

    lines.push('        try {');
    if (isVoid) {
      lines.push('            s.' + methodName + '(' + args + ');');
      addLine('true', '"(void)"');
    } else if (usesGraph) {
      lines.push('            var r' + i + ' = s.' + methodName + '(' + args + ');');
      lines.push('            var g' + i + ' = GraphToJson(r' + i + ');');
      lines.push('            var p' + i + ' = g' + i + ' == "' + exp + '";');
      addLine('p' + i + '.ToString().ToLower()', 'g' + i);
      lines.push('            if (!p' + i + ') failed++;');
    } else {
      lines.push('            var r' + i + ' = s.' + methodName + '(' + args + ');');
      lines.push('            var g' + i + ' = Fmt(r' + i + ');');
      lines.push('            var p' + i + ' = g' + i + ' == "' + exp + '";');
      addLine('p' + i + '.ToString().ToLower()', 'g' + i);
      lines.push('            if (!p' + i + ') failed++;');
    }
    lines.push('        } catch (Exception ex) {');
    lines.push('            failed++;');
    addLine('false', 'ex.Message');
    lines.push('        }');
  }

  const indentedCode = userCode.trimEnd().split('\n').map(line => '    ' + line).join('\n');
  const helpers = usesGraph ? '\n' + CSHARP_GRAPH_HELPERS.trimEnd() + '\n' : '';

  return 'using System;\nusing System.Linq;\nusing System.Collections.Generic;\n\npublic class Solution {\n' +
    indentedCode + '\n' + helpers + '\n' +
    '    static string Fmt(object o) {\n' +
    '        if (o == null) return "null";\n' +
    '        if (o is int[] a) return "[" + string.Join(", ", a) + "]";\n' +
    '        if (o is string s) return s;\n' +
    '        if (o is bool b) return b.ToString().ToLower();\n' +
    '        return o.ToString() ?? "null";\n' +
    '    }\n\n' +
    '    public static void Main() {\n' +
    '        try {\n' +
    '            var s = new Solution();\n' +
    '            var failed = 0;\n' +
    '            var items = new List<string>();\n' +
    lines.join('\n') + '\n' +
    '            Console.WriteLine("__TEST_RESULTS__");\n' +
    '            Console.WriteLine("[" + string.Join(",", items) + "]");\n' +
    '            Console.WriteLine("__DONE__");\n' +
    '            Console.Out.Flush();\n' +
    '        } catch (Exception) { }\n' +
    '    }\n' +
    '}\n';
}

function generatePythonWrapper(userCode: string, testCases: TestCase[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'solve';
  const hasClass = userCode.includes('class Solution');
  const usesGraph = testCases.length > 0 && needsGraphCode(userCode);

  const testCasesJson = testCases.map(tc =>
    `        {"args": ${JSON.stringify(tc.args)}, "expected": ${JSON.stringify(tc.expected)}}`
  ).join(',\n');

  let callExpr: string;
  let comparisonCode: string;
  if (usesGraph) {
    callExpr = hasClass
      ? `s.${methodName}(*[build_graph(a) for a in tc["args"]])`
      : `${methodName}(*[build_graph(a) for a in tc["args"]])`;
    comparisonCode = `
            actual_str = graph_to_json(actual)
            expected_obj = json.loads(tc["expected"])
            expected_str = json.dumps(expected_obj, separators=(",", ":"))
            passed = actual_str == expected_str`;
  } else {
    callExpr = hasClass ? `s.${methodName}(*parsed_args)` : `${methodName}(*parsed_args)`;
    comparisonCode = `
            actual_str = json.dumps(actual) if not isinstance(actual, str) else actual
            passed = actual_str == tc["expected"]`;
  }
  const instanceLine = hasClass ? '    s = Solution()' : '';

  const helpers = usesGraph ? '\n' + PYTHON_GRAPH_HELPERS.trimEnd() + '\n' : '';

  return `import sys
import json

${userCode.trimEnd()}${helpers}

def main():
${instanceLine}
    test_cases = [
${testCasesJson}
    ]

    all_passed = True
    results = []

    for i, tc in enumerate(test_cases):
        try:
            parsed_args = [json.loads(a) for a in tc["args"]]
            actual = ${callExpr}${comparisonCode}
            results.append({"index": i + 1, "passed": passed, "expected": tc["expected"], "actual": actual_str})
            if not passed:
                all_passed = False
        except Exception as e:
            results.append({"index": i + 1, "passed": False, "expected": tc["expected"], "actual": str(e)})
            all_passed = False

    print("__TEST_RESULTS__")
    print(json.dumps(results))
    print("__DONE__")
    sys.stdout.flush()

if __name__ == '__main__':
    main()
`;
}

function generateJavaWrapper(userCode: string, testCases: TestCase[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'solve';
  const usesGraph = testCases.length > 0 && needsGraphCode(userCode);

  const testCode: string[] = [];
  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const escapedExpected = tc.expected.replace(/"/g, '\\"');

    let args: string;
    if (usesGraph) {
      args = tc.args.map(v => `buildGraph(${JSON.stringify(v)})`).join(', ');
    } else {
      args = tc.args.map((v, j) => {
        const t = sig?.params[j]?.type ?? 'int';
        return javaArgExpr(v, t);
      }).join(', ');
    }

    testCode.push(`            // Test ${i + 1}`);
    testCode.push(`            try {`);
    if (usesGraph) {
      testCode.push(`                var result${i} = s.${methodName}(${args});`);
      testCode.push(`                String actual${i}Str = graphToJson(result${i});`);
    } else if (args) {
      testCode.push(`                var result${i} = s.${methodName}(${args});`);
      testCode.push(`                String actual${i}Str = Objects.toString(result${i});`);
    } else {
      testCode.push(`                s.${methodName}();`);
      testCode.push(`                String actual${i}Str = "(void)";`);
    }
    testCode.push(`                String expected${i}Str = "${escapedExpected}";`);
    testCode.push(`                boolean pass${i} = actual${i}Str.equals(expected${i}Str);`);
    testCode.push(`                json.add("{\\"index\\":" + ${i + 1} + ",\\"passed\\":" + pass${i} + ",\\"expected\\":\\"" + expected${i}Str + "\\",\\"actual\\":\\"" + actual${i}Str + "\\"}");`);
    testCode.push(`                if (!pass${i}) allPassed = false;`);
    testCode.push(`            } catch (Exception e) {`);
    testCode.push(`                json.add("{\\"index\\":" + ${i + 1} + ",\\"passed\\":false,\\"expected\\":\\"${escapedExpected}\\",\\"actual\\":\\"" + e.getMessage() + "\\"}");`);
    testCode.push(`                allPassed = false;`);
    testCode.push(`            }`);
  }

  const helpers = usesGraph ? '\n' + JAVA_GRAPH_HELPERS.trimEnd() + '\n' : '';

  return `import java.util.*;

public class Solution {
${userCode.trimEnd().split('\n').map(line => '    ' + line).join('\n')}${helpers}

    public static void main(String[] args) {
        try {
            var s = new Solution();
            var json = new ArrayList<String>();
            boolean allPassed = true;

${testCode.join('\n')}

            System.out.println("__TEST_RESULTS__");
            System.out.println("[" + String.join(",", json) + "]");
            System.out.println("__DONE__");
            System.out.flush();
        } catch (Exception ex) {
            System.out.println("__TEST_RESULTS__");
            System.out.println("[{\\"index\\":1,\\"passed\\":false,\\"expected\\":\\"(crash)\\",\\"actual\\":\\"" + ex.getMessage() + "\\"}]");
            System.out.println("__DONE__");
            System.out.flush();
        }
    }
}
`;
}

function generateTypescriptWrapper(userCode: string, testCases: TestCase[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'solve';

  const testCasesJson = testCases.map(tc =>
    `    { args: ${JSON.stringify(tc.args)}, expected: ${JSON.stringify(tc.expected)} }`
  ).join(',\n');

  return `${userCode.trimEnd()}

async function main() {
    const testCases = [
${testCasesJson}
    ];

    let allPassed = true;
    const results = [];

    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        try {
            const parsed = tc.args.map(a => JSON.parse(a));
            const actual = ${methodName}(...parsed);
            const actualStr = JSON.stringify(actual);
            const expectedStr = JSON.stringify(JSON.parse(tc.expected));
            const passed = actualStr === expectedStr;
            results.push({ index: i + 1, passed, expected: tc.expected, actual: actualStr });
            if (!passed) allPassed = false;
        } catch (e) {
            results.push({ index: i + 1, passed: false, expected: tc.expected, actual: e.message ?? String(e) });
            allPassed = false;
        }
    }

    console.log("__TEST_RESULTS__");
    console.log(JSON.stringify(results));
    console.log("__DONE__");
}

await main();
`;
}

export interface RunResult {
  testResults?: { index: number; passed: boolean; expected: string; actual: string }[];
  output: string;
  error: string;
  exitCode: number;
  time: string;
  memory: string;
}

export function extractTestResults(output: string): { testResults: RunResult['testResults']; cleanOutput: string } | null {
  const lines = output.split('\n');
  const markerIdx = lines.findIndex(l => l.trim() === '__TEST_RESULTS__');
  if (markerIdx === -1) return null;

  const doneIdx = lines.findIndex(l => l.trim() === '__DONE__');
  let jsonStr = '';
  if (doneIdx > markerIdx) {
    jsonStr = lines.slice(markerIdx + 1, doneIdx).join('\n').trim();
  } else {
    jsonStr = lines.slice(markerIdx + 1).join('\n').trim();
  }

  try {
    const testResults = JSON.parse(jsonStr);
    const cleanOutput = lines.slice(0, markerIdx).join('\n');
    return { testResults, cleanOutput };
  } catch {
    return null;
  }
}

function runtimeArgExpr(language: string, value: string, type: string): string {
  if (language === 'csharp') return csharpArgExpr(value, type);
  if (language === 'java') return javaArgExpr(value, type);
  if (language === 'cpp') return cppArgExpr(value, type);
  return value;
}

function generateRunCSharp(userCode: string, runArgs: string[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'Solve';
  const usesGraph = runArgs.length > 0 && needsGraphCode(userCode);

  let argExprs: string;
  if (sig) {
    argExprs = sig.params.map((p, i) => {
      const val = i < runArgs.length ? runArgs[i] : '0';
      return usesGraph ? `BuildGraph(${JSON.stringify(val)})` : runtimeArgExpr('csharp', val, p.type);
    }).join(', ');
  } else {
    argExprs = runArgs.join(', ');
  }

  const helpers = usesGraph ? '\n' + CSHARP_GRAPH_HELPERS.trimEnd() + '\n' : '';

  return `using System;
using System.Linq;
using System.Collections.Generic;

public class Solution {
${userCode.trimEnd().split('\n').map(line => '    ' + line).join('\n')}${helpers}

    public static void Main(string[] args) {
        try {
            var s = new Solution();
            s.${methodName}(${argExprs});
        } catch (Exception ex) {
            Console.WriteLine("Error: " + ex.Message);
        }
        Console.Out.Flush();
    }
}
`;
}

function generateRunPython(userCode: string, runArgs: string[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'solve';
  const hasClass = userCode.includes('class Solution');
  const usesGraph = runArgs.length > 0 && needsGraphCode(userCode);

  let argStr: string;
  if (usesGraph) {
    argStr = runArgs.map(a => `build_graph(${JSON.stringify(a)})`).join(', ');
  } else {
    argStr = runArgs.join(', ');
  }
  const setupLine = hasClass ? '        s = Solution()' : '';
  const callExpr = hasClass ? `s.${methodName}(${argStr})` : `${methodName}(${argStr})`;

  const helpers = usesGraph ? '\n' + PYTHON_GRAPH_HELPERS.trimEnd() + '\n' : '';

  return `import sys
import json

${userCode.trimEnd()}${helpers}

def main():
    try:
${setupLine}
        ${callExpr}
    except Exception as e:
        print("Error:", e)
    sys.stdout.flush()

if __name__ == '__main__':
    main()
`;
}

function generateRunJava(userCode: string, runArgs: string[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'solve';
  const usesGraph = runArgs.length > 0 && needsGraphCode(userCode);

  let argExprs: string;
  if (sig) {
    argExprs = sig.params.map((p, i) => {
      const val = i < runArgs.length ? runArgs[i] : '0';
      return usesGraph ? `buildGraph(${JSON.stringify(val)})` : runtimeArgExpr('java', val, p.type);
    }).join(', ');
  } else {
    argExprs = runArgs.join(', ');
  }

  const helpers = usesGraph ? '\n' + JAVA_GRAPH_HELPERS.trimEnd() + '\n' : '';

  return `import java.util.*;

public class Solution {
${userCode.trimEnd().split('\n').map(line => '    ' + line).join('\n')}${helpers}

    public static void main(String[] args) {
        try {
            var s = new Solution();
            s.${methodName}(${argExprs});
        } catch (Exception ex) {
            System.out.println("Error: " + ex.getMessage());
        }
        System.out.flush();
    }
}
`;
}

function generateRunTypescript(userCode: string, runArgs: string[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'solve';

  const argStr = runArgs.join(', ');

  return `${userCode.trimEnd().replace(/\n$/, '')}

async function main() {
    try {
        ${methodName}(${argStr});
    } catch (e) {
        console.log("Error:", e.message ?? String(e));
    }
}

await main();
`;
}

function generateRunCpp(userCode: string, runArgs: string[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'solve';

  const varDecls: string[] = [];
  const callArgs: string[] = [];
  if (sig) {
    sig.params.forEach((p, i) => {
      const hasArg = i < runArgs.length;
      const val = hasArg ? runArgs[i] : '';
      if (!hasArg) {
        // No matching example arg — default-construct the param
        callArgs.push('{}');
        return;
      }
      const expr = runtimeArgExpr('cpp', val, p.type);
      const norm = normalizedType(p.type);
      // Create named variables for complex types so they are lvalues
      if (norm.startsWith('vector<') || norm === 'string' || norm === 'std::string') {
        const vn = `_arg${i}`;
        varDecls.push(`        auto ${vn} = ${expr};`);
        callArgs.push(vn);
      } else {
        callArgs.push(expr);
      }
    });
  } else {
    runArgs.forEach(a => callArgs.push(a));
  }

  return `#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <exception>
using namespace std;

${userCode.trimEnd()}

int main() {
    try {
${varDecls.join('\n')}
        ${methodName}(${callArgs.join(', ')});
    } catch (exception &ex) {
        cout << "Error: " << ex.what() << endl;
    } catch (...) {
        cout << "Unknown error" << endl;
    }
    cout.flush();
    return 0;
}
`;
}

export function generateWrapper(language: Language, userCode: string, testCases?: TestCase[], runArgs?: string[]): string {
  if (runArgs && runArgs.length > 0) {
    switch (language) {
      case 'csharp': return generateRunCSharp(userCode, runArgs);
      case 'python': return generateRunPython(userCode, runArgs);
      case 'java': return generateRunJava(userCode, runArgs);
      case 'typescript': return generateRunTypescript(userCode, runArgs);
      case 'cpp': return generateRunCpp(userCode, runArgs);
    }
  }
  const cases = testCases ?? [];
  if (cases.length === 0) {
    switch (language) {
      case 'csharp': return generateRunCSharp(userCode, []);
      case 'python': return generateRunPython(userCode, []);
      case 'java': return generateRunJava(userCode, []);
      case 'typescript': return generateRunTypescript(userCode, []);
      case 'cpp': return generateRunCpp(userCode, []);
    }
  }
  switch (language) {
    case 'csharp': return generateCSharpWrapper(userCode, cases);
    case 'python': return generatePythonWrapper(userCode, cases);
    case 'java': return generateJavaWrapper(userCode, cases);
    case 'typescript': return generateTypescriptWrapper(userCode, cases);
    case 'cpp': return generateCppWrapper(userCode, cases);
  }
}

export function parseExampleInput(input: string): string[] {
  const values = input.replace(/^.*?=\s*/, '');
  return values.split(/,\s*\w+\s*=\s*/);
}

const CPP_GRAPH_HELPERS = `
#include <unordered_set>
#include <unordered_map>
#include <queue>

Node* buildGraph(const string& json) {
    if (json == "[]" || json.size() < 2) return nullptr;
    string inner = json.substr(1, json.size() - 2);
    vector<vector<int>> adj;
    for (size_t _i = 0; _i < inner.size();) {
        if (inner[_i] == '[') {
            size_t _end = inner.find(']', _i);
            string _arr = inner.substr(_i + 1, _end - _i - 1);
            vector<int> _nbs;
            stringstream _ss(_arr);
            string _tok;
            while (getline(_ss, _tok, ','))
                if (!_tok.empty()) _nbs.push_back(stoi(_tok));
            adj.push_back(_nbs);
            _i = _end + 1;
        } else _i++;
    }
    if (adj.empty()) return nullptr;
    vector<Node*> _nodes;
    for (size_t _i = 0; _i < adj.size(); _i++)
        _nodes.push_back(new Node((int)(_i + 1)));
    for (size_t _i = 0; _i < adj.size(); _i++)
        for (int _nb : adj[_i])
            if (_nb >= 1 && _nb <= (int)_nodes.size())
                _nodes[_i]->neighbors.push_back(_nodes[_nb - 1]);
    return _nodes[0];
}

string graphToJson(Node* node) {
    if (!node) return "[]";
    unordered_set<Node*> _seen;
    queue<Node*> _q;
    _q.push(node);
    _seen.insert(node);
    vector<Node*> _nodes;
    while (!_q.empty()) {
        auto _cur = _q.front(); _q.pop();
        _nodes.push_back(_cur);
        for (auto _nb : _cur->neighbors) {
            if (!_seen.count(_nb)) {
                _seen.insert(_nb);
                _q.push(_nb);
            }
        }
    }
    sort(_nodes.begin(), _nodes.end(), [](Node* a, Node* b) { return a->val < b->val; });
    string _res = "[";
    for (size_t _i = 0; _i < _nodes.size(); _i++) {
        if (_i > 0) _res += ",";
        _res += "[";
        vector<int> _nbVals;
        for (auto _nb : _nodes[_i]->neighbors) _nbVals.push_back(_nb->val);
        sort(_nbVals.begin(), _nbVals.end());
        for (size_t _j = 0; _j < _nbVals.size(); _j++) {
            if (_j > 0) _res += ",";
            _res += to_string(_nbVals[_j]);
        }
        _res += "]";
    }
    _res += "]";
    return _res;
}
`;

const PYTHON_GRAPH_HELPERS = `

def build_graph(json_str):
    adj = json.loads(json_str)
    if not adj:
        return None
    nodes = [Node(i + 1) for i in range(len(adj))]
    for i, neighbors in enumerate(adj):
        for nb in neighbors:
            nodes[i].neighbors.append(nodes[nb - 1])
    return nodes[0]

def graph_to_json(node):
    if node is None:
        return "[]"
    seen = set()
    q = [node]
    seen.add(node)
    all_nodes = []
    while q:
        cur = q.pop(0)
        all_nodes.append(cur)
        for nb in cur.neighbors:
            if nb not in seen:
                seen.add(nb)
                q.append(nb)
    all_nodes.sort(key=lambda n: n.val)
    result = [[nb.val for nb in sorted(n.neighbors, key=lambda x: x.val)] for n in sorted(all_nodes, key=lambda n: n.val)]
    return json.dumps(result, separators=(",", ":"))
`;

const JAVA_GRAPH_HELPERS = `
    static Node buildGraph(String json) {
        if (json.equals("[]") || json.length() < 2) return null;
        String inner = json.substring(1, json.length() - 1);
        java.util.List<java.util.List<Integer>> adj = new java.util.ArrayList<>();
        for (int _i = 0; _i < inner.length(); _i++) {
            if (inner.charAt(_i) == '[') {
                int _end = inner.indexOf(']', _i);
                String _arr = inner.substring(_i + 1, _end);
                java.util.List<Integer> _nbs = new java.util.ArrayList<>();
                if (!_arr.isEmpty()) {
                    for (String s : _arr.split(","))
                        _nbs.add(Integer.parseInt(s.trim()));
                }
                adj.add(_nbs);
                _i = _end;
            }
        }
        if (adj.isEmpty()) return null;
        java.util.List<Node> _nodes = new java.util.ArrayList<>();
        for (int _i = 0; _i < adj.size(); _i++)
            _nodes.add(new Node(_i + 1));
        for (int _i = 0; _i < adj.size(); _i++)
            for (int _nb : adj.get(_i))
                if (_nb >= 1 && _nb <= _nodes.size())
                    _nodes.get(_i).neighbors.add(_nodes.get(_nb - 1));
        return _nodes.isEmpty() ? null : _nodes.get(0);
    }

    static String graphToJson(Node node) {
        if (node == null) return "[]";
        java.util.Set<Node> _seen = new java.util.HashSet<>();
        java.util.Queue<Node> _q = new java.util.LinkedList<>();
        _q.add(node);
        _seen.add(node);
        java.util.List<Node> _allNodes = new java.util.ArrayList<>();
        while (!_q.isEmpty()) {
            Node _cur = _q.poll();
            _allNodes.add(_cur);
            for (Node _nb : _cur.neighbors) {
                if (!_seen.contains(_nb)) {
                    _seen.add(_nb);
                    _q.add(_nb);
                }
            }
        }
        _allNodes.sort((a, b) -> Integer.compare(a.val, b.val));
        StringBuilder _res = new StringBuilder("[");
        for (int _i = 0; _i < _allNodes.size(); _i++) {
            if (_i > 0) _res.append(",");
            _res.append("[");
            java.util.List<Integer> _nbVals = new java.util.ArrayList<>();
            for (Node _nb : _allNodes.get(_i).neighbors) _nbVals.add(_nb.val);
            _nbVals.sort(Integer::compare);
            for (int _j = 0; _j < _nbVals.size(); _j++) {
                if (_j > 0) _res.append(",");
                _res.append(_nbVals.get(_j));
            }
            _res.append("]");
        }
        _res.append("]");
        return _res.toString();
    }
`;

const CSHARP_GRAPH_HELPERS = `
    static Node BuildGraph(string json) {
        if (json == "[]" || json.Length < 2) return null;
        string inner = json.Substring(1, json.Length - 2);
        var adj = new System.Collections.Generic.List<System.Collections.Generic.List<int>>();
        for (int _i = 0; _i < inner.Length; _i++) {
            if (inner[_i] == '[') {
                int _end = inner.IndexOf(']', _i);
                string _arr = inner.Substring(_i + 1, _end - _i - 1);
                var _nbs = new System.Collections.Generic.List<int>();
                if (_arr.Length > 0) {
                    foreach (var s in _arr.Split(','))
                        _nbs.Add(int.Parse(s.Trim()));
                }
                adj.Add(_nbs);
                _i = _end;
            }
        }
        if (adj.Count == 0) return null;
        var _nodes = new System.Collections.Generic.List<Node>();
        for (int _i = 0; _i < adj.Count; _i++)
            _nodes.Add(new Node(_i + 1));
        for (int _i = 0; _i < adj.Count; _i++)
            foreach (int _nb in adj[_i])
                if (_nb >= 1 && _nb <= _nodes.Count)
                    _nodes[_i].neighbors.Add(_nodes[_nb - 1]);
        return _nodes.Count == 0 ? null : _nodes[0];
    }

    static string GraphToJson(Node node) {
        if (node == null) return "[]";
        var _seen = new System.Collections.Generic.HashSet<Node>();
        var _q = new System.Collections.Generic.Queue<Node>();
        _q.Enqueue(node);
        _seen.Add(node);
        var _allNodes = new System.Collections.Generic.List<Node>();
        while (_q.Count > 0) {
            Node _cur = _q.Dequeue();
            _allNodes.Add(_cur);
            foreach (Node _nb in _cur.neighbors) {
                if (!_seen.Contains(_nb)) {
                    _seen.Add(_nb);
                    _q.Enqueue(_nb);
                }
            }
        }
        _allNodes = _allNodes.OrderBy(n => n.val).ToList();
        var _res = new System.Text.StringBuilder("[");
        for (int _i = 0; _i < _allNodes.Count; _i++) {
            if (_i > 0) _res.Append(",");
            _res.Append("[");
            var _nbVals = new System.Collections.Generic.List<int>();
            foreach (Node _nb in _allNodes[_i].neighbors) _nbVals.Add(_nb.val);
            _nbVals.Sort();
            for (int _j = 0; _j < _nbVals.Count; _j++) {
                if (_j > 0) _res.Append(",");
                _res.Append(_nbVals[_j]);
            }
            _res.Append("]");
        }
        _res.Append("]");
        return _res.ToString();
    }
`;

function needsGraphCode(code: string): boolean {
  return code.includes('class Node') && code.includes('neighbors');
}

function isPointerType(type: string): boolean {
  const t = type.trim();
  if (t.endsWith('*') && t !== 'int*' && t !== 'char*' && t !== 'byte*' && t !== 'long*') return true;
  return ['ListNode', 'TreeNode'].some(n => t === n || t.startsWith(n + '<') || t.startsWith(n + ' '));
}

function needsGraphHelper(sig: MethodSignature | null): boolean {
    if (!sig) return false;
    if (isPointerType(sig.returnType)) return true;
    return sig.params.some(p => isPointerType(p.type));
}

function generateCppWrapper(userCode: string, testCases: TestCase[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'solve';
  const isVoid = sig?.returnType === 'void';
  const usesGraph = needsGraphHelper(sig);

  const testCode: string[] = [];
  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];

    const varDecls: string[] = [];
    const callArgs: string[] = [];
    if (sig) {
      sig.params.forEach((p, j) => {
        const hasArg = j < tc.args.length;
        const val = hasArg ? tc.args[j] : '';
        if (!hasArg) {
          callArgs.push('{}');
          return;
        }
        const isGraphPtr = isPointerType(p.type) && val.startsWith('[');
        const expr = isGraphPtr ? `buildGraph(${JSON.stringify(val)})` : cppArgExpr(val, p.type);
        const norm = normalizedType(p.type);
        if (isGraphPtr || norm.startsWith('vector<') || norm === 'string' || norm === 'std::string') {
          const vn = `_arg${i}_${j}`;
          varDecls.push(`        auto ${vn} = ${expr};`);
          callArgs.push(vn);
        } else {
          callArgs.push(expr);
        }
      });
    } else {
      tc.args.forEach(a => callArgs.push(a));
    }

    const args = callArgs.join(', ');
    const escapedExpected = tc.expected.replace(/"/g, '\\"');

    testCode.push('    // Test ' + (i + 1));
    testCode.push('    try {');
    if (varDecls.length) testCode.push(varDecls.join('\n'));
    if (isVoid) {
      testCode.push('        ' + methodName + '(' + args + ');');
      testCode.push(`        string actual${i}Str = "(void)";`);
    } else if (usesGraph) {
      testCode.push(`        auto result${i} = ${methodName}(${args});`);
      testCode.push(`        string actual${i}Str = graphToJson(result${i});`);
    } else if (args) {
      testCode.push(`        auto result${i} = ${methodName}(${args});`);
      testCode.push(`        string actual${i}Str = "[";`);
    } else {
      testCode.push(`        ${methodName}();`);
      testCode.push(`        string actual${i}Str = "(void)";`);
    }
    testCode.push(`        string expected${i}Str = "${escapedExpected}";`);
    testCode.push(`        bool passed${i} = (actual${i}Str == expected${i}Str);`);
    testCode.push(`        cout << "__TEST_RESULTS__" << endl;`);
    testCode.push(`        cout << "[{\\"index\\":" << ${i + 1} << ",\\"passed\\":" << (passed${i} ? "true" : "false") << ",\\"expected\\":\\"" << expected${i}Str << "\\",\\"actual\\":\\"" << actual${i}Str << "\\"}]" << endl;`);
    testCode.push(`        cout << "__DONE__" << endl;`);
    testCode.push('    } catch (...) {');
    testCode.push(`        cout << "__TEST_RESULTS__" << endl;`);
    testCode.push(`        cout << "[{\\"index\\":" << ${i + 1} << ",\\"passed\\":false,\\"expected\\":\\"${escapedExpected}\\",\\"actual\\":\\"exception\\"}]" << endl;`);
    testCode.push(`        cout << "__DONE__" << endl;`);
    testCode.push('        return 0;');
    testCode.push('    }');
  }

  return '#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\nusing namespace std;\n\n' +
    userCode.trimEnd() +
    (usesGraph ? CPP_GRAPH_HELPERS : '') + '\n\nint main() {\n' +
    testCode.join('\n') + '\n    return 0;\n}\n';
}

export function canAutoGenerateTests(code: string, language: Language): boolean {
  if (language === 'python' || language === 'typescript') return true;
  const sig = parseSignature(code);
  if (!sig) return false;
  return !sig.params.some(p => {
    if (!isPointerType(p.type)) return false;
    const t = normalizedType(p.type);
    return t !== 'Node';
  });
}
