'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Check, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    newsletter: false,
    terms: false,
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.terms) {
      toast({
        title: 'Chyba',
        description: 'Musíte súhlasiť s obchodnými podmienkami.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast({
      title: 'Účet vytvorený!',
      description: 'Vitajte v YVETTIN. Teraz sa môžete prihlásiť.',
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-neutral-100 py-4">
        <div className="container-custom">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            YVETTIN<span className="text-neutral-400">®</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex items-center justify-center py-12 px-4"
      >
        <div className="w-full max-w-md">
          {/* Benefits */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              'Rýchlejšie objednávanie',
              'Sledovanie objednávok',
              'Uložené adresy',
              'Exkluzívne zľavy',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm text-neutral-600">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                {benefit}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Vytvoriť účet</h1>
              <p className="text-neutral-500">
                Registrujte sa a získajte výhody zákazníka.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-900">Meno</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <Input
                      type="text"
                      placeholder="Ján"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-900">Priezvisko</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Novák"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="h-12"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-900">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <Input
                    type="email"
                    placeholder="vas@email.sk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-900">Heslo</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-neutral-500">Minimálne 8 znakov, 1 veľké písmeno a 1 číslo</p>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, newsletter: checked as boolean })
                    }
                  />
                  <label htmlFor="newsletter" className="text-sm text-neutral-600 leading-relaxed">
                    Chcem dostávať novinky a exkluzívne ponuky emailom
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, terms: checked as boolean })
                    }
                  />
                  <label htmlFor="terms" className="text-sm text-neutral-600 leading-relaxed">
                    Súhlasím s{' '}
                    <Link href="/obchodne-podmienky" className="underline hover:text-neutral-900">
                      obchodnými podmienkami
                    </Link>{' '}
                    a{' '}
                    <Link href="/gdpr" className="underline hover:text-neutral-900">
                      spracovaním osobných údajov
                    </Link>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 text-base rounded-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Vytváram účet...'
                ) : (
                  <>
                    Vytvoriť účet
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-neutral-500">alebo cez</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <button
                type="button"
                className="flex items-center justify-center gap-2 h-12 px-4 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 h-12 px-4 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.17 1.87-2.39 5.98.46 7.13-.57 1.5-1.31 2.99-2.54 4.09l.03-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="text-sm font-medium">Apple</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-neutral-600">
                Už máte účet?{' '}
                <Link href="/account/login" className="font-medium text-neutral-900 hover:underline">
                  Prihlásiť sa
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
