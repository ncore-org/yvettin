'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  User, Package, Heart, MapPin, CreditCard, Settings, 
  LogOut, Gift, ChevronRight, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { name: 'Moje objednávky', href: '/account/orders', icon: Package },
  { name: 'Zoznam prianí', href: '/wishlist', icon: Heart },
  { name: 'Adresy', href: '/account/addresses', icon: MapPin },
  { name: 'Platobné karty', href: '/account/payment', icon: CreditCard },
  { name: 'Nastavenia', href: '/account/settings', icon: Settings },
];

export default function AccountDashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const demoUser = localStorage.getItem('yvettin-demo-user');
    if (demoUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(demoUser));
    } else {
      // Not logged in, redirect to login
      router.push('/account/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('yvettin-demo-user');
    router.push('/account/login');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-100 py-4">
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            YVETTIN<span className="text-neutral-400">®</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            <LogOut className="h-4 w-4" />
            Odhlásiť sa
          </button>
        </div>
      </header>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-neutral-600" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">{user.name || 'Používateľ'}</h1>
                  <p className="text-sm text-neutral-500">{user.email}</p>
                  <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full mt-1">
                    <Sparkles className="h-3 w-3" />
                    Demo
                  </span>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-neutral-400" />
                    <span className="flex-1">{item.name}</span>
                    <ChevronRight className="h-4 w-4 text-neutral-300" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Loyalty Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 text-white"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-5 w-5 text-amber-400" />
                    <span className="text-sm font-medium text-neutral-300">Vernostný program</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-1">1 250 bodov</h2>
                  <p className="text-neutral-400">Hodnota: 12.50 €</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-xs text-neutral-400 mb-1">Vaša karta</p>
                  <p className="font-mono text-sm">YV 1234 5678</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">Bronzová úroveň</span>
                  <span className="text-neutral-400">Do ďalšej úrovne: 750 bodov</span>
                </div>
                <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-amber-400 rounded-full"></div>
                </div>
              </div>
            </motion.div>

            {/* Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Posledné objednávky</h2>
                <Link href="/account/orders" className="text-sm text-neutral-600 hover:underline">
                  Zobraziť všetky
                </Link>
              </div>
              
              <div className="text-center py-8 text-neutral-500">
                <Package className="h-12 w-12 mx-auto mb-3 text-neutral-300" />
                <p>Zatiaľ nemáte žiadne objednávky.</p>
                <Link href="/" className="text-neutral-900 hover:underline mt-2 inline-block">
                  Začať nakupovať
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
