'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consented = document.cookie.split('; ').find(r => r.startsWith('dsa-consent='));
    if (!consented) {
      const id = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(id);
    }
  }, []);

  const accept = () => {
    document.cookie = 'dsa-consent=accepted;path=/;max-age=31536000';
    setVisible(false);
  };

  const decline = () => {
    document.cookie = 'dsa-consent=declined;path=/;max-age=31536000';
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-[toast-up_0.3s_ease-out]">
      <div className="rounded-xl border bg-background p-4 shadow-xl">
        <p className="text-sm text-muted-foreground mb-3">
          This site uses a cookie to remember your preferred programming language. No tracking or analytics cookies are used.{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
            Learn more
          </a>.
        </p>
        <div className="flex items-center gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={decline}>
            Decline
          </Button>
          <Button variant="default" size="sm" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}