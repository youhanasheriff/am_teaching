import { Card, CardContent } from '@/components/ui/Card';
import { Star } from 'lucide-react';
import { client, urlFor } from '@/lib/sanity/client';
import { approvedTestimonialsQuery } from '@/lib/sanity/queries';
import Image from 'next/image';

interface Testimonial {
    _id: string;
    name: string;
    email: string;
    profilePicture?: {
        asset: {
            _ref: string;
        };
    };
    role?: string;
    score?: string;
    quote: string;
    rating: number;
    submittedAt: string;
    approvedAt?: string;
}

export default async function TestimonialsList() {
    const testimonials: Testimonial[] = await client.fetch(approvedTestimonialsQuery, {}, {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (testimonials.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No testimonials yet. Be the first to share your story!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
                <Card key={testimonial._id} className="group">
                    <CardContent className="pt-6">
                        {/* Profile Picture */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                {testimonial.profilePicture ? (
                                    <Image
                                        src={urlFor(testimonial.profilePicture).width(64).height(64).url()}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-brand text-white font-semibold text-xl">
                                        {testimonial.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">{testimonial.name}</div>
                                {testimonial.role && (
                                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                                )}
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < testimonial.rating
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-gray-700 mb-4 italic">
                            &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>

                        {/* Score Badge */}
                        {testimonial.score && (
                            <div className="inline-block text-sm font-medium text-brand bg-brand-light px-3 py-1 rounded-full">
                                {testimonial.score}
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
