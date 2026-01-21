import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { CONTACT_INFO, createWhatsAppUrl } from "@/lib/constants";

// Enhanced validation schema for contact form
const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email is too long"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val.trim().length === 0 ||
        /^[\+]?[1-9][\d]{0,15}$/.test(val.replace(/[\s\-\(\)]/g, "")),
      {
        message: "Please enter a valid phone number",
      }
    ),
  telegram: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val.trim().length === 0 ||
        /^@?[a-zA-Z0-9_]{5,32}$/.test(val.trim()),
      {
        message: "Please enter a valid Telegram username (e.g., @username)",
      }
    ),
  lessonType: z.string().min(1, "Please select a lesson type"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(2000, "Message is too long"),
});

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data with comprehensive error handling
    let validatedData;
    try {
      validatedData = contactSchema.parse(body);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: "Validation failed",
            details: validationError.issues.map((err) => ({
              field: err.path.join("."),
              message: err.message,
            })),
          },
          { status: 400 }
        );
      }
      throw validationError;
    }

    const { name, email, phone, telegram, lessonType, message } = validatedData;

    // Primary email address as specified
    const teacherEmail = CONTACT_INFO.EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@sheriax.com";

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      // If Resend is not configured, log the message and return success
      console.log("Contact form submission (Resend not configured):", {
        name,
        email,
        lessonType,
        message,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: "Thank you for your message! I will get back to you soon.",
      });
    }

    try {
      // Send notification email to teacher
      const teacherEmailResult = await resend.emails.send({
        from: fromEmail,
        to: teacherEmail,
        subject: `New Contact Form Submission - ${lessonType}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: #3b82f6; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">AM Teachings</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">New Contact Form Submission</p>
            </div>
            
            <div style="padding: 30px; background: white; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #1a1a1a; margin-top: 0;">Contact Details</h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${email}</td>
                  </tr>
                  ${
                    phone
                      ? `<tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${phone}</td>
                  </tr>`
                      : ""
                  }
                  ${
                    telegram
                      ? `<tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Telegram:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${telegram}</td>
                  </tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Interested in:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${lessonType}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #ffffff; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1a1a1a;">Message:</h3>
                <p style="line-height: 1.6; color: #4b5563; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="background: #ecfdf5; border: 1px solid #d1fae5; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0; color: #065f46; font-size: 14px;">
                   <strong>Quick Actions:</strong><br>
                   • Reply via email: <a href="mailto:${email}" style="color: #3b82f6;">${email}</a><br>
                   • Contact via Telegram: <a href="${createWhatsAppUrl(
                     `Hello ${name}!`
                   )}" style="color: #3b82f6;">Send Telegram Message</a>
                 </p>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
                Submitted at: ${new Date().toLocaleString()}<br>
                Response recommended within: 24 hours
              </p>
            </div>
          </div>
        `,
      });

      // Send confirmation email to user
      const userEmailResult = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Thank you for contacting AM Teachings!",
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
                <p style="color: #6b7280; font-style: italic; margin: 0; white-space: pre-wrap;">"${message}"</p>
              </div>
              
              <div style="background: #ecfdf5; border: 1px solid #d1fae5; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <h3 style="margin: 0 0 15px 0; color: #065f46;">Alternative Contact Methods:</h3>
                <p style="margin: 0; color: #065f46; line-height: 1.6;">
                   For faster responses, you can also reach me via:<br>
                   📧 Email: <a href="mailto:${
                     CONTACT_INFO.EMAIL
                   }" style="color: #3b82f6;">${CONTACT_INFO.EMAIL}</a><br>
                   💬 Telegram: <a href="${createWhatsAppUrl(
                     "Hello Aya!"
                   )}" style="color: #3b82f6;">Send Telegram Message</a>
                 </p>
              </div>
              
              <p style="color: #4b5563; margin-bottom: 0; line-height: 1.6;">
                Looking forward to helping you achieve your English learning goals!<br><br>
                <strong>Aya Mohsen</strong><br>
                <span style="color: #6b7280;">English Teacher & Teaching Specialist</span><br>
                <span style="color: #6b7280;">AM Teachings</span>
              </p>
            </div>
          </div>
        `,
      });

      // Log successful email sending
      console.log("Contact form emails sent successfully:", {
        teacherEmailId: teacherEmailResult.data?.id,
        userEmailId: userEmailResult.data?.id,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message:
          "Thank you for your message! I will get back to you within 24 hours.",
      });
    } catch (emailError) {
      console.error("Error sending emails:", emailError);

      // Return success even if email fails, but log the issue
      return NextResponse.json({
        success: true,
        message: "Thank you for your message! I will get back to you soon.",
        warning: "Email delivery may be delayed",
      });
    }
  } catch (error: unknown) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred. Please try again or contact us directly.",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}
