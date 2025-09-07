import { useTranslations } from 'next-intl'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  const features = [
    {
      title: t('home.features.reliable.title'),
      description: t('home.features.reliable.description'),
      icon: '🔒'
    },
    {
      title: t('home.features.fast.title'),
      description: t('home.features.fast.description'),
      icon: '⚡'
    },
    {
      title: t('home.features.secure.title'),
      description: t('home.features.secure.description'),
      icon: '🛡️'
    },
    {
      title: t('home.features.support.title'),
      description: t('home.features.support.description'),
      icon: '📞'
    }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: 500,
      sms: 1000,
      features: ['Basic API Access', 'Email Support', '30 Days Validity']
    },
    {
      name: 'Business',
      price: 2000,
      sms: 5000,
      features: ['Advanced API', 'Priority Support', '60 Days Validity', 'Custom Sender ID']
    },
    {
      name: 'Enterprise',
      price: 8000,
      sms: 25000,
      features: ['Premium API', '24/7 Support', '90 Days Validity', 'Custom Integration', 'Dedicated Manager']
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section
          className="bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: "url('/herobg.png')" }}
      >
        <div className="bg-black/60 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
                {t('home.hero.subtitle')}
              </p>
              <p className="text-lg text-green-100 mb-10 max-w-2xl mx-auto">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/register`}>
                  <Button size="lg" className="bg-white text-btcl-primary hover:bg-gray-100">
                    {t('home.hero.cta')}
                  </Button>
                </Link>
                <Link href={`/${locale}/services`}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-btcl-primary">
                    {t('home.hero.learn_more')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.pricing.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {t('home.pricing.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${index === 1 ? 'border-btcl-primary shadow-lg scale-105' : ''}`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-btcl-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-btcl-primary">৳{plan.price}</span>
                    <span className="text-gray-600">/{plan.sms} SMS</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="text-btcl-primary mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href={`/${locale}/packages`}>
                      <Button 
                        className="w-full" 
                        variant={index === 1 ? 'primary' : 'outline'}
                      >
                        Choose Plan
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href={`/${locale}/pricing`}>
              <Button variant="outline" size="lg">
                {t('home.pricing.view_all')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.testimonials.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-btcl-primary rounded-full flex items-center justify-center text-white font-bold">
                      {item === 1 ? 'A' : item === 2 ? 'B' : 'C'}
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold">
                        {item === 1 ? 'Ahmed Trading' : item === 2 ? 'Bangladeshi Bank' : 'City Hospital'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item === 1 ? 'E-commerce' : item === 2 ? 'Banking' : 'Healthcare'}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    {locale === 'en' 
                      ? `"BTCL SMS service has revolutionized our customer communication. Reliable, fast, and cost-effective solution for our business."`
                      : `"বিটিসিএল এসএমএস সেবা আমাদের গ্রাহক যোগাযোগে বিপ্লব এনেছে। আমাদের ব্যবসার জন্য নির্ভরযোগ্য, দ্রুত এবং সাশ্রয়ী সমাধান।"`
                    }
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}