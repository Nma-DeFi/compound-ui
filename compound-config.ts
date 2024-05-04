import { mainnet, arbitrum, polygon, base, sepolia, optimism, scroll } from 'wagmi/chains'

const SG_API_KEY = process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY
const SG_GATEWAY = 'https://gateway-arbitrum.network.thegraph.com/api'

const subgraphQueryUrl = sgId => `${SG_GATEWAY}/${SG_API_KEY}/subgraphs/id/${sgId}`

const Subgraphs = {
    Mainnet:  subgraphQueryUrl('5nwMCSHaTqG3Kd2gHznbTXEnZ9QNWsssQfbHhDqQSQFp'), 
    Arbitrum: subgraphQueryUrl('Ff7ha9ELmpmg81D6nYxy4t8aGP26dPztqD1LDJNPqjLS'), 
    Polygon:  subgraphQueryUrl('AaFtUWKfFdj2x8nnE3RxTSJkHwGHvawH3VWFBykCGzLs'), 
    Base:     subgraphQueryUrl('2hcXhs36pTBDVUmk5K2Zkr6N4UYGwaHuco2a6jyTsijo'), 
    Optimism: subgraphQueryUrl('FhHNkfh5z6Z2WCEBxB6V3s8RPxnJfWZ9zAfM5bVvbvbb'),
    Scroll:   subgraphQueryUrl('6aRGn6noEdin1krLfYTnLMYaCoTujL7cHekARE4Ndxng'),
    Sepolia:  subgraphQueryUrl('HZKpJGBKpiBhKBqQuWAiR1xCAPhrsrmGYWpQavi23DR1'), 
}

export const CompoundConfig = {
    [mainnet.id]: {
        chain: mainnet,
        subgraph: Subgraphs.Mainnet,
        contracts : {
            bulker: '0xa397a8C2086C554B531c02E29f3291c9704B00c7',
            wrappedNativeToken : '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        }
    },
    [arbitrum.id]: {
        chain: arbitrum,
        subgraph: Subgraphs.Arbitrum,
        contracts : {
            bulker: '0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d',
            wrappedNativeToken : '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
        }
    },
    [polygon.id]: {
        chain: polygon,
        subgraph: Subgraphs.Polygon,
        contracts : {
            bulker: '0x59e242D352ae13166B4987aE5c990C232f7f7CD6',
            wrappedNativeToken : '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        }
    },
    [base.id]: {
        chain: base,
        subgraph: Subgraphs.Base,
        contracts : {
            bulker: '0x78D0677032A35c63D142a48A2037048871212a8C',
            wrappedNativeToken : '0x4200000000000000000000000000000000000006',
        }
    },
    [sepolia.id]: {
        chain: sepolia,
        subgraph: Subgraphs.Sepolia,
        contracts : {
            bulker: '0xaD0C044425D81a2E223f4CE699156900fead2Aaa',
            wrappedNativeToken : '0x2D5ee574e710219a521449679A4A7f2B43f046ad',
        }
    },
    [optimism.id]: {
        chain: optimism,
        subgraph: Subgraphs.Optimism,
        contracts : {
            bulker: '0xcb3643CC8294B23171272845473dEc49739d4Ba3',
            wrappedNativeToken : '0x4200000000000000000000000000000000000006',
        }
    },
    [scroll.id]: {
        chain: scroll,
        subgraph: Subgraphs.Scroll,
        contracts : {
            bulker: '0x53C6D04e3EC7031105bAeA05B36cBc3C987C56fA',
            wrappedNativeToken : '0x5300000000000000000000000000000000000004',
        }
    },
}

