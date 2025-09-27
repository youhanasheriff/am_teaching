'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Mail,
  Globe,
  Clock,
  MessageCircle,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  CONTACT_INFO,
  createWhatsAppUrl,
  WHATSAPP_MESSAGES,
} from '@/lib/constants';

export default function Footer() {
  const t = useTranslations('navigation');
  const tFooter = useTranslations('footer');

  const navigation = {
    main: [
      { name: t('about'), href: '/about' as const },
      { name: t('services'), href: '/services' as const },
      { name: t('blog'), href: '/blog' as const },
      { name: t('contact'), href: '/contact' as const },
    ],
    legal: [
      { name: tFooter('privacyPolicy'), href: '/privacy' as const },
      { name: tFooter('termsOfService'), href: '/terms' as const },
    ],
    social: [
      {
        name: tFooter('socialLinkedIn'),
        href: '#',
        icon: <Linkedin className="h-6 w-6" />,
      },
    ],
  };

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL_INQUIRY), '_blank');
  };

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {tFooter('footerHeading')}
      </h2>
      <div className="container py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            {/* Logo and description */}
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white font-bold text-lg">
                AM
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  {tFooter('brandName')}
                </span>
                <p className="text-sm text-gray-400 -mt-1">
                  {tFooter('brandTagline')}
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              {tFooter('description')}
            </p>

            {/* WhatsApp Contact */}
            <div className="bg-green-900/30 border border-green-800 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <MessageCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-green-400">
                  {tFooter('quickContact')}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                {tFooter('quickContactDescription')}
              </p>
              <Button
                onClick={handleWhatsAppContact}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{tFooter('messageWhatsApp')}</span>
              </Button>
            </div>

            <div className="flex space-x-6">
              {navigation.social.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-brand transition-colors duration-200 cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {tFooter('navigation')}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-400 hover:text-brand transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {tFooter('contact')}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm leading-6 text-gray-400">
                      {CONTACT_INFO.EMAIL}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-sm leading-6 text-gray-400">
                      {tFooter('onlineLessons')}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm leading-6 text-gray-400">
                      {tFooter('availableSchedule')}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {tFooter('quickLinks')}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm leading-6 text-brand hover:text-brand-dark transition-colors duration-200 font-medium"
                    >
                      {tFooter('contactMe')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-sm leading-6 text-gray-400 hover:text-brand transition-colors duration-200"
                    >
                      {tFooter('teachingServices')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-sm leading-6 text-gray-400 hover:text-brand transition-colors duration-200"
                    >
                      {tFooter('learningResources')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 lg:mt-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {navigation.legal.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm leading-6 text-gray-400 hover:text-brand transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <p className="mt-8 text-sm leading-5 text-gray-400 md:order-1 md:mt-0">
              {tFooter('copyrightExtended', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
