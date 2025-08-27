import React from 'react';
import clsx from 'clsx';

export interface DividerProps {
  /**
   * Breakpoint width that the section **content area** will be maxed out at.
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  [key: string]: any;
}

const Divider = ({ maxWidth = 'lg', className = '', ...other }: DividerProps) => {
  const classNames = clsx(
    'mx-auto border-t border-solid border-gray-border',
    {
      // explicitly list class names for tailwind
      // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
      'max-w-(--breakpoint-sm)': maxWidth === 'sm',
      'max-w-(--breakpoint-md)': maxWidth === 'md',
      'max-w-(--breakpoint-lg)': maxWidth === 'lg',
      'max-w-(--breakpoint-xl)': maxWidth === 'xl',
    },
    className,
  );

  return <div className={classNames} {...other} />;
};

export default Divider;
