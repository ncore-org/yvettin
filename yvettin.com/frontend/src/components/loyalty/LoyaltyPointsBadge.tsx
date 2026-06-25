'use client';

import { useLoyaltyStore } from '@/lib/store/loyalty';
import { Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoyaltyPointsBadgeProps {
  price: number;
  className?: string;
  showValue?: boolean;
}

export default function LoyaltyPointsBadge({ 
  price, 
  className,
  showValue = true 
}: LoyaltyPointsBadgeProps) {
  const calculatePoints = useLoyaltyStore((state) => state.calculatePointsForPurchase);
  const points = calculatePoints(price);
  const pointsValue = (points * 0.01).toFixed(2);

  if (points <= 0) return null;

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
        "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800",
        "border border-amber-200",
        className
      )}
    >
      <Gift className="h-3 w-3" />
      <span>
        +{points} bodov
        {showValue && (
          <span className="text-amber-600"> ( hodnota {pointsValue} € )</span>
        )}
      </span>
    </div>
  );
}
