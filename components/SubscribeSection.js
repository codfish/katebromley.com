import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Section from './Section';
import Button from './Button';
import styles from './SubscribeSection.module.css';

const SubscribeSection = ({ className, ...other }) => (
  <Section color="secondary" className={clsx(styles.root, className)} {...other}>
    <div className="mb-10">
      <svg
        width="78px"
        height="53px"
        viewBox="0 0 78 53"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="mx-auto"
      >
        <g id="BooksIcon" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="module-/-newsletter-signup" transform="translate(-681.000000, -60.000000)">
            <g id="Group" transform="translate(681.000000, 60.000000)">
              <g
                id="icon/books"
                transform="translate(39.000000, 26.500000) rotate(90.000000) translate(-39.000000, -26.500000) translate(13.000000, -12.000000)"
              >
                <rect id="Rectangle" fill="#ED6D90" x="26" y="0" width="11" height="77" />
                <rect id="Rectangle-Copy-5" fill="#4EC9CB" x="13" y="9.5" width="11" height="53" />
                <rect id="Rectangle-Copy-6" fill="#ED6D90" x="0" y="4.5" width="11" height="63" />
                <rect id="Rectangle-Copy-4" fill="#FFD55F" x="39" y="3.5" width="13" height="69" />
                <rect id="Rectangle" fill="#FAEAEF" x="30" y="4" width="4" height="20" />
                <rect id="Rectangle-Copy" fill="#FAEAEF" x="3.5" y="42.5" width="4" height="20" />
                <rect id="Rectangle-Copy-2" fill="#FFF2CC" x="43.5" y="9.5" width="4" height="20" />
                <circle id="Oval" fill="#FFF2CC" cx="46" cy="64.5" r="3" />
                <circle id="Oval-Copy" fill="#398186" cx="18.5" cy="18.5" r="3" />
              </g>
            </g>
          </g>
        </g>
      </svg>
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
