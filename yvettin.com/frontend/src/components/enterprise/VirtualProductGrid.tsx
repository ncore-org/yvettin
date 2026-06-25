'use client';

import React, { useCallback } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { AutoSizer } from 'react-virtualized-auto-sizer';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';
import { useBreakpoint } from '@/lib/hooks/use-enterprise';

interface VirtualProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

// Cell renderer for virtual grid
const ProductCell = ({
  columnIndex,
  rowIndex,
  style,
  products,
  columnCount,
  onProductClick,
  onQuickView,
}: {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  products: Product[];
  columnCount: number;
  onProductClick?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}) => {
  const index = rowIndex * columnCount + columnIndex;
  const product = products[index];

  if (!product) return null;

  return (
    <div style={style} className="p-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <ProductCard
          product={product}
          onClick={() => onProductClick?.(product)}
          onQuickView={() => onQuickView?.(product)}
        />
      </motion.div>
    </div>
  );
};

// Regular grid for smaller collections
function RegularProductGrid({ products, onProductClick, onQuickView }: VirtualProductGridProps) {
  const { breakpoint } = useBreakpoint();

  const getGridCols = () => {
    switch (breakpoint) {
      case 'xs':
        return 'grid-cols-2';
      case 'sm':
        return 'grid-cols-2';
      case 'md':
        return 'grid-cols-3';
      case 'lg':
        return 'grid-cols-3';
      case 'xl':
        return 'grid-cols-4';
      case '2xl':
        return 'grid-cols-4';
      default:
        return 'grid-cols-2';
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-4 md:gap-6`}>
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <ProductCard
            product={product}
            onClick={() => onProductClick?.(product)}
            onQuickView={() => onQuickView?.(product)}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Virtual grid for large collections
function VirtualGrid({ products, onProductClick, onQuickView }: VirtualProductGridProps) {
  const { breakpoint } = useBreakpoint();

  const getColumnCount = useCallback(() => {
    switch (breakpoint) {
      case 'xs':
        return 2;
      case 'sm':
        return 2;
      case 'md':
        return 3;
      case 'lg':
        return 3;
      case 'xl':
        return 4;
      case '2xl':
        return 4;
      default:
        return 2;
    }
  }, [breakpoint]);

  const getRowHeight = useCallback(() => {
    switch (breakpoint) {
      case 'xs':
        return 400;
      case 'sm':
        return 420;
      case 'md':
        return 440;
      default:
        return 460;
    }
  }, [breakpoint]);

  const columnCount = getColumnCount();
  const rowCount = Math.ceil(products.length / columnCount);

  return (
    <div className="h-[800px] w-full">
      <AutoSizer
        renderProp={({ height, width }) => {
          if (!height || !width) {
            return null;
          }

          const columnWidth = width / columnCount;
          const rowHeight = getRowHeight();

          return (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
              itemData={products}
            >
              {({ columnIndex, rowIndex, style }) => (
                <ProductCell
                  columnIndex={columnIndex}
                  rowIndex={rowIndex}
                  style={style}
                  products={products}
                  columnCount={columnCount}
                  onProductClick={onProductClick}
                  onQuickView={onQuickView}
                />
              )}
            </Grid>
          );
        }}
      />
    </div>
  );
}

// Main Virtual Product Grid Component
export function VirtualProductGrid(props: VirtualProductGridProps) {
  const { products } = props;

  // Use virtual grid only for large collections (50+ products)
  if (products.length >= 50) {
    return <VirtualGrid {...props} />;
  }

  return <RegularProductGrid {...props} />;
}

// Loading skeleton
export function ProductGridSkeleton() {
  const { breakpoint } = useBreakpoint();

  const getGridCols = () => {
    switch (breakpoint) {
      case 'xs':
        return 'grid-cols-2';
      case 'sm':
        return 'grid-cols-2';
      case 'md':
        return 'grid-cols-3';
      case 'lg':
        return 'grid-cols-3';
      case 'xl':
        return 'grid-cols-4';
      case '2xl':
        return 'grid-cols-4';
      default:
        return 'grid-cols-2';
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-4 md:gap-6`}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-neutral-200 rounded-sm" />
          <div className="mt-4 space-y-2">
            <div className="h-3 bg-neutral-200 rounded w-1/3" />
            <div className="h-4 bg-neutral-200 rounded w-3/4" />
            <div className="h-4 bg-neutral-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default VirtualProductGrid;
