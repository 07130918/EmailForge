import { Providers } from '@/app/providers';
import type { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
    title: 'Email Forge',
    description: 'Everyone can make beautiful emails easily with Email Forge',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='ja'>
            <Head>
                <link rel='icon' href='/favicon.ico' sizes='any' />
            </Head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
