import type { Metadata } from "next";
import "./globals.css";
import { Reddit_Sans } from "next/font/google";
import { ModalProvider } from "./contexts/ModalContext";
import { LogProvider } from "./contexts/LogContext";

export const metadata: Metadata = {
  title: "Mood-Tracking",
  description: "Track your daily mood and sleep with ease.",
};

const redditSans = Reddit_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redditSans.className} light-gradient min-h-dvh antialiased`}
      >
        <LogProvider>
          <ModalProvider>{children}</ModalProvider>
        </LogProvider>
      </body>
    </html>
  );
}
