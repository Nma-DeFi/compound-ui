import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import '../styles/globals.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { CHAINS } from '../utils/networks';
import { useEffect } from 'react';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { CurrentChainProvider } from '../context/CurrentChainContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const wagmiConfig = defaultWagmiConfig({ chains: CHAINS, projectId });

createWeb3Modal({ 
  wagmiConfig, projectId, chains: CHAINS, 
  themeMode: 'light', 
  themeVariables: { '--w3m-z-index': 10000 }
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => { 
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  });
  
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <CurrentChainProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CurrentChainProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}