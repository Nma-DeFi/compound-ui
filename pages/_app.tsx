import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import '../styles/globals.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { CHAINS } from '../utils/chains';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../redux/store'
import { Provider as ReduxProvider } from 'react-redux'
import { useBootstrap } from '../hooks/useBootstrap';
import { GoogleAnalytics } from '@next/third-parties/google'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

const wagmiConfig = defaultWagmiConfig({ chains: CHAINS, projectId })

createWeb3Modal({ 
  wagmiConfig, projectId, chains: CHAINS, 
  themeMode: 'light', 
  themeVariables: { '--w3m-z-index': 10000 }
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  
  useBootstrap()
  
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
          <ReduxProvider store={store}>
            <Layout>
              <Component {...pageProps} />
              <GoogleAnalytics gaId={gaId} />
            </Layout>
          </ReduxProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}