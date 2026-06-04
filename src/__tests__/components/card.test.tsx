import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>Inside card</p></Card>);
    expect(screen.getByText('Inside card')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container } = render(<Card size="sm">Small card</Card>);
    expect(container.firstChild).toHaveAttribute('data-size', 'sm');
  });
});

describe('Card subcomponents', () => {
  it('renders CardHeader', () => {
    render(<Card><CardHeader data-testid="header">Header</CardHeader></Card>);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders CardTitle', () => {
    render(<Card><CardTitle>My Title</CardTitle></Card>);
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('renders CardDescription', () => {
    render(<Card><CardDescription>Description text</CardDescription></Card>);
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('renders CardContent', () => {
    render(<Card><CardContent>Content here</CardContent></Card>);
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });

  it('renders CardFooter', () => {
    render(<Card><CardFooter>Footer</CardFooter></Card>);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
