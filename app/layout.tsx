"use client";

import { initRelayEnvironment } from "@/src/RelayEnvironment";
import { Geist, Geist_Mono } from "next/font/google";
import { RelayEnvironmentProvider } from "react-relay";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const env = initRelayEnvironment();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RelayEnvironmentProvider environment={env}>
          {children}
        </RelayEnvironmentProvider>
      </body>
    </html>
  );
}
