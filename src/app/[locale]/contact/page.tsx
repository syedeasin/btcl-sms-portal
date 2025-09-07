import { useTranslations } from 'next-intl'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  const offices = [
    {
      name: locale === 'en' ? 'Head Office' : 'প্রধান কার্যালয়',
      address: locale === 'en' 
        ? 'IEB Bhaban (5th Floor), Ramna, Dhaka-1000, Bangladesh'
        : 'আইইবি ভবন (৫ম তলা), রমনা, ঢাকা-১০০০, বাংলাদেশ',
      phone: '+880-2-9665650',
      email: 'info@btcl.gov.bd',
      hours: locale === 'en' ? 'Sunday - Thursday: 9:00 AM - 5:00 PM' : 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০'
    },
    {
      name: locale === 'en' ? 'SMS Support Center' : 'এসএমএস সাপোর্ট সেন্টার',
      address: locale === 'en'
        ? 'BTCL Tower, Agargaon, Dhaka-1207, Bangladesh'
        : 'বিটিসিএল টাওয়ার, আগারগাঁও, ঢাকা-১২০৭, বাংলাদেশ',
      phone: '+880-2-8181234',
      email: 'sms@btcl.gov.bd',
      hours: locale === 'en' ? '24/7 Support Available' : '২৪/৭ সাপোর্ট উপলব্ধ'
    }
  ]

  const supportChannels = [
    {
      title: locale === 'en' ? 'Email Support' : 'ইমেইল সাপোর্ট',
      description: locale === 'en' 
        ? 'Get help via email for non-urgent inquiries'
        : 'অজরুরি অনুসন্ধানের জন্য ইমেইলের মাধ্যমে সহায়তা পান',
      contact: 'support@btcl.gov.bd',
      response: locale === 'en' ? 'Response within 24 hours' : '২৪ ঘন্টার মধ্যে উত্তর',
      icon: '📧'
    },
    {
      title: locale === 'en' ? 'Phone Support' : 'ফোন সাপোর্ট',
      description: locale === 'en'
        ? 'Speak directly with our technical support team'
        : 'আমাদের প্রযুক্তিগত সহায়তা দলের সাথে সরাসরি কথা বলুন',
      contact: '+880-2-8181234',
      response: locale === 'en' ? 'Available 24/7' : '২৪/৭ উপলব্ধ',
      icon: '📞'
    },
    {
      title: locale === 'en' ? 'Live Chat' : 'লাইভ চ্যাট',
      description: locale === 'en'
        ? 'Instant support through our website chat'
        : 'আমাদের ওয়েবসাইট চ্যাটের মাধ্যমে তাৎক্ষণিক সহায়তা',
      contact: locale === 'en' ? 'Available on website' : 'ওয়েবসাইটে উপলব্ধ',
      response: locale === 'en' ? 'Instant response' : 'তাৎক্ষণিক উত্তর',
      icon: '💬'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-btcl-primary to-btcl-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {locale === 'en' ? 'Contact Us' : 'যোগাযোগ করুন'}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {locale === 'en'
                ? 'Get in touch with our team for support, sales inquiries, or any questions about our SMS services.'
                : 'সাপোর্ট, বিক্রয় অনুসন্ধান বা আমাদের এসএমএস সেবা সম্পর্কে যেকোনো প্রশ্নের জন্য আমাদের দলের সাথে যোগাযোগ করুন।'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {locale === 'en' ? 'Send us a Message' : 'আমাদের একটি বার্তা পাঠান'}
                </CardTitle>
                <CardDescription>
                  {locale === 'en' 
                    ? 'Fill out the form below and we\'ll get back to you as soon as possible.'
                    : 'নিচের ফর্মটি পূরণ করুন এবং আমরা যত তাড়াতাড়ি সম্ভব আপনার কাছে ফিরে আসব।'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label={locale === 'en' ? 'Full Name' : 'পূর্ণ নাম'}
                      required
                    />
                    <Input
                      label={locale === 'en' ? 'Company' : 'কোম্পানি'}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label={locale === 'en' ? 'Email Address' : 'ইমেইল ঠিকানা'}
                      type="email"
                      required
                    />
                    <Input
                      label={locale === 'en' ? 'Phone Number' : 'ফোন নম্বর'}
                      type="tel"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'en' ? 'Subject' : 'বিষয়'}
                    </label>
                    <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-btcl-primary focus:border-btcl-primary">
                      <option value="">
                        {locale === 'en' ? 'Select a subject' : 'একটি বিষয় নির্বাচন করুন'}
                      </option>
                      <option value="sales">
                        {locale === 'en' ? 'Sales Inquiry' : 'বিক্রয় অনুসন্ধান'}
                      </option>
                      <option value="support">
                        {locale === 'en' ? 'Technical Support' : 'প্রযুক্তিগত সহায়তা'}
                      </option>
                      <option value="billing">
                        {locale === 'en' ? 'Billing Question' : 'বিলিং প্রশ্ন'}
                      </option>
                      <option value="partnership">
                        {locale === 'en' ? 'Partnership' : 'অংশীদারিত্ব'}
                      </option>
                      <option value="other">
                        {locale === 'en' ? 'Other' : 'অন্যান্য'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'en' ? 'Message' : 'বার্তা'}
                    </label>
                    <textarea
                      rows={6}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-btcl-primary focus:border-btcl-primary"
                      placeholder={locale === 'en' ? 'Tell us how we can help you...' : 'আমরা আপনাকে কীভাবে সাহায্য করতে পারি তা বলুন...'}
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full">
                    {locale === 'en' ? 'Send Message' : 'বার্তা পাঠান'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Support Channels */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {locale === 'en' ? 'Support Channels' : 'সাপোর্ট চ্যানেল'}
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {supportChannels.map((channel, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start">
                          <div className="text-3xl mr-4">{channel.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{channel.title}</h3>
                            <p className="text-gray-600 mb-2">{channel.description}</p>
                            <div className="space-y-1">
                              <p className="font-medium text-btcl-primary">{channel.contact}</p>
                              <p className="text-sm text-gray-500">{channel.response}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Office Locations */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {locale === 'en' ? 'Office Locations' : 'অফিসের অবস্থান'}
                </h2>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-3">{office.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{office.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>{office.email}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{office.hours}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
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
            <p className="text-xl text-gray-600">
              {locale === 'en' ? 'Quick answers to common questions' : 'সাধারণ প্রশ্নের দ্রুত উত্তর'}
            </p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {locale === 'en' ? 'How quickly can I get started?' : 'আমি কত তাড়াতাড়ি শুরু করতে পারি?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {locale === 'en'
                    ? 'You can start sending SMS immediately after account verification and package purchase. The entire process typically takes 1-2 business days.'
                    : 'অ্যাকাউন্ট যাচাইকরণ এবং প্যাকেজ ক্রয়ের পর আপনি অবিলম্বে এসএমএস পাঠানো শুরু করতে পারেন। সম্পূর্ণ প্রক্রিয়া সাধারণত ১-২ কার্যদিবস সময় নেয়।'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {locale === 'en' ? 'What payment methods do you accept?' : 'আপনারা কী কী পেমেন্ট পদ্ধতি গ্রহণ করেন?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {locale === 'en'
                    ? 'We accept all major payment methods including mobile banking (bKash, Nagad, Rocket), credit/debit cards, and bank transfers through SSL Commerz.'
                    : 'আমরা SSL Commerz এর মাধ্যমে মোবাইল ব্যাংকিং (বিকাশ, নগদ, রকেট), ক্রেডিট/ডেবিট কার্ড এবং ব্যাংক ট্রান্সফার সহ সকল প্রধান পেমেন্ট পদ্ধতি গ্রহণ করি।'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {locale === 'en' ? 'Do you provide API documentation?' : 'আপনারা কি API ডকুমেন্টেশন প্রদান করেন?'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {locale === 'en'
                    ? 'Yes, we provide comprehensive API documentation with code examples in multiple programming languages, along with SDKs for easy integration.'
                    : 'হ্যাঁ, আমরা একাধিক প্রোগ্রামিং ভাষায় কোড উদাহরণ সহ ব্যাপক API ডকুমেন্টেশন প্রদান করি, সাথে সহজ ইন্টিগ্রেশনের জন্য SDK।'
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