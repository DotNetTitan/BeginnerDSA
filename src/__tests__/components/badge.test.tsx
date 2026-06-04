import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Badge, badgeVariants } from '@/components/ui/badge';

describe('Badge', () => {
  it('renders with text', () => {
    const { container } = render(<Badge>Easy</Badge>);
    expect(container.firstChild).toHaveTextContent('Easy');
  });

  it('applies variant classes', () => {
    const { container } = render(<Badge variant="destructive">Delete</Badge>);
    expect(container.firstChild).toHaveClass(/destructive/);
  });

  it('renders as a span by default', () => {
    const { container } = render(<Badge>Tag</Badge>);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('has badgeVariants export', () => {
    expect(badgeVariants).toBeDefined();
  });
});
