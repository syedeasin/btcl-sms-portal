import { useTranslations } from 'next-intl'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'

export default function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  const packages = [
    {
      id: 'starter',
      name: locale === 'en' ? 'Starter' : 'স্টার্টার',
      price: 500,
      sms: 1000,
      validity: 30,
      popular: false,
      features: [
        locale === 'en' ? 'Basic API Access' : 'বেসিক API অ্যাক্সেস',
        locale === 'en' ? 'Email Support' : 'ইমেইল সাপোর্ট',
        locale === 'en' ? 'Standard Delivery' : 'স্ট্যান্ডার্ড ডেলিভারি',
        locale === 'en' ? 'Basic Reports' : 'বেসিক রিপোর্ট'
      ]
    },
    {
      id: 'business',
      name: locale === 'en' ? 'Business' : 'ব্যবসা',
      price: 2000,
      sms: 5000,
      validity: 60,
      popular: true,
      features: [
        locale === 'en' ? 'Advanced API' : 'অ্যাডভান্সড API',
        locale === 'en' ? 'Priority Support' : 'অগ্রাধিকার সাপোর্ট',
        locale === 'en' ? 'Fast Delivery' : 'দ্রুত ডেলিভারি',
        locale === 'en' ? 'Custom Sender ID' : 'কাস্টম প্রেরক ID',
        locale === 'en' ? 'Detailed Analytics' : 'বিস্তারিত অ্যানালিটিক্স'
      ]
    },
    {
      id: 'enterprise',
      name: locale === 'en' ? 'Enterprise' : 'এন্টারপ্রাইজ',
      price: 8000,
      sms: 25000,
      validity: 90,
      popular: false,
      features: [
        locale === 'en' ? 'Premium API' : 'প্রিমিয়াম API',
        locale === 'en' ? '24/7 Phone Support' : '২৪/৭ ফোন সাপোর্ট',
        locale === 'en' ? 'Instant Delivery' : 'তাৎক্ষণিক ডেলিভারি',
        locale === 'en' ? 'Multiple Sender IDs' : 'একাধিক প্রেরক ID',
        locale === 'en' ? 'Advanced Analytics' : 'উন্নত অ্যানালিটিক্স',
        locale === 'en' ? 'Dedicated Manager' : 'ডেডিকেটেড ম্যানেজার',
        locale === 'en' ? 'Custom Integration' : 'কাস্টম ইন্টিগ্রেশন'
      ]
    },
    {
      id: 'premium',
      name: locale === 'en' ? 'Premium' : 'প্রিমিয়াম',
      price: 15000,
      sms: 50000,
      validity: 120,
      popular: false,
      features: [
        locale === 'en' ? 'Ultimate API' : 'আল্টিমেট API',
        locale === 'en' ? 'VIP Support' : 'ভিআইপি সাপোর্ট',
        locale === 'en' ? 'Priority Routing' : 'অগ্রাধিকার রাউটিং',
        locale === 'en' ? 'Unlimited Sender IDs' : 'সীমাহীন প্রেরক ID',
        locale === 'en' ? 'Real-time Analytics' : 'রিয়েল-টাইম অ্যানালিটিক্স',
        locale === 'en' ? 'Account Manager' : 'অ্যাকাউন্ট ম্যানেজার',
        locale === 'en' ? 'White-label Solution' : 'হোয়াইট-লেবেল সল্যুশন',
        locale === 'en' ? 'SLA Guarantee' : 'SLA গ্যারান্টি'
      ]
    }
  ]

  const addOns = [
    {
      name: locale === 'en' ? 'Extra SMS Bundle' : 'অতিরিক্ত এসএমএস বান্ডল',
      description: locale === 'en' ? '1000 additional SMS' : '১০০০ অতিরিক্ত এসএমএস',
      price: 400
    },
    {
      name: locale === 'en' ? 'Extended Validity' : 'বর্ধিত মেয়াদ',
      description: locale === 'en' ? '+30 days validity extension' : '+৩০ দিন মেয়াদ বৃদ্ধি',
      price: 200
    },
    {
      name: locale === 'en' ? 'Priority Support' : 'অগ্রাধিকার সাপোর্ট',
      description: locale === 'en' ? '24/7 priority customer support' : '২৪/৭ অগ্রাধিকার গ্রাহক সেবা',
      price: 1000
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
              {locale === 'en' ? 'Pricing Plans' : 'মূল্য পরিকল্পনা'}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {locale === 'en'
                ? 'Choose the perfect SMS plan for your business. All plans include our core features with no hidden fees.'
                : 'আপনার ব্যবসার জন্য নিখুঁত এসএমএস প্ল্যান বেছে নিন। সব প্ল্যানে আমাদের মূল বৈশিষ্ট্য রয়েছে কোনো লুকানো ফি ছাড়াই।'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative ${pkg.popular ? 'border-btcl-primary shadow-lg ring-2 ring-btcl-primary' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-btcl-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      {locale === 'en' ? 'Most Popular' : 'সবচেয়ে জনপ্রিয়'}
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-btcl-primary">{formatPrice(pkg.price)}</span>
                    <div className="text-sm text-gray-600 mt-2">
                      <div>{pkg.sms.toLocaleString()} SMS</div>
                      <div>{pkg.validity} {locale === 'en' ? 'days validity' : 'দিন মেয়াদ'}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-btcl-primary mr-2 mt-0.5">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href={`/${locale}/packages/${pkg.id}`}>
                      <Button 
                        className="w-full" 
                        variant={pkg.popular ? 'primary' : 'outline'}
                      >
                        {locale === 'en' ? 'Choose Plan' : 'প্ল্যান বেছে নিন'}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Add-ons & Extras' : 'অ্যাড-অন ও অতিরিক্ত'}
            </h2>
            <p className="text-xl text-gray-600">
              {locale === 'en' ? 'Enhance your plan with additional features' : 'অতিরিক্ত বৈশিষ্ট্য দিয়ে আপনার প্ল্যান উন্নত করুন'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {addOns.map((addon, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{addon.name}</CardTitle>
                  <CardDescription>{addon.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-btcl-primary">
                      {formatPrice(addon.price)}
                    </span>
                    <Button size="sm">
                      {locale === 'en' ? 'Add' : 'যোগ করুন'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Feature Comparison' : 'বৈশিষ্ট্য তুলনা'}
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-900">
                    {locale === 'en' ? 'Features' : 'বৈশিষ্ট্য'}
                  </th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className="text-center p-4 font-semibold text-gray-900">
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4 font-medium">{locale === 'en' ? 'SMS Count' : 'এসএমএস সংখ্যা'}</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="text-center p-4">{pkg.sms.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="p-4 font-medium">{locale === 'en' ? 'Validity Days' : 'মেয়াদ দিন'}</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="text-center p-4">{pkg.validity}</td>
                  ))}
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">{locale === 'en' ? 'API Access' : 'API অ্যাক্সেস'}</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">✓</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="p-4 font-medium">{locale === 'en' ? 'Custom Sender ID' : 'কাস্টম প্রেরক ID'}</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">✓</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">{locale === 'en' ? '24/7 Support' : '২৪/৭ সাপোর্ট'}</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">✓</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="p-4 font-medium">{locale === 'en' ? 'Dedicated Manager' : 'ডেডিকেটেড ম্যানেজার'}</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Frequently Asked Questions' : 'প্রায়শই জিজ্ঞাসিত প্রশ্ন'}
            </h2>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {locale === 'en' ? 'Can I upgrade my plan anytime?' : 'আমি কি যেকোনো সময় আমার প্ল্যান আপগ্রেড করতে পারি?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {locale === 'en'
                    ? 'Yes, you can upgrade your plan at any time. The remaining SMS balance and validity will be adjusted accordingly and you\'ll only pay the difference.'
                    : 'হ্যাঁ, আপনি যেকোনো সময় আপনার প্ল্যান আপগ্রেড করতে পারেন। অবশিষ্ট এসএমএস ব্যালেন্স এবং মেয়াদ অনুযায়ী সমন্বয় করা হবে এবং আপনি শুধু পার্থক্য পরিশোধ করবেন।'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {locale === 'en' ? 'What happens to unused SMS?' : 'অব্যবহৃত এসএমএসের কী হয়?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {locale === 'en'
                    ? 'Unused SMS credits expire at the end of the validity period. We recommend monitoring your usage and purchasing appropriate packages.'
                    : 'অব্যবহৃত এসএমএস ক্রেডিট মেয়াদের শেষে অবসান হয়। আমরা আপনার ব্যবহার পর্যবেক্ষণ এবং উপযুক্ত প্যাকেজ ক্রয় করার পরামর্শ দিই।'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {locale === 'en' ? 'Do you offer custom packages?' : 'আপনারা কি কাস্টম প্যাকেজ অফার করেন?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {locale === 'en'
                    ? 'Yes, we offer custom packages for enterprise clients with specific requirements. Contact our sales team for a personalized quote.'
                    : 'হ্যাঁ, আমরা নির্দিষ্ট প্রয়োজনীয়তা সহ এন্টারপ্রাইজ ক্লায়েন্টদের জন্য কাস্টম প্যাকেজ অফার করি। ব্যক্তিগতকৃত কোটেশনের জন্য আমাদের সেলস টিমের সাথে যোগাযোগ করুন।'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-btcl-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {locale === 'en' ? 'Ready to get started?' : 'শুরু করতে প্রস্তুত?'}
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Choose your plan and start sending SMS within minutes. No setup fees, no long-term contracts.'
              : 'আপনার প্ল্যান বেছে নিন এবং কয়েক মিনিটের মধ্যে এসএমএস পাঠানো শুরু করুন। কোনো সেটআপ ফি নেই, দীর্ঘমেয়াদী চুক্তি নেই।'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/register`}>
              <Button size="lg" className="bg-white text-btcl-primary hover:bg-gray-100">
                {locale === 'en' ? 'Get Started Today' : 'আজই শুরু করুন'}
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-btcl-primary">
                {locale === 'en' ? 'Talk to Sales' : 'সেলসের সাথে কথা বলুন'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}