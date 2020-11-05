import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Heart = ({ color, width, height, className: classNameProp, ...other }) => {
  const className = clsx('root', classNameProp);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 60"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      {...other}
    >
      <title>Heart Icon</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          className={clsx('fill-current', {
            // explicitly listing classes here rather than dynamically building a
            // single class so that PurgeCSS can find them when optimizing for prod
            // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
            'text-primary-main': color === 'primary',
            'text-secondary-main': color === 'secondary',
            'text-tertiary-main': color === 'tertiary',
          })}
          transform="translate(-1096.000000, -654.000000)"
          fill="#FFC82E"
          fillRule="nonzero"
        >
          <path d="M1142.95268,699.759529 C1131.47413,712.630087 1130.30307,714 1127.48591,714 C1124.39256,714 1122.21617,711.911987 1108.56122,696.555699 C1101.86632,688.877555 1096,680.558645 1096,670.483152 C1096,660.164611 1102.36347,654.165715 1113.33382,654.165715 C1118.85767,654.165715 1123.46456,656.165347 1125.3979,659.68956 C1125.81124,660.282329 1126.14896,660.924376 1126.40324,661.60081 C1126.91143,662.882342 1127.24287,663.523108 1128.2482,663.523108 C1129.25354,663.523108 1129.67336,662.882342 1130.1705,661.60081 C1130.36014,660.952089 1130.64297,660.334339 1131.01013,659.766894 C1133.21966,655.922298 1137.13055,654 1142.74277,654 C1154.46437,654 1159.14877,662.009575 1159.14877,669.91972 C1159.19278,680.238262 1151.15006,690.402136 1142.95268,699.759529 Z" />
        </g>
      </g>
    </svg>
  );
};

Heart.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

Heart.defaultProps = {
  color: 'tertiary',
  width: '64px',
  height: '60px',
  className: '',
};

export default Heart;
