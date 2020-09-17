import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/App.css";

export default function MyApp(props) {

  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta content="Sistemas de Información Geográfica - Estado de ocupación de las playas de Asturias" name="description"/>
        <title>SIG-Playas Asturias</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps}/>
      <Footer />
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
