import React from 'react';
import clsx from 'clsx';
import Heart from '@/components/Heart';

export interface FooterProps {
  className?: string;
  [key: string]: any;
}

const Footer = ({ className = '', ...other }: FooterProps) => {
  const classNames = clsx('px-10 bg-pink-light py-6', className);

  return (
    <div className={classNames} {...other}>
      <div className="max-w-(--breakpoint-xl) container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Heart className="w-6 h-6 sm:w-3.25 sm:h-3 sm:order-2" color="pink" />
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

export default Footer;
