"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import { usePathname } from "next/navigation";
import { metadata } from "./metadata";

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

export default function RootLayout({ children }) {
  const pathName = usePathname();
  const hideNavAndFooter = pathName.startsWith("/dashboard");

  return (
    <html lang="en" data-theme="light">
      <head>
        <title>{`${metadata.title}`}</title>
        <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
        <meta name="description" content={`${metadata.description}`} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  dark:bg-background bg-base-100`}
      >
        {!hideNavAndFooter && <Navbar />}
        {children}
        {!hideNavAndFooter && <Footer />}
      </body>
    </html>
  );
}
