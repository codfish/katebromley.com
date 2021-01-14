/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { fetchAPI } from '../lib/api';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import SubscribeSection from '../components/SubscribeSection';
import Button from '../components/Button';
import Link from '../components/Link';

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const messageRef = React.createRef();

  const sendContact = async (event, body) => {
    try {
      await fetchAPI('/api/contact', { body });
      setError(false);
      setSubmitting(false);
      setSuccess(true);
      event.target.reset();
    } catch (err) {
      setSubmitting(false);
      setSuccess(false);
      setError(true);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // declaring these here cause if you try and grab them from within the recaptcha
    // callback function, the ref's won't have their values...weird js scopes
    const values = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };

    if (success) {
      return;
    }

    setSubmitting(true);

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' })
        .then(token => {
          sendContact(event, { ...values, 'g-recaptcha-response': token });
        })
        .catch(() => {
          setSubmitting(false);
          setSuccess(false);
          setError(true);
        });
    });
  };

  return (
    <>
      <Head>
        <title>Contact Kate Bromley</title>
        <meta name="description" content="Contact Kate Bromley" />
      </Head>

      <PageHeader>Contact</PageHeader>

      <Section noBorder>
        <div className="max-w-kb-prose mx-auto">
          <p className="text-body2 mb-4">
            For agent inquiries, contact{' '}
            <a
              href="https://www.marsallyonliteraryagency.com/the-agents/kevan-lyon/"
              className="link"
            >
              Kevan Lyon
            </a>{' '}
            at{' '}
            <a
              href="mailto:kevan@marsallyonliteraryagency.com"
              className="underline hover:no-underline"
            >
              Kevan@MarsalLyonLiteraryAgency.com
            </a>
            .
          </p>
          <p className="text-body2 mb-10">
            For publicity inquiries, contact{' '}
            <a href="https://www.linkedin.com/in/justineisha/" className="link">
              Justine Sha
            </a>{' '}
            at{' '}
            <a href="mailto:justine.sha@harpercollins.com" className="underline hover:no-underline">
              Justine.Sha@HarperCollins.com
            </a>{' '}
            or{' '}
            <a href="https://www.linkedin.com/in/lia-ferrone-b5483410b/" className="link">
              Lia Ferrone
            </a>{' '}
            at{' '}
            <a href="mailto:justine.sha@harpercollins.com" className="underline hover:no-underline">
              Lia.Ferrone@HarperCollins.com
            </a>
            .
          </p>

          <p className="body1 mb-6">Send Kate a Message</p>

          <form action="/api/contact" method="post" className="mb-20" onSubmit={handleSubmit}>
            <label htmlFor="name" className="sr-only">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              id="name"
              ref={nameRef}
              required
              aria-required
              className="input mb-6 rounded-sm"
            />

            <label htmlFor="email" className="sr-only">
              Your Email *
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Your Email"
              id="email"
              required
              aria-required
              className="input mb-6 rounded-sm"
            />

            <label htmlFor="message" className="caption mb-2">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Type Your Message"
              id="message"
              ref={messageRef}
              rows="5"
              required
              aria-required
              className="textarea mb-2 rounded-sm"
            />

            <p className="caption mb-6 text-recaptcha">
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
                Terms of Service
              </a>{' '}
              apply.
            </p>

            {success && (
              <p className="body2 text-success-main">
                Message was sent! Thanks for contacting Kate!
              </p>
            )}

            {error && (
              <p className="body2 text-error-main mb-6">
                There was an issue sending the message. Please try again.
              </p>
            )}

            {!success && (
              <Button
                type="submit"
                primary
                className="w-full sm:w-auto block sm:mx-auto"
                disabled={submitting || success}
              >
                Send Message
              </Button>
            )}
          </form>

          <div className="flex flex-col justify-center text-center">
            <h5 className="h5 text-primary-main mb-6 uppercase">Follow along on social media</h5>
            <div className="flex items-center justify-center">
              <Link href="https://www.instagram.com/katebromleywrites" className="mx-4">
                <Image width="18" height="18" src="/instagram.svg" className="hover:opacity-50" />
              </Link>
              <Link href="https://www.facebook.com/katebromleywrites" className="mx-4">
                <Image width="18" height="18" src="/facebook.svg" className="hover:opacity-50" />
              </Link>
              <Link href="https://www.amazon.com/Kate-Bromley/e/B08GYP6TNY" className="mx-4">
                <Image width="18" height="18" src="/amazon.svg" className="hover:opacity-50" />
              </Link>
              <Link
                href="https://www.goodreads.com/author/show/20590705.Kate_Bromley"
                className="mx-4"
              >
                <Image width="21" height="21" src="/goodreads.svg" className="hover:opacity-50" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <SubscribeSection />
    </>
  );
}

export default Contact;
