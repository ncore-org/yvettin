'use client';

import { useEffect } from 'react';
import { useGender } from '@/lib/gender-context';

interface ResetGenderProps {
  children: React.ReactNode;
}

export function ResetGender({ children }: ResetGenderProps) {
  const { setActiveGender } = useGender();

  useEffect(() => {
    setActiveGender(null);
  }, [setActiveGender]);

  return <>{children}</>;
}
