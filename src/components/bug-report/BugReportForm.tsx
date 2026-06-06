'use client';

import { useState, useEffect } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { Button } from '@/components/ui/button';
import { topics } from '@/lib/topics';
import { getProblems } from '@/lib/problems';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function BugReportForm() {
  const [type, setType] = useState('bug');
  const [module, setModule] = useState('');
  const [problem, setProblem] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [problems, setProblems] = useState<{ id: string; title: string }[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      if (module) {
        try {
          setProblems(getProblems(module));
        } catch {
          setProblems([]);
        }
      } else {
        setProblems([]);
      }
      setProblem('');
    });
  }, [module]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const res = await fetch('/api/bug-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, module, problem, description, email, turnstileToken }),
    });

    if (res.ok) {
      setStatus('success');
      setType('bug');
      setModule('');
      setProblem('');
      setDescription('');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <p className="text-lg font-semibold">Thank you!</p>
        <p className="text-sm text-muted-foreground mt-1">Your report has been submitted.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-sm font-medium">Issue Type</label>
        <div className="flex gap-4 mt-1">
          {['bug', 'feature', 'other'].map(t => (
            <label key={t} className="flex items-center gap-1.5 text-sm cursor-pointer">
              <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="accent-primary" />
              {t === 'bug' ? 'Bug Report' : t === 'feature' ? 'Feature Request' : 'Other'}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="module" className="text-sm font-medium">Module</label>
        <select
          id="module"
          value={module}
          onChange={e => setModule(e.target.value)}
          className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
        >
          <option value="">Select a module</option>
          {topics.map(t => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
      </div>

      {problems.length > 0 && (
        <div>
          <label htmlFor="problem" className="text-sm font-medium">Problem</label>
          <select
            id="problem"
            value={problem}
            onChange={e => setProblem(e.target.value)}
            className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
          >
            <option value="">Select a problem</option>
            {problems.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={5}
          required
          placeholder="Describe the issue in detail..."
          className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm resize-y"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email <span className="text-muted-foreground font-normal">(optional - if you&apos;d like a follow-up)</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
        />
      </div>

      <div>
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={setTurnstileToken}
          options={{ theme: 'auto' }}
        />
      </div>

      {turnstileToken && (
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting...' : 'Submit Report'}
        </Button>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again later.</p>
      )}
    </form>
  );
}
