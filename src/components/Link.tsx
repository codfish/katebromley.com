'use client';
import clsx from 'clsx';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

export interface LinkProps {
  href: string | object;
  className?: string;
  [key: string]: any;
}

export default function Link({
  href,
  children,
  className: classNameProp = '',
  ...other
}: PropsWithChildren<LinkProps>) {
  const currentPathname = usePathname?.() as string | null;
  const targetPathname = typeof href === 'string' ? href : (href as any)?.pathname;
  const className = clsx('transition-colors duration-300', classNameProp, {
    active: currentPathname && targetPathname ? currentPathname === targetPathname : false,
  });

  return (
    <NextLink href={href} className={className} {...other}>
      {children}
    </NextLink>
  );
}
