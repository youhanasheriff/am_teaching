import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createBookingSchema = z.object({
  lessonType: z.enum(['individual', 'group']),
  duration: z.enum(['30', '60', '90']),
  date: z.string().refine((date) => {
    const bookingDate = new Date(date)
    const now = new Date()
    return bookingDate > now
  }, 'Booking date must be in the future'),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createBookingSchema.parse(body)

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Calculate price based on lesson type and duration
    const basePrices = {
      individual: { '30': 25, '60': 45, '90': 65 },
      group: { '30': 15, '60': 25, '90': 35 }
    }
    
    const price = basePrices[validatedData.lessonType][validatedData.duration]

    // Create booking
    const bookingDateTime = new Date(`${validatedData.date}T${validatedData.time}`)
    const endDateTime = new Date(bookingDateTime.getTime() + parseInt(validatedData.duration) * 60000)
    
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        lessonType: validatedData.lessonType,
        durationMin: parseInt(validatedData.duration),
        start: bookingDateTime,
        end: endDateTime,
        provider: 'manual',
        meetLink: null,
        providerEventId: null,
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Booking creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input data', errors: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    // Build where clause
    const whereClause: any = {
      userId: user.id
    }

    if (status && status !== 'all') {
      whereClause.status = status
    }

    // Fetch bookings
    const bookings = await prisma.booking.findMany({
      where: whereClause,
      orderBy: {
        start: 'desc'
      }
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Bookings fetch error:', error)
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}