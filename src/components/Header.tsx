"use client";
import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import useClickOutside from '@/hooks/useClickOutside';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import { BsList as HamburgerIcon, BsX as XIcon } from 'react-icons/bs';

export interface HeaderProps {
  className?: string;
  [key: string]: any;
}

export default function Header({ className = '', ...other }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const classNames = clsx(
    'h-20 lg:h-25',
    'pl-6 lg:pr-0 flex justify-between items-center lg:block relative border-gray-border border-b',
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
        <div className="lg:absolute lg:top-1/2 lg:left-1/2 transform lg:-translate-y-1/2 lg:-translate-x-1/2 items-center inline-flex">
          <Link href="/" className="inline-flex" onClick={hideMenu}>
            <Logo className="w-60.25 h-8 lg:w-81.75 lg:h-10.5" heartColor="yellow" />
          </Link>
        </div>

        <div className="h-full hidden lg:flex lg:justify-between items-center">
          <div className="pr-5 border-gray-border border-r h-full flex items-center">
            <Link
              href="/books"
              className="nav-link h-full px-5 hover:text-teal-dark leading-25! align-middle transition-all duration-300"
            >
              Books
            </Link>
            <Link
              href="/about"
              className="nav-link h-full px-5 hover:text-teal-dark leading-25! align-middle transition-all duration-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="nav-link h-full px-5 hover:text-teal-dark leading-25! align-middle transition-all duration-300"
            >
              Contact
            </Link>
          </div>

          <Link
            href="/books/in-my-tudor-era"
            className="nav-link p-10 border-gray-border border-l h-full hover:text-teal-dark hover:bg-gray-background transition-all duration-300"
          >
            In My Tudor Era
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden p-6"
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
          'h-[calc(100vh-5rem)] w-full absolute lg:hidden bg-white z-10 py-4 border-b-8 border-pink flex flex-col justify-center',
          { hidden: !menuOpen },
        )}
      >
        <Link
          href="/books/in-my-tudor-era"
          onClick={hideMenu}
          className="mobile-nav-link text-center py-5 block w-full text-teal hover:text-teal-dark"
        >
          In My Tudor Era
        </Link>

        <Link
          href="/books"
          onClick={hideMenu}
          className="mobile-nav-link text-center py-5 block w-full text-gray-dark hover:text-teal-dark"
        >
          Books
        </Link>

        <Link
          href="/about"
          onClick={hideMenu}
          className="mobile-nav-link text-center py-5 block w-full text-gray-dark hover:text-teal-dark"
        >
          About
        </Link>

        <Link
          href="/contact"
          onClick={hideMenu}
          className="mobile-nav-link text-center py-5 block w-full text-gray-dark hover:text-teal-dark"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
