'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, useParams } from 'next/navigation' // Add useParams import
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { getAuthToken, removeAuthToken } from '@/lib/api-client/auth'

interface DashboardData {
  user: {
    name: string
    email: string
    phone: string
    company: string
    verificationStatus: string
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

  const fetchDashboardData = async () => {
    try {
      // This would be a real API call using the auth token
      // For now, we'll use mock data
      const token = getAuthToken()

      // In a real implementation, you would use the token to fetch user data
      // Example:
      // const response = await fetch('/api/dashboard', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      // const data = await response.json();

      // Mock data for demonstration
      const mockData: DashboardData = {
        user: {
          name: 'John Doe', // You would get this from your API
          email: 'john@example.com', // You would get this from your API
          phone: '+880 1712345678',
          company: 'Example Company Ltd',
          verificationStatus: 'APPROVED'
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

  return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Welcome Header with Logout Button */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {locale === 'en' ? `Welcome, ${dashboardData.user.name}!` : `স্বাগতম, ${dashboardData.user.name}!`}
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

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>{locale === 'en' ? 'Total SMS' : 'মোট এসএমএস'}</CardDescription>
                  <CardTitle className="text-3xl font-bold text-btcl-primary">
                    {dashboardData.statistics.totalSMS.toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {locale === 'en' ? 'Across all packages' : 'সব প্যাকেজ মিলিয়ে'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>{locale === 'en' ? 'Used SMS' : 'ব্যবহৃত এসএমএস'}</CardDescription>
                  <CardTitle className="text-3xl font-bold text-orange-600">
                    {dashboardData.statistics.usedSMS.toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {((dashboardData.statistics.usedSMS / dashboardData.statistics.totalSMS) * 100).toFixed(1)}% {locale === 'en' ? 'of total' : 'মোট'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>{locale === 'en' ? 'Remaining SMS' : 'অবশিষ্ট এসএমএস'}</CardDescription>
                  <CardTitle className="text-3xl font-bold text-green-600">
                    {dashboardData.statistics.remainingSMS.toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {((dashboardData.statistics.remainingSMS / dashboardData.statistics.totalSMS) * 100).toFixed(1)}% {locale === 'en' ? 'remaining' : 'অবশিষ্ট'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>{locale === 'en' ? 'Active Packages' : 'সক্রিয় প্যাকেজ'}</CardDescription>
                  <CardTitle className="text-3xl font-bold text-btcl-primary">
                    {dashboardData.statistics.activePackages}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {dashboardData.statistics.totalPackages} {locale === 'en' ? 'total packages' : 'মোট প্যাকেজ'}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>{locale === 'en' ? 'Recent Orders' : 'সাম্প্রতিক অর্ডার'}</CardTitle>
                  <CardDescription>
                    {locale === 'en' ? 'Your latest package purchases' : 'আপনার সর্বশেষ প্যাকেজ ক্রয়'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{order.packageName}</h4>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.createdAt)}
                              {order.expiresAt && ` • ${locale === 'en' ? 'Expires' : 'মেয়াদ শেষ'} ${formatDate(order.expiresAt)}`}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">৳{order.amount.toLocaleString()}</div>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                          </div>
                        </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link href={`/${locale}/dashboard/orders`}>
                      <Button variant="outline" className="w-full">
                        {locale === 'en' ? 'View All Orders' : 'সব অর্ডার দেখুন'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>{locale === 'en' ? 'Quick Actions' : 'দ্রুত ক্রিয়া'}</CardTitle>
                  <CardDescription>
                    {locale === 'en' ? 'Common tasks and shortcuts' : 'সাধারণ কাজ এবং শর্টকাট'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <Link href={`/${locale}/packages`}>
                      <Button className="w-full justify-start" variant="outline">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {locale === 'en' ? 'Buy SMS Package' : 'এসএমএস প্যাকেজ কিনুন'}
                      </Button>
                    </Link>

                    <Link href={`/${locale}/dashboard/api`}>
                      <Button className="w-full justify-start" variant="outline">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        {locale === 'en' ? 'API Documentation' : 'API ডকুমেন্টেশন'}
                      </Button>
                    </Link>

                    <Link href={`/${locale}/dashboard/reports`}>
                      <Button className="w-full justify-start" variant="outline">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        {locale === 'en' ? 'View Reports' : 'রিপোর্ট দেখুন'}
                      </Button>
                    </Link>

                    <Link href={`/${locale}/dashboard/profile`}>
                      <Button className="w-full justify-start" variant="outline">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {locale === 'en' ? 'Edit Profile' : 'প্রোফাইল সম্পাদনা'}
                      </Button>
                    </Link>
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