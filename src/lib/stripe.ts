import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
});

// Stripe pricing configuration
export const LESSON_PRICES = {
  individual: {
    30: 5000, // $50.00 for 30 minutes
    60: 9000, // $90.00 for 60 minutes
    90: 12000, // $120.00 for 90 minutes
  },
  group: {
    30: 3000, // $30.00 for 30 minutes
    60: 5500, // $55.00 for 60 minutes
    90: 7500, // $75.00 for 90 minutes
  },
  general: {
    30: 4000, // $40.00 for 30 minutes
    60: 7000, // $70.00 for 60 minutes
    90: 9500, // $95.00 for 90 minutes
  },
  ielts: {
    30: 5500, // $55.00 for 30 minutes
    60: 9500, // $95.00 for 60 minutes
    90: 13000, // $130.00 for 90 minutes
  },
} as const;

export type LessonType = keyof typeof LESSON_PRICES;
export type Duration = keyof typeof LESSON_PRICES[LessonType];

export function getLessonPrice(lessonType: LessonType, duration: Duration): number {
  return LESSON_PRICES[lessonType][duration];
}

export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}