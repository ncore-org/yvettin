'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronRight, ArrowRight, Bell, Percent } from 'lucide-react';
import { useGender } from '@/lib/gender-context';
import { useCartStore } from '@/lib/store/cart';
import { useCartUIStore } from '@/lib/store/cart-ui';
import { useWishlistStore } from '@/lib/store/wishlist';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import CartDrawer from '@/components/cart/CartDrawer';
import ThemeToggle from '@/components/ui/ThemeToggle';

// Bottom navigation categories - ALL original categories restored
const getBottomNav = (activeGender: 'women' | 'men' | null) => {
  return [
    { name: 'Dropy', href: '/dropy', highlight: false },
    { name: 'Oblečenie', href: '/oblecenie', highlight: false },
    { name: 'Obuv', href: '/obuv', highlight: false },
    { name: 'Šport', href: '/sport', highlight: false },
    { name: 'Doplnky', href: '/doplnky', highlight: false },
    { name: 'Streetwear', href: '/streetwear', highlight: false },
    { name: 'Premium', href: '/premium', highlight: false },
    { name: 'VÝPREDAJ', href: '/vypredaj', highlight: true },
    { name: 'Novinky', href: '/novinky', highlight: false },
  ];
};

// Top bar links
const topBarLinks = [
  { name: 'Outlet', href: '/outlet', icon: Percent },
  { name: 'Kontakt & Pomoc', href: '/kontakt' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { activeGender, setActiveGender, isWomen, isMen } = useGender();
  const pathname = usePathname();
  const router = useRouter();

  const cartItems = useCartStore(state => state.items);
  const wishlistItems = useWishlistStore(state => state.items);
  const isCartOpen = useCartUIStore(state => state.isOpen);
  const openCart = useCartUIStore(state => state.open);
  const closeCart = useCartUIStore(state => state.close);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const bottomNav = getBottomNav(activeGender);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle search submit
  const handleSearch = useCallback((query: string) => {
    const normalizedQuery = query.trim();
    if (normalizedQuery) {
      window.location.href = `/vyhladavanie?q=${encodeURIComponent(normalizedQuery)}`;
    }
  }, []);

  const handleMobileSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSearch(searchQuery);
    },
    [handleSearch, searchQuery]
  );

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
        <div className="container-custom flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex gap-6">
              {topBarLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                >
                  {link.icon && <link.icon className="h-3.5 w-3.5" />}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
              <span className="text-base">🇸🇰</span> SK
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-100">
        <div className="container-custom">
          <div className="flex h-16 md:h-[72px] items-center justify-between gap-4">
            {/* Left: Mobile Menu + Notifications + Gender Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Otvoriť menu"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Mobile Notifications */}
              <Link 
                href="/notifikacie" 
                className="relative flex lg:hidden items-center justify-center p-2"
              >
                <Bell className="h-5 w-5 text-neutral-600" />
                <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 text-[9px] flex items-center justify-center bg-red-500">
                  3
                </Badge>
              </Link>

              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Vyhľadávanie"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Desktop Gender Toggle */}
              <div className="hidden lg:flex items-center">
                <Link
                  href="/zeny"
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-all duration-200 relative',
                    isWomen ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
                  )}
                >
                  Ženy
                  {isWomen && (
                    <motion.span
                      layoutId="genderIndicatorMain"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
                    />
                  )}
                </Link>
                <Link
                  href="/muzi"
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-all duration-200 relative',
                    isMen ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
                  )}
                >
                  Muži
                  {isMen && (
                    <motion.span
                      layoutId="genderIndicatorMain"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
                    />
                  )}
                </Link>
              </div>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
                YVETTIN<span className="text-neutral-400">®</span>
              </span>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search - Desktop */}
              <div className="hidden lg:flex items-center mr-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="search"
                    placeholder="Vyhľadať produkty, značky a ďalšie..."
                    className="w-[280px] xl:w-[340px] h-10 pl-10 pr-4 text-sm bg-neutral-100 border-none rounded-full focus:ring-2 focus:ring-neutral-200 focus:bg-white transition-all"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch(searchQuery)}
                  />
                </div>
              </div>

              {/* Desktop Notifications */}
              <Link href="/notifikacie" className="relative hidden lg:flex items-center justify-center p-2">
                <Bell className="h-5 w-5 text-neutral-600" />
                <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 text-[9px] flex items-center justify-center bg-red-500">
                  3
                </Badge>
              </Link>

              {/* Account */}
              <Link href="/account" className="hidden sm:flex items-center justify-center p-2">
                <User className="h-5 w-5 text-neutral-600" />
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="relative flex items-center justify-center p-2">
                <Heart className="h-5 w-5 text-neutral-600" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 text-[9px] flex items-center justify-center bg-neutral-900">
                    {wishlistCount}
                  </Badge>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative flex items-center justify-center p-2"
              >
                <ShoppingCart className="h-5 w-5 text-neutral-600" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 text-[9px] flex items-center justify-center bg-neutral-900">
                    {cartCount}
                  </Badge>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden border-t border-neutral-100"
              >
                <form onSubmit={handleMobileSearch} className="py-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type="search"
                      placeholder="Vyhľadať produkty..."
                      className="w-full h-11 pl-10 pr-10 text-sm bg-neutral-100 border-none rounded-full focus:ring-2 focus:ring-neutral-200"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-neutral-400" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="hidden lg:block border-t border-neutral-100">
          <div className="container-custom">
            <div className="flex items-center justify-between h-12">
              <nav className="flex items-center gap-1">
                {bottomNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'px-4 py-2 text-sm font-medium transition-colors relative',
                      item.highlight
                        ? 'text-red-600 hover:text-red-700'
                        : 'text-neutral-700 hover:text-neutral-900'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-full sm:w-80 p-0">
          <SheetHeader className="p-4 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-bold tracking-tight">YVETTIN®</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <nav className="p-4">
              {/* Gender Switcher - Mobile */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={isWomen ? 'default' : 'outline'}
                  className="flex-1 h-11"
                  onClick={() => {
                    setActiveGender('women');
                    setMobileMenuOpen(false);
                  }}
                >
                  Ženy
                </Button>
                <Button
                  variant={isMen ? 'default' : 'outline'}
                  className="flex-1 h-11"
                  onClick={() => {
                    setActiveGender('men');
                    setMobileMenuOpen(false);
                  }}
                >
                  Muži
                </Button>
              </div>

              <Separator className="my-4" />

              {/* Categories */}
              <div className="space-y-1">
                {bottomNav.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between py-3 px-2 text-base font-medium transition-colors rounded-lg',
                      item.highlight ? 'text-red-600' : 'text-neutral-900 hover:bg-neutral-50'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    <ChevronRight className="h-5 w-5 text-neutral-400" />
                  </Link>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-1">
                <Link
                  href="/account"
                  className="flex items-center gap-3 py-3 px-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  Môj účet
                </Link>
                <Link
                  href="/kontakt"
                  className="flex items-center gap-3 py-3 px-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kontakt & Pomoc
                </Link>
              </div>
            </nav>
          </ScrollArea>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            {/* Dark Mode Toggle - Mobile */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Tmavý režim</span>
              <ThemeToggle />
            </div>
            <Button className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900">
              Prihlásiť sa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
