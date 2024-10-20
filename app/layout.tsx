import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";

import "./globals.css";

import Navbar from "@/components/navbar";
import { Sheet } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Chatbot",
  description: "Made with Nextjs",
};

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sheet>
            <Suspense fallback={<p>meh</p>}>
              <Sidebar />
            </Suspense>
            <Navbar />
            {children}
          </Sheet>
        </ThemeProvider>
      </body>
    </html>
  );
}
