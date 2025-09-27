import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Aya Mohsen | AM Teachings - Expert English & IELTS Teacher',
  description: 'Meet Aya Mohsen, certified English teacher and IELTS specialist with 8+ years of experience helping students achieve their language goals.',
  keywords: 'Aya Mohsen, English teacher, IELTS specialist, English tutor, language learning',
};

export default function AboutPage() {
  return <AboutPageClient />;
}