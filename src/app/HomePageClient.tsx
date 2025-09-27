'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { MessageCircle, Star, Sprout, Rocket, Target, Trophy } from 'lucide-react';

function HeroSection() {
  const handleWhatsAppContact = () => {
    const phoneNumber = '+1234567890'; // Replace with actual WhatsApp number
    const message = encodeURIComponent('Hello! I\'m interested in English lessons with AM Teachings. Could you please provide more information?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="section bg-gradient-to-br from-brand-light to-white">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Master English with{' '}
                <span className="text-brand">Aya Mohsen</span>
              </h1>
              <p className="lead max-w-2xl">
                Transform your English skills through personalized lessons and expert IELTS preparation. 
                Join hundreds of successful students who've achieved their language goals.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto flex items-center space-x-2"
                onClick={handleWhatsAppContact}
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp Me Now</span>
              </Button>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Email Contact
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Explore Services →
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand">500+</div>
                <div className="text-sm text-gray-600">Students Taught</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand">95%</div>
                <div className="text-sm text-gray-600">IELTS Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand">5⭐</div>
                <div className="text-sm text-gray-600">Average Rating</div>
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
                  <h3 className="text-xl font-semibold text-gray-900">Aya Mohsen</h3>
                  <p className="text-gray-600">Certified English Teacher</p>
                  <p className="text-sm text-gray-500">IELTS Specialist • 8+ Years Experience</p>
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
  const services = [
    {
      title: 'Beginner English',
      description: 'Build strong foundations with grammar, vocabulary, and basic conversation skills.',
      icon: <Sprout className="h-8 w-8" />,
    },
    {
      title: 'Intermediate English',
      description: 'Develop fluency and confidence in everyday communication and writing.',
      icon: <Rocket className="h-8 w-8" />,
    },
    {
      title: 'Advanced English',
      description: 'Master complex grammar, idioms, and professional communication skills.',
      icon: <Target className="h-8 w-8" />,
    },
    {
      title: 'IELTS Preparation',
      description: 'Comprehensive training for all four IELTS modules with proven strategies.',
      icon: <Trophy className="h-8 w-8" />,
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">Choose Your Learning Path</h2>
          <p className="lead max-w-2xl mx-auto">
            Whether you're starting your English journey or preparing for IELTS, 
            I have the perfect program for you.
          </p>
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
            <Button variant="outline">View All Services</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Aya helped me jump from IELTS 5.5 to 7.5 in just two months! Her teaching methods are incredibly effective.",
      name: "Mariam Al-Rashid",
      role: "IELTS Student",
      score: "7.5 IELTS"
    },
    {
      quote: "Clear explanations and fun lessons. My speaking confidence soared after just a few sessions with Aya.",
      name: "Omar Hassan",
      role: "Intermediate Student",
      score: "Fluent Speaker"
    },
    {
      quote: "Finally, I understand phrasal verbs! Aya's structured approach made complex grammar simple.",
      name: "Sarah Ahmed",
      role: "Advanced Student",
      score: "Grammar Master"
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">What Students Say</h2>
          <p className="lead">
            Real results from learners at every level.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
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
  const handleWhatsAppContact = () => {
    const phoneNumber = '+1234567890';
    const message = encodeURIComponent('Hello Aya! I\'m ready to start my English learning journey. Could you please provide more information about your teaching services?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="section bg-brand text-white">
      <div className="container text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Transform Your English?
          </h2>
          <p className="text-xl text-blue-100">
            Join hundreds of successful students and start your journey to English mastery today.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="w-full sm:w-auto bg-white text-brand hover:bg-gray-50 flex items-center space-x-2"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="h-5 w-5" />
              <span>Start with WhatsApp</span>
            </Button>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="ghost"
                className="w-full sm:w-auto text-white border-white hover:bg-white/10"
              >
                Email Contact Form
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