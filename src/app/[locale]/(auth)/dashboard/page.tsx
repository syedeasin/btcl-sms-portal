'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { getAuthToken, removeAuthToken } from '@/lib/api-client/auth'
import { Eye, EyeOff, Copy, Check } from 'lucide-react' // ✅ Add icon imports

interface DashboardData {
  user: {
    name: string
    email: string
    phone: string
    company: string
    verificationStatus: string
    password?: string // ✅ Add password field
  }
  statistics: {
    totalSMS: number
    usedSMS: number
    remainingSMS: number
    totalPackages: number
    activePackages: number
    expiredPackages: number
  }
  recentOrders: Array<{
    id: string
    packageName: string
    amount: number
    status: string
    createdAt: string
    expiresAt?: string
  }>
}

export default function DashboardPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // ✅ Add state for password visibility and copy status
  const [showPassword, setShowPassword] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    const token = getAuthToken()
    if (!token) {
      router.push(`/${locale}/login`)
    } else {
      setIsAuthenticated(true)
      fetchDashboardData()
    }
  }, [locale, router])

  const handleLogout = () => {
    removeAuthToken()
    router.push(`/${locale}/login`)
  }

  // ✅ Add copy to clipboard function
  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const fetchDashboardData = async () => {
    try {
      const token = getAuthToken()

      // ✅ In a real implementation, decode the JWT token to get user data
      // For now, get from localStorage if stored during login/registration
      const userEmail = localStorage.getItem('userEmail') || 'john@example.com'
      const userPassword = localStorage.getItem('userPassword') || '********'

      // Mock data for demonstration
      const mockData: DashboardData = {
        user: {
          name: 'John Doe',
          email: userEmail, // ✅ Use stored email
          phone: '+880 1712345678',
          company: 'Example Company Ltd',
          verificationStatus: 'APPROVED',
          password: userPassword // ✅ Use stored password
        },
        statistics: {
          totalSMS: 15000,
          usedSMS: 3500,
          remainingSMS: 11500,
          totalPackages: 3,
          activePackages: 2,
          expiredPackages: 1
        },
        recentOrders: [
          {
            id: '1',
            packageName: 'Business Package',
            amount: 2000,
            status: 'PAID',
            createdAt: '2024-01-15T10:30:00Z',
            expiresAt: '2024-03-15T10:30:00Z'
          },
          {
            id: '2',
            packageName: 'Starter Package',
            amount: 500,
            status: 'PAID',
            createdAt: '2024-01-10T14:20:00Z',
            expiresAt: '2024-02-09T14:20:00Z'
          }
        ]
      }

      setDashboardData(mockData)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated || isLoading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-btcl-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
    )
  }

  if (!dashboardData) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="py-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to load dashboard</h1>
              <p className="text-gray-600 mb-8">Please try refreshing the page.</p>
              <Button onClick={() => window.location.reload()}>Refresh Page</Button>
            </div>
          </div>
          <Footer />
        </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
      case 'APPROVED':
        return 'text-green-600 bg-green-100'
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100'
      case 'CANCELLED':
      case 'REJECTED':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const apiUrl = 'https://a2psms.btcliptelephony.gov.bd/en'

  return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Welcome Header with Logout Button */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {locale === 'en' ? `Welcome` : `স্বাগতম`}
                </h1>
                <p className="text-gray-600">
                  {locale === 'en' ? 'Here\'s an overview of your SMS account' : 'এখানে আপনার এসএমএস অ্যাকাউন্টের একটি সংক্ষিপ্ত বিবরণ রয়েছে'}
                </p>
              </div>
              <Button onClick={handleLogout} variant="outline">
                {locale === 'en' ? 'Logout' : 'লগআউট'}
              </Button>
            </div>

            {/* Account Status Alert */}
            {dashboardData.user.verificationStatus !== 'APPROVED' && (
                <div className="mb-8">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          {locale === 'en' ? 'Account Verification Pending' : 'অ্যাকাউন্ট যাচাইকরণ মুলতবি'}
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            {locale === 'en'
                                ? 'Your account is currently under review. You can purchase packages, but some features may be limited until verification is complete.'
                                : 'আপনার অ্যাকাউন্ট বর্তমানে পর্যালোচনাধীন। আপনি প্যাকেজ ক্রয় করতে পারেন, তবে যাচাইকরণ সম্পূর্ণ না হওয়া পর্যন্ত কিছু বৈশিষ্ট্য সীমিত থাকতে পারে।'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {/* ✅ Account Details Card */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === 'en' ? 'Account Details' : 'অ্যাকাউন্টের বিবরণ'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'en' ? 'Your API credentials and access information' : 'আপনার API শংসাপত্র এবং অ্যাক্সেস তথ্য'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* API URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'en' ? 'API URL' : 'এপিআই ইউআরএল'}
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900 break-all">
                        {apiUrl}
                      </div>
                      <button
                          onClick={() => copyToClipboard(apiUrl, 'url')}
                          className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                          title={locale === 'en' ? 'Copy to clipboard' : 'ক্লিপবোর্ডে কপি করুন'}
                      >
                        {copiedField === 'url' ? (
                            <Check className="w-5 h-5 text-green-600" />
                        ) : (
                            <Copy className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'en' ? 'Username (Email)' : 'ইউজারনেম (ইমেইল)'}
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900">
                        {dashboardData.user.email}
                      </div>
                      <button
                          onClick={() => copyToClipboard(dashboardData.user.email, 'email')}
                          className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                          title={locale === 'en' ? 'Copy to clipboard' : 'ক্লিপবোর্ডে কপি করুন'}
                      >
                        {copiedField === 'email' ? (
                            <Check className="w-5 h-5 text-green-600" />
                        ) : (
                            <Copy className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'en' ? 'Password' : 'পাসওয়ার্ড'}
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900 flex items-center">
                        <span className="flex-1">
                          {showPassword ? dashboardData.user.password : '••••••••••••'}
                        </span>
                      </div>
                      <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                          title={showPassword ? (locale === 'en' ? 'Hide password' : 'পাসওয়ার্ড লুকান') : (locale === 'en' ? 'Show password' : 'পাসওয়ার্ড দেখান')}
                      >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-600" />
                        ) : (
                            <Eye className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                      <button
                          onClick={() => copyToClipboard(dashboardData.user.password || '', 'password')}
                          className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                          title={locale === 'en' ? 'Copy to clipboard' : 'ক্লিপবোর্ডে কপি করুন'}
                      >
                        {copiedField === 'password' ? (
                            <Check className="w-5 h-5 text-green-600" />
                        ) : (
                            <Copy className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          {locale === 'en'
                              ? 'Keep your credentials secure. Never share your password with anyone.'
                              : 'আপনার শংসাপত্র সুরক্ষিত রাখুন। কখনও কারো সাথে আপনার পাসওয়ার্ড শেয়ার করবেন না।'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
  )
}