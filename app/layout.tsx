import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></Script>
      <Script src="/test.js" type="text/javascript"></Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
