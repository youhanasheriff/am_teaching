'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const CheckCircleIcon = () => (
  <svg className="mx-auto h-16 w-16 text-green-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
)

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    const session_id = searchParams.get('session_id')
    if (session_id) {
      setSessionId(session_id)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <CheckCircleIcon />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Payment Successful!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your lesson has been booked successfully.
            </p>
            
            {sessionId && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">
                  Session ID: {sessionId}
                </p>
              </div>
            )}

            <div className="mt-8 space-y-4">
              <button
                onClick={() => router.push('/dashboard/bookings')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View My Bookings
              </button>
              
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Dashboard
              </button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-800 mb-2">What&apos;s Next?</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• You&apos;ll receive a confirmation email shortly</li>
                <li>• Check your bookings page for lesson details</li>
                <li>• Join the meeting link at your scheduled time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}