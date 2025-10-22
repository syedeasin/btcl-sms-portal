import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {Inter} from 'next/font/google';
import { SessionProvider } from '@/components/providers/SessionProvider';
import ToastProvider from '@/components/toastProvider/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export default async function LocaleLayout({
                                             children,
                                             params
                                           }: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
      <html lang={locale} dir={locale === 'bn' ? 'rtl' : 'ltr'} suppressHydrationWarning>
        <head>
          <title>BTCL SMS</title>
          <meta name="description" content="BTCL SMS Management System" />
          <link rel="icon" href="/fabicon.png" />
        </head>
        <body className={inter.className} suppressHydrationWarning>
          <SessionProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
              <ToastProvider />
            </NextIntlClientProvider>
          </SessionProvider>
        </body>
      </html>
  );
}