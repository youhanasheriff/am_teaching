# AM Teachings - English & IELTS Learning Platform

A modern, full-stack web application for English language learning and IELTS preparation with Aya Mohsen. Built with Next.js 15, TypeScript, Prisma, and integrated payment processing.

## 🌟 Features

### Student Features
- **Lesson Booking**: Integrated scheduling with Cal.com/Calendly
- **Payment Processing**: Secure Stripe integration for lesson payments
- **User Authentication**: NextAuth.js with Google OAuth and email/password
- **Progress Tracking**: Personal dashboard for lesson history
- **Blog & Resources**: Educational content and IELTS preparation materials
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Teacher/Admin Features
- **Student Management**: View and manage student accounts
- **Lesson Scheduling**: Calendar integration for availability
- **Payment Tracking**: Monitor transaction history
- **Content Management**: Blog post creation and editing
- **Analytics Dashboard**: Student engagement metrics

### Technical Features
- **TypeScript**: Full type safety across the application
- **Server-Side Rendering**: Optimized performance with Next.js App Router
- **Database Integration**: Prisma ORM with SQLite (development) / PostgreSQL (production)
- **Email Integration**: Automated notifications with Nodemailer
- **SEO Optimized**: Meta tags, structured data, and sitemap generation

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **React 19** - Latest React features

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma 6** - Modern database toolkit
- **NextAuth.js** - Authentication library
- **SQLite/PostgreSQL** - Database storage

### Integrations
- **Stripe** - Payment processing
- **Cal.com/Calendly** - Lesson scheduling
- **Nodemailer** - Email delivery
- **Google OAuth** - Social authentication

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📁 Project Structure

```
am_teachings/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth-related pages
│   │   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── api/               # API routes
│   │   ├── blog/              # Blog pages
│   │   ├── booking/           # Lesson booking flow
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── ui/               # Base UI components
│   │   ├── forms/            # Form components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utility functions
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── db.ts             # Database connection
│   │   ├── stripe.ts         # Stripe configuration
│   │   └── utils.ts          # General utilities
│   └── types/                # TypeScript type definitions
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── dev.db               # SQLite database (development)
├── public/                   # Static assets
└── docs/                     # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 20+ (recommended: use nvm)
- pnpm (preferred package manager)
- Git

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd am_teachings
```

### Step 2: Install Dependencies
```bash
pnpm install
```

### Step 3: Environment Configuration
Copy the example environment file and configure:
```bash
cp .env.example .env
```

Update `.env` with your configurations:
```env
# Base Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
SITE_URL=http://localhost:3000

# Database
DATABASE_URL=file:./prisma/dev.db

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe Payment Processing
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Scheduling Integration
SCHEDULER_PROVIDER=cal  # or 'calendly'
CALCOM_EMBED_LINK=https://cal.com/your-username/lesson

# Email Configuration
CONTACT_FROM_EMAIL=contact@yoursite.com
TEACHER_EMAIL=teacher@yoursite.com
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
```

### Step 4: Database Setup
Initialize and create the database:
```bash
# Push schema to create database
pnpm prisma:push

# Optional: Open Prisma Studio to view data
pnpm prisma:studio
```

### Step 5: Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Schema

### Core Models
- **User**: Student and teacher accounts with authentication
- **Booking**: Lesson appointments with scheduling details
- **Payment**: Stripe transaction records
- **Account/Session**: NextAuth authentication tables

### Key Relationships
- User → Bookings (One-to-Many)
- User → Payments (One-to-Many)
- User → Auth Sessions (One-to-Many)

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Database Operations
pnpm prisma:push      # Push schema changes to database
pnpm prisma:studio    # Open Prisma Studio
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Run database migrations
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Environment Variables for Production
- Update `DATABASE_URL` to PostgreSQL connection string
- Set production Stripe keys
- Configure production SMTP settings
- Update OAuth redirect URLs

## 🧪 Testing

```bash
# Type checking
npx tsc --noEmit

# Linting
pnpm lint

# Database validation
pnpm exec prisma validate
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

### Booking
- `POST /api/booking` - Create lesson booking
- `GET /api/booking/[id]` - Get booking details

### Payments
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhooks/stripe` - Stripe webhook handler

### Webhooks
- `POST /api/webhooks/cal` - Cal.com webhook
- `POST /api/webhooks/calendly` - Calendly webhook

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@amteachings.com or create an issue in the GitHub repository.

## 🗺️ Roadmap

- [ ] Mobile app development
- [ ] Advanced progress tracking
- [ ] AI-powered lesson recommendations
- [ ] Group lesson booking
- [ ] Video conferencing integration
- [ ] Automated lesson reminders
- [ ] Student portfolio system

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
