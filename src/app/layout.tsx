import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { mileins } from "./fonts";
import "./globals.css";
import Header from "@/components/layout/Header";
import TimeLocation from "@/components/layout/TimeLocation";
import SpotifyDisplay from "@/components/layout/SpotifyDisplay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Camilo Giraldo - Portfolio",
  description: "Designer & Developer - UX Design, 3D & Motion, Coding, Analog Explorations",
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
        <Header />
        <TimeLocation />
        <SpotifyDisplay />
        {children}
      </body>
    </html>
  );
}
