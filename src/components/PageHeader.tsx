import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

export interface PageHeaderProps {
  className?: string;
  [key: string]: any;
}

const PageHeader = ({ children, className = '', ...other }: PropsWithChildren<PageHeaderProps>) => {
  const classNames = clsx(
    'relative mb-8.5 h-30 bg-pink-light lg:mb-22 lg:h-45 lg:bg-pink-light lg:bg-[url("/page-header-background.jpg")] lg:bg-cover lg:bg-center lg:bg-no-repeat',
    className,
  );

  return (
    <header className={classNames} {...other}>
      <h1 className="absolute top-10 left-1/2 mx-auto w-4/5 max-w-(--breakpoint-lg) -translate-x-1/2 border-t-8 border-solid border-pink bg-white pt-9 pb-7 text-center font-macklin text-5xl lg:top-24 lg:pt-10 lg:text-7xl">
        {children}
      </h1>
    </header>
  );
};

export default PageHeader;
