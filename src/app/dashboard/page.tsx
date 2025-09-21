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
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

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
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const upcomingBookings = bookings.filter(booking => 
    booking.start && new Date(booking.start) > new Date()
  ).sort((a, b) => 
    new Date(a.start!).getTime() - new Date(b.start!).getTime()
  )

  const pastBookings = bookings.filter(booking => 
    booking.start && new Date(booking.start) <= new Date()
  ).sort((a, b) => 
    new Date(b.start!).getTime() - new Date(a.start!).getTime()
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session.user?.name || 'Student'}!
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your lessons and track your progress
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Book a Lesson</h3>
            <p className="text-gray-600 mb-4">Schedule your next English lesson</p>
            <Link href="/dashboard/book">
              <Button className="w-full">Book Now</Button>
            </Link>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Bookings</h3>
            <p className="text-gray-600 mb-4">View and manage your lessons</p>
            <Link href="/dashboard/bookings">
              <Button variant="outline" className="w-full">View All</Button>
            </Link>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile</h3>
            <p className="text-gray-600 mb-4">Update your information</p>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </Link>
          </Card>
        </div>

        {/* Upcoming Lessons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Lessons</h2>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <Card key={booking.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 capitalize">
                          {booking.lessonType} Lesson
                        </h3>
                        <p className="text-sm text-gray-600">
                          Duration: {booking.durationMin} minutes
                        </p>
                        {booking.start && (
                          <p className="text-sm text-gray-600">
                            {new Date(booking.start).toLocaleDateString()} at{' '}
                            {new Date(booking.start).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                      {booking.meetLink && (
                        <a
                          href={booking.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Join Meeting
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-600">No upcoming lessons scheduled</p>
                <Link href="/dashboard/book" className="inline-block mt-2">
                  <Button size="sm">Book Your First Lesson</Button>
                </Link>
              </Card>
            )}
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Lessons</h2>
            {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.slice(0, 3).map((booking) => (
                  <Card key={booking.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 capitalize">
                          {booking.lessonType} Lesson
                        </h3>
                        <p className="text-sm text-gray-600">
                          Duration: {booking.durationMin} minutes
                        </p>
                        {booking.start && (
                          <p className="text-sm text-gray-600">
                            {new Date(booking.start).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-600">No lessons completed yet</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}