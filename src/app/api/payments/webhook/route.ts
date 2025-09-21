import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import Stripe from 'stripe';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.payment_status === 'paid' && session.metadata) {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: session.metadata.userId },
          });

          // Create booking record in database if user exists
          if (user) {
            const booking = await prisma.booking.create({
              data: {
                userId: user.id,
                lessonType: session.metadata.lessonType,
                durationMin: parseInt(session.metadata.durationMin),
                provider: 'cal',
              },
            });

            // Send booking confirmation emails if Resend is configured
            if (process.env.RESEND_API_KEY) {
              const fromEmail =
                process.env.CONTACT_FROM_EMAIL || 'noreply@amteachings.com';
              const teacherEmail =
                process.env.TEACHER_EMAIL || 'aya@amteachings.com';

              const { lessonType, durationMin, date, time, notes } =
                session.metadata;
              const lessonPrice = (session.amount_total || 0) / 100; // Convert from cents to dollars

              try {
                // Send notification to teacher
                await resend.emails.send({
                  from: fromEmail,
                  to: teacherEmail,
                  subject: `New Booking Confirmed - ${lessonType} lesson`,
                  html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                      <h2 style="color: #3b82f6;">New Booking Confirmed</h2>
                      
                      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #1a1a1a;">Student Details:</h3>
                        <p><strong>Name:</strong> ${
                          user.name || 'Not provided'
                        }</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                      </div>
                      
                      <div style="background: #ffffff; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #1a1a1a;">Lesson Details:</h3>
                        <p><strong>Type:</strong> ${
                          lessonType.charAt(0).toUpperCase() +
                          lessonType.slice(1)
                        } lesson</p>
                        <p><strong>Duration:</strong> ${durationMin} minutes</p>
                        ${
                          date
                            ? `<p><strong>Requested Date:</strong> ${date}</p>`
                            : ''
                        }
                        ${
                          time
                            ? `<p><strong>Requested Time:</strong> ${time}</p>`
                            : ''
                        }
                        <p><strong>Amount Paid:</strong> $${lessonPrice}</p>
                        ${
                          notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''
                        }
                      </div>
                      
                      <p style="color: #6b7280; font-size: 14px;">
                        Booking ID: ${booking.id}<br>
                        Payment completed at: ${new Date().toLocaleString()}
                      </p>
                    </div>
                  `,
                });

                // Send confirmation to student
                await resend.emails.send({
                  from: fromEmail,
                  to: user.email || 'noreply@amteachings.com',
                  subject: 'Booking Confirmed - AM Teachings',
                  html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                      <div style="background: #3b82f6; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; font-size: 28px;">AM Teachings</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">English & IELTS Excellence</p>
                      </div>
                      
                      <div style="padding: 30px; background: white; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="color: #1a1a1a; margin-top: 0;">Booking Confirmed! 🎉</h2>
                        
                        <p style="color: #4b5563; line-height: 1.6;">
                           Thank you for your payment, ${
                             user.name ? user.name : 'valued student'
                           }! Your lesson booking has been confirmed.
                         </p>
                        
                        <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin: 25px 0;">
                          <h3 style="margin: 0 0 15px 0; color: #1a1a1a;">Your Lesson Details:</h3>
                          <p style="margin: 5px 0;"><strong>Type:</strong> ${
                            lessonType.charAt(0).toUpperCase() +
                            lessonType.slice(1)
                          } lesson</p>
                          <p style="margin: 5px 0;"><strong>Duration:</strong> ${durationMin} minutes</p>
                          ${
                            date
                              ? `<p style="margin: 5px 0;"><strong>Requested Date:</strong> ${date}</p>`
                              : ''
                          }
                          ${
                            time
                              ? `<p style="margin: 5px 0;"><strong>Requested Time:</strong> ${time}</p>`
                              : ''
                          }
                          <p style="margin: 5px 0;"><strong>Amount Paid:</strong> $${lessonPrice}</p>
                          <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${
                            booking.id
                          }</p>
                        </div>
                        
                        <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #f59e0b;">
                          <h4 style="margin: 0 0 10px 0; color: #92400e;">What's Next?</h4>
                          <p style="margin: 0; color: #92400e; font-size: 14px;">
                            I will contact you within 24 hours to schedule your lesson and provide the meeting link. 
                            Please check your email regularly for updates.
                          </p>
                        </div>
                        
                        <p style="color: #4b5563; line-height: 1.6;">
                          If you have any questions or need to reschedule, please don't hesitate to contact me.
                        </p>
                        
                        <p style="color: #4b5563; margin-bottom: 0;">
                          Looking forward to our lesson!<br>
                          <strong>Aya Mohsen</strong><br>
                          <span style="color: #6b7280;">English Teacher & IELTS Specialist</span>
                        </p>
                      </div>
                      
                      <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 14px;">
                        <p>AM Teachings | Online English Lessons Worldwide</p>
                        <p>
                          <a href="${
                            process.env.NEXTAUTH_URL || 'http://localhost:3000'
                          }/dashboard/bookings" style="color: #3b82f6; text-decoration: none;">
                            View Your Bookings
                          </a>
                        </p>
                      </div>
                    </div>
                  `,
                });

                console.log('Booking confirmation emails sent successfully');
              } catch (emailError) {
                console.error(
                  'Failed to send booking confirmation emails:',
                  emailError
                );
                // Don't fail the webhook if email sending fails
              }
            }
          }

          console.log('Booking created for session:', session.id);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
