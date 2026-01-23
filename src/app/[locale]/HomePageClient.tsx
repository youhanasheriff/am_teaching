"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  MessageCircle,
  Sprout,
  Rocket,
  Target,
  Trophy,
  ArrowRight,
  Star,
} from "lucide-react";
import { createWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/constants";

function HeroSection() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const tStats = useTranslations("stats");

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.HERO_CTA), "_blank");
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[100px] animate-float opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[100px] animate-pulse-soft opacity-60 pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10 animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand">
                <span className="flex h-2 w-2 rounded-full bg-brand mr-2 animate-pulse"></span>
                {t("badge") || "Premium English Learning"}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                {t("title")} <span className="gradient-text">{t("subtitle")}</span>
              </h1>
              <p className="lead max-w-2xl text-gray-600 text-lg sm:text-xl leading-relaxed">
                {t("description")}
              </p>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                variant="gradient"
                size="lg"
                className="w-full sm:w-auto flex items-center space-x-2"
                onClick={handleWhatsAppContact}
              >
                <MessageCircle className="h-5 w-5" />
                <span>{tCommon("whatsapp")}</span>
              </Button>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto flex items-center gap-2 group"
                >
                  {t("cta2")}
                  <ArrowRight className="h-5 w-5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200/60">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold gradient-text">
                  {tStats("studentsCount")}
                </div>
                <div className="text-sm font-medium text-gray-500 mt-1">
                  {tStats("studentsTitle")}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold gradient-text">
                  {tStats("successCount")}
                </div>
                <div className="text-sm font-medium text-gray-500 mt-1">
                  {tStats("successTitle")}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  <span className="text-3xl font-bold gradient-text">{tStats("ratingCount")}</span>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="text-sm font-medium text-gray-500 mt-1">
                  {tStats("ratingTitle")}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto lg:mr-0 max-w-md lg:max-w-full w-full">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full rounded-[2.5rem] bg-gradient-to-br from-brand/5 to-white p-2 shadow-2xl ring-1 ring-gray-100 overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-500">
              <div className="h-full w-full rounded-[2rem] bg-gradient-to-br from-brand-light/20 to-brand-secondary/10 overflow-hidden flex items-center justify-center relative">
                {/* Decorative background elements inside frame */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
                
                <div className="text-center space-y-6 relative z-10 p-8 glass rounded-3xl max-w-[80%]">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-brand to-brand-secondary rounded-full flex items-center justify-center shadow-lg shadow-brand/30 ring-4 ring-white">
                    <div className="text-4xl font-bold text-white">AM</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {t("teacherName")}
                    </h3>
                    <p className="text-brand font-medium tracking-wide uppercase text-sm">
                      {t("teacherTitle")}
                    </p>
                    <div className="flex justify-center gap-2 pt-2">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {t("teacherExperience")}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                        IELTS 8.0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Card 1 */}
            <div className="absolute -left-8 top-20 glass p-4 rounded-2xl shadow-xl animate-float-delayed z-20 max-w-[180px] hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                   <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Exam Prep</p>
                  <p className="text-xs text-gray-500">IELTS Specialist</p>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute -right-8 bottom-32 glass p-4 rounded-2xl shadow-xl animate-float z-20 max-w-[180px] hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-light/20 rounded-lg">
                   <Trophy className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Verified</p>
                  <p className="text-xs text-gray-500">Expert Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const tServices = useTranslations("servicesPreview");
  const tCommon = useTranslations("common");

  const services = [
    {
      title: tServices("beginnerTitle"),
      description: tServices("beginnerDescription"),
      icon: <Sprout className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
      text: "text-green-600"
    },
    {
      title: tServices("intermediateTitle"),
      description: tServices("intermediateDescription"),
      icon: <Rocket className="h-8 w-8" />,
      color: "from-blue-500 to-indigo-500",
      bg: "bg-blue-50",
      text: "text-blue-600"
    },
    {
      title: tServices("advancedTitle"),
      description: tServices("advancedDescription"),
      icon: <Target className="h-8 w-8" />,
      color: "from-purple-500 to-violet-500",
      bg: "bg-purple-50",
      text: "text-purple-600"
    },
    {
      title: tServices("ieltsTitle"),
      description: tServices("ieltsDescription"),
      icon: <Trophy className="h-8 w-8" />,
      color: "from-orange-500 to-red-500",
      bg: "bg-orange-50",
      text: "text-orange-600"
    },
  ];

  return (
    <section className="section bg-gray-50/50">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="section-title gradient-text inline-block bg-clip-text text-transparent pb-1">
            {tServices("title")}
          </h2>
          <p className="lead max-w-2xl mx-auto text-gray-600">
            {tServices("subtitle")}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="text-center group border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative" hover>
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${service.color}`}></div>
              <CardContent className="pt-8">
                <div className={`mx-auto w-16 h-16 rounded-2xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <div className={service.text}>
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center justify-center text-brand font-medium text-sm opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {tCommon("learnMore")} <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" size="lg" className="px-8 border-gray-300 text-gray-700 hover:text-brand hover:border-brand">
              {tCommon("viewAllServices")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePageClient() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
    </>
  );
}
