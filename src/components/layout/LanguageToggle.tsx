'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'bn' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(pathname)
    console.log(pathname+'-------------------------')
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={switchLanguage}
      className="font-medium"
    >
      {locale === 'en' ? 'বাংলা' : 'English'}
    </Button>
  )
}