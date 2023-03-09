import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { pageview } from '../lib/gtag';
import Layout from '../components/Layout';
import '../styles/app.css';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = url => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Kate Bromley</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#ED6D90" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <meta
          name="description"
          content="Kate Bromley is the rom-com author of Talk Bookish to Me, Here for the Drama, and Ciao For Now."
        />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;
