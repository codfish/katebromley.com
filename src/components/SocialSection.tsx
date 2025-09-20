import React from 'react';
import { FaAmazon, FaGoodreads, FaInstagram } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';

import Link from '@/components/Link';
import Section from '@/components/Section';

export interface SocialSectionProps {
  className?: string;
  [key: string]: any;
}

const SocialSection = ({ className = '', ...other }: SocialSectionProps) => (
  <Section noBorder className={className} {...other}>
    <div className="flex flex-col items-center justify-center">
      <h4 className="mb-9 px-12 text-center h4">Follow Me On Social Media</h4>
      <div className="flex items-center justify-center text-3xl">
        <Link href="https://www.instagram.com/katebromleywrites" className="mx-4">
          <FaInstagram className="hover:text-pink" />
        </Link>
        <Link href="https://www.amazon.com/Kate-Bromley/e/B08GYP6TNY" className="mx-4">
          <FaAmazon className="hover:text-pink" />
        </Link>
        <Link href="https://www.goodreads.com/author/show/20590705.Kate_Bromley" className="mx-4">
          <FaGoodreads className="hover:text-pink" />
        </Link>
        <Link href="https://linktr.ee/katebromley" className="mx-4">
          <SiLinktree className="size-6 hover:text-pink" />
        </Link>
      </div>
    </div>
  </Section>
);

export default SocialSection;
