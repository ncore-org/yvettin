'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { useBreakpoint } from '@/lib/hooks/use-enterprise';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: 'checkbox' | 'radio' | 'range';
  options: FilterOption[];
}

export interface FilterState {
  [key: string]: string[];
}

interface FilterPanelProps {
  filters: FilterGroup[];
  activeFilters: FilterState;
  onFilterChange: (groupId: string, values: string[]) => void;
  onClearFilters: () => void;
  productCount: number;
}

// Desktop Filter Panel
function DesktopFilterPanel({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  productCount,
}: FilterPanelProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(filters.map(f => f.id))
  );

  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }, []);

  const activeFilterCount = useMemo(() => {
    return Object.values(activeFilters).flat().length;
  }, [activeFilters]);

  return (
    <div className="w-64 flex-shrink-0">
      <div className="sticky top-24">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-neutral-900">Filtre</h3>
            <p className="text-xs text-neutral-500 mt-1">{productCount} produktov</p>
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-auto py-1 px-2 text-xs text-neutral-500 hover:text-neutral-900"
            >
              Zrušiť ({activeFilterCount})
            </Button>
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2 pr-4">
            {filters.map(group => (
              <div key={group.id} className="border-b border-neutral-100 pb-4">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="flex w-full items-center justify-between py-2 text-left"
                >
                  <span className="text-sm font-medium text-neutral-900">{group.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-400 transition-transform ${
                      expandedGroups.has(group.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedGroups.has(group.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 pt-2">
                        {group.options.map(option => {
                          const isChecked = activeFilters[group.id]?.includes(option.id) || false;
                          return (
                            <label
                              key={option.id}
                              className="flex items-center gap-3 cursor-pointer group"
                            >
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={checked => {
                                  const currentValues = activeFilters[group.id] || [];
                                  const newValues = checked
                                    ? [...currentValues, option.id]
                                    : currentValues.filter(v => v !== option.id);
                                  onFilterChange(group.id, newValues);
                                }}
                                className="h-4 w-4 rounded border-neutral-300 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                              />
                              <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                                {option.label}
                              </span>
                              {option.count !== undefined && (
                                <span className="text-xs text-neutral-400 ml-auto">
                                  {option.count}
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

// Mobile Filter Sheet
function MobileFilterSheet({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  productCount,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeFilterCount = useMemo(() => {
    return Object.values(activeFilters).flat().length;
  }, [activeFilters]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtre
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[85vh]">
        <SheetHeader className="border-b border-neutral-100 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg">Filtre</SheetTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-neutral-500 mt-1">{productCount} produktov</p>
        </SheetHeader>

        <ScrollArea className="h-[calc(85vh-180px)] py-4">
          <div className="space-y-6">
            {filters.map(group => (
              <div key={group.id}>
                <h4 className="text-sm font-medium text-neutral-900 mb-3">{group.label}</h4>
                <div className="space-y-3">
                  {group.options.map(option => {
                    const isChecked = activeFilters[group.id]?.includes(option.id) || false;
                    return (
                      <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={checked => {
                            const currentValues = activeFilters[group.id] || [];
                            const newValues = checked
                              ? [...currentValues, option.id]
                              : currentValues.filter(v => v !== option.id);
                            onFilterChange(group.id, newValues);
                          }}
                          className="h-5 w-5 rounded border-neutral-300 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                        />
                        <span className="text-sm text-neutral-600">{option.label}</span>
                        {option.count !== undefined && (
                          <span className="text-xs text-neutral-400 ml-auto">{option.count}</span>
                        )}
                      </label>
                    );
                  })}
                </div>
                <Separator className="mt-6" />
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-100 bg-white p-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                onClearFilters();
              }}
            >
              Zrušiť všetky
            </Button>
            <Button
              className="flex-1 bg-neutral-900 hover:bg-neutral-800"
              onClick={() => setIsOpen(false)}
            >
              Zobraziť {productCount} produktov
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Main Filter Panel Component
export function FilterPanel(props: FilterPanelProps) {
  const { isMobile } = useBreakpoint();

  if (isMobile) {
    return <MobileFilterSheet {...props} />;
  }

  return <DesktopFilterPanel {...props} />;
}

export default FilterPanel;
