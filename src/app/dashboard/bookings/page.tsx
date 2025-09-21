'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Booking {
  id: string
  lessonType: string
  durationMin: number
  start: string | null
  end: string | null
  meetLink: string | null
  createdAt: string
  provider: string
  providerEventId: string | null
}

export default function Bookings() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    
    fetchBookings()
  }, [session, status, router])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings || [])
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const now = new Date()
  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    if (filter === 'upcoming') {
      return booking.start && new Date(booking.start) > now
    }
    if (filter === 'past') {
      return booking.start && new Date(booking.start) <= now
    }
    return true
  }).sort((a, b) => {
    if (!a.start || !b.start) return 0
    return new Date(b.start).getTime() - new Date(a.start).getTime()
  })

  const getStatusBadge = (booking: Booking) => {
    if (!booking.start) {
      return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending Schedule</span>
    }
    
    const lessonTime = new Date(booking.start)
    const now = new Date()
    
    if (lessonTime > now) {
      return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Upcoming</span>
    } else {
      return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completed</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              <p className="mt-2 text-gray-600">
                Manage your lessons and view your learning history
              </p>
            </div>
            <Link href="/dashboard/book">
              <Button>Book New Lesson</Button>
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All Lessons', count: bookings.length },
                { 
                  key: 'upcoming', 
                  label: 'Upcoming', 
                  count: bookings.filter(b => b.start && new Date(b.start) > now).length 
                },
                { 
                  key: 'past', 
                  label: 'Past', 
                  count: bookings.filter(b => b.start && new Date(b.start) <= now).length 
                }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as typeof filter)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {booking.lessonType} Lesson
                      </h3>
                      {getStatusBadge(booking)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Duration:</span> {booking.durationMin} minutes
                      </div>
                      <div>
                        <span className="font-medium">Booked:</span>{' '}
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                      {booking.start && (
                        <div>
                          <span className="font-medium">Scheduled:</span>{' '}
                          {new Date(booking.start).toLocaleDateString()} at{' '}
                          {new Date(booking.start).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Price:</span> $
                        {booking.lessonType === 'individual' ? 
                          (booking.durationMin === 30 ? 25 : booking.durationMin === 60 ? 45 : 65) :
                          (booking.durationMin === 30 ? 15 : booking.durationMin === 60 ? 25 : 35)
                        }
                      </div>
                    </div>

                    {!booking.start && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Action Required:</strong> Please schedule your lesson time by clicking the link in your confirmation email.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {booking.meetLink && booking.start && new Date(booking.start) > now && (
                      <a
                        href={booking.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Join Meeting
                      </a>
                    )}
                    
                    {booking.start && new Date(booking.start) <= now && (
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' && 'No lessons booked yet'}
              {filter === 'upcoming' && 'No upcoming lessons'}
              {filter === 'past' && 'No past lessons'}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' && 'Start your English learning journey by booking your first lesson.'}
              {filter === 'upcoming' && 'Book a new lesson to continue your learning.'}
              {filter === 'past' && 'Your completed lessons will appear here.'}
            </p>
            <Link href="/dashboard/book">
              <Button>Book Your First Lesson</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
}