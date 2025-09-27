import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'AM Teachings | English & IELTS Excellence with Aya Mohsen',
  description: 'Master English and excel in IELTS with personalized lessons from expert teacher Aya Mohsen. Join 500+ successful students with 95% IELTS success rate.',
  keywords: 'English lessons, IELTS preparation, online English tutor, Aya Mohsen, English learning, IELTS coaching, English teacher',
  openGraph: {
    title: 'AM Teachings | English & IELTS Excellence with Aya Mohsen',
    description: 'Master English and excel in IELTS with personalized lessons from expert teacher Aya Mohsen. Join 500+ successful students with 95% IELTS success rate.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AM Teachings - English & IELTS Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AM Teachings | English & IELTS Excellence with Aya Mohsen',
    description: 'Master English and excel in IELTS with personalized lessons from expert teacher Aya Mohsen.',
    images: ['/og-image.jpg'],
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "AM Teachings",
    "description": "Expert English and IELTS preparation with personalized lessons from Aya Mohsen",
    "url": process.env.SITE_URL || "https://amteachings.com",
    "logo": `${process.env.SITE_URL || "https://amteachings.com"}/logo.png`,
    "founder": {
      "@type": "Person",
      "name": "Aya Mohsen",
      "jobTitle": "English Teacher & IELTS Specialist",
      "description": "Certified English teacher with 8+ years of experience"
    },
    "offers": [
      {
        "@type": "Service",
        "name": "English Lessons",
        "description": "Personalized English lessons for all levels",
        "provider": {
          "@type": "Person",
          "name": "Aya Mohsen"
        }
      },
      {
        "@type": "Service", 
        "name": "IELTS Preparation",
        "description": "Comprehensive IELTS preparation with 95% success rate",
        "provider": {
          "@type": "Person",
          "name": "Aya Mohsen"
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "500",
      "bestRating": "5"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "customer service",
      "email": "aya@amteachings.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient />
    </>
  );
}
