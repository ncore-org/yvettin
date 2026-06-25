'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExitIntentPopupProps {
  discountPercent?: number;
}

export default function ExitIntentPopup({ discountPercent = 5 }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [isReadyToShow, setIsReadyToShow] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup (with 7 day cooldown)
    const popupData = localStorage.getItem('exit-popup-data');
    if (popupData) {
      const { shownAt, dismissed } = JSON.parse(popupData);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      
      // If popup was shown within last 7 days, don't show again
      if (now - shownAt < sevenDays) {
        setHasSeenPopup(true);
        return;
      }
    }

    // Wait 30 seconds before allowing popup to show (user must engage with site first)
    const readyTimer = setTimeout(() => {
      setIsReadyToShow(true);
    }, 30000);

    let hasTriggered = false;

    const showPopup = () => {
      if (!hasTriggered && isReadyToShow && !hasSeenPopup) {
        hasTriggered = true;
        setIsVisible(true);
        localStorage.setItem('exit-popup-data', JSON.stringify({
          shownAt: Date.now(),
          dismissed: false
        }));
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves viewport from top (going to address bar or close button)
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    // Handle visibility change (user switching tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isReadyToShow && !hasSeenPopup) {
        showPopup();
      }
    };

    // Handle beforeunload (user closing tab/window)
    const handleBeforeUnload = () => {
      if (isReadyToShow && !hasSeenPopup) {
        // Note: We can't actually show the popup here due to browser restrictions,
        // but we can track that user is leaving
        localStorage.setItem('exit-popup-data', JSON.stringify({
          shownAt: Date.now(),
          dismissed: true
        }));
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(readyTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasSeenPopup, isReadyToShow]);

  const handleClose = () => {
    setIsVisible(false);
    // Save that user dismissed the popup
    const popupData = localStorage.getItem('exit-popup-data');
    if (popupData) {
      const data = JSON.parse(popupData);
      data.dismissed = true;
      localStorage.setItem('exit-popup-data', JSON.stringify(data));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Send to backend
      console.log('Email captured:', email);
      setIsSubmitted(true);

      // Auto-close after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-neutral-600" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left Side - Image */}
                <div className="relative w-full md:w-2/5 h-48 md:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
                    alt="Fashion shopping"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:bg-gradient-to-r md:from-transparent md:to-black/10" />
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 p-6 md:p-8">
                  {!isSubmitted ? (
                    <>
                      {/* Icon + Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                          <Gift className="w-5 h-5 text-neutral-700" />
                        </div>
                        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                          Exkluzívna ponuka
                        </span>
                      </div>

                      {/* Headline */}
                      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                        Získajte <span className="text-red-600">{discountPercent}% zľavu</span>
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                        Prihláste sa na odber noviniek a získajte okamžitú zľavu na prvý nákup. 
                        Žiadny spam, len tie najlepšie ponuky.
                      </p>

                      {/* Email Form */}
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Váš email"
                            required
                            className="w-full h-12 pl-10 pr-4 bg-neutral-50 border border-neutral-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-full shadow-lg transition-all"
                        >
                          Chcem zľavu
                        </Button>
                      </form>

                      {/* Privacy Note */}
                      <p className="text-xs text-neutral-400 mt-4 text-center">
                        Odhlásiť sa môžete kedykoľvek. Prečítajte si naše{" "}
                        <a href="/gdpr" className="underline hover:no-underline">
                          zásady ochrany osobných údajov
                        </a>
                        .
                      </p>
                    </>
                  ) : (
                    /* Success State */
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                        <Gift className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                        Ďakujeme za prihlásenie!
                      </h3>
                      <p className="text-sm text-neutral-600">
                        Zľavový kód vám bol odoslaný na email.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
