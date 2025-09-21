# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

AM Teachings is a full-stack English & IELTS learning platform built for Aya Mohsen. The application combines lesson booking, payment processing, user authentication, and educational content management using modern web technologies.

**Tech Stack:**
- Next.js 15 with App Router and Turbopack
- TypeScript for type safety
- Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- NextAuth.js for authentication (Google OAuth + credentials)
- Tailwind CSS 4 for styling
- Stripe for payment processing

## Essential Development Commands

### Daily Development
```bash
# Start development server with Turbopack
pnpm dev

# Build for production with Turbopack
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Database Operations
```bash
# Push schema changes to database (development)
pnpm prisma:push

# Generate Prisma client after schema changes
pnpm prisma:generate

# Open Prisma Studio to view/edit data
pnpm prisma:studio

# Run database migrations (production)
pnpm prisma:migrate
```

### Development Workflow
```bash
# Type checking
npx tsc --noEmit

# Database validation
pnpm exec prisma validate

# Install dependencies (automatically runs prisma generate)
pnpm install
```

## Architecture & Code Structure

### Authentication System
- **NextAuth.js** with dual provider setup (Google OAuth + credentials)
- JWT session strategy with role-based access control
- Custom sign-in page at `/auth/signin`
- User roles: `student` (default) and `teacher`/admin
- Password hashing with bcryptjs
- Located in `src/lib/auth.ts` - modify this for auth configuration changes

### Database Architecture
- **Core Models**: User, Booking, Payment, plus NextAuth models (Account, Session, VerificationToken)
- **Key Relationships**:
  - User → Bookings (1:many)
  - User → Payments (1:many)
  - Booking tracks lesson scheduling with external providers (Cal.com/Calendly)
  - Payment integrates with Stripe sessions
- Schema in `prisma/schema.prisma`
- Uses SQLite for development, PostgreSQL for production

### Application Structure
- **App Router**: All pages in `src/app/` directory
- **API Routes**: Backend endpoints in `src/app/api/`
- **Components**: Reusable UI in `src/components/`
  - `ui/` - Base components (Button, Card, Input)
  - `layout/` - Layout components (Navbar, Footer)
- **Library Functions**: Utilities in `src/lib/`
  - `auth.ts` - NextAuth configuration
  - `utils.ts` - General utilities (cn, formatPrice, formatDate, slugify)
  - `blog.ts` - Blog post management with in-memory data structure
  - `prisma.ts` - Database client (if exists)

### External Integrations
- **Stripe**: Payment processing with webhook support
- **Scheduling**: Cal.com or Calendly integration for lesson booking
- **Email**: Nodemailer/Resend for notifications
- **Content**: Static blog posts defined in `src/lib/blog.ts`

### Styling System
- **Tailwind CSS 4** with PostCSS
- Global styles in `src/app/globals.css`
- Responsive design with mobile-first approach
- Component styling follows utility-first methodology

## Key Development Patterns

### Environment Configuration
Required environment variables (see README.md for full list):
- `NEXTAUTH_URL` and `NEXTAUTH_SECRET` for authentication
- `DATABASE_URL` for database connection
- `GOOGLE_CLIENT_ID/SECRET` for OAuth
- `STRIPE_SECRET_KEY` and webhook secret
- SMTP settings for email functionality

### Component Development
- Use TypeScript interfaces for component props
- Follow Next.js App Router patterns for page components
- Implement proper error boundaries and loading states
- Use `cn()` utility from `src/lib/utils.ts` for conditional styling

### Database Operations
- Always use Prisma Client for database operations
- Include proper error handling for database queries
- Use database relations efficiently (include/select patterns)
- Run `pnpm prisma:push` after schema changes in development

### API Development
- API routes follow Next.js App Router convention (`route.ts` files)
- Implement proper HTTP status codes and error responses
- Use middleware for authentication checks where needed
- Handle Stripe webhooks for payment processing

### Blog System
- Blog posts are currently managed in-memory via `src/lib/blog.ts`
- Each post includes metadata (title, excerpt, author, category, tags, slug)
- Content supports Markdown formatting
- Posts are sorted by publication date (newest first)

## Testing & Quality Assurance

### Type Safety
- Run `npx tsc --noEmit` before committing changes
- Ensure all components have proper TypeScript interfaces
- Use strict TypeScript configuration (enabled in tsconfig.json)

### Database Integrity
- Validate schema with `pnpm exec prisma validate`
- Test database operations in development before production deployment
- Use Prisma Studio to verify data consistency

### Code Quality
- Follow ESLint configuration (Next.js + TypeScript rules)
- Use consistent formatting and naming conventions
- Implement proper error handling in API routes and components

## Deployment Notes

### Environment Differences
- **Development**: SQLite database, local authentication URLs
- **Production**: PostgreSQL database, production Stripe keys, real SMTP settings

### Database Migration Strategy
- Use `prisma:migrate` for production deployments
- Test migrations thoroughly in staging environment
- Keep database schema changes backward compatible when possible

### External Service Configuration
- Update OAuth redirect URLs for production domain
- Configure Stripe webhooks for production endpoint
- Set up proper email delivery service for production

This architecture prioritizes developer experience with hot reloading, type safety, and integrated tooling while maintaining production readiness through proper environment configuration and external service integration.