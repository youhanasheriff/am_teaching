import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Aya Mohsen | AM Teachings - Expert English & IELTS Teacher",
  description:
    "Meet Aya Mohsen, licensed English teacher specializing in General English, Spoken English, and IELTS preparation. American Diploma holder with IELTS 8.0 score and TEFL Training Certification.",
  keywords:
    "Aya Mohsen, English teacher, Teaching specialist, English tutor, language learning",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
