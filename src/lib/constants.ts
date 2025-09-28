/**
 * Contact Information Constants
 * Centralized storage for all contact-related values used throughout the application
 */

export const CONTACT_INFO = {
  /**
   * Primary email address for Aya Mohsen
   */
  EMAIL: 'ayahmohsen97@gmail.com' as const,

  /**
   * WhatsApp phone number (replace with actual number)
   */
  WHATSAPP_NUMBER: '+1234567890' as const,

  /**
   * Formatted WhatsApp number for display purposes
   */
  WHATSAPP_DISPLAY: '+1 (234) 567-8890' as const,
} as const;

/**
 * Pre-defined WhatsApp message templates for different contexts
 */
export const WHATSAPP_MESSAGES = {
  GENERAL_INQUIRY:
    "Hello! I'm interested in English lessons. Could you please provide more information?",
  SERVICES_INQUIRY:
    "Hello! I'm interested in your English learning services. Could you provide more information?",
  ABOUT_INQUIRY:
    "Hello Aya! I found your website and I'm interested in learning more about your English teaching services.",
  URGENT_HELP:
    'Hello Aya! I need immediate assistance with English learning. Could you help me?',
  HERO_CTA:
    "Hello! I'm interested in English lessons with AM Teachings. Could you please provide more information?",
  READY_TO_START:
    "Hello Aya! I'm ready to start my English learning journey. Could you please provide more information about your teaching services?",
} as const;

/**
 * Email templates for mailto links
 */
export const EMAIL_TEMPLATES = {
  SUBJECT: 'English Lessons Inquiry',
  BODY: "Hello Aya,\n\nI'm interested in learning more about your English teaching services.\n\nBest regards,",
} as const;

/**
 * Helper function to create WhatsApp URL with message
 */
export const createWhatsAppUrl = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONTACT_INFO.WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

/**
 * Helper function to create mailto URL with subject and body
 */
export const createEmailUrl = (subject?: string, body?: string): string => {
  const emailSubject = encodeURIComponent(subject || EMAIL_TEMPLATES.SUBJECT);
  const emailBody = encodeURIComponent(body || EMAIL_TEMPLATES.BODY);
  return `mailto:${CONTACT_INFO.EMAIL}?subject=${emailSubject}&body=${emailBody}`;
};

/**
 * Type definitions for contact information
 */
export type ContactInfo = typeof CONTACT_INFO;
export type WhatsAppMessages = typeof WHATSAPP_MESSAGES;
export type EmailTemplates = typeof EMAIL_TEMPLATES;
