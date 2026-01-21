/**
 * Contact Information Constants
 * Centralized storage for all contact-related values used throughout the application
 */

export const CONTACT_INFO = {
  /**
   * Primary email address for Aya Mohsen
   */
  EMAIL: "ayamohsen57@gmail.com" as const,

  /**
   * Telegram username
   */
  TELEGRAM_USERNAME: "@AyaMohsen52" as const,

  /**
   * Telegram username for display purposes (without @)
   */
  TELEGRAM_DISPLAY: "AyaMohsen52" as const,
} as const;

/**
 * Pre-defined Telegram message templates for different contexts
 */
export const TELEGRAM_MESSAGES = {
  GENERAL_INQUIRY:
    "Hello! I'm interested in English lessons. Could you please provide more information?",
  SERVICES_INQUIRY:
    "Hello! I'm interested in your English learning services. Could you provide more information?",
  ABOUT_INQUIRY:
    "Hello Aya! I found your website and I'm interested in learning more about your English teaching services.",
  URGENT_HELP:
    "Hello Aya! I need immediate assistance with English learning. Could you help me?",
  HERO_CTA:
    "Hello! I'm interested in English lessons with AM Teachings. Could you please provide more information?",
  READY_TO_START:
    "Hello Aya! I'm ready to start my English learning journey. Could you please provide more information about your teaching services?",
} as const;

/**
 * Email templates for mailto links
 */
export const EMAIL_TEMPLATES = {
  SUBJECT: "English Lessons Inquiry",
  BODY: "Hello Aya,\n\nI'm interested in learning more about your English teaching services.\n\nBest regards,",
} as const;

/**
 * Helper function to create Telegram URL with message
 */
export const createTelegramUrl = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://t.me/${CONTACT_INFO.TELEGRAM_DISPLAY}?text=${encodedMessage}`;
};

/**
 * Backward compatibility - WhatsApp functions now redirect to Telegram
 * @deprecated Use createTelegramUrl instead
 */
export const createWhatsAppUrl = createTelegramUrl;
export const WHATSAPP_MESSAGES = TELEGRAM_MESSAGES;

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
export type TelegramMessages = typeof TELEGRAM_MESSAGES;
export type EmailTemplates = typeof EMAIL_TEMPLATES;
