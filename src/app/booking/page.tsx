import type { Metadata } from 'next';
import BookingPageClient from './BookingPageClient';

export const metadata: Metadata = {
  title:
    'Book a Lesson | AM Teachings - Schedule Your English Learning Session',
  description:
    'Book your personalized English lesson or IELTS preparation session with Aya Mohsen. Choose from individual or group lessons with flexible scheduling.',
  keywords:
    'book English lesson, schedule IELTS preparation, online English tutor booking, English lesson appointment',
  openGraph: {
    title: 'Book a Lesson | AM Teachings',
    description:
      'Schedule your personalized English learning session with expert teacher Aya Mohsen.',
    type: 'website',
    url: 'https://amteachings.com/booking',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Lesson | AM Teachings',
    description:
      'Schedule your personalized English learning session with expert teacher Aya Mohsen.',
  },
};

export default function BookingPage() {
  return <BookingPageClient />;
}
