import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Pricing & Packages | AM Teachings - Affordable English & IELTS Lessons',
  description: 'Transparent pricing for English lessons and IELTS preparation. Choose from single lessons or discounted packages. Book your lesson with Aya Mohsen today.',
  keywords: 'English lesson pricing, IELTS preparation cost, online English tutor rates, lesson packages',
};

function HeroSection() {
  return (
    <section className="section bg-gradient-to-br from-brand-light to-white">
      <div className="container text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple, Transparent <span className="text-brand">Pricing</span>
          </h1>
          <p className="lead">
            Invest in your future with affordable, high-quality English lessons. 
            No hidden fees, just excellent value for exceptional teaching.
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const packages = [
    {
      name: 'Single Lesson',
      price: 50,
      description: 'Perfect for trying out my teaching style',
      features: [
        '60-minute personalized lesson',
        'Customized learning materials',
        'Lesson recording for review',
        'Homework assignments',
        'Progress assessment',
      ],
      popular: false,
      buttonText: 'Book Single Lesson',
      savings: null,
    },
    {
      name: 'Popular Package',
      subtitle: '5 Lessons',
      price: 225,
      originalPrice: 250,
      description: 'Great for focused improvement in specific areas',
      features: [
        '5 × 60-minute lessons',
        'Personalized study plan',
        'Progress tracking & feedback',
        'Practice materials included',
        'Email support between lessons',
        'Flexible scheduling',
      ],
      popular: true,
      buttonText: 'Choose Popular Package',
      savings: 25,
    },
    {
      name: 'Best Value',
      subtitle: '10 Lessons',
      price: 450,
      originalPrice: 500,
      description: 'Comprehensive program for significant improvement',
      features: [
        '10 × 60-minute lessons',
        'Complete learning pathway',
        'Weekly progress reports',
        'Custom practice exercises',
        'Priority booking & support',
        'IELTS mock tests (if applicable)',
        'Certificate of completion',
      ],
      popular: false,
      buttonText: 'Get Best Value',
      savings: 50,
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">Choose Your Package</h2>
          <p className="lead max-w-2xl mx-auto">
            All lessons are 60 minutes long and include personalized materials, 
            progress tracking, and ongoing support.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${
                pkg.popular ? 'border-2 border-brand shadow-xl scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 inset-x-0 bg-brand text-white text-center py-2 text-sm font-medium">
                  Most Popular Choice
                </div>
              )}
              <CardHeader className={pkg.popular ? 'pt-10' : ''}>
                <div className="text-center space-y-2">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  {pkg.subtitle && (
                    <p className="text-gray-600 font-medium">{pkg.subtitle}</p>
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl font-bold text-brand">${pkg.price}</span>
                      {pkg.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">${pkg.originalPrice}</span>
                      )}
                    </div>
                    {pkg.savings && (
                      <div className="text-sm text-green-600 font-medium">
                        Save ${pkg.savings}
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      {pkg.name === 'Single Lesson' ? 'per lesson' : 'total package'}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{pkg.description}</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mt-1 mr-3 flex-shrink-0">✓</span>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/booking">
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-brand hover:bg-brand-dark' : ''}`}
                    variant={pkg.popular ? 'primary' : 'outline'}
                  >
                    {pkg.buttonText}
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

function SpecializedPricingSection() {
  const specialized = [
    {
      title: 'IELTS Intensive Program',
      price: 600,
      duration: '8 weeks',
      description: 'Comprehensive IELTS preparation with guaranteed score improvement',
      features: [
        '12 × 60-minute lessons',
        '4 full-length practice tests',
        'Speaking mock interviews',
        'Writing task corrections',
        'Study materials included',
        'Score improvement guarantee',
      ],
    },
    {
      title: 'Business English Package',
      price: 400,
      duration: '6 weeks',
      description: 'Professional communication skills for the workplace',
      features: [
        '8 × 60-minute lessons',
        'Industry-specific vocabulary',
        'Presentation skills training',
        'Meeting participation practice',
        'Email writing improvement',
        'Professional networking language',
      ],
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">Specialized Programs</h2>
          <p className="lead max-w-2xl mx-auto">
            Intensive programs designed for specific goals and faster results.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {specialized.map((program, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <div className="space-y-2">
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-brand">${program.price}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {program.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{program.description}</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-brand mt-1 mr-2 flex-shrink-0">•</span>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/booking">
                  <Button variant="outline" className="w-full">
                    Enroll Now
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

function FAQSection() {
  const faqs = [
    {
      question: 'Do you offer free trial lessons?',
      answer: 'Yes! I offer a 30-minute free consultation to discuss your goals and teaching approach. This helps us determine if we&apos;re a good fit before committing to lessons.',
    },
    {
      question: 'What if I need to cancel or reschedule?',
      answer: 'You can cancel or reschedule lessons up to 24 hours in advance without penalty. Cancellations with less than 24 hours notice will be charged as normal.',
    },
    {
      question: 'Are the materials included in the price?',
      answer: 'Yes, all digital learning materials are included. This includes worksheets, practice exercises, audio files, and any specialized content for your lessons.',
    },
    {
      question: 'How do I pay for lessons?',
      answer: 'Payment is made securely online through Stripe. You can pay by credit card, debit card, or bank transfer. Payment is required before lessons begin.',
    },
    {
      question: 'Do you offer discounts for students?',
      answer: 'I offer a 15% discount for full-time students and unemployed individuals. Please contact me with proof of status to arrange the discount.',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="lead max-w-2xl mx-auto">
            Everything you need to know about lessons, pricing, and booking.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
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
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-blue-100">
            Book your free consultation today and take the first step toward English mastery.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/booking">
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full sm:w-auto bg-white text-brand hover:bg-gray-50"
              >
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="ghost" 
                className="w-full sm:w-auto text-white border-white hover:bg-white/10"
              >
                Have Questions?
              </Button>
            </Link>
          </div>
          <div className="pt-4 text-sm text-blue-200">
            ✓ No commitment required ✓ 30-minute consultation ✓ Personalized learning plan
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <>
      <HeroSection />
      <PricingSection />
      <SpecializedPricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}