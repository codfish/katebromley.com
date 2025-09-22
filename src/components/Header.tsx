'use client';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { BsList as HamburgerIcon, BsX as XIcon } from 'react-icons/bs';

import Link from '@/components/Link';
import Logo from '@/components/Logo';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import useClickOutside from '@/hooks/useClickOutside';

export interface HeaderProps {
  className?: string;
  [key: string]: any;
}

export default function Header({ className = '', ...other }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const classNames = clsx(
    'h-20 lg:h-25',
    'relative flex items-center justify-between border-b border-gray-border pl-6 lg:block lg:pr-0',
    className,
  );

  const hideMenu = () => {
    setMenuOpen(false);
  };

  // handle clicks outsive of the nav and make sure mobile dropdown menu closes
  const navRef = useRef<HTMLElement>(null);
  useClickOutside(navRef, hideMenu);

  // lock body scroll when mobile menu is open
  useBodyScrollLock(menuOpen);

  return (
    <nav ref={navRef}>
      {/* top bar */}
      <div className={classNames} {...other}>
        <div className="inline-flex items-center lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <Link href="/" className="inline-flex" onClick={hideMenu}>
            <Logo className="h-8 w-60.25 lg:h-10.5 lg:w-81.75" heartColor="yellow" />
          </Link>
        </div>

        <div className="hidden h-full items-center lg:flex lg:justify-between">
          <div className="flex h-full items-center border-r border-gray-border pr-5">
            <Link
              href="/books"
              className="h-full px-5 align-middle nav-link leading-25! transition-all duration-300 hover:text-teal-dark"
            >
              Books
            </Link>
            <Link
              href="/about"
              className="h-full px-5 align-middle nav-link leading-25! transition-all duration-300 hover:text-teal-dark"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="h-full px-5 align-middle nav-link leading-25! transition-all duration-300 hover:text-teal-dark"
            >
              Contact
            </Link>
          </div>

          <Link
            href="/books/in-my-tudor-era"
            className="h-full border-l border-gray-border p-10 nav-link transition-all duration-300 hover:bg-gray-background hover:text-teal-dark"
          >
            In My Tudor Era
          </Link>
        </div>

        <button
          type="button"
          className="p-6 lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XIcon className="size-6.5 text-pink desktop-only:mr-3" />
          ) : (
            <HamburgerIcon className="size-6 text-gray-dark" />
          )}
        </button>
      </div>

      {/* mobile nav dropdown menu */}
      <div
        id="mobile-nav"
        data-testid="mobile-nav"
        className={clsx(
          'absolute z-10 flex h-[calc(100vh-5rem)] w-full flex-col justify-center border-b-8 border-pink bg-white py-4 lg:hidden',
          { hidden: !menuOpen },
        )}
      >
        <Link
          href="/books/in-my-tudor-era"
          onClick={hideMenu}
          className="block w-full py-5 text-center mobile-nav-link text-teal hover:text-teal-dark"
        >
          In My Tudor Era
        </Link>

        <Link
          href="/books"
          onClick={hideMenu}
          className="block w-full py-5 text-center mobile-nav-link text-gray-dark hover:text-teal-dark"
        >
          Books
        </Link>

        <Link
          href="/about"
          onClick={hideMenu}
          className="block w-full py-5 text-center mobile-nav-link text-gray-dark hover:text-teal-dark"
        >
          About
        </Link>

        <Link
          href="/contact"
          onClick={hideMenu}
          className="block w-full py-5 text-center mobile-nav-link text-gray-dark hover:text-teal-dark"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
