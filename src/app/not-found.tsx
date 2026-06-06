import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Not Found - Zero To DSA',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <span className="text-6xl">🔍</span>
      <h1 className="text-2xl font-bold">Not Found</h1>
      <p className="text-muted-foreground text-sm">The page you are looking for does not exist.</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
