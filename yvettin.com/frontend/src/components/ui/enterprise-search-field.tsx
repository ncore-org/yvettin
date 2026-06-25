'use client';

import { Button as AriaButton, Input, SearchField } from 'react-aria-components';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnterpriseSearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function EnterpriseSearchField({
  value,
  onChange,
  onSubmit,
  placeholder = 'Hladat produkty...',
  className,
}: EnterpriseSearchFieldProps) {
  return (
    <SearchField
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      className={cn('relative w-full', className)}
      aria-label="Vyhladavanie produktov"
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <Input
        className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 pl-10 pr-10 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white"
        placeholder={placeholder}
      />
      {value ? (
        <AriaButton
          slot="clear"
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-sm text-neutral-400 transition-colors hover:text-neutral-700"
          aria-label="Vymazat vyhladavanie"
        >
          <X className="h-3.5 w-3.5" />
        </AriaButton>
      ) : null}
    </SearchField>
  );
}

export default EnterpriseSearchField;
