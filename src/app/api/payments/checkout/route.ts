import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe, getLessonPrice, formatPrice } from '@/lib/stripe';
import { z } from 'zod';

const checkoutSchema = z.object({
  lessonType: z.enum(['individual', 'group', 'general', 'ielts']),
  durationMin: z.number().min(30).max(90),
  date: z.string(),
  time: z.string(),
  notes: z.string().optional(),
  studentInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    experience: z.string(),
    goals: z.string(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = checkoutSchema.parse(body);
    
    const { lessonType, durationMin, date, time, notes, studentInfo } = validatedData;
    
    // Get price based on lesson type and duration
    const priceInCents = getLessonPrice(lessonType, durationMin as 30 | 60 | 90);
    
    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${lessonType.charAt(0).toUpperCase() + lessonType.slice(1)} Lesson`,
              description: `${durationMin} minute ${lessonType} lesson on ${date} at ${time}${notes ? ` - ${notes}` : ''}`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/bookings?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/book?canceled=true`,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.email,
        lessonType,
        durationMin: durationMin.toString(),
        date,
        time,
        notes: notes || '',
        studentName: studentInfo?.name || session.user.name || '',
        studentEmail: studentInfo?.email || session.user.email || '',
        studentPhone: studentInfo?.phone || '',
        studentExperience: studentInfo?.experience || '',
        studentGoals: studentInfo?.goals || '',
      },
    });

    return NextResponse.json({ 
      sessionId: checkoutSession.id,
      url: checkoutSession.url 
    });

  } catch (error) {
    console.error('Checkout error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}