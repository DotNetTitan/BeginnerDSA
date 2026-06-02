import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Zero To DSA",
  description: "Learn DSA from zero. Structured modules and coding challenges for absolute beginners.",
  metadataBase: new URL("https://zerotodsa.online"),
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
    description: "Structured modules and coding challenges with support for Python, Java, C++, JavaScript, and C#.",
    url: "https://zerotodsa.online",
    siteName: "Zero To DSA",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: "Zero To DSA",
    description: "Structured modules and coding challenges with support for Python, Java, C++, JavaScript, and C#.",
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
      </body>
    </html>
  );
}
