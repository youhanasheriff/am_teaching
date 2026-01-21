"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Star, Upload, X } from "lucide-react";
import Image from "next/image";

export default function TestimonialForm() {
  const t = useTranslations("testimonialForm");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    score: "",
    quote_en: "",
    quote_ar: "",
    rating: 5,
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ type: "error", text: t("imageError") });
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setMessage({ type: "error", text: t("imageError") });
      return;
    }

    setProfilePicture(file);
    setPreviewUrl(URL.createObjectURL(file));
    setMessage(null);
  };

  const removeImage = () => {
    setProfilePicture(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("score", formData.score);
      formDataToSend.append("quote_en", formData.quote_en);
      formDataToSend.append("quote_ar", formData.quote_ar);
      formDataToSend.append("rating", formData.rating.toString());

      if (profilePicture) {
        formDataToSend.append("profilePicture", profilePicture);
      }

      const response = await fetch("/api/testimonials/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: t("successMessage") });
        // Reset form
        setFormData({
          name: "",
          email: "",
          role: "",
          score: "",
          quote_en: "",
          quote_ar: "",
          rating: 5,
        });
        setProfilePicture(null);
        setPreviewUrl(null);
      } else {
        setMessage({ type: "error", text: data.error || t("errorMessage") });
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setMessage({ type: "error", text: t("errorMessage") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("title")}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("nameLabel")} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("emailLabel")} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("profilePictureLabel")}
            </label>
            <p className="text-xs text-gray-500 mb-2">
              {t("profilePictureHint")}
            </p>

            {previewUrl ? (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={previewUrl}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand transition-colors">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload</span>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("roleLabel")}
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g., IELTS Student"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>

          {/* Score */}
          <div>
            <label
              htmlFor="score"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("scoreLabel")}
            </label>
            <input
              type="text"
              id="score"
              name="score"
              value={formData.score}
              onChange={handleInputChange}
              placeholder="e.g., Band 7.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("ratingLabel")} *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quote English */}
          <div>
            <label
              htmlFor="quote_en"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("quoteLabelEn")} *
            </label>
            <textarea
              id="quote_en"
              name="quote_en"
              required
              rows={4}
              value={formData.quote_en}
              onChange={handleInputChange}
              dir="ltr"
              placeholder="Write your testimonial in English..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
            />
          </div>

          {/* Quote Arabic */}
          <div>
            <label
              htmlFor="quote_ar"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("quoteLabelAr")} *
            </label>
            <textarea
              id="quote_ar"
              name="quote_ar"
              required
              rows={4}
              value={formData.quote_ar}
              onChange={handleInputChange}
              dir="rtl"
              placeholder="اكتب شهادتك بالعربية..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent resize-none text-right"
            />
          </div>

          {message && (
            <div
              className={`mb-4 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : t("submitButton")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
