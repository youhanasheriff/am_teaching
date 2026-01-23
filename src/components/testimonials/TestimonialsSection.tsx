import { Suspense } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import TestimonialsList from "@/components/testimonials/TestimonialsList";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const tTestimonials = useTranslations("testimonials");
  const locale = useLocale();

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Decorative quote mark */}
      <div className="absolute top-10 left-10 text-brand/5">
        <Quote className="w-64 h-64 rotate-180" />
      </div>

      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block p-3 rounded-full bg-brand-light/30 mb-4">
            <Quote className="h-6 w-6 text-brand" />
          </div>
          <h2 className="section-title">{tTestimonials("title")}</h2>
          <p className="lead max-w-2xl mx-auto">
            {tTestimonials("subtitle")}
          </p>
        </div>
        
        <Suspense
          fallback={
            <div className="text-center py-20 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
            </div>
          }
        >
          <TestimonialsList locale={locale} />
        </Suspense>
        
        <div className="text-center mt-16 text-gray-600">
          <p className="mb-6">{tTestimonials("ctaText") || "Join hundreds of successful students"}</p>
          <Link href="/testimonials">
            <Button variant="outline" size="lg" className="rounded-full px-10">
              {tTestimonials("shareYourStory")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
