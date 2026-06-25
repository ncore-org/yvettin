import Link from 'next/link';
import { PageSection, PageTemplate } from '@/components/content/PageTemplate';

const helpLinks = [
  { title: 'Doprava a platba', href: '/doprava' },
  { title: 'Vymena a vratenie', href: '/vymena-vratenie' },
  { title: 'FAQ', href: '/faq' },
  { title: 'Velkostne tabulky', href: '/velkostne-tabulky' },
  { title: 'GDPR', href: '/gdpr' },
  { title: 'Cookies', href: '/cookies' },
  { title: 'Obchodne podmienky', href: '/obchodne-podmienky' },
];

export default function HelpPage() {
  return (
    <PageTemplate
      eyebrow="Pomoc"
      title="Centrum podpory Yvettin"
      description="Vsetky klucove informacie pre pohodlny nakup, post-purchase servis a pravne dokumenty na jednom mieste."
    >
      <PageSection title="Rychla navigacia">
        <div className="grid gap-3 sm:grid-cols-2">
          {helpLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md border border-neutral-200 px-4 py-3 text-sm text-neutral-700 transition-colors hover:border-neutral-500 hover:text-neutral-900"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection title="Kontakt na podporu">
        <p>Pri individualnych poziadavkach nas kontaktujte na podpora@yvettin.com.</p>
        <p>Telefonicka podpora je dostupna pracovny den v case od 08:00 do 17:00.</p>
      </PageSection>
    </PageTemplate>
  );
}
