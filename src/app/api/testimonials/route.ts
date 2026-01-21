import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { approvedTestimonialsQuery } from "@/lib/sanity/queries";

export const revalidate = 60; // Revalidate every 60 seconds

// GET: Fetch all approved testimonials
export async function GET() {
  try {
    const testimonials = await client.fetch(approvedTestimonialsQuery);
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
