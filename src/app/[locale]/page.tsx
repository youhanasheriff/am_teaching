import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "AM Teachings | English & IELTS Excellence with Aya Mohsen",
  description:
    "Learn General English, Spoken English, and IELTS preparation with Aya Mohsen. American Diploma holder with IELTS 8.0 score and TEFL Training Certification.",
  keywords:
    "English lessons, IELTS preparation, General English, Spoken English, Aya Mohsen, American Diploma, TEFL Training, English teacher",
  openGraph: {
    title: "AM Teachings | English & IELTS Excellence with Aya Mohsen",
    description:
      "Learn General English, Spoken English, and IELTS preparation with Aya Mohsen. American Diploma holder with IELTS 8.0 score.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AM Teachings - English & IELTS Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AM Teachings | English & IELTS Excellence with Aya Mohsen",
    description:
      "Learn General English, Spoken English, and IELTS preparation with Aya Mohsen.",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "AM Teachings",
    description:
      "General English, Spoken English, and IELTS preparation with Aya Mohsen",
    url: process.env.SITE_URL || "https://amteachings.com",
    logo: `${process.env.SITE_URL || "https://amteachings.com"}/logo.png`,
    founder: {
      "@type": "Person",
      name: "Aya Mohsen",
      jobTitle: "English Teacher & Teaching Specialist",
      description:
        "American Diploma holder with IELTS 8.0 score and TEFL Training Certification",
    },
    offers: [
      {
        "@type": "Service",
        name: "English Lessons",
        description: "Personalized English lessons for all levels",
        provider: {
          "@type": "Person",
          name: "Aya Mohsen",
        },
      },
      {
        "@type": "Service",
        name: "IELTS Preparation",
        description: "Comprehensive IELTS preparation with 95% success rate",
        provider: {
          "@type": "Person",
          name: "Aya Mohsen",
        },
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "500",
      bestRating: "5",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-XXX-XXX-XXXX",
      contactType: "customer service",
      email: "aya@amteachings.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
