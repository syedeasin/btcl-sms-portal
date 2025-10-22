import React from 'react';
import {Footer} from "@/components/layout/Footer";
import {Header} from "@/components/layout/Header";
import {Button} from "@/components/ui/Button";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/Card";

const PricingPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  // const packages = [
  //   {
  //     id: 'small',
  //     name: 'Small Business',
  //     sms: 20000,
  //     rate: 0.32,
  //     validity: 30,
  //     popular: false,
  //     features: [
  //       'Basic API Access',
  //       'Email Support',
  //       'Standard Delivery',
  //       'Basic Reports',
  //       'Single Sender ID'
  //     ]
  //   },
  //   {
  //     id: 'medium',
  //     name: 'Medium Business',
  //     sms: 50000,
  //     rate: 0.30,
  //     validity: 60,
  //     popular: true,
  //     features: [
  //       'Advanced API',
  //       'Priority Support',
  //       'Fast Delivery',
  //       'Custom Sender ID',
  //       'Detailed Analytics',
  //       'Multiple Projects'
  //     ]
  //   },
  //   {
  //     id: 'large',
  //     name: 'Large Business',
  //     sms: 100000,
  //     rate: 0.28,
  //     validity: 90,
  //     popular: false,
  //     features: [
  //       'Premium API',
  //       '24/7 Phone Support',
  //       'Instant Delivery',
  //       'Multiple Sender IDs',
  //       'Advanced Analytics',
  //       'Dedicated Manager',
  //       'Priority Routing'
  //     ]
  //   }
  // ];
  const packages = [
    {
      id: 'small',
      name: 'Small Business',
      sms: 20000,
      rate: 0.32,
      validity: 30,
      popular: false,
      features: [
        'Basic API Access',
        'Email Support',
        'Standard Delivery',
        'Basic Reports',
        'Single Sender ID',
      ],
    },
    {
      id: 'medium',
      name: 'Medium Business',
      sms: 50000,
      rate: 0.30,
      validity: 60,
      popular: true,
      features: [
        'Advanced API',
        'Priority Support',
        'Fast Delivery',
        'Custom Sender ID',
        'Detailed Analytics',
        'Multiple Projects',
      ],
    },
    {
      id: 'large',
      name: 'Large Business',
      sms: 100000,
      rate: 0.28,
      validity: 90,
      popular: false,
      features: [
        'Premium API',
        '24/7 Phone Support',
        'Instant Delivery',
        'Multiple Sender IDs',
        'Advanced Analytics',
        'Dedicated Manager',
        'Priority Routing',
      ],
    },
  ];

  const calculateTotal = (sms: number, rate: number): string => {
    return (sms * rate).toLocaleString();
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <div className="py-20 px-4 sm:px-6 lg:px-8" style={{background: 'linear-gradient(135deg, #00A651 0%, #008A43 100%)'}}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-left">
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  A2P SMS Pricing
                </h1>
                <p className="text-xl text-green-100 mb-8 max-w-lg">
                  Application-to-Person SMS pricing with volume discounts. Choose the perfect plan for your business needs.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center bg-green-600 bg-opacity-30 backdrop-blur-sm border border-green-400 rounded-full px-4 py-2 text-white">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">No Setup Fees</span>
                  </div>
                  <div className="flex items-center bg-green-600 bg-opacity-30 backdrop-blur-sm border border-green-400 rounded-full px-4 py-2 text-white">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Instant Activation</span>
                  </div>
                  <div className="flex items-center bg-green-600 bg-opacity-30 backdrop-blur-sm border border-green-400 rounded-full px-4 py-2 text-white">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Cancel Anytime</span>
                  </div>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="relative lg:ml-8">
                <div className="relative">
                  {/* Phone/Device Frame */}
                  <div className="relative bg-gray-800 rounded-3xl p-1 shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
                    <div className="bg-white rounded-2xl overflow-hidden">
                      {/* Phone Header */}
                      <div className="bg-green-500 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                          <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                          <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
                        </div>
                        <div className="text-white text-sm font-medium">MESSAGES</div>
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </div>
                      </div>

                      {/* Messages Content */}
                      <div className="p-4 bg-gray-50 h-64 space-y-3">
                        {/* Incoming Message Bubble */}
                        <div className="flex justify-start">
                          <div className="max-w-xs bg-white rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
                            <div className="text-xs text-gray-600 mb-1">Your OTP Code</div>
                            <div className="text-sm text-gray-800">123456 is your verification code</div>
                          </div>
                        </div>

                        {/* Outgoing Message Bubble */}
                        <div className="flex justify-end">
                          <div className="max-w-xs bg-green-500 rounded-2xl rounded-br-sm px-4 py-2 shadow-sm">
                            <div className="text-sm text-white">Thank you!</div>
                          </div>
                        </div>

                        {/* Another Incoming Message */}
                        <div className="flex justify-start">
                          <div className="max-w-xs bg-white rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
                            <div className="text-xs text-gray-600 mb-1">Promotion Alert</div>
                            <div className="text-sm text-gray-800">50% off on your next purchase!</div>
                          </div>
                        </div>

                        {/* Typing Indicator */}
                        <div className="flex justify-start">
                          <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-400 bg-opacity-20 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-green-300 bg-opacity-15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 -right-8 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>

                  {/* Message Icons */}
                  <div className="absolute -top-8 right-4 bg-white rounded-full p-2 shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}>
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>

                  <div className="absolute bottom-4 -left-6 bg-white rounded-full p-2 shadow-lg animate-bounce" style={{animationDelay: '1.5s'}}>
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Popular A2P SMS Packages
              </h2>
              <p className="text-xl text-gray-600">
                Reliable A2P SMS bundles at great rates. (Excluding 15% VAT)
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: 'small',
                  name: locale === 'en' ? 'Small Business' : 'ছোট ব্যবসা',
                  sms: 20000,
                  rate: 0.32,
                  validity: 30,
                  popular: false,
                  features: [
                    locale === 'en' ? 'Basic API Access' : 'বেসিক API অ্যাক্সেস',
                    locale === 'en' ? 'Email Support' : 'ইমেইল সাপোর্ট',
                    locale === 'en' ? 'Standard Delivery' : 'স্ট্যান্ডার্ড ডেলিভারি',
                    locale === 'en' ? 'Basic Reports' : 'বেসিক রিপোর্ট',
                    locale === 'en' ? 'Single Sender ID' : 'একক প্রেরক ID'
                  ]
                },
                {
                  id: 'medium',
                  name: locale === 'en' ? 'Medium Business' : 'মাঝারি ব্যবসা',
                  sms: 50000,
                  rate: 0.30,
                  validity: 60,
                  popular: true,
                  features: [
                    locale === 'en' ? 'Advanced API' : 'অ্যাডভান্সড API',
                    locale === 'en' ? 'Priority Support' : 'অগ্রাধিকার সাপোর্ট',
                    locale === 'en' ? 'Fast Delivery' : 'দ্রুত ডেলিভারি',
                    locale === 'en' ? 'Custom Sender ID' : 'কাস্টম প্রেরক ID',
                    locale === 'en' ? 'Detailed Analytics' : 'বিস্তারিত অ্যানালিটিক্স',
                    locale === 'en' ? 'Multiple Projects' : 'একাধিক প্রকল্প'
                  ]
                },
                {
                  id: 'large',
                  name: locale === 'en' ? 'Large Business' : 'বড় ব্যবসা',
                  sms: 100000,
                  rate: 0.28,
                  validity: 90,
                  popular: false,
                  features: [
                    locale === 'en' ? 'Premium API' : 'প্রিমিয়াম API',
                    locale === 'en' ? '24/7 Phone Support' : '২৪/৭ ফোন সাপোর্ট',
                    locale === 'en' ? 'Instant Delivery' : 'তাৎক্ষণিক ডেলিভারি',
                    locale === 'en' ? 'Multiple Sender IDs' : 'একাধিক প্রেরক ID',
                    locale === 'en' ? 'Advanced Analytics' : 'উন্নত অ্যানালিটিক্স',
                    locale === 'en' ? 'Dedicated Manager' : 'ডেডিকেটেড ম্যানেজার',
                    locale === 'en' ? 'Priority Routing' : 'অগ্রাধিকার রাউটিং'
                  ]
                }
              ].map((pkg) => (
                  <div key={pkg.id}
                       className={`relative bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 ${pkg.popular ? 'border-orange-400 border-2 transform scale-105 shadow-2xl' : ''}`}>
                    {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <div
                              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide shadow-lg">
                            {locale === 'en' ? 'POPULAR' : 'জনপ্রিয়'}
                          </div>
                        </div>
                    )}

                    <div className="px-8 py-8">
                      <div className="text-center mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{pkg.name}</h3>
                        <div className="mb-4">
                          <span className="text-4xl font-bold text-gray-900">৳{pkg.rate.toFixed(2)}</span>
                          <span className="text-gray-600 text-lg">/SMS</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-6 font-medium">
                          {locale === 'en' ? 'Total:' : 'মোট:'} ৳{(pkg.sms * pkg.rate).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 space-y-2 bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                            </svg>
                            {pkg.sms.toLocaleString()} SMS
                          </div>
                          <div className="flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"/>
                            </svg>
                            {pkg.validity} {locale === 'en' ? 'days validity' : 'দিন মেয়াদ'}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        < Link href={`/${locale}/packages/${pkg.id}/purchase`}>
                          <Button
                              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                                  pkg.popular
                                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:shadow-lg transform hover:scale-105'
                                      : 'bg-btcl-primary text-white hover:bg-btcl-secondary hover:shadow-lg'
                              }`}
                          >
                            {locale === 'en' ? 'Get Started' : 'শুরু করুন'}
                          </Button>
                        </Link>
                      </div>

                      <div className="space-y-3">
                        {pkg.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor"
                                   viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"/>
                              </svg>
                              <span className="text-gray-700 text-sm font-medium">{feature}</span>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-xl px-8 py-4">
                <svg className="w-6 h-6 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"/>
                </svg>
                <span className="text-yellow-800 font-semibold text-lg">
                {locale === 'en' ? '15% VAT will be added to all prices' : 'সকল মূল্যে ১৫% ভ্যাট যোগ হবে'}
              </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Table Section */}
        <div className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                A2P SMS Rate Card
              </h2>
              <p className="text-xl text-gray-600">
                Volume-based pricing structure (Excluding 15% VAT)
              </p>
            </div>

            <div className="overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{background: 'linear-gradient(135deg, #00A651 0%, #008A43 100%)'}}
                         className="text-white">
                  <tr>
                    <th className="text-left p-6 font-semibold text-lg">SN</th>
                    <th className="text-left p-6 font-semibold text-lg">Description</th>
                    <th className="text-left p-6 font-semibold text-lg">Number of SMS</th>
                    <th className="text-right p-6 font-semibold text-lg">Rate (Taka/SMS)</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-semibold text-gray-900">1</td>
                    <td className="p-6 text-gray-700">Application to Person (A2P) SMS</td>
                    <td className="p-6 text-gray-700 font-medium">1 - 20,000</td>
                    <td className="p-6 text-right font-bold text-lg" style={{color: '#00A651'}}>৳ 0.32</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors bg-green-50">
                    <td className="p-6 font-semibold text-gray-900">2</td>
                    <td className="p-6 text-gray-700">Application to Person (A2P) SMS</td>
                    <td className="p-6 text-gray-700 font-medium">20,001 - 50,000</td>
                    <td className="p-6 text-right font-bold text-lg" style={{color: '#00A651'}}>৳ 0.30</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-semibold text-gray-900">3</td>
                    <td className="p-6 text-gray-700">Application to Person (A2P) SMS</td>
                    <td className="p-6 text-gray-700 font-medium">50,001 - 100,000</td>
                    <td className="p-6 text-right font-bold text-lg" style={{color: '#00A651'}}>৳ 0.28</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Prices exclude 15% VAT. Contact us for enterprise pricing above 100,000 SMS.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Package Benefits */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {locale === 'en' ? 'Why Choose Our Packages?' : 'কেন আমাদের প্যাকেজ বেছে নেবেন?'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-btcl-primary rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <CardTitle>
                    {locale === 'en' ? 'Instant Activation' : 'তাৎক্ষণিক সক্রিয়করণ'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {locale === 'en'
                        ? 'Your package is activated immediately after payment, so you can start sending SMS right away.'
                        : 'পেমেন্টের পরপরই আপনার প্যাকেজ সক্রিয় হয়ে যায়, তাই আপনি সঙ্গে সঙ্গে এসএমএস পাঠানো শুরু করতে পারেন।'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-btcl-primary rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <CardTitle>
                    {locale === 'en' ? 'No Hidden Fees' : 'কোনো লুকানো ফি নেই'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {locale === 'en'
                        ? 'What you see is what you pay. No setup fees, no monthly charges, no surprises in your bill.'
                        : 'আপনি যা দেখছেন তাই পরিশোধ করবেন। কোনো সেটআপ ফি নেই, মাসিক চার্জ নেই, আপনার বিলে কোনো সারপ্রাইজ নেই।'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-btcl-primary rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <CardTitle>
                    {locale === 'en' ? 'Flexible Payment' : 'নমনীয় পেমেন্ট'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {locale === 'en'
                        ? 'Pay securely through multiple payment methods including mobile banking, cards, and bank transfers.'
                        : 'মোবাইল ব্যাংকিং, কার্ড এবং ব্যাংক ট্রান্সফার সহ একাধিক পেমেন্ট পদ্ধতির মাধ্যমে নিরাপদে পেমেন্ট করুন।'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: 'Can I upgrade my plan anytime?',
                  answer: 'Yes, you can upgrade your plan at any time. The remaining SMS balance and validity will be adjusted accordingly and you\'ll only pay the difference.'
                },
                {
                  question: 'What happens to unused SMS?',
                  answer: 'Unused SMS credits expire at the end of the validity period. We recommend monitoring your usage and purchasing appropriate packages.'
                },
                {
                  question: 'Is there any setup fee?',
                  answer: 'No, there are no setup fees. You only pay for the SMS package you choose and can start sending messages immediately after purchase.'
                }
              ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
  );
};

export default PricingPage;