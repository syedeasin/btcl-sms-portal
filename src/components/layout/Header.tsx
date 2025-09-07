'use client'

import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { LanguageToggle } from './LanguageToggle'

export function Header() {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()

  const navigation = [
    { name: t('navigation.home'), href: `/${locale}` },
    { name: t('navigation.about'), href: `/${locale}/about` },
    { name: t('navigation.services'), href: `/${locale}/services` },
    { name: t('navigation.pricing'), href: `/${locale}/pricing` },
    { name: t('navigation.contact'), href: `/${locale}/contact` },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <Image
                  src="/btcllogo.png"
                  alt="BTCL Logo"
                  width={124}
                  height={100}
                  className="rounded-lg object-contain"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-btcl-primary ${
                  pathname === item.href
                    ? 'text-btcl-primary'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <Link href={`/${locale}/login`}>
              <Button variant="ghost" size="sm">
                {t('navigation.login')}
              </Button>
            </Link>
            <Link href={`/${locale}/register`}>
              <Button size="sm">
                {t('navigation.register')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}