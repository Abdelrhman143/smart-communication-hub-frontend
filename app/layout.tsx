import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "smart communication hub",
  description:
    "Experience the future of communication with real-time chat enhanced by AI-powered sentiment analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
