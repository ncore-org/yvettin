import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrustBanner from '@/components/sections/TrustBanner';

describe('TrustBanner', () => {
  it('renders all trust items', () => {
    render(<TrustBanner />);

    expect(screen.getByText('Doprava zdarma')).toBeInTheDocument();
    expect(screen.getByText('30-dňové vrátenie')).toBeInTheDocument();
    expect(screen.getByText('Bezpečná platba')).toBeInTheDocument();
    expect(screen.getByText('Rýchle doručenie')).toBeInTheDocument();
  });

  it('renders with correct descriptions', () => {
    render(<TrustBanner />);

    expect(screen.getByText('Pri nákupe nad 50€')).toBeInTheDocument();
    expect(screen.getByText('Bez otázok')).toBeInTheDocument();
  });

  it('has correct section element', () => {
    const { container } = render(<TrustBanner />);
    expect(container.querySelector('section')).toHaveClass('bg-neutral-900');
  });
});
