import 'dotenv/config';
import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

// Sanity client configuration
const client = createClient({
    projectId: 'l25w16t4',
    dataset: 'production',
    apiVersion: '2024-01-01',
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

async function uploadTestimonials() {
    // Read the data.json file
    const dataPath = path.join(__dirname, 'testimonials', 'data.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const testimonials: TestimonialData[] = JSON.parse(rawData);

    console.log(`Found ${testimonials.length} testimonials to upload\n`);

    for (const testimonial of testimonials) {
        try {
            const doc = {
                _type: 'testimonial',
                name: testimonial.name,
                email: testimonial.email,
                role: testimonial.role || '',
                quote_en: testimonial.quote_en,
                quote_ar: testimonial.quote_ar,
                rating: testimonial.rating,
                approved: testimonial.approved,
                submittedAt: new Date().toISOString(),
                approvedAt: testimonial.approved ? new Date().toISOString() : undefined,
            };

            const result = await client.create(doc);
            console.log(`Uploaded: ${testimonial.name} (ID: ${result._id})`);
        } catch (error) {
            console.error(`Failed to upload ${testimonial.name}:`, error);
        }
    }

    console.log('\nUpload complete!');
}

uploadTestimonials().catch(console.error);
