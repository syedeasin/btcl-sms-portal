'use client'

import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Image from "next/image";

export function Footer() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${locale}`} className="flex items-center space-x-3 pb-6">
              <Image
                  src="/btcllogo.png"
                  alt="BTCL Logo"
                  width={124}
                  height={100}
                  className="rounded-lg object-contain"
              />
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              {locale === 'en' 
                ? "Bangladesh's most reliable bulk SMS service provider. Connecting businesses with their customers through instant messaging solutions."
                : "বাংলাদেশের সবচেয়ে নির্ভরযোগ্য বাল্ক এসএমএস সেবা প্রদানকারী। তাৎক্ষণিক বার্তা সমাধানের মাধ্যমে ব্যবসাকে তাদের গ্রাহকদের সাথে সংযুক্ত করছি।"
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/about`} className="text-gray-300 hover:text-white transition-colors">{t('navigation.about')}</Link></li>
              <li><Link href={`/${locale}/services`} className="text-gray-300 hover:text-white transition-colors">{t('navigation.services')}</Link></li>
              <li><Link href={`/${locale}/pricing`} className="text-gray-300 hover:text-white transition-colors">{t('navigation.pricing')}</Link></li>
              <li><Link href={`/${locale}/contact`} className="text-gray-300 hover:text-white transition-colors">{t('navigation.contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p>IEB Bhaban (5th Floor)</p>
              <p>Ramna, Dhaka-1000</p>
              <p>Phone: +880-2-9665650</p>
              <p>Email: sms@btcl.gov.bd</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Bangladesh Telecommunications Company Limited. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}