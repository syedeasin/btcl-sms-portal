import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

// Types
interface Service {
  title: string
  description: string
  icon: string
  features: string[]
}

interface APIFeature {
  title: string
  description: string
  icon: string
}

interface Industry {
  name: string
  icon: string
}

interface TechnicalSpec {
  value: string
  label: string
  description?: string
}

interface ServicesPageProps {
  params: {
    locale: string
  }
}

// Constants
const TECHNICAL_SPECS = [
  {
    key: 'characters',
    value: '160',
    icon: '📝',
  },
  {
    key: 'throughput',
    value: '1000',
    icon: '⚡',
  },
  {
    key: 'delivery_rate',
    value: '99.9%',
    icon: '🎯',
  },
  {
    key: 'delivery_time',
    value: '<3s',
    icon: '⏱️',
  },
] as const

const INDUSTRY_ICONS = {
  banking: '🏦',
  ecommerce: '🛒',
  healthcare: '🏥',
  education: '🎓',
  realestate: '🏡',
  travel: '✈️',
} as const

// Utility functions
const getLocalizedText = (locale: string, enText: string, bnText: string): string => {
  return locale === 'en' ? enText : bnText
}

// Custom hooks
const useServicesData = (locale: string) => {
  const services: Service[] = [
    {
      title: getLocalizedText(locale, 'Promotional SMS', 'প্রমোশনাল এসএমএস'),
      description: getLocalizedText(
          locale,
          'Send marketing messages, offers, and promotional content to your customer base with high delivery rates.',
          'উচ্চ ডেলিভারি রেট সহ আপনার গ্রাহক বেসে মার্কেটিং বার্তা, অফার এবং প্রমোশনাল কন্টেন্ট পাঠান।'
      ),
      icon: '📢',
      features: [
        getLocalizedText(locale, 'Custom sender ID', 'কাস্টম প্রেরক আইডি'),
        getLocalizedText(locale, 'Schedule messages', 'বার্তা সময়সূচী'),
        getLocalizedText(locale, 'Bulk upload', 'বাল্ক আপলোড'),
        getLocalizedText(locale, 'Real-time tracking', 'রিয়েল-টাইম ট্র্যাকিং'),
      ],
    },
    {
      title: getLocalizedText(locale, 'Transactional SMS', 'লেনদেন এসএমএস'),
      description: getLocalizedText(
          locale,
          'Send OTPs, alerts, confirmations, and other transaction-related messages with priority delivery.',
          'অগ্রাধিকার ডেলিভারি সহ ওটিপি, সতর্কতা, নিশ্চিতকরণ এবং অন্যান্য লেনদেন-সম্পর্কিত বার্তা পাঠান।'
      ),
      icon: '🔐',
      features: [
        getLocalizedText(locale, 'Priority routing', 'অগ্রাধিকার রাউটিং'),
        getLocalizedText(locale, 'High delivery speed', 'উচ্চ ডেলিভারি গতি'),
        getLocalizedText(locale, '24/7 availability', '২৪/৭ সহজলভ্যতা'),
        getLocalizedText(locale, 'API integration', 'API ইন্টিগ্রেশন'),
      ],
    },
    {
      title: getLocalizedText(locale, 'Two-Way SMS', 'দ্বিমুখী এসএমএস'),
      description: getLocalizedText(
          locale,
          'Enable interactive communication with customers through two-way messaging capabilities.',
          'দ্বিমুখী মেসেজিং ক্ষমতার মাধ্যমে গ্রাহকদের সাথে ইন্টারঅ্যাক্টিভ যোগাযোগ সক্ষম করুন।'
      ),
      icon: '💬',
      features: [
        getLocalizedText(locale, 'Receive replies', 'উত্তর গ্রহণ'),
        getLocalizedText(locale, 'Keyword automation', 'কিওয়ার্ড অটোমেশন'),
        getLocalizedText(locale, 'Conversation tracking', 'কথোপকথন ট্র্যাকিং'),
        getLocalizedText(locale, 'Auto responses', 'স্বয়ংক্রিয় প্রতিক্রিয়া'),
      ],
    },
    {
      title: getLocalizedText(locale, 'Voice SMS', 'ভয়েস এসএমএস'),
      description: getLocalizedText(
          locale,
          'Deliver voice messages directly to mobile phones for important announcements and alerts.',
          'গুরুত্বপূর্ণ ঘোষণা এবং সতর্কতার জন্য সরাসরি মোবাইল ফোনে ভয়েস বার্তা পৌঁছে দিন।'
      ),
      icon: '🎵',
      features: [
        getLocalizedText(locale, 'Text-to-speech', 'টেক্সট-টু-স্পিচ'),
        getLocalizedText(locale, 'Multiple languages', 'একাধিক ভাষা'),
        getLocalizedText(locale, 'Voice recording', 'ভয়েস রেকর্ডিং'),
        getLocalizedText(locale, 'Call reporting', 'কল রিপোর্টিং'),
      ],
    },
  ]

  const apiFeatures: APIFeature[] = [
    {
      title: 'RESTful API',
      description: getLocalizedText(
          locale,
          'Easy-to-integrate REST API with comprehensive documentation and code examples.',
          'ব্যাপক ডকুমেন্টেশন এবং কোড উদাহরণ সহ সহজ-ইন্টিগ্রেট REST API।'
      ),
      icon: '🔌',
    },
    {
      title: getLocalizedText(locale, 'SDKs Available', 'SDK উপলব্ধ'),
      description: getLocalizedText(
          locale,
          'Software Development Kits for popular programming languages including PHP, Python, Java, and .NET.',
          'PHP, Python, Java এবং .NET সহ জনপ্রিয় প্রোগ্রামিং ভাষার জন্য সফটওয়্যার ডেভেলপমেন্ট কিট।'
      ),
      icon: '📦',
    },
    {
      title: getLocalizedText(locale, 'Webhook Support', 'ওয়েবহুক সাপোর্ট'),
      description: getLocalizedText(
          locale,
          'Real-time delivery notifications and status updates through webhook callbacks.',
          'ওয়েবহুক কলব্যাকের মাধ্যমে রিয়েল-টাইম ডেলিভারি বিজ্ঞপ্তি এবং স্ট্যাটাস আপডেট।'
      ),
      icon: '🔔',
    },
    {
      title: getLocalizedText(locale, 'Rate Limiting', 'রেট লিমিটিং'),
      description: getLocalizedText(
          locale,
          'Configurable rate limits to control message sending frequency and protect your application.',
          'বার্তা প্রেরণের ফ্রিকোয়েন্সি নিয়ন্ত্রণ এবং আপনার অ্যাপ্লিকেশন সুরক্ষার জন্য কনফিগারযোগ্য রেট লিমিট।'
      ),
      icon: '⚙️',
    },
  ]

  const industries: Industry[] = [
    {
      name: getLocalizedText(locale, 'Banking & Finance', 'ব্যাংকিং ও অর্থ'),
      icon: INDUSTRY_ICONS.banking,
    },
    {
      name: getLocalizedText(locale, 'E-commerce', 'ই-কমার্স'),
      icon: INDUSTRY_ICONS.ecommerce,
    },
    {
      name: getLocalizedText(locale, 'Healthcare', 'স্বাস্থ্যসেবা'),
      icon: INDUSTRY_ICONS.healthcare,
    },
    {
      name: getLocalizedText(locale, 'Education', 'শিক্ষা'),
      icon: INDUSTRY_ICONS.education,
    },
    {
      name: getLocalizedText(locale, 'Real Estate', 'রিয়েল এস্টেট'),
      icon: INDUSTRY_ICONS.realestate,
    },
    {
      name: getLocalizedText(locale, 'Travel & Tourism', 'ভ্রমণ ও পর্যটন'),
      icon: INDUSTRY_ICONS.travel,
    },
  ]

  const technicalSpecs: TechnicalSpec[] = TECHNICAL_SPECS.map((spec) => ({
    value: spec.value,
    label: getTechnicalSpecLabel(locale, spec.key),
    description: getTechnicalSpecDescription(locale, spec.key),
  }))

  return { services, apiFeatures, industries, technicalSpecs }
}

// Main Component
export default function ServicesPage({ params: { locale } }: ServicesPageProps) {
  const t = useTranslations()
  const { services, apiFeatures, industries, technicalSpecs } = useServicesData(locale)

  return (
      <div className="min-h-screen bg-white">
        <Header />

        <HeroSection locale={locale} />
        <ServicesGridSection services={services} locale={locale} />
        <APIFeaturesSection apiFeatures={apiFeatures} locale={locale} />
        <TechnicalSpecsSection technicalSpecs={technicalSpecs} locale={locale} />
        <IndustriesSection industries={industries} locale={locale} />

        <Footer />
      </div>
  )
}

// Hero Section Component
function HeroSection({ locale }: { locale: string }) {
  return (
      <section className="relative overflow-hidden bg-gradient-to-br from-btcl-primary via-green-600 to-btcl-secondary py-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-10 h-40 w-40 animate-pulse rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -right-16 top-32 h-60 w-60 animate-pulse rounded-full bg-white/5 blur-3xl delay-1000" />
          <div className="absolute bottom-20 left-1/3 h-32 w-32 animate-pulse rounded-full bg-white/5 blur-3xl delay-500" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm">
              <span className="text-2xl">🚀</span>
              <span className="font-semibold">
              {getLocalizedText(locale, 'Enterprise Solutions', 'এন্টারপ্রাইজ সমাধান')}
            </span>
            </div>

            <h1 className="mb-8 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            <span className="block bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              {getLocalizedText(locale, 'Our Services', 'আমাদের সেবাসমূহ')}
            </span>
            </h1>

            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-green-100/90 md:text-2xl">
              {getLocalizedText(
                  locale,
                  'Comprehensive SMS solutions designed to meet all your business communication needs with enterprise-grade reliability and performance.',
                  'এন্টারপ্রাইজ-গ্রেড নির্ভরযোগ্যতা এবং কর্মক্ষমতা সহ আপনার সমস্ত ব্যবসায়িক যোগাযোগের প্রয়োজন মেটাতে ডিজাইন করা ব্যাপক এসএমএস সমাধান।'
              )}
            </p>

            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce">
              <div className="mx-auto flex h-12 w-8 justify-center rounded-full border-2 border-white/40">
                <div className="mt-3 h-4 w-1 animate-pulse rounded-full bg-white/60" />
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

// Services Grid Section Component
function ServicesGridSection({ services, locale }: { services: Service[]; locale: string }) {
  return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {getLocalizedText(locale, 'Service Types', 'সেবার ধরন')}
            </span>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              {getLocalizedText(locale, 'SMS Service Types', 'এসএমএস সেবার ধরন')}
            </h2>
            <p className="text-xl text-gray-600">
              {getLocalizedText(
                  locale,
                  'Choose from our range of specialized SMS services',
                  'আমাদের বিশেষায়িত এসএমএস সেবার পরিসর থেকে বেছে নিন'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>
  )
}

// Service Card Component
function ServiceCard({ service }: { service: Service }) {
  return (
      <Card className="group h-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <CardHeader className="pb-4">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-btcl-primary to-green-600 text-4xl transition-all duration-300 group-hover:scale-110">
            {service.icon}
          </div>
          <CardTitle className="text-2xl">{service.title}</CardTitle>
          <CardDescription className="text-lg text-gray-600">{service.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <span className="text-sm text-btcl-primary">✓</span>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
            ))}
          </ul>
        </CardContent>
      </Card>
  )
}

// API Features Section Component
function APIFeaturesSection({ apiFeatures, locale }: { apiFeatures: APIFeature[]; locale: string }) {
  return (
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              {getLocalizedText(locale, 'Developer Tools', 'ডেভেলপার টুলস')}
            </span>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              {getLocalizedText(locale, 'Developer-Friendly API', 'ডেভেলপার-বান্ধব API')}
            </h2>
            <p className="text-xl text-gray-600">
              {getLocalizedText(
                  locale,
                  'Integrate SMS capabilities into your applications with our robust API',
                  'আমাদের শক্তিশালী API দিয়ে আপনার অ্যাপ্লিকেশনে এসএমএস ক্ষমতা সংযুক্ত করুন'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {apiFeatures.map((feature, index) => (
                <APIFeatureCard key={index} feature={feature} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href={`/${locale}/register`}>
              <Button
                  size="lg"
                  className="transform rounded-xl bg-gradient-to-r from-btcl-primary to-green-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {getLocalizedText(locale, 'Get API Access', 'API অ্যাক্সেস পান')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
  )
}

// API Feature Card Component
function APIFeatureCard({ feature }: { feature: APIFeature }) {
  return (
      <Card className="group transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <CardHeader>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              {feature.icon}
            </div>
            <CardTitle className="text-xl">{feature.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg text-gray-600">{feature.description}</CardDescription>
        </CardContent>
      </Card>
  )
}

// Industries Section Component
function IndustriesSection({ industries, locale }: { industries: Industry[]; locale: string }) {
  return (
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              {getLocalizedText(locale, 'Industry Focus', 'শিল্প ফোকাস')}
            </span>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              {getLocalizedText(locale, 'Industries We Serve', 'আমরা যে শিল্পে সেবা দিই')}
            </h2>
            <p className="text-xl text-gray-600">
              {getLocalizedText(
                  locale,
                  'Trusted by businesses across various industries',
                  'বিভিন্ন শিল্পের ব্যবসায়িক প্রতিষ্ঠানের আস্থাভাজন'
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {industries.map((industry, index) => (
                <IndustryCard key={index} industry={industry} />
            ))}
          </div>
        </div>
      </section>
  )
}

// Industry Card Component
function IndustryCard({ industry }: { industry: Industry }) {
  return (
      <Card className="group text-center transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <CardContent className="p-6">
          <div className="mb-4 text-4xl transition-all duration-300 group-hover:scale-110">
            {industry.icon}
          </div>
          <div className="font-medium text-gray-900">{industry.name}</div>
        </CardContent>
      </Card>
  )
}

// Technical Specifications Section Component
function TechnicalSpecsSection({
                                 technicalSpecs,
                                 locale,
                               }: {
  technicalSpecs: TechnicalSpec[]
  locale: string
}) {
  return (
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center text-white">
            <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-white" />
              {getLocalizedText(locale, 'Performance', 'কর্মক্ষমতা')}
            </span>
            </div>
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              {getLocalizedText(locale, 'Technical Specifications', 'প্রযুক্তিগত বিশেষত্ব')}
            </h2>
            <p className="text-xl text-gray-300">
              {getLocalizedText(
                  locale,
                  'Built for scale with enterprise-grade performance',
                  'এন্টারপ্রাইজ-গ্রেড কর্মক্ষমতা সহ স্কেলের জন্য নির্মিত'
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {technicalSpecs.map((spec, index) => (
                <TechnicalSpecCard key={index} spec={spec} index={index} />
            ))}
          </div>
        </div>
      </section>
  )
}

// Technical Specification Card Component
function TechnicalSpecCard({ spec, index }: { spec: TechnicalSpec; index: number }) {
  const icon = TECHNICAL_SPECS[index]?.icon || '📊'

  return (
      <div className="group text-center text-white transition-all duration-300 hover:scale-110">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
          {icon}
        </div>
        <div className="mb-2 text-4xl font-bold text-green-400 md:text-5xl">{spec.value}</div>
        <div className="text-lg text-gray-300">{spec.label}</div>
        {spec.description && <div className="mt-1 text-sm text-gray-400">{spec.description}</div>}
      </div>
  )
}

// Helper functions for technical specifications
function getTechnicalSpecLabel(locale: string, key: string): string {
  const labels = {
    characters: {
      en: 'Characters per SMS',
      bn: 'এসএমএস প্রতি অক্ষর',
    },
    throughput: {
      en: 'SMS per second',
      bn: 'প্রতি সেকেন্ডে এসএমএস',
    },
    delivery_rate: {
      en: 'Delivery rate',
      bn: 'ডেলিভারি রেট',
    },
    delivery_time: {
      en: 'Average delivery time',
      bn: 'গড় ডেলিভারি সময়',
    },
  }

  return labels[key as keyof typeof labels]?.[locale as 'en' | 'bn'] ?? ''
}

function getTechnicalSpecDescription(locale: string, key: string): string {
  const descriptions = {
    characters: {
      en: 'Standard SMS length',
      bn: 'স্ট্যান্ডার্ড এসএমএস দৈর্ঘ্য',
    },
    throughput: {
      en: 'Maximum throughput',
      bn: 'সর্বোচ্চ থ্রুপুট',
    },
    delivery_rate: {
      en: 'Success rate',
      bn: 'সফলতার হার',
    },
    delivery_time: {
      en: 'Typical delivery',
      bn: 'সাধারণ ডেলিভারি',
    },
  }

  return descriptions[key as keyof typeof descriptions]?.[locale as 'en' | 'bn'] ?? ''
}