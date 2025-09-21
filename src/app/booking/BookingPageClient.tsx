'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input, Textarea, Label } from '@/components/ui/Input';

// TypeScript interfaces
interface LessonType {
  id: 'individual' | 'group' | 'general' | 'ielts';
  name: string;
  description: string;
  prices: {
    30: number;
    60: number;
    90: number;
  };
  features: string[];
  popular?: boolean;
}

interface Duration {
  minutes: 30 | 60 | 90;
  label: string;
}

interface TimeSlot {
  value: string;
  label: string;
  available: boolean;
}

interface BookingFormData {
  lessonType: string;
  duration: number;
  date: string;
  time: string;
  notes: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  experience: string;
  goals: string;
}

interface FormErrors {
  [key: string]: string;
}

const BookingPageClient: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // State management
  const [formData, setFormData] = useState<BookingFormData>({
    lessonType: 'individual',
    duration: 60,
    date: '',
    time: '',
    notes: '',
    studentName: session?.user?.name || '',
    studentEmail: session?.user?.email || '',
    studentPhone: '',
    experience: '',
    goals: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Update form data when session changes
  useEffect(() => {
    if (session?.user?.name || session?.user?.email) {
      setFormData(prev => ({
        ...prev,
        studentName: session.user?.name || '',
        studentEmail: session.user?.email || '',
      }));
    }
  }, [session]);

  // Lesson types configuration
  const lessonTypes: LessonType[] = [
    {
      id: 'individual',
      name: 'Individual Lesson',
      description:
        'One-on-one personalized English lessons tailored to your specific needs and learning pace',
      prices: { 30: 50, 60: 90, 90: 120 },
      features: [
        'Personalized curriculum design',
        'Flexible scheduling options',
        'Immediate feedback and correction',
        'Custom learning materials',
        'Progress tracking and reports',
        'Homework and practice assignments',
      ],
      popular: true,
    },
    {
      id: 'group',
      name: 'Group Lesson',
      description:
        'Learn with other students in a collaborative and engaging environment (2-4 students)',
      prices: { 30: 30, 60: 55, 90: 75 },
      features: [
        'Interactive group activities',
        'Peer learning and practice',
        'Cost-effective option',
        'Social learning environment',
        'Group discussions and debates',
        'Collaborative projects',
      ],
    },
    {
      id: 'general',
      name: 'General English',
      description:
        'Improve your overall English skills with conversation practice, grammar, and vocabulary building',
      prices: { 30: 40, 60: 70, 90: 95 },
      features: [
        'Conversation practice sessions',
        'Grammar fundamentals',
        'Vocabulary expansion',
        'Pronunciation improvement',
        'Listening comprehension',
        'Reading and writing skills',
      ],
    },
    {
      id: 'ielts',
      name: 'IELTS Preparation',
      description:
        'Specialized IELTS test preparation with proven strategies and practice materials',
      prices: { 30: 55, 60: 95, 90: 130 },
      features: [
        'All four IELTS skills covered',
        'Practice tests and mock exams',
        'Test-taking strategies',
        'Band score improvement focus',
        'Official IELTS materials',
        'Performance analysis and feedback',
      ],
    },
  ];

  // Duration options
  const durations: Duration[] = [
    { minutes: 30, label: '30 minutes' },
    { minutes: 60, label: '1 hour' },
    { minutes: 90, label: '1.5 hours' },
  ];

  // Time slots (in a real app, this would come from an API)
  const timeSlots: TimeSlot[] = [
    { value: '09:00', label: '9:00 AM', available: true },
    { value: '10:00', label: '10:00 AM', available: true },
    { value: '11:00', label: '11:00 AM', available: false },
    { value: '12:00', label: '12:00 PM', available: true },
    { value: '13:00', label: '1:00 PM', available: true },
    { value: '14:00', label: '2:00 PM', available: true },
    { value: '15:00', label: '3:00 PM', available: false },
    { value: '16:00', label: '4:00 PM', available: true },
    { value: '17:00', label: '5:00 PM', available: true },
    { value: '18:00', label: '6:00 PM', available: true },
    { value: '19:00', label: '7:00 PM', available: true },
    { value: '20:00', label: '8:00 PM', available: false },
  ];

  // Helper functions
  const selectedLessonType = lessonTypes.find(
    type => type.id === formData.lessonType
  )!;
  const selectedDuration = durations.find(
    d => d.minutes === formData.duration
  )!;
  const totalPrice =
    selectedLessonType.prices[
      formData.duration as keyof typeof selectedLessonType.prices
    ];

  // Get minimum date (today)
  const getMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Name is required';
    }

    if (!formData.studentEmail.trim()) {
      newErrors.studentEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail)) {
      newErrors.studentEmail = 'Please enter a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    if (!formData.experience) {
      newErrors.experience = 'Please select your English level';
    }

    if (!formData.goals.trim()) {
      newErrors.goals = 'Please describe your learning goals';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (!session) {
        // Store booking data in localStorage and redirect to sign in
        localStorage.setItem('pendingBooking', JSON.stringify(formData));
        router.push('/auth/signin?callbackUrl=/booking');
        return;
      }

      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonType: formData.lessonType,
          durationMin: formData.duration,
          date: formData.date,
          time: formData.time,
          notes: formData.notes.trim() || undefined,
          studentInfo: {
            name: formData.studentName,
            email: formData.studentEmail,
            phone: formData.studentPhone,
            experience: formData.experience,
            goals: formData.goals,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();

      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setErrors({
        submit: 'Failed to start payment process. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | number
  ): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Book Your English Lesson</h1>
          <p className="lead max-w-3xl mx-auto">
            Choose your preferred lesson type, schedule, and let&apos;s start your English learning journey together.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map(stepNumber => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-brand text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step >= stepNumber ? 'text-brand' : 'text-gray-500'
                  }`}
                >
                  {stepNumber === 1 && 'Choose Lesson'}
                  {stepNumber === 2 && 'Schedule & Details'}
                  {stepNumber === 3 && 'Review & Book'}
                </span>
                {stepNumber < 3 && (
                  <div
                    className={`w-12 h-0.5 ml-4 ${
                      step > stepNumber ? 'bg-brand' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Lesson Type Selection */}
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      Choose Your Lesson Type
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {lessonTypes.map(type => (
                        <Card
                          key={type.id}
                          className={`cursor-pointer transition-all relative ${
                            formData.lessonType === type.id
                              ? 'ring-2 ring-brand bg-brand/5'
                              : 'hover:shadow-xl'
                          }`}
                          onClick={() =>
                            handleInputChange('lessonType', type.id)
                          }
                        >
                          {type.popular && (
                            <div className="absolute -top-3 left-4 bg-brand text-white px-3 py-1 rounded-full text-xs font-medium">
                              Most Popular
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">
                                {type.name}
                              </CardTitle>
                              <span className="text-lg font-bold text-brand">
                                From ${type.prices[30]}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 mb-4">
                              {type.description}
                            </p>
                            <ul className="space-y-2">
                              {type.features.map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-start text-sm text-gray-600"
                                >
                                  <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">
                                    ✓
                                  </span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      Choose Duration
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {durations.map(duration => (
                        <Card
                          key={duration.minutes}
                          className={`cursor-pointer transition-all ${
                            formData.duration === duration.minutes
                              ? 'ring-2 ring-brand bg-brand/5'
                              : 'hover:shadow-lg'
                          }`}
                          onClick={() =>
                            handleInputChange('duration', duration.minutes)
                          }
                        >
                          <CardContent className="text-center py-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {duration.label}
                            </h3>
                            <p className="text-2xl font-bold text-brand">
                              $
                              {
                                selectedLessonType.prices[
                                  duration.minutes as keyof typeof selectedLessonType.prices
                                ]
                              }
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setStep(2)} size="lg">
                      Continue to Schedule
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Schedule & Details */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      Schedule Your Lesson
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <Label htmlFor="date" className="mb-2 block">
                          Preferred Date *
                        </Label>
                        <Input
                          type="date"
                          id="date"
                          value={formData.date}
                          onChange={e =>
                            handleInputChange('date', e.target.value)
                          }
                          min={getMinDate()}
                          className={errors.date ? 'border-red-500' : ''}
                        />
                        {errors.date && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.date}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="time" className="mb-2 block">
                          Preferred Time *
                        </Label>
                        <select
                          id="time"
                          value={formData.time}
                          onChange={e =>
                            handleInputChange('time', e.target.value)
                          }
                          className={`w-full h-12 px-4 py-3 border rounded-lg focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand ${
                            errors.time ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map(slot => (
                            <option
                              key={slot.value}
                              value={slot.value}
                              disabled={!slot.available}
                            >
                              {slot.label}{' '}
                              {!slot.available ? '(Unavailable)' : ''}
                            </option>
                          ))}
                        </select>
                        {errors.time && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.time}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      Your Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label htmlFor="studentName" className="mb-2 block">
                          Full Name *
                        </Label>
                        <Input
                          type="text"
                          id="studentName"
                          value={formData.studentName}
                          onChange={e =>
                            handleInputChange('studentName', e.target.value)
                          }
                          placeholder="Enter your full name"
                          className={errors.studentName ? 'border-red-500' : ''}
                        />
                        {errors.studentName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.studentName}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="studentEmail" className="mb-2 block">
                          Email Address *
                        </Label>
                        <Input
                          type="email"
                          id="studentEmail"
                          value={formData.studentEmail}
                          onChange={e =>
                            handleInputChange('studentEmail', e.target.value)
                          }
                          placeholder="Enter your email address"
                          className={
                            errors.studentEmail ? 'border-red-500' : ''
                          }
                        />
                        {errors.studentEmail && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.studentEmail}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="studentPhone" className="mb-2 block">
                          Phone Number (Optional)
                        </Label>
                        <Input
                          type="tel"
                          id="studentPhone"
                          value={formData.studentPhone}
                          onChange={e =>
                            handleInputChange('studentPhone', e.target.value)
                          }
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <Label htmlFor="experience" className="mb-2 block">
                          English Level *
                        </Label>
                        <select
                          id="experience"
                          value={formData.experience}
                          onChange={e =>
                            handleInputChange('experience', e.target.value)
                          }
                          className={`w-full h-12 px-4 py-3 border rounded-lg focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand ${
                            errors.experience
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select your level</option>
                          <option value="beginner">Beginner (A1-A2)</option>
                          <option value="intermediate">
                            Intermediate (B1-B2)
                          </option>
                          <option value="advanced">Advanced (C1-C2)</option>
                          <option value="native">Native Speaker</option>
                        </select>
                        {errors.experience && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.experience}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <Label htmlFor="goals" className="mb-2 block">
                        Learning Goals *
                      </Label>
                      <Textarea
                        id="goals"
                        value={formData.goals}
                        onChange={e =>
                          handleInputChange('goals', e.target.value)
                        }
                        placeholder="What would you like to achieve? (e.g., improve conversation skills, prepare for IELTS, business English, etc.)"
                        rows={4}
                        className={errors.goals ? 'border-red-500' : ''}
                      />
                      {errors.goals && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.goals}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="notes" className="mb-2 block">
                        Additional Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={e =>
                          handleInputChange('notes', e.target.value)
                        }
                        placeholder="Any specific topics you&apos;d like to focus on or questions you have..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back to Lesson Selection
                    </Button>
                    <Button onClick={() => setStep(3)} size="lg">
                      Review Booking
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Book */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      Review Your Booking
                    </h2>

                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>Lesson Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-600">Lesson Type:</span>
                            <p className="font-medium">
                              {selectedLessonType.name}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Duration:</span>
                            <p className="font-medium">
                              {selectedDuration.label}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Date:</span>
                            <p className="font-medium">
                              {formData.date
                                ? new Date(formData.date).toLocaleDateString(
                                    'en-US',
                                    {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    }
                                  )
                                : 'Not selected'}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Time:</span>
                            <p className="font-medium">
                              {timeSlots.find(
                                slot => slot.value === formData.time
                              )?.label || 'Not selected'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>Student Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-600">Name:</span>
                            <p className="font-medium">
                              {formData.studentName}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600">Email:</span>
                            <p className="font-medium">
                              {formData.studentEmail}
                            </p>
                          </div>
                          {formData.studentPhone && (
                            <div>
                              <span className="text-gray-600">Phone:</span>
                              <p className="font-medium">
                                {formData.studentPhone}
                              </p>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600">
                              English Level:
                            </span>
                            <p className="font-medium capitalize">
                              {formData.experience}
                            </p>
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Learning Goals:</span>
                          <p className="font-medium">{formData.goals}</p>
                        </div>
                        {formData.notes && (
                          <div>
                            <span className="text-gray-600">
                              Additional Notes:
                            </span>
                            <p className="font-medium">{formData.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {errors.submit && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-600">{errors.submit}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back to Details
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      size="lg"
                      className="min-w-[200px]"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        `Book & Pay $${totalPrice}`
                      )}
                    </Button>
                  </div>

                  {!session && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 text-sm">
                        You&apos;ll be redirected to sign in before completing your
                        booking. Your information will be saved.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Booking Summary Sidebar */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lesson Type:</span>
                      <span className="font-medium">
                        {selectedLessonType.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {selectedDuration.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">${totalPrice}</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-brand">${totalPrice}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      What&apos;s Included:
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {selectedLessonType.features
                        .slice(0, 4)
                        .map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-1 mt-0.5">
                              ✓
                            </span>
                            {feature}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      What happens next?
                    </h4>
                    <ol className="text-xs text-gray-600 space-y-1">
                      <li>1. Complete payment securely</li>
                      <li>2. Receive confirmation email</li>
                      <li>3. Get meeting link 24h before</li>
                      <li>4. Join your lesson on time</li>
                    </ol>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-xs text-gray-500">
                      Secure payment powered by Stripe
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I reschedule my lesson?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes, you can reschedule up to 24 hours before your lesson time
                  without any penalty.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What platform do you use?
                </h3>
                <p className="text-gray-600 text-sm">
                  We use Zoom for all online lessons. You&apos;ll receive a meeting
                  link via email.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Do I need any materials?
                </h3>
                <p className="text-gray-600 text-sm">
                  No, all materials will be provided digitally during the
                  lesson. Just bring a notebook if you prefer taking handwritten
                  notes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What&apos;s your cancellation policy?
                </h3>
                <p className="text-gray-600 text-sm">
                  Free cancellation up to 24 hours before the lesson. Late
                  cancellations are subject to a 50% charge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Support */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Need Help?
              </h3>
              <p className="text-gray-600 mb-4">
                Have questions about booking or need assistance? We&apos;re here to
                help!
              </p>
              <Link href="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPageClient;
