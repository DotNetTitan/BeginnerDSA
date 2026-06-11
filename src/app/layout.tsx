import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Zero To DSA",
  description: "Learn Data Structures & Algorithms from zero. Structured modules and practice problems for absolute beginners.",
  metadataBase: new URL("https://zerotodsa.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Zero To DSA",
    description: "Structured modules and coding challenges with support for Python, Java, C++, TypeScript, and C#.",
    url: "https://zerotodsa.com",
    siteName: "Zero To DSA",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: "Zero To DSA",
    description: "Structured modules and coding challenges with support for Python, Java, C++, TypeScript, and C#.",
    images: ["/logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const language = cookieStore.get('dsa-language')?.value;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans">
        <Providers language={language}>{children}</Providers>
        <footer className="mt-auto py-4 text-center text-xs text-muted-foreground space-x-3">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <span>·</span>
          <a href="/faq" className="hover:underline">FAQ</a>
          <span>·</span>
          <a href="/report-bug" className="hover:underline">Report a Bug</a>
          <span>·</span>
          <a href="https://ko-fi.com/zerotodsa" target="_blank" rel="noopener noreferrer" className="hover:underline">Support on Ko‑fi</a>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
