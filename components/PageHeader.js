import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './PageHeader.module.css';

const PageHeader = ({ children, className, ...other }) => {
  const classNames = clsx('relative bg-primary-light', styles.root, className);

  return (
    <header className={classNames} {...other}>
      <h1 className="h2 lg:h1 w-4/5 max-w-screen-lg mx-auto pt-9 lg:pt-10 pb-7 text-center bg-white border-t-8 border-solid border-primary-main absolute top-10 lg:top-24 left-1/2 transform -translate-x-1/2">
        {children}
      </h1>
    </header>
  );
};

PageHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

PageHeader.defaultProps = {
  className: '',
};

export default PageHeader;
