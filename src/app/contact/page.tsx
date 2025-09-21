'use client';

import type { Metadata } from 'next';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input, Textarea, Label } from '@/components/ui/Input';

// Note: This metadata should be exported from a server component wrapper
// For now, we'll add it via the parent layout or create a separate metadata export

interface FormData {
  name: string;
  email: string;
  lessonType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    lessonType: 'general',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', lessonType: 'general', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Send Me a Message</CardTitle>
        <p className="text-gray-600 text-center">
          I'd love to hear from you. Send me a message and I'll respond as soon as possible.
        </p>
      </CardHeader>
      <CardContent>
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">
              ✓ Thank you for your message! I'll get back to you within 24 hours.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">
              ✗ Sorry, there was an error sending your message. Please try again or email me directly.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'border-red-500' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'border-red-500' : ''}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="lessonType">I'm interested in</Label>
            <select
              id="lessonType"
              name="lessonType"
              value={formData.lessonType}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="general">General English Lessons</option>
              <option value="ielts">IELTS Preparation</option>
              <option value="business">Business English</option>
              <option value="academic">Academic English</option>
              <option value="conversation">Conversation Practice</option>
              <option value="other">Other / General Inquiry</option>
            </select>
          </div>

          <div>
            <Label htmlFor="message">Your Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={errors.message ? 'border-red-500' : ''}
              placeholder="Tell me about your English learning goals, current level, or any questions you have..."
              rows={5}
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full"
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function ContactInfo() {
  const contactDetails = [
    {
      icon: '📧',
      title: 'Email',
      content: 'aya@amteachings.com',
      description: 'Send me an email anytime'
    },
    {
      icon: '🌍',
      title: 'Online Lessons',
      content: 'Available Worldwide',
      description: 'Virtual lessons via Google Meet'
    },
    {
      icon: '🕒',
      title: 'Availability',
      content: '7 Days a Week',
      description: 'Flexible scheduling to fit your timezone'
    },
    {
      icon: '⚡',
      title: 'Response Time',
      content: 'Within 24 Hours',
      description: 'Quick replies to all inquiries'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {contactDetails.map((detail, index) => (
        <Card key={index} className="text-center group">
          <CardContent className="pt-6">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-200 mb-3">
              {detail.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{detail.title}</h3>
            <p className="text-brand font-medium mb-2">{detail.content}</p>
            <p className="text-gray-600 text-sm">{detail.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SocialLinks() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Connect with Me</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Follow me on social media for English learning tips, IELTS strategies, and student success stories.
      </p>
      <div className="flex justify-center space-x-6">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="text-gray-400 hover:text-brand transition-colors duration-200"
            aria-label={`Follow on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-brand-light to-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Get in <span className="text-brand">Touch</span>
            </h1>
            <p className="lead">
              Ready to start your English learning journey? Have questions about my teaching methods? 
              I'm here to help you achieve your language goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="section-title">How to Reach Me</h2>
            <p className="lead max-w-2xl mx-auto">
              Multiple ways to get in touch. I respond to all inquiries personally and promptly.
            </p>
          </div>
          <ContactInfo />
        </div>
      </section>

      {/* Contact Form */}
      <section className="section bg-gray-50">
        <div className="container">
          <ContactForm />
        </div>
      </section>

      {/* Social Links */}
      <section className="section">
        <div className="container">
          <SocialLinks />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="section-title">Quick Answers</h2>
              <p className="lead">
                Common questions I receive from prospective students.
              </p>
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">How quickly do you respond to inquiries?</h3>
                  <p className="text-gray-600">I respond to all messages within 24 hours, often much sooner. If you need urgent assistance, mention it in your message.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Can we schedule a free consultation?</h3>
                  <p className="text-gray-600">Absolutely! I offer a 30-minute free consultation to discuss your goals, assess your level, and see if we're a good fit.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What information should I include in my message?</h3>
                  <p className="text-gray-600">Tell me about your current English level, learning goals, preferred schedule, and any specific areas you'd like to focus on.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}