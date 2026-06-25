import { DEMO_CATEGORIES, DEMO_PRODUCTS } from '@/data/demo-data';
import { Category, Product } from '@/types';

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  novinky: {
    title: 'Novinky',
    description: 'Najnovsie modely a aktualne trendove kolekcie pre tuto sezonu.',
  },
  vypredaj: {
    title: 'Vypredaj',
    description: 'Kuratorovany vyber produktov so zlavou pre rychly a vyhodny nakup.',
  },
  znacky: {
    title: 'Znacky',
    description: 'Objavte sortiment podla oblubenych znaciek a produktovych linii.',
  },
  bestsellery: {
    title: 'Bestsellery',
    description: 'Najpredavanejsie produkty overene stovkami spokojnych zakaznikov.',
  },
};

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function flattenCategories(categories: Category[]): Category[] {
  return categories.flatMap(category => [
    category,
    ...(category.children ? flattenCategories(category.children) : []),
  ]);
}

export function getFlatCategories() {
  return flattenCategories(DEMO_CATEGORIES);
}

export function getCategoryBySegments(segments: string[]) {
  const slugPath = segments.join('/');
  return getFlatCategories().find(category => category.slug === slugPath);
}

export function getAllBrands() {
  return Array.from(new Set(DEMO_PRODUCTS.map(product => product.brand))).sort((a, b) =>
    a.localeCompare(b, 'sk')
  );
}

function filterBySpecialCategory(segments: string[]) {
  const [firstSegment, secondSegment] = segments;

  if (firstSegment === 'novinky') {
    return DEMO_PRODUCTS.filter(product => product.isNew);
  }

  if (firstSegment === 'vypredaj') {
    return DEMO_PRODUCTS.filter(product => product.discountPrice !== null);
  }

  if (firstSegment === 'bestsellery') {
    return DEMO_PRODUCTS.filter(product => product.bestseller);
  }

  if (firstSegment === 'znacky') {
    if (!secondSegment) {
      return DEMO_PRODUCTS;
    }

    return DEMO_PRODUCTS.filter(product => normalizeSlug(product.brand) === secondSegment);
  }

  return null;
}

export function getProductsForCategorySegments(segments: string[]) {
  const specialCategoryProducts = filterBySpecialCategory(segments);

  if (specialCategoryProducts !== null) {
    return specialCategoryProducts;
  }

  const slugPath = segments.join('/');

  if (!slugPath) {
    return [];
  }

  return DEMO_PRODUCTS.filter(
    product => product.categorySlug === slugPath || product.categorySlug.startsWith(`${slugPath}/`)
  );
}

export function getCategoryMeta(segments: string[]) {
  const [firstSegment, secondSegment] = segments;

  if (firstSegment === 'znacky' && secondSegment) {
    const brand = DEMO_PRODUCTS.find(
      product => normalizeSlug(product.brand) === secondSegment
    )?.brand;

    return {
      title: brand ? `Znacka ${brand}` : 'Znacky',
      description: brand
        ? `Vyberte si produkty znacky ${brand} z aktualnej ponuky Yvettin.`
        : CATEGORY_META.znacky.description,
    };
  }

  if (firstSegment && CATEGORY_META[firstSegment]) {
    return CATEGORY_META[firstSegment];
  }

  const category = getCategoryBySegments(segments);

  if (category) {
    return {
      title: category.name,
      description: `Objavte ponuku v kategorii ${category.name} pre fashion e-shop Yvettin.`,
    };
  }

  return {
    title: 'Kategoria',
    description: 'Prehlad produktov podla vybratej kategorie.',
  };
}

export function getProductBySlug(slug: string) {
  return DEMO_PRODUCTS.find(product => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit: number = 4) {
  return DEMO_PRODUCTS.filter(
    candidate =>
      candidate.id !== product.id &&
      (candidate.categorySlug.startsWith(product.categorySlug.split('/').slice(0, 2).join('/')) ||
        candidate.brand === product.brand)
  ).slice(0, limit);
}

export function searchProducts(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return DEMO_PRODUCTS.filter(product => {
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.brand.toLowerCase().includes(normalizedQuery) ||
      product.categorySlug.toLowerCase().includes(normalizedQuery) ||
      product.shortDescription.toLowerCase().includes(normalizedQuery)
    );
  });
}
