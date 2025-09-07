// app/page.tsx
import { useTranslations } from 'next-intl';

export async function generateStaticParams() {
    // no params for root page
    return [{}];
}

export default function Home() {
    const t = useTranslations('Home');
    return (
        <main>
            <h1>{t('welcome')}</h1>
            <p>This is root page without locale in URL</p>
        </main>
    );
}
