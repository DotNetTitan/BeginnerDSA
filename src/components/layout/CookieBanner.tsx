'use client';

import { useState, useEffect } from 'react';

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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg">
      <div className="mx-auto max-w-3xl flex items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          This site uses a cookie to remember your preferred programming language. No tracking or analytics cookies are used.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-sm px-4 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground font-medium"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm px-4 py-2 rounded-md bg-foreground text-background font-semibold hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}