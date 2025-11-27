import { groq } from 'next-sanity';

// Fetch all approved testimonials, ordered by approval date (newest first)
export const approvedTestimonialsQuery = groq`
  *[_type == "testimonial" && approved == true] | order(approvedAt desc) {
    _id,
    name,
    email,
    profilePicture,
    role,
    score,
    quote,
    rating,
    submittedAt,
    approvedAt
  }
`;

// Fetch all pending (unapproved) testimonials
export const pendingTestimonialsQuery = groq`
  *[_type == "testimonial" && approved == false] | order(submittedAt desc) {
    _id,
    name,
    email,
    profilePicture,
    role,
    score,
    quote,
    rating,
    submittedAt
  }
`;

// Fetch a single testimonial by ID
export const testimonialByIdQuery = groq`
  *[_type == "testimonial" && _id == $id][0] {
    _id,
    name,
    email,
    profilePicture,
    role,
    score,
    quote,
    rating,
    approved,
    submittedAt,
    approvedAt
  }
`;
