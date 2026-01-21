import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/lib/sanity/client";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().optional(),
  score: z.string().optional(),
  quote_en: z
    .string()
    .min(10, "English testimonial must be at least 10 characters"),
  quote_ar: z
    .string()
    .min(10, "Arabic testimonial must be at least 10 characters"),
  rating: z.number().min(1).max(5),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      score: formData.get("score") as string,
      quote_en: formData.get("quote_en") as string,
      quote_ar: formData.get("quote_ar") as string,
      rating: Number(formData.get("rating")),
    };

    // Validate input
    const validatedData = testimonialSchema.parse(data);

    // Handle profile picture upload if provided
    const profilePictureFile = formData.get("profilePicture") as File | null;
    let profilePictureAsset = null;

    if (profilePictureFile && profilePictureFile.size > 0) {
      // Validate file type and size
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(profilePictureFile.type)) {
        return NextResponse.json(
          { error: "Invalid file type. Only JPG and PNG are allowed." },
          { status: 400 }
        );
      }

      if (profilePictureFile.size > maxSize) {
        return NextResponse.json(
          { error: "File too large. Maximum size is 5MB." },
          { status: 400 }
        );
      }

      // Upload image to Sanity
      const arrayBuffer = await profilePictureFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      profilePictureAsset = await serverClient.assets.upload("image", buffer, {
        filename: profilePictureFile.name,
      });
    }

    // Create testimonial document
    const testimonial = await serverClient.create({
      _type: "testimonial",
      name: validatedData.name,
      email: validatedData.email,
      role: validatedData.role || "",
      score: validatedData.score || "",
      quote_en: validatedData.quote_en,
      quote_ar: validatedData.quote_ar,
      rating: validatedData.rating,
      approved: false,
      submittedAt: new Date().toISOString(),
      ...(profilePictureAsset && {
        profilePicture: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: profilePictureAsset._id,
          },
        },
      }),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial submitted successfully!",
        id: testimonial._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting testimonial:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}
