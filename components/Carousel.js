import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Slider from 'react-slick';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

/**
 * Small hack to avoid console warnings.
 *
 * @see {@link https://github.com/akiran/react-slick/issues/1195#issuecomment-390383615}
 */
// eslint-disable-next-line
const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
  <button type="button" {...props}>
    {children}
  </button>
);

/**
 * Wrapper around react-slick.
 */
function Carousel({ children, className, ...other }) {
  const classNames = clsx(className);

  return (
    <Slider
      dots
      infinite
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      prevArrow={
        <SlickButtonFix>
          <BsChevronLeft />
        </SlickButtonFix>
      }
      nextArrow={
        <SlickButtonFix>
          <BsChevronRight />
        </SlickButtonFix>
      }
      className={classNames}
      {...other}
    >
      {children}
    </Slider>
  );
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Carousel.defaultProps = {
  className: '',
};

export default Carousel;
