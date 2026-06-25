import { notFound } from 'next/navigation';
import CategoryPage from '@/components/category/CategoryPage';
import { Product } from '@/types';

// Category configuration
const categories: Record<string, {
  title: string;
  description: string;
  banners: { image: string; title?: string; subtitle?: string }[];
  isSpecial?: boolean;
  specialType?: 'sale' | 'new';
}> = {
  dropy: {
    title: 'Dropy',
    description: 'Exkluzívne limitované edície a nové kolekcie od top značiek. Buďte prví, kto získa najnovšie kúsky.',
    banners: [
      { image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80', title: 'Nové Dropy', subtitle: 'Limitované Edície' },
      { image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80', title: 'Exclusive', subtitle: 'Práve Dorazené' },
      { image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80', title: 'Kolekcie', subtitle: 'Pre Túto Sezónu' },
    ],
  },
  oblecenie: {
    title: 'Oblečenie',
    description: 'Objavte našu rozsiahlu ponuku oblečenia pre každú príležitosť. Od každodenných outfitov po špeciálne udalosti.',
    banners: [
      { image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=80', title: 'Oblečenie', subtitle: 'Pre Každú Príležitosť' },
      { image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1600&q=80', title: 'Štýl', subtitle: 'Najnovšie Trendy' },
      { image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1600&q=80', title: 'Móda', subtitle: 'Pre Neju' },
    ],
  },
  obuv: {
    title: 'Obuv',
    description: 'Kvalitná obuv pre každý krok. Športové tenisky, elegantné topánky aj casual štýly od svetových značiek.',
    banners: [
      { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80', title: 'Obuv', subtitle: 'Pre Každý Krok' },
      { image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1600&q=80', title: 'Tenisky', subtitle: 'Športový Štýl' },
      { image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1600&q=80', title: 'Topánky', subtitle: 'Elegancia & Komfort' },
    ],
  },
  sport: {
    title: 'Šport',
    description: 'Športové oblečenie a doplnky pre maximálny výkon. Funkčné materiály a moderný dizajn.',
    banners: [
      { image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=80', title: 'Šport', subtitle: 'Maximálny Výkon' },
      { image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80', title: 'Fitness', subtitle: 'Tréningové Oblečenie' },
      { image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80', title: 'Running', subtitle: 'Beh & Kardio' },
    ],
  },
  doplnky: {
    title: 'Doplnky',
    description: 'Dokonalé doplnky pre každý outfit. Kabelky, peňaženky, šperky a ďalšie módné doplnky.',
    banners: [
      { image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1600&q=80', title: 'Doplnky', subtitle: 'Dokonalý Detail' },
      { image: 'https://images.unsplash.com/photo-1566150905458-1bf1dad18563?w=1600&q=80', title: 'Kabelky', subtitle: 'Štýlové & Praktické' },
      { image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80', title: 'Šperky', subtitle: 'Elegantné Doplnky' },
    ],
  },
  streetwear: {
    title: 'Streetwear',
    description: 'Urbánny štýl a streetwear kultúra. Oversized strihy, grafické potlače a limitované edície.',
    banners: [
      { image: 'https://images.unsplash.com/photo-1523396870777-e914a7db91aa?w=1600&q=80', title: 'Streetwear', subtitle: 'Urbánny Štýl' },
      { image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1600&q=80', title: 'Urban', subtitle: 'Mestský Štýl' },
      { image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=1600&q=80', title: 'Graphic', subtitle: 'Potlače & Dizajny' },
    ],
  },
  premium: {
    title: 'Premium',
    description: 'Luxusné kúsky od exkluzívnych značiek. Najvyššia kvalita materiálov a spracovania.',
    banners: [
      { image: 'https://images.unsplash.com/photo-1550614000-4b9519e02d48?w=1600&q=80', title: 'Premium', subtitle: 'Luxusná Móda' },
      { image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=80', title: 'Luxury', subtitle: 'Exkluzívne Značky' },
      { image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80', title: 'Designer', subtitle: 'Vysoká Móda' },
    ],
  },
  vypredaj: {
    title: 'VÝPREDAJ',
    description: 'Zľavy až do 70% na vybrané kúsky. Rýchlo, kým zásoby vystačia!',
    banners: [
      { image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=1600&q=80', title: 'VÝPREDAJ', subtitle: 'Až -70%' },
      { image: 'https://images.unsplash.com/photo-1472851294608-41531268f719?w=1600&q=80', title: 'Sale', subtitle: 'Obmedzená Ponuka' },
      { image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80', title: 'Last Chance', subtitle: 'Posledné Kusy' },
    ],
    isSpecial: true,
    specialType: 'sale',
  },
  novinky: {
    title: 'Novinky',
    description: 'Úplne nové kúsky v našej ponuke. Buďte prví, kto objaví najnovšie trendy.',
    banners: [
      { image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80', title: 'NOVINKY', subtitle: 'Práve Dorazené' },
      { image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80', title: 'New In', subtitle: 'Nová Kolekcia' },
      { image: 'https://images.unsplash.com/photo-1472851294608-41531268f719?w=1600&q=80', title: 'Fresh', subtitle: 'Trendy Sezóny' },
    ],
    isSpecial: true,
    specialType: 'new',
  },
};

// Demo products generator
function generateDemoProducts(categorySlug: string): Product[] {
  const productNames: Record<string, string[]> = {
    dropy: ['Limitovaná Edícia Nike Dunk', 'Adidas Yeezy Boost', 'Tommy Hilfiger Drop', 'Levis Vintage Collection'],
    oblecenie: ['Basic Tričko White', 'Slim Fit Džínsy', 'Oversized Mikina', 'Plátené Nohavice'],
    obuv: ['Nike Air Max 90', 'Adidas Stan Smith', 'Vans Old Skool', 'Converse Chuck Taylor'],
    sport: ['Nike Pro Tričko', 'Adidas Training Top', 'Under Armour Legíny', 'Puma Running Shorts'],
    doplnky: ['Kožená Kabelka', 'Minimalistická Peňaženka', 'Zlaté Náušnice', 'Hodinky Classic'],
    streetwear: ['Oversized Hoodie Black', 'Cargo Nohavice', 'Graphic Tee', 'Bucket Hat'],
    premium: ['Designer Kabát', 'Luxury Watch', 'Silk Scarf', 'Leather Boots'],
    vypredaj: ['Výpredajové Tričko', 'Zľavnené Džínsy', 'Akcia Mikina', 'Clearance Topánky'],
    novinky: ['Nové Tričko SS24', 'Nová Kolekcia Džínsy', 'Jarná Mikina', 'Nové Topánky'],
  };

  const names = productNames[categorySlug] || ['Demo Produkt'];
  const imagePhotos = [
    '1521572163474-6864f9cf17ab',
    '1503342394128-c104d54dba01',
    '1576566588028-4147f3d42452',
    '1583743814966-8936f5b7be1a',
    '1434389677669-e08b4cac3105',
    '1485968579580-b6d095142e6e',
    '1542291026-7eec264c27ff',
    '1606107557195-0e29a4b5b4aa',
  ];
  
  return names.map((name, index) => ({
    id: `${categorySlug}-${index}`,
    slug: `${categorySlug}-${name.toLowerCase().replace(/\s+/g, '-')}`,
    name: name,
    brand: ['Nike', 'Adidas', 'Tommy', 'Levis', 'Zara', 'H&M'][index % 6],
    categorySlug: categorySlug,
    price: Math.floor(Math.random() * 150) + 30,
    discountPrice: Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 20 : null,
    images: [`https://images.unsplash.com/photo-${imagePhotos[index % imagePhotos.length]}?w=400&q=80`],
    description: `Detailný popis produktu ${name}. Kvalitné materiály a moderný dizajn.`,
    shortDescription: `${name} - štýlový kúsok pre váš šatník`,
    variants: [
      { id: `${categorySlug}-${index}-s`, size: 'S', color: 'Default', colorHex: '#000000', stock: 10, sku: `${categorySlug}-${index}-s` },
      { id: `${categorySlug}-${index}-m`, size: 'M', color: 'Default', colorHex: '#000000', stock: 15, sku: `${categorySlug}-${index}-m` },
      { id: `${categorySlug}-${index}-l`, size: 'L', color: 'Default', colorHex: '#000000', stock: 8, sku: `${categorySlug}-${index}-l` },
      { id: `${categorySlug}-${index}-xl`, size: 'XL', color: 'Default', colorHex: '#000000', stock: 5, sku: `${categorySlug}-${index}-xl` },
    ],
    attributes: {
      material: '100% Bavlna',
      fit: 'Regular',
      style: 'Casual',
      season: 'SS24',
      care: ['Prať na 30°C', 'Nežehliť', 'Sušiť v sušičke'],
    },
    inStock: true,
    stockQuantity: Math.floor(Math.random() * 50) + 5,
    isNew: categorySlug === 'novinky' || Math.random() > 0.7,
    bestseller: Math.random() > 0.6,
    featured: Math.random() > 0.8,
    gender: 'unisex',
    discount: undefined,
    isBestseller: undefined,
    sustainable: undefined,
  })) as Product[];
}

export async function generateStaticParams() {
  return Object.keys(categories).map(slug => ({ slug }));
}

export default function CategoryPageRoute({ params }: { params: { slug: string } }) {
  const category = categories[params.slug];

  if (!category) {
    notFound();
  }

  const products = generateDemoProducts(params.slug);

  return (
    <CategoryPage
      slug={params.slug}
      title={category.title}
      description={category.description}
      products={products}
      bannerSlides={category.banners.map(b => ({
        id: b.image,
        image: b.image,
        title: b.title,
        subtitle: b.subtitle,
      }))}
      isSpecialPage={category.isSpecial}
      specialPageType={category.specialType}
    />
  );
}
