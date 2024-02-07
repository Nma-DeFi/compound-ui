import { mainnet, arbitrum, polygon, base, goerli } from 'wagmi/chains'

const PAPERCLIPLABS_SG = 'https://api.thegraph.com/subgraphs/name/papercliplabs/compound-v3-'

const Subgraphs = {
    mainnet: PAPERCLIPLABS_SG + 'mainnet',
    arbitrum: PAPERCLIPLABS_SG + 'arbitrum',
    polygon: PAPERCLIPLABS_SG + 'polygon',
    base: PAPERCLIPLABS_SG + 'base',
    goerli: PAPERCLIPLABS_SG + 'goerli',
}

export const CompoundConfig = {
    [mainnet.id]: {
        chain: mainnet,
        subgraph: Subgraphs.mainnet,
        contracts : {
            bulker: '0xa397a8C2086C554B531c02E29f3291c9704B00c7',
            wrappedNativeToken : '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        }
    },
    [arbitrum.id]: {
        chain: arbitrum,
        subgraph: Subgraphs.arbitrum,
        contracts : {
            bulker: '0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d',
            wrappedNativeToken : '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
        }
    },
    [polygon.id]: {
        chain: polygon,
        subgraph: Subgraphs.polygon,
        contracts : {
            bulker: '0x59e242D352ae13166B4987aE5c990C232f7f7CD6',
            wrappedNativeToken : '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        }
    },
    [base.id]: {
        chain: base,
        subgraph: Subgraphs.base,
        contracts : {
            bulker: '0x78D0677032A35c63D142a48A2037048871212a8C',
            wrappedNativeToken : '0x4200000000000000000000000000000000000006',
        }
    },
    [goerli.id]: {
        chain: goerli,
        subgraph: Subgraphs.goerli,
        contracts : {
            bulker: '0x93817B582248F563D5d19923Bd5B92b045794668',
            wrappedNativeToken : '0x42a71137C09AE83D8d05974960fd607d40033499',
        }
    },
}

