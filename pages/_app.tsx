import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import '../styles/globals.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect } from 'react';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { arbitrum, mainnet, polygon, base } from 'wagmi/chains';
import { WagmiConfig } from 'wagmi';

const chains = [ mainnet, arbitrum, polygon, base ];
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const wagmiConfig = defaultWagmiConfig({ chains, projectId });

createWeb3Modal({ 
  wagmiConfig, projectId, chains, 
  themeMode: 'light', 
  themeVariables: {'--w3m-z-index': 10000 }
});

export default function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => { 
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  });
  
  return (
    <WagmiConfig config={wagmiConfig}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  );
}