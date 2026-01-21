"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import { createWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/constants";

export default function CTASection() {
  const tCta = useTranslations("cta");

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.READY_TO_START), "_blank");
  };

  return (
    <section className="section bg-brand text-white">
      <div className="container text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold sm:text-4xl">{tCta("title")}</h2>
          <p className="text-xl text-blue-100">{tCta("subtitle")}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-white text-brand hover:bg-gray-50 flex items-center space-x-2"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{tCta("startWhatsApp")}</span>
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto text-white border-white hover:bg-white/10 hover:text-white"
              >
                {tCta("emailForm")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
