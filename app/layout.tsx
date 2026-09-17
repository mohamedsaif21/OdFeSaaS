import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import logo from "./assest/odfe-logo.png";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  // If your Next version errors on an axis, remove it — the design degrades gracefully.
  axes: ["SOFT", "WONK"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OdFe — Run Your Café. Own Every Order.",
  description:
    "OdFe is a modern café POS platform that brings orders, payments, inventory, customers and the kitchen together in one workspace.",
  icons: {
    icon: logo.src,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}