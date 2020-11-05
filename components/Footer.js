import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Heart from './Heart';
import styles from './Footer.module.css';

const Footer = ({ className, ...other }) => {
  const classNames = clsx('px-10 bg-primary-light py-6', className);

  return (
    <div className={classNames} {...other}>
      <div className="max-w-screen-xl container flex flex-col sm:flex-row justify-between items-center">
        <Heart className={`${styles.heart} sm:order-2`} color="primary" />
        <span className="caption sm:order-1 pt-3 sm:p-0 flex-1">
          @ {new Date().getFullYear()} Kate Bromley. All rights reserved.
        </span>
        <span className="caption sm:order-3 pt-3 sm:p-0 flex-1 sm:text-right">
          Site Design by Mission Control Design
        </span>
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};

export default Footer;
