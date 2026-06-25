'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    setPreferences({ necessary: true, analytics: true, marketing: true });
    saveConsent({ necessary: true, analytics: true, marketing: true });
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    saveConsent({ necessary: true, analytics: false, marketing: false });
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setShowPreferences(false);
    setIsVisible(false);
  };

  const saveConsent = (consent: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-50"
            onClick={() => setShowPreferences(false)}
          />

          {/* Cookie Banner - Wide horizontal layout */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <div className="w-full max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
                {/* Main Content - Horizontal Layout */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-5 md:p-6">
                  {/* Left: Icon + Text */}
                  <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-semibold text-neutral-900 mb-1">
                        Cookies na Yvettin
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
                        Používame cookies na zlepšenie vášho zážitku a analýzu návštevnosti.
                        {showPreferences ? (
                          <button
                            onClick={() => setShowPreferences(false)}
                            className="text-neutral-900 underline hover:no-underline font-medium ml-1"
                          >
                            Späť
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowPreferences(true)}
                            className="text-neutral-900 underline hover:no-underline font-medium ml-1"
                          >
                            Nastavenia
                          </button>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  {!showPreferences && (
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 w-full md:w-auto">
                      <Button
                        onClick={handleAcceptAll}
                        className="flex-1 md:flex-none h-10 md:h-11 px-5 md:px-6 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-full shadow-lg transition-all whitespace-nowrap"
                      >
                        <Check className="w-4 h-4 mr-1.5 md:mr-2" />
                        Prijať všetky
                      </Button>
                      <Button
                        onClick={handleAcceptNecessary}
                        variant="outline"
                        className="flex-1 md:flex-none h-10 md:h-11 px-5 border-neutral-300 hover:bg-neutral-50 text-sm font-medium rounded-full whitespace-nowrap"
                      >
                        Nevyhnutné
                      </Button>
                    </div>
                  )}
                </div>

                {/* Preferences Panel */}
                {showPreferences && (
                  <div className="border-t border-neutral-100 p-5 md:p-6 bg-neutral-50">
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {/* Necessary */}
                      <div className="p-3 md:p-4 rounded-xl border bg-green-50 border-green-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-neutral-900">Nevyhnutné</span>
                          <span className="text-xs text-green-700 font-medium">Vždy povolené</span>
                        </div>
                        <p className="text-xs text-neutral-600">
                          Potrebné pre základnú funkčnosť stránky.
                        </p>
                      </div>

                      {/* Analytics */}
                      <div
                        className={cn(
                          "p-3 md:p-4 rounded-xl border transition-all cursor-pointer",
                          preferences.analytics
                            ? "bg-blue-50 border-blue-200"
                            : "bg-white border-neutral-200 hover:border-neutral-300"
                        )}
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-neutral-900">Analytické</span>
                          <div className={cn(
                            "w-11 h-6 rounded-full transition-colors",
                            preferences.analytics ? "bg-blue-600" : "bg-neutral-300"
                          )}>
                            <div className={cn(
                              "w-5 h-5 bg-white rounded-full shadow-md transform transition-transform mt-0.5",
                              preferences.analytics ? "translate-x-5.5" : "translate-x-0.5"
                            )} />
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 mt-1">
                          Pomáhajú nám zlepšovať služby.
                        </p>
                      </div>

                      {/* Marketing */}
                      <div
                        className={cn(
                          "p-3 md:p-4 rounded-xl border transition-all cursor-pointer",
                          preferences.marketing
                            ? "bg-purple-50 border-purple-200"
                            : "bg-white border-neutral-200 hover:border-neutral-300"
                        )}
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-neutral-900">Marketingové</span>
                          <div className={cn(
                            "w-11 h-6 rounded-full transition-colors",
                            preferences.marketing ? "bg-purple-600" : "bg-neutral-300"
                          )}>
                            <div className={cn(
                              "w-5 h-5 bg-white rounded-full shadow-md transform transition-transform mt-0.5",
                              preferences.marketing ? "translate-x-5.5" : "translate-x-0.5"
                            )} />
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 mt-1">
                          Personalizovaná reklama.
                        </p>
                      </div>

                      {/* Save Button */}
                      <div className="pt-2">
                        <Button
                          onClick={handleSavePreferences}
                          className="w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-full shadow-lg"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Uložiť nastavenia
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
