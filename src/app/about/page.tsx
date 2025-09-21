import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About Aya Mohsen | AM Teachings - Expert English & IELTS Teacher',
  description: 'Meet Aya Mohsen, certified English teacher and IELTS specialist with 8+ years of experience helping students achieve their language goals.',
  keywords: 'Aya Mohsen, English teacher, IELTS specialist, English tutor, language learning',
};

function HeroSection() {
  return (
    <section className="section bg-gradient-to-br from-brand-light to-white">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Meet <span className="text-brand">Aya Mohsen</span>
              </h1>
              <p className="lead">
                Passionate English educator with 8+ years of experience helping students 
                from beginner to advanced levels achieve their language learning goals.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/booking">
                <Button size="lg" className="w-full sm:w-auto">
                  Book a Lesson with Me
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Get in Touch
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
                  <p className="text-gray-600 font-medium">M.A. Applied Linguistics</p>
                  <p className="text-sm text-gray-500">IELTS Band 9 Certified</p>
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
  const qualifications = [
    {
      title: 'Master of Applied Linguistics',
      institution: 'University of Edinburgh',
      year: '2016',
      icon: '🎓',
    },
    {
      title: 'IELTS Band 9 Certificate',
      institution: 'British Council',
      year: '2015',
      icon: '🏆',
    },
    {
      title: 'TESOL Certification',
      institution: 'Cambridge Assessment',
      year: '2015',
      icon: '📜',
    },
    {
      title: 'Advanced Teaching Methodology',
      institution: 'Oxford University Press',
      year: '2017',
      icon: '📚',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">Qualifications & Certifications</h2>
          <p className="lead max-w-2xl mx-auto">
            Academic excellence meets practical teaching experience to deliver 
            exceptional language learning outcomes.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {qualifications.map((qual, index) => (
            <Card key={index} className="text-center group">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
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
  const experiences = [
    {
      title: '500+ Students Taught',
      description: 'Successfully guided students from 30+ countries to achieve their English learning goals.',
      icon: '👥',
    },
    {
      title: '95% IELTS Success Rate',
      description: 'Proven track record of helping students achieve their target IELTS scores within 2-4 months.',
      icon: '📈',
    },
    {
      title: '8+ Years Experience',
      description: 'Extensive experience teaching all levels from beginner to advanced business English.',
      icon: '⏰',
    },
    {
      title: 'Personalized Approach',
      description: 'Tailored lesson plans designed to match each student&apos;s learning style and pace.',
      icon: '🎯',
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="section-title">Teaching Experience</h2>
          <p className="lead">
            Real results through proven methods and dedicated support.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {experiences.map((exp, index) => (
            <Card key={index} className="group">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
                    {exp.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-gray-600">
                      {exp.description}
                    </p>
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

function PhilosophySection() {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="section-title">My Teaching Philosophy</h2>
            <p className="lead">
              Empowering students through personalized, engaging, and effective learning experiences.
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  🌟 Student-Centered Learning
                </h3>
                <p className="text-gray-600">
                  Every student is unique, with different goals, learning styles, and challenges. 
                  I believe in creating personalized lesson plans that adapt to each student&apos;s 
                  individual needs, ensuring maximum progress and engagement.
                </p>
              </div>
              <div className="bg-brand-light rounded-2xl p-6">
                <blockquote className="text-gray-700 italic">
                  &ldquo;The best teachers are those who show you where to look, 
                  but don&apos;t tell you what to see.&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="bg-accent/10 rounded-2xl p-6 md:order-2">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Core Principles:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Build confidence through small, achievable wins</li>
                    <li>• Make learning enjoyable and relevant to real life</li>
                    <li>• Encourage mistakes as learning opportunities</li>
                    <li>• Provide consistent support and constructive feedback</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4 md:order-1">
                <h3 className="text-2xl font-semibold text-gray-900">
                  🚀 Confidence Through Practice
                </h3>
                <p className="text-gray-600">
                  Language learning is a journey that requires patience, practice, and positive 
                  reinforcement. I focus on building my students&apos; confidence by creating a 
                  supportive environment where they feel comfortable making mistakes and learning 
                  from them.
                </p>
              </div>
            </div>

            <div className="text-center bg-brand text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">My Promise to You</h3>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Whether you&apos;re preparing for IELTS, improving your business English, or starting 
                your language journey, I&apos;m committed to helping you achieve your goals with 
                patience, expertise, and genuine care for your success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section bg-gray-50">
      <div className="container text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Start Your English Journey?
          </h2>
          <p className="text-xl text-gray-600">
            Book a free consultation to discuss your goals and see how I can help you succeed.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/booking">
              <Button size="lg" className="w-full sm:w-auto">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View My Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
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