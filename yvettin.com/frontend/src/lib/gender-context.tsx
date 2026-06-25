'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Gender = 'women' | 'men' | null;

interface GenderContextType {
  activeGender: Gender;
  setActiveGender: (gender: Gender) => void;
  toggleGender: () => void;
  isWomen: boolean;
  isMen: boolean;
  isMixed: boolean;
}

const GenderContext = createContext<GenderContextType | undefined>(undefined);

export function GenderProvider({ children }: { children: ReactNode }) {
  const [activeGender, setActiveGender] = useState<Gender>(null);

  const toggleGender = useCallback(() => {
    setActiveGender(prev => {
      if (prev === null) return 'women';
      if (prev === 'women') return 'men';
      return null;
    });
  }, []);

  const isWomen = activeGender === 'women';
  const isMen = activeGender === 'men';
  const isMixed = activeGender === null;

  return (
    <GenderContext.Provider
      value={{
        activeGender,
        setActiveGender,
        toggleGender,
        isWomen,
        isMen,
        isMixed,
      }}
    >
      {children}
    </GenderContext.Provider>
  );
}

export function useGender() {
  const context = useContext(GenderContext);
  if (context === undefined) {
    throw new Error('useGender must be used within a GenderProvider');
  }
  return context;
}
