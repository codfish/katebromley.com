import React from 'react';
import clsx from 'clsx';
import { BsList, BsX } from 'react-icons/bs';

export interface NavIconProps {
  open?: boolean;
  className?: string;
  [key: string]: any;
}

const NavIcon = ({ open = false, className: classNameProp = '', ...other }: NavIconProps) => {
  const className = clsx('text-gray-dark w-6 h-6', { 'text-pink': open }, classNameProp);
  const Icon = open ? BsX : BsList;

  return <Icon className={className} {...other} />;
};

export default NavIcon;
