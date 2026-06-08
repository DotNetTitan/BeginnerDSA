import { NextResponse } from 'next/server';
import { getCompilerId, extractTestResults } from '@/lib/compiler-map';

const API_URL = 'https://api.onlinecompiler.io/api/run-code-sync/';

interface RunCodeBody {
  language: string;
  code: string;
}

export async function POST(request: Request) {
  const body: RunCodeBody = await request.json();

  if (!body.language || !body.code) {
    return NextResponse.json({ error: 'Missing required fields: language, code' }, { status: 400 });
  }

  const apiKey = process.env.ONLINECOMPILER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Code execution not configured' }, { status: 500 });
  }

  if (body.code.length > 100_000) {
    return NextResponse.json({ error: 'Code exceeds maximum length (100KB)' }, { status: 400 });
  }

  const compiler = getCompilerId(body.language as any);
  if (!compiler) {
    return NextResponse.json({ error: `Unsupported language: ${body.language}` }, { status: 400 });
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      compiler,
      code: body.code,
      input: '',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('OnlineCompiler API error:', res.status, err);
    return NextResponse.json({ error: 'Execution service error' }, { status: 502 });
  }

  const data = await res.json();

  const output: string = data.output ?? '';
  let error: string = data.error ?? '';

  let parsed = extractTestResults(output);
  if (!parsed && error) {
    parsed = extractTestResults(error);
  }

  const exitCode = data.exit_code ?? 1;
  const time = data.time ?? '0';
  const memory = data.memory ?? '0';

  if (error === 'Internal error: code execution failed' && time === '0' && memory === '0') {
    const hints: Record<string, string> = {
      'dotnet-csharp-9': 'Compilation error — check for syntax errors in your code.',
      'python-3.14': 'Syntax error — check for missing brackets, colons, or indentation issues.',
      'openjdk-25': 'Compilation error — check for syntax errors in your code.',
      'typescript-deno': 'Syntax error — check for missing brackets or other syntax issues.',
      'g++-15': 'Compilation error — check for syntax errors in your code.',
    };
    error = hints[compiler] ?? error;
  }

  return NextResponse.json({
    output: parsed?.cleanOutput ?? output,
    error,
    exitCode,
    status: data.status ?? 'error',
    time,
    memory,
    signal: data.signal ?? null,
    testResults: parsed?.testResults ?? null,
  });
}
