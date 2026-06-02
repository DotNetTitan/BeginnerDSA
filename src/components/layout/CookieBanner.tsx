'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consented = document.cookie.split('; ').find(r => r.startsWith('dsa-consent='));
    if (!consented) setVisible(true);
  }, []);

  const accept = () => {
    document.cookie = 'dsa-consent=accepted;path=/;max-age=31536000';
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg">
      <div className="mx-auto max-w-3xl flex items-start gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          This site uses a cookie to remember your preferred programming language. No tracking or analytics cookies are used.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={accept}
            className="text-sm px-3 py-1.5 rounded-md bg-foreground text-background font-medium hover:opacity-90"
          >
            Got it
          </button>
          <button onClick={accept} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}