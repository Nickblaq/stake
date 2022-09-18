import '../styles/globals.css'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CoinListContextProvider } from '../context/CoinContext'
import { ThemeProvider } from "@material-tailwind/react";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  chain
} from 'wagmi'

// import { publicProvider } from 'wagmi/providers/public'
// import { alchemyProvider } from 'wagmi/providers/alchemy'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const smartChainChain = {
  id: 56,
  name: 'Binance',
  network: 'Binance',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance',
    symbol: 'BSC',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed4.binance.org/',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
  },
  testnet: false,
}

const defaultL2Chains = [smartChainChain]

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider } = configureChains( 
  // [
  //   chain.polygonMumbai,
  //   // chain.mainnet,
  //   chain.polygon,
  //   // chain.optimism,
  //   // chain.arbitrum,
    
  //   // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
  //   //   ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
  //   //   : []),
  // ],
  defaultL2Chains,
  [
    jsonRpcProvider({
      rpc: (chain) => {
        // if (chain.id !== smartChainChain.id || chain.id !== smartTestChain) return null
        return { http: chain.rpcUrls.default }
  }
    }),
])

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'chase_fintoken',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
})


function MyApp({ Component, pageProps }) {
  return (
    <>
       <Head>
        <title>Chase Fintoken</title>
      </Head>
      <WagmiConfig client={client}>
      <ThemeProvider>
   <Navbar />
    <Component {...pageProps} />
    <Footer />
    </ThemeProvider>
    </WagmiConfig>
    </>
  )
}

export default MyApp
