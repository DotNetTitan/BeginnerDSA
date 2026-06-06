import { NextResponse } from 'next/server';

interface BugReportBody {
  type: string;
  module: string;
  problem: string;
  description: string;
  email: string;
}

export async function POST(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Server not configured for bug reports' }, { status: 500 });
  }

  const body: BugReportBody = await request.json();

  const labels = [body.type || 'bug'];
  if (body.module) labels.push(`module: ${body.module}`);

  const title = `[${body.type}] ${body.module}${body.problem ? ` / ${body.problem}` : ''}`;

  const issueBody = [
    body.description,
    '',
    '---',
    `**Type:** ${body.type}`,
    `**Module:** ${body.module}`,
    body.problem ? `**Problem:** ${body.problem}` : '',
    body.email ? `**Contact:** ${body.email}` : '',
    '',
    `*Submitted via in-app bug report*`,
  ].filter(Boolean).join('\n');

  const res = await fetch('https://api.github.com/repos/DotNetTitan/BeginnerDSA/issues', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'ZeroToDSA',
    },
    body: JSON.stringify({ title, body: issueBody, labels }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('GitHub API error:', res.status, err);
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
