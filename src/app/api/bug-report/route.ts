import { NextResponse } from 'next/server';

interface BugReportBody {
  type: string;
  module: string;
  problem: string;
  description: string;
  email: string;
  turnstileToken: string;
}

export async function POST(request: Request) {
  const body: BugReportBody = await request.json();

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: 'Server not configured for bug reports' }, { status: 500 });
  }

  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: body.turnstileToken }),
  });
  const verifyData = await verify.json();

  if (!verifyData.success) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Server not configured for bug reports' }, { status: 500 });
  }

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
