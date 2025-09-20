import clsx from 'clsx';
import React from 'react';

import Heart from '@/components/Heart';

export interface FooterProps {
  className?: string;
  [key: string]: any;
}

const Footer = ({ className = '', ...other }: FooterProps) => {
  const classNames = clsx('bg-pink-light px-10 py-6', className);

  return (
    <div className={classNames} {...other}>
      <div className="container mx-auto flex max-w-(--breakpoint-xl) flex-col items-center justify-between sm:flex-row">
        <Heart className="size-6 sm:order-2 sm:h-3 sm:w-3.25" color="pink" />
        <span className="flex-1 pt-3 caption sm:order-1 sm:p-0">
          @ {new Date().getFullYear()} Kate Bromley. All rights reserved.
        </span>
        <span className="flex-1 pt-3 caption sm:order-3 sm:p-0 sm:text-right">
          Site Design by Mission Control Design
        </span>
      </div>
    </div>
  );
};

export default Footer;
