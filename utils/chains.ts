import { isAddressEqual } from 'viem';
import { CompoundConfig } from '../compound-config';
import { arbitrum, optimism, sepolia } from 'wagmi/chains';
import { Token } from '../types';

export const CHAINS = Object.values(CompoundConfig).map(cfg => cfg.chain)

const CHAIN_ICON_PATH = '/images/networks'
const ARB_SHORT_NAME = 'Arbitrum'
const OP_SHORT_NAME = 'Optimism'


export function chainFromId(id: number) {
    return CHAINS.find(c => c.id === id)
}

export function chainIcon(id: number) {
    const chain = chainFromId(id)
    return chain ? `${CHAIN_ICON_PATH}/${chain.id}.svg` : ''
}

export function chainName(id: number) {
    let name
    if (id === arbitrum.id) {
        name = ARB_SHORT_NAME  
    } else if (id === optimism.id) {
        name = OP_SHORT_NAME
    } else {
        name = chainFromId(id)?.name
    }
    return name
}

export function isTestnet(id: number) {
    return id === sepolia.id
}

export function isUnsupportedChain(id: number) {
    return !chainFromId(id)
}

export function nativeCurrency(id: number) {
    const { nativeCurrency } = chainFromId(id)
    const currency = { ...nativeCurrency }
    if (sepolia.id === id) currency.symbol = 'ETH'
    return currency
}

export function wrappedNativeToken(id: number) {
    return CompoundConfig[id].contracts.wrappedNativeToken
}

export function isWrappedNativeToken(id: number, token: Token) {
    return isAddressEqual(wrappedNativeToken(id), token.address)
}

export function getTokenOrNativeCurrency(id: number, token: Token) {
    return isWrappedNativeToken(id, token) ? nativeCurrency(id) : token
}

export function enhanceChain(chain) {
    return {
        ...chain,
        shortName: chainName(chain.id),
        icon: chainIcon(chain.id),
        isTestnet: isTestnet(chain.id),
    }
}

export function transactionUrl({ chainId, txHash }) {
    const blockExplorer = chainFromId(chainId).blockExplorers.default.url
    return `${blockExplorer}/tx/${txHash}`
}

export function orderedChainList() {
    const comparator = (c1, c2) => {
        if (c1.isTestnet) {
            return 1
        } else if (c2.isTestnet) {
            return -1
        } else {
            return 0
        }
    }
    return CHAINS.map(enhanceChain).sort(comparator)
}

