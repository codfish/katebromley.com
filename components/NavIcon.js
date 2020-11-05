import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const NavIcon = ({ open, className: classNameProp, ...other }) => {
  const className = clsx('text-gray-dark w-6 h-6', classNameProp);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
      {...other}
    >
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  );
};

NavIcon.propTypes = {
  open: PropTypes.bool,
  className: PropTypes.string,
};

NavIcon.defaultProps = {
  className: '',
  open: false,
};

export default NavIcon;
