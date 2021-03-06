import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Divider = ({ maxWidth, className, ...other }) => {
  const classNames = clsx(
    'mx-auto border-t border-solid border-gray-border',
    {
      // explicitly list class names for tailwind
      // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
      'max-w-screen-sm': maxWidth === 'sm',
      'max-w-screen-md': maxWidth === 'md',
      'max-w-screen-lg': maxWidth === 'lg',
      'max-w-screen-xl': maxWidth === 'xl',
      'max-w-screen-2xl': maxWidth === '2xl',
    },
    className,
  );

  return <div className={classNames} {...other} />;
};

Divider.propTypes = {
  /**
   * Breakpoint width that the section **content area** will be maxed out at.
   */
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
  className: PropTypes.string,
};

Divider.defaultProps = {
  maxWidth: 'lg',
  className: '',
};

export default Divider;
