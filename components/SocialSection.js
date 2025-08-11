import React from 'react';
import PropTypes from 'prop-types';
import { FaInstagram, FaTwitterSquare, FaAmazon, FaGoodreads } from 'react-icons/fa';
import Section from './Section';
import Link from './Link';

const SocialSection = ({ className, ...other }) => (
  <Section noBorder className={className} {...other}>
    <div className="flex flex-col justify-center items-center">
      <h4 className="h4 text-center px-12 mb-9">Follow Me On Social Media</h4>
      <div className="flex items-center justify-center text-3xl">
        <Link href="https://www.instagram.com/katebromleywrites" className="mx-4">
          <FaInstagram className="hover:text-pink" />
        </Link>
        <Link href="https://twitter.com/kbromleywrites" className="mx-4">
          <FaTwitterSquare className="hover:text-pink" />
        </Link>
        <Link href="https://www.amazon.com/Kate-Bromley/e/B08GYP6TNY" className="mx-4">
          <FaAmazon className="hover:text-pink" />
        </Link>
        <Link href="https://www.goodreads.com/author/show/20590705.Kate_Bromley" className="mx-4">
          <FaGoodreads className="hover:text-pink" />
        </Link>
      </div>
    </div>
  </Section>
);

SocialSection.propTypes = {
  className: PropTypes.string,
};

SocialSection.defaultProps = {
  className: '',
};

export default SocialSection;
