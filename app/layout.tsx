// Root layout - Wraps entire app with providers (Auth, Socket) and global styles
import type { Metadata } from "next";

import "./globals.css";
import { AuthProvider } from "./Context/Auth.context";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./Context/Socket.context";

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
      <body>
        <AuthProvider>
          <SocketProvider>{children}</SocketProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
