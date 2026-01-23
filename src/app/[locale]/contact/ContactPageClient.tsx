"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input, Textarea, Label } from "@/components/ui/Input";
import {
  Clock,
  Globe,
  MessageCircle,
  Send,
  MapPin,
  CheckCircle,
  AlertCircle,
  Mail,
} from "lucide-react";
import { createWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  phone: string;
  telegram: string;
  lessonType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  telegram?: string;
  message?: string;
  general?: string;
}

function ContactForm() {
  const tContact = useTranslations("contact");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    telegram: "",
    lessonType: "general",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Enhanced validation
    if (!formData.name.trim()) {
      newErrors.name = tContact("form.validation.nameRequired");
    } else if (formData.name.trim().length < 2) {
      newErrors.name = tContact("form.validation.nameMinLength");
    } else if (formData.name.trim().length > 100) {
      newErrors.name = tContact("form.validation.nameMaxLength");
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = tContact("form.validation.nameInvalid");
    }

    if (!formData.email.trim()) {
      newErrors.email = tContact("form.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = tContact("form.validation.emailInvalid");
    } else if (formData.email.length > 255) {
      newErrors.email = tContact("form.validation.emailTooLong");
    }

    // Optional phone validation
    if (
      formData.phone.trim() &&
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))
    ) {
      newErrors.phone = tContact("form.validation.phoneInvalid");
    }

    // Optional telegram validation
    if (
      formData.telegram.trim() &&
      !/^@?[a-zA-Z0-9_]{5,32}$/.test(formData.telegram.trim())
    ) {
      newErrors.telegram = tContact("form.validation.telegramInvalid");
    }

    if (!formData.message.trim()) {
      newErrors.message = tContact("form.validation.messageRequired");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = tContact("form.validation.messageMinLength");
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = tContact("form.validation.messageTooLong");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          telegram: "",
          lessonType: "general",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        if (result.details) {
          const fieldErrors: FormErrors = {};
          result.details.forEach(
            (detail: { field: string; message: string }) => {
              fieldErrors[detail.field as keyof FormErrors] = detail.message;
            }
          );
          setErrors(fieldErrors);
        } else {
          setErrors({
            general: result.error || "An error occurred. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <Card className="w-full shadow-2xl border-0 ring-0 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand via-brand-secondary to-brand-accent"></div>
      <CardHeader className="bg-gray-50/50 pb-8 pt-6">
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
          <div className="p-2 bg-brand/10 rounded-xl text-brand">
             <Send className="h-6 w-6" />
          </div>
          <span>{tContact("sendMessage")}</span>
        </CardTitle>
        <p className="text-gray-500 pl-[3.25rem]">{tContact("sendMessageDescription")}</p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {submitStatus === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3 animate-fade-in-up">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 font-bold">
                  {tContact("form.successTitle")}
                </p>
                <p className="text-green-700 text-sm mt-1">
                  {tContact("form.successMessage")}
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-fade-in-up">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-bold">
                  Error sending message
                </p>
                <p className="text-red-700 text-sm mt-1">
                  {errors.general || tContact("form.errorMessage")}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div className="space-y-2">
              <Label htmlFor="name">
                {tContact("form.name")} <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`transition-all duration-200 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 hover:border-brand/40"
                }`}
                placeholder={tContact("form.namePlaceholder")}
                maxLength={100}
              />
              {errors.name && (
                <p className="text-sm text-red-600 flex items-center space-x-1 animate-pulse">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {tContact("form.email")} <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`transition-all duration-200 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 hover:border-brand/40"
                }`}
                placeholder={tContact("form.emailPlaceholder")}
                maxLength={255}
              />
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center space-x-1 animate-pulse">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                {tContact("form.phone")} <span className="text-gray-400 font-normal text-xs ml-1">({tContact("form.optional")})</span>
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`transition-all duration-200 ${
                  errors.phone
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 hover:border-brand/40"
                }`}
                placeholder={tContact("form.phonePlaceholder")}
              />
              {errors.phone && (
                <p className="text-sm text-red-600 flex items-center space-x-1 animate-pulse">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telegram">
                {tContact("form.telegram")} <span className="text-gray-400 font-normal text-xs ml-1">({tContact("form.optional")})</span>
              </Label>
              <Input
                type="text"
                id="telegram"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                className={`transition-all duration-200 ${
                  errors.telegram
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 hover:border-brand/40"
                }`}
                placeholder={tContact("form.telegramPlaceholder")}
              />
              {errors.telegram && (
                <p className="text-sm text-red-600 flex items-center space-x-1 animate-pulse">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.telegram}</span>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lessonType">
              {tContact("form.lessonType")}
            </Label>
            <div className="relative">
              <select
                id="lessonType"
                name="lessonType"
                value={formData.lessonType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all duration-200 appearance-none cursor-pointer hover:border-brand/40"
              >
                <option value="general">{tContact("lessonTypes.general")}</option>
                <option value="ielts">{tContact("lessonTypes.ielts")}</option>
                <option value="individual">
                  {tContact("lessonTypes.individual")}
                </option>
                <option value="group">{tContact("lessonTypes.group")}</option>
                <option value="business">
                  {tContact("lessonTypes.business")}
                </option>
                <option value="conversation">
                  {tContact("lessonTypes.conversation")}
                </option>
                <option value="other">{tContact("lessonTypes.other")}</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              {tContact("form.message")} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`transition-all duration-200 resize-none ${
                errors.message
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-200 hover:border-brand/40"
              }`}
              placeholder={tContact("form.messagePlaceholder")}
              maxLength={2000}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.message ? (
                <p className="text-sm text-red-600 flex items-center space-x-1 animate-pulse">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.message}</span>
                </p>
              ) : (
                <span></span>
              )}
              <span className={`text-xs ${formData.message.length > 1800 ? 'text-orange-500 font-medium' : 'text-gray-400'}`}>
                {tContact("charactersCount", {
                  count: formData.message.length,
                })}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full flex items-center justify-center space-x-2 py-4 text-lg shadow-lg shadow-brand/20 hover:shadow-brand/30"
          >
            {isSubmitting ? (
               <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{tContact("form.sending")}</span>
               </div>
            ) : (
               <div className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  <span>{tContact("form.submit")}</span>
               </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function ContactMethods() {
  const tContact = useTranslations("contact");

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.ABOUT_INQUIRY), "_blank");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          {tContact("getInTouch")}
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          {tContact("getInTouchDescription")}
        </p>
      </div>

      {/* WhatsApp Contact - Primary Method */}
      <Card className="border-none shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <CardContent className="pt-8 relative z-10 text-white">
          <div className="flex items-center space-x-6 mb-8">
            <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl mb-1">
                {tContact("methods.whatsappTitle")}
              </h3>
              <p className="text-green-50 font-medium opacity-90">
                {tContact("methods.whatsappSubtitle")}
              </p>
            </div>
          </div>
          
          <p className="text-white/90 mb-8 border-l-2 border-white/30 pl-4 py-1">
             {tContact("methods.whatsappDescription")}
          </p>
          
          <Button
            onClick={handleWhatsAppContact}
            className="w-full bg-white text-green-600 hover:bg-green-50 flex items-center justify-center space-x-2 text-lg py-4 border-none shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{tContact("methods.whatsappButton")}</span>
          </Button>
        </CardContent>
      </Card>
      
      {/* Contact Grid */}
      <div className="grid gap-4">
        {[
          { icon: <Clock className="h-6 w-6 text-brand" />, title: tContact("responseTime"), value: tContact("responseTimeValue") },
          { icon: <Globe className="h-6 w-6 text-brand" />, title: tContact("availability"), value: tContact("availabilityValue") },
          { icon: <MapPin className="h-6 w-6 text-brand" />, title: tContact("location"), value: tContact("locationValue") }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="p-3 bg-brand/5 rounded-xl">
               {item.icon}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide opacity-70 mb-0.5">
                {item.title}
              </h4>
              <p className="text-gray-700 font-medium">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactFormSection() {
  return (
    <div className="space-y-6">
      <ContactForm />
    </div>
  );
}

export default function ContactPageClient() {
  const tContact = useTranslations("contact");

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50/50">
      <div className="container relative">
         {/* Background Elements */}
         <div className="absolute top-20 left-10 w-64 h-64 bg-brand/5 rounded-full blur-3xl pointer-events-none"></div>
         <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
         
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center rounded-full bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand mb-4">
            <Mail className="mr-2 h-4 w-4" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {tContact("title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {tContact("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-7xl mx-auto items-start relative z-10">
          {/* Contact Methods - Left Column */}
          <div className="lg:sticky lg:top-32">
            <ContactMethods />
            
            {/* Additional Help Section */}
            <div className="mt-12">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100/50">
                <CardContent className="pt-6 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                     <AlertCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {tContact("needImmediate")}
                    </h3>
                    <p className="text-gray-600 text-sm mb-0">
                      {tContact("needImmediateDescription")}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      window.open(
                        createWhatsAppUrl(WHATSAPP_MESSAGES.URGENT_HELP),
                        "_blank"
                      );
                    }}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                  >
                    {tContact("whatsappUrgent")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div>
            <ContactFormSection />
          </div>
        </div>
      </div>
    </div>
  );
}
