import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

export interface LinkProps {
  href: string | object;
  className?: string;
  [key: string]: any;
}

function Link({ href, children, className: classNameProp = '', ...other }: PropsWithChildren<LinkProps>) {
  const router = useRouter();
  const pathname = typeof href === 'string' ? href : (href as any).pathname;
  const className = clsx('transition-colors duration-300', classNameProp, {
    active: router.pathname === pathname,
  });

  return (
    <NextLink href={href} className={className} {...other}>
      {children}
    </NextLink>
  );
}

export default Link;
