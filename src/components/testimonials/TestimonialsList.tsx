import { client, urlFor } from "@/lib/sanity/client";
import { approvedTestimonialsQuery } from "@/lib/sanity/queries";
import TestimonialsGrid from "./TestimonialsGrid";

interface SanityTestimonial {
  _id: string;
  name: string;
  email: string;
  profilePicture?: {
    asset: {
      _ref: string;
    };
  };
  role?: string;
  score?: string;
  quote_en: string;
  quote_ar: string;
  rating: number;
  submittedAt: string;
  approvedAt?: string;
}

interface TestimonialsListProps {
  locale?: string;
}

export default async function TestimonialsList({
  locale = "en",
}: TestimonialsListProps) {
  const testimonials: SanityTestimonial[] = await client.fetch(
    approvedTestimonialsQuery,
    {},
    {
      next: { revalidate: 60 },
    }
  );

  // Transform testimonials to include resolved image URLs
  const transformedTestimonials = testimonials.map((t) => ({
    _id: t._id,
    name: t.name,
    email: t.email,
    profilePictureUrl: t.profilePicture
      ? urlFor(t.profilePicture).width(64).height(64).url()
      : undefined,
    role: t.role,
    score: t.score,
    quote_en: t.quote_en,
    quote_ar: t.quote_ar,
    rating: t.rating,
    submittedAt: t.submittedAt,
    approvedAt: t.approvedAt,
  }));

  return (
    <TestimonialsGrid
      testimonials={transformedTestimonials}
      locale={locale}
      initialCount={3}
    />
  );
}
