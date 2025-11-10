// 'use client'
//
// import { useEffect, useState } from 'react'
// import { useTranslations } from 'next-intl'
// import { useRouter, useParams } from 'next/navigation'
// import { Header } from '@/components/layout/Header'
// import { Footer } from '@/components/layout/Footer'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
// import { Button } from '@/components/ui/Button'
// import Link from 'next/link'
// import { getAuthToken, removeAuthToken } from '@/lib/api-client/auth'
// import { Eye, EyeOff, Copy, Check } from 'lucide-react' // ✅ Add icon imports
//
// interface DashboardData {
//   user: {
//     name: string
//     email: string
//     phone: string
//     company: string
//     verificationStatus: string
//     password?: string // ✅ Add password field
//   }
//   statistics: {
//     totalSMS: number
//     usedSMS: number
//     remainingSMS: number
//     totalPackages: number
//     activePackages: number
//     expiredPackages: number
//   }
//   recentOrders: Array<{
//     id: string
//     packageName: string
//     amount: number
//     status: string
//     createdAt: string
//     expiresAt?: string
//   }>
// }
//
// export default function DashboardPage() {
//   const params = useParams()
//   const locale = params.locale as string
//   const t = useTranslations()
//   const router = useRouter()
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//
//   // ✅ Add state for password visibility and copy status
//   const [showPassword, setShowPassword] = useState(false)
//   const [copiedField, setCopiedField] = useState<string | null>(null)
//
//   useEffect(() => {
//     // Check if user is authenticated
//     const token = getAuthToken()
//     if (!token) {
//       router.push(`/${locale}/login`)
//     } else {
//       setIsAuthenticated(true)
//       fetchDashboardData()
//     }
//   }, [locale, router])
//
//   const handleLogout = () => {
//     removeAuthToken()
//     router.push(`/${locale}/login`)
//   }
//
//   // ✅ Add copy to clipboard function
//   const copyToClipboard = async (text: string, field: string) => {
//     try {
//       await navigator.clipboard.writeText(text)
//       setCopiedField(field)
//       setTimeout(() => setCopiedField(null), 2000)
//     } catch (err) {
//       console.error('Failed to copy:', err)
//     }
//   }
//
//   const fetchDashboardData = async () => {
//     try {
//       const token = getAuthToken()
//
//       // ✅ In a real implementation, decode the JWT token to get user data
//       // For now, get from localStorage if stored during login/registration
//       const userEmail = localStorage.getItem('userEmail') || 'john@example.com'
//       const userPassword = localStorage.getItem('userPassword') || '********'
//
//       // Mock data for demonstration
//       const mockData: DashboardData = {
//         user: {
//           name: 'John Doe',
//           email: userEmail, // ✅ Use stored email
//           phone: '+880 1712345678',
//           company: 'Example Company Ltd',
//           verificationStatus: 'APPROVED',
//           password: userPassword // ✅ Use stored password
//         },
//         statistics: {
//           totalSMS: 15000,
//           usedSMS: 3500,
//           remainingSMS: 11500,
//           totalPackages: 3,
//           activePackages: 2,
//           expiredPackages: 1
//         },
//         recentOrders: [
//           {
//             id: '1',
//             packageName: 'Business Package',
//             amount: 2000,
//             status: 'PAID',
//             createdAt: '2024-01-15T10:30:00Z',
//             expiresAt: '2024-03-15T10:30:00Z'
//           },
//           {
//             id: '2',
//             packageName: 'Starter Package',
//             amount: 500,
//             status: 'PAID',
//             createdAt: '2024-01-10T14:20:00Z',
//             expiresAt: '2024-02-09T14:20:00Z'
//           }
//         ]
//       }
//
//       setDashboardData(mockData)
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }
//
//   if (!isAuthenticated || isLoading) {
//     return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-btcl-primary mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading dashboard...</p>
//           </div>
//         </div>
//     )
//   }
//
//   if (!dashboardData) {
//     return (
//         <div className="min-h-screen bg-gray-50">
//           <Header />
//           <div className="py-20">
//             <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//               <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to load dashboard</h1>
//               <p className="text-gray-600 mb-8">Please try refreshing the page.</p>
//               <Button onClick={() => window.location.reload()}>Refresh Page</Button>
//             </div>
//           </div>
//           <Footer />
//         </div>
//     )
//   }
//
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'PAID':
//       case 'APPROVED':
//         return 'text-green-600 bg-green-100'
//       case 'PENDING':
//         return 'text-yellow-600 bg-yellow-100'
//       case 'CANCELLED':
//       case 'REJECTED':
//         return 'text-red-600 bg-red-100'
//       default:
//         return 'text-gray-600 bg-gray-100'
//     }
//   }
//
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     })
//   }
//
//   const apiUrl = 'https://a2psms.btcliptelephony.gov.bd/en'
//
//   return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//
//         <div className="py-8">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             {/* Welcome Header with Logout Button */}
//             <div className="flex justify-between items-center mb-8">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   {locale === 'en' ? `Welcome` : `স্বাগতম`}
//                 </h1>
//                 <p className="text-gray-600">
//                   {locale === 'en' ? 'Here\'s an overview of your SMS account' : 'এখানে আপনার এসএমএস অ্যাকাউন্টের একটি সংক্ষিপ্ত বিবরণ রয়েছে'}
//                 </p>
//               </div>
//               <Button onClick={handleLogout} variant="outline">
//                 {locale === 'en' ? 'Logout' : 'লগআউট'}
//               </Button>
//             </div>
//
//             {/* Account Status Alert */}
//             {dashboardData.user.verificationStatus !== 'APPROVED' && (
//                 <div className="mb-8">
//                   <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                     <div className="flex">
//                       <div className="flex-shrink-0">
//                         <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                       <div className="ml-3">
//                         <h3 className="text-sm font-medium text-yellow-800">
//                           {locale === 'en' ? 'Account Verification Pending' : 'অ্যাকাউন্ট যাচাইকরণ মুলতবি'}
//                         </h3>
//                         <div className="mt-2 text-sm text-yellow-700">
//                           <p>
//                             {locale === 'en'
//                                 ? 'Your account is currently under review. You can purchase packages, but some features may be limited until verification is complete.'
//                                 : 'আপনার অ্যাকাউন্ট বর্তমানে পর্যালোচনাধীন। আপনি প্যাকেজ ক্রয় করতে পারেন, তবে যাচাইকরণ সম্পূর্ণ না হওয়া পর্যন্ত কিছু বৈশিষ্ট্য সীমিত থাকতে পারে।'
//                             }
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//             )}
//
//             {/* ✅ Account Details Card */}
//             <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     {locale === 'en' ? 'Account Details' : 'অ্যাকাউন্টের বিবরণ'}
//                   </CardTitle>
//                   <CardDescription>
//                     {locale === 'en' ? 'Your API credentials and access information' : 'আপনার API শংসাপত্র এবং অ্যাক্সেস তথ্য'}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   {/* API URL */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {locale === 'en' ? 'API URL' : 'এপিআই ইউআরএল'}
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900 break-all">
//                         {apiUrl}
//                       </div>
//                       <button
//                           onClick={() => copyToClipboard(apiUrl, 'url')}
//                           className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
//                           title={locale === 'en' ? 'Copy to clipboard' : 'ক্লিপবোর্ডে কপি করুন'}
//                       >
//                         {copiedField === 'url' ? (
//                             <Check className="w-5 h-5 text-green-600" />
//                         ) : (
//                             <Copy className="w-5 h-5 text-gray-600" />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//
//                   {/* Username */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {locale === 'en' ? 'Username (Email)' : 'ইউজারনেম (ইমেইল)'}
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900">
//                         {dashboardData.user.email}
//                       </div>
//                       <button
//                           onClick={() => copyToClipboard(dashboardData.user.email, 'email')}
//                           className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
//                           title={locale === 'en' ? 'Copy to clipboard' : 'ক্লিপবোর্ডে কপি করুন'}
//                       >
//                         {copiedField === 'email' ? (
//                             <Check className="w-5 h-5 text-green-600" />
//                         ) : (
//                             <Copy className="w-5 h-5 text-gray-600" />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//
//                   {/* Password */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {locale === 'en' ? 'Password' : 'পাসওয়ার্ড'}
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900 flex items-center">
//                         <span className="flex-1">
//                           {showPassword ? dashboardData.user.password : '••••••••••••'}
//                         </span>
//                       </div>
//                       <button
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
//                           title={showPassword ? (locale === 'en' ? 'Hide password' : 'পাসওয়ার্ড লুকান') : (locale === 'en' ? 'Show password' : 'পাসওয়ার্ড দেখান')}
//                       >
//                         {showPassword ? (
//                             <EyeOff className="w-5 h-5 text-gray-600" />
//                         ) : (
//                             <Eye className="w-5 h-5 text-gray-600" />
//                         )}
//                       </button>
//                       <button
//                           onClick={() => copyToClipboard(dashboardData.user.password || '', 'password')}
//                           className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
//                           title={locale === 'en' ? 'Copy to clipboard' : 'ক্লিপবোর্ডে কপি করুন'}
//                       >
//                         {copiedField === 'password' ? (
//                             <Check className="w-5 h-5 text-green-600" />
//                         ) : (
//                             <Copy className="w-5 h-5 text-gray-600" />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//
//                   {/* Security Notice */}
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
//                     <div className="flex">
//                       <div className="flex-shrink-0">
//                         <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                       <div className="ml-3">
//                         <p className="text-sm text-blue-700">
//                           {locale === 'en'
//                               ? 'Keep your credentials secure. Never share your password with anyone.'
//                               : 'আপনার শংসাপত্র সুরক্ষিত রাখুন। কখনও কারো সাথে আপনার পাসওয়ার্ড শেয়ার করবেন না।'
//                           }
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//
//         <Footer />
//       </div>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import { Eye, EyeOff, Copy, Check, ExternalLink, Package, CheckCircle, XCircle } from 'lucide-react'
import {Header} from "@/components/layout/Header";

// Mock packages data
const packages = [
  {
    id: 'small',
    name: 'Small Business',
    sms: 20000,
    rate: 0.32,
    validity: 30,
    features: ['Basic API Access', 'Email Support', 'Standard Delivery', 'Basic Reports', 'Single Sender ID']
  },
  {
    id: 'medium',
    name: 'Medium Business',
    sms: 50000,
    rate: 0.30,
    validity: 60,
    features: ['Advanced API', 'Priority Support', 'Fast Delivery', 'Custom Sender ID', 'Detailed Analytics', 'Multiple Projects']
  },
  {
    id: 'large',
    name: 'Large Business',
    sms: 100000,
    rate: 0.28,
    validity: 90,
    features: ['Premium API', '24/7 Phone Support', 'Instant Delivery', 'Multiple Sender IDs', 'Advanced Analytics', 'Dedicated Manager', 'Priority Routing']
  }
]

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  address1: string
  address2?: string
  address3?: string
  address4?: string
  city: string
  state: string
  postalCode: string
  country: string
  nidNumber: string
  tradeLicenseNumber: string
  tinNumber: string
  taxReturnDate: string
  documents?: {
    tradeLicenseFile?: string
    tinFile?: string
    taxReturnFile?: string
    identityCardFrontSide?: string
    identityCardBackSide?: string
    bincertificate?: string
    jointStockFile?: string
    btrcFile?: string
    photoFile?: string
    slaFile?: string
  }
}

export default function Dashboard() {
  const [showPassword, setShowPassword] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [accountStatus, setAccountStatus] = useState('active') // active or inactive
  const [currentPackage, setCurrentPackage] = useState(packages[1]) // Default to medium package

  const bulkSmsPortalUrl = 'https://a2psms.btcliptelephony.gov.bd:4000/'

  useEffect(() => {
    // Fetch user data from localStorage (stored during registration)
    const email = localStorage.getItem('userEmail') || ''
    const password = localStorage.getItem('userPassword') || ''

    // In production, this data should come from your API after fetching user profile
    // For now, we're using localStorage as a temporary solution
    const storedUserData = localStorage.getItem('registrationData')

    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData)
        setUserData(parsedData)
      } catch (error) {
        console.error('Error parsing user data:', error)
        // Fallback to mock data if parsing fails
        setMockUserData(email, password)
      }
    } else {
      // Mock data for demonstration
      setMockUserData(email, password)
    }
  }, [])

  const setMockUserData = (email: string, password: string) => {
    const mockUserData: UserData = {
      firstName: 'John',
      lastName: 'Doe',
      email: email || 'john.doe@example.com',
      phone: '+880 1712345678',
      password: password || '********',
      address1: '123 Main Street',
      address2: 'Apartment 4B',
      address3: 'Block C',
      address4: 'Near Central Park',
      city: 'Dhaka',
      state: 'Dhaka Division',
      postalCode: '1200',
      country: 'BD',
      nidNumber: '1234567890123',
      tradeLicenseNumber: 'TL-2024-001',
      tinNumber: 'TIN-123456',
      taxReturnDate: '2024-12-31',
      documents: {
        tradeLicenseFile: 'trade-license.pdf',
        tinFile: 'tin-certificate.pdf',
        taxReturnFile: 'tax-return-2024.pdf',
        identityCardFrontSide: 'nid-front.jpg',
        identityCardBackSide: 'nid-back.jpg',
        bincertificate: 'bin-certificate.pdf',
        jointStockFile: 'joint-stock.pdf',
        btrcFile: 'btrc-registration.pdf',
        photoFile: 'passport-photo.jpg',
        slaFile: 'sla-document.pdf'
      }
    }

    setUserData(mockUserData)
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!userData) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
    )
  }

  const calculateTotal = (sms: number, rate: number) => {
    return (sms * rate).toFixed(2)
  }

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userData.firstName} {userData.lastName}!
            </h2>
            <p className="text-gray-600">Here's an overview of your SMS account</p>
          </div>

          {/* Bulk SMS Portal Link */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white text-xl font-semibold mb-2">Bulk SMS Portal</h3>
                <p className="text-green-100 text-sm">Access the portal to send SMS messages</p>
              </div>
              <a
                  href={bulkSmsPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Myself Portal Login
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Account Status & Current Package */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Account Status */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
                {accountStatus === 'active' ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    accountStatus === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                }`}>
                  {accountStatus === 'active' ? 'Active' : 'Inactive'}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                {accountStatus === 'active'
                    ? 'Your account is active and ready to send SMS'
                    : 'Please contact support to activate your account'}
              </p>
            </div>

            {/* Current Package */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Package</h3>
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-semibold text-gray-900">{currentPackage.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">SMS Limit:</span>
                  <span className="font-semibold text-gray-900">{currentPackage.sms.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Validity:</span>
                  <span className="font-semibold text-gray-900">{currentPackage.validity} days</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-gray-600">Total Cost:</span>
                  <span className="font-bold text-green-600 text-lg">৳{calculateTotal(currentPackage.sms, currentPackage.rate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* API Credentials */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Bulk SMS Portal</h3>
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username (Email)</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900">
                    {userData.email}
                  </div>
                  <button
                      onClick={() => copyToClipboard(userData.email, 'email')}
                      className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900">
                    {showPassword ? userData.password : '••••••••••••'}
                  </div>
                  <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-600" />
                    ) : (
                        <Eye className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  <button
                      onClick={() => copyToClipboard(userData.password, 'password')}
                      className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
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
                  <svg className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-3 text-sm text-blue-700">
                    Keep your credentials secure. Never share your password with anyone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <p className="text-gray-900 font-medium">{userData.firstName} {userData.lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <p className="text-gray-900 font-medium">{userData.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <p className="text-gray-900 font-medium">{userData.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NID Number</label>
                <p className="text-gray-900 font-medium">{userData.nidNumber}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                <p className="text-gray-900">{userData.address1}</p>
              </div>
              {userData.address2 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                    <p className="text-gray-900">{userData.address2}</p>
                  </div>
              )}
              {userData.address3 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 3</label>
                    <p className="text-gray-900">{userData.address3}</p>
                  </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <p className="text-gray-900">{userData.city}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State/Division</label>
                <p className="text-gray-900">{userData.state}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <p className="text-gray-900">{userData.postalCode}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <p className="text-gray-900">{userData.country === 'BD' ? 'Bangladesh' : userData.country}</p>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trade License Number</label>
                <p className="text-gray-900 font-medium">{userData.tradeLicenseNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">TIN Number</label>
                <p className="text-gray-900 font-medium">{userData.tinNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Return Date</label>
                <p className="text-gray-900 font-medium">
                  {new Date(userData.taxReturnDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Uploaded Documents */}
            {userData.documents && (
                <>
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userData.documents.tradeLicenseFile && (
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Trade License</span>
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{userData.documents.tradeLicenseFile}</p>
                          </div>
                      )}

                      {userData.documents.tinFile && (
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">TIN Certificate</span>
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{userData.documents.tinFile}</p>
                          </div>
                      )}

                      {userData.documents.identityCardFrontSide && (
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">NID Front Side</span>
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{userData.documents.identityCardFrontSide}</p>
                          </div>
                      )}

                      {userData.documents.identityCardBackSide && (
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">NID Back Side</span>
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{userData.documents.identityCardBackSide}</p>
                          </div>
                      )}

                      {userData.documents.bincertificate && (
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">BIN Certificate</span>
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{userData.documents.bincertificate}</p>
                          </div>
                      )}

                      {userData.documents.taxReturnFile && (
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Tax Return</span>
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{userData.documents.taxReturnFile}</p>
                          </div>
                      )}

                      {userData.documents.jointStockFile && (
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Joint Stock Documents</span>
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{userData.documents.jointStockFile}</p>
                          </div>
                      )}

                      {userData.documents.btrcFile && (
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">BTRC Registration</span>
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{userData.documents.btrcFile}</p>
                          </div>
                      )}

                      {userData.documents.photoFile && (
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Photo</span>
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{userData.documents.photoFile}</p>
                          </div>
                      )}

                      {userData.documents.slaFile && (
                          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">SLA Document</span>
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{userData.documents.slaFile}</p>
                          </div>
                      )}
                    </div>
                  </div>
                </>
            )}
          </div>

          {/* Available Packages */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Available SMS Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                  <div
                      key={pkg.id}
                      className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
                          currentPackage.id === pkg.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-300'
                      }`}
                  >
                    <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                      <div className="mb-2">
                        <span className="text-3xl font-bold text-gray-900">৳{pkg.rate.toFixed(2)}</span>
                        <span className="text-gray-600 text-sm">/SMS</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        Total: ৳{calculateTotal(pkg.sms, pkg.rate)}
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-center text-sm">
                          <span className="text-gray-600">{pkg.sms.toLocaleString()} SMS</span>
                        </div>
                        <div className="flex items-center justify-center text-sm">
                          <span className="text-gray-600">{pkg.validity} days validity</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      {pkg.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                      ))}
                    </div>
                    <button
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                            currentPackage.id === pkg.id
                                ? 'bg-green-600 text-white cursor-default'
                                : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                        disabled={currentPackage.id === pkg.id}
                    >
                      {currentPackage.id === pkg.id ? 'Current Package' : 'Purchase'}
                    </button>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}