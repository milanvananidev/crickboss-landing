import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrickBoss | Coming Soon",
  description:
    "CrickBoss is coming soon to crickboss.in. The smartest way to score cricket matches."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
