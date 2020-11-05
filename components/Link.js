import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

function Link({ href, children, className: classNameProp, ...other }) {
  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProp, {
    active: router.pathname === pathname,
  });

  return (
    <NextLink href={href}>
      <a className={className} {...other}>
        {children}
      </a>
    </NextLink>
  );
}

Link.propTypes = {
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Link.defaultProps = {
  className: '',
};

export default Link;
