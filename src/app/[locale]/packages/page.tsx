import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'

export default async function PackagesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations()

  // This would typically come from a database
  const packages = [
    {
      id: 'starter',
      name: locale === 'en' ? 'Starter Package' : 'স্টার্টার প্যাকেজ',
      price: 500,
      sms: 1000,
      validity: 30,
      description: locale === 'en' 
        ? 'Perfect for small businesses and startups' 
        : 'ছোট ব্যবসা এবং স্টার্টআপের জন্য নিখুঁত',
      features: [
        locale === 'en' ? 'Basic API Access' : 'বেসিক API অ্যাক্সেস',
        locale === 'en' ? 'Email Support' : 'ইমেইল সাপোর্ট',
        locale === 'en' ? 'Standard Delivery' : 'স্ট্যান্ডার্ড ডেলিভারি',
        locale === 'en' ? 'Basic Reporting' : 'বেসিক রিপোর্টিং'
      ]
    },
    {
      id: 'business',
      name: locale === 'en' ? 'Business Package' : 'ব্যবসা প্যাকেজ',
      price: 2000,
      sms: 5000,
      validity: 60,
      description: locale === 'en' 
        ? 'Ideal for growing businesses with higher volume needs' 
        : 'উচ্চ ভলিউম প্রয়োজন সহ ক্রমবর্ধমান ব্যবসার জন্য আদর্শ',
      features: [
        locale === 'en' ? 'Advanced API Access' : 'অ্যাডভান্সড API অ্যাক্সেস',
        locale === 'en' ? 'Priority Email Support' : 'অগ্রাধিকার ইমেইল সাপোর্ট',
        locale === 'en' ? 'Fast Delivery' : 'দ্রুত ডেলিভারি',
        locale === 'en' ? 'Custom Sender ID' : 'কাস্টম প্রেরক ID',
        locale === 'en' ? 'Detailed Analytics' : 'বিস্তারিত অ্যানালিটিক্স'
      ]
    },
    {
      id: 'enterprise',
      name: locale === 'en' ? 'Enterprise Package' : 'এন্টারপ্রাইজ প্যাকেজ',
      price: 8000,
      sms: 25000,
      validity: 90,
      description: locale === 'en' 
        ? 'Complete solution for large organizations' 
        : 'বড় সংস্থার জন্য সম্পূর্ণ সমাধান',
      features: [
        locale === 'en' ? 'Premium API Access' : 'প্রিমিয়াম API অ্যাক্সেস',
        locale === 'en' ? '24/7 Phone Support' : '২৪/৭ ফোন সাপোর্ট',
        locale === 'en' ? 'Instant Delivery' : 'তাৎক্ষণিক ডেলিভারি',
        locale === 'en' ? 'Multiple Sender IDs' : 'একাধিক প্রেরক ID',
        locale === 'en' ? 'Advanced Analytics Dashboard' : 'উন্নত অ্যানালিটিক্স ড্যাশবোর্ড',
        locale === 'en' ? 'Dedicated Account Manager' : 'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার',
        locale === 'en' ? 'Custom Integration Support' : 'কাস্টম ইন্টিগ্রেশন সাপোর্ট'
      ]
    },
    {
      id: 'premium',
      name: locale === 'en' ? 'Premium Package' : 'প্রিমিয়াম প্যাকেজ',
      price: 15000,
      sms: 50000,
      validity: 120,
      description: locale === 'en' 
        ? 'Ultimate package for maximum performance and features' 
        : 'সর্বোচ্চ কর্মক্ষমতা এবং বৈশিষ্ট্যের জন্য আল্টিমেট প্যাকেজ',
      features: [
        locale === 'en' ? 'Ultimate API Access' : 'আল্টিমেট API অ্যাক্সেস',
        locale === 'en' ? 'VIP Support Channel' : 'ভিআইপি সাপোর্ট চ্যানেল',
        locale === 'en' ? 'Priority Network Routing' : 'অগ্রাধিকার নেটওয়ার্ক রাউটিং',
        locale === 'en' ? 'Unlimited Sender IDs' : 'সীমাহীন প্রেরক ID',
        locale === 'en' ? 'Real-time Analytics & Reporting' : 'রিয়েল-টাইম অ্যানালিটিক্স ও রিপোর্টিং',
        locale === 'en' ? 'Personal Account Manager' : 'ব্যক্তিগত অ্যাকাউন্ট ম্যানেজার',
        locale === 'en' ? 'White-label API Solution' : 'হোয়াইট-লেবেল API সল্যুশন',
        locale === 'en' ? 'SLA with 99.9% Uptime Guarantee' : 'SLA সহ ৯৯.৯% আপটাইম গ্যারান্টি'
      ]
    }
  ]

  const formatPrice = (price: number) => {
    return locale === 'en' ? `৳${price.toLocaleString()}` : `৳${price.toLocaleString('bn-BD')}`
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-btcl-primary to-btcl-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {locale === 'en' ? 'SMS Packages' : 'এসএমএস প্যাকেজ'}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {locale === 'en'
                ? 'Select the perfect SMS package for your business needs. All packages include our core features with reliable delivery and comprehensive support.'
                : 'আপনার ব্যবসার প্রয়োজন অনুযায়ী নিখুঁত এসএমএস প্যাকেজ নির্বাচন করুন। সব প্যাকেজে নির্ভরযোগ্য ডেলিভারি এবং ব্যাপক সাপোর্ট সহ আমাদের মূল বৈশিষ্ট্য রয়েছে।'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Package Selection */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="relative hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                      <CardDescription className="mt-2 text-base">{pkg.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-btcl-primary">{formatPrice(pkg.price)}</div>
                      <div className="text-sm text-gray-600">
                        {pkg.sms.toLocaleString()} SMS / {pkg.validity} {locale === 'en' ? 'days' : 'দিন'}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {locale === 'en' ? 'Package Includes:' : 'প্যাকেজে রয়েছে:'}
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

                    <div className="pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900">
                            {locale === 'en' ? 'Cost per SMS:' : 'প্রতি এসএমএস খরচ:'}
                          </span>
                          <div className="text-btcl-primary font-semibold">
                            ৳{(pkg.price / pkg.sms).toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">
                            {locale === 'en' ? 'Daily Limit:' : 'দৈনিক সীমা:'}
                          </span>
                          <div className="text-gray-700">
                            {Math.floor(pkg.sms / pkg.validity * 3).toLocaleString()} SMS
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Link href={`/${locale}/packages/${pkg.id}/purchase`}>
                        <Button className="w-full" size="lg">
                          {locale === 'en' ? 'Purchase Package' : 'প্যাকেজ ক্রয় করুন'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-2 border-btcl-primary">
            <CardHeader>
              <CardTitle className="text-2xl">
                {locale === 'en' ? 'Need a Custom Package?' : 'কাস্টম প্যাকেজ প্রয়োজন?'}
              </CardTitle>
              <CardDescription className="text-base">
                {locale === 'en'
                  ? 'If none of our standard packages meet your specific requirements, we can create a custom solution tailored to your business needs.'
                  : 'যদি আমাদের স্ট্যান্ডার্ড প্যাকেজগুলির কোনোটিই আপনার নির্দিষ্ট প্রয়োজনীয়তা পূরণ না করে, আমরা আপনার ব্যবসার প্রয়োজন অনুযায়ী একটি কাস্টম সমাধান তৈরি করতে পারি।'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-btcl-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">
                    {locale === 'en' ? 'Tell Us Your Needs' : 'আপনার প্রয়োজন বলুন'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === 'en' ? 'Share your volume and feature requirements' : 'আপনার ভলিউম এবং বৈশিষ্ট্যের প্রয়োজনীয়তা শেয়ার করুন'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-btcl-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">
                    {locale === 'en' ? 'Get Custom Quote' : 'কাস্টম কোট পান'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === 'en' ? 'Receive a tailored proposal within 24 hours' : '২ৄ ঘন্টার মধ্যে একটি কাস্টমাইজড প্রস্তাব পান'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-btcl-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">
                    {locale === 'en' ? 'Start Sending' : 'পাঠানো শুরু করুন'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === 'en' ? 'Launch your custom SMS solution immediately' : 'আপনার কাস্টম এসএমএস সমাধান অবিলম্বে চালু করুন'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/contact`}>
                  <Button size="lg">
                    {locale === 'en' ? 'Request Custom Quote' : 'কাস্টম কোট অনুরোধ করুন'}
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  {locale === 'en' ? 'Schedule a Call' : 'একটি কল সময়সূচী করুন'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

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

      <Footer />
    </div>
  )
}