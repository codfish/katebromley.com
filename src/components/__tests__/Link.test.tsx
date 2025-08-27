import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Note: do not import Link at module scope; we import after mocking usePathname per test

// Mock next/link to a plain anchor for testing
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    const path = typeof href === 'string' ? href : href?.pathname || '';
    return (
      <a href={path} {...props}>
        {children}
      </a>
    );
  };
});

// Helper to mock usePathname
const mockUsePathname = (pathname: string) => {
  jest.doMock('next/navigation', () => ({
    usePathname: () => pathname,
  }));
};

describe('Link', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('applies active class when current path matches string href', async () => {
    mockUsePathname('/about');
    const { default: TestLink } = await import('@/components/Link');
    render(<TestLink href="/about">About</TestLink>);
    const anchor = screen.getByRole('link', { name: 'About' });
    expect(anchor).toHaveClass('active');
    expect(anchor).toHaveAttribute('href', '/about');
  });

  it('applies active class when current path matches object href.pathname', async () => {
    mockUsePathname('/books');
    const { default: TestLink } = await import('@/components/Link');
    render(<TestLink href={{ pathname: '/books' }}>Books</TestLink>);
    const anchor = screen.getByRole('link', { name: 'Books' });
    expect(anchor).toHaveClass('active');
    expect(anchor).toHaveAttribute('href', '/books');
  });

  it('does not apply active class when paths differ and preserves custom className', async () => {
    mockUsePathname('/contact');
    const { default: TestLink } = await import('@/components/Link');
    render(
      <TestLink href="/about" className="custom-class">
        About
      </TestLink>,
    );
    const anchor = screen.getByRole('link', { name: 'About' });
    expect(anchor).not.toHaveClass('active');
    expect(anchor).toHaveClass('custom-class');
    // Base classes should still be present
    expect(anchor.className).toMatch(/transition-colors/);
    expect(anchor.className).toMatch(/duration-300/);
  });
});


