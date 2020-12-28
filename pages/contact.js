/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import SubscribeSection from '../components/SubscribeSection';
import Button from '../components/Button';
import Link from '../components/Link';

function Contact() {
  return (
    <>
      <Head>
        <title>Contact | Kate Bromley</title>

        <meta name="description" content="Contact Kate Bromley" />
      </Head>

      <PageHeader>Contact</PageHeader>

      <Section noBorder>
        <div className="max-w-kb-prose mx-auto">
          <p className="text-body2 mb-4">
            For Agent inquiries, contact{' '}
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
          {/* <p className="text-body2 mb-4">
            For Publicity, contact{' '}
            <a href="https://www.linkedin.com/in/justineisha/" className="link">
              Justine Sha
            </a>{' '}
            at{' '}
            <a href="mailto:justine.sha@harpercollins.com" className="underline hover:no-underline">
              Justine.Sha@HarperCollins.com
            </a>
            ,{' '}
            <a href="tel:2122077384" className="underline hover:no-underline">
              (212) 207-7384
            </a>
            .
          </p>
          <p className="text-body2 mb-10">
            For Subsidiary Rights information, contact{' '}
            <a href="https://www.linkedin.com/in/reka-rubin-0090137/" className="link">
              Reka Rubin
            </a>{' '}
            at{' '}
            <a href="mailto:reka.rubin@harpercollins.com" className="underline hover:no-underline">
              Reka.Rubin@HarperCollins.com
            </a>
            ,{' '}
            <a href="tel:2122077384" className="underline hover:no-underline">
              (212) 207-7991
            </a>
            .
          </p> */}

          <p className="body1 mb-6">Send Kate a Message</p>

          <form className="mb-20">
            <label htmlFor="name" className="sr-only">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              id="name"
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
              rows="5"
              required
              aria-required
              className="textarea mb-6 rounded-sm"
            />

            <Button type="submit" primary className="w-full sm:w-auto block sm:mx-auto">
              Send Message
            </Button>
          </form>

          <div className="flex flex-col justify-center text-center">
            <h5 className="h5 text-primary-main mb-6 uppercase">Follow along Social Media</h5>
            <p className="text-body3 max-w-xs mx-auto mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit bibendum imperdiet.
            </p>
            <div className="flex items-center justify-center">
              <Link href="https://www.instagram.com/katebromleywrites" className="mx-4">
                <Image width="18" height="18" src="/instagram.svg" />
              </Link>
              <Link href="https://www.facebook.com/katebromleywrites" className="mx-4">
                <Image width="18" height="18" src="/facebook.svg" />
              </Link>
              <Link href="https://www.amazon.com/Kate-Bromley/e/B08GYP6TNY" className="mx-4">
                <Image width="18" height="18" src="/amazon.svg" />
              </Link>
              {/* <Link href="https://www.goodreads.com/author/show/20590705.Kate_Bromley">good reads</Link> */}
            </div>
          </div>
        </div>
      </Section>

      <SubscribeSection />
    </>
  );
}

export default Contact;
