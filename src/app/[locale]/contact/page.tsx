import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Aya Mohsen | AM Teachings - Get in Touch for English Lessons",
  description:
    "Contact Aya Mohsen for personalized English lessons and IELTS preparation. Get answers to your questions and start your language learning journey today.",
  keywords:
    "contact English teacher, Aya Mohsen contact, English lesson inquiry, IELTS preparation contact",
  openGraph: {
    title: "Contact Aya Mohsen | AM Teachings",
    description:
      "Contact Aya Mohsen for personalized English lessons and IELTS preparation.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Aya Mohsen | AM Teachings",
    description:
      "Contact Aya Mohsen for personalized English lessons and IELTS preparation.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
