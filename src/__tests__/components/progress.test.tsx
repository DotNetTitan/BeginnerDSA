import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Progress } from '@/components/ui/progress';

describe('Progress', () => {
  it('renders with track and indicator', () => {
    const { container } = render(<Progress value={50} />);
    const track = container.querySelector('[data-slot="progress-track"]');
    const indicator = container.querySelector('[data-slot="progress-indicator"]');
    expect(track).toBeInTheDocument();
    expect(indicator).toBeInTheDocument();
  });

  it('renders with a value', () => {
    const { container } = render(<Progress value={50} />);
    const root = container.querySelector('[data-slot="progress"]');
    expect(root).toBeInTheDocument();
  });

  it('renders with null value (indeterminate)', () => {
    const { container } = render(<Progress value={null} />);
    const indicator = container.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toBeInTheDocument();
  });
});
