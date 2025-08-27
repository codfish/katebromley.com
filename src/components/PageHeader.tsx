import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface PageHeaderProps {
  className?: string;
  [key: string]: any;
}

const PageHeader = ({ children, className = '', ...other }: PropsWithChildren<PageHeaderProps>) => {
  const classNames = clsx('relative bg-pink-light h-30 mb-8.5 lg:h-45 lg:mb-22 lg:bg-pink-light lg:bg-[url("/page-header-background.jpg")] lg:bg-no-repeat lg:bg-center lg:bg-cover', className);

  return (
    <header className={classNames} {...other}>
      <h1 className="text-5xl lg:text-7xl font-macklin w-4/5 max-w-(--breakpoint-lg) mx-auto pt-9 lg:pt-10 pb-7 text-center bg-white border-t-8 border-solid border-pink absolute top-10 lg:top-24 left-1/2 transform -translate-x-1/2">
        {children}
      </h1>
    </header>
  );
};

export default PageHeader;
