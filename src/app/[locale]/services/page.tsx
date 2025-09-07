import { useTranslations } from 'next-intl'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'

export default function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  const services = [
    {
      title: locale === 'en' ? 'Promotional SMS' : 'প্রমোশনাল এসএমএস',
      description: locale === 'en' 
        ? 'Send marketing messages, offers, and promotional content to your customer base with high delivery rates.'
        : 'উচ্চ ডেলিভারি রেট সহ আপনার গ্রাহক বেসে মার্কেটিং বার্তা, অফার এবং প্রমোশনাল কন্টেন্ট পাঠান।',
      icon: '📢',
      features: [
        locale === 'en' ? 'Custom sender ID' : 'কাস্টম প্রেরক আইডি',
        locale === 'en' ? 'Schedule messages' : 'বার্তা সময়সূচী',
        locale === 'en' ? 'Bulk upload' : 'বাল্ক আপলোড',
        locale === 'en' ? 'Real-time tracking' : 'রিয়েল-টাইম ট্র্যাকিং'
      ]
    },
    {
      title: locale === 'en' ? 'Transactional SMS' : 'লেনদেন এসএমএস',
      description: locale === 'en'
        ? 'Send OTPs, alerts, confirmations, and other transaction-related messages with priority delivery.'
        : 'অগ্রাধিকার ডেলিভারি সহ ওটিপি, সতর্কতা, নিশ্চিতকরণ এবং অন্যান্য লেনদেন-সম্পর্কিত বার্তা পাঠান।',
      icon: '🔐',
      features: [
        locale === 'en' ? 'Priority routing' : 'অগ্রাধিকার রাউটিং',
        locale === 'en' ? 'High delivery speed' : 'উচ্চ ডেলিভারি গতি',
        locale === 'en' ? '24/7 availability' : '২৪/৭ সহজলভ্যতা',
        locale === 'en' ? 'API integration' : 'API ইন্টিগ্রেশন'
      ]
    },
    {
      title: locale === 'en' ? 'Two-Way SMS' : 'দ্বিমুখী এসএমএস',
      description: locale === 'en'
        ? 'Enable interactive communication with customers through two-way messaging capabilities.'
        : 'দ্বিমুখী মেসেজিং ক্ষমতার মাধ্যমে গ্রাহকদের সাথে ইন্টারঅ্যাক্টিভ যোগাযোগ সক্ষম করুন।',
      icon: '💬',
      features: [
        locale === 'en' ? 'Receive replies' : 'উত্তর গ্রহণ',
        locale === 'en' ? 'Keyword automation' : 'কিওয়ার্ড অটোমেশন',
        locale === 'en' ? 'Conversation tracking' : 'কথোপকথন ট্র্যাকিং',
        locale === 'en' ? 'Auto responses' : 'স্বয়ংক্রিয় প্রতিক্রিয়া'
      ]
    },
    {
      title: locale === 'en' ? 'Voice SMS' : 'ভয়েস এসএমএস',
      description: locale === 'en'
        ? 'Deliver voice messages directly to mobile phones for important announcements and alerts.'
        : 'গুরুত্বপূর্ণ ঘোষণা এবং সতর্কতার জন্য সরাসরি মোবাইল ফোনে ভয়েস বার্তা পৌঁছে দিন।',
      icon: '🎵',
      features: [
        locale === 'en' ? 'Text-to-speech' : 'টেক্সট-টু-স্পিচ',
        locale === 'en' ? 'Multiple languages' : 'একাধিক ভাষা',
        locale === 'en' ? 'Voice recording' : 'ভয়েস রেকর্ডিং',
        locale === 'en' ? 'Call reporting' : 'কল রিপোর্টিং'
      ]
    }
  ]

  const apiFeatures = [
    {
      title: locale === 'en' ? 'RESTful API' : 'RESTful API',
      description: locale === 'en'
        ? 'Easy-to-integrate REST API with comprehensive documentation and code examples.'
        : 'ব্যাপক ডকুমেন্টেশন এবং কোড উদাহরণ সহ সহজ-ইন্টিগ্রেট REST API।'
    },
    {
      title: locale === 'en' ? 'SDKs Available' : 'SDK উপলব্ধ',
      description: locale === 'en'
        ? 'Software Development Kits for popular programming languages including PHP, Python, Java, and .NET.'
        : 'PHP, Python, Java এবং .NET সহ জনপ্রিয় প্রোগ্রামিং ভাষার জন্য সফটওয়্যার ডেভেলপমেন্ট কিট।'
    },
    {
      title: locale === 'en' ? 'Webhook Support' : 'ওয়েবহুক সাপোর্ট',
      description: locale === 'en'
        ? 'Real-time delivery notifications and status updates through webhook callbacks.'
        : 'ওয়েবহুক কলব্যাকের মাধ্যমে রিয়েল-টাইম ডেলিভারি বিজ্ঞপ্তি এবং স্ট্যাটাস আপডেট।'
    },
    {
      title: locale === 'en' ? 'Rate Limiting' : 'রেট লিমিটিং',
      description: locale === 'en'
        ? 'Configurable rate limits to control message sending frequency and protect your application.'
        : 'বার্তা প্রেরণের ফ্রিকোয়েন্সি নিয়ন্ত্রণ এবং আপনার অ্যাপ্লিকেশন সুরক্ষার জন্য কনফিগারযোগ্য রেট লিমিট।'
    }
  ]

  const industries = [
    { name: locale === 'en' ? 'Banking & Finance' : 'ব্যাংকিং ও অর্থ', icon: '🏦' },
    { name: locale === 'en' ? 'E-commerce' : 'ই-কমার্স', icon: '🛒' },
    { name: locale === 'en' ? 'Healthcare' : 'স্বাস্থ্যসেবা', icon: '🏥' },
    { name: locale === 'en' ? 'Education' : 'শিক্ষা', icon: '🎓' },
    { name: locale === 'en' ? 'Real Estate' : 'রিয়েল এস্টেট', icon: '🏡' },
    { name: locale === 'en' ? 'Travel & Tourism' : 'ভ্রমণ ও পর্যটন', icon: '✈️' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-btcl-primary to-btcl-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {locale === 'en' ? 'Our Services' : 'আমাদের সেবাসমূহ'}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {locale === 'en'
                ? 'Comprehensive SMS solutions designed to meet all your business communication needs with enterprise-grade reliability and performance.'
                : 'এন্টারপ্রাইজ-গ্রেড নির্ভরযোগ্যতা এবং কর্মক্ষমতা সহ আপনার সমস্ত ব্যবসায়িক যোগাযোগের প্রয়োজন মেটাতে ডিজাইন করা ব্যাপক এসএমএস সমাধান।'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'SMS Service Types' : 'এসএমএস সেবার ধরন'}
            </h2>
            <p className="text-xl text-gray-600">
              {locale === 'en' ? 'Choose from our range of specialized SMS services' : 'আমাদের বিশেষায়িত এসএমএস সেবার পরিসর থেকে বেছে নিন'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="text-btcl-primary mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Developer-Friendly API' : 'ডেভেলপার-বান্ধব API'}
            </h2>
            <p className="text-xl text-gray-600">
              {locale === 'en' ? 'Integrate SMS capabilities into your applications with our robust API' : 'আমাদের শক্তিশালী API দিয়ে আপনার অ্যাপ্লিকেশনে এসএমএস ক্ষমতা সংযুক্ত করুন'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apiFeatures.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href={`/${locale}/register`}>
              <Button size="lg">
                {locale === 'en' ? 'Get API Access' : 'API অ্যাক্সেস পান'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Industries We Serve' : 'আমরা যে শিল্পে সেবা দিই'}
            </h2>
            <p className="text-xl text-gray-600">
              {locale === 'en' ? 'Trusted by businesses across various industries' : 'বিভিন্ন শিল্পের ব্যবসায়িক প্রতিষ্ঠানের আস্থাভাজন'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <div className="font-medium">{industry.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Technical Specifications' : 'প্রযুক্তিগত বিশেষত্ব'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-btcl-primary mb-2">160</div>
                <div className="text-sm text-gray-600">{locale === 'en' ? 'Characters per SMS' : 'এসএমএস প্রতি অক্ষর'}</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-btcl-primary mb-2">1000</div>
                <div className="text-sm text-gray-600">{locale === 'en' ? 'SMS per second' : 'প্রতি সেকেন্ডে এসএমএস'}</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-btcl-primary mb-2">99.9%</div>
                <div className="text-sm text-gray-600">{locale === 'en' ? 'Delivery rate' : 'ডেলিভারি রেট'}</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-btcl-primary mb-2">&lt;3s</div>
                <div className="text-sm text-gray-600">{locale === 'en' ? 'Average delivery time' : 'গড় ডেলিভারি সময়'}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-btcl-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {locale === 'en' ? 'Ready to Get Started?' : 'শুরু করতে প্রস্তুত?'}
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Join thousands of businesses already using BTCL SMS services to connect with their customers.'
              : 'হাজার হাজার ব্যবসায়িক প্রতিষ্ঠানে যোগ দিন যারা ইতিমধ্যে তাদের গ্রাহকদের সাথে সংযোগের জন্য বিটিসিএল এসএমএস সেবা ব্যবহার করছে।'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/register`}>
              <Button size="lg" className="bg-white text-btcl-primary hover:bg-gray-100">
                {locale === 'en' ? 'Create Account' : 'অ্যাকাউন্ট তৈরি করুন'}
              </Button>
            </Link>
            <Link href={`/${locale}/pricing`}>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-btcl-primary">
                {locale === 'en' ? 'View Pricing' : 'মূল্য দেখুন'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}