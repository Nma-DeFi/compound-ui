import { mainnet, arbitrum, polygon, base } from 'wagmi/chains';

export const MARKETS = {
    [mainnet.id]: [
        {
            cometAddress: '',
            baseToken: {
                symbol: '',
                name: '',
                address: ''
            }
        },
        {
            cometAddress: '',
            baseToken: {
                symbol: '',
                name: '',
                address: ''
            }
        }
    ],
    [arbitrum.id]: [],
    [polygon.id]: [],
    [base.id]: []
}