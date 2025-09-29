'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { MessageCircle, GraduationCap, Award, Users, BookOpen, Target, CheckCircle, Rocket, Trophy } from 'lucide-react';
import { createWhatsAppUrl, WHATSAPP_MESSAGES } from '@/lib/constants';

function HeroSection() {
  const t = useTranslations('about');
  
  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.ABOUT_INQUIRY), '_blank');
  };

  return (
    <section className="section bg-gradient-to-br from-brand-light to-white">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {t('title')}
              </h1>
              <p className="lead">
                {t('description')}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button 
                size="lg" 
                className="w-full sm:w-auto flex items-center space-x-2"
                onClick={handleWhatsAppContact}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Telegram Me</span>
              </Button>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Email Contact
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square w-full max-w-md mx-auto rounded-3xl bg-gradient-to-br from-brand/20 to-accent/10 p-8 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-48 h-48 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-6xl font-bold text-brand">AM</div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-900">Aya Mohsen</h3>
                  <p className="text-gray-600 font-medium">American Diploma Holder</p>
                  <p className="text-sm text-gray-500">IELTS 8.0 • Licensed Teacher</p>
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
  const t = useTranslations('about.qualifications');
  
  const qualifications = [
    {
      title: t('americanDiploma'),
      institution: t('americanDiplomaInstitution'),
      year: t('certified'),
      icon: <GraduationCap className="h-8 w-8" />,
    },
    {
      title: t('ieltsScore'),
      institution: t('ieltsInstitution'),
      year: t('certified'),
      icon: <Trophy className="h-8 w-8" />,
    },
    {
      title: t('teachingLicense'),
      institution: t('teachingLicenseInstitution'),
      year: t('licensed'),
      icon: <Award className="h-8 w-8" />,
    },
    {
      title: t('specialist'),
      institution: t('specialistInstitution'),
      year: t('expert'),
      icon: <BookOpen className="h-8 w-8" />,
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">{t('title')}</h2>
          <p className="lead max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {qualifications.map((qual, index) => (
            <Card key={index} className="text-center group">
              <CardContent className="pt-6">
                <div className="text-brand mb-4 group-hover:scale-110 transition-transform duration-200 flex justify-center">
                  {qual.icon}
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">{qual.title}</h3>
                <p className="text-gray-600 text-sm mb-1">{qual.institution}</p>
                <p className="text-brand font-medium text-sm">{qual.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const tExperience = useTranslations('about.experience');
  
  const experiences = [
    {
      title: tExperience('studentsTitle'),
      description: tExperience('studentsDescription'),
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: tExperience('successTitle'),
      description: tExperience('successDescription'),
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: tExperience('yearsTitle'),
      description: tExperience('yearsDescription'),
      icon: <Award className="h-6 w-6" />,
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">{tExperience('title')}</h2>
          <p className="lead max-w-2xl mx-auto">
            {tExperience('subtitle')}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {experiences.map((exp, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center mx-auto mb-4">
                {exp.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h3>
              <p className="text-gray-600">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const tPhilosophy = useTranslations('about.philosophy');
  
  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">{tPhilosophy('title')}</h2>
          <p className="lead max-w-2xl mx-auto">
            {tPhilosophy('subtitle')}
          </p>
        </div>

        <div className="space-y-12">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
                <Target className="h-6 w-6 text-brand" />
                <span>{tPhilosophy('personalizedTitle')}</span>
              </h3>
              <p className="text-gray-600">
                {tPhilosophy('personalizedDescription')}
              </p>
            </div>
            <div className="bg-accent/10 rounded-2xl p-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">{tPhilosophy('approachTitle')}</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>{tPhilosophy('approach1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>{tPhilosophy('approach2')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>{tPhilosophy('approach3')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>{tPhilosophy('approach4')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="bg-accent/10 rounded-2xl p-6 md:order-2">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">{tPhilosophy('principlesTitle')}</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>{tPhilosophy('principle1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>{tPhilosophy('principle2')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>{tPhilosophy('principle3')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>{tPhilosophy('principle4')}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4 md:order-1">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
                <Rocket className="h-6 w-6 text-brand" />
                <span>{tPhilosophy('confidenceTitle')}</span>
              </h3>
              <p className="text-gray-600">
                {tPhilosophy('confidenceDescription')}
              </p>
            </div>
          </div>

          <div className="text-center bg-brand text-white rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4">{tPhilosophy('ctaTitle')}</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {tPhilosophy('ctaDescription')}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/booking">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-brand hover:bg-gray-50">
                  {tPhilosophy('ctaButton1')}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                  {tPhilosophy('ctaButton2')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const tCta = useTranslations('about.aboutCta');
  
  return (
    <section className="section bg-brand text-white">
      <div className="container text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold sm:text-4xl">
            {tCta('title')}
          </h2>
          <p className="text-xl text-blue-100">
            {tCta('subtitle')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/booking">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto bg-white text-brand hover:bg-gray-50"
              >
                {tCta('bookButton')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="ghost"
                className="w-full sm:w-auto text-white border-white hover:bg-white/10"
              >
                {tCta('contactButton')}
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