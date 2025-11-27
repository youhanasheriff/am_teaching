import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'profilePicture',
            title: 'Profile Picture',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'role',
            title: 'Role/Level',
            type: 'string',
            description: 'e.g., "IELTS Student", "Beginner"',
        }),
        defineField({
            name: 'score',
            title: 'Achievement/Score',
            type: 'string',
            description: 'e.g., "Band 7.5", "Advanced Level"',
        }),
        defineField({
            name: 'quote',
            title: 'Testimonial',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(5),
            initialValue: 5,
        }),
        defineField({
            name: 'approved',
            title: 'Approved',
            type: 'boolean',
            initialValue: false,
            description: 'Toggle to approve/disapprove this testimonial',
        }),
        defineField({
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            readOnly: true,
        }),
        defineField({
            name: 'approvedAt',
            title: 'Approved At',
            type: 'datetime',
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'quote',
            media: 'profilePicture',
            approved: 'approved',
        },
        prepare({ title, subtitle, media, approved }) {
            return {
                title: `${title} ${approved ? '✓' : '⏳'}`,
                subtitle: subtitle?.substring(0, 60) + '...',
                media,
            };
        },
    },
});
