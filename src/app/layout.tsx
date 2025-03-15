import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { mileins } from "./fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Camilo Giraldo",
  description: "People, Places, Things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mileins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
