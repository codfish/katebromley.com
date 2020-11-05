import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Image from 'next/image';
import Section from './Section';
import Button from './Button';
import styles from './SubscribeSection.module.css';

const SubscribeSection = ({ className, ...other }) => (
  <Section color="secondary" className={clsx(styles.root, className)} {...other}>
    <div className="mb-10 text-center">
      <Image src="/books.svg" width="78" height="53" />
    </div>

    <div className="w-full max-w-xl mx-auto">
      <h3 className="h3 text-center mb-4">Stay Connected with Kate</h3>
      <p className="body3 text-center mb-12">
        Because let&apos;s just casually be bookish buddies forever!
      </p>

      <form>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="email" className="sr-only">
          Your Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          id="email"
          required
          aria-required
          className="input mb-6"
        />
        <Button type="submit" primary className="sm:block sm:mx-auto">
          Subscribe
        </Button>
      </form>
    </div>
  </Section>
);

SubscribeSection.propTypes = {
  className: PropTypes.string,
};

SubscribeSection.defaultProps = {
  className: '',
};

export default SubscribeSection;
