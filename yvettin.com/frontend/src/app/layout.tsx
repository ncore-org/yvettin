import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import ExitIntentPopup from '@/components/ui/ExitIntentPopup';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yvettin - Fashion & Clothing E-commerce',
  description: 'Premium fashion and clothing e-commerce platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <CookieBanner />
            <ExitIntentPopup discountPercent={5} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
