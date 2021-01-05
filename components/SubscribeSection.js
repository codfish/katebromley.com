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

      <form
        action="https://katebromley.us7.list-manage.com/subscribe/post?u=3409d07d2655432fdaf750be0&amp;id=1792a82a63"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
      >
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="mce-EMAIL" className="sr-only">
          Your Email
        </label>
        <input
          type="email"
          name="EMAIL"
          placeholder="Your Email"
          id="mce-EMAIL"
          required
          aria-required
          className="input mb-6"
        />

        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input type="text" name="b_3409d07d2655432fdaf750be0_1792a82a63" tabIndex="-1" />
        </div>

        <Button
          type="submit"
          primary
          className="sm:block sm:mx-auto"
          name="subscribe"
          id="mc-embedded-subscribe"
        >
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
