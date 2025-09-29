import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AM Teachings | English & IELTS Excellence with Aya Mohsen',
  description:
    'Learn General English, Spoken English, and IELTS preparation with licensed teacher Aya Mohsen. American Diploma holder with IELTS 8.0 score and TEFL Training Certification.',
  keywords:
    'English lessons, IELTS preparation, General English, Spoken English, Aya Mohsen, American Diploma, TEFL Training, licensed teacher',
  authors: [{ name: 'Aya Mohsen' }],
  creator: 'AM Teachings',
  publisher: 'AM Teachings',
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'AM Teachings | English & IELTS Excellence',
    description:
      'Learn General English, Spoken English, and IELTS preparation with licensed teacher Aya Mohsen. American Diploma holder with IELTS 8.0 score.',
    url: process.env.SITE_URL || 'http://localhost:3000',
    siteName: 'AM Teachings',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AM Teachings - English & IELTS Excellence',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AM Teachings | English & IELTS Excellence with Aya Mohsen',
    description:
      'Learn General English, Spoken English, and IELTS preparation with licensed teacher Aya Mohsen.',
    images: ['/og-image.jpg'],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="pt-4">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
