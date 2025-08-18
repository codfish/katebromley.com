import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';

// Mock child components used by Header to keep tests focused
jest.mock('../Logo', () => ({ className }: any) => <div data-testid="logo" className={className} />);
jest.mock('../Link', () => ({ children, href, onClick, className }: any) => (
  <a
    href={typeof href === 'string' ? href : href?.pathname || ''}
    onClick={(e) => { e.preventDefault(); onClick?.(e); }}
    className={className}
  >
    {children}
  </a>
));

// Mock scroll lock hook to avoid touching real DOM styles
jest.mock('../../hooks/useBodyScrollLock', () => ({ __esModule: true, default: () => {} }));

// Mock click outside hook to avoid attaching document listeners
jest.mock('../../hooks/useClickOutside', () => ({ __esModule: true, default: () => {} }));

describe('Header', () => {
  it('renders desktop navigation links', () => {
    render(<Header />);

    expect(screen.getAllByRole('link', { name: /books|about|contact/i }).length).toBeGreaterThanOrEqual(3);
  });

  it('toggles mobile menu open/closed and updates aria attributes', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const button = screen.getByRole('button', { name: /open menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    // Mobile nav becomes visible (no hidden class; note lg:hidden is always present)
    const mobileNav = screen.getByTestId('mobile-nav');
    expect(mobileNav.className).not.toMatch(/(^|\s)hidden(\s|$)/);

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile menu when a link is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const button = screen.getByRole('button', { name: /open menu/i });
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    const firstMobileLink = screen.getAllByRole('link').find(a => a.className.includes('mobile-nav-link'))!;
    await user.click(firstMobileLink);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});


