import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import '../styles/globals.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => { 
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  });
  
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}