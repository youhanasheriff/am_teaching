'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import {
  MessageCircle,
  Star,
  Sprout,
  Rocket,
  Target,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { createWhatsAppUrl, WHATSAPP_MESSAGES } from '@/lib/constants';

function HeroSection() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const tStats = useTranslations('stats');

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.HERO_CTA), '_blank');
  };

  return (
    <section className="section bg-gradient-to-br from-brand-light to-white">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                {t('title')} <span className="text-brand">{t('subtitle')}</span>
              </h1>
              <p className="lead max-w-2xl">{t('description')}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="w-full sm:w-auto flex items-center space-x-2"
                onClick={handleWhatsAppContact}
              >
                <MessageCircle className="h-5 w-5" />
                <span>{tCommon('whatsapp')}</span>
              </Button>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  {t('cta2')}
                  <ArrowRight className="h-5 w-5 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand">
                  {tStats('studentsCount')}
                </div>
                <div className="text-sm text-gray-600">
                  {tStats('studentsTitle')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand">
                  {tStats('successCount')}
                </div>
                <div className="text-sm text-gray-600">
                  {tStats('successTitle')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand">
                  {tStats('ratingCount')}
                </div>
                <div className="text-sm text-gray-600">
                  {tStats('ratingTitle')}
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-brand/20 to-accent/10 p-8 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-4xl font-bold text-brand">AM</div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {t('teacherName')}
                  </h3>
                  <p className="text-gray-600">{t('teacherTitle')}</p>
                  <p className="text-sm text-gray-500">
                    {t('teacherExperience')}
                  </p>
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
  const tServices = useTranslations('servicesPreview');
  const tCommon = useTranslations('common');

  const services = [
    {
      title: tServices('beginnerTitle'),
      description: tServices('beginnerDescription'),
      icon: <Sprout className="h-8 w-8" />,
    },
    {
      title: tServices('intermediateTitle'),
      description: tServices('intermediateDescription'),
      icon: <Rocket className="h-8 w-8" />,
    },
    {
      title: tServices('advancedTitle'),
      description: tServices('advancedDescription'),
      icon: <Target className="h-8 w-8" />,
    },
    {
      title: tServices('ieltsTitle'),
      description: tServices('ieltsDescription'),
      icon: <Trophy className="h-8 w-8" />,
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">{tServices('title')}</h2>
          <p className="lead max-w-2xl mx-auto">{tServices('subtitle')}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="text-center group">
              <CardContent className="pt-6">
                <div className="text-brand mb-4 group-hover:scale-110 transition-transform duration-200 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services">
            <Button variant="outline">{tCommon('viewAllServices')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const tTestimonials = useTranslations('testimonials');

  const testimonials = [
    {
      quote: tTestimonials('student1Quote'),
      name: tTestimonials('student1Name'),
      role: tTestimonials('student1Role'),
      score: tTestimonials('student1Score'),
    },
    {
      quote: tTestimonials('student2Quote'),
      name: tTestimonials('student2Name'),
      role: tTestimonials('student2Role'),
      score: tTestimonials('student2Score'),
    },
    {
      quote: tTestimonials('student3Quote'),
      name: tTestimonials('student3Name'),
      role: tTestimonials('student3Role'),
      score: tTestimonials('student3Score'),
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">{tTestimonials('title')}</h2>
          <p className="lead">{tTestimonials('subtitle')}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-brand bg-brand-light px-3 py-1 rounded-full">
                    {testimonial.score}
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

function CTASection() {
  const tCta = useTranslations('cta');

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.READY_TO_START), '_blank');
  };

  return (
    <section className="section bg-brand text-white">
      <div className="container text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold sm:text-4xl">{tCta('title')}</h2>
          <p className="text-xl text-blue-100">{tCta('subtitle')}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-white text-brand hover:bg-gray-50 flex items-center space-x-2"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{tCta('startWhatsApp')}</span>
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto text-white border-white hover:bg-white/10 hover:text-white"
              >
                {tCta('emailForm')}
              </Button>
            </Link>
          </div>
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
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
