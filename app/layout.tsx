import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrickBoss | Professional Cricket Scoring & Match Management",
  description:
    "CrickBoss is the smartest way to score cricket matches. Built for players, captains, and leagues who want faster scoring, cleaner stats, and a professional match-day workflow.",
  keywords: ["cricket scoring app", "live cricket scoreboard", "match management", "cricket league manager", "crickboss"],
  authors: [{ name: "CrickBoss Team" }],
  metadataBase: new URL("https://crickboss.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CrickBoss | Professional Cricket Scoring App",
    description: "The smartest way to score cricket matches and manage leagues.",
    url: "https://crickboss.in",
    siteName: "CrickBoss",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CrickBoss - The Smartest Way to Score Cricket matches and manage leagues.",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrickBoss | Professional Cricket Scoring App",
    description: "The smartest way to score cricket matches and manage leagues.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
