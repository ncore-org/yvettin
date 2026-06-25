'use client';

import { motion } from 'framer-motion';
import { Bell, Package, Tag, Gift, Check, Trash2, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const notifications = [
  {
    id: 1,
    type: 'order',
    icon: Package,
    title: 'Objednávka bola odoslaná',
    message: 'Vaša objednávka #12345 bola odoslaná. Predpokladaný dátum doručenia: 15.02.2026',
    date: 'Pred 2 hodinami',
    read: false,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    type: 'promo',
    icon: Tag,
    title: 'Zľava 20% na jarú kolekciu',
    message: 'Použite kód JAR20 pri nákupe nad 50€. Platí do 28.02.2026.',
    date: 'Pred 5 hodinami',
    read: false,
    color: 'bg-red-500',
  },
  {
    id: 3,
    type: 'loyalty',
    icon: Gift,
    title: 'Získali ste 100 bodov',
    message: 'Za váš posledný nákup ste získali 100 vernostných bodov. Aktuálny stav: 1 350 bodov.',
    date: 'Včera',
    read: true,
    color: 'bg-amber-500',
  },
  {
    id: 4,
    type: 'order',
    icon: Package,
    title: 'Objednávka bola doručená',
    message: 'Vaša objednávka #12340 bola úspešne doručená. Ďakujeme za nákup!',
    date: 'Pred 2 dňami',
    read: true,
    color: 'bg-green-500',
  },
  {
    id: 5,
    type: 'promo',
    icon: Tag,
    title: 'Nová kolekcia je tu',
    message: 'Jar/Leto 2026 je dostupná. Pozrite si nové kúsky ako prvý.',
    date: 'Pred 3 dňami',
    read: true,
    color: 'bg-purple-500',
  },
];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);

  const markAsRead = (id: number) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotif = (id: number) => {
    setNotifs(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-neutral-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">Notifikácie</h1>
                  <p className="text-sm text-neutral-500">
                    {unreadCount > 0 ? `${unreadCount} neprečítaných` : 'Všetky prečítané'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <Check className="h-4 w-4" />
                Označiť všetky
              </button>
              <Link
                href="/account/nastavenia-notifikacii"
                className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="container-custom py-6">
        <div className="max-w-2xl">
          {notifs.length > 0 ? (
            <div className="space-y-3">
              {notifs.map((notif, index) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-xl p-4 border ${
                    notif.read ? 'border-neutral-100' : 'border-neutral-200 bg-neutral-50/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${notif.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <notif.icon className="h-5 w-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className={`font-medium ${notif.read ? 'text-neutral-700' : 'text-neutral-900'}`}>
                            {notif.title}
                          </h3>
                          <p className="text-sm text-neutral-600 mt-1">{notif.message}</p>
                          <p className="text-xs text-neutral-400 mt-2">{notif.date}</p>
                        </div>

                        <div className="flex items-center gap-1">
                          {!notif.read && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                              title="Označiť ako prečítané"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotif(notif.id)}
                            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Vymazať"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-neutral-400" />
              </div>
              <h2 className="text-lg font-medium text-neutral-900 mb-2">Žiadne notifikácie</h2>
              <p className="text-neutral-500">
                Momentálne nemáte žiadne notifikácie. <br />
                Budeme vás informovať o novinkách a akciách.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
