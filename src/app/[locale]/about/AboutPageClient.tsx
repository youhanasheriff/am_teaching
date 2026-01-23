"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  MessageCircle,
  GraduationCap,
  Award,
  Users,
  Target,
  CheckCircle,
  Rocket,
  Trophy,
  BookOpen,
  Star,
  Sparkles,
} from "lucide-react";
import { createWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/constants";

function HeroSection() {
  const t = useTranslations("about");

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.ABOUT_INQUIRY), "_blank");
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[80px] animate-float opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[80px] animate-float-delayed opacity-70 pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center rounded-full border border-brand/20 bg-white/50 px-4 py-1.5 text-sm font-medium text-brand backdrop-blur-sm shadow-sm">
              <Sparkles className="flex h-3.5 w-3.5 mr-2 text-brand" />
              <span>Professional Teacher</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {t("title")} <span className="gradient-text relative inline-block">
                <span className="relative z-10">Aya Mohsen</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-brand/10 -z-10 -rotate-1"></span>
              </span>
            </h1>
            
            <p className="lead max-w-2xl text-gray-600 text-lg leading-relaxed border-l-4 border-brand/20 pl-6">
              {t("description")}
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row pt-4">
              <Button
                size="lg"
                className="w-full sm:w-auto flex items-center space-x-2 shadow-lg hover:shadow-brand/20"
                onClick={handleWhatsAppContact}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Telegram Me</span>
                </div>
              </Button>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto hover:bg-white"
                >
                  Email Contact
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-6 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Certified Teacher</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>IELTS Expert</span>
              </div>
            </div>
          </div>
          
          <div className="relative mx-auto lg:mr-0 max-w-md lg:max-w-full w-full perspective-1000">
            <div className="relative aspect-square w-full max-w-md mx-auto rounded-[2.5rem] bg-gradient-to-br from-white to-gray-50 p-3 shadow-2xl ring-1 ring-gray-100 transform rotate-2 hover:rotate-0 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-brand-accent/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10"></div>
              
              <div className="h-full w-full rounded-[2rem] bg-white overflow-hidden flex items-center justify-center relative border border-gray-100">
                 {/* Decorative background pattern */}
                 <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
                 
                 <div className="text-center space-y-6 relative z-10 p-8 w-full">
                  <div className="w-40 h-40 mx-auto bg-gradient-to-br from-brand to-brand-secondary rounded-full flex items-center justify-center shadow-xl ring-8 ring-white/50 backdrop-blur-sm">
                    <div className="text-5xl font-bold text-white">AM</div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Aya Mohsen
                    </h3>
                    <div className="flex flex-col gap-2 items-center">
                      <span className="px-4 py-1.5 rounded-full bg-brand/5 text-brand font-semibold text-sm border border-brand/10">
                        American Diploma Holder
                      </span>
                      <span className="px-4 py-1.5 rounded-full bg-gray-50 text-gray-600 text-sm font-medium border border-gray-100">
                        IELTS 8.0 • English Teacher
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute bottom-10 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-float z-20 flex items-center gap-3">
              <div className="bg-yellow-100 p-2.5 rounded-xl text-yellow-600">
                <Star className="w-6 h-6 fill-yellow-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Rating</p>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-900 text-lg">5.0</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QualificationsSection() {
  const t = useTranslations("about.qualifications");

  const qualifications = [
    {
      title: t("americanDiploma"),
      institution: t("americanDiplomaInstitution"),
      year: t("certified"),
      icon: <GraduationCap className="h-7 w-7" />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      title: t("ieltsScore"),
      institution: t("ieltsInstitution"),
      year: t("certified"),
      icon: <Trophy className="h-7 w-7" />,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-100"
    },
    {
      title: t("teachingLicense"),
      institution: t("teachingLicenseInstitution"),
      year: t("licensed"),
      icon: <Award className="h-7 w-7" />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100"
    },
    {
      title: t("specialist"),
      institution: t("specialistInstitution"),
      year: t("expert"),
      icon: <BookOpen className="h-7 w-7" />,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100"
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="section-title">{t("title")}</h2>
          <p className="lead max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {qualifications.map((qual, index) => (
            <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 border-gray-100">
              <CardContent className="pt-8 flex flex-col items-center h-full">
                <div className={`mb-6 p-4 rounded-2xl ${qual.bg} ${qual.color} group-hover:scale-110 transition-transform duration-300 shadow-sm border ${qual.border}`}>
                  {qual.icon}
                </div>
                <h3 className="font-bold mb-3 text-lg text-gray-900 group-hover:text-brand transition-colors">
                  {qual.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">{qual.institution}</p>
                <div className="mt-auto pt-4 border-t border-gray-50 w-full">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${qual.bg} ${qual.color}`}>
                    {qual.year}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const tExperience = useTranslations("about.experience");

  const experiences = [
    {
      title: tExperience("studentsTitle"),
      description: tExperience("studentsDescription"),
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: tExperience("successTitle"),
      description: tExperience("successDescription"),
      icon: <Target className="h-6 w-6" />,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: tExperience("yearsTitle"),
      description: tExperience("yearsDescription"),
      icon: <Award className="h-6 w-6" />,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
  ];

  return (
    <section className="section bg-gray-50/50">
      <div className="container">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
           {/* Background decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
           
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">{tExperience("title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">{tExperience("subtitle")}</p>
          </div>
          
          <div className="grid gap-12 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {experiences.map((exp, index) => (
              <div key={index} className="text-center px-4 pt-8 md:pt-0 first:pt-0">
                <div className={`w-16 h-16 ${exp.bg} ${exp.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-6 transition-transform duration-300`}>
                  {exp.icon}
                </div>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                  {exp.title}
                </h3>
                <p className="text-gray-500 font-medium">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const tPhilosophy = useTranslations("about.philosophy");

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="section-title relative inline-block">
            {tPhilosophy("title")}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand rounded-full"></span>
          </h2>
          <p className="lead max-w-2xl mx-auto">{tPhilosophy("subtitle")}</p>
        </div>

        <div className="space-y-20">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <div className="inline-flex items-center rounded-lg bg-brand/5 px-3 py-1 text-sm font-medium text-brand mb-2">
                <Target className="h-4 w-4 mr-2" />
                <span>Personalized Approach</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                {tPhilosophy("personalizedTitle")}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {tPhilosophy("personalizedDescription")}
              </p>
              
              <div className="pt-4">
                 <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-brand rounded-full"></span>
                  {tPhilosophy("approachTitle")}
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100">
                      <div className="mt-0.5 min-w-[20px]">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{tPhilosophy(`approach${i}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative order-1 md:order-2">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-light to-brand-secondary p-1 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                 <div className="w-full h-full rounded-[1.4rem] bg-white flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]"></div>
                    <div className="text-center p-8">
                       <Target className="w-32 h-32 text-brand mx-auto opacity-20 mb-4" />
                       <p className="text-2xl font-bold text-gray-300">Target Your Goals</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-bl from-brand-accent to-brand p-1 -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                 <div className="w-full h-full rounded-[1.4rem] bg-white flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]"></div>
                    <div className="text-center p-8">
                       <Rocket className="w-32 h-32 text-brand-accent mx-auto opacity-20 mb-4" />
                       <p className="text-2xl font-bold text-gray-300">Boost Confidence</p>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-lg bg-brand-accent/5 px-3 py-1 text-sm font-medium text-brand-accent mb-2">
                <Rocket className="h-4 w-4 mr-2" />
                <span>Confidence Building</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                {tPhilosophy("confidenceTitle")}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {tPhilosophy("confidenceDescription")}
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">
                  {tPhilosophy("principlesTitle")}
                </h4>
                <ul className="space-y-3">
                  {[1,2,3,4].map((i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-brand-accent"></div>
                      <span className="text-gray-700">{tPhilosophy(`principle${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
               <div className="w-3/4 h-3/4 bg-brand/5 blur-3xl rounded-full"></div>
            </div>
            
            <div className="glass-dark rounded-3xl p-10 md:p-14 text-white overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-brand-primary opacity-90 -z-20"></div>
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {tPhilosophy("ctaTitle")}
              </h3>
              <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                {tPhilosophy("ctaDescription")}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/booking">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto bg-white text-brand hover:bg-gray-50 border-none shadow-lg"
                  >
                    {tPhilosophy("ctaButton1")}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 hover:border-white"
                  >
                    {tPhilosophy("ctaButton2")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const tCta = useTranslations("about.aboutCta");

  return (
    <section className="section bg-gray-50">
      <div className="container text-center">
        <div className="max-w-4xl mx-auto space-y-8 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand via-brand-secondary to-brand-accent"></div>
          
          <h2 className="text-3xl font-bold sm:text-4xl text-gray-900">{tCta("title")}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{tCta("subtitle")}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
            <Link href="/booking">
              <Button
                size="lg"
                className="w-full sm:w-auto px-10 shadow-lg shadow-brand/20"
              >
                {tCta("bookButton")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                {tCta("contactButton")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPageClient() {
  return (
    <>
      <HeroSection />
      <QualificationsSection />
      <ExperienceSection />
      <PhilosophySection />
      <CTASection />
    </>
  );
}
