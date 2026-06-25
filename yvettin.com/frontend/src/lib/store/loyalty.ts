import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LoyaltyPoints {
  total: number;
  available: number;
  pending: number;
  value: number; // Value in EUR (1 point = 0.01 EUR)
  cardNumber: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  nextTierPoints: number;
}

interface LoyaltyStore {
  points: LoyaltyPoints;
  addPoints: (amount: number) => void;
  redeemPoints: (amount: number) => void;
  getPointsValue: (points: number) => number;
  calculatePointsForPurchase: (amount: number) => number;
}

const POINTS_VALUE = 0.01; // 1 point = 0.01 EUR
const POINTS_RATE = 0.1; // 10% of purchase amount in points

const getTier = (total: number): { tier: LoyaltyPoints['tier']; next: number } => {
  if (total >= 5000) return { tier: 'platinum', next: 10000 };
  if (total >= 2000) return { tier: 'gold', next: 5000 };
  if (total >= 500) return { tier: 'silver', next: 2000 };
  return { tier: 'bronze', next: 500 };
};

export const useLoyaltyStore = create<LoyaltyStore>()(
  persist(
    (set, get) => ({
      points: {
        total: 0,
        available: 0,
        pending: 0,
        value: 0,
        cardNumber: 'YV00000000',
        tier: 'bronze',
        nextTierPoints: 500,
      },

      addPoints: (amount: number) => {
        set((state) => {
          const newTotal = state.points.total + amount;
          const { tier, next } = getTier(newTotal);
          return {
            points: {
              ...state.points,
              total: newTotal,
              available: state.points.available + amount,
              value: (state.points.available + amount) * POINTS_VALUE,
              tier,
              nextTierPoints: next,
            },
          };
        });
      },

      redeemPoints: (amount: number) => {
        set((state) => ({
          points: {
            ...state.points,
            available: Math.max(0, state.points.available - amount),
            value: Math.max(0, state.points.available - amount) * POINTS_VALUE,
          },
        }));
      },

      getPointsValue: (points: number) => {
        return points * POINTS_VALUE;
      },

      calculatePointsForPurchase: (amount: number) => {
        return Math.floor(amount * POINTS_RATE);
      },
    }),
    {
      name: 'yvettin-loyalty',
    }
  )
);
