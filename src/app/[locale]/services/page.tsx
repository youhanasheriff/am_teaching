"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { MessageCircle, Sprout, Rocket, Target, Quote, CheckCircle, Trophy, BookOpen, ArrowRight } from "lucide-react";

function HeroSection() {
  const tServices = useTranslations("services");
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
       {/* Animated Background */}
       <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-white to-brand-secondary/5"></div>
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[100px] animate-float opacity-70 pointer-events-none"></div>
       <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[100px] animate-pulse-soft opacity-70 pointer-events-none"></div>
       
       <div className="container relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center rounded-full bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand border border-brand/10 backdrop-blur-sm">
            <Rocket className="mr-2 h-4 w-4" />
            <span>Elevate Your English Skills</span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
            {tServices("title")}
          </h1>
          <p className="lead text-gray-600 max-w-2xl mx-auto text-xl leading-relaxed">
            {tServices("subtitle")}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-6">
            <Link href="/contact">
              <Button
                size="lg"
                variant="gradient"
                className="w-full sm:w-auto flex items-center space-x-2 text-lg px-8 shadow-lg shadow-brand/20"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>{tServices("contactMe")}</span>
                </div>
              </Button>
            </Link>
            <a href="#levels">
               <Button
                size="lg"
                variant="outline" 
                className="w-full sm:w-auto text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-brand"
              >
                Explore Levels <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
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
      icon: <Sprout className="h-10 w-10 text-white" />,
      color: "from-green-400 to-emerald-600",
      accent: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100"
    },
    {
      title: tServices("intermediateTitle"),
      subtitle: tServices("intermediateSubtitle"),
      description: tServices("intermediateDescription"),
      features: tServices.raw("intermediateFeatures") as string[],
      outcomes: tServices.raw("intermediateOutcomes") as string[],
      duration: tServices("intermediateDuration"),
      icon: <Rocket className="h-10 w-10 text-white" />,
      color: "from-blue-400 to-indigo-600",
      accent: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      title: tServices("advancedTitle"),
      subtitle: tServices("advancedSubtitle"),
      description: tServices("advancedDescription"),
      features: tServices.raw("advancedFeatures") as string[],
      outcomes: tServices.raw("advancedOutcomes") as string[],
      duration: tServices("advancedDuration"),
      icon: <Target className="h-10 w-10 text-white" />,
      color: "from-purple-400 to-violet-600",
      accent: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100"
    },
  ];

  return (
    <section id="levels" className="section relative">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="section-title">
            {tServices("englishLearningLevels")}
          </h2>
          <p className="lead max-w-2xl mx-auto">
            {tServices("structuredPrograms")}
          </p>
        </div>
        
        <div className="space-y-12">
          {levels.map((level, index) => (
            <div key={index} className="group relative rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
               <div className="grid lg:grid-cols-[300px_1fr] h-full">
                  {/* Left Column: Visual & Header */}
                  <div className={`relative p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br ${level.color} text-white`}>
                     <div className="mb-6 p-4 bg-white/20 rounded-2xl backdrop-blur-md shadow-lg">{level.icon}</div>
                     <h3 className="text-2xl font-bold mb-1">{level.title}</h3>
                     <p className="text-blue-50 font-medium mb-6">{level.subtitle}</p>
                     
                     <div className="mt-auto w-full pt-6 border-t border-white/20">
                        <div className="text-xs font-semibold uppercase tracking-wider text-blue-100 mb-1">{tServices("duration")}</div>
                        <div className="text-xl font-bold">{level.duration}</div>
                     </div>
                  </div>
                  
                  {/* Right Column: Content */}
                  <div className="p-8 lg:p-10">
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                      {level.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                       <div>
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                             <BookOpen className={`h-5 w-5 ${level.accent}`} />
                             {tServices("whatYoullLearn")}
                          </h4>
                          <ul className="space-y-3">
                            {level.features.map((feature, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-600">
                                <span className={`mr-2 mt-1 block h-1.5 w-1.5 rounded-full ${level.bg.replace('bg-', 'bg-').replace('50', '500')}`}></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                       </div>
                       
                       <div>
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                             <Trophy className={`h-5 w-5 ${level.accent}`} />
                             {tServices("learningOutcomes")}
                          </h4>
                          <ul className="space-y-3">
                            {level.outcomes.map((outcome, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-600">
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                {outcome}
                              </li>
                            ))}
                          </ul>
                       </div>
                    </div>
                    
                    <div className="flex justify-end">
                       <Link href="/contact">
                        <Button className="w-full sm:w-auto hover:scale-105 transition-transform">
                          {tServices("contactFor", { level: level.title })}
                        </Button>
                      </Link>
                    </div>
                  </div>
               </div>
            </div>
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
    <section id="ielts" className="section relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-gray-900 text-white">
         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
         <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
      </div>

      <div className="container relative z-10 text-white">
        <div className="text-center space-y-6 mb-16">
           <div className="inline-flex items-center rounded-full bg-orange-500/20 px-4 py-1.5 text-sm font-medium text-orange-400 border border-orange-500/20 backdrop-blur-sm mb-4">
            <Trophy className="mr-2 h-4 w-4" />
            <span>IELTS Preparation Expert</span>
          </div>
          
          <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">
            {tServices("ielts.title")}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {tServices("ielts.description")}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-gray-800 mt-8 max-w-4xl mx-auto">
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-orange-500 mb-1">
                {tServices("ielts.score")}
              </div>
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                {tServices("ielts.scoreLabel")}
              </div>
            </div>
            <div className="w-px h-12 bg-gray-800 hidden sm:block"></div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-green-500 mb-1">
                {tServices("ielts.successRate")}
              </div>
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                {tServices("ielts.successRateLabel")}
              </div>
            </div>
            <div className="w-px h-12 bg-gray-800 hidden sm:block"></div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-blue-500 mb-1">
                {tServices("ielts.duration")}
              </div>
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                {tServices("ielts.durationLabel")}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {modules.map((module, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white hover:bg-gray-800 transition-colors duration-300"
            >
              <CardContent className="pt-8">
                <div className="text-center space-y-4">
                  <div className="text-5xl mb-4 transform hover:scale-110 transition-transform duration-300 inline-block">{module.icon}</div>
                  <h3 className="text-xl font-bold">{module.title}</h3>
                  <p className="text-gray-400 text-sm">{module.description}</p>
                  <div className="pt-4 border-t border-gray-700 w-full">
                     <ul className="space-y-2 text-xs text-gray-300 text-left">
                       {module.skills.map((skill, i) => (
                         <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mr-2"></span>
                            {skill}
                         </li>
                       ))}
                     </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-brand to-brand-secondary rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
           
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                 <Quote className="h-8 w-8 text-white/80 rotate-180" />
                 <h3 className="text-2xl font-bold text-white">
                  {tServices("ielts.successStories")}
                </h3>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <blockquote className="text-lg text-white/90 italic mb-6 leading-relaxed">
                  &ldquo;{tServices("ielts.testimonialQuote")}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white text-brand font-bold flex items-center justify-center">S</div>
                  <div>
                    <div className="font-bold text-white">
                      {tServices("ielts.testimonialName")}
                    </div>
                    <div className="text-blue-100 text-sm bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1">
                      {tServices("ielts.testimonialScore")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                 <h4 className="font-bold text-white text-xl mb-4 flex items-center gap-2">
                   <Target className="h-5 w-5" />
                   {tServices("ielts.programIncludes")}
                 </h4>
                 <ul className="grid sm:grid-cols-2 gap-4">
                   {(tServices.raw("ielts.programFeatures") as string[]).map(
                     (feature, i) => (
                       <li key={i} className="flex items-center text-blue-50">
                          <CheckCircle className="h-5 w-5 mr-3 text-green-300 flex-shrink-0" />
                          {feature}
                       </li>
                     )
                   )}
                 </ul>
              </div>
              
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-brand hover:bg-gray-50 border-none shadow-xl w-full sm:w-auto"
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
        <div className="text-center space-y-4 mb-16">
          <h2 className="section-title gradient-text inline-block">{tServices("specialized.title")}</h2>
          <p className="lead max-w-2xl mx-auto">
            {tServices("specialized.subtitle")}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="group text-center hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300 mb-6 bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                  {service.icon}
                </div>
                <CardTitle className="mb-2">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                   <ul className="text-sm text-gray-600 space-y-2">
                     {service.features.map((feature, i) => (
                       <li key={i} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-brand mr-2 mt-0.5 shrink-0" />
                          {feature}
                       </li>
                     ))}
                   </ul>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full group-hover:bg-brand group-hover:text-white group-hover:border-brand">
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
    <section className="section bg-white">
      <div className="container text-center">
        <div className="max-w-4xl mx-auto space-y-8 glass p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
           <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto text-brand-accent">
              <MessageCircle className="h-8 w-8" />
           </div>
           
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {tServices("cta.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{tServices("cta.subtitle")}</p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-2">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-brand/20 px-10">
                {tServices("contactMeNow")}
              </Button>
            </Link>
          </div>
          
          <div className="pt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
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
