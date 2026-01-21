import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "profilePicture",
      title: "Profile Picture",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "role",
      title: "Role/Level",
      type: "string",
      description: 'e.g., "IELTS Student", "Beginner"',
    }),
    defineField({
      name: "score",
      title: "Achievement/Score",
      type: "string",
      description: 'e.g., "Band 7.5", "Advanced Level"',
    }),
    // REPLACED single 'quote' with dual language fields
    defineField({
      name: "quote_en",
      title: "Testimonial (English)",
      type: "text",
      validation: (Rule) => Rule.required(),
      rows: 3,
    }),
    defineField({
      name: "quote_ar",
      title: "Testimonial (Arabic)",
      type: "text",
      validation: (Rule) => Rule.required(),
      rows: 3,
      // Optional: Helper to ensure RTL text direction in Studio if needed,
      // though Sanity handles Arabic string display well automatically.
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      initialValue: false,
      description: "Toggle to approve/disapprove this testimonial",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "approvedAt",
      title: "Approved At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      // Preview the English quote by default, or fallback to Arabic
      subtitle: "quote_en",
      subtitle_ar: "quote_ar",
      media: "profilePicture",
      approved: "approved",
    },
    prepare({ title, subtitle, subtitle_ar, media, approved }) {
      const previewText = subtitle || subtitle_ar;
      return {
        title: `${title} ${approved ? "✓" : "⏳"}`,
        subtitle: previewText
          ? previewText.substring(0, 60) + "..."
          : "No content",
        media,
      };
    },
  },
});
