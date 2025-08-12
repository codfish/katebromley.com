import React, { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';

export interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren<LayoutProps>) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
