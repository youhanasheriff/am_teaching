import { Suspense } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import TestimonialsList from "@/components/testimonials/TestimonialsList";

export default function TestimonialsSection() {
  const tTestimonials = useTranslations("testimonials");
  const locale = useLocale();

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">{tTestimonials("title")}</h2>
          <p className="lead">{tTestimonials("subtitle")}</p>
        </div>
        <Suspense
          fallback={
            <div className="text-center py-12">
              <p className="text-gray-500">Loading testimonials...</p>
            </div>
          }
        >
          <TestimonialsList locale={locale} />
        </Suspense>
        <div className="text-center mt-12">
          <Link href="/testimonials">
            <Button variant="outline" size="lg">
              {tTestimonials("shareYourStory")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
