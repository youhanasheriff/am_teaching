'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function BookLesson() {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedType, setSelectedType] = useState('individual')
  const [selectedDuration, setSelectedDuration] = useState(60)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const lessonTypes = [
    {
      id: 'individual',
      name: 'Individual Lesson',
      description: 'One-on-one personalized English lessons tailored to your specific needs',
      prices: { 30: 50, 60: 90, 90: 120 },
      features: ['Personalized Curriculum', 'Flexible Scheduling', 'Immediate Feedback', 'Custom Materials']
    },
    {
      id: 'group',
      name: 'Group Lesson',
      description: 'Learn with other students in a collaborative and engaging environment',
      prices: { 30: 30, 60: 55, 90: 75 },
      features: ['Interactive Learning', 'Peer Practice', 'Cost Effective', 'Social Learning']
    },
    {
      id: 'general',
      name: 'General English',
      description: 'Improve your overall English skills with conversation practice, grammar, and vocabulary',
      prices: { 30: 40, 60: 70, 90: 95 },
      features: ['Conversation Practice', 'Grammar Focus', 'Vocabulary Building', 'Pronunciation Help']
    }
  ]

  const durations = [
    { minutes: 30, label: '30 minutes' },
    { minutes: 60, label: '1 hour' },
    { minutes: 90, label: '1.5 hours' }
  ]

  const selectedLessonType = lessonTypes.find(type => type.id === selectedType)!
  const selectedDurationData = durations.find(d => d.minutes === selectedDuration)!
  const totalPrice = selectedLessonType.prices[selectedDuration as keyof typeof selectedLessonType.prices]

  const handleBooking = async () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonType: selectedType,
          durationMin: selectedDuration,
          date: selectedDate,
          time: selectedTime,
          notes: notes.trim() || undefined,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()
      
      // Redirect to Stripe checkout
      window.location.href = url
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to start payment process. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Book a Lesson</h1>
          <p className="mt-2 text-gray-600">
            Choose your lesson type and duration to get started
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lesson Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Type */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Lesson Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessonTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all ${
                      selectedType === type.id
                        ? 'ring-2 ring-blue-500 bg-blue-50'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedType(type.id as 'general' | 'ielts')}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                        <span className="text-lg font-bold text-blue-600">From ${type.prices[30]}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                      <ul className="space-y-2">
                        {type.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Duration</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {durations.map((duration) => (
                  <Card
                    key={duration.minutes}
                    className={`cursor-pointer transition-all ${
                      selectedDuration === duration.minutes
                        ? 'ring-2 ring-blue-500 bg-blue-50'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedDuration(duration.minutes)}
                  >
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-900">{duration.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        ${selectedLessonType.prices[duration.minutes as keyof typeof selectedLessonType.prices]}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Date & Time</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Notes (Optional)</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific topics you'd like to focus on or questions you have..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-8">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lesson Type:</span>
                    <span className="font-medium">{selectedLessonType.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{selectedDurationData.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-blue-600">${totalPrice}</span>
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={loading || !session}
                  className="w-full"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Book & Pay'
                  )}
                </Button>

                {!session && (
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Please <Link href="/auth/signin" className="text-blue-600 hover:text-blue-800">sign in</Link> to book a lesson
                  </p>
                )}

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">What happens next?</h4>
                  <ol className="text-xs text-gray-600 space-y-1">
                    <li>1. Complete payment</li>
                    <li>2. Choose your preferred time</li>
                    <li>3. Receive meeting link</li>
                    <li>4. Join your lesson</li>
                  </ol>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}