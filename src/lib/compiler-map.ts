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

export function isLanguageSupported(_language: Language): true | string {
  return true;
}

interface MethodSignature {
  methodName: string;
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
    return { methodName, params };
  }

  const sigMatch = code.match(
    /(?:public\s+|private\s+|protected\s+)?(\S+(?:\s*<[^>]+>)?(?:\[\])?)\s+(\w+)\s*\(([^)]*)\)/
  );
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

  return { methodName, params };
}

function isSimpleType(t: string): boolean {
  return ['int', 'bool', 'string', 'long', 'double', 'float', 'char'].includes(t);
}

function isIntArray(t: string): boolean {
  return t === 'int[]';
}

function isVoid(t: string): boolean {
  return t === 'void';
}

function isStringArray(t: string): boolean {
  return t === 'string[]';
}

function is2DIntArray(t: string): boolean {
  return t === 'int[][]';
}

function is2DCharArray(t: string): boolean {
  return t === 'char[][]';
}

function isGenericList(t: string): boolean {
  return t.startsWith('IList<') || t.startsWith('IList<');
}

function csharpArgExpr(value: string, type: string): string {
  if (type === 'int') return value;
  if (type === 'string') return `"${value}"`;
  if (type === 'bool') return value.toLowerCase();
  if (type === 'int[]' || type === 'int []') {
    if (value === '[]' || value === '') return 'new int[0]';
    const nums = value.replace(/^\[|\]$/g, '').split(',').map(s => s.trim()).join(', ');
    return `new int[] { ${nums} }`;
  }
  return value;
}

function javaArgExpr(value: string, type: string): string {
  if (type === 'int') return value;
  if (type === 'String' || type === 'string') return `"${value}"`;
  if (type === 'boolean' || type === 'bool') return value.toLowerCase();
  if (type === 'int[]' || type === 'int []') {
    if (value === '[]' || value === '') return 'new int[0]';
    const nums = value.replace(/^\[|\]$/g, '').split(',').map(s => s.trim()).join(', ');
    return `new int[] { ${nums} }`;
  }
  return value;
}

function cppArgExpr(value: string, type: string): string {
  if (type === 'int') return value;
  if (type === 'string' || type === 'std::string') return `"${value}"`;
  if (type === 'bool') return value.toLowerCase();
  if (type === 'int[]' || type.includes('vector<int>')) {
    if (value === '[]' || value === '') return 'vector<int>()';
    const nums = value.replace(/^\[|\]$/g, '').split(',').map(s => s.trim()).join(', ');
    return `vector<int>{${nums}}`;
  }
  return value;
}

function generateCSharpWrapper(userCode: string, testCases: TestCase[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'Solve';
  const isVoid = sig ? (() => {
    const m = userCode.match(
      /(?:public\s+|private\s+|protected\s+)?void\s+\w+\s*\(/
    );
    return !!m;
  })() : false;

  const lines: string[] = [];
  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const args = tc.args.map((v, j) => {
      const t = sig?.params[j]?.type ?? 'int';
      return csharpArgExpr(v, t);
    }).join(', ');
    const exp = tc.expected;
    const n = i + 1;

    function addLine(passExpr: string, actualExpr: string) {
      lines.push(`            items.Add("{\\"index\\":${n},\\"passed\\":" + ${passExpr} + ",\\"expected\\":\\"${exp}\\",\\"actual\\":\\"" + ${actualExpr} + "\\"}");`);
    }

    lines.push('        try {');
    if (isVoid) {
      lines.push('            s.' + methodName + '(' + args + ');');
      addLine('true', '"(void)"');
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

  return 'using System;\nusing System.Linq;\nusing System.Collections.Generic;\n\npublic class Solution {\n' +
    indentedCode + '\n\n' +
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

  const testCasesJson = testCases.map(tc =>
    `        {"args": ${JSON.stringify(tc.args)}, "expected": ${JSON.stringify(tc.expected)}}`
  ).join(',\n');

  const callExpr = hasClass ? `s.${methodName}(*parsed_args)` : `${methodName}(*parsed_args)`;
  const instanceLine = hasClass ? '    s = Solution()' : '';

  return `import sys
import json

${userCode.trimEnd()}

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
            actual = ${callExpr}
            actual_str = json.dumps(actual) if not isinstance(actual, str) else actual
            passed = actual_str == tc["expected"]
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

  const testCode: string[] = [];
  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const args = tc.args.map((v, j) => {
      const t = sig?.params[j]?.type ?? 'int';
      return javaArgExpr(v, t);
    }).join(', ');
    const escapedExpected = tc.expected.replace(/"/g, '\\"');

    testCode.push(`            // Test ${i + 1}`);
    testCode.push(`            try {`);
    if (args) {
      testCode.push(`                var result${i} = s.${methodName}(${args});`);
    } else {
      testCode.push(`                s.${methodName}();`);
    }
    testCode.push(`                String actual${i}Str = Objects.toString(result${i});`);
    testCode.push(`                boolean pass${i} = actual${i}Str.equals("${escapedExpected}");`);
    testCode.push(`                json.add("{\\"index\\":" + ${i + 1} + ",\\"passed\\":" + pass${i} + ",\\"expected\\":\\"${escapedExpected}\\",\\"actual\\":\\"" + actual${i}Str + "\\"}");`);
    testCode.push(`                if (!pass${i}) allPassed = false;`);
    testCode.push(`            } catch (Exception e) {`);
    testCode.push(`                json.add("{\\"index\\":" + ${i + 1} + ",\\"passed\\":false,\\"expected\\":\\"${escapedExpected}\\",\\"actual\\":\\"" + e.getMessage() + "\\"}");`);
    testCode.push(`                allPassed = false;`);
    testCode.push(`            }`);
  }

  return `import java.util.*;

public class Solution {
${userCode.trimEnd().split('\n').map(line => '    ' + line).join('\n')}

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

function generateCppWrapper(userCode: string, testCases: TestCase[]): string {
  const sig = parseSignature(userCode);
  const methodName = sig?.methodName ?? 'solve';

  const testCode: string[] = [];
  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const args = tc.args.map((v, j) => {
      const t = sig?.params[j]?.type ?? 'int';
      return cppArgExpr(v, t);
    }).join(', ');
    const escapedExpected = tc.expected.replace(/"/g, '\\"');

    testCode.push('    // Test ' + (i + 1));
    testCode.push('    try {');
    if (args) {
      testCode.push('        auto result' + i + ' = ' + methodName + '(' + args + ');');
    } else {
      testCode.push('        ' + methodName + '();');
    }
    testCode.push('        string actual' + i + 'Str = "[";');
    testCode.push('        cout << "__TEST_RESULTS__" << endl;');
    testCode.push('        cout << "[{\\"index\\":" << ' + (i + 1) + ' << ",\\"passed\\":true,\\"expected\\":\\"' + escapedExpected + '\\",\\"actual\\":\\"" << actual' + i + 'Str << "\\"}]" << endl;');
    testCode.push('        cout << "__DONE__" << endl;');
    testCode.push('    } catch (...) {');
    testCode.push('        cout << "__TEST_RESULTS__" << endl;');
    testCode.push('        cout << "[{\\"index\\":" << ' + (i + 1) + ' << ",\\"passed\\":false,\\"expected\\":\\"' + escapedExpected + '\\",\\"actual\\":\\"exception\\"}]" << endl;');
    testCode.push('        cout << "__DONE__" << endl;');
    testCode.push('        return 0;');
    testCode.push('    }');
  }

  return '#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\nusing namespace std;\n\n' +
    userCode.trimEnd() + '\n\nint main() {\n' +
    testCode.join('\n') + '\n    return 0;\n}\n';
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

  const argExprs = sig
    ? sig.params.map((p, i) => {
        const val = i < runArgs.length ? runArgs[i] : '0';
        return runtimeArgExpr('csharp', val, p.type);
      }).join(', ')
    : runArgs.join(', ');

  return `using System;
using System.Linq;
using System.Collections.Generic;

public class Solution {
${userCode.trimEnd().split('\n').map(line => '    ' + line).join('\n')}

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

  const argStr = runArgs.join(', ');
  const setupLine = hasClass ? '        s = Solution()' : '';
  const callExpr = hasClass ? `s.${methodName}(${argStr})` : `${methodName}(${argStr})`;

  return `import sys

${userCode.trimEnd()}

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

  const argExprs = sig
    ? sig.params.map((p, i) => {
        const val = i < runArgs.length ? runArgs[i] : '0';
        return runtimeArgExpr('java', val, p.type);
      }).join(', ')
    : runArgs.join(', ');

  return `import java.util.*;

public class Solution {
${userCode.trimEnd().split('\n').map(line => '    ' + line).join('\n')}

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

  const argExprs = sig
    ? sig.params.map((p, i) => {
        const val = i < runArgs.length ? runArgs[i] : '0';
        return runtimeArgExpr('cpp', val, p.type);
      }).join(', ')
    : runArgs.join(', ');

  return `#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <exception>
using namespace std;

${userCode.trimEnd()}

int main() {
    try {
        ${methodName}(${argExprs});
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
