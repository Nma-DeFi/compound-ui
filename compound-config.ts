import { mainnet, arbitrum, polygon, base } from 'wagmi/chains';

export const COMPOUND_CONFIG = {
    [mainnet.id]: {
        subgraph: 'https://api.thegraph.com/subgraphs/name/papercliplabs/compound-v3-mainnet',
    },
    [arbitrum.id]: {
        subgraph: 'https://api.thegraph.com/subgraphs/name/papercliplabs/compound-v3-arbitrum',
    },
    [polygon.id]: {
        subgraph: 'https://api.thegraph.com/subgraphs/name/papercliplabs/compound-v3-polygon',
    },
    [base.id]: {
        subgraph: 'https://api.thegraph.com/subgraphs/name/papercliplabs/compound-v3-base',
    }
}