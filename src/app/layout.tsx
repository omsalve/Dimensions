"use client"; 

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import LightRays from "@/components/LightRays"; // Import the new LightRays component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <div className="fixed inset-0 -z-10 bg-black">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffffff" // Changed to a color that matches your theme
            raysSpeed={1.5}
            lightSpread={2}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.5}
            noiseAmount={0.05}
            distortion={0.05}
          />
        </div>
        
        <Header />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}