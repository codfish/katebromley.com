import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import Link from './Link';

export interface ButtonProps {
  href?: string | object | null;
  primary?: boolean;
  className?: string;
  [key: string]: any;
}

const Button = ({ href = null, primary = false, children, className: classNameProp = '', ...other }: PropsWithChildren<ButtonProps>) => {
  const className = clsx(
    `button px-4 pt-4 pb-3 border border-teal hover:border-teal-dark disabled:opacity-50`,
    {
      'bg-teal text-white hover:bg-teal-dark': primary,
      'bg-white text-teal hover:text-teal-dark': !primary,
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

export default Button;
