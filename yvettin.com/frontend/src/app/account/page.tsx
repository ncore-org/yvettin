'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AccountDashboardPage from './dashboard/page';

export default function AccountPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoUser = localStorage.getItem('yvettin-demo-user');
    if (demoUser) {
      setIsLoggedIn(true);
    } else {
      router.push('/account/login');
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
      </div>
    );
  }

  if (isLoggedIn) {
    return <AccountDashboardPage />;
  }

  return null;
}
