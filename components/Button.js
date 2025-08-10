import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from './Link';

const Button = ({ href, primary, children, className: classNameProp, ...other }) => {
  const className = clsx(
    `button px-4 pt-4 pb-3 border border-secondary-main hover:border-secondary-dark disabled:opacity-50`,
    {
      'bg-secondary-main text-white hover:bg-secondary-dark': primary,
      'bg-white text-secondary-main hover:text-secondary-dark': !primary,
    },
    classNameProp,
  );

  return href ? (
    <Link href={href} className={className} {...other}>
      {children}
    </Link>
  ) : (
    <button type="button" className={className} {...other}>
      {children}
    </button>
  );
};

Button.propTypes = {
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  primary: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  href: null,
  primary: false,
  className: '',
};

export default Button;
