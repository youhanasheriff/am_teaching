"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { createWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/constants";

export default function CTASection() {
  const tCta = useTranslations("cta");

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.READY_TO_START), "_blank");
  };

  return (
    <section className="section relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-secondary to-brand-accent"></div>
      
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

      <div className="container relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-8 bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20">
          <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm border border-white/30 mb-2">
            <Sparkles className="mr-2 h-4 w-4 text-yellow-300" /> 
            <span>Start your journey today</span>
          </div>
          
          <h2 className="text-3xl font-extrabold sm:text-4xl text-white tracking-tight leading-tight">
            {tCta("title")}
          </h2>
          
          <p className="text-xl text-blue-50/90 leading-relaxed font-medium">
            {tCta("subtitle")}
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-white text-brand hover:bg-gray-50 flex items-center space-x-2 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-none"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{tCta("startWhatsApp")}</span>
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto text-white border-white/50 hover:bg-white/10 hover:text-white hover:border-white transition-all duration-300"
              >
                {tCta("emailForm")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
