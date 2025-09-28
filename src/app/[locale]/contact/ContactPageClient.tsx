'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input, Textarea, Label } from '@/components/ui/Input';
import {
  Clock,
  Globe,
  MessageCircle,
  Linkedin,
  Send,
  MapPin,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import {
  createWhatsAppUrl,
  createEmailUrl,
  WHATSAPP_MESSAGES,
} from '@/lib/constants';

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
  general?: string;
}

function ContactForm() {
  const tContact = useTranslations('contact');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    lessonType: 'general',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Enhanced validation
    if (!formData.name.trim()) {
      newErrors.name = tContact('form.validation.nameRequired');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = tContact('form.validation.nameMinLength');
    } else if (formData.name.trim().length > 100) {
      newErrors.name = tContact('form.validation.nameMaxLength');
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = tContact('form.validation.nameInvalid');
    }

    if (!formData.email.trim()) {
      newErrors.email = tContact('form.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = tContact('form.validation.emailInvalid');
    } else if (formData.email.length > 255) {
      newErrors.email = tContact('form.validation.emailTooLong');
    }

    if (!formData.message.trim()) {
      newErrors.message = tContact('form.validation.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = tContact('form.validation.messageMinLength');
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = tContact('form.validation.messageTooLong');
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
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          lessonType: 'general',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        if (result.details) {
          const fieldErrors: FormErrors = {};
          result.details.forEach((detail: any) => {
            fieldErrors[detail.field as keyof FormErrors] = detail.message;
          });
          setErrors(fieldErrors);
        } else {
          setErrors({
            general: result.error || 'An error occurred. Please try again.',
          });
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrors({
        general: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Send className="h-6 w-6 text-brand" />
          <span>{tContact('sendMessage')}</span>
        </CardTitle>
        <p className="text-gray-600">{tContact('sendMessageDescription')}</p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">
                  {tContact('form.successTitle')}
                </p>
                <p className="text-green-700 text-sm">
                  {tContact('form.successMessage')}
                </p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">
                  Error sending message
                </p>
                <p className="text-red-700 text-sm">
                  {errors.general || tContact('form.errorMessage')}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {tContact('form.name')} {tContact('form.required')}
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : ''
                }`}
                placeholder={tContact('form.namePlaceholder')}
                maxLength={100}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {tContact('form.email')} {tContact('form.required')}
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : ''
                }`}
                placeholder={tContact('form.emailPlaceholder')}
                maxLength={255}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          <div>
            <Label
              htmlFor="lessonType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {tContact('form.lessonType')}
            </Label>
            <select
              id="lessonType"
              name="lessonType"
              value={formData.lessonType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand cursor-pointer"
            >
              <option value="general">{tContact('lessonTypes.general')}</option>
              <option value="ielts">{tContact('lessonTypes.ielts')}</option>
              <option value="individual">
                {tContact('lessonTypes.individual')}
              </option>
              <option value="group">{tContact('lessonTypes.group')}</option>
              <option value="business">
                {tContact('lessonTypes.business')}
              </option>
              <option value="conversation">
                {tContact('lessonTypes.conversation')}
              </option>
              <option value="other">{tContact('lessonTypes.other')}</option>
            </select>
          </div>

          <div>
            <Label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {tContact('form.message')} {tContact('form.required')}
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full ${
                errors.message
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : ''
              }`}
              placeholder={tContact('form.messagePlaceholder')}
              maxLength={2000}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.message ? (
                <p className="text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.message}</span>
                </p>
              ) : (
                <span></span>
              )}
              <span className="text-xs text-gray-500">
                {tContact('charactersCount', {
                  count: formData.message.length,
                })}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto flex items-center justify-center space-x-2 min-w-[200px]"
          >
            <Send className="h-4 w-4" />
            <span>
              {isSubmitting
                ? tContact('form.sending')
                : tContact('form.submit')}
            </span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function ContactMethods() {
  const tContact = useTranslations('contact');

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.ABOUT_INQUIRY), '_blank');
  };

  const handleEmailContact = () => {
    window.open(createEmailUrl(), '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {tContact('getInTouch')}
        </h2>
        <p className="text-gray-600 mb-6">
          {tContact('getInTouchDescription')}
        </p>
      </div>

      {/* WhatsApp Contact - Primary Method */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0 w-14 h-14 bg-green-600 text-white rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {tContact('methods.whatsappTitle')}
              </h3>
              <p className="text-green-700 font-medium">
                {tContact('methods.whatsappSubtitle')}
              </p>
              <p className="text-sm text-green-600">
                {tContact('methods.whatsappDescription')}
              </p>
            </div>
          </div>
          <Button
            onClick={handleWhatsAppContact}
            className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center space-x-2 text-lg py-3"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{tContact('methods.whatsappButton')}</span>
          </Button>
        </CardContent>
      </Card>
      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Clock className="h-6 w-6 text-brand" />
          <div>
            <h4 className="font-semibold text-gray-900">
              {tContact('responseTime')}
            </h4>
            <p className="text-sm text-gray-600">
              {tContact('responseTimeValue')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Globe className="h-6 w-6 text-brand" />
          <div>
            <h4 className="font-semibold text-gray-900">
              {tContact('availability')}
            </h4>
            <p className="text-sm text-gray-600">
              {tContact('availabilityValue')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <MapPin className="h-6 w-6 text-brand" />
          <div>
            <h4 className="font-semibold text-gray-900">
              {tContact('location')}
            </h4>
            <p className="text-sm text-gray-600">{tContact('locationValue')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactFormSection() {
  const tContact = useTranslations('contact');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {tContact('contactForm')}
        </h2>
        <p className="text-gray-600 mb-6">
          {tContact('contactFormDescription')}
        </p>
      </div>
      <ContactForm />
    </div>
  );
}

function SocialLinks() {
  const tContact = useTranslations('contact');
  const tFooter = useTranslations('footer');

  const socialLinks = [
    {
      name: tFooter('socialLinkedIn'),
      href: '#',
      icon: <Linkedin className="h-6 w-6" />,
      color: 'hover:text-blue-600 hover:bg-blue-50',
      description: 'Professional network',
    },
  ];

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          {tContact('connectSocial')}
        </h3>
        <div className="flex justify-center space-x-4">
          {socialLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className={`p-4 bg-gray-100 rounded-xl text-gray-600 transition-all duration-200 ${link.color} group cursor-pointer`}
              aria-label={link.name}
              title={link.description}
            >
              <div className="group-hover:scale-110 transition-transform duration-200">
                {link.icon}
              </div>
            </a>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Follow for English learning tips and updates
        </p>
      </CardContent>
    </Card>
  );
}

export default function ContactPageClient() {
  const tContact = useTranslations('contact');

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {tContact('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {tContact('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Methods - Left Column */}
          <div>
            <ContactMethods />
          </div>

          {/* Contact Form - Right Column */}
          <div>
            <ContactFormSection />
          </div>
        </div>

        {/* Social Links */}
        <div className="max-w-md mx-auto mt-12">
          <SocialLinks />
        </div>

        {/* Additional Help Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-gradient-to-r from-brand/5 to-blue-50 border-brand/20">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {tContact('needImmediate')}
              </h3>
              <p className="text-gray-600 mb-6">
                {tContact('needImmediateDescription')}
              </p>
              <Button
                onClick={() => {
                  window.open(
                    createWhatsAppUrl(WHATSAPP_MESSAGES.URGENT_HELP),
                    '_blank'
                  );
                }}
                size="lg"
                className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{tContact('whatsappUrgent')}</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
