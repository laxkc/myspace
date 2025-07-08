import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserLayoutClient from "./UserLayoutClient";
import QueryProvider from "@/providers/QueryProvider";
import { HeaderActiveTabProvider } from "@/contexts/HeaderActiveTabContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laxman KC",
  description: "Laxman KC's personal website..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <QueryProvider>
          <HeaderActiveTabProvider>
            <UserLayoutClient>{children}</UserLayoutClient>
          </HeaderActiveTabProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
