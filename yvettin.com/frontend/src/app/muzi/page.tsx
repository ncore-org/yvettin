import { Metadata } from 'next';
import { GenderProviderWrapper } from '@/components/gender-provider-wrapper';
import MenHomeContent from '@/components/home/MenHomeContent';

export const metadata: Metadata = {
  title: 'Yvettin - Pánska móda | Tričká, Nohavice, Bundy',
  description:
    'Objavte najnovšie trendy v pánskej móde. Tričká, nohavice, bundy, mikiny a doplnky. Doprava zdarma nad 50€.',
  keywords: 'pánska móda, tričká, nohavice, bundy, mikiny, topánky, doplnky, yvettin',
  openGraph: {
    title: 'Yvettin - Pánska móda',
    description: 'Najnovšie trendy v pánskej móde',
    type: 'website',
    locale: 'sk_SK',
  },
};

export default function MenPage() {
  return (
    <GenderProviderWrapper initialGender="men">
      <MenHomeContent />
    </GenderProviderWrapper>
  );
}
