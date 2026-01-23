"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { Menu, X, MessageCircle, Sparkles } from "lucide-react";
import { createWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/constants";

export default function Navbar() {
  const t = useTranslations("navigation");
  const tFooter = useTranslations("footer");
  const tUi = useTranslations("ui");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: t("home"), href: "/" as const },
    { name: t("about"), href: "/about" as const },
    { name: t("services"), href: "/services" as const },
    { name: t("blog"), href: "/blog" as const },
    { name: t("contact"), href: "/contact" as const },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    return pathname === href;
  };

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL_INQUIRY), "_blank");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-900/5 border-b border-gray-200/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-secondary text-white font-bold text-lg shadow-lg shadow-brand/25 group-hover:shadow-xl group-hover:shadow-brand/30 transition-all duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {tFooter("brandName")}
            </span>
            <p className="text-sm text-gray-500 -mt-0.5 font-medium">
              {tFooter("brandTagline")}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                isActive(item.href)
                  ? "text-brand bg-brand/5"
                  : "text-gray-600 hover:text-brand hover:bg-gray-50"
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Contact Buttons & Language Switcher */}
        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          <div className="hidden sm:flex items-center space-x-3">
            <Link href="/contact">
              <Button size="sm">{t("contact")}</Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsAppContact}
              className="flex items-center space-x-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{tUi("whatsapp")}</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden rounded-xl p-2.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded="false"
          >
            <span className="sr-only">{tUi("openMainMenu")}</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 pb-6 pt-4 shadow-xl">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-brand/10 to-brand-secondary/10 text-brand"
                    : "text-gray-600 hover:bg-gray-50 hover:text-brand"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
            <div className="mb-4">
              <LanguageSwitcher />
            </div>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center">
                {t("contact")}
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full justify-center flex items-center space-x-2 border-green-200 text-green-600 hover:bg-green-50"
              onClick={() => {
                handleWhatsAppContact();
                setMobileMenuOpen(false);
              }}
            >
              <MessageCircle className="h-4 w-4" />
              <span>{tUi("whatsapp")}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
