import { Truck, RefreshCw, Headphones, Shield } from 'lucide-react';

export default function USPBanner() {
  const features = [
    {
      icon: Truck,
      title: 'Doprava zdarma',
      description: 'Pri nákupe nad 50€',
    },
    {
      icon: RefreshCw,
      title: '30-dňové vrátenie',
      description: 'Bez zbytočných otázok',
    },
    {
      icon: Headphones,
      title: 'Zákaznícka podpora',
      description: '24/7 online chat',
    },
    {
      icon: Shield,
      title: 'Bezpečná platba',
      description: 'SSL šifrovanie',
    },
  ];

  return (
    <section className="border-y border-neutral-100 bg-white py-12">
      <div className="container-custom">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-neutral-900">
                <feature.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-900">{feature.title}</h3>
                <p className="mt-1 text-xs text-neutral-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
