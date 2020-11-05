import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Section from './Section';
import Link from './Link';

const SocialSection = ({ className, ...other }) => {
  return (
    <Section noBorder className={className} {...other}>
      <div className="flex flex-col justify-center items-center">
        <h4 className="h4 text-center px-12 mb-9">Follow Me On Social Media</h4>
        <div className="flex items-center justify-center">
          <Link href="https://www.instagram.com/katebromleywrites" className="mx-4">
            <Image width="27" height="27" src="/instagram.svg" />
          </Link>
          <Link href="https://www.facebook.com/katebromleywrites" className="mx-4">
            <Image width="27" height="27" src="/facebook.svg" />
          </Link>
          <Link href="https://www.amazon.com/Kate-Bromley/e/B08GYP6TNY" className="mx-4">
            <Image width="27" height="27" src="/amazon.svg" />
          </Link>
          {/* <Link href="https://www.goodreads.com/author/show/20590705.Kate_Bromley">good reads</Link> */}
        </div>
      </div>
    </Section>
  );
};

SocialSection.propTypes = {
  className: PropTypes.string,
};

SocialSection.defaultProps = {
  className: '',
};

export default SocialSection;
