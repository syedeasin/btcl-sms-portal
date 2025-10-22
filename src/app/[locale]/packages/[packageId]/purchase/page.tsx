'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import CheckoutModal from '@/components/checkout/CheckoutModal'

interface Package {
  id: number
  name: string
  price: number
  sms: number
  validity: number
  features: string[]
}

// const packageData: Record<string, Package> = {
//
//   starter: {
//     id: 101,
//     name: 'Starter Package',
//     price: 500,
//     sms: 1000,
//     validity: 30,
//     features: ['Basic API Access', 'Email Support', 'Standard Delivery', 'Basic Reporting']
//   },
//   business: {
//     id: 102,
//     name: 'Business Package',
//     price: 2000,
//     sms: 5000,
//     validity: 60,
//     features: ['Advanced API Access', 'Priority Support', 'Fast Delivery', 'Custom Sender ID', 'Detailed Analytics']
//   },
//   enterprise: {
//     id: 103,
//     name: 'Enterprise Package',
//     price: 8000,
//     sms: 25000,
//     validity: 90,
//     features: ['Premium API Access', '24/7 Support', 'Instant Delivery', 'Multiple Sender IDs', 'Advanced Analytics', 'Dedicated Manager']
//   },
//   premium: {
//     id: 104,
//     name: 'Premium Package',
//     price: 15000,
//     sms: 50000,
//     validity: 120,
//     features: ['Ultimate API Access', 'VIP Support', 'Priority Routing', 'Unlimited Sender IDs', 'Real-time Analytics', 'Account Manager', 'White-label Solution']
//   }
// }


export default function PurchasePage({
  params
}: {
  params: Promise<{ locale: string; packageId: string }>
}) {
  // For client components in Next.js 15, params are passed as-is at runtime
  // but typed as Promise for consistency
  const { locale, packageId } = params as unknown as { locale: string; packageId: string }
  const t = useTranslations()
  // const { data: session, status } = useSession()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  const packageData: Record<string, Package> = {
    small: {
      id: 201,
      name: locale === 'en' ? 'Small Business' : 'ছোট ব্যবসা',
      price: 20000 * 0.32, // total = sms × rate
      sms: 20000,
      validity: 30,
      features: [
        locale === 'en' ? 'Basic API Access' : 'বেসিক API অ্যাক্সেস',
        locale === 'en' ? 'Email Support' : 'ইমেইল সাপোর্ট',
        locale === 'en' ? 'Standard Delivery' : 'স্ট্যান্ডার্ড ডেলিভারি',
        locale === 'en' ? 'Basic Reports' : 'বেসিক রিপোর্ট',
        locale === 'en' ? 'Single Sender ID' : 'একটি প্রেরক ID',
      ],
    },
    medium: {
      id: 202,
      name: locale === 'en' ? 'Medium Business' : 'মিডিয়াম ব্যবসা',
      price: 50000 * 0.30,
      sms: 50000,
      validity: 60,
      features: [
        locale === 'en' ? 'Advanced API' : 'অ্যাডভান্সড API',
        locale === 'en' ? 'Priority Support' : 'অগ্রাধিকার সাপোর্ট',
        locale === 'en' ? 'Fast Delivery' : 'দ্রুত ডেলিভারি',
        locale === 'en' ? 'Custom Sender ID' : 'কাস্টম প্রেরক ID',
        locale === 'en' ? 'Detailed Analytics' : 'বিস্তারিত অ্যানালিটিক্স',
        locale === 'en' ? 'Multiple Projects' : 'একাধিক প্রোজেক্ট',
      ],
    },
    large: {
      id: 203,
      name: locale === 'en' ? 'Large Business' : 'বড় ব্যবসা',
      price: 100000 * 0.28,
      sms: 100000,
      validity: 90,
      features: [
        locale === 'en' ? 'Premium API' : 'প্রিমিয়াম API',
        locale === 'en' ? '24/7 Phone Support' : '২৪/৭ ফোন সাপোর্ট',
        locale === 'en' ? 'Instant Delivery' : 'তাৎক্ষণিক ডেলিভারি',
        locale === 'en' ? 'Multiple Sender IDs' : 'একাধিক প্রেরক ID',
        locale === 'en' ? 'Advanced Analytics' : 'উন্নত অ্যানালিটিক্স',
        locale === 'en' ? 'Dedicated Manager' : 'ডেডিকেটেড ম্যানেজার',
        locale === 'en' ? 'Priority Routing' : 'অগ্রাধিকার রাউটিং',
      ],
    },
  }

  const pkg = packageData[packageId]

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/${locale}/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`)
    }
  }, [status, locale, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-btcl-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
            <p className="text-gray-600 mb-8">The requested package could not be found.</p>
            <Link href={`/${locale}/packages`}>
              <Button>View All Packages</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const totalAmount = pkg.price * quantity
  const totalSMS = pkg.sms * quantity

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Complete Your Purchase' : 'আপনার ক্রয় সম্পূর্ণ করুন'}
            </h1>
            <p className="text-lg text-gray-600">
              {locale === 'en' ? 'Review your order and proceed to payment' : 'আপনার অর্ডার পর্যালোচনা করুন এবং পেমেন্টে এগিয়ে যান'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Package Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription>
                  {locale === 'en' ? 'Package details and features' : 'প্যাকেজের বিবরণ এবং বৈশিষ্ট্য'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {locale === 'en' ? 'SMS Count' : 'এসএমএস সংখ্যা'}
                      </span>
                      <div className="text-lg font-semibold">{pkg.sms.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {locale === 'en' ? 'Validity' : 'মেয়াদ'}
                      </span>
                      <div className="text-lg font-semibold">{pkg.validity} {locale === 'en' ? 'days' : 'দিন'}</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {locale === 'en' ? 'Price' : 'মূল্য'}
                      </span>
                      <div className="text-lg font-semibold text-btcl-primary">৳{pkg.price.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {locale === 'en' ? 'Per SMS' : 'প্রতি এসএমএস'}
                      </span>
                      <div className="text-lg font-semibold">৳{(pkg.price / pkg.sms).toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {locale === 'en' ? 'Included Features:' : 'অন্তর্ভুক্ত বৈশিষ্ট্য:'}
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-btcl-primary mr-2 mt-0.5">✓</span>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary & Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {locale === 'en' ? 'Order Summary' : 'অর্ডার সংক্ষেপ'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Quantity Selection */}
                  <div>
                    <Input
                      label={locale === 'en' ? 'Quantity' : 'পরিমাণ'}
                      type="number"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {locale === 'en' ? 'You can purchase up to 10 packages at once' : 'আপনি একসাথে সর্বোচ্চ ১০টি প্যাকেজ ক্রয় করতে পারেন'}
                    </p>
                  </div>

                  {/* Calculation */}
                  <div className="border-t border-b py-4 space-y-2">
                    <div className="flex justify-between">
                      <span>{locale === 'en' ? 'Package Price' : 'প্যাকেজ মূল্য'}</span>
                      <span>৳{pkg.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{locale === 'en' ? 'Quantity' : 'পরিমাণ'}</span>
                      <span>×{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{locale === 'en' ? 'Total SMS' : 'মোট এসএমএস'}</span>
                      <span>{totalSMS.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-btcl-primary">
                      <span>{locale === 'en' ? 'Total Amount' : 'মোট পরিমাণ'}</span>
                      <span>৳{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Methods Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {locale === 'en' ? 'Secure Payment' : 'নিরাপদ পেমেন্ট'}
                    </h4>
                    <p className="text-sm text-blue-800 mb-2">
                      {locale === 'en'
                        ? 'Your payment is processed securely through SSL Commerz. We accept:'
                        : 'আপনার পেমেন্ট SSL Commerz এর মাধ্যমে নিরাপদে প্রসেস করা হয়। আমরা গ্রহণ করি:'
                      }
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">bKash</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Nagad</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Rocket</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Visa</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Mastercard</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Bank Transfer</span>
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setIsModalOpen(true)}
                    // onClick={handlePurchase}
                    loading={isProcessing}
                    disabled={isProcessing}
                  >
                    {isProcessing
                      ? (locale === 'en' ? 'Processing...' : 'প্রসেসিং...')
                      : (locale === 'en' ? 'Proceed to Payment' : 'পেমেন্টে এগিয়ে যান')
                    }
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    {locale === 'en'
                      ? 'By clicking "Proceed to Payment", you agree to our Terms of Service and Privacy Policy.'
                      : '"পেমেন্টে এগিয়ে যান" ক্লিক করে, আপনি আমাদের সেবার শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হচ্ছেন।'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      {isModalOpen && (
          <CheckoutModal
              onClose={() => setIsModalOpen(false)}
              pkg={pkg}
              quantity={quantity}
              locale={locale}
              isOpen={isModalOpen}
          />
      )}

    </div>
  )
}