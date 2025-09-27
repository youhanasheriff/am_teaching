'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, MessageCircle } from 'lucide-react';
import { createWhatsAppUrl, WHATSAPP_MESSAGES } from '@/lib/constants';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    return pathname === href;
  };

  const handleWhatsAppContact = () => {
    window.open(createWhatsAppUrl(WHATSAPP_MESSAGES.GENERAL_INQUIRY), '_blank');
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white font-bold text-lg">
            AM
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-bold text-gray-900">
              AM Teachings
            </span>
            <p className="text-sm text-gray-500 -mt-1">English & IELTS</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? 'text-brand'
                  : 'text-gray-600 hover:text-brand'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Contact Buttons */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-3">
            <Link href="/contact">
              <Button size="sm">Contact Me</Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsAppContact}
              className="flex items-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="border-t border-gray-200 bg-white px-4 pb-6 pt-4 shadow-lg">
            <div className="space-y-1">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-brand-light text-brand'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-brand'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center">Contact Me</Button>
              </Link>
              <Button
                variant="outline"
                className="w-full justify-center flex items-center space-x-2"
                onClick={() => {
                  handleWhatsAppContact();
                  setMobileMenuOpen(false);
                }}
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Me</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
