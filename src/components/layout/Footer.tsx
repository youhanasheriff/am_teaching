"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, Globe, Clock, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  CONTACT_INFO,
  createWhatsAppUrl,
  WHATSAPP_MESSAGES,
} from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("navigation");
  const tFooter = useTranslations("footer");

  const navigation = {
    main: [
      { name: t("about"), href: "/about" as const },
      { name: t("services"), href: "/services" as const },
      { name: t("blog"), href: "/blog" as const },
      { name: t("contact"), href: "/contact" as const },
    ],
    legal: [
      { name: tFooter("privacyPolicy"), href: "/privacy" as const },
      { name: tFooter("termsOfService"), href: "/terms" as const },
    ],
    social: [] as Array<{
      name: string;
      href: string;
      icon: React.ReactNode;
    }>,
  };

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL_INQUIRY), "_blank");
  };

  return (
    <footer className="bg-gray-900 overflow-hidden relative" aria-labelledby="footer-heading">
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-50"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/10 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl opacity-30"></div>

      <h2 id="footer-heading" className="sr-only">
        {tFooter("footerHeading")}
      </h2>
      <div className="container py-12 lg:py-16 relative z-10">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            {/* Logo and description */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-secondary text-white font-bold text-lg shadow-lg shadow-brand/25 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  {tFooter("brandName")}
                </span>
                <p className="text-sm text-gray-400 -mt-0.5">
                  {tFooter("brandTagline")}
                </p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              {tFooter("description")}
            </p>

            {/* WhatsApp Contact */}
            <div className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm rounded-2xl p-5 hover:border-gray-600 transition-colors duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-green-400" />
                </div>
                <span className="text-sm font-medium text-green-400">
                  {tFooter("quickContact")}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                {tFooter("quickContactDescription")}
              </p>
              <Button
                onClick={handleWhatsAppContact}
                size="sm"
                className="w-full bg-green-600 hover:bg-green-500 text-white border-none shadow-lg shadow-green-900/20 group"
              >
                <div className="flex items-center justify-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{tFooter("messageWhatsApp")}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">
                  {tFooter("navigation")}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-400 hover:text-brand-primary-light transition-colors duration-200 flex items-center group"
                      >
                        <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-1 opacity-0 group-hover:opacity-100">›</span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">
                  {tFooter("contact")}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-sm leading-6 text-gray-400">
                      {CONTACT_INFO.EMAIL}
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Globe className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-sm leading-6 text-gray-400">
                      {tFooter("onlineLessons")}
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                    <span className="text-sm leading-6 text-gray-400">
                      {tFooter("availableSchedule")}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">
                  {tFooter("quickLinks")}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm leading-6 text-brand hover:text-brand-primary-light transition-colors duration-200 font-medium flex items-center group"
                    >
                       <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-1 opacity-0 group-hover:opacity-100">›</span>
                      {tFooter("contactMe")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-sm leading-6 text-gray-400 hover:text-brand-primary-light transition-colors duration-200 flex items-center group"
                    >
                       <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-1 opacity-0 group-hover:opacity-100">›</span>
                      {tFooter("teachingServices")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-sm leading-6 text-gray-400 hover:text-brand-primary-light transition-colors duration-200 flex items-center group"
                    >
                       <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-200 mr-0 group-hover:mr-1 opacity-0 group-hover:opacity-100">›</span>
                      {tFooter("learningResources")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm leading-6 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <p className="mt-8 text-sm leading-5 text-gray-500 md:order-1 md:mt-0">
              {tFooter("copyrightExtended", { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
