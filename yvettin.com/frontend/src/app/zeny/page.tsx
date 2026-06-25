import { Metadata } from 'next';
import { GenderProviderWrapper } from '@/components/gender-provider-wrapper';
import WomenHomeContent from '@/components/home/WomenHomeContent';

export const metadata: Metadata = {
  title: 'Yvettin - Dámska móda | Šaty, Topy, Nohavice',
  description:
    'Objavte najnovšie trendy v dámskej móde. Šaty, topy, nohavice, bundy a doplnky. Doprava zdarma nad 50€.',
  keywords: 'dámska móda, šaty, topy, nohavice, bundy, topánky, doplnky, yvettin',
  openGraph: {
    title: 'Yvettin - Dámska móda',
    description: 'Najnovšie trendy v dámskej móde',
    type: 'website',
    locale: 'sk_SK',
  },
};

export default function WomenPage() {
  return (
    <GenderProviderWrapper initialGender="women">
      <WomenHomeContent />
    </GenderProviderWrapper>
  );
}
