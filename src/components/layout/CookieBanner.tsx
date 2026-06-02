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
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-[toast-up_0.3s_ease-out]">
      <div className="rounded-xl border bg-background p-4 shadow-xl">
        <p className="text-sm text-muted-foreground mb-3">
          This site uses a cookie to remember your preferred programming language. No tracking or analytics cookies are used.
        </p>
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={decline}
            className="text-sm px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground font-medium"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm px-3 py-1.5 rounded-lg bg-foreground text-background font-semibold hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}