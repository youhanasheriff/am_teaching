"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Testimonial {
  _id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
  role?: string;
  score?: string;
  quote_en: string;
  quote_ar: string;
  rating: number;
  submittedAt: string;
  approvedAt?: string;
}

interface TestimonialsGridProps {
  testimonials: Testimonial[];
  locale: string;
  initialCount?: number;
}

export default function TestimonialsGrid({
  testimonials,
  locale,
  initialCount = 3,
}: TestimonialsGridProps) {
  const t = useTranslations("testimonials");
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const containerRef = useRef<HTMLDivElement>(null);

  const isRTL = locale === "ar";
  const displayedTestimonials = testimonials.slice(0, visibleCount);
  const hasMore = visibleCount < testimonials.length;
  const remainingCount = testimonials.length - visibleCount;

  const handleLoadMore = () => {
    // Load 3 more or remaining testimonials
    const nextCount = Math.min(visibleCount + 3, testimonials.length);
    setVisibleCount(nextCount);
  };

  const handleCollapse = () => {
    setVisibleCount(initialCount);
    // Smooth scroll to top of testimonials
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t("noTestimonials")}</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Testimonials Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedTestimonials.map((testimonial, index) => {
          const quote =
            locale === "ar" ? testimonial.quote_ar : testimonial.quote_en;

          return (
            <Card
              key={testimonial._id}
              className="group transition-all duration-300 hover:shadow-lg"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <CardContent className="pt-6">
                {/* Header: Profile Picture & Name */}
                <div
                  className={`flex items-center gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ring-2 ring-gray-100">
                    {testimonial.profilePictureUrl ? (
                      <Image
                        src={testimonial.profilePictureUrl}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand text-white font-semibold text-lg">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className={isRTL ? "text-right" : ""}>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    {testimonial.role && (
                      <div className="text-sm text-gray-500">
                        {testimonial.role}
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating Stars */}
                <div
                  className={`flex gap-0.5 mb-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className={`text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4 ${isRTL ? "text-right" : ""}`}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>

                {/* Score Badge */}
                {testimonial.score && (
                  <div
                    className={`inline-flex items-center text-xs font-medium text-brand bg-brand/10 px-2.5 py-1 rounded-full ${isRTL ? "float-right" : ""}`}
                  >
                    {testimonial.score}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load More / Collapse Controls */}
      {testimonials.length > initialCount && (
        <div className="flex flex-col items-center gap-3 pt-4">
          {hasMore ? (
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              className="gap-2 px-8 transition-all duration-200 hover:gap-3"
            >
              {t("viewMore")}
              <span className="text-gray-400 font-normal">
                ({remainingCount})
              </span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCollapse}
              className="gap-2 text-gray-500 hover:text-gray-700"
            >
              {t("showLess")}
              <ChevronUp className="w-4 h-4" />
            </Button>
          )}

          {/* Progress indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>
              {visibleCount} / {testimonials.length}
            </span>
            <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-300"
                style={{
                  width: `${(visibleCount / testimonials.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
