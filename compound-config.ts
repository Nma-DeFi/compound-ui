import { mainnet, arbitrum, polygon, base, goerli } from 'wagmi/chains';

const PAPERCLIPLABS_SUBGRAPHS = 'https://api.thegraph.com/subgraphs/name/papercliplabs';

export const COMPOUND_CONFIG = {
    [mainnet.id]: {
        chain: mainnet,
        subgraph: PAPERCLIPLABS_SUBGRAPHS + '/compound-v3-mainnet',
    },
    [arbitrum.id]: {
        chain: arbitrum,
        subgraph: PAPERCLIPLABS_SUBGRAPHS + '/compound-v3-arbitrum',
    },
    [polygon.id]: {
        chain: polygon,
        subgraph: PAPERCLIPLABS_SUBGRAPHS + '/compound-v3-polygon',
    },
    [base.id]: {
        chain: base,
        subgraph: PAPERCLIPLABS_SUBGRAPHS + '/compound-v3-base',
    },
    [goerli.id]: {
        chain: goerli,
        subgraph: PAPERCLIPLABS_SUBGRAPHS + '/compound-v3-goerli',
    },
}

