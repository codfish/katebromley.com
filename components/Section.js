import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Section = ({
  color,
  maxWidth,
  noBumpers,
  noBorder,
  backdrop,
  children,
  className,
  ...other
}) => {
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
      'bg-primary-light': color === 'primary',
      'bg-secondary-light': color === 'secondary',
      'bg-tertiary-light': color === 'tertiary',
      'bg-gray-light': color === 'gray',
    },
    className,
  );
  const backdropClass = clsx('absolute top-0 -z-20 w-full h-56 md:w-1/2 md:h-full', {
    // explicitly listing classes here rather than dynamically building a
    // single class so that PurgeCSS can find them when optimizing for prod
    // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
    'bg-primary-light': backdrop?.color === 'primary',
    'bg-secondary-light': backdrop?.color === 'secondary',
    'bg-tertiary-light': backdrop?.color === 'tertiary',
    'bg-gray-light': backdrop?.color === 'gray',

    // positioning of backdrop
    'left-0': backdrop?.position === 'left',
    'right-0': backdrop?.position === 'right',
  });
  const backdropCoverClass = clsx(
    'absolute top-0 bg-white -z-10 hidden md:block md:w-11/12 md:h-full',
    {
      // opposite the positioning of backdrop to cover it up
      'right-0': backdrop?.position === 'left',
      'left-0': backdrop?.position === 'right',
    },
  );
  const innerClassName = clsx('relative py-10 md:py-16 container mx-auto', {
    // explicitly list class names for tailwind
    // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
    'max-w-screen-sm': maxWidth === 'sm',
    'max-w-screen-md': maxWidth === 'md',
    'max-w-screen-lg': maxWidth === 'lg',
    'max-w-screen-xl': maxWidth === 'xl',
    'max-w-screen-2xl': maxWidth === '2xl',
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

Section.propTypes = {
  /**
   * Background color. References theme palettes. The light variation will
   * always be used.
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'gray']),
  /**
   * Breakpoint width that the section **content area** will be maxed out at.
   */
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
  /**
   * Remove default padding on left and right so the content goes flush to
   * the screen in breakpoints below the `maxWidth`.
   */
  noBumpers: PropTypes.bool,
  /**
   * Remove default padding on left and right so the content goes flush to
   * the screen in breakpoints below the `maxWidth`.
   */
  noBorder: PropTypes.bool,
  backdrop: PropTypes.shape({
    color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'gray']).isRequired,
    position: PropTypes.oneOf(['right', 'left']).isRequired,
  }),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Section.defaultProps = {
  color: null,
  maxWidth: 'lg',
  noBumpers: false,
  noBorder: false,
  backdrop: null,
  className: null,
};

export default Section;
