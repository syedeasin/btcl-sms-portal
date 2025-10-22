import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';

const locales = ['en', 'bn'];

export default getRequestConfig(async () => {
  // Get the locale from headers
  const headersList = await headers();
  const locale = headersList.get('X-NEXT-INTL-LOCALE') || 'en';

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});