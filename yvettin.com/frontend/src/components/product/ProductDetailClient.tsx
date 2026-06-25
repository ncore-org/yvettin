'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Share2, Truck, RotateCcw, Shield, Star, Plus, Minus, Check, ChevronRight, Package, Clock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/lib/store/cart';
import { useCartUIStore } from '@/lib/store/cart-ui';
import { useWishlistStore } from '@/lib/store/wishlist';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import LoyaltyPointsBadge from '@/components/loyalty/LoyaltyPointsBadge';
import EnterpriseCarousel from '@/components/sections/EnterpriseCarousel';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const { toast } = useToast();
  const openCart = useCartUIStore(state => state.open);
  const addToCart = useCartStore(state => state.addItem);
  const addToWishlist = useWishlistStore(state => state.addItem);
  const removeFromWishlist = useWishlistStore(state => state.removeItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id));

  // Get unique sizes and colors
  const sizes = useMemo(() => [...new Set(product.variants.map(v => v.size))], [product.variants]);
  const colors = useMemo(() => [...new Set(product.variants.map(v => ({ color: v.color, hex: v.colorHex })))], [product.variants]);

  // Find matching variant
  const selectedVariant = useMemo(() => {
    return product.variants.find(v => v.size === selectedSize && v.color === selectedColor);
  }, [product.variants, selectedSize, selectedColor]);

  const currentPrice = product.discountPrice ?? product.price;
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  // Calculate delivery date
  const getDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 2);
    return deliveryDate.toLocaleDateString('sk-SK', { day: 'numeric', month: 'long' });
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast({
        title: 'Vyberte veľkosť a farbu',
        description: 'Pred pridaním do košíka vyberte prosím veľkosť a farbu.',
        variant: 'destructive',
      });
      return;
    }

    setIsAddingToCart(true);

    await new Promise(resolve => setTimeout(resolve, 300));

    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
      product,
      variant: selectedVariant,
    });

    setIsAddingToCart(false);
    toast({
      title: '✓ Pridané do košíka',
      description: `${product.name} (${selectedVariant.size}, ${selectedVariant.color})`,
    });

    openCart();
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast({ title: 'Odstránené z obľúbených' });
    } else {
      addToWishlist(product.id);
      toast({ title: '✓ Pridané do obľúbených' });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Odkaz skopírovaný do schránky' });
    }
  };

  // Split related products for different sections
  const similarProducts = relatedProducts.slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb - Enhanced */}
      <div className="border-b border-neutral-100 bg-neutral-50/50">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Domov</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/kategoria/${product.categorySlug}`} className="hover:text-neutral-900 transition-colors capitalize">
              {product.categorySlug.includes('zeny') ? 'Ženy' : product.categorySlug.includes('muzi') ? 'Muži' : product.categorySlug.split('/')[0]}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-neutral-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container-custom py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left: Thumbnail Gallery */}
          <div className="hidden lg:flex lg:col-span-1 flex-col gap-3">
            {product.images.map((image, idx) => (
              <motion.button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all duration-300",
                  selectedImage === idx 
                    ? "border-neutral-900 ring-2 ring-neutral-900/20" 
                    : "border-neutral-200 hover:border-neutral-400"
                )}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.button>
            ))}
          </div>

          {/* Center: Main Image */}
          <div className="lg:col-span-6">
            <motion.div 
              className="relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage] || product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-neutral-900 text-white text-xs px-3 py-1.5">NOVÉ</Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge className="bg-red-600 text-white text-xs px-3 py-1.5">-{discountPercentage}%</Badge>
                )}
                {product.isBestseller && (
                  <Badge className="bg-amber-500 text-white text-xs px-3 py-1.5">BESTSELLER</Badge>
                )}
              </div>

              {/* Wishlist Button */}
              <motion.button
                onClick={handleWishlist}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <Heart className={cn("w-5 h-5 transition-colors", isInWishlist ? "fill-red-500 text-red-500" : "text-neutral-600")} />
              </motion.button>

              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-md">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        idx === selectedImage ? "bg-neutral-900 w-6" : "bg-neutral-300"
                      )}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Mobile Thumbnails */}
            <div className="flex lg:hidden gap-2 mt-4 overflow-x-auto pb-2 -mx-4 px-4">
              {product.images.map((image, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn(
                    "relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                    selectedImage === idx ? "border-neutral-900 ring-2 ring-neutral-900/20" : "border-neutral-200"
                  )}
                >
                  <Image src={image} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: Product Info - Enhanced */}
          <div className="lg:col-span-5 space-y-6">
            {/* Brand & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link href={`/znacka/${product.brand.toLowerCase()}`} className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                <span className="font-medium uppercase tracking-wider">{product.brand}</span>
              </Link>
              <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 mt-2 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-neutral-500">4.8 (127 hodnotení)</span>
                <span className="text-neutral-300">|</span>
                <span className="text-sm text-green-600 font-medium">Skladom</span>
              </div>
            </motion.div>

            {/* Price - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-bold text-neutral-900">
                  {formatPrice(currentPrice)}
                </span>
                {product.discountPrice && (
                  <>
                    <span className="text-xl text-neutral-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <Badge variant="destructive" className="text-sm">
                      Ušetríte {formatPrice(product.price - product.discountPrice)}
                    </Badge>
                  </>
                )}
              </div>

              <LoyaltyPointsBadge price={currentPrice} />
            </motion.div>

            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-neutral-600 text-sm leading-relaxed"
            >
              {product.shortDescription}
            </motion.p>

            {/* Delivery Info - NEW */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100"
            >
              <Package className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-900">Doručenie do {getDeliveryDate()}</p>
                <p className="text-xs text-green-700">Expresné vybavenie do 24 hodín</p>
              </div>
            </motion.div>

            {/* Color Selection - Enhanced */}
            {colors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-neutral-900">
                    Farba: <span className="font-normal text-neutral-600">{selectedColor || 'Vyberte'}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {colors.map(({ color, hex }) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-sm",
                        selectedColor === color 
                          ? "border-neutral-900 scale-110 ring-2 ring-neutral-900/20" 
                          : "border-neutral-200 hover:border-neutral-400"
                      )}
                      style={{ backgroundColor: hex }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <Check className="w-4 h-4 mx-auto text-white drop-shadow-md" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Size Selection - Enhanced */}
            {sizes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-neutral-900">
                    Veľkosť: <span className="font-normal text-neutral-600">{selectedSize || 'Vyberte'}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-sm text-neutral-500 underline hover:text-neutral-900 transition-colors"
                  >
                    Tabuľka veľkostí
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => {
                    const isAvailable = product.variants.some(v => v.size === size && v.stock > 0);
                    return (
                      <motion.button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        whileHover={isAvailable ? { scale: 1.05 } : {}}
                        whileTap={isAvailable ? { scale: 0.95 } : {}}
                        className={cn(
                          "min-w-[3.5rem] h-12 px-3 rounded-xl border text-sm font-medium transition-all duration-300",
                          selectedSize === size
                            ? "border-neutral-900 bg-neutral-900 text-white shadow-md"
                            : isAvailable
                              ? "border-neutral-300 hover:border-neutral-900 text-neutral-900 hover:shadow-sm"
                              : "border-neutral-200 text-neutral-300 cursor-not-allowed bg-neutral-50 line-through"
                        )}
                      >
                        {size}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Quantity - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4"
            >
              <span className="text-sm font-medium text-neutral-900">Množstvo:</span>
              <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden">
                <motion.button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  whileHover={{ backgroundColor: '#f5f5f5' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <motion.span 
                  className="w-14 text-center font-semibold text-lg"
                  key={quantity}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {quantity}
                </motion.span>
                <motion.button
                  onClick={() => setQuantity(q => q + 1)}
                  whileHover={{ backgroundColor: '#f5f5f5' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Add to Cart Button - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={cn(
                  "w-full h-14 text-base font-semibold rounded-full transition-all duration-300 shadow-lg",
                  isAddingToCart
                    ? "bg-green-600 hover:bg-green-600 shadow-green-200"
                    : "bg-neutral-900 hover:bg-neutral-800 hover:shadow-xl hover:scale-[1.02]"
                )}
              >
                {isAddingToCart ? (
                  <motion.span 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Pridané do košíka
                  </motion.span>
                ) : (
                  <motion.span className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Pridať do košíka
                  </motion.span>
                )}
              </Button>
            </motion.div>

            {/* Trust Badges - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-3 gap-3 py-5 border-t border-b border-neutral-100"
            >
              <div className="text-center group">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-neutral-50 group-hover:bg-neutral-900 transition-colors duration-300 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs text-neutral-600">Doprava zdarma nad 50€</span>
              </div>
              <div className="text-center group">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-neutral-50 group-hover:bg-neutral-900 transition-colors duration-300 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs text-neutral-600">30 dní na vrátenie</span>
              </div>
              <div className="text-center group">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-neutral-50 group-hover:bg-neutral-900 transition-colors duration-300 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs text-neutral-600">2 roky záruka</span>
              </div>
            </motion.div>

            {/* Product Details Accordion - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="description" className="border-neutral-200">
                  <AccordionTrigger className="text-sm font-medium py-4">Popis produktu</AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-600 leading-relaxed pb-4">
                    {product.description}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="details" className="border-neutral-200">
                  <AccordionTrigger className="text-sm font-medium py-4">Detaily a materiál</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li className="flex gap-2"><span className="font-medium">Materiál:</span> {product.attributes.material}</li>
                      <li className="flex gap-2"><span className="font-medium">Strih:</span> {product.attributes.fit}</li>
                      <li className="flex gap-2"><span className="font-medium">Štýl:</span> {product.attributes.style}</li>
                      <li className="flex gap-2"><span className="font-medium">Sezóna:</span> {product.attributes.season}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care" className="border-neutral-200">
                  <AccordionTrigger className="text-sm font-medium py-4">Starostlivosť</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ul className="space-y-1 text-sm text-neutral-600">
                      {product.attributes.care.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-neutral-400 mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="delivery" className="border-neutral-200">
                  <AccordionTrigger className="text-sm font-medium py-4">Doprava a platba</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-3 text-sm text-neutral-600">
                      <div className="flex items-start gap-3">
                        <Truck className="w-4 h-4 text-neutral-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-neutral-900">Doprava</p>
                          <p>Kuriér: 4.99€ | Nad 50€ zdarma</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Package className="w-4 h-4 text-neutral-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-neutral-900">Osobný odber</p>
                          <p>Zdarma na výdajných miestach</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* Share */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-3 pt-4 border-t border-neutral-100"
            >
              <span className="text-sm text-neutral-500">Zdieľať:</span>
              <motion.button 
                onClick={handleShare}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <Share2 className="w-4 h-4 text-neutral-600" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Similar Products - Enhanced Section */}
      {similarProducts.length > 0 && (
        <section className="bg-neutral-50 py-16">
          <div className="container-custom">
            <EnterpriseCarousel
              products={similarProducts}
              title="Podobné produkty"
              subtitle="Môže sa vám páčiť"
              viewAllHref={`/kategoria/${product.categorySlug}`}
              viewAllLabel="Zobraziť všetky"
              itemsPerView={{ mobile: 1.5, tablet: 3, desktop: 4 }}
              gap={24}
              light={true}
              showProgress={true}
            />
          </div>
        </section>
      )}
    </div>
  );
}
