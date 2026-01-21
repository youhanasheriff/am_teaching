"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { MessageCircle } from "lucide-react";

function HeroSection() {
  const tServices = useTranslations("services");
  return (
    <section className="section bg-gradient-to-br from-brand-light to-white">
      <div className="container text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {tServices("title")}
          </h1>
          <p className="lead">{tServices("subtitle")}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{tServices("contactMe")}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnglishLevelsSection() {
  const tServices = useTranslations("services");

  const levels = [
    {
      title: tServices("beginnerTitle"),
      subtitle: tServices("beginnerSubtitle"),
      description: tServices("beginnerDescription"),
      features: tServices.raw("beginnerFeatures") as string[],
      outcomes: tServices.raw("beginnerOutcomes") as string[],
      duration: tServices("beginnerDuration"),
      icon: "🌱",
      color: "from-green-100 to-green-50",
    },
    {
      title: tServices("intermediateTitle"),
      subtitle: tServices("intermediateSubtitle"),
      description: tServices("intermediateDescription"),
      features: tServices.raw("intermediateFeatures") as string[],
      outcomes: tServices.raw("intermediateOutcomes") as string[],
      duration: tServices("intermediateDuration"),
      icon: "🚀",
      color: "from-blue-100 to-blue-50",
    },
    {
      title: tServices("advancedTitle"),
      subtitle: tServices("advancedSubtitle"),
      description: tServices("advancedDescription"),
      features: tServices.raw("advancedFeatures") as string[],
      outcomes: tServices.raw("advancedOutcomes") as string[],
      duration: tServices("advancedDuration"),
      icon: "🎯",
      color: "from-purple-100 to-purple-50",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">
            {tServices("englishLearningLevels")}
          </h2>
          <p className="lead max-w-2xl mx-auto">
            {tServices("structuredPrograms")}
          </p>
        </div>
        <div className="space-y-8">
          {levels.map((level, index) => (
            <Card key={index} className="overflow-hidden">
              <div className={`bg-gradient-to-r ${level.color} p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl">{level.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {level.title}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {level.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 max-w-2xl">
                      {level.description}
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-brand font-semibold">
                      {tServices("duration")}
                    </div>
                    <div className="text-gray-600">{level.duration}</div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {tServices("whatYoullLearn")}
                    </h4>
                    <ul className="space-y-2">
                      {level.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-brand mt-1.5 mr-2">•</span>
                          <span className="text-gray-600 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {tServices("learningOutcomes")}
                    </h4>
                    <ul className="space-y-2 mb-4">
                      {level.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mt-1.5 mr-2">✓</span>
                          <span className="text-gray-600 text-sm">
                            {outcome}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <Button className="w-full sm:w-auto">
                        {tServices("contactFor", { level: level.title })}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function IELTSSection() {
  const tServices = useTranslations("services");

  const modules = [
    {
      title: tServices("ielts.listeningTitle"),
      description: tServices("ielts.listeningDescription"),
      skills: tServices.raw("ielts.listeningSkills") as string[],
      icon: "👂",
    },
    {
      title: tServices("ielts.readingTitle"),
      description: tServices("ielts.readingDescription"),
      skills: tServices.raw("ielts.readingSkills") as string[],
      icon: "📚",
    },
    {
      title: tServices("ielts.writingTitle"),
      description: tServices("ielts.writingDescription"),
      skills: tServices.raw("ielts.writingSkills") as string[],
      icon: "✍️",
    },
    {
      title: tServices("ielts.speakingTitle"),
      description: tServices("ielts.speakingDescription"),
      skills: tServices.raw("ielts.speakingSkills") as string[],
      icon: "🗣️",
    },
  ];

  return (
    <section id="ielts" className="section bg-brand text-white">
      <div className="container">
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            {tServices("ielts.title")}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {tServices("ielts.description")}
          </p>
          <div className="flex items-center justify-center space-x-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {tServices("ielts.score")}
              </div>
              <div className="text-blue-200 text-sm">
                {tServices("ielts.scoreLabel")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {tServices("ielts.successRate")}
              </div>
              <div className="text-blue-200 text-sm">
                {tServices("ielts.successRateLabel")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {tServices("ielts.duration")}
              </div>
              <div className="text-blue-200 text-sm">
                {tServices("ielts.durationLabel")}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {modules.map((module, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur border-white/20 text-white"
            >
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="text-4xl">{module.icon}</div>
                  <h3 className="text-lg font-semibold">{module.title}</h3>
                  <p className="text-blue-100 text-sm">{module.description}</p>
                  <ul className="space-y-1 text-xs text-blue-200">
                    {module.skills.map((skill, i) => (
                      <li key={i}>• {skill}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                {tServices("ielts.successStories")}
              </h3>
              <div className="space-y-4">
                <blockquote className="text-blue-100 italic">
                  &ldquo;{tServices("ielts.testimonialQuote")}&rdquo;
                </blockquote>
                <div className="text-sm">
                  <div className="font-medium">
                    {tServices("ielts.testimonialName")}
                  </div>
                  <div className="text-blue-200">
                    {tServices("ielts.testimonialScore")}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">
                {tServices("ielts.programIncludes")}
              </h4>
              <ul className="space-y-2 text-blue-100">
                {(tServices.raw("ielts.programFeatures") as string[]).map(
                  (feature, i) => (
                    <li key={i}>✓ {feature}</li>
                  )
                )}
              </ul>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-brand hover:bg-gray-50"
                >
                  {tServices("ielts.contactForIelts")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecializedServicesSection() {
  const tServices = useTranslations("services");

  const services = [
    {
      title: tServices("specialized.businessTitle"),
      description: tServices("specialized.businessDescription"),
      features: tServices.raw("specialized.businessFeatures") as string[],
      icon: "💼",
    },
    {
      title: tServices("specialized.academicTitle"),
      description: tServices("specialized.academicDescription"),
      features: tServices.raw("specialized.academicFeatures") as string[],
      icon: "🎓",
    },
    {
      title: tServices("specialized.conversationTitle"),
      description: tServices("specialized.conversationDescription"),
      features: tServices.raw("specialized.conversationFeatures") as string[],
      icon: "💬",
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">{tServices("specialized.title")}</h2>
          <p className="lead max-w-2xl mx-auto">
            {tServices("specialized.subtitle")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="group text-center">
              <CardHeader>
                <div className="text-4xl group-hover:scale-110 transition-transform duration-200 mb-3">
                  {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="text-sm text-gray-500 space-y-1 mb-4">
                  {service.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    {tServices("contactMe")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const tServices = useTranslations("services");

  return (
    <section className="section">
      <div className="container text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {tServices("cta.title")}
          </h2>
          <p className="text-xl text-gray-600">{tServices("cta.subtitle")}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto">
                {tServices("contactMeNow")}
              </Button>
            </Link>
          </div>
          <div className="pt-8 text-sm text-gray-500">
            {tServices("cta.supportText")}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <HeroSection />
      <EnglishLevelsSection />
      <IELTSSection />
      <SpecializedServicesSection />
      <CTASection />
    </>
  );
}
