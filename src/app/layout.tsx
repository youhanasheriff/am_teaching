import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AM Teachings | English & IELTS Excellence with Aya Mohsen",
  description: "Learn English and excel in IELTS with personalized lessons from Aya Mohsen. Modern, effective teaching for all levels - beginner to advanced.",
  keywords: "English lessons, IELTS preparation, online English tutor, Aya Mohsen, English learning",
  authors: [{ name: "Aya Mohsen" }],
  creator: "AM Teachings",
  publisher: "AM Teachings",
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "AM Teachings | English & IELTS Excellence",
    description: "Learn English and excel in IELTS with personalized lessons from Aya Mohsen.",
    url: process.env.SITE_URL || 'http://localhost:3000',
    siteName: "AM Teachings",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AM Teachings | English & IELTS Excellence",
    description: "Learn English and excel in IELTS with personalized lessons from Aya Mohsen.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
