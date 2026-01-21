import "dotenv/config";
import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

const client = createClient({
  projectId: "l25w16t4",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

interface TestimonialData {
  name: string;
  email: string;
  role?: string;
  quote_en: string;
  quote_ar: string;
  rating: number;
  approved: boolean;
}

async function updateTestimonials() {
  console.log("Starting testimonials update...\n");

  // Step 1: Delete all existing testimonials
  console.log("Step 1: Deleting existing testimonials...");
  const existingTestimonials = await client.fetch(
    `*[_type == "testimonial"]{ _id }`
  );

  if (existingTestimonials.length > 0) {
    const transaction = client.transaction();
    for (const doc of existingTestimonials) {
      transaction.delete(doc._id);
    }
    await transaction.commit();
    console.log(`Deleted ${existingTestimonials.length} existing testimonials.\n`);
  } else {
    console.log("No existing testimonials to delete.\n");
  }

  // Step 2: Upload new testimonials
  console.log("Step 2: Uploading new testimonials...");
  const dataPath = path.join(__dirname, "testimonials", "data.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const testimonials: TestimonialData[] = JSON.parse(rawData);

  console.log(`Found ${testimonials.length} testimonials to upload.\n`);

  for (const testimonial of testimonials) {
    try {
      const doc = {
        _type: "testimonial",
        name: testimonial.name,
        email: testimonial.email || "",
        role: testimonial.role || "",
        quote_en: testimonial.quote_en,
        quote_ar: testimonial.quote_ar,
        rating: testimonial.rating,
        approved: testimonial.approved,
        submittedAt: new Date().toISOString(),
        approvedAt: testimonial.approved ? new Date().toISOString() : undefined,
      };

      const result = await client.create(doc);
      console.log(`✓ Uploaded: ${testimonial.name} (ID: ${result._id})`);
    } catch (error) {
      console.error(`✗ Failed to upload ${testimonial.name}:`, error);
    }
  }

  console.log("\n✓ Update complete!");
}

updateTestimonials().catch(console.error);
