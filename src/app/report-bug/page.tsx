import type { Metadata } from 'next';
import BugReportForm from '@/components/bug-report/BugReportForm';

export const metadata: Metadata = {
  title: 'Report a Bug - Zero To DSA',
};

export default function ReportBugPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-1">Report a Bug</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Found something broken? Let us know and we&apos;ll fix it.
      </p>
      <BugReportForm />
    </div>
  );
}
