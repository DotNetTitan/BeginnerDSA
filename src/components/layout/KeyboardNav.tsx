'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KeyboardNav({
  prevHref,
  nextHref,
}: {
  prevHref?: string;
  nextHref?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'TEXTAREA' || target.tagName === 'INPUT' || target.closest('button') || target.closest('a')) return;

      if (e.key === 'ArrowLeft' && prevHref) {
        e.preventDefault();
        router.push(prevHref);
      }
      if (e.key === 'ArrowRight' && nextHref) {
        e.preventDefault();
        router.push(nextHref);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevHref, nextHref, router]);

  return null;
}
