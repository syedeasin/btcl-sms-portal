import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

// Types
interface Feature {
  title: string
  description: string
  icon: string
}

interface PricingPlan {
  id: string
  name: string
  sms: number
  rate: number
  validity: number
  popular: boolean
  features: string[]
}

interface HomePageProps {
  params: Promise<{
    locale: string
  }>
}

// Constants
const HERO_STATS = [
  { value: '10K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
] as const

const TESTIMONIALS = [
  { name: 'Ahmed Trading', industry: 'E-commerce', initial: 'A' },
  { name: 'Bangladeshi Bank', industry: 'Banking', initial: 'B' },
  { name: 'City Hospital', industry: 'Healthcare', initial: 'C' },
] as const

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const t = await getTranslations()

  // Feature data
  const features: Feature[] = [
    {
      title: t('home.features.reliable.title'),
      description: t('home.features.reliable.description'),
      icon: '🔒',
    },
    {
      title: t('home.features.fast.title'),
      description: t('home.features.fast.description'),
      icon: '⚡',
    },
    {
      title: t('home.features.secure.title'),
      description: t('home.features.secure.description'),
      icon: '🛡️',
    },
    {
      title: t('home.features.support.title'),
      description: t('home.features.support.description'),
      icon: '📞',
    },
  ]

  // Pricing plans data
  const pricingPlans: PricingPlan[] = [
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
        locale === 'en' ? 'Single Sender ID' : 'একক প্রেরক ID',
      ],
    },
    {
      id: 'medium',
      name: locale === 'en' ? 'Medium Business' : 'মাঝারি ব্যবসা',
      sms: 50000,
      rate: 0.3,
      validity: 60,
      popular: true,
      features: [
        locale === 'en' ? 'Advanced API' : 'অ্যাডভান্সড API',
        locale === 'en' ? 'Priority Support' : 'অগ্রাধিকার সাপোর্ট',
        locale === 'en' ? 'Fast Delivery' : 'দ্রুত ডেলিভারি',
        locale === 'en' ? 'Custom Sender ID' : 'কাস্টম প্রেরক ID',
        locale === 'en' ? 'Detailed Analytics' : 'বিস্তারিত অ্যানালিটিক্স',
        locale === 'en' ? 'Multiple Projects' : 'একাধিক প্রকল্প',
      ],
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
        locale === 'en' ? 'Priority Routing' : 'অগ্রাধিকার রাউটিং',
      ],
    },
  ]

  return (
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <HeroSection locale={locale} t={t} />

        {/* Features Section */}
        <FeaturesSection features={features} t={t} />

        {/* Pricing Preview Section */}
        <PricingPreviewSection pricingPlans={pricingPlans} locale={locale} t={t} />

        {/* Testimonials Section */}
        <TestimonialsSection locale={locale} t={t} />

        <Footer />
      </div>
  )
}

// Hero Section Component
function HeroSection({ locale, t }: { locale: string; t: any }) {
  return (
      <section
          className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/herobg.png')" }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-20 h-20 w-20 animate-pulse rounded-full bg-green-400/10 blur-xl" />
          <div className="absolute bottom-32 right-16 h-32 w-32 animate-pulse rounded-full bg-blue-400/10 blur-xl delay-1000" />
          <div className="absolute left-1/4 top-1/2 h-16 w-16 animate-pulse rounded-full bg-purple-400/10 blur-xl delay-500" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge/Announcement */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/15">
              <span className="text-green-400">✨</span>
              <span>New features available now</span>
              <span className="text-green-400">📈</span>
            </div>

            {/* Main Heading with SMS Icon */}
            <h1 className="mb-8 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            <span className="block bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              BTCL Bulk SMS
              <span className="ml-3 inline-flex items-center md:ml-4">
                <div className="relative animate-bounce rounded-xl bg-white p-2 shadow-lg md:p-3">
                  {/* SMS Icon */}
                  <svg
                      className="h-6 w-6 text-green-600 md:h-8 md:w-8 lg:h-10 lg:w-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>

                  {/* Animated dots for SMS sending effect */}
                  <div className="absolute -right-1 -top-1 flex space-x-0.5">
                    <div className="h-1.5 w-1.5 animate-ping rounded-full bg-green-500 md:h-2 md:w-2" />
                    <div className="h-1.5 w-1.5 animate-ping rounded-full bg-green-500 delay-75 md:h-2 md:w-2" />
                    <div className="h-1.5 w-1.5 animate-ping rounded-full bg-green-500 delay-150 md:h-2 md:w-2" />
                  </div>
                </div>
              </span>
            </span>
              Service for Enterprises
            </h1>

            {/* Description */}
            <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-green-100/80 md:text-xl">
              Reach millions instantly with Bangladesh's most reliable SMS gateway. Send promotions,
              alerts, and notifications through our enterprise-grade bulk SMS service — trusted by
              thousands of businesses nationwide.
            </p>

            {/* CTA Buttons */}
            <div className="mb-24 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link href={`/${locale}/register`} className="group">
                <Button
                    size="lg"
                    className="transform rounded-xl border-0 bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-green-700 hover:shadow-green-500/25"
                >
                  <span>{t('home.hero.cta')}</span>
                  <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
                </Button>
              </Link>

              <Link href={`/${locale}/services`} className="group">
                <Button
                    variant="outline"
                    size="lg"
                    className="transform rounded-xl border-2 border-white/30 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/10"
                >
                <span className="mr-2 transition-transform duration-200 group-hover:scale-110">
                  ▶
                </span>
                  <span>{t('home.hero.learn_more')}</span>
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              {HERO_STATS.map((stat, index) => (
                  <div
                      key={index}
                      className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                  >
                    <div className="mb-2 text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-green-100">{stat.label}</div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/40">
            <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white/60" />
          </div>
        </div>
      </section>
  )
}

// Features Section Component
function FeaturesSection({ features, t }: { features: Feature[]; t: any }) {
  return (
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {t('home.features.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
                <Card key={index} className="text-center transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 text-4xl">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

// Pricing Preview Section Component
function PricingPreviewSection({
                                 pricingPlans,
                                 locale,
                                 t,
                               }: {
  pricingPlans: PricingPlan[]
  locale: string
  t: any
}) {
  return (
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="mb-20 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-8 lg:mb-0">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">{t('home.pricing.title')}</h2>
              <p className="max-w-2xl text-xl text-gray-600">{t('home.pricing.subtitle')}</p>
            </div>
            <div className="flex-shrink-0">
              <Link href={`/${locale}/pricing`}>
                <Button
                    variant="outline"
                    size="lg"
                    className="rounded-xl border-2 px-8 py-3 text-lg font-semibold transition-colors hover:bg-green-200 hover:text-btcl-primary"
                >
                  View All Plans
                </Button>
              </Link>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((pkg) => (
                <PricingCard key={pkg.id} pkg={pkg} locale={locale} />
            ))}
          </div>

          {/* VAT Notice */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center rounded-xl border border-yellow-200 bg-yellow-50 px-8 py-4">
              <svg className="mr-3 h-6 w-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                />
              </svg>
              <span className="text-lg font-semibold text-yellow-800">
              {locale === 'en'
                  ? '15% VAT will be added to all prices'
                  : 'সকল মূল্যে ১৫% ভ্যাট যোগ হবে'}
            </span>
            </div>
          </div>
        </div>
      </section>
  )
}

// Pricing Card Component
function PricingCard({ pkg, locale }: { pkg: PricingPlan; locale: string }) {
  return (
      <div
          className={`relative rounded-2xl border bg-white shadow-lg transition-all duration-300 hover:shadow-2xl ${
              pkg.popular
                  ? 'scale-105 transform border-2 border-orange-400 shadow-2xl'
                  : 'border-gray-200'
          }`}
      >
        {pkg.popular && (
            <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform">
              <div className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg">
                {locale === 'en' ? 'POPULAR' : 'জনপ্রিয়'}
              </div>
            </div>
        )}

        <div className="px-8 py-8">
          <div className="mb-4 text-center">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">{pkg.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-gray-900">৳{pkg.rate.toFixed(2)}</span>
              <span className="text-lg text-gray-600">/SMS</span>
            </div>
            <div className="mb-6 text-sm font-medium text-gray-500">
              {locale === 'en' ? 'Total:' : 'মোট:'} ৳{(pkg.sms * pkg.rate).toLocaleString()}
            </div>
            <div className="space-y-2 rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
              <div className="flex items-center justify-center">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {pkg.sms.toLocaleString()} SMS
              </div>
              <div className="flex items-center justify-center">
                <svg className="mr-2 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                  />
                </svg>
                {pkg.validity} {locale === 'en' ? 'days validity' : 'দিন মেয়াদ'}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <Link href={`/${locale}/packages/${pkg.id}/purchase`}>
              <Button
                  className={`w-full rounded-xl px-6 py-4 text-lg font-semibold transition-all duration-300 ${
                      pkg.popular
                          ? 'transform bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 hover:from-orange-600 hover:to-red-600 hover:shadow-lg'
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
                  <svg
                      className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                  >
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
  )
}

// Testimonials Section Component
function TestimonialsSection({ locale, t }: { locale: string; t: any }) {
  return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600">{t('home.testimonials.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-btcl-primary font-bold text-white">
                        {testimonial.initial}
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.industry}</div>
                      </div>
                    </div>
                    <p className="italic text-gray-600">
                      {locale === 'en'
                          ? '"BTCL SMS service has revolutionized our customer communication. Reliable, fast, and cost-effective solution for our business."'
                          : '"বিটিসিএল এসএমএস সেবা আমাদের গ্রাহক যোগাযোগে বিপ্লব এনেছে। আমাদের ব্যবসার জন্য নির্ভরযোগ্য, দ্রুত এবং সাশ্রয়ী সমাধান।"'}
                    </p>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>
  )
}