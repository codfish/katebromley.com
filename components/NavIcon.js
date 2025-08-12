import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { BsList, BsX } from 'react-icons/bs';

const NavIcon = ({ open, className: classNameProp, ...other }) => {
  const className = clsx('text-gray-dark w-6 h-6', { 'text-pink': open }, classNameProp);
  const Icon = open ? BsX : BsList;

  return <Icon className={className} {...other} />;
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
