import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout from '../components/Layout';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/app.css';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Kate Bromley</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <meta name="robots" content="noindex, nofollow" />
      <meta name="theme-color" content="#ED6D90" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <meta
        name="description"
        content="Kate Bromley author of Talk Bookish to Me, a rom-com novel."
      />
    </Head>

    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;
