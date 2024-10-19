import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Sheet } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-woodsmoke text-iron`}
      >
        <Sheet>
          <Suspense fallback={<p>meh</p>}>
            <Sidebar />
          </Suspense>
          <Navbar />
          {children}
        </Sheet>
      </body>
    </html>
  );
}
