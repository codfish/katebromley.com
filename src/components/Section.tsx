import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

export interface SectionProps {
  /**
   * Background color. References theme palettes. The light variation will
   * always be used.
   */
  color?: 'pink' | 'teal' | 'yellow' | 'gray' | null;
  /**
   * Breakpoint width that the section **content area** will be maxed out at.
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Remove default padding on left and right so the content goes flush to
   * the screen in breakpoints below the `maxWidth`.
   */
  noBumpers?: boolean;
  /**
   * Remove default padding on left and right so the content goes flush to
   * the screen in breakpoints below the `maxWidth`.
   */
  noBorder?: boolean;
  backdrop?: {
    color: 'pink' | 'teal' | 'yellow' | 'gray';
    position: 'right' | 'left';
  } | null;
  className?: string | null;
  [key: string]: any;
}

const Section = ({
  color = null,
  maxWidth = 'lg',
  noBumpers = false,
  noBorder = false,
  backdrop = null,
  children,
  className = null,
  ...other
}: PropsWithChildren<SectionProps>) => {
  const classNames = clsx(
    'relative',
    {
      // left and right padding can be removed by passing the `noBumpers` prop
      'px-10': !noBumpers,

      // bottom gray border can be removed by passing the `noBorder` prop
      'border-b border-gray-border': !noBorder,

      // explicitly listing classes here rather than dynamically building a
      // single class so that PurgeCSS can find them when optimizing for prod
      // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
      'bg-pink-light': color === 'pink',
      'bg-teal-light': color === 'teal',
      'bg-yellow-light': color === 'yellow',
      'bg-gray-light': color === 'gray',
    },
    className,
  );
  const backdropClass = clsx('absolute top-0 -z-20 h-56 w-full md:h-full md:w-1/2', {
    // explicitly listing classes here rather than dynamically building a
    // single class so that PurgeCSS can find them when optimizing for prod
    // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
    'bg-pink-light': backdrop?.color === 'pink',
    'bg-teal-light': backdrop?.color === 'teal',
    'bg-yellow-light': backdrop?.color === 'yellow',
    'bg-gray-light': backdrop?.color === 'gray',

    // positioning of backdrop
    'left-0': backdrop?.position === 'left',
    'right-0': backdrop?.position === 'right',
  });
  const backdropCoverClass = clsx('absolute top-0 -z-10 hidden bg-white md:block md:h-full md:w-11/12', {
    // opposite the positioning of backdrop to cover it up
    'right-0': backdrop?.position === 'left',
    'left-0': backdrop?.position === 'right',
  });
  const innerClassName = clsx('relative container mx-auto py-10 md:py-16', {
    // explicitly list class names for tailwind
    // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
    'max-w-(--breakpoint-sm)': maxWidth === 'sm',
    'max-w-(--breakpoint-md)': maxWidth === 'md',
    'max-w-(--breakpoint-lg)': maxWidth === 'lg',
    'max-w-(--breakpoint-xl)': maxWidth === 'xl',
  });

  return (
    <section className={classNames} {...other}>
      {backdrop && <div className={backdropClass} />}

      <div className={innerClassName}>
        <>
          {backdrop && <div className={backdropCoverClass} />}
          {children}
        </>
      </div>
    </section>
  );
};

export default Section;
