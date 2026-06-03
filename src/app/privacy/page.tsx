import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: June 2, 2026</p>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Data We Collect</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Zero To DSA does not collect, store, or share any personal data. All
          learning progress is stored locally in your browser using
          localStorage and is never sent to any server.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Cookies</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We set a single cookie (<code className="bg-muted px-1 rounded text-foreground">dsa-language</code>) only if you
          explicitly accept the cookie consent banner. This cookie remembers
          your preferred programming language across sessions. You can decline
          cookies and still use the site fully - you will simply need to
          select your language each visit.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Third-Party Services</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This site is hosted on{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-foreground">
            Vercel
          </a>
          . Vercel may collect standard server logs (IP address, request
          timing, browser user-agent) as part of their hosting service. We do
          not have access to these logs and do not use any analytics, tracking,
          or advertising services.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Your Rights</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          To clear all data stored by this site, you may:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Clear your browser&apos;s cookies and localStorage for this domain, or</li>
          <li>
            Use the <strong className="text-foreground font-medium">Reset</strong> button on the{" "}
            <Link href="/progress" className="text-primary underline underline-offset-2 hover:text-foreground">Progress</Link> page.
          </li>
        </ul>
      </section>

    </div>
  );
}
