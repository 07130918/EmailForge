import { Providers } from '@/app/providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Email Forge',
    description: 'Everyone can make beautiful emails easily with Email Forge',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='ja'>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
