import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "HFinTech – Your Smart Guide to Personal Finance & Crypto",
    template: "%s | HFinTech",
  },
  description:
    "Free financial calculators, live crypto prices, stock screener, credit card comparisons, insurance guides, and expert personal finance articles.",
  keywords: [
    "personal finance",
    "crypto tracker",
    "stock screener",
    "financial calculators",
    "credit cards",
    "insurance",
    "mortgage calculator",
    "EMI calculator",
    "SIP calculator",
    "bitcoin",
  ],
  authors: [{ name: "HFinTech" }],
  creator: "HFinTech",
  metadataBase: new URL("https://hfintech.com"),
  openGraph: {
    title: "HFinTech – Smart Finance Tools",
    description: "Free financial calculators, crypto tracker, stock screener, and expert finance guides.",
    url: "https://hfintech.com",
    siteName: "HFinTech",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HFinTech – Smart Finance Tools",
    description: "Free financial calculators, crypto tracker, and expert finance guides.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
