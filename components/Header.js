import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useClickOutside from '../hooks/useClickOutside';
import Link from './Link';
import Logo from './Logo';
import NavIcon from './NavIcon';
import styles from './Header.module.css';

const Header = ({ className, ...other }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const classNames = clsx(
    styles.nav,
    'px-5 lg:pr-0 flex justify-between items-center lg:block relative border-gray-border border-b',
    className,
  );

  const hideMenu = () => {
    setMenuOpen(false);
  };

  // handle clicks outsive of the nav and make sure mobile dropdown menu closes
  const navRef = useRef(null);
  useClickOutside(navRef, hideMenu);

  return (
    <nav ref={navRef}>
      {/* top bar */}
      <div className={classNames} {...other}>
        <div className="lg:absolute lg:top-1/2 lg:left-1/2 transform lg:-translate-y-1/2 lg:-translate-x-1/2 items-center inline-flex">
          <Link href="/" className="inline-flex" onClick={hideMenu}>
            <Logo className={styles.logo} />
          </Link>
        </div>

        <div className="h-full hidden lg:flex lg:justify-between items-center">
          <div className="pr-5 border-gray-border border-r h-full flex items-center">
            <Link
              href="/books"
              className={`nav-link h-full px-5 hover:text-teal-dark ${styles.navLink}`}
            >
              Books
            </Link>
            <Link
              href="/about"
              className={`nav-link h-full px-5 hover:text-teal-dark ${styles.navLink}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`nav-link h-full px-5 hover:text-teal-dark ${styles.navLink}`}
            >
              Contact
            </Link>
          </div>

          <Link
            href="/books/ciao-for-now"
            className={`nav-link p-10 border-gray-border border-l h-full hover:text-teal-dark hover:bg-gray-background ${styles.latest}`}
          >
            Ciao For Now
          </Link>
        </div>

        <NavIcon className="lg:hidden" open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
      </div>

      {/* mobile nav dropdown menu */}
      <div
        className={clsx(
          styles.mobileNav,
          'w-full absolute lg:hidden bg-white z-10 py-4 border-b-8 border-pink flex flex-col justify-center',
          { hidden: !menuOpen },
        )}
      >
        <Link
          href="/books/ciao-for-now"
          onClick={hideMenu}
          className="mobile-nav-link text-center py-5 block w-full text-teal hover:text-teal-dark"
        >
          Ciao For Now
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
};

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;
