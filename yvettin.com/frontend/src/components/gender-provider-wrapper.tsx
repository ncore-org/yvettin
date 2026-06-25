'use client';

import { useEffect } from 'react';
import { useGender } from '@/lib/gender-context';

interface GenderProviderWrapperProps {
  children: React.ReactNode;
  initialGender: 'women' | 'men';
}

export function GenderProviderWrapper({ children, initialGender }: GenderProviderWrapperProps) {
  const { setActiveGender } = useGender();

  useEffect(() => {
    setActiveGender(initialGender);
  }, [initialGender, setActiveGender]);

  return <>{children}</>;
}
