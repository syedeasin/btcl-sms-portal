import { useTranslations } from 'next-intl'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  const milestones = [
    { year: '1989', event: locale === 'en' ? 'BTCL Established' : 'বিটিসিএল প্রতিষ্ঠা' },
    { year: '2010', event: locale === 'en' ? 'SMS Gateway Launch' : 'এসএমএস গেটওয়ে চালু' },
    { year: '2018', event: locale === 'en' ? 'Bulk SMS Service Expansion' : 'বাল্ক এসএমএস সেবা সম্প্রসারণ' },
    { year: '2024', event: locale === 'en' ? 'Modern Platform Launch' : 'আধুনিক প্ল্যাটফর্ম চালু' }
  ]

  const stats = [
    { number: '1M+', label: locale === 'en' ? 'Messages Sent Daily' : 'দৈনিক বার্তা প্রেরণ' },
    { number: '5000+', label: locale === 'en' ? 'Active Businesses' : 'সক্রিয় ব্যবসা' },
    { number: '99.9%', label: locale === 'en' ? 'Uptime Guarantee' : 'আপটাইম গ্যারান্টি' },
    { number: '24/7', label: locale === 'en' ? 'Customer Support' : 'গ্রাহক সেবা' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-btcl-primary to-btcl-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {locale === 'en' ? 'About BTCL' : 'বিটিসিএল সম্পর্কে'}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {locale === 'en' 
                ? 'Leading Bangladesh\'s telecommunications infrastructure since 1989, now bringing you the most reliable bulk SMS service in the country.'
                : '১৯৮৯ সাল থেকে বাংলাদেশের টেলিযোগাযোগ অবকাঠামোর নেতৃত্ব দিচ্ছি, এখন দেশের সবচেয়ে নির্ভরযোগ্য বাল্ক এসএমএস সেবা প্রদান করছি।'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {locale === 'en' ? 'Our Mission' : 'আমাদের লক্ষ্য'}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {locale === 'en'
                  ? 'Bangladesh Telecommunications Company Limited (BTCL) is the national telecommunications company of Bangladesh, committed to providing world-class communication services to businesses and individuals across the country.'
                  : 'বাংলাদেশ টেলিকমিউনিকেশনস কোম্পানি লিমিটেড (বিটিসিএল) বাংলাদেশের জাতীয় টেলিযোগাযোগ কোম্পানি, যা দেশব্যাপী ব্যবসা ও ব্যক্তিদের বিশ্বমানের যোগাযোগ সেবা প্রদানে প্রতিশ্রুতিবদ্ধ।'
                }
              </p>
              <p className="text-lg text-gray-600">
                {locale === 'en'
                  ? 'Our bulk SMS service represents the latest in our commitment to digital transformation, offering businesses a reliable, secure, and cost-effective way to communicate with their customers.'
                  : 'আমাদের বাল্ক এসএমএস সেবা ডিজিটাল রূপান্তরের প্রতি আমাদের অঙ্গীকারের সর্বশেষ প্রতিনিধিত্ব করে, ব্যবসায়িক প্রতিষ্ঠানগুলোকে তাদের গ্রাহকদের সাথে নির্ভরযোগ্য, নিরাপদ এবং সাশ্রয়ী যোগাযোগের সুবিধা প্রদান করে।'
                }
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {locale === 'en' ? 'Why Choose BTCL?' : 'কেন বিটিসিএল বেছে নেবেন?'}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-btcl-primary mr-3 mt-1">✓</span>
                  <span>{locale === 'en' ? 'Government-backed reliability and trust' : 'সরকার-সমর্থিত নির্ভরযোগ্যতা ও আস্থা'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-btcl-primary mr-3 mt-1">✓</span>
                  <span>{locale === 'en' ? '35+ years of telecommunications expertise' : '৩৫+ বছরের টেলিযোগাযোগ দক্ষতা'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-btcl-primary mr-3 mt-1">✓</span>
                  <span>{locale === 'en' ? 'Nationwide infrastructure coverage' : 'দেশব্যাপী অবকাঠামো কভারেজ'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-btcl-primary mr-3 mt-1">✓</span>
                  <span>{locale === 'en' ? 'Competitive pricing with transparent billing' : 'স্বচ্ছ বিলিং সহ প্রতিযোগিতামূলক মূল্য'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-btcl-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'en' ? 'Our Impact in Numbers' : 'সংখ্যায় আমাদের প্রভাব'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Our Journey' : 'আমাদের যাত্রা'}
            </h2>
            <p className="text-xl text-gray-600">
              {locale === 'en' ? 'Key milestones in BTCL\'s evolution' : 'বিটিসিএল-এর বিকাশের প্রধান মাইলফলক'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-btcl-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-lg">{milestone.year}</span>
                  </div>
                  <CardTitle className="text-lg">{milestone.event}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Our Values' : 'আমাদের মূল্যবোধ'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  {locale === 'en' ? 'Excellence' : 'উৎকর্ষতা'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {locale === 'en'
                    ? 'We strive for excellence in every service we provide, ensuring the highest quality standards.'
                    : 'আমরা প্রতিটি সেবায় উৎকর্ষতার জন্য চেষ্টা করি, সর্বোচ্চ মানের নিশ্চয়তা প্রদান করি।'
                  }
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <span className="text-2xl mr-3">🤝</span>
                  {locale === 'en' ? 'Trust' : 'আস্থা'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {locale === 'en'
                    ? 'Building lasting relationships through transparency, reliability, and consistent service delivery.'
                    : 'স্বচ্ছতা, নির্ভরযোগ্যতা এবং ধারাবাহিক সেবা প্রদানের মাধ্যমে দীর্ঘস্থায়ী সম্পর্ক গড়ে তুলি।'
                  }
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <span className="text-2xl mr-3">🚀</span>
                  {locale === 'en' ? 'Innovation' : 'উদ্ভাবন'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {locale === 'en'
                    ? 'Embracing cutting-edge technology to deliver modern solutions for contemporary challenges.'
                    : 'সমসাময়িক চ্যালেঞ্জের জন্য আধুনিক সমাধান প্রদানে অত্যাধুনিক প্রযুক্তি গ্রহণ।'
                  }
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}