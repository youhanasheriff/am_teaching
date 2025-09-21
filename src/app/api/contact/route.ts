import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  lessonType: z.string(),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

// Create nodemailer transporter
const createTransporter = () => {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = process.env.SMTP_PORT || '587';

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn('SMTP configuration missing. Email will not be sent.');
    return null;
  }

  return nodemailer.createTransporter({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: smtpPort === '465', // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validatedData = contactSchema.parse(body);
    
    const { name, email, lessonType, message } = validatedData;
    
    // Create email transporter
    const transporter = createTransporter();
    
    if (!transporter) {
      // If SMTP is not configured, log the message and return success
      // This allows the form to work even without email configuration
      console.log('Contact form submission (SMTP not configured):', {
        name,
        email,
        lessonType,
        message,
        timestamp: new Date().toISOString(),
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
      });
    }
    
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'noreply@amteachings.com';
    const teacherEmail = process.env.TEACHER_EMAIL || 'aya@amteachings.com';
    
    // Email to teacher (notification)
    const teacherEmailOptions = {
      from: fromEmail,
      to: teacherEmail,
      subject: `New Contact Form Submission - ${lessonType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1a1a1a;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Interested in:</strong> ${lessonType}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1a1a1a;">Message:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            Submitted at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };
    
    // Confirmation email to user
    const userEmailOptions = {
      from: fromEmail,
      to: email,
      subject: 'Thank you for contacting AM Teachings!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #3b82f6; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">AM Teachings</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">English & IELTS Excellence</p>
          </div>
          
          <div style="padding: 30px; background: white; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1a1a1a; margin-top: 0;">Thank you for your message, ${name}!</h2>
            
            <p style="color: #4b5563; line-height: 1.6;">
              I've received your inquiry about <strong>${lessonType}</strong> and I'm excited to help you on your English learning journey.
            </p>
            
            <p style="color: #4b5563; line-height: 1.6;">
              I respond to all messages personally within 24 hours. In the meantime, feel free to explore my website to learn more about my teaching approach and services.
            </p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin: 25px 0;">
              <h3 style="margin: 0 0 10px 0; color: #1a1a1a;">Your Message:</h3>
              <p style="color: #6b7280; font-style: italic; margin: 0;">"${message}"</p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Looking forward to speaking with you soon!
            </p>
            
            <p style="color: #4b5563; margin-bottom: 0;">
              Best regards,<br>
              <strong>Aya Mohsen</strong><br>
              <span style="color: #6b7280;">English Teacher & IELTS Specialist</span>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 14px;">
            <p>AM Teachings | Online English Lessons Worldwide</p>
            <p>
              <a href="${process.env.SITE_URL || 'http://localhost:3000'}" style="color: #3b82f6; text-decoration: none;">
                Visit our website
              </a>
            </p>
          </div>
        </div>
      `,
    };
    
    // Send both emails
    await Promise.all([
      transporter.sendMail(teacherEmailOptions),
      transporter.sendMail(userEmailOptions),
    ]);
    
    console.log('Contact form emails sent successfully:', { name, email, lessonType });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you within 24 hours.' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid form data',
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sorry, there was an error sending your message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}