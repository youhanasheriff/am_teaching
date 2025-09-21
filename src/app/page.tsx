import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'AM Teachings | English & IELTS Excellence with Aya Mohsen',
  description: 'Master English and excel in IELTS with personalized lessons from expert teacher Aya Mohsen. Join 500+ successful students with 95% IELTS success rate.',
  keywords: 'English lessons, IELTS preparation, online English tutor, Aya Mohsen, English learning, IELTS coaching, English teacher',
  openGraph: {
    title: 'AM Teachings | English & IELTS Excellence with Aya Mohsen',
    description: 'Master English and excel in IELTS with personalized lessons from expert teacher Aya Mohsen. Join 500+ successful students with 95% IELTS success rate.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AM Teachings - English & IELTS Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AM Teachings | English & IELTS Excellence with Aya Mohsen',
    description: 'Master English and excel in IELTS with personalized lessons from expert teacher Aya Mohsen.',
    images: ['/og-image.jpg'],
  },
};

function HeroSection() {
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
                Join hundreds of successful students who&apos;ve achieved their language goals.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/booking">
                <Button size="lg" className="w-full sm:w-auto">
                  Book Your First Lesson
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
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
      icon: '🌱',
    },
    {
      title: 'Intermediate English',
      description: 'Develop fluency and confidence in everyday communication and writing.',
      icon: '🚀',
    },
    {
      title: 'Advanced English',
      description: 'Master complex grammar, idioms, and professional communication skills.',
      icon: '🎯',
    },
    {
      title: 'IELTS Preparation',
      description: 'Comprehensive training for all four IELTS modules with proven strategies.',
      icon: '🏆',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">Choose Your Learning Path</h2>
          <p className="lead max-w-2xl mx-auto">
            Whether you&apos;re starting your English journey or preparing for IELTS, 
            I have the perfect program for you.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="text-center group">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
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
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
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
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center">
            <Link href="/booking">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto bg-white text-brand hover:bg-gray-50"
              >
                Book Your Free Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="ghost"
                className="w-full sm:w-auto text-white border-white hover:bg-white/10"
              >
                Have Questions? Contact Me
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "AM Teachings",
    "description": "Expert English and IELTS preparation with personalized lessons from Aya Mohsen",
    "url": process.env.SITE_URL || "https://amteachings.com",
    "logo": `${process.env.SITE_URL || "https://amteachings.com"}/logo.png`,
    "founder": {
      "@type": "Person",
      "name": "Aya Mohsen",
      "jobTitle": "English Teacher & IELTS Specialist",
      "description": "Certified English teacher with 8+ years of experience"
    },
    "offers": [
      {
        "@type": "Service",
        "name": "English Lessons",
        "description": "Personalized English lessons for all levels",
        "provider": {
          "@type": "Person",
          "name": "Aya Mohsen"
        }
      },
      {
        "@type": "Service", 
        "name": "IELTS Preparation",
        "description": "Comprehensive IELTS preparation with 95% success rate",
        "provider": {
          "@type": "Person",
          "name": "Aya Mohsen"
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "500",
      "bestRating": "5"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "customer service",
      "email": "aya@amteachings.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <ServicesPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
